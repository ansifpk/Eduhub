export interface ILecture{
        _id:string,
        content:{
            _id:string,
            video_url:string|File
        },
        duration:string,
        title:string,
}