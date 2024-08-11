import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-10 text-center md:text-justify">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        <div>
          <h2 className="font-bold text-lg mb-4">SEATUDY.</h2>
          <p>
            Seatudy is committed to providing high-quality educational resources that help individuals achieve their learning and career goals. Our platform offers a variety of courses tailored to diverse interests and professional needs.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-4">FAQs</h2>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-300 transition-colors">
                How do I enroll in a course?
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-300 transition-colors">
                What is the refund policy?
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-300 transition-colors">
                How can I contact support?
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-gray-300 transition-colors">
                Are there any prerequisites for the courses?
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-4">USEFUL LINKS</h2>
          <ul>
            <li className="mb-2">
              <a href="#" className="underline hover:text-gray-300 transition-colors">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="underline hover:text-gray-300 transition-colors">
                News
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="underline hover:text-gray-300 transition-colors">
                Support
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="underline hover:text-gray-300 transition-colors">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-4">CONTACT</h2>
          <p className="mb-2">Pondok Cina, Kecamatan Beji, Kota Depok, Jawa Barat 16425</p>
          <p className="mb-2">
            <a href="https://compfest.id/" className="underline hover:text-gray-300 transition-colors">
              Official Website
            </a>
          </p>
          <p className="mb-2">
            <a href="https://www.instagram.com/compfest/" className="underline hover:text-gray-300 transition-colors">
              Instagram
            </a>
          </p>
          <p className="mb-2">
            <a href="https://twitter.com/COMPFEST/" className="underline hover:text-gray-300 transition-colors">
              Twitter
            </a>
          </p>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>
          &copy; 2024 Copyright:{" "}
          <a href="https://github.com/highfive-compfest" className="underline hover:text-gray-300 transition-colors">
            github.com/highfive-compfest
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
