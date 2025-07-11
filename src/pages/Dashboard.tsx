import { useState } from 'react';
import { 
  WalletIcon, 
  TrendingUpIcon, 
  BanknoteIcon, 
  CreditCardIcon,
  PieChartIcon,
  DollarSignIcon,
  PercentIcon,
  AlertTriangleIcon,
  CrownIcon,
  RefreshCwIcon,
  EyeIcon,
  EyeOffIcon
} from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';

export function Dashboard() {
  const [showBalances, setShowBalances] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const walletBalances = [
    { symbol: 'ETH', amount: '5.2847', value: '$12,350.80', change: '+5.2%', isPositive: true },
    { symbol: 'USDT', amount: '25,430.50', value: '$25,430.50', change: '+0.1%', isPositive: true },
    { symbol: 'USDC', amount: '8,975.25', value: '$8,975.25', change: '-0.2%', isPositive: false },
    { symbol: 'MON', amount: '1,250.00', value: '$3,750.00', change: '+18.5%', isPositive: true },
  ];

  const leveragePositions = [
    {
      id: 1,
      collateral: 'ETH',
      target: 'USDT',
      collateralAmount: '2.5',
      leverage: '3x',
      currentValue: '$18,750.00',
      pnl: '+$1,250.50',
      pnlPercent: '+15.2%',
      isProfit: true,
      health: 85
    },
    {
      id: 2,
      collateral: 'USDC',
      target: 'MON',
      collateralAmount: '5,000',
      leverage: '5x',
      currentValue: '$23,200.00',
      pnl: '-$320.75',
      pnlPercent: '-6.4%',
      isProfit: false,
      health: 65
    }
  ];

  const liquidityPositions = [
    { token: 'ETH', deposited: '2.5', value: '$5,862.50', apy: '4.2%', earned: '$123.45' },
    { token: 'USDT', deposited: '5,000', value: '$5,000.00', apy: '6.8%', earned: '$340.00' },
  ];

  const borrowingPositions = [
    { token: 'USDT', borrowed: '50,000', value: '$50,000.00', apr: '8.5%', interest: '$1,062.50' },
    { token: 'ETH', borrowed: '2.5', value: '$5,862.50', apr: '6.8%', interest: '$0.042' },
  ];

  const totalPortfolioValue = walletBalances.reduce((sum, token) => sum + parseFloat(token.value.replace('$', '').replace(',', '')), 0);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Dashboard</h1>
            <p className="text-purple-300">Manage your asset portfolio and investment positions</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowBalances(!showBalances)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              {showBalances ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              <span className="text-sm">{showBalances ? 'Hide' : 'Show'} Balances</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-800/50 hover:bg-purple-700/50 text-purple-300 rounded-lg transition-colors">
              <RefreshCwIcon size={16} />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Asset Value"
            value={showBalances ? `$${totalPortfolioValue.toLocaleString()}` : '****'}
            change="+8.5%"
            changeType="positive"
            icon={DollarSignIcon}
            description="Last 24 hours"
          />
          <StatCard
            title="Total P&L"
            value={showBalances ? "+$2,847.25" : "****"}
            change="+12.3%"
            changeType="positive"
            icon={TrendingUpIcon}
            description="Cumulative returns"
          />
          <StatCard
            title="Active Positions"
            value="8"
            icon={PieChartIcon}
            description="In progress"
          />
          <StatCard
            title="Average Return Rate"
            value="15.2%"
            change="+2.1%"
            changeType="positive"
            icon={PercentIcon}
            description="Annualized return"
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-purple-900/30 rounded-xl p-1 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: PieChartIcon },
            { id: 'wallets', label: 'Wallets', icon: WalletIcon },
            { id: 'leverage', label: 'Leverage Positions', icon: TrendingUpIcon },
            { id: 'liquidity', label: 'Liquidity', icon: BanknoteIcon },
            // { id: 'lending', label: 'Lending & Borrowing', icon: CreditCardIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Asset Allocation */}
            <div className="trading-card">
              <h3 className="text-xl font-bold text-white mb-6">Asset Allocation</h3>
              <div className="space-y-4">
                {walletBalances.map((token) => (
                  <div key={token.symbol} className="flex items-center justify-between p-3 bg-purple-800/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={`/images/tokens/${token.symbol.toLowerCase()}.jpg`} 
                        alt={token.symbol}
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="16" cy="16" r="16" fill="#8b5cf6"/>
                              <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">
                                ${token.symbol.charAt(0)}
                              </text>
                            </svg>
                          `)}`;
                        }}
                      />
                      <div>
                        <div className="font-medium text-white">{token.symbol}</div>
                        <div className="text-sm text-purple-300 mono-numbers">
                          {showBalances ? token.amount : '****'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white mono-numbers">
                        {showBalances ? token.value : '****'}
                      </div>
                      <div className={`text-sm ${token.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {token.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="trading-card">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { type: 'leverage', action: 'Opened position ETH/USDT', time: '2 hours ago', amount: '+$1,250' },
                  { type: 'liquidity', action: 'Liquidity rewards', time: '6 hours ago', amount: '+$125' },
                  { type: 'lending', action: 'Borrowed USDT', time: '1 day ago', amount: '-$208' },
                  { type: 'swap', action: 'Swapped ETH/USDC', time: '2 days ago', amount: '$0' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-purple-800/30 rounded-lg">
                    <div>
                      <div className="font-medium text-white">{activity.action}</div>
                      <div className="text-sm text-purple-300">{activity.time}</div>
                    </div>
                    <div className={`font-medium mono-numbers ${
                      activity.amount.startsWith('+') ? 'text-green-400' : 
                      activity.amount.startsWith('-') ? 'text-red-400' : 'text-purple-300'
                    }`}>
                      {showBalances ? activity.amount : '****'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wallets' && (
          <div className="trading-card">
            <h3 className="text-xl font-bold text-white mb-6">Wallet Balances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {walletBalances.map((token) => (
                <div key={token.symbol} className="stat-card">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={`/images/tokens/${token.symbol.toLowerCase()}.jpg`} 
                        alt={token.symbol}
                        className="w-6 h-6 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="12" fill="#8b5cf6"/>
                              <text x="12" y="16" text-anchor="middle" fill="white" font-family="Arial" font-size="10" font-weight="bold">
                                ${token.symbol.charAt(0)}
                              </text>
                            </svg>
                          `)}`;
                        }}
                      />
                      <span className="font-medium text-white">{token.symbol}</span>
                    </div>
                    <span className={`text-sm ${token.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {token.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white mono-numbers">
                    {showBalances ? token.amount : '****'}
                  </div>
                  <div className="text-sm text-purple-300 mono-numbers">
                    {showBalances ? token.value : '****'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leverage' && (
          <div className="space-y-6">
            <div className="trading-card">
              <h3 className="text-xl font-bold text-white mb-6">Leverage Positions</h3>
              {leveragePositions.length > 0 ? (
                <div className="space-y-4">
                  {leveragePositions.map((position) => (
                    <div key={position.id} className="p-4 bg-purple-800/30 rounded-xl border border-purple-600/30">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-white">
                              {position.collateral} → {position.target}
                            </span>
                            <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                              {position.leverage}
                            </span>
                          </div>
                          <div className="text-sm text-purple-300 mt-1">
                            Collateral: {showBalances ? position.collateralAmount : '****'} {position.collateral}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-white mono-numbers">
                            {showBalances ? position.currentValue : '****'}
                          </div>
                          <div className={`text-sm ${position.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                            {showBalances ? position.pnl : '****'} ({position.pnlPercent})
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-purple-300">Health Factor</span>
                          <span className="text-white">{position.health}%</span>
                        </div>
                        <div className="w-full bg-purple-900/50 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              position.health > 80 ? 'bg-green-500' : 
                              position.health > 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${position.health}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                          Close Position
                        </button>
                        <button className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                          Adjust
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <TrendingUpIcon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-purple-300">No leverage positions</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'liquidity' && (
          <div className="trading-card">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <CrownIcon className="w-5 h-5 text-yellow-400 mr-2" />
              Liquidity Provision
            
            </h3>
                     {liquidityPositions.length > 0 ? (
              <div className="space-y-4">
                {liquidityPositions.map((position) => (
                  <div key={position.token} className="p-4 bg-purple-800/30 rounded-xl border border-purple-600/30">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={`/images/tokens/${position.token.toLowerCase()}.jpg`} 
                          alt={position.token}
                          className="w-10 h-10 rounded-full"
                          onError={(e) => {
                            e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#8b5cf6"/>
                                <text x="20" y="25" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">
                                  ${position.token.charAt(0)}
                                </text>
                              </svg>
                            `)}`;
                          }}
                        />
                        <div>
                          <h4 className="font-bold text-white">{position.token} Pool</h4>
                          <p className="text-sm text-purple-300">
                            Deposited: {showBalances ? position.deposited : '****'} {position.token}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white mono-numbers">
                          {showBalances ? position.value : '****'}
                        </div>
                        <div className="text-sm text-green-400">
                          APY: {position.apy}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Earned Rewards:</span>
                      <span className="text-green-400 mono-numbers">
                        {showBalances ? position.earned : '****'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BanknoteIcon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-300">No liquidity positions</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'lending' && (
          <div className="trading-card">
            <h3 className="text-xl font-bold text-white mb-6">Lending Positions</h3>
            {borrowingPositions.length > 0 ? (
              <div className="space-y-4">
                {borrowingPositions.map((position) => (
                  <div key={position.token} className="p-4 bg-purple-800/30 rounded-xl border border-purple-600/30">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={`/images/tokens/${position.token.toLowerCase()}.jpg`} 
                          alt={position.token}
                          className="w-10 h-10 rounded-full"
                          onError={(e) => {
                            e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#8b5cf6"/>
                                <text x="20" y="25" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">
                                  ${position.token.charAt(0)}
                                </text>
                              </svg>
                            `)}`;
                          }}
                        />
                        <div>
                          <h4 className="font-bold text-white">{position.token} Borrow</h4>
                          <p className="text-sm text-purple-300">
                            Borrowed: {showBalances ? position.borrowed : '****'} {position.token}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white mono-numbers">
                          {showBalances ? position.value : '****'}
                        </div>
                        <div className="text-sm text-red-400">
                          APR: {position.apr}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Accrued Interest:</span>
                      <span className="text-red-400 mono-numbers">
                        {showBalances ? position.interest : '****'} {position.token}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CreditCardIcon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-300">No lending positions</p>
              </div>
            )}
          </div>
        )}

        {/* Risk Alerts */}
        <div className="mt-8">
          <div className="trading-card">
            <div className="flex items-start space-x-3">
              <AlertTriangleIcon className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-white mb-2">Risk Reminders</h4>
                <div className="space-y-2 text-sm text-purple-300">
                  <p>• Regularly check the health factor of leveraged positions to avoid liquidation</p>
                  <p>• Liquidity mining carries the risk of impermanent loss</p>
                  <p>• Lending interest is calculated daily, please pay attention to repayment deadlines</p>
                  <p>• Market volatility may affect the value of your assets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}