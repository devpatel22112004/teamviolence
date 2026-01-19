import { Link } from 'react-router-dom'
import { FaDiscord, FaInstagram, FaYoutube, FaTwitch, FaTrophy } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-dark-950 border-t border-dark-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <FaTrophy className="text-primary-500 text-3xl" />
              <h3 className="text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">
                Team VioLencE
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              Professional BGMI Esports Clan. Dominating the battlefield one match at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaDiscord size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaYoutube size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaTwitch size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/tournaments" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Tournaments
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: teamviolence@gmail.com</li>
              <li>Discord: TeamVioLencE#0001</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Team VioLencE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
