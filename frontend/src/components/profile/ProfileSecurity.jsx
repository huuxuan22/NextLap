import React, { useState } from 'react';
import { FiLock, FiShield, FiEye, FiEyeOff } from 'react-icons/fi';
import userApi from '../../api/userApi';
import { toast } from 'react-toastify';

const ProfileSecurity = () => {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!oldPass || !newPass || !confirmPass) {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (newPass !== confirmPass) {
            toast.error('Mật khẩu xác nhận không khớp!');
            return;
        }

        if (newPass.length < 6) {
            toast.error('Mật khẩu mới phải có ít nhất 6 ký tự!');
            return;
        }

        setLoading(true);
        try {
            await userApi.changePassword({
                current_password: oldPass,
                new_password: newPass
            });
            toast.success('Đổi mật khẩu thành công!');
            setOldPass('');
            setNewPass('');
            setConfirmPass('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đổi mật khẩu thất bại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-xl p-6" style={{ backgroundColor: '#1F2937' }}>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full" />
                Bảo mật
            </h3>

            <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="flex items-start gap-3">
                    <FiShield className="text-green-400 mt-0.5" size={20} />
                    <div>
                        <h4 className="text-sm font-medium text-green-400 mb-1">Bảo mật tài khoản</h4>
                        <p className="text-xs text-gray-400">Thay đổi mật khẩu thường xuyên để bảo vệ tài khoản</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Current Password */}
                <div>
                    <label className="text-sm text-gray-400 mb-2 block">Mật khẩu hiện tại</label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <FiLock size={18} />
                        </div>
                        <input
                            value={oldPass}
                            onChange={(e) => setOldPass(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none transition"
                            type={showOld ? "text" : "password"}
                            placeholder="Nhập mật khẩu hiện tại"
                        />
                        <button
                            type="button"
                            onClick={() => setShowOld(!showOld)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                        >
                            {showOld ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label className="text-sm text-gray-400 mb-2 block">Mật khẩu mới</label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <FiLock size={18} />
                        </div>
                        <input
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none transition"
                            type={showNew ? "text" : "password"}
                            placeholder="Nhập mật khẩu mới"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                        >
                            {showNew ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="text-sm text-gray-400 mb-2 block">Xác nhận mật khẩu</label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <FiLock size={18} />
                        </div>
                        <input
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none transition"
                            type={showConfirm ? "text" : "password"}
                            placeholder="Nhập lại mật khẩu mới"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                        >
                            {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full relative group py-3 rounded-lg overflow-hidden transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition" />
                    <span className="relative text-white font-medium">
                        {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                    </span>
                </button>
            </form>
        </div>
    );
};

export default ProfileSecurity;
