import logging
import sys
from typing import Optional

# ANSI color codes
class Colors:
    """ANSI color codes cho terminal"""
    RESET = '\033[0m'
    BOLD = '\033[1m'
    DIM = '\033[2m'
    
    # Colors
    RED = '\033[31m'
    GREEN = '\033[32m'
    YELLOW = '\033[33m'
    BLUE = '\033[34m'
    MAGENTA = '\033[35m'
    CYAN = '\033[36m'
    WHITE = '\033[37m'
    
    # Bright colors
    BRIGHT_RED = '\033[91m'
    BRIGHT_GREEN = '\033[92m'
    BRIGHT_YELLOW = '\033[93m'
    BRIGHT_BLUE = '\033[94m'
    BRIGHT_MAGENTA = '\033[95m'
    BRIGHT_CYAN = '\033[96m'
    BRIGHT_WHITE = '\033[97m'


class CustomLogger:
    """Custom logger với các method để hiển thị log đẹp hơn"""
    
    def __init__(self, name: str = __name__):
        self.logger = logging.getLogger(name)
        self._setup_logger()
    
    def _setup_logger(self):
        """Setup logger với format đẹp (không có timestamp)"""
        if not self.logger.handlers:
            handler = logging.StreamHandler()
            # Bỏ timestamp, chỉ giữ message
            formatter = logging.Formatter('%(message)s')
            handler.setFormatter(formatter)
            self.logger.addHandler(handler)
            self.logger.setLevel(logging.INFO)
    
    def show_banner(self):
        """Hiển thị banner NEXTLAP với màu sắc đẹp"""
        banner = f"""
{Colors.BRIGHT_CYAN}{Colors.BOLD}╔══════════════════════════════════════════════════════════════════╗{Colors.RESET}
{Colors.BRIGHT_CYAN}{Colors.BOLD}║                                                                  ║{Colors.RESET}
{Colors.BRIGHT_CYAN}{Colors.BOLD}║          {Colors.BRIGHT_YELLOW}{Colors.BOLD}╔╗╔╗╔╗╔═══╗╔═══╗╔═══╗╔═══╗╔═══╗╔═══╗          {Colors.BRIGHT_CYAN}{Colors.BOLD}║{Colors.RESET}
{Colors.BRIGHT_CYAN}{Colors.BOLD}║          {Colors.BRIGHT_YELLOW}{Colors.BOLD}║║║║║║║╔═╗║║╔═╗║║╔═╗║║╔═╗║║╔═╗║║╔═╗║          {Colors.BRIGHT_CYAN}{Colors.BOLD}║{Colors.RESET}
{Colors.BRIGHT_CYAN}{Colors.BOLD}║          {Colors.BRIGHT_YELLOW}{Colors.BOLD}║║║║║║║║ ╚╝║║ ║║║║ ╚╝║║ ║║║║ ╚╝║║ ║║          {Colors.BRIGHT_CYAN}{Colors.BOLD}║{Colors.RESET}
{Colors.BRIGHT_CYAN}{Colors.BOLD}║          {Colors.BRIGHT_YELLOW}{Colors.BOLD}║╚╝╚╝║║║╔═╗║║║ ║║║║ ╔╗║║ ║║║║ ╔╗║║ ║║          {Colors.BRIGHT_CYAN}{Colors.BOLD}║{Colors.RESET}
{Colors.BRIGHT_CYAN}{Colors.BOLD}║          {Colors.BRIGHT_YELLOW}{Colors.BOLD}╚╗╔╗╔╝║║╚═╝║║╚═╝║║╚═╝║║╚═╝║║╚═╝║║╚═╝║          {Colors.BRIGHT_CYAN}{Colors.BOLD}║{Colors.RESET}
{Colors.BRIGHT_CYAN}{Colors.BOLD}║           {Colors.BRIGHT_YELLOW}{Colors.BOLD}╚╝╚╝ ╚═╝╚═══╝╚═══╝╚═══╝╚═══╝╚═══╝╚═══╝          {Colors.BRIGHT_CYAN}{Colors.BOLD}║{Colors.RESET}
{Colors.BRIGHT_CYAN}{Colors.BOLD}║                                                                  ║{Colors.RESET}
{Colors.BRIGHT_CYAN}{Colors.BOLD}║              {Colors.BRIGHT_GREEN}{Colors.BOLD}🚀  API SERVER  🚀{Colors.RESET}              {Colors.BRIGHT_CYAN}{Colors.BOLD}║{Colors.RESET}
{Colors.BRIGHT_CYAN}{Colors.BOLD}╚══════════════════════════════════════════════════════════════════╝{Colors.RESET}
"""
        print(banner)
    
    def info(self, message: str):
        """Log info message"""
        self.logger.info(f"{Colors.WHITE}{message}{Colors.RESET}")
    
    def success(self, message: str):
        """Log success message"""
        self.logger.info(f"{Colors.BRIGHT_GREEN}✅ {message}{Colors.RESET}")
    
    def error(self, message: str):
        """Log error message"""
        self.logger.error(f"{Colors.BRIGHT_RED}❌ {message}{Colors.RESET}")
    
    def warning(self, message: str):
        """Log warning message"""
        self.logger.warning(f"{Colors.BRIGHT_YELLOW}⚠️  {message}{Colors.RESET}")
    
    def database_connected(self, message: Optional[str] = None):
        """Log database connection success"""
        if message:
            self.logger.info(f"{Colors.BRIGHT_GREEN}✅ Database connected: {Colors.BRIGHT_CYAN}{message}{Colors.RESET}")
        else:
            self.logger.info(f"{Colors.BRIGHT_GREEN}✅ Database connected successfully!{Colors.RESET}")
    
    def database_error(self, message: str):
        """Log database connection error"""
        self.logger.error(f"{Colors.BRIGHT_RED}❌ Database connection failed: {message}{Colors.RESET}")


# Tạo instance logger để sử dụng
logger = CustomLogger("nextlap")

