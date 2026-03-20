'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          'flex items-start gap-3 cursor-pointer group select-none',
          className
        )}
      >
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <div className="w-5 h-5 rounded-md border-2 border-gray-300 bg-white peer-checked:bg-brand peer-checked:border-brand transition-colors duration-150 flex items-center justify-center group-hover:border-brand">
            <svg
              className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 hidden"
              fill="none"
              viewBox="0 0 12 12"
            >
              <path
                d="M2 6l3 3 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {/* Visible checkmark when checked using sibling trick */}
          <svg
            className="absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 p-1 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-sm text-gray-600 leading-relaxed">{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
