"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

interface ComboboxProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  label?: string
}

export function Combobox({
  value,
  onChange,
  options,
  placeholder = "Select option...",
  label
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative w-full">
      {label && (
        <label className="text-sm font-medium mb-1.5 block text-foreground">
          {label}
        </label>
      )}
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            className="w-full flex items-center justify-between rounded-lg border border-border/40 bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            aria-expanded={open}
          >
            <span className="truncate">
              {options.find(option => option.value === value)?.label || placeholder}
            </span>
            <ChevronDown
              className={`ml-2 h-4 w-4 shrink-0 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            className="relative z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-card/95 backdrop-blur-sm p-1 text-card-foreground shadow-lg animate-in fade-in-0 zoom-in-95 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
            align="start"
            sideOffset={4}
          >
            <div className="max-h-72 overflow-y-auto">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors ${
                    option.value === value 
                      ? "bg-accent text-accent-foreground" 
                      : "hover:bg-accent/80 hover:text-accent-foreground"
                  }`}
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                >
                  <span className="flex-1">{option.label}</span>
                  {option.value === value && (
                    <Check className="ml-2 h-4 w-4 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  )
}
