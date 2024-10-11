import React from 'react';

interface AuthInputComponentProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

const AuthInputComponent: React.FC<AuthInputComponentProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}) => {
  return (
    <div className="space-y-[8px] h-[92px]">
      <label className="space-y-[8px] font-[SUIT] text-14 font-medium leading-[19.6px] tracking-[-0.015em] text-left text-Gray-800">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[44px] px-2 py-2 border border-Gray-200 rounded-[10px] text-Gray-800 focus:outline-none focus:border-Gray-500"
      />
    </div>
  );
};

export default AuthInputComponent;
