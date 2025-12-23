import { MetadataRoute } from 'next';

/**
 * robots.txt 생성
 * 
 * 프로덕션에서 https://loneat.kr/robots.txt 로 접근 가능
 */
export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://loneat.kr';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
