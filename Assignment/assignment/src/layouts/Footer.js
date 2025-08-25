import React from "react";

function Footer() {
  return (
    <footer className="footer-text">
      <p>© {new Date().getFullYear()} Tech-Shop Project. Made by Hoàng Gia Bảo </p>
      <p>Phone: 0373254336</p>
      <p>
        GitHub:{" "}
        <a
          href="https://github.com/HoangBao19"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/HoangBao19
        </a>
      </p>
    </footer>
  );
}

export default Footer;
