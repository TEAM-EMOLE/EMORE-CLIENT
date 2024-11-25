import React from 'react';

interface AuthInputComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  icon?: React.ReactNode;
}

const AuthInputComponent = React.forwardRef<HTMLInputElement, AuthInputComponentProps>(
  ({ label, error = false, icon, ...props }, ref) => {
    return (
      <div className="space-y-[8px] h-[92px]">
        <label className="font-SUIT text-14 font-medium leading-[19.6px] tracking-[-0.015em] text-left text-gray-800">
          {label}
        </label>
        <div className="relative w-full">
          <input
            ref={ref}
            className={`w-full h-[44px] px-2 py-2 border rounded-[12px] text-gray-800 focus:outline-none ${
              error ? 'border-error focus:border-error' : 'border-gray-200 focus:border-gray-500'
            } pr-10`}
            {...props}
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
