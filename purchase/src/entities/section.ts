export interface ISection{
    _id?:string,
    sectionsTitle:string,
    lectures:[{
        _id:string,
        content:{
            _id:string,
            video_url:string,
        },
        duration:string,
        title:string,
    }]  
}