import { Check } from 'lucide-react';
import React from 'react';

type BadgeProps = {
  text: string;
  subtext?: string;
  icon?: React.ReactNode;
  className?: string;
};

const InfoBadge: React.FC<BadgeProps> = ({
  text,
  subtext,
  icon,
  className = '',
}) => {
  return (
    <div
      className={`flex items-center gap-2 rounded-full bg-white px-2 py-1 shadow-sm ${className}`}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
        {icon || <Check className="h-4 w-4 text-blue-600" />}
      </div>

      <div className="flex flex-col leading-tight">
        <span className="text-left text-sm font-semibold text-blue-600">{text}</span>
        {subtext && (
          <span className="text-sm text-gray-500">{subtext}</span>
        )}
      </div>
    </div>
  );
};

export default InfoBadge;
