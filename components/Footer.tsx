import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-pill">Get in touch</span>

        <p className="footer-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>

        <div className="footer-contact">
          <div className="footer-row">
            <span className="footer-icon">✉</span>
            <a href="mailto:devroot2rise@gmail.com" className="footer-text">
              devroot2rise@gmail.com
            </a>
            <button className="footer-copy" type="button">
              ⧉
            </button>
          </div>

          <div className="footer-row">
            <span className="footer-icon">📞</span>
            <a href="tel:+91XXXXXXXXXX" className="footer-text">
              +91 XXXXXXXXXX
            </a>
            <button className="footer-copy" type="button">
              ⧉
            </button>
          </div>
        </div>

        <p className="footer-mini">You may also find us on these platforms!</p>

        <div className="footer-social">
          <Link href="#" className="footer-social-icon">
            ⌁
          </Link>
          <Link href="#" className="footer-social-icon">
            ⌁
          </Link>
          <Link href="#" className="footer-social-icon">
            ⌁
          </Link>
          <Link href="#" className="footer-social-icon">
            ⌁
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-bottom-text">
          © 2026 | Designed and coded with <span className="footer-heart">❤</span>
        </p>
      </div>
    </footer>
  );
}