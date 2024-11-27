"use client"

// import Link from "next/link"
import { NavLink } from "react-router-dom"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea,ScrollBar } from "./ui/scroll-area"

const examples = [
  {
    name: "Examples",
    href: "/examples/cards",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/mail",
  },
  {
    name: "Mail",
    href: "/examples/mail",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/mail",
  },
  {
    name: "Dashboard",
    href: "/examples/dashboard",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/dashboard",
  },
  {
    name: "Tasks",
    href: "/examples/tasks",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/tasks",
  },
  {
    name: "Playground",
    href: "/examples/playground",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/playground",
  },
  {
    name: "Forms",
    href: "/examples/forms",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/forms",
  },
  {
    name: "Music",
    href: "/examples/music",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/music",
  },
  {
    name: "Authentication",
    href: "/examples/authentication",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/authentication",
  },
]

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function ExamplesNav({ className, ...props }: ExamplesNavProps) {


  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {examples.map((example) => (
            <NavLink
              to={example.href}
              key={example.href}
              className={(isActive)=>cn(
                "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                 isActive
                  ? "bg-muted font-medium text-primary"
                  : "text-muted-foreground"
              )}
            >
              {example.name}
            </NavLink>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}