// 부산광역시 지역 정보
window.busanLocations = [
    // 중구
    { name: '중구', description: '부산의 중심지, 부산역과 중앙동이 있는 지역', lat: 35.1795, lng: 129.0756, type: '구' },
    { name: '중구 중앙동', description: '부산의 중심 상권, 중앙동 번화가', lat: 35.1795, lng: 129.0756, type: '동' },
    { name: '중구 동광동', description: '동광동 번화가와 상권이 발달한 지역', lat: 35.1750, lng: 129.0833, type: '동' },
    { name: '중구 대청동', description: '대청동과 대청로가 있는 지역', lat: 35.1708, lng: 129.0917, type: '동' },
    { name: '중구 보수동', description: '보수동과 보수로가 있는 지역', lat: 35.1667, lng: 129.1000, type: '동' },
    { name: '중구 부평동', description: '부평동과 부평로가 있는 지역', lat: 35.1625, lng: 129.1083, type: '동' },
    { name: '중구 임천동', description: '임천동과 임천로가 있는 지역', lat: 35.1583, lng: 129.1167, type: '동' },
    { name: '중구 남포동', description: '남포동과 남포로가 있는 지역', lat: 35.1542, lng: 129.1250, type: '동' },
    { name: '중구 영주동', description: '영주동과 영주로가 있는 지역', lat: 35.1500, lng: 129.1333, type: '동' },
    
    // 서구
    { name: '서구', description: '부산 서쪽 지역, 서구청이 있는 지역', lat: 35.0979, lng: 129.0244, type: '구' },
    { name: '서구 동대신동', description: '동대신동과 동대신로가 있는 지역', lat: 35.1083, lng: 129.0167, type: '동' },
    { name: '서구 서대신동', description: '서대신동과 서대신로가 있는 지역', lat: 35.1000, lng: 129.0083, type: '동' },
    { name: '서구 부용동', description: '부용동과 부용로가 있는 지역', lat: 35.0917, lng: 129.0000, type: '동' },
    { name: '서구 부민동', description: '부민동과 부민로가 있는 지역', lat: 35.0833, lng: 128.9917, type: '동' },
    { name: '서구 토성동', description: '토성동과 토성로가 있는 지역', lat: 35.0750, lng: 128.9833, type: '동' },
    { name: '서구 아미동', description: '아미동과 아미로가 있는 지역', lat: 35.0667, lng: 128.9750, type: '동' },
    { name: '서구 초장동', description: '초장동과 초장로가 있는 지역', lat: 35.0583, lng: 128.9667, type: '동' },
    { name: '서구 충무동', description: '충무동과 충무로가 있는 지역', lat: 35.0500, lng: 128.9583, type: '동' },
    { name: '서구 남부민동', description: '남부민동과 남부민로가 있는 지역', lat: 35.0417, lng: 128.9500, type: '동' },
    { name: '서구 암남동', description: '암남동과 암남로가 있는 지역', lat: 35.0333, lng: 128.9417, type: '동' },
    
    // 동구
    { name: '동구', description: '부산 동쪽 지역, 동구청이 있는 지역', lat: 35.1294, lng: 129.0454, type: '구' },
    { name: '동구 초량동', description: '초량동과 초량로가 있는 지역', lat: 35.1333, lng: 129.0417, type: '동' },
    { name: '동구 수정동', description: '수정동과 수정로가 있는 지역', lat: 35.1375, lng: 129.0375, type: '동' },
    { name: '동구 좌천동', description: '좌천동과 좌천로가 있는 지역', lat: 35.1417, lng: 129.0333, type: '동' },
    { name: '동구 범일동', description: '범일동과 범일로가 있는 지역', lat: 35.1458, lng: 129.0292, type: '동' },
    
    // 영도구
    { name: '영도구', description: '영도와 태종대가 있는 지역', lat: 35.0912, lng: 129.0676, type: '구' },
    { name: '영도구 남항동', description: '남항동과 남항로가 있는 지역', lat: 35.0958, lng: 129.0625, type: '동' },
    { name: '영도구 영선동', description: '영선동과 영선로가 있는 지역', lat: 35.1000, lng: 129.0583, type: '동' },
    { name: '영도구 신선동', description: '신선동과 신선로가 있는 지역', lat: 35.1042, lng: 129.0542, type: '동' },
    { name: '영도구 봉래동', description: '봉래동과 봉래로가 있는 지역', lat: 35.1083, lng: 129.0500, type: '동' },
    { name: '영도구 청학동', description: '청학동과 청학로가 있는 지역', lat: 35.1125, lng: 129.0458, type: '동' },
    { name: '영도구 동삼동', description: '동삼동과 동삼로가 있는 지역', lat: 35.1167, lng: 129.0417, type: '동' },
    
    // 부산진구
    { name: '부산진구', description: '부산진구청과 서면 번화가가 있는 지역', lat: 35.1626, lng: 129.0526, type: '구' },
    { name: '부산진구 부전동', description: '부전동과 부전로가 있는 지역', lat: 35.1667, lng: 129.0500, type: '동' },
    { name: '부산진구 연지동', description: '연지동과 연지로가 있는 지역', lat: 35.1708, lng: 129.0475, type: '동' },
    { name: '부산진구 초읍동', description: '초읍동과 초읍로가 있는 지역', lat: 35.1750, lng: 129.0450, type: '동' },
    { name: '부산진구 양정동', description: '양정동과 양정로가 있는 지역', lat: 35.1792, lng: 129.0425, type: '동' },
    { name: '부산진구 전포동', description: '전포동과 전포로가 있는 지역', lat: 35.1833, lng: 129.0400, type: '동' },
    { name: '부산진구 부암동', description: '부암동과 부암로가 있는 지역', lat: 35.1875, lng: 129.0375, type: '동' },
    { name: '부산진구 당감동', description: '당감동과 당감로가 있는 지역', lat: 35.1917, lng: 129.0350, type: '동' },
    { name: '부산진구 가야동', description: '가야동과 가야로가 있는 지역', lat: 35.1958, lng: 129.0325, type: '동' },
    { name: '부산진구 개금동', description: '개금동과 개금로가 있는 지역', lat: 35.2000, lng: 129.0300, type: '동' },
    
    // 동래구
    { name: '동래구', description: '동래구청과 동래온천이 있는 지역', lat: 35.2054, lng: 129.0785, type: '구' },
    { name: '동래구 명륜동', description: '명륜동과 명륜로가 있는 지역', lat: 35.2083, lng: 129.0750, type: '동' },
    { name: '동래구 온천동', description: '온천동과 온천로가 있는 지역', lat: 35.2111, lng: 129.0715, type: '동' },
    { name: '동래구 사직동', description: '사직동과 사직로가 있는 지역', lat: 35.2140, lng: 129.0680, type: '동' },
    { name: '동래구 안락동', description: '안락동과 안락로가 있는 지역', lat: 35.2169, lng: 129.0645, type: '동' },
    { name: '동래구 복천동', description: '복천동과 복천로가 있는 지역', lat: 35.2198, lng: 129.0610, type: '동' },
    { name: '동래구 칠산동', description: '칠산동과 칠산로가 있는 지역', lat: 35.2227, lng: 129.0575, type: '동' },
    { name: '동래구 낙민동', description: '낙민동과 낙민로가 있는 지역', lat: 35.2256, lng: 129.0540, type: '동' },
    { name: '동래구 명장동', description: '명장동과 명장로가 있는 지역', lat: 35.2285, lng: 129.0505, type: '동' },
    { name: '동래구 수안동', description: '수안동과 수안로가 있는 지역', lat: 35.2314, lng: 129.0470, type: '동' },
    
    // 남구
    { name: '남구', description: '남구청과 광안대교가 있는 지역', lat: 35.1366, lng: 129.0829, type: '구' },
    { name: '남구 대연동', description: '대연동과 대연로가 있는 지역', lat: 35.1400, lng: 129.0800, type: '동' },
    { name: '남구 용호동', description: '용호동과 용호로가 있는 지역', lat: 35.1433, lng: 129.0770, type: '동' },
    { name: '남구 용당동', description: '용당동과 용당로가 있는 지역', lat: 35.1467, lng: 129.0740, type: '동' },
    { name: '남구 문현동', description: '문현동과 문현로가 있는 지역', lat: 35.1500, lng: 129.0710, type: '동' },
    { name: '남구 우암동', description: '우암동과 우암로가 있는 지역', lat: 35.1533, lng: 129.0680, type: '동' },
    { name: '남구 감만동', description: '감만동과 감만로가 있는 지역', lat: 35.1567, lng: 129.0650, type: '동' },
    
    // 북구
    { name: '북구', description: '북구청과 금정산이 있는 지역', lat: 35.1972, lng: 129.0104, type: '구' },
    { name: '북구 구포동', description: '구포동과 구포로가 있는 지역', lat: 35.2000, lng: 129.0080, type: '동' },
    { name: '북구 금곡동', description: '금곡동과 금곡로가 있는 지역', lat: 35.2028, lng: 129.0056, type: '동' },
    { name: '북구 화명동', description: '화명동과 화명로가 있는 지역', lat: 35.2056, lng: 129.0032, type: '동' },
    { name: '북구 덕천동', description: '덕천동과 덕천로가 있는 지역', lat: 35.2084, lng: 129.0008, type: '동' },
    { name: '북구 만덕동', description: '만덕동과 만덕로가 있는 지역', lat: 35.2112, lng: 128.9984, type: '동' },
    
    // 해운대구
    { name: '해운대구', description: '해운대 해수욕장과 마린시티가 있는 지역', lat: 35.1632, lng: 129.1632, type: '구' },
    { name: '해운대구 우동', description: '우동과 우동로가 있는 지역', lat: 35.1667, lng: 129.1600, type: '동' },
    { name: '해운대구 중동', description: '중동과 중동로가 있는 지역', lat: 35.1700, lng: 129.1567, type: '동' },
    { name: '해운대구 좌동', description: '좌동과 좌동로가 있는 지역', lat: 35.1733, lng: 129.1533, type: '동' },
    { name: '해운대구 송정동', description: '송정동과 송정로가 있는 지역', lat: 35.1767, lng: 129.1500, type: '동' },
    
    // 사하구
    { name: '사하구', description: '사하구청과 을숙도가 있는 지역', lat: 35.1048, lng: 128.9740, type: '구' },
    { name: '사하구 괴정동', description: '괴정동과 괴정로가 있는 지역', lat: 35.1083, lng: 128.9700, type: '동' },
    { name: '사하구 당리동', description: '당리동과 당리로가 있는 지역', lat: 35.1117, lng: 128.9660, type: '동' },
    { name: '사하구 하단동', description: '하단동과 하단로가 있는 지역', lat: 35.1150, lng: 128.9620, type: '동' },
    { name: '사하구 신평동', description: '신평동과 신평로가 있는 지역', lat: 35.1183, lng: 128.9580, type: '동' },
    { name: '사하구 장림동', description: '장림동과 장림로가 있는 지역', lat: 35.1217, lng: 128.9540, type: '동' },
    { name: '사하구 구평동', description: '구평동과 구평로가 있는 지역', lat: 35.1250, lng: 128.9500, type: '동' },
    { name: '사하구 감천동', description: '감천동과 감천로가 있는 지역', lat: 35.1283, lng: 128.9460, type: '동' },
    
    // 금정구
    { name: '금정구', description: '금정구청과 금정산이 있는 지역', lat: 35.2434, lng: 129.0928, type: '구' },
    { name: '금정구 서동', description: '서동과 서동로가 있는 지역', lat: 35.2467, lng: 129.0900, type: '동' },
    { name: '금정구 금사동', description: '금사동과 금사로가 있는 지역', lat: 35.2500, lng: 129.0870, type: '동' },
    { name: '금정구 부곡동', description: '부곡동과 부곡로가 있는 지역', lat: 35.2533, lng: 129.0840, type: '동' },
    { name: '금정구 오륜동', description: '오륜동과 오륜로가 있는 지역', lat: 35.2567, lng: 129.0810, type: '동' },
    { name: '금정구 수정동', description: '수정동과 수정로가 있는 지역', lat: 35.2600, lng: 129.0780, type: '동' },
    { name: '금정구 청룡동', description: '청룡동과 청룡로가 있는 지역', lat: 35.2633, lng: 129.0750, type: '동' },
    { name: '금정구 남산동', description: '남산동과 남산로가 있는 지역', lat: 35.2667, lng: 129.0720, type: '동' },
    { name: '금정구 구서동', description: '구서동과 구서로가 있는 지역', lat: 35.2700, lng: 129.0690, type: '동' },
    { name: '금정구 금성동', description: '금성동과 금성로가 있는 지역', lat: 35.2733, lng: 129.0660, type: '동' },
    
    // 강서구
    { name: '강서구', description: '강서구청과 김해공항이 있는 지역', lat: 35.2124, lng: 128.9800, type: '구' },
    { name: '강서구 대저동', description: '대저동과 대저로가 있는 지역', lat: 35.2167, lng: 128.9760, type: '동' },
    { name: '강서구 명지동', description: '명지동과 명지로가 있는 지역', lat: 35.2200, lng: 128.9720, type: '동' },
    { name: '강서구 녹산동', description: '녹산동과 녹산로가 있는 지역', lat: 35.2233, lng: 128.9680, type: '동' },
    { name: '강서구 가락동', description: '가락동과 가락로가 있는 지역', lat: 35.2267, lng: 128.9640, type: '동' },
    { name: '강서구 천성동', description: '천성동과 천성로가 있는 지역', lat: 35.2300, lng: 128.9600, type: '동' },
    
    // 연제구
    { name: '연제구', description: '연제구청과 연산동이 있는 지역', lat: 35.1766, lng: 129.1124, type: '구' },
    { name: '연제구 연산동', description: '연산동과 연산로가 있는 지역', lat: 35.1800, lng: 129.1100, type: '동' },
    { name: '연제구 거제동', description: '거제동과 거제로가 있는 지역', lat: 35.1833, lng: 129.1075, type: '동' },
    { name: '연제구 월평동', description: '월평동과 월평로가 있는 지역', lat: 35.1867, lng: 129.1050, type: '동' },
    { name: '연제구 거성동', description: '거성동과 거성로가 있는 지역', lat: 35.1900, lng: 129.1025, type: '동' },
    { name: '연제구 토월동', description: '토월동과 토월로가 있는 지역', lat: 35.1933, lng: 129.1000, type: '동' },
    
    // 수영구
    { name: '수영구', description: '수영구청과 광안대교가 있는 지역', lat: 35.1455, lng: 129.1135, type: '구' },
    { name: '수영구 남천동', description: '남천동과 남천로가 있는 지역', lat: 35.1483, lng: 129.1100, type: '동' },
    { name: '수영구 수영동', description: '수영동과 수영로가 있는 지역', lat: 35.1511, lng: 129.1065, type: '동' },
    { name: '수영구 망미동', description: '망미동과 망미로가 있는 지역', lat: 35.1539, lng: 129.1030, type: '동' },
    { name: '수영구 광안동', description: '광안동과 광안로가 있는 지역', lat: 35.1567, lng: 129.0995, type: '동' },
    
    // 사상구
    { name: '사상구', description: '사상구청과 사상역이 있는 지역', lat: 35.1528, lng: 128.9910, type: '구' },
    { name: '사상구 삼락동', description: '삼락동과 삼락로가 있는 지역', lat: 35.1567, lng: 128.9870, type: '동' },
    { name: '사상구 모라동', description: '모라동과 모라로가 있는 지역', lat: 35.1600, lng: 128.9830, type: '동' },
    { name: '사상구 덕포동', description: '덕포동과 덕포로가 있는 지역', lat: 35.1633, lng: 128.9790, type: '동' },
    { name: '사상구 괘법동', description: '괘법동과 괘법로가 있는 지역', lat: 35.1667, lng: 128.9750, type: '동' },
    { name: '사상구 감전동', description: '감전동과 감전로가 있는 지역', lat: 35.1700, lng: 128.9710, type: '동' },
    
    // 기장군
    { name: '기장군', description: '기장군청과 해운대 해수욕장이 있는 지역', lat: 35.2444, lng: 129.2222, type: '군' },
    { name: '기장군 기장읍', description: '기장읍과 기장로가 있는 지역', lat: 35.2472, lng: 129.2180, type: '읍' },
    { name: '기장군 장안읍', description: '장안읍과 장안로가 있는 지역', lat: 35.2500, lng: 129.2138, type: '읍' },
    { name: '기장군 정관읍', description: '정관읍과 정관로가 있는 지역', lat: 35.2528, lng: 129.2096, type: '읍' },
    { name: '기장군 일광면', description: '일광면과 일광로가 있는 지역', lat: 35.2556, lng: 129.2054, type: '면' },
    { name: '기장군 철마면', description: '철마면과 철마로가 있는 지역', lat: 35.2584, lng: 129.2012, type: '면' }
];
