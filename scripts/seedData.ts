/**
 * 샘플 데이터 시딩 스크립트
 * 
 * 사용법: npm run seed
 * 
 * 개발 및 테스트용 샘플 맛집 데이터를 생성합니다.
 */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI 환경 변수가 설정되지 않았습니다.');
    console.log('export MONGODB_URI="mongodb+srv://..." 로 설정하세요.');
    process.exit(1);
}

// Restaurant 스키마
const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    region: {
        sido: { type: String, required: true },
        sigungu: { type: String, required: true },
    },
    description: { type: String, default: '' },
    phone: { type: String, default: '' },
    businessHours: { type: String, default: '' },
    images: [{ type: String }],
    latitude: { type: Number },
    longitude: { type: Number },
    isEditorCertified: { type: Boolean, default: false },
    editorComment: { type: String, default: '' },
    isGroupSpot: { type: Boolean, default: false },
    ojCount: { type: Number, default: 0 },
    nojCount: { type: Number, default: 0 },
}, { timestamps: true });

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema);

// 샘플 데이터
const sampleRestaurants = [
    {
        name: '혼밥카츠',
        address: '서울 강남구 테헤란로 123',
        region: { sido: '서울특별시', sigungu: '강남구' },
        description: '1인석이 완벽하게 배치된 프리미엄 돈까스 전문점입니다. 조용한 분위기에서 혼자 식사하기 좋습니다.',
        phone: '02-1234-5678',
        businessHours: '11:00 - 21:00 (월요일 휴무)',
        images: [],
        latitude: 37.5065,
        longitude: 127.0536,
        isEditorCertified: true,
        editorComment: '1인석 배치가 완벽한 돈까스 맛집',
        isGroupSpot: false,
        ojCount: 156,
        nojCount: 12,
    },
    {
        name: '고독한 라멘',
        address: '서울 마포구 홍대입구역 근처',
        region: { sido: '서울특별시', sigungu: '마포구' },
        description: '일본 현지 스타일의 라멘집입니다. 카운터석에서 조용히 라멘을 즐길 수 있습니다.',
        phone: '02-2345-6789',
        businessHours: '11:30 - 22:00',
        images: [],
        latitude: 37.5566,
        longitude: 126.9230,
        isEditorCertified: true,
        editorComment: '진한 돈코츠 라멘, 혼밥 최적화',
        isGroupSpot: false,
        ojCount: 89,
        nojCount: 8,
    },
    {
        name: '솔로 초밥',
        address: '서울 서초구 강남대로 456',
        region: { sido: '서울특별시', sigungu: '서초구' },
        description: '카운터석에서 주방장님과 대화하며 즐기는 오마카세입니다.',
        phone: '02-3456-7890',
        businessHours: '17:00 - 22:00 (일요일 휴무)',
        images: [],
        latitude: 37.4967,
        longitude: 127.0276,
        isEditorCertified: true,
        editorComment: '카운터석에서 즐기는 프리미엄 오마카세',
        isGroupSpot: false,
        ojCount: 234,
        nojCount: 23,
    },
    {
        name: '1인 보쌈',
        address: '서울 종로구 광화문 근처',
        region: { sido: '서울특별시', sigungu: '종로구' },
        description: '1인분 보쌈 세트가 있는 보쌈 전문점입니다. 혼술하기에도 좋습니다.',
        phone: '02-4567-8901',
        businessHours: '11:00 - 23:00',
        images: [],
        latitude: 37.5704,
        longitude: 126.9780,
        isEditorCertified: false,
        editorComment: '',
        isGroupSpot: false,
        ojCount: 45,
        nojCount: 5,
    },
    {
        name: '혼술 이자카야',
        address: '부산 해운대구 해운대해변로 789',
        region: { sido: '부산광역시', sigungu: '해운대구' },
        description: '해운대 바다가 보이는 이자카야입니다. 혼술하며 바다를 감상할 수 있습니다.',
        phone: '051-123-4567',
        businessHours: '18:00 - 02:00',
        images: [],
        latitude: 35.1587,
        longitude: 129.1604,
        isEditorCertified: true,
        editorComment: '해운대 바다뷰 혼술 맛집',
        isGroupSpot: false,
        ojCount: 178,
        nojCount: 15,
    },
    {
        name: '분위기 좋은 와인바',
        address: '서울 강남구 압구정로 234',
        region: { sido: '서울특별시', sigungu: '강남구' },
        description: '분위기 좋은 와인바입니다. 데이트하기 좋은 곳이에요.',
        phone: '02-5678-9012',
        businessHours: '18:00 - 01:00',
        images: [],
        latitude: 37.5268,
        longitude: 127.0345,
        isEditorCertified: false,
        editorComment: '',
        isGroupSpot: true,
        ojCount: 12,
        nojCount: 45,
    },
    {
        name: '함께 삼겹살',
        address: '경기도 수원시 영통구',
        region: { sido: '경기도', sigungu: '수원시' },
        description: '팀회식으로 자주 가는 삼겹살집입니다. 여럿이 가면 더 좋아요.',
        phone: '031-234-5678',
        businessHours: '16:00 - 24:00',
        images: [],
        latitude: 37.2636,
        longitude: 127.0286,
        isEditorCertified: false,
        editorComment: '',
        isGroupSpot: true,
        ojCount: 8,
        nojCount: 32,
    },
    {
        name: '인천 칼국수',
        address: '인천 미추홀구 주안역 근처',
        region: { sido: '인천광역시', sigungu: '미추홀구' },
        description: '40년 전통의 손칼국수 맛집입니다. 혼밥하기 편한 분위기입니다.',
        phone: '032-345-6789',
        businessHours: '10:00 - 20:00',
        images: [],
        latitude: 37.4650,
        longitude: 126.6790,
        isEditorCertified: false,
        editorComment: '',
        isGroupSpot: false,
        ojCount: 67,
        nojCount: 11,
    },
];

async function seedData() {
    try {
        console.log('🔗 MongoDB 연결 중...');
        await mongoose.connect(MONGODB_URI!);
        console.log('✅ MongoDB 연결 성공');

        // 기존 데이터 확인
        const existingCount = await Restaurant.countDocuments();
        console.log(`📊 기존 맛집 수: ${existingCount}개`);

        if (existingCount > 0) {
            const answer = 'y'; // 자동으로 추가
            console.log('⚠️ 기존 데이터에 추가합니다.');
        }

        // 샘플 데이터 추가
        console.log('📝 샘플 데이터 추가 중...');
        const result = await Restaurant.insertMany(sampleRestaurants);
        console.log(`✅ ${result.length}개의 맛집이 추가되었습니다!`);

        // 최종 통계
        const totalCount = await Restaurant.countDocuments();
        const editorCount = await Restaurant.countDocuments({ isEditorCertified: true });
        const groupCount = await Restaurant.countDocuments({ isGroupSpot: true });

        console.log('');
        console.log('📊 최종 통계:');
        console.log(`   전체 맛집: ${totalCount}개`);
        console.log(`   에디터 인증: ${editorCount}개`);
        console.log(`   같이 가는 가게: ${groupCount}개`);

    } catch (error) {
        console.error('❌ 오류 발생:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 MongoDB 연결 해제');
    }
}

seedData();
