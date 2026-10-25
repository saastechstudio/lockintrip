"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b border-ink/10", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-start justify-between gap-6 py-6 text-left text-[1.0625rem] leading-snug text-ink transition-colors hover:text-emerald md:text-lg",
        className,
      )}
      {...props}
    >
      {children}
      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-ink/15 transition-all duration-500 group-hover:border-emerald/50 group-data-[state=open]:rotate-45 group-data-[state=open]:border-emerald group-data-[state=open]:bg-emerald group-data-[state=open]:text-ivory">
        <Plus className="size-3.5" strokeWidth={1.5} />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-[acc-up_300ms_var(--ease-lux)] data-[state=open]:animate-[acc-down_400ms_var(--ease-lux)]"
    {...props}
  >
    <div className={cn("max-w-2xl pb-7 pr-12 text-[0.9375rem] leading-relaxed text-muted", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
