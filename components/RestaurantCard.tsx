import Link from 'next/link';
import Image from 'next/image';
import EditorBadge from './EditorBadge';

/**
 * RestaurantCard Props
 */
interface RestaurantCardProps {
    /** 레스토랑 ID */
    id: string;
    /** 가게 이름 */
    name: string;
    /** 주소 */
    address: string;
    /** 대표 이미지 URL */
    image?: string;
    /** ㅇㅈ 투표 수 */
    ojCount: number;
    /** ㄴㅇㅈ 투표 수 */
    nojCount: number;
    /** 에디터 인증 여부 */
    isEditorCertified: boolean;
    /** 에디터 한 줄 평 */
    editorComment?: string;
}

/**
 * RestaurantCard 컴포넌트
 * 
 * 맛집 정보를 카드 형태로 표시합니다.
 * 에디터 인증 배지와 투표 수를 함께 보여줍니다.
 */
export default function RestaurantCard({
    id,
    name,
    address,
    image,
    ojCount,
    nojCount,
    isEditorCertified,
    editorComment,
}: RestaurantCardProps) {
    // 인정률 계산
    const totalVotes = ojCount + nojCount;
    const approvalRate = totalVotes > 0 ? Math.round((ojCount / totalVotes) * 100) : 0;

    return (
        <Link href={`/restaurants/${id}`} className="block group">
            <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-accent/30 transition-all duration-300">
                {/* 이미지 영역 */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    {image ? (
                        <Image
                            src={image}
                            alt={`${name} 이미지`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg
                                className="w-16 h-16"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                    )}

                    {/* 에디터 인증 배지 */}
                    {isEditorCertified && (
                        <div className="absolute top-3 left-3">
                            <EditorBadge />
                        </div>
                    )}
                </div>

                {/* 정보 영역 */}
                <div className="p-4">
                    {/* 가게 이름 */}
                    <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors line-clamp-1">
                        {name}
                    </h3>

                    {/* 주소 */}
                    <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                        {address}
                    </p>

                    {/* 에디터 코멘트 */}
                    {editorComment && (
                        <p className="text-accent text-sm mt-2 line-clamp-2 italic">
                            &ldquo;{editorComment}&rdquo;
                        </p>
                    )}

                    {/* 투표 정보 */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            {/* ㅇㅈ */}
                            <span className="flex items-center gap-1 text-sm">
                                <span className="text-green-500">👍</span>
                                <span className="text-gray-600">{ojCount}</span>
                            </span>
                            {/* ㄴㅇㅈ */}
                            <span className="flex items-center gap-1 text-sm">
                                <span className="text-red-400">👎</span>
                                <span className="text-gray-600">{nojCount}</span>
                            </span>
                        </div>

                        {/* 인정률 */}
                        {totalVotes > 0 && (
                            <span className={`text-sm font-medium ${approvalRate >= 70 ? 'text-green-600' :
                                    approvalRate >= 50 ? 'text-yellow-600' : 'text-red-500'
                                }`}>
                                {approvalRate}% 인정
                            </span>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
}
