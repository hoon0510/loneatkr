'use client';

/**
 * VoteButton Props
 */
interface VoteButtonProps {
    /** ㅇㅈ 투표 수 */
    ojCount: number;
    /** ㄴㅇㅈ 투표 수 */
    nojCount: number;
    /** 투표 클릭 핸들러 */
    onVote: (type: 'oj' | 'noj') => void;
    /** 비활성화 여부 (이미 투표한 경우) */
    disabled?: boolean;
    /** 사용자가 투표한 타입 */
    votedType?: 'oj' | 'noj' | null;
    /** 추가 CSS 클래스 */
    className?: string;
}

/**
 * VoteButton 컴포넌트
 * 
 * ㅇㅈ(인정)/ㄴㅇㅈ(노인정) 투표 버튼입니다.
 * 투표 후에는 비활성화되며 사용자가 선택한 옵션이 표시됩니다.
 */
export default function VoteButton({
    ojCount,
    nojCount,
    onVote,
    disabled = false,
    votedType = null,
    className = '',
}: VoteButtonProps) {
    // 총 투표 수
    const totalVotes = ojCount + nojCount;

    // 인정률 계산
    const ojPercentage = totalVotes > 0 ? Math.round((ojCount / totalVotes) * 100) : 50;
    const nojPercentage = totalVotes > 0 ? Math.round((nojCount / totalVotes) * 100) : 50;

    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            {/* 투표 버튼 그룹 */}
            <div className="flex gap-3">
                {/* ㅇㅈ 버튼 */}
                <button
                    type="button"
                    onClick={() => onVote('oj')}
                    disabled={disabled}
                    className={`
            flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all
            ${disabled
                            ? votedType === 'oj'
                                ? 'bg-green-500 text-white cursor-default'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-green-50 text-green-600 hover:bg-green-100 active:scale-95'
                        }
          `}
                    aria-label={`ㅇㅈ (인정) 투표, 현재 ${ojCount}표`}
                >
                    <span className="text-lg">👍</span>
                    <span>ㅇㅈ</span>
                    <span className="font-bold">{ojCount}</span>
                </button>

                {/* ㄴㅇㅈ 버튼 */}
                <button
                    type="button"
                    onClick={() => onVote('noj')}
                    disabled={disabled}
                    className={`
            flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all
            ${disabled
                            ? votedType === 'noj'
                                ? 'bg-red-500 text-white cursor-default'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-red-50 text-red-600 hover:bg-red-100 active:scale-95'
                        }
          `}
                    aria-label={`ㄴㅇㅈ (노인정) 투표, 현재 ${nojCount}표`}
                >
                    <span className="text-lg">👎</span>
                    <span>ㄴㅇㅈ</span>
                    <span className="font-bold">{nojCount}</span>
                </button>
            </div>

            {/* 투표 비율 바 */}
            {totalVotes > 0 && (
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="absolute inset-y-0 left-0 bg-green-500 transition-all duration-500"
                        style={{ width: `${ojPercentage}%` }}
                        role="progressbar"
                        aria-valuenow={ojPercentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`인정률 ${ojPercentage}%`}
                    />
                    <div
                        className="absolute inset-y-0 right-0 bg-red-400 transition-all duration-500"
                        style={{ width: `${nojPercentage}%` }}
                    />
                </div>
            )}

            {/* 투표 결과 텍스트 */}
            {totalVotes > 0 && (
                <div className="flex justify-between text-sm text-gray-500">
                    <span className="text-green-600">{ojPercentage}% 인정</span>
                    <span className="text-gray-400">총 {totalVotes}표</span>
                    <span className="text-red-500">{nojPercentage}% 노인정</span>
                </div>
            )}

            {/* 투표 완료 메시지 */}
            {disabled && votedType && (
                <p className="text-center text-sm text-gray-500">
                    {votedType === 'oj' ? 'ㅇㅈ' : 'ㄴㅇㅈ'}에 투표하셨습니다
                </p>
            )}
        </div>
    );
}
