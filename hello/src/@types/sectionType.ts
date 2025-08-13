



export interface ISection{
        _id?:string,
        sections:{
            sectionTitle:string,
            lectures:{
                _id:string,
                duration:string,
                title:string,
                content:{
                    _id:string,
                    video_url:File,
                },
            }[]
        }[]
}