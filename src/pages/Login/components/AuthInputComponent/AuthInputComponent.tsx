import React from 'react';

interface AuthInputComponentProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  onFocus?: () => void;
  icon?: React.ReactNode;
}

const AuthInputComponent: React.FC<AuthInputComponentProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  onFocus,
  icon,
}) => {
  return (
    <div className="space-y-[8px] h-[92px]">
      <label className="font-[SUIT] text-14 font-medium leading-[19.6px] tracking-[-0.015em] text-left text-Gray-800">
        {label}
      </label>

      <div className="relative w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          className="w-full h-[44px] px-2 py-2 border border-Gray-200 rounded-[12px] text-Gray-800 focus:outline-none focus:border-Gray-500 pr-10"
        />
        {icon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthInputComponent;
