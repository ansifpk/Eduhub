import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '../ui/sidebar'

const AppSidebar = () => {
  return (
    <div className='min-h-[100vh]'>
       <Sidebar collapsible="icon">
      <SidebarHeader>
        users 
      </SidebarHeader>
      <SidebarContent>
        hi
        hi
        hi
      </SidebarContent>
     
      <SidebarRail />
    </Sidebar>
    </div>
  )
}

export default AppSidebar
