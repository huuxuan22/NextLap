import hashlib, hmac, urllib.parse
from fastapi import APIRouter, Request, status
from datetime import datetime

from starlette.responses import RedirectResponse
from config.config import settings

payment_router = APIRouter(
    prefix="/payment",
    tags=["/payment"]
)

import hmac
import hashlib
import urllib.parse
from datetime import datetime
from fastapi import Request

@payment_router.get("/create-payment")
async def create_payment(amount: int, request: Request):
    amount_vnp = amount * 100 

    params = {
        "vnp_Version": "2.1.0",
        "vnp_Command": "pay",
        "vnp_TmnCode": settings.VNP_TMNCODE,
        "vnp_Amount": str(amount_vnp),  # Chuyển sang string
        "vnp_CurrCode": "VND",
        "vnp_TxnRef": datetime.now().strftime("%Y%m%d%H%M%S%f"),
        "vnp_OrderInfo": "Thanh toan don hang",
        "vnp_OrderType": "other",
        "vnp_Locale": "vn",
        "vnp_ReturnUrl": settings.VNP_RETURN_URL,
        "vnp_IpAddr": request.client.host,
        "vnp_CreateDate": datetime.now().strftime("%Y%m%d%H%M%S"),
    }

    # 1. Sắp xếp params theo alphabet
    sorted_params = sorted(params.items())

    hash_data = "&".join(
    [f"{k}={urllib.parse.quote_plus(str(v))}" for k, v in sorted_params]
)

    # 3. Tính Secure Hash
    secure_hash = hmac.new(
        settings.VNP_HASHSECRET.encode("utf-8"),
        hash_data.encode("utf-8"),
        hashlib.sha512,
    ).hexdigest()

    # 4. Thêm vnp_SecureHash vào params
    params["vnp_SecureHashType"] = "HMACSHA512"
    params["vnp_SecureHash"] = secure_hash

    # 5. Tạo URL với encoding (dùng urlencode tự động encode)
    query_string = urllib.parse.urlencode(sorted(params.items()))
    payment_url = f"{settings.VNP_URL}?{query_string}"

    return {"payment_url": payment_url}


@payment_router.get("/vnpay/return")
async def vnp_return(request: Request):
    params = dict(request.query_params)

    secure = params.pop("vnp_SecureHash", "")
    params.pop("vnp_SecureHashType", None)

    sorted_params = sorted(params.items())

    hash_data = "&".join(
        [f"{k}={urllib.parse.quote_plus(str(v))}" for k, v in sorted_params]
    )

    check = hmac.new(
        settings.VNP_HASHSECRET.encode("utf-8"),
        hash_data.encode("utf-8"),
        hashlib.sha512,
    ).hexdigest()

    if check == secure and params.get("vnp_ResponseCode") == "00":
        # order_id = params.get("vnp_TxnRef")

        return RedirectResponse(
            url=f"http://localhost:3000/payment/result"
        )

    return {"status": "failed"}



@payment_router.get("/vnpay/ipn")
async def vnp_ipn(request: Request):
    params = dict(request.query_params)
    secure = params.pop("vnp_SecureHash", "")

    sorted_data = urllib.parse.urlencode(sorted(params.items()))
    check = hmac.new(settings.VNP_HASHSECRET.encode(), sorted_data.encode(), hashlib.sha512).hexdigest()

    if secure != check:
        return {"RspCode": "97", "Message": "Invalid signature"}

    if params.get("vnp_ResponseCode") == "00":
        # TODO: cập nhật đơn hàng -> PAID
        return {"RspCode": "00", "Message": "Confirm Success"}

    return {"RspCode": "01", "Message": "Payment Failed"}

@payment_router.get("/vnpay/status")
def check(orderId: str):
    return {"status": status.HTTP_200_OK}
