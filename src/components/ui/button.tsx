import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-[12px] text-[0.875rem] font-medium transition-[background-color,border-color,color,transform] duration-150 ease-[var(--ease-lux)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-bordeaux text-ivory hover:bg-bordeaux-light",
        light:
          "bg-ivory text-ink hover:bg-white",
        outline: "border border-concrete/60 bg-transparent text-ink hover:border-ink/40 hover:bg-ink/[0.025]",
        glass: "border border-ivory/25 bg-transparent text-ivory hover:border-ivory/50 hover:bg-ivory/[0.06]",
        link: "rounded-none px-0 text-ink underline-offset-8 hover:underline",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-6 text-[0.9375rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
