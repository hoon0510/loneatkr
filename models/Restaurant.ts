import mongoose, { Schema, Model } from 'mongoose';

/**
 * 지역 정보 타입
 */
interface Region {
    sido: string;
    sigungu: string;
}

/**
 * Restaurant 문서 인터페이스
 */
interface IRestaurant {
    name: string;
    address: string;
    region: Region;
    description?: string;
    phone?: string;
    businessHours?: string;
    images: string[];
    latitude?: number;
    longitude?: number;
    isEditorCertified: boolean;
    editorComment?: string;
    ojCount: number;
    nojCount: number;
    isGroupSpot: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * 지역 스키마 (시/도, 시/군/구)
 */
const RegionSchema = new Schema(
    {
        sido: {
            type: String,
            required: [true, '시/도는 필수입니다'],
        },
        sigungu: {
            type: String,
            required: [true, '시/군/구는 필수입니다'],
        },
    },
    { _id: false }
);

/**
 * 맛집 스키마
 * 
 * 혼밥/혼술 큐레이션 플랫폼의 핵심 데이터 모델입니다.
 * 에디터 인증과 사용자 투표(ㅇㅈ/ㄴㅇㅈ) 시스템을 지원합니다.
 */
const RestaurantSchema = new Schema<IRestaurant>(
    {
        // 기본 정보
        name: {
            type: String,
            required: [true, '가게 이름은 필수입니다'],
            trim: true,
            maxlength: [100, '가게 이름은 100자를 초과할 수 없습니다'],
        },
        address: {
            type: String,
            required: [true, '주소는 필수입니다'],
            trim: true,
        },
        region: {
            type: RegionSchema,
            required: [true, '지역 정보는 필수입니다'],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [2000, '설명은 2000자를 초과할 수 없습니다'],
        },
        phone: {
            type: String,
            trim: true,
        },
        businessHours: {
            type: String,
            trim: true,
        },

        // 이미지
        images: {
            type: [String],
            default: [],
        },

        // 위치 좌표 (네이버 지도 API 연동)
        latitude: {
            type: Number,
            min: [-90, '위도는 -90 이상이어야 합니다'],
            max: [90, '위도는 90 이하여야 합니다'],
        },
        longitude: {
            type: Number,
            min: [-180, '경도는 -180 이상이어야 합니다'],
            max: [180, '경도는 180 이하여야 합니다'],
        },

        // 에디터 인증 시스템
        isEditorCertified: {
            type: Boolean,
            default: false,
        },
        editorComment: {
            type: String,
            trim: true,
            maxlength: [500, '에디터 코멘트는 500자를 초과할 수 없습니다'],
        },

        // 사용자 투표 시스템 (ㅇㅈ: 인정, ㄴㅇㅈ: 노인정)
        ojCount: {
            type: Number,
            default: 0,
            min: [0, '투표 수는 0 이상이어야 합니다'],
        },
        nojCount: {
            type: Number,
            default: 0,
            min: [0, '투표 수는 0 이상이어야 합니다'],
        },

        // 같이 가는 가게 여부
        isGroupSpot: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * 인덱스 설정
 * 자주 조회되는 필드에 인덱스를 생성하여 성능 최적화
 */
RestaurantSchema.index({ 'region.sido': 1, 'region.sigungu': 1 });
RestaurantSchema.index({ isEditorCertified: 1 });
RestaurantSchema.index({ ojCount: -1 });
RestaurantSchema.index({ createdAt: -1 });

/**
 * Restaurant 모델
 * 
 * 핫 리로딩 시 모델 중복 등록 방지를 위해 
 * 기존 모델이 있으면 재사용합니다.
 */
const Restaurant: Model<IRestaurant> =
    mongoose.models.Restaurant ||
    mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);

export default Restaurant;
export type { IRestaurant, Region };
