/**
 * 관리자 생성 스크립트
 * 
 * 사용법: npx ts-node scripts/createAdmin.ts
 * 
 * 이 스크립트는 초기 관리자 계정을 생성합니다.
 * 프로덕션 환경에서는 더 강력한 비밀번호를 사용하세요.
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// MongoDB URI 확인
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI 환경 변수가 설정되지 않았습니다.');
    console.log('다음 명령어로 환경 변수를 설정하세요:');
    console.log('export MONGODB_URI="mongodb+srv://..."');
    process.exit(1);
}

// Admin 스키마 정의 (직접 정의)
const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function createAdmin() {
    try {
        console.log('🔗 MongoDB 연결 중...');
        await mongoose.connect(MONGODB_URI!);
        console.log('✅ MongoDB 연결 성공');

        // 기본 관리자 계정 정보
        const username = 'admin';
        const password = 'admin123'; // 프로덕션에서 변경 필요!

        // 기존 관리자 확인
        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            console.log('⚠️ admin 계정이 이미 존재합니다.');
            console.log('새 비밀번호로 업데이트합니다...');

            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            await Admin.updateOne({ username }, { passwordHash });
            console.log('✅ 비밀번호가 업데이트되었습니다.');
        } else {
            // 비밀번호 해싱
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            // 관리자 생성
            await Admin.create({
                username,
                passwordHash,
            });

            console.log('✅ 관리자 계정이 생성되었습니다!');
        }

        console.log('');
        console.log('📋 로그인 정보:');
        console.log(`   사용자명: ${username}`);
        console.log(`   비밀번호: ${password}`);
        console.log('');
        console.log('⚠️ 프로덕션 환경에서는 반드시 비밀번호를 변경하세요!');

    } catch (error) {
        console.error('❌ 오류 발생:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 MongoDB 연결 해제');
    }
}

createAdmin();
