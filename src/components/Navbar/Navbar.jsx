import NotificationsMenu from './NotificationsMenu';
import UserMenu from './UserMenu';
import ThemeSelector from './ThemeSelector';
import SearchBar from './SearchBar';
import { Menu, X, GraduationCap } from 'lucide-react';
import PropTypes from 'prop-types';

const Navbar = ({ isSidebarOpen, toggleSidebar, isMobile }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 p-2">
      <nav className="bg-base-100 border-b border-base-200 h-16 rounded-lg">
        <div className="max-w-[2000px] mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              {/* Sidebar Toggle Button */}
              {isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="btn btn-ghost btn-square"
                  aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                  aria-expanded={isSidebarOpen}
                >
                  {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              )}

              {/* Logo */}
              <a href="/" className="btn btn-ghost text-xl flex items-center gap-2">
                <GraduationCap className="w-8 h-8 text-primary" />
                <span className="font-bold text-xl hidden sm:inline-block">OFPPT</span>
              </a>
            </div>

            {/* Search Section */}
            <SearchBar />

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <NotificationsMenu />
              <ThemeSelector />
              <UserMenu />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Navbar;
