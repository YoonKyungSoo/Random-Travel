// 여행 계획 관리 애플리케이션
let plannerMap = null;
let selectedDestinations = [];
let currentPlan = null;
let markers = [];
let polylines = [];

// 페이지 로드 시 초기화
window.addEventListener('load', function() {
    // 카카오맵 API 로딩 확인
    if (typeof kakao !== 'undefined' && kakao.maps) {
        initializePlannerMap();
    } else {
        // API 로딩 대기
        setTimeout(() => {
            if (typeof kakao !== 'undefined' && kakao.maps) {
                initializePlannerMap();
            }
        }, 1000);
    }
    
    // 즐겨찾기 목록 로드
    loadFavoritesList();
    
    // 이벤트 리스너 등록
    setupEventListeners();
    
    // 오늘 날짜를 기본값으로 설정
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('startDate').value = tomorrow.toISOString().split('T')[0];
});

// 카카오맵 초기화
function initializePlannerMap() {
    const container = document.getElementById('plannerMap');
    const options = {
        center: new kakao.maps.LatLng(36.5, 127.5), // 한국 중심
        level: 7
    };
    
    plannerMap = new kakao.maps.Map(container, options);
    console.log('✅ 플래너 지도 초기화 완료!');
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 여행 기간 변경 시 일정 업데이트
    document.getElementById('tripDays').addEventListener('change', updateScheduleDays);
    
    // 출발일 변경 시 일정 업데이트
    document.getElementById('startDate').addEventListener('change', updateScheduleDays);
    
    // 액션 버튼들
    document.getElementById('savePlanBtn').addEventListener('click', savePlan);
    document.getElementById('loadPlanBtn').addEventListener('click', showLoadModal);
    document.getElementById('sharePlanBtn').addEventListener('click', sharePlan);
    document.getElementById('clearPlanBtn').addEventListener('click', clearPlan);
    
    // 초기 일정 생성
    updateScheduleDays();
}

// 즐겨찾기 목록 로드
function loadFavoritesList() {
    const favorites = JSON.parse(localStorage.getItem('travelFavorites') || '[]');
    const container = document.getElementById('favoritesList');
    
    if (favorites.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">아직 즐겨찾기한 여행지가 없습니다.<br>메인 페이지에서 여행지를 선택하고 ❤️ 즐겨찾기에 추가해보세요!</p>';
        return;
    }
    
    container.innerHTML = '';
    
    favorites.forEach((favorite, index) => {
        const item = document.createElement('div');
        item.className = 'favorite-checkbox-item';
        item.dataset.index = index;
        item.innerHTML = `
            <input type="checkbox" id="fav_${index}" onchange="toggleDestination(${index}, this.checked)">
            <div class="location-info">
                <div class="location-name">${favorite.name}</div>
                <div class="location-description">${favorite.description || ''}</div>
            </div>
            <div class="drag-handle" draggable="true" ondragstart="dragStart(event)" ondragover="dragOver(event)" ondrop="drop(event)">⋮⋮</div>
        `;
        container.appendChild(item);
    });
    
    // 드래그 앤 드롭 이벤트 설정
    setupDragAndDrop();
}

// 여행지 선택/해제
function toggleDestination(index, checked) {
    const favorites = JSON.parse(localStorage.getItem('travelFavorites') || '[]');
    const favorite = favorites[index];
    
    if (checked) {
        // 중복 확인
        if (!selectedDestinations.find(dest => dest.name === favorite.name)) {
            selectedDestinations.push({
                ...favorite,
                order: selectedDestinations.length
            });
        }
    } else {
        // 제거
        selectedDestinations = selectedDestinations.filter(dest => dest.name !== favorite.name);
        // 순서 재정렬
        selectedDestinations.forEach((dest, i) => {
            dest.order = i;
        });
    }
    
    // UI 업데이트
    updateScheduleDisplay();
    updateMap();
    updateCheckboxStyles();
}

