import axios from "axios";
import { useEffect, useState } from "react";

export default function ResultPage() {
    // const [status, setStatus] = useState("loading");

    // useEffect(() => {
    //     const params = new URLSearchParams(window.location.search);
    //     const orderId = params.get("vnp_TxnRef");

    //     axios
    //         .get(`http://localhost:8000/api/payment/vnpay/status`)
    //         .then((r) => setStatus(r.data.status));
    // }, []);

    // if (status === "loading") return <p>Đang xử lý...</p>;
    // if (status === "PAID") return <h2>🎉 Thanh toán thành công</h2>;
    // return <h2>❌ Thanh toán thất bại</h2>;
    return "Thanh toán thành công rồi hehehe"
}
