import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full text-[0.8125rem] font-medium tracking-[0.04em] transition-all duration-500 ease-[var(--ease-lux)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-ink text-ivory hover:bg-emerald-deep shadow-[0_10px_30px_-12px_rgba(23,22,18,0.55)]",
        light: "bg-ivory text-ink hover:bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]",
        emerald: "bg-emerald text-ivory hover:bg-emerald-deep shadow-[0_12px_32px_-14px_rgba(28,58,49,0.8)]",
        outline: "border border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[0.03]",
        glass:
          "border border-ivory/30 bg-ivory/10 text-ivory backdrop-blur-md hover:bg-ivory/20 hover:border-ivory/50",
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
