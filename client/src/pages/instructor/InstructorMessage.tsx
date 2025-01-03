// import { Card, CardContent, CardHeader } from '@/Components/ui/card';
// import './InstructorHome.css';
// import InstructorAside from '../../Components/instructor/InstructorAside'
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// interface Course {
//     name: string;
//     registered: number;
//   }
//   interface User{
//     id:string;
//     name:string;
//     email:string;
//     isAdmin:boolean;
//     isInstructor:boolean;
//     isBlock:boolean;
//   }
//   interface Review {
//     name: string;
//     comment: string;
//     avatar: string;
//   }
  
// const InstructorHome = () => {
//     const courses: Course[] = [
//         { name: "HTML", registered: 80 },
//         { name: "React", registered: 70 },
//         { name: "Node.js", registered: 60 },
//       ];
//       const reviews: Review[] = [
//         { name: "Lina", comment: "Very good class, cover every parts", avatar: "/api/placeholder/32/32" },
//         { name: "John", comment: "Nice presentation", avatar: "/api/placeholder/32/32" },
//         { name: "Rocky", comment: "Good work", avatar: "/api/placeholder/32/32" },
//       ];
//       const userr = useSelector((state)=>state)
//     // console.log("user starte",userr);
//     const user = useSelector((state:User)=>state.name);
//     const navigate = useNavigate()
//   return (
//     <div className="container-fluid">
//     <div className="row">
//         <InstructorAside/>
//         <div className="col-md-10">
                  
//             <div className="welcome mt-4 mb-4">
//                 <h1>Welcome back, {user}</h1>
//                 <img src="https://via.placeholder.com/50" alt="Profile Picture" onClick={()=>navigate("/instructor/profile")} className="profile-pic" />
//             </div>

           
//             <div className="grid grid-cols-2 gap-8">
       
//             <Card>
//               <CardHeader>
//                 <h2 className="text-lg font-semibold">YOUR TOP 3 COURSES</h2>
//               </CardHeader>
//               <CardContent>
//                 {courses.map((course, index) => (
//                   <div key={index} className="mb-4 last:mb-0">
//                     <div className="font-medium">{course.name}</div>
//                     <div className="text-sm text-gray-500">{course.registered} Registed</div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>

      
//             <Card>
//               <CardHeader>
//                 <h2 className="text-lg font-semibold">Reviews</h2>
//               </CardHeader>
//               <CardContent>
//                 {reviews.map((review, index) => (
//                   <div key={index} className="flex items-center gap-3 mb-4 last:mb-0">
//                     <img 
//                       src={review.avatar} 
//                       alt={review.name} 
//                       className="w-8 h-8 rounded-full"
//                     />
//                     <div>
//                       <div className="font-medium">{review.name}</div>
//                       <div className="text-sm text-gray-500">{review.comment}</div>
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//     </div>
// </div>
//   )
// }

// export default InstructorHome




// import SettingsProfilePage from "./profileHead"
// import { SidebarNav } from "./sideBar"
// import { Separator } from "./ui/separator"

import { IChat } from "@/@types/chatType"
import { IMessage } from "@/@types/messageType"
import { User } from "@/@types/userType"
import InstructorAside from "@/Components/instructor/InstructorAside"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Separator } from "@/Components/ui/separator"
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"
import { MoreVertical, Send } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { io, Socket } from "socket.io-client"
import {DefaultEventsMap} from '@socket.io/component-emitter';
import moment from "moment"
import toast from "react-hot-toast"
import { getInstructorCurrentChat, getInstructorMessages, instructorChats, instructorSendMessage } from "@/Api/instructor"



