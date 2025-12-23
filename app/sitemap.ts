import { MetadataRoute } from 'next';

/**
 * 사이트맵 생성
 * 
 * Next.js 자동 사이트맵 생성
 * 프로덕션에서 https://loneat.kr/sitemap.xml 로 접근 가능
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://loneat.kr';

    // 정적 페이지
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/list`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/group-spots`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ];

    // TODO: 동적 맛집 페이지 추가
    // const restaurants = await getRestaurants();
    // const restaurantPages = restaurants.map(r => ({
    //   url: `${baseUrl}/detail/${r.id}`,
    //   lastModified: r.updatedAt,
    //   changeFrequency: 'weekly',
    //   priority: 0.7,
    // }));

    return [...staticPages];
}
