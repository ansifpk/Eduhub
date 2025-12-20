export interface INotification{
    _id:string,
    isRead:boolean,
    recipientId:string,
    senderId:string,
    senderName?:string,
    date:Date
}