import * as React from "react";
import { PiEyeSlash, PiEye } from "react-icons/pi";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative w-full">
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={cn(
            "flex h-10 w-full rounded-md border-[0.7px] dark:border-[#ffffff] border-black bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium dark:placeholder:text-white placeholder:text-black focus:outline-none",
            className
          )}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button 
            className="absolute right-3 top-[50%] -translate-y-1/2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <PiEyeSlash size={18} /> : <PiEye size={18} />}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
