import { useState } from 'react';
import { 
  FilterIcon, 
  DownloadIcon, 
  ExternalLinkIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  BanknoteIcon,
  CreditCardIcon,
  ArrowLeftRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PercentIcon
} from 'lucide-react';

export function History() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState('30d');

  const filters = [
    { id: 'all', label: 'All', icon: FilterIcon },
    { id: 'leverage', label: 'Leverage', icon: TrendingUpIcon },
    { id: 'liquidity', label: 'Liquidity', icon: BanknoteIcon },
    { id: 'lending', label: 'Lending', icon: CreditCardIcon },
    { id: 'swap', label: 'Swap', icon: ArrowLeftRightIcon },
  ];

  const transactions = [
    {
      id: 'tx001',
      type: 'leverage',
      action: 'open',
      tokens: 'ETH → USDT',
      amount: '2.5 ETH',
      leverage: '3x',
      pnl: '+$1,250.50',
      pnlPercent: '+15.2%',
      isProfit: true,
      timestamp: '2024-01-15 14:30:25',
      txHash: '0x1234...5678',
      status: 'completed'
    },
    {
      id: 'tx002',
      type: 'liquidity',
      action: 'stake',
      tokens: 'USDT',
      amount: '5,000 USDT',
      leverage: '-',
      pnl: '+$125.50',
      pnlPercent: '+2.5%',
      isProfit: true,
      timestamp: '2024-01-14 09:15:42',
      txHash: '0xabcd...efgh',
      status: 'completed'
    },
    {
      id: 'tx003',
      type: 'leverage',
      action: 'close',
      tokens: 'USDC → MON',
      amount: '10,000 USDC',
      leverage: '5x',
      pnl: '-$320.75',
      pnlPercent: '-3.2%',
      isProfit: false,
      timestamp: '2024-01-13 16:45:18',
      txHash: '0x9876...5432',
      status: 'completed'
    },
    {
      id: 'tx004',
      type: 'lending',
      action: 'borrow',
      tokens: 'USDT',
      amount: '25,000 USDT',
      leverage: '-',
      pnl: '-$208.33',
      pnlPercent: '-0.83%',
      isProfit: false,
      timestamp: '2024-01-12 11:20:05',
      txHash: '0x5555...7777',
      status: 'completed'
    },
    {
      id: 'tx005',
      type: 'swap',
      action: 'swap',
      tokens: 'ETH → USDC',
      amount: '1.0 ETH',
      leverage: '-',
      pnl: '+$0.00',
      pnlPercent: '0%',
      isProfit: true,
      timestamp: '2024-01-11 08:30:15',
      txHash: '0x3333...9999',
      status: 'completed'
    },
    {
      id: 'tx006',
      type: 'liquidity',
      action: 'take',
      tokens: 'USDC',
      amount: '2,500 USDC',
      leverage: '-',
      pnl: '+$62.50',
      pnlPercent: '+2.5%',
      isProfit: true,
      timestamp: '2024-01-10 13:45:32',
      txHash: '0x1111...2222',
      status: 'completed'
    },
    {
      id: 'tx007',
      type: 'lending',
      action: 'repay',
      tokens: 'USDT',
      amount: '15,000 USDT',
      leverage: '-',
      pnl: '-$125.00',
      pnlPercent: '-0.83%',
      isProfit: false,
      timestamp: '2024-01-09 10:15:48',
      txHash: '0x4444...6666',
      status: 'completed'
    },
    {
      id: 'tx008',
      type: 'leverage',
      action: 'open',
      tokens: 'ETH → MON',
      amount: '1.5 ETH',
      leverage: '2x',
      pnl: '+$890.25',
      pnlPercent: '+29.7%',
      isProfit: true,
      timestamp: '2024-01-08 15:22:17',
      txHash: '0x8888...aaaa',
      status: 'completed'
    }
  ];

  const filteredTransactions = activeFilter === 'all' 
    ? transactions 
    : transactions.filter(tx => tx.type === activeFilter);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'leverage': return TrendingUpIcon;
      case 'liquidity': return BanknoteIcon;
      case 'lending': return CreditCardIcon;
      case 'swap': return ArrowLeftRightIcon;
      default: return FilterIcon;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'leverage': return 'text-purple-400';
      case 'liquidity': return 'text-blue-400';
      case 'lending': return 'text-green-400';
      case 'swap': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'open':
      case 'stake':
      case 'borrow': return 'text-green-400';
      case 'close':
      case 'take':
      case 'repay': return 'text-red-400';
      case 'swap': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };
