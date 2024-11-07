import { FormEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import InstructorAsside from "./InstructorAside"

const CourseCreatePage = () => {

    const handleSubmit =(e:FormEvent<HTMLElement>)=>{
        e.preventDefault();
    }
  return (
    <div className="container-fluid bg-blue-200">
    <div className="row">
        <InstructorAsside/>
        <div className="col-md-10">
            <div className="flex  items-center justify-center p-4">
                <Card className="w-full ">
                    <CardHeader >
                    <CardTitle>Add a title</CardTitle>
                    </CardHeader>
                    <CardContent>
                    hello word
                    </CardContent>
                </Card>
          </div>
        </div>
    </div>
</div>
  )
}

export default CourseCreatePage
