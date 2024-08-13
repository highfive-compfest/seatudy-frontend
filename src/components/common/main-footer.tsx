import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-600 to-blue-400 text-white py-10 text-center md:text-justify">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        <div>
          <h2 className="font-extrabold text-2xl mb-4">SEATUDY.</h2>
          <p className="text-sm">
            SEATUDY is committed to providing high-quality educational resources that help individuals achieve their learning and career goals. Our platform offers a variety of courses tailored to diverse interests and professional needs.
          </p>
        </div>
        <div>
          <h2 className="font-bold text-md mb-4">FAQs</h2>
          <ul>
            <li className="mb-2">
              <a href="#" className="text-sm hover:text-gray-300 transition-colors">
                How do I enroll in a course?
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-sm hover:text-gray-300 transition-colors">
                What is the refund policy?
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-sm hover:text-gray-300 transition-colors">
                How can I contact support?
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-sm hover:text-gray-300 transition-colors">
                Are there any prerequisites for the courses?
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-md mb-4">OUR TEAMS</h2>
          <ul>
            <li className="mb-2">
              <a href="https://www.linkedin.com/in/iputunathakusuma/" className="text-sm hover:text-gray-300 transition-colors">
                I Putu Natha Kusuma - UB&apos;23
              </a>
            </li>
            <li className="mb-2">
              <a href="https://www.linkedin.com/in/elginbrian/" className="text-sm hover:text-gray-300 transition-colors">
                Elgin Brian Wahyu Bramadhika - UB&apos;23
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-sm hover:text-gray-300 transition-colors">
                Benardo S. - ITB&apos;22
              </a>
            </li>
            <li className="mb-2">
              <a href="https://www.linkedin.com/in/dindinimanudin14/" className="text-sm hover:text-gray-300 transition-colors">
                Dindin Imanudin - ITENAS&apos;23
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-md mb-4">CONTACT</h2>
          <p className="text-sm mb-2">Pondok Cina, Kecamatan Beji, Kota Depok, Jawa Barat 16425</p>
          <p className="text-sm mb-2">
            <a href="https://compfest.id/" className="underline hover:text-gray-300 transition-colors">
              Website
            </a>
          </p>
          <p className="text-sm mb-2">
            <a href="https://www.instagram.com/compfest/" className="underline hover:text-gray-300 transition-colors">
              Instagram
            </a>
          </p>
          <p className="text-sm mb-2">
            <a href="https://twitter.com/COMPFEST/" className="underline hover:text-gray-300 transition-colors">
              Twitter
            </a>
          </p>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-blue-200 pt-4">
        <p className="text-sm">
          &copy; 2024 Copyright:{" "}
          <a href="https://github.com/highfive-compfest" className="underline hover:text-gray-300 transition-colors">
            https://github.com/highfive-compfest
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
