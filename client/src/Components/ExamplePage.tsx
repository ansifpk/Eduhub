
import SettingsProfilePage from "./profileHead"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
// import { SidebarNav } from "./CourseTable"
import { Separator } from "./ui/separator"



const sidebarNavItems = [
  {
    title: "Profile",
    href: "/example",
  },
  {
    title: "Account",
    href: "/instructor",
  },
  {
    title: "Appearance",
    href: "/examples/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "Display",
    href: "/examples/forms/display",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function ExamplePage() {
  return (
    <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  )
}