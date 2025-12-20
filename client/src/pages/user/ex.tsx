import { useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


const Ex = () => {
const navigate = useNavigate() 

  const course ={
  _id: "6720028f9e15b12345a6c789",
  title: "Mastering React with TypeScript",
  instructorId: {
    _id: "671f9a8b9a12c45d89e67f23",
    name: "Harshad Patel",
    email: "harshad@example.com",
    isInstructor: true,
    isAdmin: false,
    isVerified: true,
    isBlock: false,
    createdAt: "2025-09-01T10:00:00.000Z",
    updatedAt: "2025-10-15T10:30:00.000Z",
  },
  subCategory: "Frontend Frameworks",
  description:
    "A complete guide to mastering React and TypeScript — from basic components to advanced hooks, state management, and real-world projects.",
  thumbnail:
    "https://cdn.educourses.com/thumbnails/react-typescript-course.jpg",
  category: "Web Development",
  level: "Intermediate",
  isListed: true,
  price: 2499,
  test: {
    _id: "6720029e4b56a90123d4f890",
    test: [
      {
        _id: "6720029e4b56a90123d4f891",
        question: "What is the purpose of TypeScript?",
        options: [
          "To style React components",
          "To provide static typing to JavaScript",
          "To improve performance",
          "To handle HTTP requests",
        ],
        correctAnswer: "To provide static typing to JavaScript",
      },
      {
        _id: "6720029e4b56a90123d4f892",
        question: "Which hook is used to manage state in React?",
        options: ["useState", "useEffect", "useRef", "useMemo"],
        correctAnswer: "useState",
      },
    ],
    students: [
      { user: "671fbb1a4e9d7c23b1f99102", score: 18 },
      { user: "671fbb1a4e9d7c23b1f99103", score: 22 },
    ],
  },
  subscription: true,
  image: {
    _id: "6720032a8b12d12345e6f890",
    image_url: "https://cdn.educourses.com/images/react-banner.png",
  },
  courseReviews: [
    {
      _id: "6720043e4a22b12345d8a789",
      user: "671fbb1a4e9d7c23b1f99102",
      rating: 4.5,
      comment: "Very informative and well-structured course!",
      createdAt: "2025-10-10T08:00:00.000Z",
    },
    {
      _id: "6720043e4a22b12345d8a790",
      user: "671fbb1a4e9d7c23b1f99103",
      rating: 5,
      comment: "Perfect for intermediate learners. Loved it!",
      createdAt: "2025-10-12T09:30:00.000Z",
    },
  ],
  students: [
    {
      _id: "671fbb1a4e9d7c23b1f99102",
      name: "Anu Kumar",
      email: "anu@example.com",
      isInstructor: false,
      isAdmin: false,
      isVerified: true,
      isBlock: false,
      createdAt: "2025-09-10T11:00:00.000Z",
      updatedAt: "2025-10-10T11:30:00.000Z",
    },
    {
      _id: "671fbb1a4e9d7c23b1f99103",
      name: "Ansif PK",
      email: "ansif@example.com",
      isInstructor: false,
      isAdmin: false,
      isVerified: true,
      isBlock: false,
      createdAt: "2025-09-12T09:00:00.000Z",
      updatedAt: "2025-10-11T09:15:00.000Z",
    },
  ],
  createdAt: "2025-10-20T12:30:00.000Z",
  sections:{
    _id:"weyweyweie",
    sections:[ {
    _id: "6720058e8c13a56789d0e432",
    title: "React Fundamentals",
    lectures: [
      {
        _id: "6720058e8c13a56789d0e433",
        sectionTitle: "Introduction to React",
        videoUrl: "https://cdn.educourses.com/videos/react-intro.mp4",
        duration: "15:30",
      },
      {
        _id: "6720058e8c13a56789d0e434",
        title: "JSX and Rendering Elements",
        videoUrl: "https://cdn.educourses.com/videos/jsx-basics.mp4",
        duration: "18:10",
      },
    ],
  }]
  },
}

  return (
    <>
      <div>
        <main className="w-full md:flex justify-center  gap-10    py-8">
                <div className="bg-white w-[650px]">
                  <div className="flex items-center space-x-2 m-3">
                    <button
                      className="bg-teal-500 px-2 py-1 rounded cursor-pointer hover:bg-teal-300 "
                      onClick={() => navigate(-1)}
                    >
                      <i className="bi bi-arrow-left"></i>
                    </button>
                    <div className="flex items-center justify-between bg-white border border-teal-400 rounded w-full ">
                      <div className="p-3">
                        <h6 className="text-s">{course?.title}</h6>
                        <p className="font-medium text-xs text-muted-foreground">
                          {course?.sections.sections.length} contents
                        </p>
                      </div>
                     <button
                              // onClick={() => setReportAlertOpen(true)}
                              className="bg-red-500 px-2 py-1 rounded text-white font-semibold cursor-pointer mr-5"
                            >
                              Report
                            </button>
                    </div>
                  </div>
                  <div className="m-2">
                    {/* {chapter ? ( */}
                      <video
                        src={"https://cdn.educourses.com/videos/jsx-basics.mp4"}
                        autoPlay
                        controls
                        muted={false}
                        controlsList="nodownload"
                      />
                    {/* ) : (
                      <p>Video not available</p>
                    )} */}

                    <div className="block md:hidden w-[400px] mt-3 ">
                  <div className="bg-white border border-teal-500 rounded ">
                    <div className="m-3 space-y-2">
                      <p className="font-bold">Course contents</p>
        
                      {course &&
                        course.sections.sections.map((section, index) => (
                          <Accordion
                            key={index}
                            type="multiple"
                            className="w-full  border-1 border-teal-500 rounded"
                          >
                            <AccordionItem value={`Section - ${index + 1}`}>
                              <AccordionTrigger className="cursor-pointer">
                                <span className="font-bold px-4">
                                  {'section.sectionTitle'}
                                </span>
                              </AccordionTrigger>
                              {section.lectures.map((lecture, ind) => (
                                <AccordionContent
                                  key={ind}
                                  // onClick={() => {
                                  //   setLecture(lecture);
                                  //   setChapter(lecture.content.video_url);
                                  // }}
                                  className="flex justify-between py-2 my-1 border-top bg-white mx-2"
                                >
                                  <div className="cursor-pointer flex gap-2">
                                    <span>{lecture.title}</span>
                                    {/* {chapter == lecture.content.video_url && (
                                      <i className="bi bi-play-circle"></i>
                                    )} */}
                                  </div>
                                  <div>{lecture.duration}</div>
                                </AccordionContent>
                              ))}
                            </AccordionItem>
                          </Accordion>
                        ))}
                    </div>
                  </div>
                    </div>

                    <div className="m-2">
                      <Tabs defaultValue="Description" className="md:w-full w-[70%] ">
                        <TabsList className="grid w-full grid-cols-3 bg-teal-400">
                          <TabsTrigger value="Description">Description</TabsTrigger>
                          <TabsTrigger value="Reviews&ratings">
                            Reviews & ratings
                          </TabsTrigger>
                          <TabsTrigger value="Instructor">Instructor</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Description">
                          <div>
                            <div className="space-y-2">
                              <div className="p-2">
                                <p className="font-bold">
                                  {" "}
                                  Title : {'course?.thumbnail'}
                                </p>
                                <p className="font-semibold">
                                  Description : {'course?.description'}
                                  <br />
                                  <br />
                                  category : {'course?.category'}
                                  <br />
                                  Topic : {'course?.subCategory'}
                                  <br />
                                  Price : {'course?.price'}
                                  <br />
                                  Level : {'course?.level'}
                                  <br />
                                  created At : {'course?.createdAt.slice(0, 10)'}
                                </p>
                                <div>
                                  <h6 className="font-bold">Tests</h6>
                                  <div>
                                    {/* {course?.test ? (
                                      course.test?.students.some(
                                        (val) => val.user == userId
                                      ) ? ( */}
                                        <div className="flex flex-col w-25 h-[200px] gap-2">
                                          <div className="border rounded-2 shadow-lg w-full h-[150px]">
                                            <h4 className="font-medium text-sm text-center">
                                              Your Score
                                            </h4>
                                            <div className="flex h-full w-full items-center justify-center">
                                              <h1>
                                                {/* {
                                                  course.test.students.find(
                                                    (val) => val.user == userId
                                                  )?.score
                                                } */}
                                              </h1>
                                            </div>
                                          </div>
                                          <button
                                            disabled
                                            className="text-white p-2 text-xs shadow-lg bg-teal-300 hover:bg-teal-300 w-full"
                                          >
                                            Test Attended
                                          </button>
                                        </div>
                                      {/* ) : ( */}
                                        <div className="flex flex-col w-[150px] h-[200px] gap-2">
                                          <img
                                            className="border rounded-2 shadow-lg w-full h-[200px]"
                                            // src={course.image.image_url}
                                          />
                                          <button
                                            className=" shadow-lg bg-teal-300 rounded cursor-pointer py-2 text-white  hover:bg-teal-300 w-full"
                                            // onClick={() =>
                                            //   navigate(
                                            //     `/user/assesmentTest/${course.test._id}`
                                            //   )
                                            // }
                                          >
                                          Go to test
                                          </button>
                                        </div>
                                      {/* )
                                    ) */}
                                     {/* : ( */}
                                      "No Tests Available for this Course."
                                    {/* )} */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block w-[400px] mt-3 ">
                  <div className="bg-white border border-teal-500 rounded ">
                    <div className="m-3 space-y-2">
                      <p className="font-bold">Course contents</p>
        
                      {course &&
                        course.sections.sections.map((section, index) => (
                          <Accordion
                            key={index}
                            type="multiple"
                            className="w-full  border-1 border-teal-500 rounded"
                          >
                            <AccordionItem value={`Section - ${index + 1}`}>
                              <AccordionTrigger className="cursor-pointer">
                                <span className="font-bold px-4">
                                  {'section.sectionTitle'}
                                </span>
                              </AccordionTrigger>
                              {section.lectures.map((lecture, ind) => (
                                <AccordionContent
                                  key={ind}
                                  // onClick={() => {
                                  //   setLecture(lecture);
                                  //   setChapter(lecture.content.video_url);
                                  // }}
                                  className="flex justify-between py-2 my-1 border-top bg-white mx-2"
                                >
                                  <div className="cursor-pointer flex gap-2">
                                    <span>{lecture.title}</span>
                                    {/* {chapter == lecture.content.video_url && (
                                      <i className="bi bi-play-circle"></i>
                                    )} */}
                                  </div>
                                  <div>{lecture.duration}</div>
                                </AccordionContent>
                              ))}
                            </AccordionItem>
                          </Accordion>
                        ))}
                    </div>
                  </div>
                </div>
              </main>     
      </div>
    </>
  );
};

export default Ex;
