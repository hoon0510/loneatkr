'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Header, Footer, RegionSelector, LoadingSpinner } from '@/components';

/**
 * 맛집 수정 페이지
 */
export default function EditRestaurantPage() {
    const router = useRouter();
    const params = useParams();
    const restaurantId = params.id as string;

    // 폼 상태
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [sido, setSido] = useState('');
    const [sigungu, setSigungu] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [businessHours, setBusinessHours] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [isEditorCertified, setIsEditorCertified] = useState(false);
    const [editorComment, setEditorComment] = useState('');
    const [isGroupSpot, setIsGroupSpot] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    // UI 상태
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    /**
     * 맛집 데이터 로드
     */
    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await fetch(`/api/admin/restaurants/${restaurantId}`);
                const data = await response.json();

                if (data.success) {
                    const r = data.data;
                    setName(r.name || '');
                    setAddress(r.address || '');
                    setSido(r.region?.sido || '');
                    setSigungu(r.region?.sigungu || '');
                    setDescription(r.description || '');
                    setPhone(r.phone || '');
                    setBusinessHours(r.businessHours || '');
                    setLatitude(r.latitude?.toString() || '');
                    setLongitude(r.longitude?.toString() || '');
                    setIsEditorCertified(r.isEditorCertified || false);
                    setEditorComment(r.editorComment || '');
                    setIsGroupSpot(r.isGroupSpot || false);
                    setImages(r.images || []);
                } else {
                    setError(data.error || '맛집 정보를 불러올 수 없습니다.');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError('데이터를 불러오는데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRestaurant();
    }, [restaurantId]);

    /**
     * 이미지 업로드
     */
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        setError('');

        try {
            const formData = new FormData();
            Array.from(files).forEach(file => formData.append('images', file));

            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setImages(prev => [...prev, ...data.data.urls]);
            } else {
                setError(data.error || '이미지 업로드에 실패했습니다.');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError('이미지 업로드 중 오류가 발생했습니다.');
        } finally {
            setIsUploading(false);
        }
    };

    /**
     * 이미지 삭제
     */
    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    /**
     * 폼 제출
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name || !address || !sido || !sigungu) {
            setError('필수 항목을 모두 입력해주세요.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/admin/restaurants/${restaurantId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    address,
                    region: { sido, sigungu },
                    description,
                    phone,
                    businessHours,
                    latitude: latitude ? parseFloat(latitude) : null,
                    longitude: longitude ? parseFloat(longitude) : null,
                    images,
                    isEditorCertified,
                    editorComment: isEditorCertified ? editorComment : '',
                    isGroupSpot,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert('맛집이 수정되었습니다!');
                router.push('/admin/dashboard');
            } else {
                setError(data.error || '수정에 실패했습니다.');
            }
        } catch (err) {
            console.error('Submit error:', err);
            setError('수정 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // 로딩
    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <LoadingSpinner size="lg" />
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* 헤더 */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link
                            href="/admin/dashboard"
                            className="text-muted hover:text-primary transition-colors"
                        >
                            ← 돌아가기
                        </Link>
                        <h1 className="text-2xl font-bold text-primary">가게 수정</h1>
                    </div>

                    {/* 에러 메시지 */}
                    {error && (
                        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error">
                            {error}
                        </div>
                    )}

                    {/* 폼 */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                            <h2 className="font-bold text-primary">기본 정보</h2>

                            <div>
                                <label className="block text-sm font-medium text-primary mb-2">
                                    가게 이름 <span className="text-error">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary mb-2">
                                    주소 <span className="text-error">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary mb-2">
                                    지역 <span className="text-error">*</span>
                                </label>
                                <RegionSelector
                                    sido={sido}
                                    sigungu={sigungu}
                                    onSidoChange={setSido}
                                    onSigunguChange={setSigungu}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary mb-2">전화번호</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary mb-2">영업시간</label>
                                <input
                                    type="text"
                                    value={businessHours}
                                    onChange={(e) => setBusinessHours(e.target.value)}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary mb-2">설명</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary resize-none"
                                />
                            </div>
                        </div>

                        {/* 위치 정보 */}
                        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                            <h2 className="font-bold text-primary">위치 정보</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">위도</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={latitude}
                                        onChange={(e) => setLatitude(e.target.value)}
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">경도</label>
                                    <input
                                        type="number"
                                        step="any"
                                        value={longitude}
                                        onChange={(e) => setLongitude(e.target.value)}
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 이미지 */}
                        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                            <h2 className="font-bold text-primary">이미지</h2>

                            <div>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent file:text-white file:cursor-pointer"
                                    disabled={isUploading}
                                />
                                {isUploading && <p className="text-muted text-sm mt-2">업로드 중...</p>}
                            </div>

                            {images.length > 0 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {images.map((url, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={url}
                                                alt={`이미지 ${index + 1}`}
                                                className="w-full aspect-square object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 w-6 h-6 bg-error text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 에디터 인증 */}
                        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                            <h2 className="font-bold text-primary">에디터 설정</h2>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="editorCertified"
                                    checked={isEditorCertified}
                                    onChange={(e) => setIsEditorCertified(e.target.checked)}
                                    className="w-5 h-5 accent-accent"
                                />
                                <label htmlFor="editorCertified" className="text-primary cursor-pointer">
                                    에디터 인증
                                </label>
                            </div>

                            {isEditorCertified && (
                                <div>
                                    <label className="block text-sm font-medium text-primary mb-2">에디터 한 줄 평</label>
                                    <textarea
                                        value={editorComment}
                                        onChange={(e) => setEditorComment(e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary resize-none"
                                    />
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="groupSpot"
                                    checked={isGroupSpot}
                                    onChange={(e) => setIsGroupSpot(e.target.checked)}
                                    className="w-5 h-5 accent-accent"
                                />
                                <label htmlFor="groupSpot" className="text-primary cursor-pointer">
                                    같이 가는 가게
                                </label>
                            </div>
                        </div>

                        {/* 버튼 */}
                        <div className="flex gap-4">
                            <Link
                                href="/admin/dashboard"
                                className="flex-1 py-3 text-center bg-card border border-border rounded-xl text-muted hover:text-primary transition-colors"
                            >
                                취소
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 disabled:opacity-50 transition-colors"
                            >
                                {isSubmitting ? '수정 중...' : '수정'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
