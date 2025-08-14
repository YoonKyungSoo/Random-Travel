// 카카오맵 기반 랜덤 여행지 픽 애플리케이션
let tempMarker = null;
let tempInfowindow = null; // 인포윈도우 전역 변수 추가
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

// 2단계 랜덤 선택: 지역 → 세부 지역
function pickRandomLocation() {
    // 1단계: 지역(시/도) 랜덤 선택
    const regions = [
        { name: '서울', data: window.seoulLocations },
        { name: '부산', data: window.busanLocations },
        { name: '대구', data: window.daeguLocations },
        { name: '인천', data: window.incheonLocations },
        { name: '광주', data: window.gwangjuLocations },
        { name: '대전', data: window.daejeonLocations },
        { name: '울산', data: window.ulsanLocations },
        { name: '세종', data: window.sejongLocations },
        { name: '경기', data: window.gyeonggiLocations },
        { name: '강원', data: window.gangwonLocations },
        { name: '충북', data: window.chungbukLocations },
        { name: '충남', data: window.chungnamLocations },
        { name: '전북', data: window.jeonbukLocations },
        { name: '전남', data: window.jeonnamLocations },
        { name: '경북', data: window.gyeongbukLocations },
        { name: '경남', data: window.gyeongnamLocations },
        { name: '제주', data: window.jejuLocations }
    ];
    
    // 유효한 지역만 필터링
    const validRegions = regions.filter(region => region.data && region.data.length > 0);
    
    if (validRegions.length === 0) {
        alert('지역 데이터를 불러올 수 없습니다.');
        return;
    }
    
    // 1단계: 지역 랜덤 선택 (각 지역이 동일한 확률)
    const randomRegionIndex = Math.floor(Math.random() * validRegions.length);
    const selectedRegion = validRegions[randomRegionIndex];
    
    // 2단계: 선택된 지역 내에서 세부 지역 랜덤 선택
    const randomLocationIndex = Math.floor(Math.random() * selectedRegion.data.length);
    const selectedLocation = selectedRegion.data[randomLocationIndex];
    
    console.log(`선택된 지역: ${selectedRegion.name} → ${selectedLocation.name}`);
    
    // 기존 마커 제거
    if (tempMarker) {
        tempMarker.setMap(null);
    }
    
    // 기존 인포윈도우 닫기
    if (tempInfowindow) {
        tempInfowindow.close();
    }
    
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
    tempInfowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:10px;text-align:center;"><strong>${selectedLocation.name}</strong><br>${selectedLocation.description}</div>`
    });
    
    tempInfowindow.open(window.map, tempMarker);
    
    // 결과 카드 표시
    showResultCard(selectedLocation);
    
    // 즐겨찾기 버튼 표시 (데스크톱용)
    document.getElementById('favoriteBtn').classList.remove('hidden');
    
    // 즐겨찾기 버튼에 현재 위치 정보 저장
    document.getElementById('favoriteBtn').onclick = () => addToFavorites(selectedLocation);
    
    // 모바일에서도 즐겨찾기 버튼 활성화 (즐겨찾기 추가 기능)
    const favoriteBtnMobile = document.getElementById('favoriteBtnMobile');
    if (favoriteBtnMobile) {
        favoriteBtnMobile.onclick = () => addToFavorites(selectedLocation);
    }
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
    
    // 모바일에서도 즐겨찾기 버튼 활성화 (즐겨찾기 추가 기능)
    const favoriteBtnMobile = document.getElementById('favoriteBtnMobile');
    if (favoriteBtnMobile) {
        favoriteBtnMobile.onclick = () => addToFavorites(location);
    }
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
    
    // 무한 스크롤 상태 리셋
    currentLoadedCount = 0;
    popupCurrentLoadedCount = 0;
    
    // PC 버전과 모바일 버전 모두 업데이트
    updateFavoritesList(); // PC 버전 메인 목록 업데이트
    updatePopupFavoritesList(); // 모바일 팝업 목록 업데이트
    
    // index.html의 loadFavorites 함수가 있다면 호출 (fallback)
    if (typeof window.loadFavorites === 'function') {
        window.loadFavorites();
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
    
    // 무한 스크롤을 위한 초기 로드 (처음 5개)
    loadMoreFavorites(5);
    
    // 스크롤 이벤트 리스너 추가
    container.addEventListener('scroll', handleFavoritesScroll);
}

// 즐겨찾기 무한 스크롤 처리
let currentLoadedCount = 0;
const itemsPerPage = 5;

