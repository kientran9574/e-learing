/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex outline-none h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary transition-all dark:bg-grayDarker disabled:bg-slate-300 disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