// 체크박스 스타일 업데이트
function updateCheckboxStyles() {
    const favorites = JSON.parse(localStorage.getItem('travelFavorites') || '[]');
    
    favorites.forEach((favorite, index) => {
        const item = document.querySelector(`[data-index="${index}"]`);
        const checkbox = document.getElementById(`fav_${index}`);
        
        if (selectedDestinations.find(dest => dest.name === favorite.name)) {
            item.classList.add('checked');
            checkbox.checked = true;
        } else {
            item.classList.remove('checked');
            checkbox.checked = false;
        }
    });
}

// 일정 일수 업데이트
function updateScheduleDays() {
    const days = parseInt(document.getElementById('tripDays').value);
    const startDate = new Date(document.getElementById('startDate').value);
    
    const container = document.getElementById('scheduleContainer');
    container.innerHTML = '';
    
    for (let i = 0; i <= days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'schedule-day';
        dayElement.innerHTML = `
            <div class="schedule-day-header">
                <div class="schedule-day-title">${i === 0 ? '출발일' : `${i}일차`}</div>
                <div class="schedule-day-date">${currentDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}</div>
            </div>
            <div class="schedule-day-content" data-day="${i}">
                ${i === 0 ? '<p style="color: #666; text-align: center; padding: 20px;">출발 준비</p>' : ''}
            </div>
        `;
        container.appendChild(dayElement);
    }
    
    updateScheduleDisplay();
}

// 일정 표시 업데이트
function updateScheduleDisplay() {
    if (selectedDestinations.length === 0) return;
    
    // 1일차부터 여행지 배치
    const days = parseInt(document.getElementById('tripDays').value);
    const destinationsPerDay = Math.ceil(selectedDestinations.length / days);
    
    for (let day = 1; day <= days; day++) {
        const dayContent = document.querySelector(`[data-day="${day}"]`);
        if (!dayContent) continue;
        
        const startIndex = (day - 1) * destinationsPerDay;
        const endIndex = Math.min(startIndex + destinationsPerDay, selectedDestinations.length);
        const dayDestinations = selectedDestinations.slice(startIndex, endIndex);
        
        dayContent.innerHTML = '';
        
        dayDestinations.forEach((dest, index) => {
            const scheduleItem = document.createElement('div');
            scheduleItem.className = 'schedule-item';
            scheduleItem.innerHTML = `
                <div class="schedule-item-number">${startIndex + index + 1}</div>
                <div class="schedule-item-info">
                    <div class="schedule-item-name">${dest.name}</div>
                    <div class="schedule-item-description">${dest.description || ''}</div>
                </div>
                <div class="schedule-item-controls">
                    <input type="time" placeholder="도착 시간" onchange="updateDestinationTime(${startIndex + index}, this.value, 'arrival')">
                    <select onchange="updateDestinationTransport(${startIndex + index}, this.value)">
                        <option value="">교통편</option>
                        <option value="car">🚗 자동차</option>
                        <option value="bus">🚌 버스</option>
                        <option value="train">🚄 기차</option>
                        <option value="plane">✈️ 비행기</option>
                        <option value="walk">🚶 도보</option>
                    </select>
                    <input type="number" placeholder="소요시간(분)" min="0" max="480" onchange="updateDestinationDuration(${startIndex + index}, this.value)">
                </div>
            `;
            dayContent.appendChild(scheduleItem);
        });
    }
}

// 여행지 시간 업데이트
function updateDestinationTime(index, time, type) {
    if (selectedDestinations[index]) {
        selectedDestinations[index][type] = time;
    }
}

// 교통편 업데이트
function updateDestinationTransport(index, transport) {
    if (selectedDestinations[index]) {
        selectedDestinations[index].transport = transport;
    }
}

// 소요시간 업데이트
function updateDestinationDuration(index, duration) {
    if (selectedDestinations[index]) {
        selectedDestinations[index].duration = parseInt(duration) || 0;
    }
}

