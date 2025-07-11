import { useState } from 'react';
import { 
  PlusIcon, 
  MinusIcon, 
  TrendingUpIcon,
  DollarSignIcon,
  PercentIcon,
  InfoIcon,
  CrownIcon
} from 'lucide-react';
import { TokenSelector } from '../components/ui/TokenSelector';
import { StatCard } from '../components/ui/StatCard';

export function Liquidity() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [amount, setAmount] = useState('');

  const liquidityPools = [
    {
      token: 'ETH',
      totalSupply: '12,450.89',
      totalBorrowed: '8,890.23',
      utilization: 71.4,
      supplyAPY: 4.2,
      borrowAPY: 8.5,
      userDeposit: '2.5',
      userShare: '0.02',
      earnedRewards: '0.08'
    },
    {
      token: 'USDT',
      totalSupply: '2,890,450.50',
      totalBorrowed: '1,456,780.25',
      utilization: 50.4,
      supplyAPY: 6.8,
      borrowAPY: 12.3,
      userDeposit: '5,000',
      userShare: '0.17',
      earnedRewards: '125.50'
    },
    {
      token: 'USDC',
      totalSupply: '1,890,234.75',
      totalBorrowed: '945,123.80',
      utilization: 50.0,
      supplyAPY: 6.5,
      borrowAPY: 12.0,
      userDeposit: '0',
      userShare: '0',
      earnedRewards: '0'
    }
  ];

  const selectedPool = liquidityPools.find(pool => pool.token === selectedToken);

  const calculateShares = () => {
    if (!amount || !selectedPool) return '0';
    const amountNum = parseFloat(amount);
    const totalSupply = parseFloat(selectedPool.totalSupply.replace(/,/g, ''));
    return ((amountNum / totalSupply) * 100).toFixed(4);
  };

  const calculateAPY = () => {
    if (!selectedPool) return 0;
    // Base APY + Reward APY
    return selectedPool.supplyAPY + 2.5; // Assuming an additional 2.5% token reward
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Liquidity Pools</h1>
          <p className="text-purple-300">Provide liquidity to the protocol and earn stable yields and governance token rewards</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liquidity Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pool Overview */}
            <div className="trading-card">
              <h3 className="text-xl font-bold text-white mb-6">Liquidity Pool Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatCard
                  title="Total Value Locked"
                  value="$125.4M"
                  change="+12.5%"
                  changeType="positive"
                  icon={DollarSignIcon}
                />
                <StatCard
                  title="Total Annual Yield"
                  value="6.8%"
                  change="+0.2%"
                  changeType="positive"
                  icon={PercentIcon}
                />
                <StatCard
                  title="Liquidity Providers"
                  value="2,847"
                  change="+156"
                  changeType="positive"
                  icon={TrendingUpIcon}
                />
              </div>

              {/* Pool Details */}
              <div className="space-y-4">
                {liquidityPools.map((pool) => (
                  <div key={pool.token} className="p-4 bg-purple-800/30 rounded-xl border border-purple-600/30 hover:border-purple-500/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={`/images/tokens/${pool.token.toLowerCase()}.jpg`} 
                          alt={pool.token}
                          className="w-10 h-10 rounded-full"
                          onError={(e) => {
                            e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#8b5cf6"/>
                                <text x="20" y="25" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">
                                  ${pool.token.charAt(0)}
                                </text>
                              </svg>
                            `)}`;
                          }}
                        />
                        <div>
                          <h4 className="font-bold text-white">{pool.token} Pool</h4>
                          <p className="text-sm text-purple-300">Supply APY: {pool.supplyAPY}%</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{calculateAPY().toFixed(1)}%</div>
                        <div className="text-sm text-purple-300">Total APY</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-purple-300">Total Supply</p>
                        <p className="font-medium text-white mono-numbers">{pool.totalSupply}</p>
                      </div>
                      <div>
                        <p className="text-purple-300">Borrowed</p>
                        <p className="font-medium text-white mono-numbers">{pool.totalBorrowed}</p>
                      </div>
                      <div>
                        <p className="text-purple-300">Utilization</p>
                        <p className="font-medium text-white">{pool.utilization}%</p>
                      </div>
                      <div>
                        <p className="text-purple-300">Your Deposit</p>
                        <p className="font-medium text-white mono-numbers">{pool.userDeposit}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-purple-300">Utilization</span>
                        <span className="text-white">{pool.utilization}%</span>
                      </div>
                      <div className="w-full bg-purple-900/50 rounded-full h-2">
                        <div 
                          className="h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300"
                          style={{ width: `${pool.utilization}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Deposit/Withdraw Interface */}
            <div className="trading-card">
  {/* Tab Selector */}
  <div className="flex bg-purple-900/30 rounded-xl p-1 mb-6">
    <button
      onClick={() => setActiveTab('deposit')}
      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
        activeTab === 'deposit'
          ? 'bg-purple-600 text-white shadow-lg'
          : 'text-purple-300 hover:text-white'
      }`}
    >
      <PlusIcon size={20} className="inline mr-2" />
      Deposit
    </button>
    <button
      onClick={() => setActiveTab('withdraw')}
      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
        activeTab === 'withdraw'
          ? 'bg-purple-600 text-white shadow-lg'
          : 'text-purple-300 hover:text-white'
      }`}
    >
      <MinusIcon size={20} className="inline mr-2" />
      Withdraw
    </button>
  </div>

  <div className="space-y-6">
    {/* Token Selector */}
    <div>
      <label className="block text-sm font-medium text-purple-300 mb-2">
        Select Token
      </label>
      <TokenSelector
        selectedToken={selectedToken}
        onTokenChange={setSelectedToken}
        tokens={['ETH', 'USDT', 'USDC']}
      />
    </div>

    {/* Amount Input */}
    <div>
      <label className="block text-sm font-medium text-purple-300 mb-2">
        {activeTab === 'deposit' ? 'Deposit Amount' : 'Withdrawal Amount'}
      </label>
      <div className="relative">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full skeu-input text-white placeholder:text-purple-400 pl-4 pr-20 py-3"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 text-sm">
          MAX
        </button>
      </div>
      <div className="mt-1 text-xs text-purple-400">
        {activeTab === 'deposit' ? 'Balance' : 'Deposited'}: {selectedPool?.userDeposit || '0'} {selectedToken}
      </div>
    </div>

    {/* Transaction Summary */}
    {amount && selectedPool && (
      <div className="p-4 bg-purple-800/30 rounded-xl border border-purple-600/30">
        <h4 className="font-medium text-white mb-3">Transaction Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-purple-300">
              {activeTab === 'deposit' ? 'Deposit Amount:' : 'Withdrawal Amount:'}
            </span>
            <span className="text-white mono-numbers">{amount} {selectedToken}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-300">Estimated Fee:</span>
            <span className="text-white mono-numbers">0.001 {selectedToken}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-300">Annual Yield Rate:</span>
            <span className="text-white">{calculateAPY().toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-300">Estimated Pool Share:</span>
            <span className="text-white">{calculateShares()}%</span>
          </div>
        </div>
      </div>
    )}

    {/* Action Button */}
    <button className="w-full action-button">
      {activeTab === 'deposit' ? 'Deposit' : 'Withdraw'}
    </button>
  </div>
</div>
</div>

{/* Stats & Info */}
<div className="space-y-6">
  {/* User Stats */}
  <div className="trading-card">
    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
      <CrownIcon className="w-5 h-5 text-yellow-400 mr-2" />
      My Liquidity
    </h3>
    <div className="space-y-4">
      <StatCard
        title="Total Deposit Value"
        value="$18,750"
        change="+5.2%"
        changeType="positive"
        icon={DollarSignIcon}
      />
      <StatCard
        title="Earned Rewards"
        value="$233.58"
        change="+12.8%"
        changeType="positive"
        icon={TrendingUpIcon}
      />
      <StatCard
        title="Average APY"
        value="6.8%"
        icon={PercentIcon}
      />
    </div>
  </div>

  {/* Rewards */}
  <div className="trading-card">
    <h3 className="text-lg font-bold text-white mb-4">Reward Tokens</h3>
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-purple-300">Claimable Rewards:</span>
        <span className="text-white font-medium mono-numbers">125.50 LVR</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-purple-300">Estimated Value:</span>
        <span className="text-white font-medium mono-numbers">$75.30</span>
      </div>
      <button className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-white rounded-lg transition-all duration-200 font-medium">
        Claim Rewards
      </button>
    </div>
  </div>

  {/* Pool Information */}
  <div className="trading-card">
    <div className="flex items-start space-x-3">
      <InfoIcon className="w-5 h-5 text-blue-400 mt-0.5" />
      <div>
        <h4 className="font-medium text-white mb-2">Liquidity Provision</h4>
        <ul className="text-sm text-purple-300 space-y-1">
          <li>• Deposit to start earning rewards</li>
          <li>• Earnings compound daily</li>
          <li>• Earn governance token rewards</li>
          <li>• Withdraw at any time</li>
        </ul>
      </div>
    </div>
  </div>

  {/* Risk Information */}
  <div className="trading-card">
    <div className="flex items-start space-x-3">
      <InfoIcon className="w-5 h-5 text-yellow-400 mt-0.5" />
      <div>
        <h4 className="font-medium text-white mb-2">Risk Disclaimer</h4>
        <ul className="text-sm text-purple-300 space-y-1">
          <li>• Smart contract risks</li>
          <li>• Impermanent loss risks</li>
          <li>• Liquidity risks</li>
          <li>• Market volatility risks</li>
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