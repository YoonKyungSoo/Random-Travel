// 서울특별시 지역 정보
window.seoulLocations = [
    // 강남구
    { name: '강남구', description: '강남대로와 강남역이 유명한 서울의 중심지', lat: 37.5172, lng: 127.0473, type: '구' },
    { name: '강남구 역삼동', description: '강남역과 역삼역이 있는 번화가', lat: 37.5000, lng: 127.0333, type: '동' },
    { name: '강남구 삼성동', description: '코엑스몰과 삼성역이 있는 지역', lat: 37.5083, lng: 127.0558, type: '동' },
    { name: '강남구 청담동', description: '청담동 패션거리로 유명한 지역', lat: 37.5194, lng: 127.0472, type: '동' },
    { name: '강남구 신사동', description: '가로수길과 압구정역이 있는 지역', lat: 37.5167, lng: 127.0167, type: '동' },
    { name: '강남구 논현동', description: '논현역과 논현로가 있는 지역', lat: 37.5083, lng: 127.0250, type: '동' },
    { name: '강남구 압구정동', description: '압구정역과 압구정로가 있는 지역', lat: 37.5250, lng: 127.0333, type: '동' },
    { name: '강남구 세곡동', description: '세곡역과 세곡로가 있는 지역', lat: 37.4667, lng: 127.1000, type: '동' },
    { name: '강남구 자곡동', description: '자곡역과 자곡로가 있는 지역', lat: 37.4583, lng: 127.1083, type: '동' },
    { name: '강남구 수서동', description: '수서역과 수서로가 있는 지역', lat: 37.4833, lng: 127.1000, type: '동' },
    { name: '강남구 도곡동', description: '도곡역과 도곡로가 있는 지역', lat: 37.4917, lng: 127.0500, type: '동' },
    { name: '강남구 개포동', description: '개포역과 개포로가 있는 지역', lat: 37.4833, lng: 127.0667, type: '동' },
    
    // 강동구
    { name: '강동구', description: '천호동과 강동구청이 있는 지역', lat: 37.5301, lng: 127.1238, type: '구' },
    { name: '강동구 천호동', description: '천호역과 천호로가 있는 지역', lat: 37.5383, lng: 127.1250, type: '동' },
    { name: '강동구 성내동', description: '성내역과 성내로가 있는 지역', lat: 37.5250, lng: 127.1333, type: '동' },
    { name: '강동구 길동', description: '길동역과 길동로가 있는 지역', lat: 37.5167, lng: 127.1417, type: '동' },
    { name: '강동구 둔촌동', description: '둔촌역과 둔촌로가 있는 지역', lat: 37.5083, lng: 127.1500, type: '동' },
    { name: '강동구 암사동', description: '암사역과 암사로가 있는 지역', lat: 37.5500, lng: 127.1167, type: '동' },
    { name: '강동구 고덕동', description: '고덕역과 고덕로가 있는 지역', lat: 37.5583, lng: 127.1417, type: '동' },
    { name: '강동구 상일동', description: '상일역과 상일로가 있는 지역', lat: 37.5667, lng: 127.1583, type: '동' },
    
    // 강북구
    { name: '강북구', description: '수유동과 강북구청이 있는 지역', lat: 37.6396, lng: 127.0257, type: '구' },
    { name: '강북구 번동', description: '번동역과 번동로가 있는 지역', lat: 37.6333, lng: 127.0333, type: '동' },
    { name: '강북구 수유동', description: '수유역과 수유로가 있는 지역', lat: 37.6417, lng: 127.0250, type: '동' },
    { name: '강북구 우이동', description: '우이역과 우이로가 있는 지역', lat: 37.6500, lng: 127.0167, type: '동' },
    { name: '강북구 인수동', description: '인수역과 인수로가 있는 지역', lat: 37.6250, lng: 127.0167, type: '동' },
    
    // 강서구
    { name: '강서구', description: '김포공항과 강서구청이 있는 지역', lat: 37.5509, lng: 126.8495, type: '구' },
    { name: '강서구 염창동', description: '염창역과 염창로가 있는 지역', lat: 37.5583, lng: 126.8750, type: '동' },
    { name: '강서구 등촌동', description: '등촌역과 등촌로가 있는 지역', lat: 37.5500, lng: 126.8583, type: '동' },
    { name: '강서구 화곡동', description: '화곡역과 화곡로가 있는 지역', lat: 37.5417, lng: 126.8417, type: '동' },
    { name: '강서구 가양동', description: '가양역과 가양로가 있는 지역', lat: 37.5667, lng: 126.8583, type: '동' },
    { name: '강서구 마곡동', description: '마곡역과 마곡로가 있는 지역', lat: 37.5583, lng: 126.8250, type: '동' },
    { name: '강서구 내발산동', description: '내발산역과 내발산로가 있는 지역', lat: 37.5500, lng: 126.8083, type: '동' },
    { name: '강서구 외발산동', description: '외발산역과 외발산로가 있는 지역', lat: 37.5417, lng: 126.7917, type: '동' },
    { name: '강서구 공항동', description: '김포공항역과 공항로가 있는 지역', lat: 37.5583, lng: 126.8083, type: '동' },
    { name: '강서구 과해동', description: '과해역과 과해로가 있는 지역', lat: 37.5667, lng: 126.7917, type: '동' },
    { name: '강서구 오곡동', description: '오곡역과 오곡로가 있는 지역', lat: 37.5750, lng: 126.8083, type: '동' },
    { name: '강서구 오쇠동', description: '오쇠역과 오쇠로가 있는 지역', lat: 37.5833, lng: 126.8250, type: '동' },
    
    // 관악구
    { name: '관악구', description: '서울대학교와 관악구청이 있는 지역', lat: 37.4784, lng: 126.9516, type: '구' },
    { name: '관악구 봉천동', description: '봉천역과 봉천로가 있는 지역', lat: 37.4833, lng: 126.9417, type: '동' },
    { name: '관악구 신림동', description: '신림역과 신림로가 있는 지역', lat: 37.4750, lng: 126.9333, type: '동' },
    { name: '관악구 남현동', description: '남현역과 남현로가 있는 지역', lat: 37.4667, lng: 126.9750, type: '동' },
    
    // 광진구
    { name: '광진구', description: '건대입구역과 광진구청이 있는 지역', lat: 37.5384, lng: 127.0822, type: '구' },
    { name: '광진구 중곡동', description: '중곡역과 중곡로가 있는 지역', lat: 37.5500, lng: 127.0750, type: '동' },
    { name: '광진구 능동', description: '능동역과 능동로가 있는 지역', lat: 37.5417, lng: 127.0833, type: '동' },
    { name: '광진구 구의동', description: '구의역과 구의로가 있는 지역', lat: 37.5333, lng: 127.0917, type: '동' },
    { name: '광진구 광장동', description: '광장역과 광장로가 있는 지역', lat: 37.5250, lng: 127.1000, type: '동' },
    { name: '광진구 자양동', description: '자양역과 자양로가 있는 지역', lat: 37.5417, lng: 127.0667, type: '동' },
    { name: '광진구 화양동', description: '화양역과 화양로가 있는 지역', lat: 37.5500, lng: 127.0583, type: '동' },
    { name: '광진구 군자동', description: '군자역과 군자로가 있는 지역', lat: 37.5583, lng: 127.0750, type: '동' }
];
