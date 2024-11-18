import React, { forwardRef } from 'react';

interface AuthInputComponentProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  icon?: React.ReactNode;
  error?: boolean;
  name?: string;
}

const AuthInputComponent = forwardRef<HTMLInputElement, AuthInputComponentProps>(
  (
    {
      label,
      placeholder,
      type = 'text',
      value,
      onChange,
      onFocus,
      onBlur,
      icon,
      error = false,
      name,
      className,
    },
    ref
  ) => {
    return (
      <div className="space-y-[8px] h-[92px]">
        <label
          htmlFor={name}
          className="font-SUIT text-14 font-medium leading-[19.6px] tracking-[-0.015em] text-left text-gray-800"
        >
          {label}
        </label>
        <div className="relative w-full">
          <input
            ref={ref}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`w-full h-[44px] px-2 py-2 border ${
              error ? 'border-error' : 'border-gray-200'
            } rounded-[12px] text-gray-800 focus:outline-none focus:border-gray-500 pr-10 ${className}`}
            aria-invalid={error ? 'true' : 'false'}
          />
          {icon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

AuthInputComponent.displayName = 'AuthInputComponent';

export default AuthInputComponent;
