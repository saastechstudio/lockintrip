import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-[14px] text-[0.8125rem] font-medium tracking-[0.05em] transition-all duration-500 ease-[var(--ease-lux)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-bordeaux text-ivory shadow-[0_1px_2px_rgba(29,29,29,0.08)] hover:bg-bordeaux-light hover:shadow-[0_10px_24px_-14px_rgba(107,31,43,0.55)]",
        light:
          "bg-ivory text-ink shadow-[0_1px_2px_rgba(29,29,29,0.08)] hover:bg-white hover:shadow-[0_10px_24px_-14px_rgba(0,0,0,0.4)]",
        outline: "border border-concrete/60 bg-transparent text-ink hover:border-ink/40 hover:bg-ink/[0.025]",
        glass: "border border-ivory/35 bg-ivory/[0.06] text-ivory backdrop-blur-md hover:border-ivory/60 hover:bg-ivory/15",
        link: "rounded-none px-0 text-ink underline-offset-8 hover:underline",
      },
      size: {
        sm: "h-10 px-5",
        md: "h-12 px-7",
        lg: "h-14 px-9 text-[0.875rem]",
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
