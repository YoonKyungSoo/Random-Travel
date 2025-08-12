// 카카오맵 기반 랜덤 여행지 픽 애플리케이션
let tempMarker = null;
let favorites = [];
let currentRoute = [];

// 모든 지역 데이터를 하나의 배열로 통합
function getAllLocations() {
    const allLocations = [];
    
    // 각 지역 배열들을 통합
    if (window.seoulLocations) allLocations.push(...window.seoulLocations);
    if (window.busanLocations) allLocations.push(...window.busanLocations);
    if (window.daeguLocations) allLocations.push(...window.daeguLocations);
    if (window.incheonLocations) allLocations.push(...window.incheonLocations);
    if (window.gwangjuLocations) allLocations.push(...window.gwangjuLocations);
    if (window.daejeonLocations) allLocations.push(...window.daejeonLocations);
    if (window.ulsanLocations) allLocations.push(...window.ulsanLocations);
    if (window.sejongLocations) allLocations.push(...window.sejongLocations);
    if (window.gyeonggiLocations) allLocations.push(...window.gyeonggiLocations);
    if (window.gangwonLocations) allLocations.push(...window.gangwonLocations);
    if (window.chungbukLocations) allLocations.push(...window.chungbukLocations);
    if (window.chungnamLocations) allLocations.push(...window.chungnamLocations);
    if (window.jeonbukLocations) allLocations.push(...window.jeonbukLocations);
    if (window.jeonnamLocations) allLocations.push(...window.jeonnamLocations);
    if (window.gyeongbukLocations) allLocations.push(...window.gyeongbukLocations);
    if (window.gyeongnamLocations) allLocations.push(...window.gyeongnamLocations);
    if (window.jejuLocations) allLocations.push(...window.jejuLocations);
    
    return allLocations;
}

// 랜덤 여행지 선택
function pickRandomLocation() {
    const allLocations = getAllLocations();
    if (allLocations.length === 0) {
        alert('지역 데이터를 불러올 수 없습니다.');
        return;
    }
    
    // 기존 마커 제거
    if (tempMarker) {
        tempMarker.setMap(null);
    }
    
    // 랜덤 위치 선택
    const randomIndex = Math.floor(Math.random() * allLocations.length);
    const selectedLocation = allLocations[randomIndex];
    
    // 지도 중심 이동
    const position = new kakao.maps.LatLng(selectedLocation.lat, selectedLocation.lng);
    window.map.setCenter(position);
    window.map.setLevel(6);
    
    // 마커 생성
    tempMarker = new kakao.maps.Marker({
        position: position,
        map: window.map
    });
    
    // 인포윈도우 생성
    const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:10px;text-align:center;"><strong>${selectedLocation.name}</strong><br>${selectedLocation.description}</div>`
    });
    
    infowindow.open(window.map, tempMarker);
    
    // 결과 카드 표시
    showResultCard(selectedLocation);
    
    // 즐겨찾기 버튼 표시
    document.getElementById('favoriteBtn').classList.remove('hidden');
    
    // 즐겨찾기 버튼에 현재 위치 정보 저장
    document.getElementById('favoriteBtn').onclick = () => addToFavorites(selectedLocation);
}

// 결과 카드 표시
function showResultCard(location) {
    const resultCard = document.getElementById('resultCard');
    const locationName = document.getElementById('locationName');
    const locationDescription = document.getElementById('locationDescription');
    
    locationName.textContent = location.name;
    locationDescription.textContent = location.description;
    
    resultCard.classList.remove('hidden');
    
    // 즐겨찾기 버튼에 현재 위치 정보 저장
    document.getElementById('favoriteBtn').onclick = () => addToFavorites(location);
}

// 즐겨찾기에 추가
function addToFavorites(location) {
    // 중복 확인
    const exists = favorites.find(fav => fav.name === location.name);
    if (exists) {
        alert('이미 즐겨찾기에 추가된 지역입니다.');
        return;
    }
    
    const favorite = {
        ...location,
        timestamp: new Date().toISOString(),
        id: Date.now()
    };
    
    favorites.push(favorite);
    
    // 로컬 스토리지에 저장
    localStorage.setItem('travelFavorites', JSON.stringify(favorites));
    
    alert(`${location.name}이(가) 즐겨찾기에 추가되었습니다!`);
    
    // index.html의 loadFavorites 함수 호출
    if (typeof window.loadFavorites === 'function') {
        window.loadFavorites();
    } else {
        updateFavoritesList();
    }
}

// 즐겨찾기 목록 업데이트
function updateFavoritesList() {
    const container = document.getElementById('favoritesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (favorites.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">아직 즐겨찾기한 여행지가 없습니다.<br>랜덤 여행지를 선택하고 ❤️ 즐겨찾기 버튼을 눌러보세요!</p>';
        return;
    }
    
    favorites.forEach((favorite, index) => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.innerHTML = `
            <div class="favorite-item" style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 10px; background: #f9f9f9;">
                <h5 style="margin: 0 0 10px 0; color: #333;">${favorite.name}</h5>
                ${favorite.description ? `<p style="margin: 5px 0; color: #666; font-size: 14px;">${favorite.description}</p>` : ''}
                <p style="margin: 5px 0; color: #888; font-size: 12px;">추가된 날짜: ${new Date(favorite.timestamp || favorite.addedAt).toLocaleDateString('ko-KR')}</p>
                <button onclick="removeFavoriteById(${favorite.id || index})" class="btn small" style="background: #ff6b6b; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">삭제</button>
            </div>
        `;
        container.appendChild(favoriteItem);
    });
}

