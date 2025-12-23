/**
 * 지역 정보 타입
 * 시/도 및 시/군/구 정보를 포함합니다.
 */
export interface Region {
    sido: string;    // 시/도 (예: "서울", "경기")
    sigungu: string; // 시/군/구 (예: "강남구", "수원시")
}

/**
 * 투표 타입
 * - 'oj': ㅇㅈ (인정)
 * - 'noj': ㄴㅇㅈ (노인정)
 */
export type VoteType = 'oj' | 'noj';

/**
 * 맛집 인터페이스
 * 
 * loneat.kr의 핵심 데이터 모델로,
 * 혼밥/혼술에 적합한 가게 정보를 담습니다.
 */
export interface IRestaurant {
    /** 가게 이름 */
    name: string;

    /** 전체 주소 */
    address: string;

    /** 지역 정보 (시/도, 시/군/구) */
    region: Region;

    /** 가게 설명 */
    description?: string;

    /** 연락처 */
    phone?: string;

    /** 영업시간 */
    businessHours?: string;

    /** 이미지 URL 배열 */
    images: string[];

    /** 위도 (네이버 지도 좌표) */
    latitude?: number;

    /** 경도 (네이버 지도 좌표) */
    longitude?: number;

    /** 에디터 인증 여부 */
    isEditorCertified: boolean;

    /** 에디터 한 줄 평 */
    editorComment?: string;

    /** ㅇㅈ 투표 수 */
    ojCount: number;

    /** ㄴㅇㅈ 투표 수 */
    nojCount: number;

    /** 같이 가는 가게 여부 */
    isGroupSpot: boolean;

    /** 생성일 */
    createdAt: Date;

    /** 수정일 */
    updatedAt: Date;
}

/**
 * 맛집 생성용 인터페이스
 * 자동 생성 필드를 제외한 입력 데이터
 */
export interface CreateRestaurantInput {
    name: string;
    address: string;
    region: Region;
    description?: string;
    phone?: string;
    businessHours?: string;
    images?: string[];
    latitude?: number;
    longitude?: number;
    isEditorCertified?: boolean;
    editorComment?: string;
    isGroupSpot?: boolean;
}

/**
 * 맛집 수정용 인터페이스
 * 모든 필드가 선택적
 */
export type UpdateRestaurantInput = Partial<CreateRestaurantInput>;

/**
 * 관리자 인터페이스
 */
export interface IAdmin {
    /** 사용자명 (로그인 ID) */
    username: string;

    /** 비밀번호 해시 (bcrypt) */
    passwordHash: string;

    /** 생성일 */
    createdAt: Date;

    /** 수정일 */
    updatedAt: Date;
}

/**
 * 관리자 생성용 인터페이스
 */
export interface CreateAdminInput {
    username: string;
    password: string; // 평문 비밀번호 (해싱 전)
}

/**
 * API 응답 타입
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

/**
 * 페이지네이션 응답 타입
 */
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

/**
 * 맛집 필터 옵션
 */
export interface RestaurantFilter {
    sido?: string;
    sigungu?: string;
    isEditorCertified?: boolean;
    isGroupSpot?: boolean;
    search?: string;
}

/**
 * 정렬 옵션
 */
export type SortOption = 'latest' | 'popular' | 'rating';
