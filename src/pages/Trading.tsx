import { useState } from 'react';
import { 
  TrendingUpIcon, 
  TrendingDownIcon, 
  InfoIcon,
  AlertTriangleIcon,
  BarChart3Icon,
  DollarSignIcon
} from 'lucide-react';
import { TokenSelector } from '../components/ui/TokenSelector';
import { StatCard } from '../components/ui/StatCard';

export function Trading() {
  const [activeTab, setActiveTab] = useState<'open' | 'close'>('open');
  const [collateralToken, setCollateralToken] = useState('ETH');
  const [targetToken, setTargetToken] = useState('USDT');
  const [collateralAmount, setCollateralAmount] = useState('');
  const [leverage, setLeverage] = useState(2);
  const [slippage, setSlippage] = useState(0.5);

  const leverageOptions = [1.5, 2, 3, 5, 10];
  const slippageOptions = [0.1, 0.5, 1.0, 2.0];

  const calculatePositionSize = () => {
    const amount = parseFloat(collateralAmount) || 0;
    return (amount * leverage).toFixed(2);
  };

  const calculateBorrowAmount = () => {
    const amount = parseFloat(collateralAmount) || 0;
    return (amount * (leverage - 1)).toFixed(2);
  };

  const userPositions = [
    {
      id: 1,
      collateral: 'ETH',
      target: 'USDT',
      collateralAmount: '2.5',
      leverage: '3x',
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
      pnl: '-$320.75',
      pnlPercent: '-6.4%',
      isProfit: false,
      health: 65
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Leveraged Trading</h1>
          <p className="text-purple-300">Open leveraged positions with collateral to amplify your trading returns</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trading Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Selector */}
            <div className="flex bg-purple-900/30 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('open')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'open'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                <TrendingUpIcon size={20} className="inline mr-2" />
                Open Position
              </button>
              <button
                onClick={() => setActiveTab('close')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'close'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                <TrendingDownIcon size={20} className="inline mr-2" />
                Close Position
              </button>
            </div>

            {activeTab === 'open' ? (
              /* Open Position Form */
              <div className="trading-card">
                <h3 className="text-xl font-bold text-white mb-6">Open New Position</h3>
                
                <div className="space-y-6">
                  {/* Collateral Token */}
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      Collateral Token
                    </label>
                    <TokenSelector
                      selectedToken={collateralToken}
                      onTokenChange={setCollateralToken}
                      tokens={['ETH', 'USDT', 'USDC']}
                    />
                  </div>

                  {/* Collateral Amount */}
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      Collateral Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={collateralAmount}
                        onChange={(e) => setCollateralAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full skeu-input text-white placeholder:text-purple-400 pl-4 pr-20 py-3"
                      />
                      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 text-sm">
                        MAX
                      </button>
                    </div>
                    <div className="mt-1 text-xs text-purple-400">
                      Balance: 5.2847 {collateralToken}
                    </div>
                  </div>

                  {/* Target Token */}
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      Target Token
                    </label>
                    <TokenSelector
                      selectedToken={targetToken}
                      onTokenChange={setTargetToken}
                      tokens={['USDT', 'USDC', 'MON']}
                    />
                  </div>

                  {/* Leverage */}
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      Leverage Multiplier: {leverage}x
                    </label>
                    <div className="flex space-x-2 mb-3">
                      {leverageOptions.map((lev) => (
                        <button
                          key={lev}
                          onClick={() => setLeverage(lev)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            leverage === lev
                              ? 'bg-purple-600 text-white'
                              : 'bg-purple-800/50 text-purple-300 hover:bg-purple-700/50'
                          }`}
                        >
                          {lev}x
                        </button>
                      ))}
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.1"
                      value={leverage}
                      onChange={(e) => setLeverage(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Slippage */}
                  <div>
                    <label className="block text-sm font-medium text-purple-300 mb-2">
                      Slippage Tolerance
                    </label>
                    <div className="flex space-x-2">
                      {slippageOptions.map((slip) => (
                        <button
                          key={slip}
                          onClick={() => setSlippage(slip)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            slippage === slip
                              ? 'bg-purple-600 text-white'
                              : 'bg-purple-800/50 text-purple-300 hover:bg-purple-700/50'
                          }`}
                        >
                          {slip}%
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Position Summary */}
                 <div className="p-4 bg-purple-800/30 rounded-xl border border-purple-600/30">
  <h4 className="font-medium text-white mb-3">Position Summary</h4>
  <div className="space-y-2 text-sm">
    <div className="flex justify-between">
      <span className="text-purple-300">Position Size:</span>
      <span className="text-white mono-numbers">{calculatePositionSize()} {collateralToken}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-purple-300">Borrow Amount:</span>
      <span className="text-white mono-numbers">{calculateBorrowAmount()} {collateralToken}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-purple-300">Leverage:</span>
      <span className="text-white">{leverage}x</span>
    </div>
    <div className="flex justify-between">
      <span className="text-purple-300">Estimated Fees:</span>
      <span className="text-white mono-numbers">0.05 {collateralToken}</span>
    </div>
  </div>
</div>

{/* Risk Warning */}
<div className="p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-xl">
  <div className="flex items-start space-x-3">
    <AlertTriangleIcon className="w-5 h-5 text-yellow-400 mt-0.5" />
    <div>
      <p className="text-yellow-300 text-sm">
        <strong>Risk Warning:</strong> Leveraged trading involves high risk and may result in total loss of funds. Please ensure you understand the associated risks.
      </p>
    </div>
  </div>
</div>

{/* Open Position Button */}
<button className="w-full action-button">
  Open Position
</button>
</div>
</div>
) : (
/* Close Position Interface */
<div className="trading-card">
  <h3 className="text-xl font-bold text-white mb-6">Position Management</h3>
  
  {userPositions.length > 0 ? (
    <div className="space-y-4">
      {userPositions.map((position) => (
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
                Collateral: {position.collateralAmount} {position.collateral}
              </div>
            </div>
            <div className="text-right">
              <div className={`font-medium ${position.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {position.pnl}
              </div>
              <div className={`text-sm ${position.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {position.pnlPercent}
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
      <BarChart3Icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
      <p className="text-purple-300">No active positions</p>
      <button 
        onClick={() => setActiveTab('open')}
        className="mt-4 action-button"
      >
        Open New Position
      </button>
    </div>
  )}
</div>
)}
</div>

{/* Market Stats */}
<div className="space-y-6">
  <div className="trading-card">
    <h3 className="text-lg font-bold text-white mb-4">Market Statistics</h3>
    <div className="space-y-4">
      <StatCard
        title="Total Locked Value"
        value="$45.2M"
        change="+8.5%"
        changeType="positive"
        icon={DollarSignIcon}
      />
      <StatCard
        title="24h Trading Volume"
        value="$12.8M"
        change="+15.2%"
        changeType="positive"
        icon={BarChart3Icon}
      />
      <StatCard
        title="Active Positions"
        value="2,847"
        change="+23"
        changeType="positive"
        icon={TrendingUpIcon}
      />
    </div>
  </div>

  <div className="trading-card">
    <h3 className="text-lg font-bold text-white mb-4">Fee Structure</h3>
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="text-purple-300">Opening Fee:</span>
        <span className="text-white">0.1%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-purple-300">Closing Fee:</span>
        <span className="text-white">0.1%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-purple-300">Borrow Rate:</span>
        <span className="text-white">5.2% APR</span>
      </div>
      <div className="flex justify-between">
        <span className="text-purple-300">Liquidation Threshold:</span>
        <span className="text-white">80%</span>
      </div>
    </div>
  </div>

  <div className="trading-card">
    <div className="flex items-start space-x-3">
      <InfoIcon className="w-5 h-5 text-blue-400 mt-0.5" />
      <div>
        <h4 className="font-medium text-white mb-2">Trading Tips</h4>
        <ul className="text-sm text-purple-300 space-y-1">
          <li>• Monitor position health to avoid liquidation</li>
          <li>• Use reasonable leverage multiples</li>
          <li>• Set stop-loss strategies</li>
          <li>• Pay attention to market volatility</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</div>
);
}