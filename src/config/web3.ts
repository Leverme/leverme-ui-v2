import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, arbitrum } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Leverme Protocol',
  projectId: 'YOUR_PROJECT_ID', // 获取自 WalletConnect Cloud
  chains: [mainnet, sepolia, arbitrum],
  ssr: false, // 如果您的 dApp 不使用服务器端渲染 (SSR)
});

// 智能合约地址配置
export const CONTRACT_ADDRESSES = {
  // 主网合约地址
  mainnet: {
    LEVERAGE_TRADING: '0x1234567890123456789012345678901234567890',
    VAULT: '0x1234567890123456789012345678901234567890',
    UNISWAP_V2_ROUTER: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    TOKENS: {
      USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      USDC: '0xA0b86a33E6441c8b7e56b93c2Ae3b80C4dd59c8F',
      MON: '0x1234567890123456789012345678901234567890', // MON 代币地址
    }
  },
  // 测试网合约地址  
  sepolia: {
    LEVERAGE_TRADING: '0x1234567890123456789012345678901234567890',
    VAULT: '0x1234567890123456789012345678901234567890',
    UNISWAP_V2_ROUTER: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    TOKENS: {
      USDT: '0x1234567890123456789012345678901234567890',
      USDC: '0x1234567890123456789012345678901234567890',
      MON: '0x1234567890123456789012345678901234567890',
    }
  }
};

// 代币信息配置
export const TOKENS = {
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    logo: '/images/tokens/eth.png'
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    logo: '/images/tokens/usdt.png'
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    logo: '/images/tokens/usdc.png'
  },
  MON: {
    symbol: 'MON',
    name: 'MON Token',
    decimals: 18,
    logo: '/images/tokens/mon.png'
  }
};

// ABI 配置
export const LEVERAGE_TRADING_ABI = [
  // LeverageTrading 合约 ABI
  'function openPosition(address collateralToken, uint256 collateralAmount, address targetToken, uint256 leverage) external',
  'function closePosition(uint256 positionId) external',
  'function getUserPositions(address user) external view returns (tuple(uint256 id, address collateralToken, uint256 collateralAmount, address targetToken, uint256 targetAmount, uint256 leverage, uint256 borrowedAmount, bool isOpen)[])',
  'function getPositionPnL(uint256 positionId) external view returns (int256)',
];

export const VAULT_ABI = [
  // Vault 合约 ABI
  'function deposit(address token, uint256 amount) external',
  'function withdraw(address token, uint256 amount) external',
  'function borrow(address token, uint256 amount) external',
  'function repay(address token, uint256 amount) external',
  'function getUserBalance(address user, address token) external view returns (uint256)',
  'function getUserBorrow(address user, address token) external view returns (uint256)',
  'function getTotalSupply(address token) external view returns (uint256)',
  'function getUtilizationRate(address token) external view returns (uint256)',
  'function getAPY(address token) external view returns (uint256)',
];

export const ERC20_ABI = [
  'function balanceOf(address owner) external view returns (uint256)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function transfer(address to, uint256 amount) external returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) external returns (bool)',
  'function decimals() external view returns (uint8)',
  'function symbol() external view returns (string)',
  'function name() external view returns (string)',
];
