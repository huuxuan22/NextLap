import React, { useEffect, useState } from "react";
import {
  ProfileHeader,
  ProfileInfo,
  ProfileOrders,
  ProfileSecurity,
} from "../components/profile";
import { FiLoader } from "react-icons/fi";
import userApi from "../api/userApi";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userPrincipal = JSON.parse(localStorage.getItem("user_principal"));
      if (userPrincipal) {
        setUser(userPrincipal);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (error.response?.status === 401) {
        // Redirect to login if not authenticated
        window.location.href = "/login";
      } else {
        toast.error("Không thể tải thông tin người dùng");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
    // Update localStorage
    const userPrincipal = JSON.parse(
      localStorage.getItem("user_principal") || "{}"
    );
    const newUserPrincipal = { ...userPrincipal, ...updatedUser };
    localStorage.setItem("user_principal", JSON.stringify(newUserPrincipal));
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#111827" }}
      >
        <div className="text-center">
          <FiLoader
            className="animate-spin text-green-400 mx-auto mb-4"
            size={48}
          />
          <p className="text-gray-400">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Format user data for display
  const profileUser = {
    name: user.full_name || "Chưa cập nhật",
    email: user.email,
    phone: user.phone || "Chưa cập nhật",
    address: user.address || "Chưa cập nhật",
    joined: user.created_at
      ? new Date(user.created_at).toLocaleDateString("vi-VN", {
          month: "long",
          year: "numeric",
        })
      : "Tháng 1, 2026",
    ...user,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#111827" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            Trang cá nhân
          </h1>
          <p className="text-gray-400">
            Quản lý thông tin tài khoản và đơn hàng của bạn
          </p>
        </div>

        <div className="space-y-6">
          {/* Header Section */}
          <ProfileHeader user={profileUser} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              <ProfileInfo user={profileUser} onUpdate={handleUpdateProfile} />
              <ProfileOrders />
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              <ProfileSecurity />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
