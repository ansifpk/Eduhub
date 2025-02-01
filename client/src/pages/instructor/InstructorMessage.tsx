import { IChat } from "@/@types/chatType"
import { IMessage } from "@/@types/messageType"
import { User } from "@/@types/userType"
import InstructorAside from "@/Components/instructor/InstructorAside"
import { Avatar,  AvatarImage } from "@/Components/ui/avatar"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Separator } from "@/Components/ui/separator"
import { MoreVertical, Send } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { io, Socket } from "socket.io-client"
import {DefaultEventsMap} from '@socket.io/component-emitter';
import moment from "moment"
import toast from "react-hot-toast"
import { getInstructorCurrentChat, getInstructorMessages, getNotifications, instructorChats, instructorSendMessage, markAsReadNotification, sendNotification } from "@/Api/instructor"
import { INotification } from "@/@types/notificationType"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import { logout } from "@/Api/user"
import { useDispatch } from "react-redux"
import { removeUser } from "@/redux/authSlice"



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
  const [notifications, setNotifications] = useState<INotification[]>([]);
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
    const newSocket = io("https://www.eduhublearning.online")
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
    socket.emit("sendMessage",{text:newMessage,recipientId:recipientId?._id,senderId:userId})
   
  },[newMessage])

  //* recieve message
   
  useEffect(()=>{
    if(!socket) return;

    socket.on("getMessage",(message)=>{
      const chatUser = currentChat?.members.find(
        (value) => value._id !== userId
      );
         if(chatUser?._id !== message.senderId) return;
         setMessages((prev)=>[...prev,message])
         console.log("chatUser",chatUser,"getMessage",message);
         
    })

    socket.on("getMessageNotification", (res) => {
      const isChatOpen = currentChat?.members.find(
        (value) => value._id !== res.recipientId
      );
      toast.success(`You got a new message`)
      if (isChatOpen?._id == res.senderId) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
        markAsRead(res.senderId)
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    });

    return ()=>{
      socket.off("getMessage")
      socket.off("getMessageNotification")
    }
   
  },[socket,currentChat])


  //*initial calls

  useEffect(() => {
    const getUserChats = async () => {
      const response = await instructorChats(userId);
      // console.log(response,"caht respos");
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

   useEffect(()=>{
      const fetching  = async () =>{
        const respo = await getNotifications(userId);
        if(respo.success){
          setNotifications(respo.notifications)
        }
      }
      fetching ();
     },[])
    //  console.log('notifications',notifications);
     
  const handletext = async () => {  
    let reciever = '';
           currentChat?.members.map((user)=>{
            if(user._id !== userId){
                 reciever = user._id
            }
           }) 
    const response = await instructorSendMessage(currentChat?._id!, userId, text);
    if(response.success){
       setNewMessage(response.message.text)
       setMessages((prev)=>[...prev,response.message])
       setText("")
       await sendNotification(reciever,userId)
    }else{
      return toast.error(response.response.data.message);
    }
  };

  let  user = ''
  const modification = notifications.map((notify:INotification)=>{
     chats.map((chat:IChat)=>{
       chat.members.map((value)=>{
        if(value._id == notify.senderId){
          user = value.name;
        }
       })
    })
    return {
      ...notify,
      senderName:user
    }
   })
  const dispatch = useDispatch();
  const navigate  = useNavigate();

   const markAsRead  = async(sentId:string) => {
      
      const mdNotifications = notifications.filter((value:INotification)=>value.senderId !== sentId);
      if(mdNotifications){
        const response = await markAsReadNotification(sentId,userId);
        if(response.success){
          setNotifications(mdNotifications)
        }else if(response.status == 403){
          await logout();
          dispatch(removeUser());
          toast.error("You are blocked by Admin");
          return navigate('/instructor/login') 
        }else{
          return toast.error(response.response.data.message);
        }
      }
   }

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
         
            <Popover>
              <PopoverTrigger><MarkEmailUnreadIcon  />{notifications.length}</PopoverTrigger>
              <PopoverContent>
              <div className="flex justify-between gap-3">
                      <h5>Notifications</h5>
                     
              </div>
             
                      {modification.length>0?(
                         modification.map((value:INotification,index)=>(
                            <div onClick={() => {
                              let id=''
                              let sentId=''
                              chats.map((chat:IChat)=>{
                                chat.members.map((val)=>{
                                 if(val._id == value.senderId){
                                  id = chat._id;
                                  sentId = value.senderId
                                 }
                                })
                             })
                              markAsRead(sentId)
                              searchParams.set("chatId", id)
                              setSearchParams(searchParams);
                            }} className={`p-2 ${value.isRead?"bg-white":"bg-success-600"}`} key={index}>
                                <div>{`${value.senderName} Sent you a new message`}</div>
                                <div>{moment(value.date).calendar()}</div>
                            </div>
                         ))
                      ):(
                        <p>No New Notifications...</p>
                      )
                      }
               
              </PopoverContent>
            </Popover>
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
                              let id = chat.members.find((member) => member._id !== userId)?._id
                              markAsRead(id!)
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