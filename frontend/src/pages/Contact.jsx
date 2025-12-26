import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { SiGmail, SiTiktok } from 'react-icons/si';

const branches = [
    { id: 1, name: 'Cung thể Hạo Quân Ngựa', address: 'Tổ 6B, Lúc quả, Hà Nội', colorFrom: '#7b61ff', colorTo: '#a78bfa' },
    { id: 2, name: 'HỒ ĐẦM TRÒN', address: 'Tổ 1B, Hà Nội', colorFrom: '#10b981', colorTo: '#34d399' },
    { id: 3, name: 'Bảo lạng Chiến thắng B-52', address: 'P. Đội Cấn, Hà Nội', colorFrom: '#fb923c', colorTo: '#fb7185' },
];

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        // Demo: no backend wired here — just show a success message
        try {
            // simulate network
            await new Promise((r) => setTimeout(r, 700));
            alert('Gửi tin nhắn thành công! Cảm ơn bạn.');
            reset();
        } catch (err) {
            console.error(err);
            alert('Có lỗi xảy ra khi gửi.');
        }
    };

    return (
        <div className="bg-dark text-gray-900">
            {/* Hero */}
            <div className="py-20 text-center">
                <h1 className="md:text-5xl font-bold tracking-wide text-white">LIÊN HỆ</h1>
                <div className="mt-3 w-24 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded" />
                <p className="mt-4 text-sm text-gray-300 max-w-2xl mx-auto">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi để được tư vấn và giải đáp mọi thắc mắc.</p>
            </div>

            {/* Main content */}
            <div className="bg-white w-full">
                <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-start">
                {/* Left: Contact Info */}
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">THÔNG TIN LIÊN HỆ</h2>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex items-center justify-center bg-white rounded shadow">
                                <FaMapMarkerAlt className="w-5 h-5 text-gray-700" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700">ĐỊA CHỈ</h3>
                                <p className="text-sm text-gray-500">Tầng 6, 266 Đội Cấn, Hà Nội<br/>P. Uối Cẩn, Phân Kê Bình</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex items-center justify-center bg-white rounded shadow">
                                <FaPhone className="w-5 h-5 text-gray-700" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700">ĐIỆN THOẠI</h3>
                                <p className="text-sm text-gray-500">1900 6750</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex items-center justify-center bg-white rounded shadow">
                                <SiGmail className="w-5 h-5 text-gray-700" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700">EMAIL</h3>
                                <p className="text-sm text-gray-500">heliocafein@gmail.com</p>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">THEO DÕI CHÚNG TÔI</h4>
                            <div className="flex gap-3">
                                <button aria-label="Facebook" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow"><FaFacebookF className="w-4 h-4" /></button>
                                <button aria-label="Instagram" className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center shadow"><FaInstagram className="w-4 h-4" /></button>
                                <button aria-label="TikTok" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow"><SiTiktok className="w-4 h-4" /></button>
                                <button aria-label="Twitter" className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center shadow"><FaTwitter className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Contact form card */}
                <div className="flex justify-center md:justify-end">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">GỬI TIN NHẮN CHO CHÚNG TÔI</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Họ tên *</label>
                                <input {...register('name', { required: 'Vui lòng nhập họ tên' })} className="w-full px-4 py-3 border rounded text-gray-700" placeholder="Nhập họ tên *" />
                                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Email *</label>
                                <input {...register('email', { required: 'Vui lòng nhập email' })} className="w-full px-4 py-3 border rounded text-gray-700" placeholder="Nhập Email *" />
                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Nội dung *</label>
                                <textarea {...register('message', { required: 'Vui lòng nhập nội dung' })} rows="6" className="w-full px-4 py-3 border rounded text-gray-700" placeholder="Lời nhắn" />
                                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                            </div>

                            <div>
                                <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded shadow">
                                    {isSubmitting ? 'Đang gửi...' : 'GỬI TIN NHẮN'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>

            {/* Branches */}
            <div className="bg-white">
                <div className="max-w-5xl mx-auto px-4 py-12">
                    <h2 className="text-center text-2xl font-bold mb-8 text-black">CÁC CHI NHÁNH KHÁC</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {branches.map((b) => (
                            <div key={b.id} className="bg-white rounded-lg p-6 shadow">
                                <div className="items-start gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                                        style={{ background: `linear-gradient(135deg, ${b.colorFrom}, ${b.colorTo})` }}
                                    >
                                        <FaMapMarkerAlt className="w-5 h-5 text-white" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{b.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{b.address}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>    

            {/* CTA footer */}
            <div className="py-20 text-center mt-12">
                <h3 className="text-white text-3xl font-semibold mb-4">CẦN HỖ TRỢ NGAY?</h3>
                <p className="text-gray-300 mb-6">Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
                <div className="flex items-center justify-center gap-4">
                    <a href="tel:19006750" className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold shadow hover:bg-black hover:text-white">GỌI NGAY: 1900 6750</a>
                    <Link to="/contact" className="px-6 py-3 border border-white rounded-full text-white hover:bg-white hover:text-gray-900">GỬI EMAIL</Link>
                </div>
            </div>
        </div>
    );
};

export default Contact;
