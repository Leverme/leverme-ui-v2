import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { TOKENS } from '../../config/web3';

interface Token {
  symbol: string;
  name: string;
  logo: string;
  decimals: number;
}

interface TokenSelectorProps {
  selectedToken: string;
  onTokenChange: (tokenSymbol: string) => void;
  tokens?: string[];
  disabled?: boolean;
}

export function TokenSelector({ 
  selectedToken, 
  onTokenChange, 
  tokens = ['ETH', 'USDT', 'USDC', 'MON'],
  disabled = false 
}: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedTokenData = TOKENS[selectedToken as keyof typeof TOKENS];
  const availableTokens = tokens.map(symbol => TOKENS[symbol as keyof typeof TOKENS]);

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between p-3 skeu-input transition-all duration-200 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-500/50 cursor-pointer'
        }`}
      >
        <div className="flex items-center space-x-3">
          <img 
            src={selectedTokenData?.logo || '/images/tokens/default.png'} 
            alt={selectedTokenData?.symbol || 'Token'}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#8b5cf6"/>
                  <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">
                    ${selectedTokenData?.symbol?.charAt(0) || 'T'}
                  </text>
                </svg>
              `)}`;
            }}
          />
          <div className="text-left">
            <div className="font-semibold text-white">{selectedTokenData?.symbol}</div>
            <div className="text-xs text-purple-300">{selectedTokenData?.name}</div>
          </div>
        </div>
        {!disabled && <ChevronDownIcon className={`w-5 h-5 text-purple-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </button>

      {isOpen && !disabled && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 z-20 bg-gradient-to-br from-purple-800/95 to-purple-900/95 backdrop-blur-md border border-purple-600/50 rounded-xl shadow-skeu-lg max-h-60 overflow-y-auto custom-scrollbar">
            {availableTokens.map((token) => (
              <button
                key={token.symbol}
                onClick={() => {
                  onTokenChange(token.symbol);
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 hover:bg-purple-700/30 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl"
              >
                <img 
                  src={token.logo} 
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
                <div className="text-left">
                  <div className="font-semibold text-white">{token.symbol}</div>
                  <div className="text-xs text-purple-300">{token.name}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
