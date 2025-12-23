/**
 * EditorBadge 컴포넌트
 * 
 * 에디터가 인증한 맛집에 표시되는 배지입니다.
 * 악센트 컬러(오렌지)를 사용하여 눈에 띄게 표시합니다.
 */
export default function EditorBadge() {
    return (
        <span
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent text-white text-xs font-semibold rounded-full shadow-sm"
            role="status"
            aria-label="에디터 인증 맛집"
        >
            <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
            >
                <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                />
            </svg>
            <span>에디터 인증</span>
        </span>
    );
}