// 지도 업데이트
function updateMap() {
    if (!plannerMap) return;
    
    // 기존 마커와 경로선 제거
    markers.forEach(marker => marker.setMap(null));
    polylines.forEach(polyline => polyline.setMap(null));
    markers = [];
    polylines = [];
    
    if (selectedDestinations.length === 0) {
        // 한국 중심으로 이동
        plannerMap.setCenter(new kakao.maps.LatLng(36.5, 127.5));
        plannerMap.setLevel(7);
        return;
    }
    
    // 마커 생성 및 경로선 그리기
    const positions = [];
    
    selectedDestinations.forEach((dest, index) => {
        const position = new kakao.maps.LatLng(dest.lat, dest.lng);
        positions.push(position);
        
        // 마커 생성
        const marker = new kakao.maps.Marker({
            position: position,
            map: plannerMap
        });
        
        // 마커에 번호 표시
        const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:10px;text-align:center;"><strong>${index + 1}</strong><br>${dest.name}</div>`
        });
        
        infowindow.open(plannerMap, marker);
        markers.push(marker);
    });
    
    // 경로선 그리기
    if (positions.length > 1) {
        const polyline = new kakao.maps.Polyline({
            path: positions,
            strokeWeight: 4,
            strokeColor: '#FF6B6B',
            strokeOpacity: 0.8,
            strokeStyle: 'solid'
        });
        
        polyline.setMap(plannerMap);
        polylines.push(polyline);
    }
    
    // 모든 마커가 보이도록 지도 범위 조정
    const bounds = new kakao.maps.LatLngBounds();
    positions.forEach(position => bounds.extend(position));
    plannerMap.setBounds(bounds);
}

// 드래그 앤 드롭 설정
function setupDragAndDrop() {
    const container = document.getElementById('favoritesList');
    
    container.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    
    container.addEventListener('drop', function(e) {
        e.preventDefault();
        const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
        const dropTarget = e.target.closest('.favorite-checkbox-item');
        
        if (dropTarget && !isNaN(draggedIndex)) {
            const dropIndex = parseInt(dropTarget.dataset.index);
            if (draggedIndex !== dropIndex) {
                reorderDestinations(draggedIndex, dropIndex);
            }
        }
    });
}

// 드래그 시작
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.closest('.favorite-checkbox-item').dataset.index);
    e.target.closest('.favorite-checkbox-item').classList.add('dragging');
}

// 드래그 오버
function dragOver(e) {
    e.preventDefault();
    e.target.closest('.favorite-checkbox-item')?.classList.add('drag-over');
}

// 드롭
function drop(e) {
    e.preventDefault();
    document.querySelectorAll('.favorite-checkbox-item').forEach(item => {
        item.classList.remove('dragging', 'drag-over');
    });
}

// 여행지 순서 변경
function reorderDestinations(fromIndex, toIndex) {
    const favorites = JSON.parse(localStorage.getItem('travelFavorites') || '[]');
    
    // 배열에서 항목 이동
    const [movedItem] = favorites.splice(fromIndex, 1);
    favorites.splice(toIndex, 0, movedItem);
    
    // 로컬 스토리지 업데이트
    localStorage.setItem('travelFavorites', JSON.stringify(favorites));
    
    // UI 다시 로드
    loadFavoritesList();
    
    // 선택된 여행지 순서도 업데이트
    selectedDestinations.forEach((dest, index) => {
        const favoriteIndex = favorites.findIndex(fav => fav.name === dest.name);
        if (favoriteIndex !== -1) {
            dest.order = favoriteIndex;
        }
    });
    
    // 순서대로 정렬
    selectedDestinations.sort((a, b) => a.order - b.order);
    
    updateScheduleDisplay();
    updateMap();
}