function loadMoreFavorites(count) {
    const container = document.getElementById('favoritesContainer');
    if (!container) return;
    
    // 최신순으로 정렬
    const sortedFavorites = [...favorites].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    const startIndex = currentLoadedCount;
    const endIndex = Math.min(startIndex + count, sortedFavorites.length);
    const itemsToLoad = sortedFavorites.slice(startIndex, endIndex);
    
    itemsToLoad.forEach((favorite, index) => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.innerHTML = `
            <div class="favorite-item" style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 10px; background: #f9f9f9;">
                <h5 style="margin: 0 0 10px 0; color: #333;">${favorite.name}</h5>
                ${favorite.description ? `<p style="margin: 5px 0; color: #666; font-size: 14px;">${favorite.description}</p>` : ''}
                <p style="margin: 5px 0; color: #888; font-size: 12px;">추가된 날짜: ${new Date(favorite.timestamp || favorite.addedAt).toLocaleDateString('ko-KR')}</p>
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <button onclick="showLocationOnMap(${favorite.lat}, ${favorite.lng}, '${favorite.name}')" class="btn small" style="background: #74b9ff; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">📍 위치보기</button>
                    <button onclick="removeFavoriteById(${favorite.id || (startIndex + index)})" class="btn small" style="background: #ff6b6b; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">삭제</button>
                </div>
            </div>
        `;
        container.appendChild(favoriteItem);
    });
    
    currentLoadedCount = endIndex;
    

}

// 스크롤 이벤트 핸들러
function handleFavoritesScroll(event) {
    const container = event.target;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    // 스크롤이 하단에 가까워지면 더 많은 항목 로드
    if (scrollTop + clientHeight >= scrollHeight - 50) {
        if (currentLoadedCount < favorites.length) {
            // 잠시 후 다음 항목들 로드
            setTimeout(() => {
                loadMoreFavorites(itemsPerPage);
            }, 300);
        }
    }
}

// 팝업용 즐겨찾기 목록 업데이트
function updatePopupFavoritesList() {
    const container = document.getElementById('popupFavoritesContainer');
    if (!container) return;
    
    // 기존 스크롤 이벤트 리스너 제거
    container.removeEventListener('scroll', handlePopupFavoritesScroll);
    
    container.innerHTML = '';
    
    if (favorites.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">아직 즐겨찾기한 여행지가 없습니다.</p>';
        return;
    }
    
    // 무한 스크롤 상태 리셋
    popupCurrentLoadedCount = 0;
    
    // 무한 스크롤을 위한 초기 로드 (처음 5개)
    loadMorePopupFavorites(5);
    
    // 스크롤 이벤트 리스너 추가
    container.addEventListener('scroll', handlePopupFavoritesScroll);
}

// 팝업용 즐겨찾기 무한 스크롤 처리
let popupCurrentLoadedCount = 0;
const popupItemsPerPage = 5;

function loadMorePopupFavorites(count) {
    const container = document.getElementById('popupFavoritesContainer');
    if (!container) return;
    
    // 최신순으로 정렬
    const sortedFavorites = [...favorites].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    const startIndex = popupCurrentLoadedCount;
    const endIndex = Math.min(startIndex + count, sortedFavorites.length);
    const itemsToLoad = sortedFavorites.slice(startIndex, endIndex);
    
    itemsToLoad.forEach((favorite, index) => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'popup-favorite-item';
        favoriteItem.innerHTML = `
            <h5>${favorite.name}</h5>
            ${favorite.description ? `<p>${favorite.description}</p>` : ''}
            <p style="color: #888; font-size: 12px;">추가된 날짜: ${new Date(favorite.timestamp || favorite.addedAt).toLocaleDateString('ko-KR')}</p>
            <div class="popup-actions">
                <button onclick="showLocationOnMap(${favorite.lat}, ${favorite.lng}, '${favorite.name}')" class="btn primary">📍 위치보기</button>
                <button onclick="removeFavoriteById(${favorite.id || (startIndex + index)})" class="btn small" style="background: #ff6b6b; color: white;">삭제</button>
            </div>
        `;
        container.appendChild(favoriteItem);
    });
    
    popupCurrentLoadedCount = endIndex;
}

// 팝업용 스크롤 이벤트 핸들러
function handlePopupFavoritesScroll(event) {
    const container = event.target;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    // 스크롤이 하단에 가까워지면 더 많은 항목 로드
    if (scrollTop + clientHeight >= scrollHeight - 50) {
        if (popupCurrentLoadedCount < favorites.length) {
            // 잠시 후 다음 항목들 로드
            setTimeout(() => {
                loadMorePopupFavorites(popupItemsPerPage);
            }, 300);
        }
    }
}

// 지도에서 위치 표시 (팝업 닫기 포함)
function showLocationOnMap(lat, lng, name) {
    // 팝업이 열려있다면 닫기
    const popup = document.getElementById('favoritesPopup');
    if (popup && popup.classList.contains('show')) {
        closeFavoritesPopup();
    }
    
    // 지도에서 위치 표시
    const position = new kakao.maps.LatLng(lat, lng);
    window.map.setCenter(position);
    window.map.setLevel(6);
    
    // 기존 마커 제거
    if (tempMarker) {
        tempMarker.setMap(null);
    }
    
    // 기존 인포윈도우 닫기
    if (tempInfowindow) {
        tempInfowindow.close();
    }
    
    // 새 마커 생성
    tempMarker = new kakao.maps.Marker({
        position: position,
        map: window.map
    });
    
    // 인포윈도우 생성
    tempInfowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:10px;text-align:center;"><strong>${name}</strong></div>`
    });
    
    tempInfowindow.open(window.map, tempMarker);
}