// 지도에서 위치 표시
function showOnMap(lat, lng, name) {
    const position = new kakao.maps.LatLng(lat, lng);
    window.map.setCenter(position);
    window.map.setLevel(6);
    
    // 기존 마커 제거
    if (tempMarker) {
        tempMarker.setMap(null);
    }
    
    // 새 마커 생성
    tempMarker = new kakao.maps.Marker({
        position: position,
        map: window.map
    });
    
    // 인포윈도우 생성
    const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:10px;text-align:center;"><strong>${name}</strong></div>`
    });
    
    infowindow.open(window.map, tempMarker);
}

// 즐겨찾기에서 제거
function removeFavorite(index) {
    if (confirm('정말로 이 지역을 즐겨찾기에서 제거하시겠습니까?')) {
        favorites.splice(index, 1);
        localStorage.setItem('travelFavorites', JSON.stringify(favorites));
        
        // index.html의 loadFavorites 함수 호출
        if (typeof window.loadFavorites === 'function') {
            window.loadFavorites();
        } else {
            updateFavoritesList();
        }
    }
}

// id로 즐겨찾기 제거
function removeFavoriteById(id) {
    const index = favorites.findIndex(fav => fav.id === id);
    if (index !== -1) {
        removeFavorite(index);
    }
}

// 전역 함수로 등록
window.removeFavoriteById = removeFavoriteById;

// 경로 설정 기능
function setupRoute() {
    if (currentRoute.length === 0) {
        alert('먼저 지도에서 위치를 선택해주세요.');
        return;
    }
    
    // 경로 정보 표시
    const routeDetails = document.getElementById('routeDetails');
    routeDetails.innerHTML = '';
    
    currentRoute.forEach((location, index) => {
        const routeItem = document.createElement('div');
        routeItem.className = 'route-item';
        routeItem.innerHTML = `
            <span class="route-number">${index + 1}</span>
            <span class="route-name">${location.name}</span>
            <button onclick="removeFromRoute(${index})" class="btn small danger">제거</button>
        `;
        routeDetails.appendChild(routeItem);
    });
    
    // 저장된 정보 영역 표시
    document.getElementById('savedInfo').classList.remove('hidden');
}

// 경로에서 제거
function removeFromRoute(index) {
    currentRoute.splice(index, 1);
    setupRoute();
}

// 다시하기
function resetMap() {
    if (tempMarker) {
        tempMarker.setMap(null);
        tempMarker = null;
    }
    
    document.getElementById('resultCard').classList.add('hidden');
    document.getElementById('favoriteBtn').classList.add('hidden');
    
    // 지도 중심을 한국으로 이동
    window.map.setCenter(new kakao.maps.LatLng(36.5, 127.5));
    window.map.setLevel(7);
}

// 페이지 로드 시 초기화
window.addEventListener('load', function() {
    // 카카오맵 API 로딩 확인
    if (typeof kakao !== 'undefined' && kakao.maps) {
        initializeMap();
    } else {
        // API 로딩 대기
        setTimeout(() => {
            if (typeof kakao !== 'undefined' && kakao.maps) {
                initializeMap();
            }
        }, 1000);
    }
    
    // 저장된 즐겨찾기 불러오기
    const savedFavorites = localStorage.getItem('travelFavorites');
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
        
        // index.html의 loadFavorites 함수 호출
        if (typeof window.loadFavorites === 'function') {
            window.loadFavorites();
        } else {
            updateFavoritesList();
        }
    }
});

// 전역 함수들 등록
window.pickRandomLocation = pickRandomLocation;
window.addToFavorites = addToFavorites;
window.resetMap = resetMap;
window.initializeMap = initializeMap;
window.updateFavoritesList = updateFavoritesList;

// 카카오맵 초기화
function initializeMap() {
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(36.5, 127.5), // 한국 중심
        level: 7
    };
    
    window.map = new kakao.maps.Map(container, options);
    
    // 지도 클릭 이벤트
    kakao.maps.event.addListener(window.map, 'click', function(mouseEvent) {
        const latlng = mouseEvent.latLng;
        
        // 클릭한 위치에 마커 생성
        if (tempMarker) {
            tempMarker.setMap(null);
        }
        
        tempMarker = new kakao.maps.Marker({
            position: latlng
        });
        
        tempMarker.setMap(window.map);
        
        // 클릭한 위치를 경로에 추가
        const clickedLocation = {
            name: `위치 ${currentRoute.length + 1}`,
            description: `위도: ${latlng.getLat().toFixed(6)}, 경도: ${latlng.getLng().toFixed(6)}`,
            lat: latlng.getLat(),
            lng: latlng.getLng()
        };
        
        currentRoute.push(clickedLocation);
    });
}

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    // 랜덤 픽 버튼
    document.getElementById('randomPickBtn').addEventListener('click', pickRandomLocation);
    
    // 다시하기 버튼
    document.getElementById('resetBtn').addEventListener('click', resetMap);
    
    // 경로 설정 버튼들
    const routeButtons = document.querySelectorAll('.route-buttons button');
    routeButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('경로추가')) {
                setupRoute();
            }
        });
    });
});
