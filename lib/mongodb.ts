import mongoose from 'mongoose';

/**
 * MongoDB 연결 상태를 캐싱하기 위한 전역 변수
 * 서버리스 환경에서 불필요한 재연결을 방지합니다.
 */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

// 빌드 시점에서는 에러를 발생시키지 않음 (런타임에 확인)
if (!MONGODB_URI && typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ MONGODB_URI 환경 변수가 설정되지 않았습니다.');
}

/**
 * 캐시된 연결 객체
 * 개발 환경에서 핫 리로딩 시에도 연결을 유지합니다.
 */
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}

/**
 * MongoDB 데이터베이스에 연결합니다.
 * 
 * 서버리스 환경(Vercel, AWS Lambda 등)에서 효율적으로 작동하도록
 * 연결을 캐싱하여 재사용합니다.
 * 
 * @returns {Promise<typeof mongoose>} Mongoose 연결 객체
 * @throws {Error} 연결 실패 시 에러
 * 
 * @example
 * ```typescript
 * import { connectToDatabase } from '@/lib/mongodb';
 * 
 * export async function GET() {
 *   await connectToDatabase();
 *   const restaurants = await Restaurant.find();
 *   return Response.json(restaurants);
 * }
 * ```
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
    // 이미 연결되어 있으면 캐시된 연결 반환
    if (cached.conn) {
        return cached.conn;
    }

    // 런타임에 MONGODB_URI 확인
    if (!MONGODB_URI) {
        throw new Error(
            '환경 변수 MONGODB_URI가 설정되지 않았습니다. .env.local 파일을 확인하세요.'
        );
    }

    // 연결 진행 중이면 해당 Promise 반환
    if (!cached.promise) {
        const opts: mongoose.ConnectOptions = {
            bufferCommands: false, // 연결 전 명령어 버퍼링 비활성화
        };

        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongoose) => {
                console.log('✅ MongoDB 연결 성공');
                return mongoose;
            })
            .catch((error) => {
                console.error('❌ MongoDB 연결 실패:', error);
                cached.promise = null; // 실패 시 Promise 초기화
                throw error;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}

/**
 * 데이터베이스 연결 상태를 확인합니다.
 * 
 * @returns {boolean} 연결 상태 (true: 연결됨, false: 연결 안됨)
 */
export function isConnected(): boolean {
    return mongoose.connection.readyState === 1;
}

export default connectToDatabase;
