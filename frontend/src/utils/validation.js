import { toast } from 'react-toastify';

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
};

export const validateShippingInfo = (shippingInfo) => {
    const { fullName, email, phone, address, city } = shippingInfo;

    if (!fullName.trim()) {
        toast.error('Vui lòng nhập họ tên');
        return false;
    }

    if (!email.trim()) {
        toast.error('Vui lòng nhập email');
        return false;
    }

    if (!validateEmail(email)) {
        toast.error('Email không hợp lệ');
        return false;
    }

    if (!phone.trim()) {
        toast.error('Vui lòng nhập số điện thoại');
        return false;
    }

    if (!validatePhone(phone)) {
        toast.error('Số điện thoại không hợp lệ');
        return false;
    }

    if (!address.trim()) {
        toast.error('Vui lòng nhập địa chỉ');
        return false;
    }

    if (!city.trim()) {
        toast.error('Vui lòng chọn tỉnh/thành phố');
        return false;
    }

    return true;
};