// 일정 저장
function savePlan() {
    const title = document.getElementById('tripTitle').value.trim();
    const days = document.getElementById('tripDays').value;
    const startDate = document.getElementById('startDate').value;
    
    if (!title) {
        alert('여행 제목을 입력해주세요.');
        return;
    }
    
    if (selectedDestinations.length === 0) {
        alert('방문할 여행지를 선택해주세요.');
        return;
    }
    
    const plan = {
        id: Date.now(),
        title: title,
        days: parseInt(days),
        startDate: startDate,
        destinations: selectedDestinations,
        createdAt: new Date().toISOString()
    };
    
    // 기존 일정 불러오기
    const savedPlans = JSON.parse(localStorage.getItem('travelPlans') || '[]');
    savedPlans.push(plan);
    localStorage.setItem('travelPlans', JSON.stringify(savedPlans));
    
    alert('여행 일정이 저장되었습니다!');
    currentPlan = plan;
}

// 일정 불러오기 모달 표시
function showLoadModal() {
    const savedPlans = JSON.parse(localStorage.getItem('travelPlans') || '[]');
    const container = document.getElementById('savedPlansList');
    
    if (savedPlans.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">저장된 여행 일정이 없습니다.</p>';
    } else {
        container.innerHTML = '';
        savedPlans.forEach(plan => {
            const item = document.createElement('div');
            item.className = 'saved-plan-item';
            item.onclick = () => loadPlan(plan);
            item.innerHTML = `
                <div class="saved-plan-title">${plan.title}</div>
                <div class="saved-plan-details">
                    ${plan.days}박 ${plan.days + 1}일 | ${plan.destinations.length}개 여행지 | 
                    ${new Date(plan.createdAt).toLocaleDateString('ko-KR')}
                </div>
            `;
            container.appendChild(item);
        });
    }
    
    document.getElementById('loadModal').classList.add('show');
}

// 일정 불러오기
function loadPlan(plan) {
    document.getElementById('tripTitle').value = plan.title;
    document.getElementById('tripDays').value = plan.days;
    document.getElementById('startDate').value = plan.startDate;
    
    selectedDestinations = [...plan.destinations];
    currentPlan = plan;
    
    // UI 업데이트
    updateScheduleDays();
    updateCheckboxStyles();
    updateMap();
    
    // 모달 닫기
    closeLoadModal();
}

// 모달 닫기
function closeLoadModal() {
    document.getElementById('loadModal').classList.remove('show');
}

// 일정 공유
function sharePlan() {
    if (!currentPlan) {
        alert('먼저 여행 일정을 저장해주세요.');
        return;
    }
    
    // 간단한 텍스트 형태로 공유
    const shareText = `🗓️ ${currentPlan.title}\n` +
        `📅 ${currentPlan.days}박 ${currentPlan.days + 1}일\n` +
        `📍 ${currentPlan.destinations.map(d => d.name).join(' → ')}\n` +
        `📱 랜덤 여행지 픽!에서 만든 여행 계획입니다.`;
    
    if (navigator.share) {
        navigator.share({
            title: currentPlan.title,
            text: shareText
        });
    } else {
        // 클립보드에 복사
        navigator.clipboard.writeText(shareText).then(() => {
            alert('여행 일정이 클립보드에 복사되었습니다!');
        });
    }
}

// 일정 초기화
function clearPlan() {
    if (confirm('정말로 현재 여행 일정을 초기화하시겠습니까?')) {
        document.getElementById('tripTitle').value = '';
        document.getElementById('tripDays').value = '1';
        document.getElementById('startDate').value = '';
        
        selectedDestinations = [];
        currentPlan = null;
        
        // UI 업데이트
        updateScheduleDays();
        updateCheckboxStyles();
        updateMap();
        
        // 모든 체크박스 해제
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        document.querySelectorAll('.favorite-checkbox-item').forEach(item => {
            item.classList.remove('checked');
        });
    }
}