export default function InstructorMessage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  const userId = useSelector((state: User) => state.id);
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const [currentChat, setCurrentChat] = useState<IChat>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<{userId:string,socketId:string}[]>([]);
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | undefined>();
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
    // Function to scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };
    
      // Auto-scroll when messages change
      useEffect(() => {
        scrollToBottom();
      }, [messages]);
 
   //!websocket
  //* initialise socket
  useEffect(()=>{
    const newSocket = io("http://localhost:4000")
    setSocket(newSocket!)
    return ()=>{
      newSocket.disconnect();
    }
  },[userId])
  
  //* add user

  useEffect(()=>{
    if(!socket) return;
    socket.emit("addNewUser",userId)
    socket.on("getOnlineUsers",(res)=>{
      setOnlineUsers(res)
    })
  },[socket])
    


  //* send message
   
  useEffect(()=>{
    if(!socket) return;
    const recipientId = currentChat?.members.find((value)=>value._id !== userId)
    socket.emit("sendMessage",{text:newMessage,recipientId:recipientId?._id})
   
  },[newMessage])

  //* recieve message
   
  useEffect(()=>{
    if(!socket) return;

    socket.on("getMessage",(message)=>{
      console.log(message,"ivade");
      
         if(userId !== message.recipientId) return;
         console.log("hi");
         setMessages((prev)=>[...prev,message])
    })

    return ()=>{
      socket.off("getMessage")
    }
   
  },[socket,currentChat])


  //*initial calls

  useEffect(() => {
    const getUserChats = async () => {
      const response = await instructorChats(userId);
      console.log(response,"caht respos");
      if (response.success) {
        setChats(response.chats);
      }
    };
    getUserChats();
  }, [userId]);

  useEffect(() => {
    if (chatId) {
      const fetchmessages = async () => {
        const currentCht = await getInstructorCurrentChat(chatId);
        if (currentCht.success) {
          setCurrentChat(currentCht.chat);
        } else {
          return toast.error(currentCht.response.data.message);
        }
        const response = await getInstructorMessages(chatId);
        if (response.success) {
          
          setMessages(response.messages)
        }
      };
      fetchmessages();
    }
  }, [chatId]);

  const handletext = async () => {   
    const response = await instructorSendMessage(currentChat?._id!, userId, text);
    if(response.success){
       setNewMessage(response.message.text)
       setMessages((prev)=>[...prev,response.message])
       setText("")
    }else{
      return toast.error(response.response.data.message);
    }
  };

  return (
    <div className="bg-black">
     
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-white text-2xl font-bold tracking-tight">Edu Hub</h2>
          <p className="text-muted-foreground">
            Manage your instructor account students and courses.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <InstructorAside  />
          <div className="flex justify-center">
        <div className="bg-white mx-5 my-4 flex  w-[950px] rounded-2">
          <div className="border borer-danger bg-success-400  m-2  rounded-2">
            <div className="flex items-center justify-between w-[330px]">
            <h3 className="m-3 text-sm font-medium text-white leading-none">
              Messages
            </h3>
            <div className="flex">
              <Input className="bg-white"  placeholder="serch"  />
            </div>
            </div>
            <ScrollArea className="h-[450px] w-[330px] rounded-md border bg-white p-2">
              {chats.length > 0 ? (
                chats.filter((value:IChat)=>value.role == "userToInstructor")
                .map((chat: IChat, index:number) => (
                  <div key={index}>
                    <div className="flex space-x-3 m-2">
                      <Avatar className={`border-3 ${ onlineUsers.some((value) => value.userId == chat.members.find((member) => member._id !== userId)?._id)&&"border-3 border-success-400"}  cursor-pointer`}>
                        <AvatarImage
                          src={
                            chat.members.find((member) => member._id !== userId)?.avatar.avatar_url ||
                            "https://github.com/shadcn.png"
                          }
                          alt="@shadcn"
                        />
                      </Avatar>
                      <div
                        onClick={() => {
                          searchParams.set("chatId", chat._id);
                          setSearchParams(searchParams);
                        }}
                        className="grid flex-1 text-left text-sm leading-tight cursor-pointer"
                      >
                        <span className="truncate font-semibold">
                          {chat.members.find((member) => member._id !== userId)?.name}
                        </span>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center">
                  <p>No chats started...</p>
                </div>
              )}
            </ScrollArea>
          </div>
          <div className="w-full m-2 border bg-success-50 rounded-2">
            <header className="flex  items-center text-white bg-success-400 rounded-2 h-[50px]">
              {currentChat && (
                <div  className="flex w-full items-center justify-between mx-3">
                  <div className="flex items-center space-x-3 m-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={
                          currentChat.members.find((member) => member._id !== userId)?.avatar.avatar_url ||
                          "https://github.com/shadcn.png"
                        }
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
                      <span className="truncate font-semibold">
                      {currentChat.members.find((member) => member._id !== userId)?.name}
                      </span>
                    </div>
                  </div>
                  <MoreVertical className="cursor-pointer" />
                </div>
              )}
            </header>
            <div   className="flex flex-col justify-between m-2 h-[430px]">
                 <ScrollArea>
                {chatId && messages.length > 0 ? (
                  <>
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex p-[0.75rem] w-[250px] border rounded shadow-md ${
                          msg.senderId == userId
                            ? "bg-success-200 ml-auto" 
                            : "bg-white items-start"
                        }`}
                      >
                        <div className="leading-none overflow-hidden break-words w-full">
                          <span className="flex justify-start">{msg.text}</span>
                          <div className={`flex text-xs text-gray-500 justify-end`}>
                            {moment(msg.createdAt).calendar()}
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* Add invisible div for scrolling reference */}
                    <div ref={messagesEndRef} />
                  </>
                ) : chatId ? (
                  <div className="flex justify-center">
                    No messages sent yet
                  </div>
                ) : (
                  <div className="flex justify-center">
                    No conversation selected
                  </div>
                )}
              </ScrollArea>
              <div className="flex items-center gap-2 ">
                <InputEmoji
                  placeholder="Type a Messsage"
                  placeholderColor="black"
                  value={text}
                  onChange={(e) => {
                    let value = e == "</br>" ? "" : e;
                    setText(value);
                  }}
                  shouldReturn={true}
                  shouldConvertEmojiToImage={false}
                />
                {text.length > 0 && (
                  <Send className="cursor-pointer" onClick={handletext} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}