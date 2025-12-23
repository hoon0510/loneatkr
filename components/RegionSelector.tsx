'use client';

import { useMemo } from 'react';

/**
 * 지역 데이터 타입
 */
interface RegionData {
    [sido: string]: string[];
}

/**
 * 한국 주요 지역 데이터
 */
const REGIONS: RegionData = {
    '서울특별시': [
        '강남구', '강동구', '강북구', '강서구', '관악구',
        '광진구', '구로구', '금천구', '노원구', '도봉구',
        '동대문구', '동작구', '마포구', '서대문구', '서초구',
        '성동구', '성북구', '송파구', '양천구', '영등포구',
        '용산구', '은평구', '종로구', '중구', '중랑구',
    ],
    '경기도': [
        '고양시', '과천시', '광명시', '광주시', '구리시',
        '군포시', '김포시', '남양주시', '동두천시', '부천시',
        '성남시', '수원시', '시흥시', '안산시', '안성시',
        '안양시', '양주시', '오산시', '용인시', '의왕시',
        '의정부시', '이천시', '파주시', '평택시', '하남시',
        '화성시',
    ],
    '부산광역시': [
        '강서구', '금정구', '기장군', '남구', '동구',
        '동래구', '부산진구', '북구', '사상구', '사하구',
        '서구', '수영구', '연제구', '영도구', '중구',
        '해운대구',
    ],
    '인천광역시': [
        '계양구', '남동구', '동구', '미추홀구', '부평구',
        '서구', '연수구', '중구', '강화군', '옹진군',
    ],
    '대구광역시': [
        '남구', '달서구', '달성군', '동구', '북구',
        '서구', '수성구', '중구',
    ],
    '대전광역시': [
        '대덕구', '동구', '서구', '유성구', '중구',
    ],
    '광주광역시': [
        '광산구', '남구', '동구', '북구', '서구',
    ],
    '울산광역시': [
        '남구', '동구', '북구', '울주군', '중구',
    ],
    '세종특별자치시': ['세종시'],
    '제주특별자치도': ['제주시', '서귀포시'],
};

/**
 * RegionSelector Props
 */
interface RegionSelectorProps {
    sido: string;
    sigungu: string;
    onSidoChange: (sido: string) => void;
    onSigunguChange: (sigungu: string) => void;
    className?: string;
}

/**
 * RegionSelector 컴포넌트 - 다크 테마
 */
export default function RegionSelector({
    sido,
    sigungu,
    onSidoChange,
    onSigunguChange,
    className = '',
}: RegionSelectorProps) {
    const sidoList = useMemo(() => Object.keys(REGIONS), []);

    const sigunguList = useMemo(() => {
        return sido ? REGIONS[sido] || [] : [];
    }, [sido]);

    const handleSidoChange = (newSido: string) => {
        onSidoChange(newSido);
        onSigunguChange('');
    };

    const selectStyle = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1rem center',
        backgroundSize: '1.5rem',
    };

    return (
        <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
            {/* 시/도 선택 */}
            <div className="flex-1">
                <label htmlFor="sido-select" className="sr-only">
                    시/도 선택
                </label>
                <select
                    id="sido-select"
                    value={sido}
                    onChange={(e) => handleSidoChange(e.target.value)}
                    className="w-full px-4 py-3 bg-card border border-border rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all cursor-pointer appearance-none"
                    style={selectStyle}
                    aria-label="시/도 선택"
                >
                    <option value="">시/도 선택</option>
                    {sidoList.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>

            {/* 시/군/구 선택 */}
            <div className="flex-1">
                <label htmlFor="sigungu-select" className="sr-only">
                    시/군/구 선택
                </label>
                <select
                    id="sigungu-select"
                    value={sigungu}
                    onChange={(e) => onSigunguChange(e.target.value)}
                    disabled={!sido}
                    className="w-full px-4 py-3 bg-card border border-border rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all cursor-pointer appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                    style={selectStyle}
                    aria-label="시/군/구 선택"
                >
                    <option value="">시/군/구 선택</option>
                    {sigunguList.map((sg) => (
                        <option key={sg} value={sg}>
                            {sg}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export { REGIONS };
export type { RegionData };
