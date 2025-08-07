import { IChat } from "../../@types/chatType";
import { IMessage } from "../../@types/messageType";
import { User } from "../../@types/userType";
import InstructorAside from "../../components/instructor/InstructorAside";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import { MoreVertical, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import {  useSearchParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import moment from "moment";
import toast from "react-hot-toast";
import { INotification } from "../../@types/notificationType";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import useRequest from "../../hooks/useRequest";
import instructorRoutes from "../../service/endPoints/instructorEndPoints";

export default function InstructorMessage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  const userId = useSelector((state: User) => state.id);
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState<IChat>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const {doRequest,errors}=useRequest();
  const [onlineUsers, setOnlineUsers] = useState<
    { userId: string; socketId: string }[]
  >([]);
  const [socket, setSocket] = useState<
    Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  >();
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
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_APIGATEWAY, {
      path: "/message/socket.io",
    });
    setSocket(newSocket!);
    return () => {
      newSocket!.disconnect();
    };
  }, [userId]);

  //* add user

  useEffect(() => {
    if (!socket) return;
    socket.emit("addNewUser", userId);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
  }, [socket]);

  //* send message

  useEffect(() => {
    if (!socket) return;
    const recipientId = currentChat?.members.find(
      (value) => value._id !== userId
    );
    socket.emit("sendMessage", {
      text: newMessage,
      recipientId: recipientId?._id,
      senderId: userId,
    });
  }, [newMessage]);

  //* recieve message

  useEffect(() => {
    if (!socket) return;

    socket.on("getMessage", (message) => {
      const chatUser = currentChat?.members.find(
        (value) => value._id !== userId
      );
      if (chatUser?._id !== message.senderId) return;
      setMessages((prev) => [...prev, message]);
    });

    socket.on("getMessageNotification", (res) => {
      const isChatOpen = currentChat?.members.find(
        (value) => value._id !== res.recipientId
      );
      toast.success(`You got a new message`);
      if (isChatOpen?._id == res.senderId) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
        markAsRead(res.senderId);
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getMessageNotification");
    };
  }, [socket, currentChat]);

  //*initial calls

  useEffect(() => {
    doRequest({
      url:`${instructorRoutes.chat}?userId=${userId}`,
      method:"get",
      body:{},
      onSuccess:(response)=>{
        setChats(response.chats);
      }
    });
  }, [userId]);

  useEffect(() => {
    if (chatId) {
      doRequest({
        url:`${instructorRoutes.privetChat}/${chatId}`,
        method:"get",
        body:{},
        onSuccess:(response)=>{
          setCurrentChat(response.chat);
        }
      });
      doRequest({
        url:`${instructorRoutes.message}/${chatId}`,
        method:"get",
        body:{},
        onSuccess:(response)=>{
          setMessages(response.messages);
        }
      });
    }
  }, [chatId]);

  useEffect(() => {
    doRequest({
      url:`${instructorRoutes.notification}/${userId}`,
      method:"get",
      body:{},
      onSuccess:(response)=>{
        setNotifications(response.notifications);
      }
    });
  }, []);

  const handletext = async () => {
    let reciever = "";
    currentChat?.members.map((user) => {
      if (user._id !== userId) {
        reciever = user._id;
      }
    });
    doRequest({
      url:instructorRoutes.message,
      method:"post",
      body:{chatId:currentChat?._id!,senderId:userId,text},
      onSuccess:(response)=>{
        setNewMessage(response.message.text);
        setMessages((prev) => [...prev, response.message]);
        setText("");
        doRequest({
          url: instructorRoutes.notification,
          method:"post",
          body:{recipientId:reciever,senderId:userId},
          onSuccess:()=>{
            
          }
        });
      }
    });
  };
// console.log("notifications",notifications);

  let user = "";
  const modification = notifications.map((notify: INotification) => {
    chats.map((chat: IChat) => {
      chat.members.map((value) => {
        if (value._id == notify.senderId) {
          user = value.name;
        }
      });
    });
    return {
      ...notify,
      senderName: user,
    };
  });

  const markAsRead = async (sentId: string) => {
    const mdNotifications = notifications.filter(
      (value: INotification) => value.senderId !== sentId
    );
    if (mdNotifications) {
      doRequest({
        url:`${instructorRoutes.notification}/${userId}/${sentId}`,
        method:"patch",
        body:{},
        onSuccess:(response)=>{
          setNotifications(response);
        }
      });
    }
  };

  useEffect(()=>{
    errors?.map((err)=>toast.error(err.message))
  },[errors]);

  return (
    <div className="bg-black ">
      <div className="space-y-6 md:p-10 p-2 pb-16">
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <h2 className="text-white text-2xl font-bold tracking-tight">
              Edu Hub
            </h2>
            <p className="md:text-sm lg:text-sm text-xs text-muted-foreground">
              Manage your instructor account students and courses.
            </p>
          </div>
          <div className="block md:hidden lg:hidden">
            {open ? (
            
                <i onClick={()=>setOpen(!open)} className="bi bi-x-lg text-white"></i>
                
            ) : (
              
                <i onClick={()=>setOpen(!open)} className="bi bi-list text-white"></i>
             
            )}
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-5 lg:space-y-0">
          <InstructorAside />
          <div className="flex justify-center">
            <div className="bg-white md:mx-5 lg:mx:-5  flex lg:w-[900px] md:w-[900px] w-full rounded-2">
              <div className="border borer-danger  m-2   rounded-2 md:w-[330px] lg:w-[330px] w-50">
                <div className="flex items-center bg-green-400  justify-between md:p-3 p-2">
                  <h3 className=" md:text-sm text-xs font-medium text-white leading-none">
                    Messages
                  </h3>

                  <Popover>
                    <PopoverTrigger>
                      <i className="bi bi-envelope-exclamation-fill"></i>
                      {notifications.length}
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex justify-between gap-3">
                        <span className="text-xs">Notifications</span>
                      </div>

                      {modification.length > 0 ? (
                        modification.map((value: INotification, index) => (
                          <div
                            onClick={() => {
                              let id = "";
                              let sentId = "";
                              chats.map((chat: IChat) => {
                                chat.members.map((val) => {
                                  if (val._id == value.senderId) {
                                    id = chat._id;
                                    sentId = value.senderId;
                                  }
                                });
                              });
                              markAsRead(sentId);
                              searchParams.set("chatId", id);
                              setSearchParams(searchParams);
                            }}
                            className={`p-2 ${
                              value.isRead ? "bg-white" : "bg-green-600"
                            }`}
                            key={index}
                          >
                            <div>{`${value.senderName} Sent you a new message`}</div>
                            <div>{moment(value.date).calendar()}</div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs">No New Notifications...</p>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
                <ScrollArea className="h-[360px]">
                  {chats.length > 0 ? (
                    chats
                      .filter(
                        (value: IChat) => value.role == "userToInstructor"
                      )
                      .map((chat: IChat, index: number) => {
                        const chatMember = chat.members.find(
                          (member) => member._id !== userId
                        );
                        const unreadCount = notifications.filter(
                          (notif) =>
                            !notif.isRead && notif.senderId === chatMember?._id
                        ).length;
                       
                        
                        return (
                          <div
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <div className="flex space-x-3 m-2">
                            {
                                  chat.members.find(
                                    (member) => member._id !== userId
                                  )?.avatar.avatar_url?
                                  <Avatar
                                className={`border-3 ${
                                  onlineUsers.some(
                                    (value) =>
                                      value.userId ==
                                      chat.members.find(
                                        (member) => member._id !== userId
                                      )?._id
                                  ) && "border-3 border-success-400"
                                }  cursor-pointer`}
                              >
                                
                                <AvatarImage
                                  src={
                                    chat.members.find(
                                      (member) => member._id !== userId
                                    )?.avatar.avatar_url}
                                  alt="@shadcn"
                                />
                              </Avatar>
                                  :
                                  <i className="bi bi-person-circle text-2xl"></i>
                                }
                              
                              <div
                                onClick={() => {
                                  let id = chat.members.find(
                                    (member) => member._id !== userId
                                  )?._id;
                                  markAsRead(id!);
                                  searchParams.set("chatId", chat._id);
                                  setSearchParams(searchParams);
                                }}
                                className="grid flex-1 text-left text-sm leading-tight cursor-pointer"
                              >
                                <span className="text-xs md:text-sm font-semibold">
                                  {
                                    chat.members.find(
                                      (member) => member._id !== userId
                                    )?.name
                                  }
                                </span>
                               
                              </div>
                            </div>
                            {unreadCount > 0 && (
                              <div className="bg-green text-xs px-2 text-white rounded-full">
                                {unreadCount}
                              </div>
                            )}
                          </div>
                        );
                      })
                  ) : (
                    <div className="flex items-center justify-center">
                      <p>No chats started...</p>
                    </div>
                  )}
                </ScrollArea>
              </div>

              <div className="w-full m-2 border bg-green-50 rounded-2">
                <header className="flex  items-center text-white bg-green-400 rounded-2 h-[50px]">
                  {currentChat && (
                    <div className="flex w-full items-center justify-between mx-3">
                      <div className="flex items-center space-x-3 m-2">
                        {
                          currentChat.members.find(
                            (member) => member._id !== userId
                          )?.avatar.avatar_url?
                          <Avatar className={`cursor-pointer`}>
                          <AvatarImage
                            src={
                              currentChat.members.find(
                                (member) => member._id !== userId
                              )?.avatar.avatar_url }
                            alt="@shadcn"
                          />
                        </Avatar>
                          :
                          <i className="bi bi-person-circle text-2xl"></i>
                        }
                        
                        <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
                          <span className="truncate font-semibold">
                            {
                              currentChat.members.find(
                                (member) => member._id !== userId
                              )?.name
                            }
                          </span>
                        </div>
                      </div>
                      <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <MoreVertical className="cursor-pointer" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem>block</DropdownMenuItem>
                            </AlertDialogTrigger>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem>bye</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <AlertDialogContent className="bg-black">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-white">
                              If you block this user you cannot send message to
                              this user. you can unblock this user any time you
                              want.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="text-black bg-white">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogCancel className="text-black bg-white">
                              Continue
                            </AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </header>

                <div className=" m-2 rounded-2 ">
                  <div className="flex flex-col justify-between m-2 ">
                    <ScrollArea className="h-[300px]">
                      {chatId && messages.length > 0 ? (
                        <>
                          {messages.map((msg, index) => (
                            <div
                              key={index}
                              className={`flex p-[0.75rem] md:w-[250px] w-[200px] border rounded shadow-md  ${
                                msg.senderId == userId
                                  ? "bg-green-200 ml-auto"
                                  : "bg-white items-start"
                              }`}
                            >
                              <div className="leading-none overflow-hidden break-words w-full">
                                <span className="flex justify-start md:text-sm text-xs font-semibold">
                                  {msg.text}
                                </span>
                                <div
                                  className={`flex text-xs  text-gray-500 justify-end`}
                                >
                                  {moment(msg.createdAt).calendar()}
                                </div>
                              </div>
                            </div>
                          ))}

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
                    {currentChat && (
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
                          <Send
                            className="cursor-pointer"
                            onClick={handletext}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
