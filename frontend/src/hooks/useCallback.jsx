import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    debugger
    useEffect(() => {
        const status = searchParams.get("status");
        const oauth = searchParams.get("oauth");
        const accessToken = searchParams.get("access_token");
        const userDataEncoded = searchParams.get("user_data");
        let userData = null;
        if (userDataEncoded) {
            try {
                userData = JSON.parse(decodeURIComponent(userDataEncoded));
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }

        if (window.opener) {
            window.opener.postMessage(
                {
                    type: "OAUTH_RESPONSE",
                    oauth,
                    status,
                    accessToken,
                    userData,
                },
                window.location.origin
            );

            // Đóng popup sau 100ms để đảm bảo message được gửi
            setTimeout(() => {
                window.close();
            }, 100);
        } else {
            //   window.location.href = "/login";
        }
    }, [searchParams]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <p>Đang xử lý đăng nhập...</p>
        </div>
    );
};

export default AuthCallback;
