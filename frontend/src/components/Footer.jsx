import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t mt-auto" style={{ backgroundColor: '#111827', borderColor: '#374151' }}>
      <div className="container mx-auto px-4 py-10 text-sm text-highlight-hover">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-start">
            <div className="pl-0 md:pl-6 text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">NextLap</h3>
              <p className="text-gray-400">Innovation Beyond Speed</p>
            </div>

            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold mb-4">RESOURCES</h4>
              <ul className="space-y-1 text-gray-400">
                <li><Link to="/docs" className="hover:underline">Application</Link></li>
                <li><Link to="/docs" className="hover:underline">Documentation</Link></li>
                <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold mb-4">COMPANY</h4>
              <ul className="space-y-1 text-gray-400">
                <li><Link to="/about" className="hover:underline">About Us</Link></li>
                <li><Link to="/careers" className="hover:underline">Careers</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold mb-4">SOCIAL</h4>

              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <a href="#" aria-label="facebook" className="text-gray-400 hover:text-white"> 
                  <svg className="w-6 h-6 text-highlight-hover" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12z"/></svg>
                </a>
                <a href="#" aria-label="twitter" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6 text-highlight-hover" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.11 3c-2.63 0-4.75 2.2-4.75 4.9 0 .38.04.75.12 1.11A13 13 0 013 4.15a5 5 0 00-.64 2.47c0 1.7.84 3.2 2.12 4.08a4.5 4.5 0 01-2.15-.6v.06c0 2.4 1.64 4.4 3.82 4.86a4.52 4.52 0 01-2.13.08c.6 1.9 2.36 3.3 4.44 3.35A9.05 9.05 0 012 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-7 12.85-13v-.59A9.22 9.22 0 0023 3z"/></svg>
                </a>
                <a href="#" aria-label="instagram" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6 text-highlight-hover" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6a5 5 0 100 10 5 5 0 000-10zm6.5-3a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>
                </a>
                <a href="#" aria-label="linkedin" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6 text-highlight-hover" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-14h4v2a4 4 0 014-2zM2 9h4v14H2z"/></svg>
                </a>
              </div>

              {/* App download block - QR + badges */}
              <div className="mb-2 text-sm font-medium text-highlight-hover text-center md:text-left">Tải ứng dụng trên điện thoại</div>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                {/* QR placeholder */}
                <div className="w-20 h-20 bg-white p-2 rounded-sm flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="https://frontend.tikicdn.com/_desktop-next/static/img/footer/qrcode.png">
                    <rect x="0" y="0" width="100" height="100" fill="#fff" />
                    <rect x="10" y="10" width="20" height="20" fill="#111827" />
                    <rect x="40" y="10" width="20" height="20" fill="#111827" />
                    <rect x="10" y="40" width="20" height="20" fill="#111827" />
                    <rect x="65" y="20" width="8" height="8" fill="#111827" />
                    <rect x="76" y="32" width="8" height="8" fill="#111827" />
                    <rect x="54" y="54" width="8" height="8" fill="#111827" />
                    <rect x="20" y="70" width="8" height="8" fill="#111827" />
                    <rect x="70" y="70" width="8" height="8" fill="#111827" />
                  </svg>
                </div>

                {/* Badges */}
                <div className="flex flex-col gap-2">
                  <a href="#" className="inline-flex items-center gap-3 bg-bg-dark px-3 py-2 rounded-md text-sm hover:opacity-90 border-2 border-highlight-hover">
                    {/* Apple icon */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.365 1.43c-.82.05-1.81.56-2.39 1.26-.52.63-1.06 1.63-.9 2.6 1.03.04 2.08-.57 2.73-1.22.66-.66 1.22-1.61.56-2.64zM12.6 6.4c-1.86 0-3.34 1.2-4.1 1.2-.69 0-2.2-1.18-3.62-1.18C3.14 6.42 1 8.06 1 11.09c0 2.35 1.52 5.53 3.4 7.36 1.7 1.67 3.72 3.42 6.43 3.33 1.76-.06 2.36-1.14 4.4-1.14 2.05 0 2.64 1.14 4.4 1.12 2.7-.02 4.42-1.94 6.12-3.62 1.07-1.02 1.86-2.34 2.33-3.51-.41-.17-3.46-1.25-3.46-4.99 0-4.06-3.32-6.61-6.88-6.61-1.66 0-3.15.6-4.5.6z"/></svg>
                    <span >
                      <div className="text-xs text-highlight-hover">Tải về trên</div>
                      <div className="font-semibold leading-none ">App Store</div>
                    </span>
                  </a>

                  <a href="#" className="inline-flex items-center gap-3 bg-bg-dark px-3 py-2 rounded-md text-sm hover:opacity-90 border-2 border-highlight-hover">
                    {/* Play icon */}
                    <svg className="w-5 h-5 text-highlight-hover" viewBox="0 0 24 24" fill="currentColor"><path d="M3.4 1.6L20 12 3.4 22.4V1.6z"/></svg>
                    <span>
                      <div className="text-xs ">Tải về trên</div>
                      <div className="font-semibold leading-none ">Google Play</div>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-4 text-center text-gray-500">
            © {new Date().getFullYear()} NextLap. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
