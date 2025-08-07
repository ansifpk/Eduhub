import type { IUser } from "@/@types/userType";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import type { DefaultEventsMap } from "@socket.io/component-emitter";
import useRequest from "@/hooks/useRequest";
import toast from "react-hot-toast";
import userRoutes from "@/service/endPoints/userEndPoints";
import type { IChat } from "@/@types/chatType";
import { useSearchParams } from "react-router-dom";
import InputEmoji from "react-input-emoji";
import type { IMessage } from "@/@types/messageType";
import Header from "@/components/user/Header";
import ProfileNavbar from "@/components/user/ProfileNavbar";
import Footer from "@/components/user/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import moment from "moment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { INotification } from "@/@types/notificationType";
import { Badge } from "@/components/ui/badge";

const Message = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [text, setText] = useState("");
  const [currentChat, setCurrentChat] = useState<IChat>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = useSelector((state: IUser) => state._id);
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  const { doRequest, err } = useRequest();
  const [socket, setSocket] = useState<
    Socket<DefaultEventsMap, DefaultEventsMap> | undefined
  >();
  const [onlineUsers, setOnlineUsers] = useState<
    { userId: string; socketId: string }[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //* initial socket setup
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
      const filter = res.filter(
        (value: { userId: string }) => value.userId !== userId
      );
      setOnlineUsers(filter);
    });
  }, [socket]);


  //*get messages
  useEffect(() => {
    if (!socket) return;

    socket.on("getMessage", (message) => {
      const chatUser = currentChat?.members.find(
        (value) => value._id !== userId
      );
      if (chatUser?._id !== message.senderId) return;
      socket.emit(`seenMessage${message.senderId}`)
      setMessages((prev)=>[...prev,{...message}]);
    });

    socket.on("getMessageNotification", (res) => {
      toast.success(`You got a new message!`);
      if (
        currentChat?.members.find((usr) => usr._id !== userId)?._id ==
        res.senderId
      ) {
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    });

    socket.on("markSeenMessage", () => {
      setMessages((prev) =>
        prev.map((msg) => ({
          ...msg,
          isRead: true,
        }))
      );
    });
    socket.on(`seenMessage${userId}`, () => {
      console.log("success");
      
    });

    return () => {
      socket.off("getMessage");
      socket.off("getMessageNotification");
      socket.off("markSeenMessage");
      socket.off(`seenMessage${userId}`);
    };
  }, [socket, currentChat]);

  //* send message

  useEffect(() => {
    if (!socket) return;
    const recipientId = currentChat?.members.find(
      (value) => value._id !== userId
    );
    if(newMessage.length == 0) return;
    socket.emit("sendMessage", {
      text: newMessage,
      recipientId: recipientId?._id,
      senderId: userId,
      isRead: false,
    });
    setNewMessage("");
  }, [newMessage]);

  useEffect(() => {
    doRequest({
      url: `${userRoutes.chat}?userId=${userId}`,
      method: "get",
      body: {},
      onSuccess: (res) => {
        setChats(res.chats);
      },
    });
  }, [userId]);

  //* get current privet chat
  useEffect(() => {
    if (chatId) {
      doRequest({
        url: `${userRoutes.privetChat}/${chatId}`,
        method: "get",
        body: {},
        onSuccess: (res) => {
          doRequest({
            url: `${userRoutes.message}/${chatId}`,
            method: "get",
            body: {},
            onSuccess: (response) => {
              setCurrentChat(res.chat);
              setMessages(response.messages);
            },
          });
        },
      });
    }
  }, [chatId]);

  //* seenMsg

  useEffect(() => {
    
    if (chatId && currentChat) {
      
      socket?.emit("seenMsg", {
        senter: currentChat.members.find((mem) => mem._id !== userId)?._id,
      });
    }
  }, [chatId, currentChat]);

  //* markAsRead

  const markAsRead = async (sentId: string) => {
    doRequest({
      url: `${userRoutes.notification}/${userId}/${sentId}`,
      method: "patch",
      body: {},
      onSuccess: () => {
        setNotifications((prev) =>
          prev.filter((not) => not.senderId !== sentId)
        );
      },
    });
  };

  //* sent text

  const handletext = async () => {
    doRequest({
      url: userRoutes.message,
      method: "post",
      body: { chatId: currentChat?._id!, senderId: userId, text },
      onSuccess: (response) => {
        setNewMessage(response.message.text);
        setText("");
        setMessages((prev) => [...prev, response.message]);
      },
    });
  };

  useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);


  return (
    <div>
      <Header />
      <div className="w-full">
        <ProfileNavbar value="Messages" />
        <main className="w-full flex justify-center items-center md:p-8 p-3">
          <div className="w-full border-2 rounded h-[70vh]">
            <div className="w-full flex rounded  gap-1">
              <div className="w-[35%] flex justify-between border bg-teal-500 p-3">
                <strong>Messages</strong>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative flex">
                      <BellIcon className="text-white" />
                      <span className="relative flex size-3">
                        <span className="absolute right-3 inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative right-3 inline-flex size-3 rounded-full bg-green-500"></span>
                      </span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <ScrollArea
                      className={`${
                        notifications.length > 0 ? "h-[60vh]" : ""
                      }`}
                    >
                      <div className="flex justify-between gap-3">
                        <h5>Notifications</h5>
                      </div>

                      {notifications.length > 0 ? (
                        notifications.map((value: INotification, index) => {
                          let name = "";

                          chats.map((chat) => {
                            chat.members.map((mem) => {
                              if (mem._id == value.senderId) {
                                name = mem.name;
                              }
                            });
                          });

                          return (
                            <div
                              key={`${value._id}+${index}`}
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
                              className={`p-2  ${
                                value.isRead
                                  ? "bg-white "
                                  : "bg-green-600 cursor-pointer"
                              }`}
                            >
                              <div>{name} Sent you a new message</div>

                              <div>{moment(value.date).calendar()}</div>
                            </div>
                          );
                        })
                      ) : (
                        <p>No New Notifications...</p>
                      )}
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="w-[65%] bg-teal-500 border p-2 rounded">
                {currentChat && (
                  <div className="relative flex gap-2 items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          currentChat.members.find(
                            (user) => user._id !== userId
                          )?.avatar.avatar_url
                        }
                      />
                      <AvatarFallback>
                        <i className="bi bi-person-circle"></i>
                      </AvatarFallback>
                    </Avatar>
                    {onlineUsers.some(
                      (val) =>
                        val.userId ==
                        currentChat.members.find((user) => user._id !== userId)
                          ?._id
                    ) && (
                      <span className="relative flex size-3">
                        <span className="relative right-5 top-3 inline-flex size-2 rounded-full bg-green-500"></span>
                      </span>
                    )}
                    <strong className="text-white">
                      {
                        currentChat.members.find((user) => user._id !== userId)
                          ?.name
                      }
                    </strong>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <ScrollArea className="w-[35%] border-2  h-[60vh]">
                {chats.map((chat) => {
                  let count = 0;
                  const otherUser = chat.members.find(
                    (usr) => usr._id !== userId
                  );
                  count = notifications.filter(
                    (not) => not.senderId === otherUser?._id
                  ).length;

                  return (
                    <div
                      key={chat._id}
                      onClick={async () => {
                        searchParams.set("chatId", chat._id);
                        setSearchParams(searchParams);
                        let id = chat.members.find(
                          (member) => member._id !== userId
                        )?._id;
                        markAsRead(id!);
                      }}
                      className="relative cursor-pointer flex items-center gap-2 p-2 border border-teal-500"
                    >
                      <Avatar>
                        <AvatarImage
                          src={
                            chat.members.find((user) => user._id !== userId)
                              ?.avatar.avatar_url
                          }
                        />
                        <AvatarFallback>
                          <i className="bi bi-person-circle text-2xl"></i>
                        </AvatarFallback>
                      </Avatar>
                      {onlineUsers.some(
                        (val) =>
                          val.userId ==
                          chat.members.find((user) => user._id !== userId)?._id
                      ) && (
                        <span className="relative flex size-3">
                          <span className="relative right-5 top-3 inline-flex size-2 rounded-full bg-green-500"></span>
                        </span>
                      )}
                      <span className="text-xs font-semibold flex w-full justify-between items-center-safe">
                        <span>
                          {" "}
                          {
                            chat.members.find((user) => user._id !== userId)
                              ?.name
                          }
                        </span>
                        {count > 0 && (
                          <span>
                            {" "}
                            <Badge
                              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-teal-500 text-white"
                              variant="outline"
                            >
                              {count > 5 ? "5+" : count}
                            </Badge>
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </ScrollArea>
              <div className="w-[65%]">
                {currentChat ? (
                  <div>
                    <ScrollArea className="h-[50vh] p-3  flex flex-col">
                      <>
                        {messages.map((msg, index) => (
                          <div
                            key={`${msg._id}+${index}`}
                            className={`flex ${
                              msg.senderId !== userId ? "" : "justify-end-safe"
                            }`}
                          >
                            <div
                              className={`p-2 m-1 w-[50%] rounded ${
                                msg.senderId !== userId
                                  ? "bg-teal-800 text-white"
                                  : "bg-teal-200 "
                              }`}
                            >
                              {msg.text}
                              <div className="flex justify-end-safe gap-2 items-end-safe">
                                {msg.senderId == userId && (
                                  <span className="text-xs">
                                    <i
                                      className={`bi bi-check2-all ${
                                        msg.isRead ? "text-indigo-600" : ""
                                      } `}
                                    ></i>
                                  </span>
                                )}
                                <span className="text-xs">
                                  {moment(msg.createdAt).calendar()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    </ScrollArea>
                    <div className="flex items-center p-2">
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
                        <i
                          onClick={handletext}
                          className="bi bi-send-fill cursor-pointer"
                        ></i>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">No chat selected</div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(Message);
