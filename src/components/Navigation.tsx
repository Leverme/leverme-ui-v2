import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { 
  HomeIcon, 
  TrendingUpIcon, 
  BanknoteIcon, 
  CreditCardIcon, 
  ClockIcon,
  UserIcon,
  MenuIcon,
  XIcon
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/trading', label: 'Trade', icon: TrendingUpIcon },
  { href: '/liquidity', label: 'Pool', icon: BanknoteIcon },
  // { href: '/lending', label: '借贷', icon: CreditCardIcon },
  { href: '/history', label: 'History', icon: ClockIcon },
  { href: '/dashboard', label: 'Dashboard', icon: UserIcon },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 to-purple-800/95 backdrop-blur-md border-b border-purple-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
              {/* <span className="text-white font-bold text-xl">L</span> */}
              <img
              src='/logo.png'
              style={{
                minWidth:"80px",
                minHeight:"80px"
              }}
              >
              </img>
            </div>
            <span className="text-2xl font-bold gradient-text">Leverme Protocol</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-600/50 text-purple-100 shadow-lg'
                      : 'text-purple-200 hover:text-purple-100 hover:bg-purple-700/30'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Wallet Connect */}
          <div className="hidden md:block">
            <ConnectButton 
              chainStatus="icon"
              showBalance={false}
            />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-purple-200 hover:text-purple-100 hover:bg-purple-700/30 transition-colors"
          >
            {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-purple-700/50">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-purple-600/50 text-purple-100'
                        : 'text-purple-200 hover:text-purple-100 hover:bg-purple-700/30'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-purple-700/50">
                <ConnectButton 
                  chainStatus="icon"
                  showBalance={false}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
