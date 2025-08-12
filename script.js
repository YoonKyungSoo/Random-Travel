class RandomTravelPicker {
    constructor() {
        this.map = document.getElementById('koreaMap');
        this.pin = document.getElementById('pin');
        this.pinLabel = document.getElementById('pinLabel');
        this.resultCard = document.getElementById('resultCard');
        this.favoritesContainer = document.getElementById('favoritesContainer');
        
        this.currentLocation = null;
        this.favorites = JSON.parse(localStorage.getItem('travelFavorites') || '[]');
        this.koreaRegions = [];
        
        this.initializeEventListeners();
        this.loadFavorites();
        this.initializeRegions();
    }

    initializeEventListeners() {
        document.getElementById('randomPickBtn').addEventListener('click', () => this.pickRandomLocation());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('favoriteBtn').addEventListener('click', () => this.addToFavorites());
        document.getElementById('shareBtn').addEventListener('click', () => this.shareLocation());
        document.getElementById('saveBtn').addEventListener('click', () => this.saveLocation());
        
        // 지도 클릭으로도 위치 선택 가능
        this.map.addEventListener('click', (e) => this.handleMapClick(e));
    }

    async initializeRegions() {
        // 기본 지역 데이터 (API 연동 전까지 사용)
        this.koreaRegions = [
            // 수도권
            { name: '서울특별시', description: '대한민국의 수도, 현대와 전통이 공존하는 도시', x: 50, y: 30, type: '특별시' },
            { name: '인천광역시', description: '서해안의 관문, 인천국제공항과 월미도가 유명', x: 35, y: 25, type: '광역시' },
            { name: '수원시', description: '경기도청 소재지, 화성과 수원갈비가 유명', x: 45, y: 35, type: '시' },
            { name: '고양시', description: '일산호수공원과 고양국제꽃박람회', x: 40, y: 30, type: '시' },
            { name: '용인시', description: '에버랜드와 한국민속촌', x: 45, y: 40, type: '시' },
            { name: '성남시', description: '판교테크노밸리와 분당신도시', x: 45, y: 35, type: '시' },
            { name: '부천시', description: '부천국제만화축제와 상동호수공원', x: 42, y: 32, type: '시' },
            { name: '안산시', description: '반월공단과 대부도', x: 38, y: 35, type: '시' },
            { name: '안양시', description: '안양예술공원과 만안교', x: 43, y: 33, type: '시' },
            { name: '평택시', description: '평택항과 송탄공단', x: 42, y: 38, type: '시' },
            { name: '시흥시', description: '시흥갯골생태공원과 정왕동', x: 40, y: 33, type: '시' },
            { name: '김포시', description: '김포공항과 김포한강공원', x: 37, y: 28, type: '시' },
            { name: '광주시', description: '광주호와 남한산성', x: 48, y: 38, type: '시' },
            { name: '하남시', description: '하남스타필드와 미사강변도시', x: 47, y: 32, type: '시' },
            { name: '오산시', description: '오산천과 오산시민운동장', x: 44, y: 37, type: '시' },
            { name: '이천시', description: '이천도자기축제와 설봉산', x: 52, y: 40, type: '시' },
            { name: '안성시', description: '안성맞춤랜드와 안성팜랜드', x: 48, y: 42, type: '시' },
            { name: '의왕시', description: '의왕레포츠타운과 청계산', x: 46, y: 34, type: '시' },
            { name: '과천시', description: '과천정부청사와 서울대공원', x: 47, y: 33, type: '시' },
            { name: '구리시', description: '구리한강공원과 아차산', x: 49, y: 31, type: '시' },
            { name: '남양주시', description: '남양주한강공원과 광릉수목원', x: 51, y: 32, type: '시' },
            { name: '파주시', description: '헤이리예술마을과 임진각', x: 33, y: 28, type: '시' },
            { name: '양평군', description: '양평두물머리와 용문산', x: 54, y: 35, type: '군' },
            { name: '여주시', description: '여주세종대왕릉과 여주박물관', x: 55, y: 40, type: '시' },
            { name: '가평군', description: '가평유명산과 청평호', x: 50, y: 30, type: '군' },
            { name: '연천군', description: '연천전곡리선사유적과 한탄강', x: 28, y: 25, type: '군' },
            { name: '포천시', description: '포천산정호수와 운악산', x: 52, y: 28, type: '시' },
            { name: '동두천시', description: '동두천천과 보산동', x: 35, y: 26, type: '시' },
            { name: '양주시', description: '양주회암사지와 덕정동', x: 38, y: 28, type: '시' },
            { name: '의정부시', description: '의정부시민운동장과 자일해변', x: 41, y: 27, type: '시' },
            { name: '구리시', description: '구리한강공원과 아차산', x: 49, y: 31, type: '시' },
            { name: '하남시', description: '하남스타필드와 미사강변도시', x: 47, y: 32, type: '시' },
            { name: '광주시', description: '광주호와 남한산성', x: 48, y: 38, type: '시' },
            { name: '여주시', description: '여주세종대왕릉과 여주박물관', x: 55, y: 40, type: '시' },
            { name: '이천시', description: '이천도자기축제와 설봉산', x: 52, y: 40, type: '시' },
            { name: '안성시', description: '안성맞춤랜드와 안성팜랜드', x: 48, y: 42, type: '시' },
            { name: '의왕시', description: '의왕레포츠타운과 청계산', x: 46, y: 34, type: '시' },
            { name: '과천시', description: '과천정부청사와 서울대공원', x: 47, y: 33, type: '시' },
            { name: '구리시', description: '구리한강공원과 아차산', x: 49, y: 31, type: '시' },
            { name: '남양주시', description: '남양주한강공원과 광릉수목원', x: 51, y: 32, type: '시' },
            { name: '파주시', description: '헤이리예술마을과 임진각', x: 33, y: 28, type: '시' },
            { name: '양평군', description: '양평두물머리와 용문산', x: 54, y: 35, type: '군' },
            { name: '여주시', description: '여주세종대왕릉과 여주박물관', x: 55, y: 40, type: '시' },
            { name: '가평군', description: '가평유명산과 청평호', x: 50, y: 30, type: '군' },
            { name: '연천군', description: '연천전곡리선사유적과 한탄강', x: 28, y: 25, type: '군' },
            { name: '포천시', description: '포천산정호수와 운악산', x: 52, y: 28, type: '시' },
            { name: '동두천시', description: '동두천천과 보산동', x: 35, y: 26, type: '시' },
            { name: '양주시', description: '양주회암사지와 덕정동', x: 38, y: 28, type: '시' },
            { name: '의정부시', description: '의정부시민운동장과 자일해변', x: 41, y: 27, type: '시' },

            // 강원도
            { name: '강릉시', description: '동해안의 아름다운 도시, 경포대와 커피거리', x: 65, y: 25, type: '시' },
            { name: '춘천시', description: '춘천닭갈비와 남이섬', x: 58, y: 22, type: '시' },
            { name: '원주시', description: '원주한지테마파크와 치악산', x: 60, y: 35, type: '시' },
            { name: '속초시', description: '속초해변과 설악산', x: 70, y: 20, type: '시' },
            { name: '삼척시', description: '삼척해변과 환선굴', x: 75, y: 40, type: '시' },
            { name: '태백시', description: '태백산과 태백산맥', x: 80, y: 35, type: '시' },
            { name: '정선군', description: '정선아리랑과 정선5일장', x: 78, y: 30, type: '군' },
            { name: '철원군', description: '철원평야와 철원한탄강', x: 55, y: 20, type: '군' },
            { name: '화천군', description: '화천빙어축제와 화천천', x: 58, y: 18, type: '군' },
            { name: '양구군', description: '양구해안과 양구팔랑계곡', x: 62, y: 20, type: '군' },
            { name: '인제군', description: '인제백두대간과 인제원대리자작나무', x: 65, y: 18, type: '군' },
            { name: '고성군', description: '고성금강산과 고성해변', x: 72, y: 15, type: '군' },
            { name: '양양군', description: '양양서피리해변과 오색약수', x: 68, y: 22, type: '군' },
            { name: '동해시', description: '동해해변과 망상해변', x: 72, y: 25, type: '시' },
            { name: '횡성군', description: '횡성한우와 횡성천', x: 62, y: 32, type: '군' },
            { name: '영월군', description: '영월동강과 영월청령포', x: 68, y: 35, type: '군' },
            { name: '평창군', description: '평창올림픽과 평창휘닉스파크', x: 72, y: 28, type: '군' },
            { name: '홍천군', description: '홍천동네축제와 홍천강', x: 58, y: 28, type: '군' },
            { name: '횡성군', description: '횡성한우와 횡성천', x: 62, y: 32, type: '군' },
            { name: '영월군', description: '영월동강과 영월청령포', x: 68, y: 35, type: '군' },
            { name: '평창군', description: '평창올림픽과 평창휘닉스파크', x: 72, y: 28, type: '군' },
            { name: '홍천군', description: '홍천동네축제와 홍천강', x: 58, y: 28, type: '군' },

            // 충청북도
            { name: '청주시', description: '충북의 중심지, 청주공항과 상당산성', x: 55, y: 40, type: '시' },
            { name: '충주시', description: '충주호와 충주박물관', x: 60, y: 45, type: '시' },
            { name: '제천시', description: '제천의림지와 제천한방축제', x: 65, y: 42, type: '시' },
            { name: '보은군', description: '보은대추와 보은사내면', x: 58, y: 45, type: '군' },
            { name: '옥천군', description: '옥천한우와 옥천천', x: 52, y: 42, type: '군' },
            { name: '영동군', description: '영동포도와 영동황간', x: 55, y: 48, type: '군' },
            { name: '증평군', description: '증평고추와 증평천', x: 50, y: 40, type: '군' },
            { name: '진천군', description: '진천한우와 진천천', x: 48, y: 42, type: '군' },
            { name: '괴산군', description: '괴산고추와 괴산천', x: 58, y: 45, type: '군' },
            { name: '음성군', description: '음성사과와 음성천', x: 52, y: 45, type: '군' },
            { name: '단양군', description: '단양팔경과 단양천', x: 68, y: 42, type: '군' },

            // 충청남도
            { name: '천안시', description: '충남의 중심지, 천안삼거리와 독립기념관', x: 50, y: 45, type: '시' },
            { name: '공주시', description: '공주백제문화제와 공주한옥마을', x: 48, y: 50, type: '시' },
            { name: '보령시', description: '보령머드축제와 보령해변', x: 42, y: 55, type: '시' },
            { name: '아산시', description: '아산온양온천과 아산만', x: 45, y: 48, type: '시' },
            { name: '서산시', description: '서산해미성과 서산해변', x: 40, y: 52, type: '시' },
            { name: '논산시', description: '논산딸기축제와 논산천', x: 52, y: 52, type: '시' },
            { name: '계룡시', description: '계룡산과 계룡대', x: 50, y: 50, type: '시' },
            { name: '당진시', description: '당진해변과 당진천', x: 38, y: 55, type: '시' },
            { name: '금산군', description: '금산인삼과 금산천', x: 55, y: 48, type: '군' },
            { name: '부여군', description: '부여백제문화제와 부여천', x: 48, y: 55, type: '군' },
            { name: '서천군', description: '서천해변과 서천천', x: 42, y: 58, type: '군' },
            { name: '청양군', description: '청양고추와 청양천', x: 52, y: 55, type: '군' },
            { name: '홍성군', description: '홍성한우와 홍성천', x: 45, y: 58, type: '군' },
            { name: '예산군', description: '예산한우와 예산천', x: 48, y: 58, type: '군' },
            { name: '태안군', description: '태안해변과 태안천', x: 35, y: 58, type: '군' },

            // 전라북도
            { name: '전주시', description: '한옥마을과 전통문화의 도시, 한지와 비빔밥', x: 40, y: 60, type: '시' },
            { name: '군산시', description: '군산해변과 군산근대역사박물관', x: 35, y: 62, type: '시' },
            { name: '익산시', description: '익산미륵사지와 익산천', x: 42, y: 62, type: '시' },
            { name: '정읍시', description: '정읍내장산과 정읍천', x: 45, y: 65, type: '시' },
            { name: '남원시', description: '남원춘향제와 남원천', x: 48, y: 68, type: '시' },
            { name: '김제시', description: '김제벽골제와 김제천', x: 38, y: 65, type: '시' },
            { name: '완주군', description: '완주한우와 완주천', x: 42, y: 58, type: '군' },
            { name: '진안군', description: '진안마이산과 진안천', x: 48, y: 62, type: '군' },
            { name: '무주군', description: '무주덕유산과 무주천', x: 52, y: 65, type: '군' },
            { name: '장수군', description: '장수한우와 장수천', x: 50, y: 68, type: '군' },
            { name: '임실군', description: '임실치즈와 임실천', x: 45, y: 68, type: '군' },
            { name: '순창군', description: '순창고추장과 순창천', x: 42, y: 70, type: '군' },
            { name: '고창군', description: '고창고인돌과 고창해변', x: 35, y: 68, type: '군' },
            { name: '부안군', description: '부안해변과 부안천', x: 32, y: 65, type: '군' },

            // 전라남도
            { name: '광주광역시', description: '예향의 도시, 문화예술과 맛있는 음식이 많은 곳', x: 45, y: 65, type: '광역시' },
            { name: '목포시', description: '목포해변과 목포근대역사박물관', x: 30, y: 70, type: '시' },
            { name: '여수시', description: '아름다운 남해안, 여수엑스포와 돌산공원', x: 60, y: 80, type: '시' },
            { name: '순천시', description: '순천만과 순천만국제정원박람회', x: 55, y: 75, type: '시' },
            { name: '나주시', description: '나주배와 나주천', x: 42, y: 70, type: '시' },
            { name: '광양시', description: '광양제철과 광양해변', x: 58, y: 78, type: '시' },
            { name: '담양군', description: '담양죽과 담양천', x: 48, y: 72, type: '군' },
            { name: '곡성군', description: '곡성오지와 곡성천', x: 52, y: 72, type: '군' },
            { name: '구례군', description: '구례산수유와 구례천', x: 55, y: 75, type: '군' },
            { name: '고흥군', description: '고흥유자와 고흥해변', x: 58, y: 78, type: '군' },
            { name: '보성군', description: '보성녹차와 보성천', x: 55, y: 80, type: '군' },
            { name: '화순군', description: '화순도자기와 화순천', x: 50, y: 78, type: '군' },
            { name: '장흥군', description: '장흥한우와 장흥천', x: 48, y: 80, type: '군' },
            { name: '강진군', description: '강진해변과 강진천', x: 45, y: 82, type: '군' },
            { name: '해남군', description: '해남해변과 해남천', x: 42, y: 85, type: '군' },
            { name: '영암군', description: '영암해변과 영암천', x: 38, y: 78, type: '군' },
            { name: '무안군', description: '무안해변과 무안천', x: 35, y: 75, type: '군' },
            { name: '함평군', description: '함평나비축제와 함평천', x: 32, y: 72, type: '군' },
            { name: '영광군', description: '영광해변과 영광천', x: 30, y: 70, type: '군' },
            { name: '장성군', description: '장성백양사와 장성천', x: 35, y: 68, type: '군' },
            { name: '완도군', description: '완도해변과 완도천', x: 25, y: 80, type: '군' },
            { name: '진도군', description: '진도해변과 진도천', x: 22, y: 78, type: '군' },
            { name: '신안군', description: '신안해변과 신안천', x: 28, y: 75, type: '군' },

            // 경상북도
            { name: '대구광역시', description: '내륙의 중심지, 맛있는 음식과 문화가 풍부한 도시', x: 70, y: 55, type: '광역시' },
            { name: '포항시', description: '동해안의 항구도시, 포항제철과 해안도로', x: 80, y: 55, type: '시' },
            { name: '경주시', description: '경주불국사와 경주월성', x: 75, y: 50, type: '시' },
            { name: '김천시', description: '김천한우와 김천천', x: 65, y: 58, type: '시' },
            { name: '안동시', description: '안동하회마을과 안동천', x: 72, y: 45, type: '시' },
            { name: '구미시', description: '구미전자와 구미천', x: 68, y: 58, type: '시' },
            { name: '영주시', description: '영주부석사와 영주천', x: 70, y: 42, type: '시' },
            { name: '영천시', description: '영천도자기와 영천천', x: 75, y: 48, type: '시' },
            { name: '상주시', description: '상주사과와 상주천', x: 65, y: 52, type: '시' },
            { name: '문경시', description: '문경새재와 문경천', x: 68, y: 48, type: '시' },
            { name: '경산시', description: '경산대학가와 경산천', x: 72, y: 58, type: '시' },
            { name: '군위군', description: '군위한우와 군위천', x: 68, y: 45, type: '군' },
            { name: '의성군', description: '의성마늘과 의성천', x: 70, y: 52, type: '군' },
            { name: '청송군', description: '청송사과와 청송천', x: 75, y: 45, type: '군' },
            { name: '영양군', description: '영양한우와 영양천', x: 78, y: 48, type: '군' },
            { name: '영덕군', description: '영덕해변과 영덕천', x: 82, y: 50, type: '군' },
            { name: '청도군', description: '청도복숭아와 청도천', x: 72, y: 62, type: '군' },
            { name: '고령군', description: '고령대가야와 고령천', x: 68, y: 65, type: '군' },
            { name: '성주군', description: '성주참외와 성주천', x: 70, y: 62, type: '군' },
            { name: '칠곡군', description: '칠곡한우와 칠곡천', x: 72, y: 58, type: '군' },
            { name: '예천군', description: '예천한우와 예천천', x: 68, y: 48, type: '군' },
            { name: '봉화군', description: '봉화한우와 봉화천', x: 82, y: 42, type: '군' },
            { name: '울진군', description: '울진해변과 울진천', x: 85, y: 45, type: '군' },
            { name: '울릉군', description: '울릉도와 울릉천', x: 88, y: 35, type: '군' },

            // 경상남도
            { name: '부산광역시', description: '해양도시, 부산항과 해운대 해수욕장으로 유명', x: 80, y: 75, type: '광역시' },
            { name: '울산광역시', description: '산업도시, 현대자동차와 울산대교가 유명', x: 75, y: 60, type: '광역시' },
            { name: '창원시', description: '경남의 중심도시, 마산만과 진해만이 아름다운 곳', x: 70, y: 70, type: '시' },
            { name: '진주시', description: '진주남강유등축제와 진주성', x: 68, y: 75, type: '시' },
            { name: '통영시', description: '통영해변과 통영천', x: 65, y: 80, type: '시' },
            { name: '사천시', description: '사천해변과 사천천', x: 70, y: 78, type: '시' },
            { name: '김해시', description: '김해가야와 김해천', x: 75, y: 72, type: '시' },
            { name: '밀양시', description: '밀양아리랑과 밀양천', x: 72, y: 68, type: '시' },
            { name: '거제시', description: '거제해변과 거제천', x: 68, y: 82, type: '시' },
            { name: '양산시', description: '양산통도사와 양산천', x: 78, y: 68, type: '시' },
            { name: '의령군', description: '의령한우와 의령천', x: 70, y: 75, type: '군' },
            { name: '함안군', description: '함안한우와 함안천', x: 72, y: 78, type: '군' },
            { name: '창녕군', description: '창녕한우와 창녕천', x: 70, y: 80, type: '군' },
            { name: '고성군', description: '고성한우와 고성해변', x: 68, y: 82, type: '군' },
            { name: '남해군', description: '남해해변과 남해천', x: 65, y: 85, type: '군' },
            { name: '하동군', description: '하동녹차와 하동천', x: 62, y: 82, type: '군' },
            { name: '산청군', description: '산청한우와 산청천', x: 65, y: 78, type: '군' },
            { name: '함양군', description: '함양한우와 함양천', x: 68, y: 75, type: '군' },
            { name: '거창군', description: '거창한우와 거창천', x: 70, y: 72, type: '군' },
            { name: '합천군', description: '합천한우와 합천천', x: 72, y: 75, type: '군' },

            // 제주도
            { name: '제주특별자치도', description: '한국의 보석, 한라산과 아름다운 해안선', x: 45, y: 90, type: '특별자치도' },

            // 세종특별자치시
            { name: '세종특별자치시', description: '행정중심복합도시, 미래지향적인 도시계획', x: 50, y: 45, type: '특별자치시' }
        ];

        // API로 추가 지역 정보 가져오기 (향후 확장용)
        try {
            await this.loadAdditionalRegions();
        } catch (error) {
            console.log('추가 지역 정보 로딩 실패, 기본 데이터 사용:', error);
        }
    }

    async loadAdditionalRegions() {
        // 향후 공공데이터 API 연동을 위한 준비
        // 한국행정안전부 행정구역 API 등 활용 가능
        console.log('추가 지역 정보 로딩 준비 완료');
    }

    pickRandomLocation() {
        // 버튼에 로딩 상태 표시
        const btn = document.getElementById('randomPickBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="loading"></span> 선택 중...';
        btn.disabled = true;

        // 약간의 지연으로 긴장감 조성
        setTimeout(() => {
            this.generateRandomLocation();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    }

    generateRandomLocation() {
        if (this.koreaRegions.length === 0) {
            alert('지역 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
            return;
        }

        // 랜덤하게 지역 선택
        const randomRegion = this.koreaRegions[Math.floor(Math.random() * this.koreaRegions.length)];
        
        // 약간의 랜덤성 추가 (x, y 좌표에 ±3 픽셀 랜덤 오프셋)
        const randomX = randomRegion.x + (Math.random() - 0.5) * 6;
        const randomY = randomRegion.y + (Math.random() - 0.5) * 6;

        this.currentLocation = {
            ...randomRegion,
            x: randomX,
            y: randomY
        };

        this.showPin(randomX, randomY);
        this.showResult(randomRegion);
        this.showFavoriteButton();
    }

    handleMapClick(e) {
        const rect = this.map.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        // 클릭한 위치에서 가장 가까운 지역 찾기
        const clickedRegion = this.findNearestRegion(x, y);
        
        this.currentLocation = {
            ...clickedRegion,
            x: x,
            y: y
        };

        this.showPin(x, y);
        this.showResult(clickedRegion);
        this.showFavoriteButton();
    }

    findNearestRegion(x, y) {
        if (this.koreaRegions.length === 0) return null;

        // 가장 가까운 지역 찾기
        let nearestRegion = this.koreaRegions[0];
        let minDistance = Infinity;

        this.koreaRegions.forEach(region => {
            const distance = Math.sqrt((x - region.x) ** 2 + (y - region.y) ** 2);
            if (distance < minDistance) {
                minDistance = distance;
                nearestRegion = region;
            }
        });

        return nearestRegion;
    }

    showPin(x, y) {
        // 기존 핀 제거
        this.pin.classList.add('hidden');
        this.pinLabel.classList.add('hidden');

        // 새 핀 위치 설정
        this.pin.style.left = x + '%';
        this.pin.style.top = y + '%';
        this.pin.classList.remove('hidden');

        // 핀 라벨 설정
        this.pinLabel.textContent = this.currentLocation.name;
        this.pinLabel.style.left = x + '%';
        this.pinLabel.style.top = y + '%';
        this.pinLabel.classList.remove('hidden');

        // 지도 확대 효과
        this.map.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.map.style.transform = 'scale(1)';
        }, 300);
    }

    showResult(location) {
        document.getElementById('locationName').textContent = location.name;
        document.getElementById('locationDescription').textContent = location.description;
        
        // 지역 타입에 따른 추가 정보 표시
        const typeInfo = this.getTypeInfo(location.type);
        document.getElementById('locationDescription').innerHTML = `
            ${location.description}<br>
            <small style="color: #ff6b6b; font-weight: 500;">📍 ${typeInfo}</small>
        `;
        
        this.resultCard.classList.remove('hidden');
        
        // 결과 카드가 보이도록 스크롤
        this.resultCard.scrollIntoView({ behavior: 'smooth' });
    }

    getTypeInfo(type) {
        const typeMap = {
            '특별시': '특별시',
            '광역시': '광역시',
            '특별자치시': '특별자치시',
            '특별자치도': '특별자치도',
            '시': '시',
            '군': '군'
        };
        return typeMap[type] || type;
    }

    showFavoriteButton() {
        document.getElementById('favoriteBtn').classList.remove('hidden');
    }

    addToFavorites() {
        if (!this.currentLocation) return;

        const favorite = {
            ...this.currentLocation,
            timestamp: new Date().toISOString(),
            id: Date.now()
        };

        // 중복 체크
        const isDuplicate = this.favorites.some(fav => fav.name === favorite.name);
        if (isDuplicate) {
            alert('이미 즐겨찾기에 추가된 여행지입니다!');
            return;
        }

        this.favorites.push(favorite);
        this.saveFavorites();
        this.loadFavorites();
        
        alert(`${favorite.name}이(가) 즐겨찾기에 추가되었습니다!`);
    }

    removeFavorite(id) {
        this.favorites = this.favorites.filter(fav => fav.id !== id);
        this.saveFavorites();
        this.loadFavorites();
    }

    saveFavorites() {
        localStorage.setItem('travelFavorites', JSON.stringify(this.favorites));
    }

    loadFavorites() {
        this.favoritesContainer.innerHTML = '';
        
        if (this.favorites.length === 0) {
            this.favoritesContainer.innerHTML = '<p style="text-align: center; color: #636e72;">아직 즐겨찾기한 여행지가 없습니다.</p>';
            return;
        }

        this.favorites.forEach(favorite => {
            const favoriteItem = document.createElement('div');
            favoriteItem.className = 'favorite-item';
            favoriteItem.innerHTML = `
                <h4>${favorite.name}</h4>
                <p>${favorite.description}</p>
                <p style="font-size: 0.8rem; color: #95a5a6;">추가된 날짜: ${new Date(favorite.timestamp).toLocaleDateString('ko-KR')}</p>
                <button class="remove-btn" onclick="travelPicker.removeFavorite(${favorite.id})">삭제</button>
            `;
            this.favoritesContainer.appendChild(favoriteItem);
        });
    }

    reset() {
        this.pin.classList.add('hidden');
        this.pinLabel.classList.add('hidden');
        this.resultCard.classList.add('hidden');
        document.getElementById('favoriteBtn').classList.add('hidden');
        this.currentLocation = null;
        
        // 지도 원래 크기로
        this.map.style.transform = 'scale(1)';
    }

    shareLocation() {
        if (!this.currentLocation) return;

        const text = `🎯 랜덤 여행지 픽! 결과\n📍 ${this.currentLocation.name}\n📝 ${this.currentLocation.description}\n\n#랜덤여행지픽 #${this.currentLocation.name}`;
        
        if (navigator.share) {
            navigator.share({
                title: '랜덤 여행지 픽! 결과',
                text: text
            });
        } else {
            // 클립보드에 복사
            navigator.clipboard.writeText(text).then(() => {
                alert('여행지 정보가 클립보드에 복사되었습니다!');
            });
        }
    }

    saveLocation() {
        if (!this.currentLocation) return;

        const data = {
            name: this.currentLocation.name,
            description: this.currentLocation.description,
            type: this.currentLocation.type,
            coordinates: { x: this.currentLocation.x, y: this.currentLocation.y },
            timestamp: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.currentLocation.name}_여행지.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        alert(`${this.currentLocation.name} 여행지 정보가 저장되었습니다!`);
    }
}

// 앱 초기화
let travelPicker;
document.addEventListener('DOMContentLoaded', () => {
    travelPicker = new RandomTravelPicker();
});

// 전역 함수로 즐겨찾기 삭제 기능 노출
window.removeFavorite = function(id) {
    travelPicker.removeFavorite(id);
};
