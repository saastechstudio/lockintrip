import * as React from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-2xl border border-ink/12 bg-white/70 px-4 text-[0.9375rem] text-ink placeholder:text-stone transition-colors duration-300 outline-none focus:border-emerald focus:bg-white focus:ring-4 focus:ring-emerald/10 aria-[invalid=true]:border-red-700/60";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(fieldBase, "h-12", className)} {...props} />,
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(fieldBase, "min-h-36 resize-y py-3.5 leading-relaxed", className)} {...props} />
  ),
);
Textarea.displayName = "Textarea";

const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select ref={ref} className={cn(fieldBase, "h-12 appearance-none bg-[length:12px] pr-10", className)} {...props} />
  ),
);
Select.displayName = "Select";

export { Input, Textarea, Select, fieldBase };
