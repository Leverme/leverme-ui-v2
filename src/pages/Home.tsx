import { useState, useEffect } from 'react';
import { FaGithub, FaTelegram, FaTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { 
  TrendingUpIcon, 
  BanknoteIcon, 
  CreditCardIcon, 
  ShieldCheckIcon,
  ZapIcon,
  ArrowRightIcon,
  DollarSignIcon,
  BarChart3Icon,
  UsersIcon,
  LockIcon
} from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';

export function Home() {
  const [protocolStats, setProtocolStats] = useState({
    totalValueLocked: '125,430,000',
    totalVolume: '2,890,450,000',
    activeUsers: '45,230',
    totalPositions: '12,450'
  });

  const features = [
    {
      icon: TrendingUpIcon,
      title: 'Leverage Trading',
      description: 'Use ETH, USDT, or USDC as collateral to achieve up to 10x leverage trading',
      href: '/trading',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BanknoteIcon,
      title: 'Liquidity Mining',
      description: 'Provide liquidity to the protocol and earn steady returns with LP token rewards',
      href: '/liquidity',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: CreditCardIcon,
      title: 'Lending Protocol',
      description: 'Offer unsecured loans to whitelisted users with flexible repayment terms',
      href: '/lending',
      color: 'from-green-500 to-blue-500'
    }
  ];

  const advantages = [
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Reliable',
      description: 'Smart contracts are audited multiple times to ensure fund safety'
    },
    {
      icon: ZapIcon,
      title: 'High-Efficiency Trading',
      description: 'Integrated with Uniswap to offer optimal routes and low slippage'
    },
    {
      icon: LockIcon,
      title: 'Risk Control',
      description: 'Robust liquidation and risk management mechanisms'
    },
    {
      icon: DollarSignIcon,
      title: 'Low Fees',
      description: 'Optimized fee structure to maximize user earnings'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-purple-800/20 to-purple-700/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold gradient-text">
                Leverme Protocol
              </h1>
              <p className="text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto">
                The next-generation decentralized leverage trading and lending protocol
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/trading"
                className="action-button flex items-center space-x-2"
              >
                <span>Start Trading</span>
                <ArrowRightIcon size={20} />
              </Link>
              <Link
                to="/liquidity"
                className="px-6 py-3 border border-purple-500/50 text-purple-200 rounded-xl hover:bg-purple-800/30 transition-all duration-200 font-semibold"
              >
                Provide Liquidity
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900/30 to-purple-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Value Locked"
              value={protocolStats.totalValueLocked}
              prefix="$"
              change="+12.5%"
              changeType="positive"
              icon={DollarSignIcon}
              description="Past 24 Hours"
            />
            <StatCard
              title="Total Trading Volume"
              value={protocolStats.totalVolume}
              prefix="$"
              change="+8.3%"
              changeType="positive"
              icon={BarChart3Icon}
              description="Cumulative Volume"
            />
            <StatCard
              title="Active Users"
              value={protocolStats.activeUsers}
              change="+156"
              changeType="positive"
              icon={UsersIcon}
              description="New in Past 24 Hours"
            />
            <StatCard
              title="Open Positions"
              value={protocolStats.totalPositions}
              change="+89"
              changeType="positive"
              icon={TrendingUpIcon}
              description="Currently Open Positions"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Protocol Features
            </h2>
            <p className="text-lg text-purple-300 max-w-2xl mx-auto">
              Leverme Protocol offers a full-suite DeFi solution tailored to various user needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.href}
                  className="trading-card group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-purple-300 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span className="text-sm font-medium">Learn More</span>
                    <ArrowRightIcon size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-purple-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Leverme
            </h2>
            <p className="text-lg text-purple-300 max-w-2xl mx-auto">
              We are committed to delivering the most secure, efficient, and user-friendly DeFi experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div key={index} className="stat-card text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-purple-300 text-sm">
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="skeu-container">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your DeFi Journey?
            </h2>
            <p className="text-lg text-purple-300 mb-8 max-w-2xl mx-auto">
              Connect your wallet now and experience the powerful features of Leverme Protocol.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/trading"
                className="action-button"
              >
                Start Trading
              </Link>
              <Link
                to="/dashboard"
                className="px-6 py-3 border border-purple-500/50 text-purple-200 rounded-xl hover:bg-purple-800/30 transition-all duration-200 font-semibold"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
