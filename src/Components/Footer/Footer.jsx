import { FaPhone, FaMapMarkerAlt, FaFacebookF, FaYoutube, FaInstagram, FaWhatsapp } from "react-icons/fa";


function Footer() {
  return (
    <footer className="bg-[#0C1B2A] text-white py-10 px-6">
      <div className="grid gap-8 pb-8 mx-auto border-b border-gray-700 max-w-7xl md:grid-cols-3">

        <div>
          <h3 className="mb-4 text-sm font-semibold">SUPPORT</h3>
          <div className="space-y-4">
            <div className="bg-[#101F30] rounded-xl p-4 flex items-center gap-4">
              <FaPhone className="text-xl" />
              <div>
                <p className="text-sm text-gray-400">9 AM - 8.30 PM</p>
                <p className="text-xl font-bold text-[#FF4C4C]">23312</p>
              </div>
            </div>
            <div className="bg-[#101F30] rounded-xl p-4 flex items-center gap-4">
              <FaMapMarkerAlt className="text-xl" />
              <div>
                <p className="text-sm text-gray-400">Store Locator</p>
                <p className="text-[#FF4C4C] font-semibold">Find Our Stores</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold">ABOUT US</h3>
          <div className="grid grid-cols-2 text-sm text-gray-300 gap-y-2">
            <a href="#">Affiliate Program</a>
            <a href="#">EMI Terms</a>
            <a href="#">Online Delivery</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Refund and Return Policy</a>
            <a href="#">Star Point Policy</a>
            <a href="#">Blog</a>
            <a href="#">Contact Us</a>
            <a href="#">About Us</a>
            <a href="#">Terms and Conditions</a>
            <a href="#">Career</a>
            <a href="#">Brands</a>
          </div>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="mb-4 text-sm font-semibold">STAY CONNECTED</h3>
          <p className="mb-2 font-bold text-white">ORYON Ltd</p>
          <p className="mb-2 text-sm text-gray-300">
            Head Office: 28 TurboX Ave,<br />Gazipur, Dhaka 1000
          </p>
          <p className="mb-2 text-sm text-gray-300">Developer : Meghla Biswas, Joy Halder</p>
          <p className="mb-2 text-sm text-gray-300">Email : <span className="text-red-400">joyhalder00113355@gmail.com</span> </p>

          {/* Social Icons */}
          <div className="flex gap-4 text-xl text-white">
            <a href=""><FaWhatsapp /></a>
            <a href="https://www.facebook.com/share/16p2zBas9N/"><FaFacebookF /></a>
            <a href=""><FaYoutube /></a>
            <a href=""><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col items-center justify-between gap-4 mx-auto mt-6 text-sm text-gray-400 max-w-7xl md:flex-row">
        <p>Experience ORYON App on your mobile:</p>
        <div className="flex gap-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="h-10"
          />
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="h-10"
          />
        </div>
        <p className="w-full text-xs text-center md:w-auto">© 2025 ORYON Ltd | All rights reserved</p>
        <p className="w-full text-xs text-center md:w-auto">এইটা  তৈরি করতে অনেক সময়  লাগছে আমাদের </p>
      </div>
    </footer>
  );
}

export default Footer;
