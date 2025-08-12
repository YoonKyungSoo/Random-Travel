// 경기도 지역 정보
window.gyeonggiLocations = [
    // 수원시
    { name: '수원시', description: '경기도청 소재지, 화성과 수원갈비가 유명한 도시', lat: 37.2636, lng: 127.0286, type: '시' },
    { name: '수원시 장안구', description: '수원시 장안구청이 있는 지역', lat: 37.3030, lng: 127.0090, type: '구' },
    { name: '수원시 권선구', description: '수원시 권선구청이 있는 지역', lat: 37.2570, lng: 127.0280, type: '구' },
    { name: '수원시 팔달구', description: '수원시 팔달구청이 있는 지역', lat: 37.2820, lng: 127.0190, type: '구' },
    { name: '수원시 영통구', description: '수원시 영통구청이 있는 지역', lat: 37.2510, lng: 127.0470, type: '구' },
    
    // 고양시
    { name: '고양시', description: '일산호수공원과 고양국제꽃박람회가 유명한 도시', lat: 37.6584, lng: 126.8320, type: '시' },
    { name: '고양시 덕양구', description: '고양시 덕양구청이 있는 지역', lat: 37.6340, lng: 126.8320, type: '구' },
    { name: '고양시 일산동구', description: '고양시 일산동구청이 있는 지역', lat: 37.6580, lng: 126.7700, type: '구' },
    { name: '고양시 일산서구', description: '고양시 일산서구청이 있는 지역', lat: 37.6580, lng: 126.7700, type: '구' },
    
    // 용인시
    { name: '용인시', description: '에버랜드와 한국민속촌이 있는 관광도시', lat: 37.2411, lng: 127.1776, type: '시' },
    { name: '용인시 처인구', description: '용인시 처인구청이 있는 지역', lat: 37.2340, lng: 127.2010, type: '구' },
    { name: '용인시 기흥구', description: '용인시 기흥구청이 있는 지역', lat: 37.2740, lng: 127.1140, type: '구' },
    { name: '용인시 수지구', description: '용인시 수지구청이 있는 지역', lat: 37.3220, lng: 127.0980, type: '구' },
    
    // 성남시
    { name: '성남시', description: '판교테크노밸리와 분당신도시가 있는 도시', lat: 37.4449, lng: 127.1450, type: '시' },
    { name: '성남시 수정구', description: '성남시 수정구청이 있는 지역', lat: 37.4510, lng: 127.1520, type: '구' },
    { name: '성남시 중원구', description: '성남시 중원구청이 있는 지역', lat: 37.4300, lng: 127.1370, type: '구' },
    { name: '성남시 분당구', description: '성남시 분당구청이 있는 지역', lat: 37.3590, lng: 127.1080, type: '구' },
    
    // 부천시
    { name: '부천시', description: '부천국제만화축제와 상동호수공원이 있는 도시', lat: 37.5035, lng: 126.7660, type: '시' },
    { name: '부천시 원미구', description: '부천시 원미구청이 있는 지역', lat: 37.4950, lng: 126.7870, type: '구' },
    { name: '부천시 소사구', description: '부천시 소사구청이 있는 지역', lat: 37.4820, lng: 126.7950, type: '구' },
    { name: '부천시 오정구', description: '부천시 오정구청이 있는 지역', lat: 37.5260, lng: 126.7920, type: '구' },
    
    // 안산시
    { name: '안산시', description: '반월공단과 대부도가 있는 도시', lat: 37.3219, lng: 126.8309, type: '시' },
    { name: '안산시 상록구', description: '안산시 상록구청이 있는 지역', lat: 37.3020, lng: 126.8430, type: '구' },
    { name: '안산시 단원구', description: '안산시 단원구청이 있는 지역', lat: 37.3270, lng: 126.8150, type: '구' },
    
    // 안양시
    { name: '안양시', description: '안양예술공원과 만안교가 있는 도시', lat: 37.4564, lng: 126.7052, type: '시' },
    { name: '안양시 만안구', description: '안양시 만안구청이 있는 지역', lat: 37.4560, lng: 126.7050, type: '구' },
    { name: '안양시 동안구', description: '안양시 동안구청이 있는 지역', lat: 37.4560, lng: 126.7050, type: '구' },
    
    // 평택시
    { name: '평택시', description: '평택항과 송탄공단이 있는 도시', lat: 36.9920, lng: 127.1128, type: '시' },
    
    // 시흥시
    { name: '시흥시', description: '시흥갯골생태공원과 정왕동이 있는 도시', lat: 37.3796, lng: 126.8030, type: '시' },
    
    // 김포시
    { name: '김포시', description: '김포공항과 김포한강공원이 있는 도시', lat: 37.6156, lng: 126.7158, type: '시' },
    
    // 광주시
    { name: '광주시', description: '광주호와 남한산성이 있는 도시', lat: 37.4295, lng: 127.2550, type: '시' },
    
    // 하남시
    { name: '하남시', description: '하남스타필드와 미사강변도시가 있는 도시', lat: 37.5392, lng: 127.2148, type: '시' },
    
    // 오산시
    { name: '오산시', description: '오산천과 오산시민운동장이 있는 도시', lat: 37.1498, lng: 127.0772, type: '시' },
    
    // 이천시
    { name: '이천시', description: '이천도자기축제와 설봉산이 있는 도시', lat: 37.2720, lng: 127.4350, type: '시' },
    
    // 안성시
    { name: '안성시', description: '안성맞춤랜드와 안성팜랜드가 있는 도시', lat: 37.0080, lng: 127.2790, type: '시' },
    
    // 의왕시
    { name: '의왕시', description: '의왕레포츠타운과 청계산이 있는 도시', lat: 37.3446, lng: 126.9480, type: '시' },
    
    // 과천시
    { name: '과천시', description: '과천정부청사와 서울대공원이 있는 도시', lat: 37.4299, lng: 126.9870, type: '시' },
    
    // 구리시
    { name: '구리시', description: '구리한강공원과 아차산이 있는 도시', lat: 37.5944, lng: 127.1296, type: '시' },
    
    // 남양주시
    { name: '남양주시', description: '남양주한강공원과 광릉수목원이 있는 도시', lat: 37.6360, lng: 127.2160, type: '시' },
    
    // 파주시
    { name: '파주시', description: '헤이리예술마을과 임진각이 있는 도시', lat: 37.8150, lng: 126.7930, type: '시' },
    
    // 양평군
    { name: '양평군', description: '양평두물머리와 용문산이 있는 지역', lat: 37.4910, lng: 127.4880, type: '군' },
    
    // 여주시
    { name: '여주시', description: '여주세종대왕릉과 여주박물관이 있는 도시', lat: 37.2980, lng: 127.6370, type: '시' },
    
    // 가평군
    { name: '가평군', description: '가평유명산과 청평호가 있는 지역', lat: 37.8310, lng: 127.5100, type: '군' },
    
    // 연천군
    { name: '연천군', description: '연천전곡리선사유적과 한탄강이 있는 지역', lat: 38.0960, lng: 127.0750, type: '군' },
    
    // 포천시
    { name: '포천시', description: '포천산정호수와 운악산이 있는 도시', lat: 37.8940, lng: 127.2000, type: '시' },
    
    // 동두천시
    { name: '동두천시', description: '동두천천과 보산동이 있는 도시', lat: 37.9030, lng: 127.0610, type: '시' },
    
    // 양주시
    { name: '양주시', description: '양주회암사지와 덕정동이 있는 도시', lat: 37.8320, lng: 127.0460, type: '시' },
    
    // 의정부시
    { name: '의정부시', description: '의정부시민운동장과 자일해변이 있는 도시', lat: 37.7380, lng: 127.0340, type: '시' },
    
    // 광명시
    { name: '광명시', description: '광명동굴과 철산동이 있는 도시', lat: 37.4790, lng: 126.8640, type: '시' },
    
    // 군포시
    { name: '군포시', description: '군포시민운동장과 산본동이 있는 도시', lat: 37.3610, lng: 126.9330, type: '시' },
    
    // 하남시
    { name: '하남시', description: '하남스타필드와 미사강변도시가 있는 도시', lat: 37.5392, lng: 127.2148, type: '시' },
    
    // 광주시
    { name: '광주시', description: '광주호와 남한산성이 있는 도시', lat: 37.4295, lng: 127.2550, type: '시' },
    
    // 여주시
    { name: '여주시', description: '여주세종대왕릉과 여주박물관이 있는 도시', lat: 37.2980, lng: 127.6370, type: '시' },
    
    // 이천시
    { name: '이천시', description: '이천도자기축제와 설봉산이 있는 도시', lat: 37.2720, lng: 127.4350, type: '시' },
    
    // 안성시
    { name: '안성시', description: '안성맞춤랜드와 안성팜랜드가 있는 도시', lat: 37.0080, lng: 127.2790, type: '시' },
    
    // 의왕시
    { name: '의왕시', description: '의왕레포츠타운과 청계산이 있는 도시', lat: 37.3446, lng: 126.9480, type: '시' },
    
    // 과천시
    { name: '과천시', description: '과천정부청사와 서울대공원이 있는 도시', lat: 37.4299, lng: 126.9870, type: '시' },
    
    // 구리시
    { name: '구리시', description: '구리한강공원과 아차산이 있는 도시', lat: 37.5944, lng: 127.1296, type: '시' },
    
    // 남양주시
    { name: '남양주시', description: '남양주한강공원과 광릉수목원이 있는 도시', lat: 37.6360, lng: 127.2160, type: '시' },
    
    // 파주시
    { name: '파주시', description: '헤이리예술마을과 임진각이 있는 도시', lat: 37.8150, lng: 126.7930, type: '시' },
    
    // 양평군
    { name: '양평군', description: '양평두물머리와 용문산이 있는 지역', lat: 37.4910, lng: 127.4880, type: '군' },
    
    // 연천군
    { name: '연천군', description: '연천전곡리선사유적과 한탄강이 있는 지역', lat: 38.0960, lng: 127.0750, type: '군' },
    
    // 포천시
    { name: '포천시', description: '포천산정호수와 운악산이 있는 도시', lat: 37.8940, lng: 127.2000, type: '시' },
    
    // 동두천시
    { name: '동두천시', description: '동두천천과 보산동이 있는 도시', lat: 37.9030, lng: 127.0610, type: '시' },
    
    // 양주시
    { name: '양주시', description: '양주회암사지와 덕정동이 있는 도시', lat: 37.8320, lng: 127.0460, type: '시' },
    
    // 의정부시
    { name: '의정부시', description: '의정부시민운동장과 자일해변이 있는 도시', lat: 37.7380, lng: 127.0340, type: '시' }
];
