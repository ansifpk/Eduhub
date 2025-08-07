export interface ISection{
    _id?:string,
    sectionTitle:string,
    lectures:{
        content:{
            _id:string,
            video_url:string|File,
        },
        id:string,
        duration:string,
        title:string,
    }[] 
}