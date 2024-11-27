export interface Section {
  id: number;
  sessionTitle: string;
  isExpanded: boolean;
  lectures: Lecture[];
}

export interface Lecture {
  id: number;
  title: string;
  content: {
      _id:string,
      video_url: File | string;
  }
  duration: string;
  type: string;
}

export interface ApiSection {
  id: number;
  sessionTitle: string;
  isExpanded: boolean;
  lectures: ApiLecture[];
}

export interface ApiLecture {
  id: number;
  title: string;
  content: {
      _id:string,
      video_url: string | null;
  }|null
  duration: string;
  type: string;
}

export interface CourseData {
  title: string;
  sections: Section[];
  image:{
    _id:string,
    image_url: string|File
  },
  // image: File | undefined;
  instructorId: string;
  category: string;
  description: string;
  thumbnail: string;
  subCategory: string;
  level: string;
  price: number;
}