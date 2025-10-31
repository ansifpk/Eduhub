

export interface ISection{
        _id?:string,
        sections:{
            sectionTitle:string,
            lectures:{
                duration:string,
                title:string,
                content:{
                    _id:string,
                    video_url:string,
                },
            }[]
        }[]
}