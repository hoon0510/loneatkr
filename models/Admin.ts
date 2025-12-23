import mongoose, { Schema, Model } from 'mongoose';

/**
 * Admin 문서 인터페이스
 */
interface IAdmin {
    username: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * 관리자 스키마
 * 
 * 에디터 및 관리자 인증을 위한 모델입니다.
 * 비밀번호는 bcryptjs로 해싱되어 저장됩니다.
 */
const AdminSchema = new Schema<IAdmin>(
    {
        username: {
            type: String,
            required: [true, '사용자명은 필수입니다'],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [3, '사용자명은 3자 이상이어야 합니다'],
            maxlength: [50, '사용자명은 50자를 초과할 수 없습니다'],
            match: [
                /^[a-z0-9_]+$/,
                '사용자명은 영문 소문자, 숫자, 언더스코어만 사용할 수 있습니다',
            ],
        },
        passwordHash: {
            type: String,
            required: [true, '비밀번호는 필수입니다'],
            select: false, // 기본적으로 조회 시 제외
        },
    },
    {
        timestamps: true,
    }
);

/**
 * 인덱스 설정
 */
AdminSchema.index({ username: 1 }, { unique: true });

/**
 * Admin 모델
 * 
 * 핫 리로딩 시 모델 중복 등록 방지를 위해 
 * 기존 모델이 있으면 재사용합니다.
 */
const Admin: Model<IAdmin> =
    mongoose.models.Admin ||
    mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;
export type { IAdmin };