// 즐겨찾기 팝업 열기 (모바일 전용)
function openFavoritesPopup() {
    // 팝업 열기 전에 최신 즐겨찾기 목록으로 업데이트
    updatePopupFavoritesList();
    
    // 팝업 표시
    const popup = document.getElementById('favoritesPopup');
    if (popup) {
        popup.classList.add('show');
    }
}

// PC 버전 즐겨찾기 목록 표시 (팝업 없이)
function showFavoritesList() {
    updateFavoritesList();
}

// 즐겨찾기 팝업 닫기
function closeFavoritesPopup() {
    const popup = document.getElementById('favoritesPopup');
    popup.classList.remove('show');
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
    
    // 기존 인포윈도우 닫기
    if (tempInfowindow) {
        tempInfowindow.close();
    }
    
    // 새 마커 생성
    tempMarker = new kakao.maps.Marker({
        position: position,
        map: window.map
    });
    
    // 인포윈도우 생성
    tempInfowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:10px;text-align:center;"><strong>${name}</strong></div>`
    });
    
    tempInfowindow.open(window.map, tempMarker);
}

// 즐겨찾기에서 제거
function removeFavorite(index) {
    if (confirm('정말로 이 지역을 즐겨찾기에서 제거하시겠습니까?')) {
        favorites.splice(index, 1);
        localStorage.setItem('travelFavorites', JSON.stringify(favorites));
        
        // 메인 리스트와 팝업 리스트 모두 업데이트
        if (typeof window.loadFavorites === 'function') {
            window.loadFavorites();
        } else {
            updateFavoritesList();
        }
        
        // 팝업이 열려있다면 팝업 내용도 업데이트
        updatePopupFavoritesList();
    }
}

// id로 즐겨찾기 제거
function removeFavoriteById(id) {
    const index = favorites.findIndex(fav => fav.id === id);
    if (index !== -1) {
        if (confirm('정말로 이 지역을 즐겨찾기에서 제거하시겠습니까?')) {
            favorites.splice(index, 1);
            localStorage.setItem('travelFavorites', JSON.stringify(favorites));
            
            // 무한 스크롤 상태 리셋
            currentLoadedCount = 0;
            popupCurrentLoadedCount = 0;
            
            // 메인 리스트와 팝업 리스트 모두 업데이트
            if (typeof window.loadFavorites === 'function') {
                window.loadFavorites();
            } else {
                updateFavoritesList();
            }
            
            // 팝업이 열려있다면 팝업 내용도 업데이트
            updatePopupFavoritesList();
        }
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
    
    // 기존 인포윈도우 닫기
    if (tempInfowindow) {
        tempInfowindow.close();
        tempInfowindow = null;
    }
    
    document.getElementById('resultCard').classList.add('hidden');
    document.getElementById('favoriteBtn').classList.add('hidden');
    
    // 모바일 즐겨찾기 버튼도 리셋 (즐겨찾기 추가 기능으로)
    const favoriteBtnMobile = document.getElementById('favoriteBtnMobile');
    if (favoriteBtnMobile) {
        favoriteBtnMobile.onclick = () => openFavoritesPopup();
    }
    
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
window.showFavoritesList = showFavoritesList;
window.openFavoritesPopup = openFavoritesPopup;
window.closeFavoritesPopup = closeFavoritesPopup;
window.showLocationOnMap = showLocationOnMap;

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
        
        // 기존 인포윈도우 닫기
        if (tempInfowindow) {
            tempInfowindow.close();
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
    // 데스크톱용 버튼들
    document.getElementById('randomPickBtn').addEventListener('click', pickRandomLocation);
    document.getElementById('resetBtn').addEventListener('click', resetMap);
    document.getElementById('favoriteBtn').addEventListener('click', showFavoritesList); // PC에서는 목록만 표시
    
    // 모바일용 버튼들
    document.getElementById('randomPickBtnMobile').addEventListener('click', pickRandomLocation);
    document.getElementById('favoritesListBtnMobile').addEventListener('click', openFavoritesPopup); // 찜 리스트 버튼: 팝업 열기
    // favoriteBtnMobile은 이미 pickRandomLocation에서 설정됨 (즐겨찾기 추가용)
    
    // 팝업 닫기 버튼
    document.getElementById('closePopupBtn').addEventListener('click', closeFavoritesPopup);
    
    // 팝업 배경 클릭 시 닫기
    document.getElementById('favoritesPopup').addEventListener('click', function(e) {
        if (e.target === this) {
            closeFavoritesPopup();
        }
    });
    
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
