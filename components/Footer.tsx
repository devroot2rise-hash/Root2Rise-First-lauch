export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-pill">Get in touch</span>

        <p className="footer-desc">
          We&apos;ve been there. We won&apos;t let you feel the same.
        </p>

        <div className="footer-contact">
          <div className="footer-row">
            <span className="footer-icon">✉</span>
            <a href="mailto:explore@root2rise.co.in" className="footer-text">
                explore@root2rise.co.in
            </a>
            <button className="footer-copy" type="button">
              ⧉
            </button>
          </div>

          <div className="footer-row">
            <span className="footer-icon">📞</span>
            <a href="tel:+917505737178" className="footer-text">
              +917505737178
            </a>
            <button className="footer-copy" type="button">
              ⧉
            </button>
          </div>
        </div>

        <p className="footer-mini">You may also find us on these platforms!</p>

        <div className="footer-social">
          <a
            href="https://www.instagram.com/root2rise_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            className="footer-social-icon footer-social-instagram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram — Root2Rise Official"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="#fff" strokeWidth="1.4" fill="none" />
              <circle className="lens" cx="12" cy="12" r="3.6" stroke="#fff" strokeWidth="1.4" fill="none" />
              <circle className="dot" cx="17.2" cy="6.8" r="0.9" fill="#fff" />
            </svg>
          </a>

          <a
            href="https://chat.whatsapp.com/REPLACE_WITH_COMMUNITY_INVITE"
            className="footer-social-icon footer-social-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Community"
            title="WhatsApp community — replace invite with your chat link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.373 0 0 5.373 0 12a12 12 0 001.92 6.36L0 24l5.82-1.92A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.25-6.08-3.48-8.52zM12 21.5a9.5 9.5 0 01-5.2-1.5l-.37-.22-3.45 1.13 1.13-3.36-.23-.37A9.5 9.5 0 1112 21.5z" />
              <path d="M17.5 14.5c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15s-.77.98-.95 1.18c-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.28.3-.47.1-.18.05-.35-.02-.5-.07-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.51l-.56-.01c-.18 0-.47.07-.72.35-.25.28-.96.93-.96 2.27 0 1.33.98 2.62 1.12 2.8.13.18 1.94 3.03 4.7 4.25 2.76 1.22 2.76.82 3.26.77.5-.05 1.6-.65 1.83-1.28.23-.63.23-1.16.16-1.28-.07-.13-.26-.2-.55-.35z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/company/root-2rise/"
            className="footer-social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn — Root 2Rise"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7 19H4V9h3v10zM5.5 7.5C4.67 7.5 4 6.83 4 6s.67-1.5 1.5-1.5S7 5.17 7 6s-.67 1.5-1.5 1.5zM20 19h-3v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.97V19h-3V9h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6V19z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}