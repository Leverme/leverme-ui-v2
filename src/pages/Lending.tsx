import { useState } from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  ClockIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
  CreditCardIcon,
  DollarSignIcon,
  PercentIcon,
  CheckCircleIcon
} from 'lucide-react';
import { TokenSelector } from '../components/ui/TokenSelector';
import { StatCard } from '../components/ui/StatCard';

export function Lending() {
  const [activeTab, setActiveTab] = useState<'borrow' | 'repay'>('borrow');
  const [selectedToken, setSelectedToken] = useState('USDT');
  const [amount, setAmount] = useState('');

  // User whitelist status
  const [isWhitelisted] = useState(true);
  const [creditScore] = useState(850);

  const borrowingPools = [
    {
      token: 'USDT',
      available: '1,250,000',
      borrowAPR: 8.5,
      userBorrowed: '50,000',
      userLimit: '100,000',
      utilizationRate: 65.4
    },
    {
      token: 'USDC',
      available: '890,000',
      borrowAPR: 8.2,
      userBorrowed: '25,000',
      userLimit: '75,000',
      utilizationRate: 58.2
    },
    {
      token: 'ETH',
      available: '450.89',
      borrowAPR: 6.8,
      userBorrowed: '2.5',
      userLimit: '10.0',
      utilizationRate: 71.2
    }
  ];

  const userBorrowHistory = [
    {
      id: 1,
      token: 'USDT',
      amount: '50,000',
      borrowed: '2024-01-15',
      dueDate: '2024-04-15',
      interestRate: 8.5,
      accruedInterest: '1,062.50',
      status: 'active'
    },
    {
      id: 2,
      token: 'ETH',
      amount: '2.5',
      borrowed: '2024-02-01',
      dueDate: '2024-05-01',
      interestRate: 6.8,
      accruedInterest: '0.042',
      status: 'active'
    }
  ];

  const selectedPool = borrowingPools.find(pool => pool.token === selectedToken);

  const calculateInterest = () => {
    if (!amount || !selectedPool) return '0';
    const principal = parseFloat(amount);
    const monthlyRate = selectedPool.borrowAPR / 100 / 12;
    const monthlyInterest = principal * monthlyRate;
    return monthlyInterest.toFixed(2);
  };

  const calculateCreditUtilization = () => {
    if (!selectedPool) return '0';
    const currentBorrowed = parseFloat(selectedPool.userBorrowed.replace(/,/g, ''));
    const limit = parseFloat(selectedPool.userLimit.replace(/,/g, ''));
    return ((currentBorrowed / limit) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Lending Protocol</h1>
          <p className="text-purple-300">Providing collateral-free lending services for whitelisted users with flexible repayment mechanisms</p>
        </div>

        {/* Whitelist Status */}
        <div className="mb-8">
          <div className={`p-4 rounded-xl border ${
            isWhitelisted 
              ? 'bg-green-900/20 border-green-600/30' 
              : 'bg-red-900/20 border-red-600/30'
          }`}>
            <div className="flex items-center space-x-3">
              {isWhitelisted ? (
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
              ) : (
                <AlertTriangleIcon className="w-6 h-6 text-red-400" />
              )}
              <div>
                <h3 className={`font-medium ${isWhitelisted ? 'text-green-300' : 'text-red-300'}`}>
                  {isWhitelisted ? 'You have been granted whitelist access' : 'You do not currently have whitelist access'}
                </h3>
                <p className={`text-sm ${isWhitelisted ? 'text-green-400' : 'text-red-400'}`}>
                  {isWhitelisted 
                    ? `Credit Score: ${creditScore}/1000 - Enjoy collateral-free lending privileges`
                    : 'Please contact an administrator to apply for whitelist access'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lending Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Available Pools */}
            <div className="trading-card">
              <h3 className="text-xl font-bold text-white mb-6">Lending Pool Overview</h3>
              
              <div className="space-y-4">
                {borrowingPools.map((pool) => (
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
                          <p className="text-sm text-purple-300">Borrow APR: {pool.borrowAPR}%</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white mono-numbers">{pool.borrowAPR}%</div>
                        <div className="text-sm text-purple-300">APR</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-purple-300">Available</p>
                        <p className="font-medium text-white mono-numbers">{pool.available}</p>
                      </div>
                      <div>
                        <p className="text-purple-300">Your Borrowed</p>
                        <p className="font-medium text-white mono-numbers">{pool.userBorrowed}</p>
                      </div>
                      <div>
                        <p className="text-purple-300">Borrow Limit</p>
                        <p className="font-medium text-white mono-numbers">{pool.userLimit}</p>
                      </div>
                      <div>
                        <p className="text-purple-300">Utilization Rate</p>
                        <p className="font-medium text-white">{pool.utilizationRate}%</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-purple-300">Your Credit Utilization</span>
                        <span className="text-white">{calculateCreditUtilization()}%</span>
                      </div>
                      <div className="w-full bg-purple-900/50 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            parseFloat(calculateCreditUtilization()) > 80 ? 'bg-red-500' :
                            parseFloat(calculateCreditUtilization()) > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${calculateCreditUtilization()}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Borrow/Repay Interface */}
<div className="trading-card">
  {/* Tab Selector */}
  <div className="flex bg-purple-900/30 rounded-xl p-1 mb-6">
    <button
      onClick={() => setActiveTab('borrow')}
      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
        activeTab === 'borrow'
          ? 'bg-purple-600 text-white shadow-lg'
          : 'text-purple-300 hover:text-white'
      }`}
    >
      <ArrowDownIcon size={20} className="inline mr-2" />
      Borrow
    </button>
    <button
      onClick={() => setActiveTab('repay')}
      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
        activeTab === 'repay'
          ? 'bg-purple-600 text-white shadow-lg'
          : 'text-purple-300 hover:text-white'
      }`}
    >
      <ArrowUpIcon size={20} className="inline mr-2" />
      Repay
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
        tokens={['USDT', 'USDC', 'ETH']}
        disabled={!isWhitelisted}
      />
    </div>

    {/* Amount Input */}
    <div>
      <label className="block text-sm font-medium text-purple-300 mb-2">
        {activeTab === 'borrow' ? 'Borrow Amount' : 'Repayment Amount'}
      </label>
      <div className="relative">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          disabled={!isWhitelisted}
          className="w-full skeu-input text-white placeholder:text-purple-400 pl-4 pr-20 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 text-sm disabled:opacity-50"
          disabled={!isWhitelisted}
        >
          MAX
        </button>
      </div>
      {selectedPool && (
        <div className="mt-1 text-xs text-purple-400">
          {activeTab === 'borrow' 
            ? `Borrow Limit: ${selectedPool.userLimit} ${selectedToken}`
            : `Amount Due: ${selectedPool.userBorrowed} ${selectedToken}`
          }
        </div>
      )}
    </div>

    {/* Transaction Summary */}
    {amount && selectedPool && isWhitelisted && (
      <div className="p-4 bg-purple-800/30 rounded-xl border border-purple-600/30">
        <h4 className="font-medium text-white mb-3">Transaction Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-purple-300">
              {activeTab === 'borrow' ? 'Borrow Amount:' : 'Repayment Amount:'}
            </span>
            <span className="text-white mono-numbers">{amount} {selectedToken}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-300">Annual Interest Rate:</span>
            <span className="text-white">{selectedPool.borrowAPR}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-300">Monthly Interest:</span>
            <span className="text-white mono-numbers">{calculateInterest()} {selectedToken}</span>
          </div>
          {activeTab === 'borrow' && (
            <div className="flex justify-between">
              <span className="text-purple-300">Estimated Due Date:</span>
              <span className="text-white">3 months</span>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Action Button */}
    <button 
      className={`w-full action-button ${!isWhitelisted ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={!isWhitelisted}
    >
      {activeTab === 'borrow' ? 'Borrow' : 'Repay'}
    </button>

    {!isWhitelisted && (
      <p className="text-sm text-red-400 text-center">
        Whitelist access is required for lending operations
      </p>
    )}
  </div>

  {/* Borrow History */}
  <div className="trading-card">
    <h3 className="text-xl font-bold text-white mb-6">Borrow History</h3>
    
    {userBorrowHistory.length > 0 ? (
      <div className="space-y-4">
        {userBorrowHistory.map((record) => (
          <div key={record.id} className="p-4 bg-purple-800/30 rounded-xl border border-purple-600/30">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-white">
                    {record.amount} {record.token}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    record.status === 'active' 
                      ? 'bg-green-600 text-green-100' 
                      : 'bg-gray-600 text-gray-100'
                  }`}>
                    {record.status === 'active' ? 'In Progress' : 'Completed'}
                  </span>
                </div>
                <div className="text-sm text-purple-300 mt-1">
                  Borrow Date: {record.borrowed}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white mono-numbers">
                  {record.interestRate}%
                </div>
                <div className="text-sm text-purple-300">APR</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-purple-300">Due Date</p>
                <p className="font-medium text-white">{record.dueDate}</p>
              </div>
              <div>
                <p className="text-purple-300">Accrued Interest</p>
                <p className="font-medium text-white mono-numbers">{record.accruedInterest} {record.token}</p>
              </div>
            </div>
            
            <button className="mt-3 w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              Repay Now
            </button>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <CreditCardIcon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <p className="text-purple-300">No borrowing records</p>
      </div>
    )}
  </div>
</div>
</div>
{/* Stats & Info */}
<div className="space-y-6">
  {/* User Credit Stats */}
  <div className="trading-card">
    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
      <ShieldCheckIcon className="w-5 h-5 text-green-400 mr-2" />
      Credit Status
    </h3>
    <div className="space-y-4">
      <StatCard
        title="Credit Score"
        value={creditScore}
        suffix="/1000"
        change="+5"
        changeType="positive"
        icon={ShieldCheckIcon}
      />
      <StatCard
        title="Total Borrowed"
        value="$127,500"
        icon={DollarSignIcon}
      />
      <StatCard
        title="Average Interest Rate"
        value="8.1%"
        icon={PercentIcon}
      />
    </div>
  </div>

  {/* Interest Accrual */}
  <div className="trading-card">
    <h3 className="text-lg font-bold text-white mb-4">Interest Details</h3>
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="text-purple-300">Daily Interest:</span>
        <span className="text-white mono-numbers">$29.17</span>
      </div>
      <div className="flex justify-between">
        <span className="text-purple-300">Monthly Interest:</span>
        <span className="text-white mono-numbers">$875.00</span>
      </div>
      <div className="flex justify-between">
        <span className="text-purple-300">Accrued Interest:</span>
        <span className="text-white mono-numbers">$1,104.92</span>
      </div>
      <div className="flex justify-between">
        <span className="text-purple-300">Next Payment Date:</span>
        <span className="text-white">2024-04-01</span>
      </div>
    </div>
  </div>

  {/* Lending Terms */}
  <div className="trading-card">
    <div className="flex items-start space-x-3">
      <ClockIcon className="w-5 h-5 text-blue-400 mt-0.5" />
      <div>
        <h4 className="font-medium text-white mb-2">Lending Terms</h4>
        <ul className="text-sm text-purple-300 space-y-1">
          <li>• No collateral required</li>
          <li>• Flexible repayment periods</li>
          <li>• Fixed annual interest rate</li>
          <li>• No penalty for early repayment</li>
        </ul>
      </div>
    </div>
  </div>

  {/* Risk Information */}
  <div className="trading-card">
    <div className="flex items-start space-x-3">
      <AlertTriangleIcon className="w-5 h-5 text-yellow-400 mt-0.5" />
      <div>
        <h4 className="font-medium text-white mb-2">Lending Risks</h4>
        <ul className="text-sm text-purple-300 space-y-1">
          <li>• Late payments will affect credit score</li>
          <li>• Interest rates may adjust based on market conditions</li>
          <li>• Requires maintaining a good credit history</li>
          <li>• Default may result in legal consequences</li>
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