return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Transaction History</h1>
          <p className="text-purple-300">View all your transaction records on Leverme Protocol</p>
        </div>

        {/* Filters */}
        <div className="trading-card mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Type Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeFilter === filter.id
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-purple-800/50 text-purple-300 hover:bg-purple-700/50'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium">{filter.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Date Range & Export */}
            <div className="flex items-center space-x-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="skeu-input text-white text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last 1 year</option>
                <option value="all">All time</option>
              </select>

              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                <DownloadIcon size={16} />
                <span className="text-sm">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">Total Transactions</p>
                <p className="text-2xl font-bold text-white mono-numbers">{filteredTransactions.length}</p>
              </div>
              <FilterIcon className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">Total P&L</p>
                <p className="text-2xl font-bold text-green-400 mono-numbers">+$1,847.67</p>
              </div>
              <TrendingUpIcon className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">Success Rate</p>
                <p className="text-2xl font-bold text-white">75%</p>
              </div>
              <TrendingUpIcon className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">Average Return</p>
                <p className="text-2xl font-bold text-white mono-numbers">+5.2%</p>
              </div>
              <PercentIcon className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="trading-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-700/50">
                  <th className="text-left py-4 px-4 text-sm font-medium text-purple-300">Type</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-purple-300">Action</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-purple-300">Tokens</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-purple-300">Amount</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-purple-300">Leverage</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-purple-300">P&L</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-purple-300">Time</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-purple-300">Transaction Hash</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((tx) => {
                  const TypeIcon = getTypeIcon(tx.type);
                  return (
                    <tr key={tx.id} className="border-b border-purple-800/30 hover:bg-purple-800/20 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <TypeIcon className={`w-4 h-4 ${getTypeColor(tx.type)}`} />
                          <span className="text-sm text-white capitalize">
                            {tx.type === 'leverage' ? 'Leverage' : 
                             tx.type === 'liquidity' ? 'Liquidity' :
                             tx.type === 'lending' ? 'Lending' : 'Swap'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-sm font-medium ${getActionColor(tx.action)}`}>
                          {tx.action}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-white">{tx.tokens}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-white mono-numbers">{tx.amount}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-sm ${tx.leverage !== '-' ? 'text-purple-400' : 'text-gray-500'}`}>
                          {tx.leverage}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-right">
                          <div className={`text-sm font-medium ${tx.isProfit ? 'text-green-400' : 'text-red-400'} mono-numbers`}>
                            {tx.pnl}
                          </div>
                          <div className={`text-xs ${tx.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                            {tx.pnlPercent}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-purple-300">
                          <div>{tx.timestamp.split(' ')[0]}</div>
                          <div className="text-xs">{tx.timestamp.split(' ')[1]}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <button className="flex items-center space-x-1 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                          <span className="mono-numbers">{tx.txHash}</span>
                          <ExternalLinkIcon size={12} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-purple-700/50">
              <div className="text-sm text-purple-300">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} records
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-2 bg-purple-800/50 text-purple-300 rounded-lg hover:bg-purple-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeftIcon size={16} />
                  <span className="ml-1">Previous</span>
                </button>

                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        page === currentPage
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-800/50 text-purple-300 hover:bg-purple-700/50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-3 py-2 bg-purple-800/50 text-purple-300 rounded-lg hover:bg-purple-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="mr-1">Next</span>
                  <ChevronRightIcon size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
