import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import ProfileNavbar from "@/Components/Header/ProfileNavbar";
import { Avatar,  AvatarImage } from "@/Components/ui/avatar";
import { Input } from "@/Components/ui/input";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Separator } from "@/Components/ui/separator";
import { Send } from "lucide-react";

const Message = () => {
  return (
    <div className="bg-blue-100">
      <Header />
      <ProfileNavbar />
      <div className="flex justify-center">
        <div className="bg-white mx-5 my-4 flex  w-[900px] rounded-2">
          <div className="border borer-danger m-2 w-[300px] rounded-2">
            <h4 className="m-3 text-sm font-medium leading-none  ">Messages</h4>
            <ScrollArea className="h-[450px] w-[300px] rounded-md border p-2">
              <div className="flex space-x-3 m-2">
                <Avatar className="border-3 border-green-500 cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
                  <span className="truncate font-semibold">{"user.name"}</span>
                  <span className="truncate text-xs">{"user.email"}</span>
                </div>
              </div>
              <Separator />
              <div className="flex space-x-3 m-2">
                <Avatar className="border-3 border-green-500 cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
                  <span className="truncate font-semibold">{"user.name"}</span>
                  <span className="truncate text-xs">{"user.email"}</span>
                </div>
              </div>
              <Separator />
              <div className="flex space-x-3 m-2">
                <Avatar className="border-3 border-green-500 cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
                  <span className="truncate font-semibold">{"user.name"}</span>
                  <span className="truncate text-xs">{"user.email"}</span>
                </div>
              </div>
              <Separator />
              <div className="flex space-x-3 m-2">
                <Avatar className="border-3 border-green-500 cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
                  <span className="truncate font-semibold">{"user.name"}</span>
                  <span className="truncate text-xs">{"user.email"}</span>
                </div>
              </div>
              <Separator />
              <div className="flex space-x-3 m-2">
                <Avatar className="border-3 border-green-500 cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
                  <span className="truncate font-semibold">{"user.name"}</span>
                  <span className="truncate text-xs">{"user.email"}</span>
                </div>
              </div>
              <Separator />
              <div className="flex space-x-3 m-2">
                <Avatar className="border-3 border-green-500 cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
                  <span className="truncate font-semibold">{"user.name"}</span>
                  <span className="truncate text-xs">{"user.email"}</span>
                </div>
              </div>
              <Separator />
              <div className="flex space-x-3 m-2">
                <Avatar className="border-3 border-green-500 cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
                  <span className="truncate font-semibold">{"user.name"}</span>
                  <span className="truncate text-xs">{"user.email"}</span>
                </div>
              </div>
              <Separator />
              <div className="flex space-x-3 m-2">
                <Avatar className="border-3 border-green-500 cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
                  <span className="truncate font-semibold">{"user.name"}</span>
                  <span className="truncate text-xs">{"user.email"}</span>
                </div>
              </div>
              <Separator />
              <div className="flex space-x-3 m-2">
                <Avatar className="border-3 border-green-500 cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
                  <span className="truncate font-semibold">{"user.name"}</span>
                  <span className="truncate text-xs">{"user.email"}</span>
                </div>
              </div>
              <Separator />
            </ScrollArea>
          </div>
          <div className="w-full m-2 border rounded-2">
           
              <header className="flex justify-center items-center text-white bg-dark rounded-2 h-[50px]">
                messages
              </header>
              <div className="flex flex-col justify-between m-2 h-[430px]">
              <ScrollArea>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    <div >
                        hi
                    </div>
                    </ScrollArea>
                   <div className="flex items-center gap-2 ">
                   <Input className="rounded-5" placeholder="Type your message..." />
                   <Send/>
                   </div>
                </div>
           
          </div>
        </div>
      </div>
      {/* <main className="w-full my-3 mx-5 bg-white flex gap-10 ">
      <div className='bg-danger'>
        hi
      </div>
    </main> */}
      <Footer />
    </div>
    // <div>
    //    <SidebarProvider>
    //   <AppSidebar />
    //   <SidebarInset>
    //     <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
    //       <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    //     </div>
    //   </SidebarInset>
    // </SidebarProvider>
    // </div>
  );
};

export default Message;
