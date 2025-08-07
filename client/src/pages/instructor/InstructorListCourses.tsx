
import { Coursestable } from "../../components/instructor/CourseTable";
import InstructorAside from "../../components/instructor/InstructorAside"
import { Separator } from "../../components/ui/separator"



export default function InstructorListCourses() {

 
  return (
    <div className="bg-black h-screen">
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
          <div className="flex-1  lg:max-w-full md:max-w-full">
            <div >
              <Coursestable  />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}