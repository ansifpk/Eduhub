
import Header from '../../components/Header/Header'
import { Button } from '../../components/ui/button'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate()
  return (
    <>
    <Header />
    <div className=' h-[100vh] bg-blue-200 flex justify-center items-center'>
    <div className='w-25 h-25  rounded-2 flex flex-col justify-center items-center bg-green-400'>
       <h3>Purchase successfully</h3>
      <Button onClick={()=>navigate("/users/courses")}>Go home</Button>
    </div>
    </div>
    </>
    
  )
}

export default Success
