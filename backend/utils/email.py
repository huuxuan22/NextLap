"""
Email utility module để gửi email sử dụng fastapi-mail
"""
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr
from typing import Dict, Any, Optional
from config.config import settings
from utils.logger import logger


# Cấu hình kết nối email
def get_mail_config() -> ConnectionConfig:
    """
    Tạo và trả về cấu hình kết nối email từ settings
    
    Returns:
        ConnectionConfig: Cấu hình kết nối email
    """
    return ConnectionConfig(
        MAIL_USERNAME=settings.MAIL_USERNAME,
        MAIL_PASSWORD=settings.MAIL_PASSWORD,
        MAIL_PORT=settings.MAIL_PORT,
        MAIL_SERVER=settings.MAIL_SERVER,
        MAIL_STARTTLS=settings.MAIL_USE_TLS,
        MAIL_SSL_TLS=settings.MAIL_USE_SSL,
        MAIL_FROM=settings.MAIL_FROM,
        MAIL_FROM_NAME=settings.APP_NAME,
        USE_CREDENTIALS=True,
        VALIDATE_CERTS=True,
    )


def create_email_template(
    title: str,
    content: str,
    footer_text: Optional[str] = None
) -> str:
    """
    Tạo HTML template email với tone màu xanh đen ngọc
    
    Args:
        title: Tiêu đề email
        content: Nội dung chính của email (HTML)
        footer_text: Text ở footer (optional)
    
    Returns:
        str: HTML template hoàn chỉnh
    """
    footer = footer_text or f"© {settings.APP_NAME} - All rights reserved"
    
    html_template = f"""
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{title}</title>
        <style>
            * {{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }}
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #0a1929 0%, #0d1b2a 50%, #1a2332 100%);
                padding: 20px;
                line-height: 1.6;
            }}
            .email-container {{
                max-width: 600px;
                margin: 0 auto;
                background: #0d1b2a;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            }}
            .email-header {{
                background: linear-gradient(135deg, #0d7377 0%, #14a085 50%, #0ea5e9 100%);
                padding: 40px 30px;
                text-align: center;
                position: relative;
                overflow: hidden;
            }}
            .email-header::before {{
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                animation: shimmer 3s infinite;
            }}
            @keyframes shimmer {{
                0% {{ transform: rotate(0deg); }}
                100% {{ transform: rotate(360deg); }}
            }}
            .email-header h1 {{
                color: #ffffff;
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                position: relative;
                z-index: 1;
            }}
            .email-header .subtitle {{
                color: #e0f2fe;
                font-size: 14px;
                opacity: 0.9;
                position: relative;
                z-index: 1;
            }}
            .email-body {{
                padding: 40px 30px;
                background: #0d1b2a;
                color: #e0f2fe;
            }}
            .email-content {{
                font-size: 16px;
                line-height: 1.8;
                color: #cbd5e1;
            }}
            .email-content h2 {{
                color: #14a085;
                font-size: 22px;
                margin-bottom: 20px;
                border-left: 4px solid #0ea5e9;
                padding-left: 15px;
            }}
            .email-content p {{
                margin-bottom: 15px;
                color: #cbd5e1;
            }}
            .email-content a {{
                color: #0ea5e9;
                text-decoration: none;
                border-bottom: 2px solid #0ea5e9;
                transition: all 0.3s ease;
            }}
            .email-content a:hover {{
                color: #14a085;
                border-bottom-color: #14a085;
            }}
            .button-container {{
                text-align: center;
                margin: 30px 0;
            }}
            .email-button {{
                display: inline-block;
                padding: 14px 32px;
                background: linear-gradient(135deg, #0ea5e9 0%, #14a085 100%);
                color: #ffffff;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
                transition: all 0.3s ease;
            }}
            .email-button:hover {{
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(14, 165, 233, 0.5);
            }}
            .divider {{
                height: 1px;
                background: linear-gradient(90deg, transparent, #0ea5e9, transparent);
                margin: 30px 0;
            }}
            .email-footer {{
                background: #0a1929;
                padding: 25px 30px;
                text-align: center;
                border-top: 1px solid rgba(14, 165, 233, 0.2);
            }}
            .email-footer p {{
                color: #64748b;
                font-size: 13px;
                margin: 5px 0;
            }}
            .email-footer .brand {{
                color: #0ea5e9;
                font-weight: 600;
                font-size: 14px;
            }}
            .social-links {{
                margin-top: 15px;
            }}
            .social-links a {{
                display: inline-block;
                margin: 0 10px;
                color: #0ea5e9;
                font-size: 20px;
                transition: color 0.3s ease;
            }}
            .social-links a:hover {{
                color: #14a085;
            }}
            @media only screen and (max-width: 600px) {{
                .email-container {{
                    width: 100% !important;
                    margin: 0 !important;
                    border-radius: 0 !important;
                }}
                .email-header, .email-body, .email-footer {{
                    padding: 25px 20px !important;
                }}
                .email-header h1 {{
                    font-size: 24px !important;
                }}
            }}
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>{title}</h1>
                <div class="subtitle">{settings.APP_NAME}</div>
            </div>
            
            <div class="email-body">
                <div class="email-content">
                    {content}
                </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="email-footer">
                <p class="brand">{settings.APP_NAME}</p>
                <p>{footer}</p>
                <div class="social-links">
                    <a href="#" title="Website">🌐</a>
                    <a href="#" title="Facebook">📘</a>
                    <a href="#" title="Email">✉️</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    return html_template


async def sendmail(
    to_email: str,
    subject: str,
    content: str,
    title: Optional[str] = None,
    footer_text: Optional[str] = None
) -> Dict[str, Any]:
    """
    Gửi email với HTML template đẹp (tone màu xanh đen ngọc)
    
    Args:
        to_email: Địa chỉ email người nhận
        subject: Tiêu đề email
        content: Nội dung chính của email (HTML) - sẽ được wrap trong template
        title: Tiêu đề hiển thị trong email (mặc định = subject)
        footer_text: Text ở footer (optional)
    
    Returns:
        Dict[str, Any]: Kết quả gửi email với các trường:
            - success: bool - True nếu gửi thành công, False nếu có lỗi
            - message: str - Thông báo kết quả
            - error: str - Thông báo lỗi (nếu có)
    
    Example:
        ```python
        result = await sendmail(
            to_email="user@example.com",
            subject="Chào mừng đến với NextLap",
            content="<h2>Xin chào!</h2><p>Cảm ơn bạn đã đăng ký.</p>",
            title="Chào mừng"
        )
        ```
    """
    try:
        # Validate email format
        email_str = EmailStr(to_email)
        
        # Sử dụng subject làm title nếu không có title
        email_title = title or subject
        
        # Tạo HTML template với nội dung
        html_body = create_email_template(
            title=email_title,
            content=content,
            footer_text=footer_text
        )
        
        # Tạo cấu hình email
        mail_config = get_mail_config()
        
        # Tạo message
        message = MessageSchema(
            subject=subject,
            recipients=[email_str],
            body=html_body,
            subtype=MessageType.html
        )
        
        # Khởi tạo FastMail và gửi email
        fm = FastMail(mail_config)
        await fm.send_message(message)
        
        logger.info(f"✅ Email sent successfully to {to_email}")
        
        return {
            "success": True,
            "message": f"Email đã được gửi thành công tới {to_email}",
            "error": None
        }
        
    except ValueError as e:
        # Email format không hợp lệ
        error_msg = f"Địa chỉ email không hợp lệ: {str(e)}"
        logger.error(f"❌ {error_msg}")
        return {
            "success": False,
            "message": "Gửi email thất bại",
            "error": error_msg
        }
        
    except Exception as e:
        # Lỗi khác (kết nối, xác thực, etc.)
        error_msg = f"Lỗi khi gửi email: {str(e)}"
        logger.error(f"❌ {error_msg}")
        return {
            "success": False,
            "message": "Gửi email thất bại",
            "error": error_msg
        }
