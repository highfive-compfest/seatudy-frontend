import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-blue-600 text-white py-10 text-center md:text-justify">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
          <div>
            <h2 className="font-bold text-lg mb-4">SEATUDY.</h2>
            <p>Seatudy aims to empower individuals to acquire new skills and achieve their professional goals, transforming the way people learn and grow.</p>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-4">SPONSORS</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="underline hover:text-gray-300 transition-colors">
                  Lorem ipsum
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="underline hover:text-gray-300 transition-colors">
                  Corporis adipisci
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="underline hover:text-gray-300 transition-colors">
                  Adipisicing aspernatur
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-4">USEFUL LINKS</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="underline hover:text-gray-300 transition-colors">
                  About
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
                  Contact
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
    </>
  );
};

export default Footer;
