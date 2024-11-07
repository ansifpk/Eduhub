import { Card, CardContent, CardDescription } from "@/Components/ui/card"
import Footer from "../../Components/Footer/Footer"
import Header from "../../Components/Header/Header"

const Courses = () => {
  return (
    <div >
        <Header/>
        <div className=" h-full flex justify-center items-center">
            <Card className="w-1/2 h-[200px] d-flex justify-center items-center">
               <CardContent className="d-flex items-center" >
                <CardDescription>
                <h1>No courses available</h1>
                </CardDescription>
               </CardContent>
            </Card>
         
        </div>
        <Footer/>
    </div>
  )
}

export default Courses
