/**
 * LoadingSpinner Props
 */
interface LoadingSpinnerProps {
    /** 스피너 크기 */
    size?: 'sm' | 'md' | 'lg';
    /** 추가 CSS 클래스 */
    className?: string;
}

/**
 * 크기별 클래스
 */
const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
};

/**
 * LoadingSpinner 컴포넌트
 * 
 * 로딩 상태를 표시하는 스피너입니다.
 * 악센트 컬러(오렌지)를 사용합니다.
 */
export default function LoadingSpinner({
    size = 'md',
    className = '',
}: LoadingSpinnerProps) {
    return (
        <div
            className={`flex items-center justify-center ${className}`}
            role="status"
            aria-label="로딩 중"
        >
            <div
                className={`
          ${sizeClasses[size]}
          border-gray-200
          border-t-accent
          rounded-full
          animate-spin
        `}
                aria-hidden="true"
            />
            <span className="sr-only">로딩 중...</span>
        </div>
    );
}
