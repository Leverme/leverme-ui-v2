import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  iconColor?: string;
  suffix?: string;
  prefix?: string;
  description?: string;
  children?: ReactNode;
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'text-purple-400',
  suffix,
  prefix,
  description,
  children,
}: StatCardProps) {
  const changeColors = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-purple-300',
  };

  return (
    <div className="stat-card group">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-purple-300">{title}</h3>
        {Icon && <Icon className={`w-5 h-5 ${iconColor}`} />}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline space-x-1">
          {prefix && <span className="text-lg text-purple-200">{prefix}</span>}
          <span className="text-2xl font-bold text-white mono-numbers">
            {value}
          </span>
          {suffix && <span className="text-lg text-purple-200">{suffix}</span>}
        </div>
        
        {change && (
          <div className={`text-sm ${changeColors[changeType]} flex items-center space-x-1`}>
            <span>{change}</span>
          </div>
        )}
        
        {description && (
          <p className="text-xs text-purple-400">{description}</p>
        )}
        
        {children}
      </div>
    </div>
  );
}
