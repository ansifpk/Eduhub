import { IChat } from "@/@types/chatType";
import { User } from "@/@types/userType";
import {
  getCurrentChat,
  getMessages,
  sendMessage,
  userChats,
} from "@/Api/user";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import ProfileNavbar from "@/Components/Header/ProfileNavbar";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Separator } from "@/Components/ui/separator";
import { MoreVertical, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import InputEmoji from "react-input-emoji";
import moment from 'moment';
import { IMessage } from "@/@types/messageType";
import {io, Socket} from 'socket.io-client';
import {DefaultEventsMap} from '@socket.io/component-emitter';
import { IUser } from "@/@types/chatUser";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
const Message = () => {
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
         if(userId !== message.recipientId) return;
         console.log("hi");
         setMessages((prev)=>[...prev,message])
    })

    return ()=>{
      socket.off("getMessage")
    }
   
  },[socket,currentChat])

  useEffect(() => {
    
    const getUserChats = async () => {
     
      const response = await userChats(userId);
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
        const currentCht = await getCurrentChat(chatId);
        if (currentCht.success) {
          setCurrentChat(currentCht.chat);
        } else {
          return toast.error(currentCht.response.data.message);
        }
        const response = await getMessages(chatId);
        if (response.success) {
          
          setMessages(response.messages)
        }
      };
      fetchmessages();
    }
  }, [chatId]);

  console.log("c", chats);
  console.log("current chat", currentChat);
  console.log("current chat User", currentChat);
  console.log("userId", userId);
  console.log("chatId", chatId);
  console.log("messages", messages);
  console.log("new messages", newMessage);
  console.log("socket", socket);
  console.log("onlineUsers", onlineUsers);

  const handletext = async () => {
    const response = await sendMessage(currentChat?._id!, userId, text);
    if(response.success){
      setNewMessage(response.message.text)
       setMessages((prev)=>[...prev,response.message])
       setText("")
    }else{
      return toast.error(response.response.data.message);
    }
  };

  return (
    <div className="bg-blue-100 ">
      <Header />
      <ProfileNavbar />
      <div className="flex justify-center">
        <div className="bg-white mx-5 my-4 flex  w-[950px] rounded-2">
          <div className="border borer-danger bg-success-400  m-2  rounded-2">
            <div className="flex items-center justify-between w-[330px]">
            <h3 className="m-3 text-sm font-medium text-white leading-none">
              Messages
            </h3>
            <div className="flex">
              <Input className="bg-white" onChange={(e)=>setSearch(e.target.value)} placeholder="serch"  />
            </div>
            {/* <Select onValueChange={(value) => setSort(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter</SelectLabel>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Price Low to High">Un read</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}
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
      <Footer />
    </div>
  );
};

export default Message;
