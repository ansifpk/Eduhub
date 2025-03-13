import { IChat } from "@/@types/chatType";
import { User } from "@/@types/userType";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import ProfileNavbar from "@/Components/Header/ProfileNavbar";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { MoreVertical, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputEmoji from "react-input-emoji";
import moment from "moment";
import { IMessage } from "@/@types/messageType";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { INotification } from "@/@types/notificationType";
import { useDispatch } from "react-redux";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";

const Message = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  const userId = useSelector((state: User) => state.id);
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const [currentChat, setCurrentChat] = useState<IChat>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
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
      path: "/message/message/socket.io",
    });
    setSocket(newSocket!);
    return () => {
      newSocket.disconnect();
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
      isRead: false,
    });
  }, [newMessage]);

  //* recieve message and notifications

  useEffect(() => {
    if (!socket) return;

    socket.on("getMessage", (message) => {
      const chatUser = currentChat?.members.find(
        (value) => value._id !== userId
      );
      if (chatUser?._id !== message.senderId) return;
      setMessages((prev) => [...prev, message]);
      //  if (isChatOpen?._id == res.senderId) {
      //   setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      // } else {
      //   setNotifications((prev) => [res, ...prev]);
      // }
    });

    socket.on("getMessageNotification", (res) => {
      const isChatOpen = currentChat?.members.find(
        (value) => value._id !== res.recipientId
      );
      toast.success(`You got a new message`);
      if (isChatOpen?._id == res.senderId) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getMessageNotification");
    };
  }, [socket, currentChat]);
   //*get all chats
    const {doRequest,errors} = useRequest()
  useEffect(() => {
    const getUserChats = async () => {
     await doRequest({
           url:`${userRoutes.chat}?userId=${userId}`,
           method:"get",
           body:{},
           onSuccess:(res)=>{
            setChats(res.chats);
           }
      })
    };
    getUserChats();
  }, [userId]);

  useEffect(() => {
    if (chatId) {
      const fetchmessages = async () => {
        await doRequest({
          url:`${userRoutes.privetChat}/${chatId}`,
          method:"get",
          body:{},
          onSuccess:(res)=>{
            setCurrentChat(res.chat);
          }
        });
        await doRequest({
          url:`${userRoutes.message}/${chatId}`,
          method:"get",
          body:{},
          onSuccess:(res)=>{
            setMessages(res.messages);
          }
        });
      };
      fetchmessages();
    }
  }, [chatId]);

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
      await doRequest({
        url:`${userRoutes.notification}/${userId}/${sentId}`,
          method:"patch",
          body:{},
          onSuccess:()=>{
            setNotifications(mdNotifications);
          }
      });
    }
  };

  const handletext = async () => {
    let reciever = "";
    currentChat?.members.map((user) => {
      if (user._id !== userId) {
        reciever = user._id;
      }
    });
    await doRequest({
      url:userRoutes.message,
      method:"post",
      body:{chatId:currentChat?._id!, senderId:userId, text},
      onSuccess:(response)=>{
        setNewMessage(response.message.text);
        setMessages((prev) => [...prev, response.message]);
        setText("");
        doRequest({
          url:userRoutes.message,
            method:"post",
            body:{recipientId:reciever, senderId:userId,},
            onSuccess:()=>{}
        })
      }
    })
  };

  useEffect(() => {
    const fetching = async () => {
      doRequest({
        url:`${userRoutes.notification}/${userId}`,
          method:"get",
          body:{},
          onSuccess:(res)=>{
            setNotifications(res.notifications);
          }
      })
    };
    fetching();
  }, []);

  useEffect(() => {
    errors?.map((err)=>toast.error(err.message))
  }, [errors]);


  return (
    <div className="h-screen  pt-1">
      <Header />
      <ProfileNavbar />
      <div className="flex md:justify-center">
        <div className="bg-white md:mx-5 my-4 flex  md:w-[950px] w-[500px]  rounded-2">
          <div className="border borer-danger bg-success-400  m-2  rounded-2">
            <div className="flex items-center justify-between md:w-[330px] w-[200px]">
              <h3 className="m-3 text-sm font-medium text-white leading-none">
                Messages
              </h3>
              <Popover>
                <PopoverTrigger>
                  <MarkEmailUnreadIcon />
                  {notifications.length}
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex justify-between gap-3">
                    <h5>Notifications</h5>
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
                          value.isRead ? "bg-white" : "bg-success-600"
                        }`}
                        key={index}
                      >
                        <div>{`${value.senderName} Sent you a new message`}</div>
                        <div>{moment(value.date).calendar()}</div>
                      </div>
                    ))
                  ) : (
                    <p>No New Notifications...</p>
                  )}
                </PopoverContent>
              </Popover>
            </div>

            <ScrollArea className="h-[450px] md:w-[330px] w-[200px] rounded-md border bg-white p-2">
              {chats.length > 0 ? (
                chats
                  .filter((value: IChat) => value.role == "userToInstructor")
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
                                )?.avatar.avatar_url ||
                                "https://github.com/shadcn.png"
                              }
                              alt="@shadcn"
                            />
                          </Avatar>
                          <div
                            onClick={async() => {
                              searchParams.set("chatId", chat._id);
                              setSearchParams(searchParams);
                              let id = chat.members.find(
                                (member) => member._id !== userId
                              )?._id;
                              markAsRead(id!);
                            }}
                            className="grid flex-1 text-left text-sm leading-tight cursor-pointer"
                          >
                            <span className="truncate font-semibold">
                              {
                                chat.members.find(
                                  (member) => member._id !== userId
                                )?.name
                              }
                            </span>
                          </div>
                        </div>
                        {unreadCount > 0 && (
                          <div className="bg-success text-xs px-2 text-white rounded-full">
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
          <div className="w-full m-2 border bg-success-50 rounded-2">
            <header className="flex  items-center text-white bg-success-400 rounded-2 h-[50px]">
              {currentChat && (
                <div className="flex w-full items-center justify-between mx-3">
                  <div className="flex items-center space-x-3 m-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={
                          currentChat.members.find(
                            (member) => member._id !== userId
                          )?.avatar.avatar_url ||
                          "https://github.com/shadcn.png"
                        }
                        alt="@shadcn"
                      />
                    </Avatar>
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
                  <MoreVertical className="cursor-pointer" />
                </div>
              )}
            </header>
            <div className="flex flex-col justify-between m-2 h-[430px]">
              <ScrollArea>
                {chatId && messages.length > 0 ? (
                  <>
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex p-[0.75rem] md:w-[250px] w-[200px]  border rounded shadow-md my-2 ${
                          msg.senderId == userId
                            ? "bg-success-200 ml-auto"
                            : "bg-white items-start"
                        }`}
                      >
                        <div className="leading-none overflow-hidden break-words w-full">
                          <span className="flex justify-start">{msg.text}</span>
                          <div
                            className={`flex text-xs text-gray-500 justify-end`}
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
