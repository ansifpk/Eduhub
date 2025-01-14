import InstructorAside from '@/Components/instructor/InstructorAside'
import { SubscriptionTable } from '@/Components/instructor/SubscriptionTable'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { Separator } from '@/Components/ui/separator'
import React from 'react'

const InstructorSubscriptions = () => {
  return (
    <div className="bg-black ">
    <div className="md:hidden">
      <img
        src="/examples/forms-light.png"
        width={1280}
        height={791}
        alt="Forms"
        className="block dark:hidden"
      />
      <img
        src="/examples/forms-dark.png"
        width={1280}
        height={791}
        alt="Forms"
        className="hidden dark:block"
      />
    </div>
    <div className="hidden space-y-6 p-10 pb-16 md:block">
    <div className="flex items-center justify-between space-y-2">
        <div className="space-y-0.5">
          <h2 className="text-white text-2xl font-bold tracking-tight">
            Edu Hub
          </h2>
          <p className="text-muted-foreground">
            Manage your instructor account students and courses.
          </p>
        </div>
        <div>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/03.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row  lg:space-y-0">
            <InstructorAside  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
            <Separator  orientation="vertical"  />
        <div className="flex-1 lg:max-w-full md:max-w-full">
          <div className="space-y-6">
            <SubscriptionTable  />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default InstructorSubscriptions
