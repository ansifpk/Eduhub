import { NavLink } from "react-router-dom"

const ErrorPage = () => {
  return (
     <div className="h-[100vh] flex items-center justify-center bg-black">
     <div className="flex flex-col items-center justify-center">
       <h1 className="text-gray-500"> 404 Not found</h1>
        <p className="text-white"><NavLink className="text-white" to={"/"}>Go Home Page</NavLink></p>
     </div>
    </div>   
  )
}

export default ErrorPage
