import std from '../../assets/home-page/teacher-home.jpg'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import LoginForm from "../../components/instructor/LoginForm";
import RegisterForm from '../../components/instructor/RegisterForm';


const InstructorLogin = () => {
    
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted ">
    <div className="w-full max-w-sm md:max-w-3xl">
      <div className={"flex flex-col gap-6"}>
        <div className="w-full border">
           <div className="grid md:grid-cols-2">
              <div className="hidden md:block bg-muted h-full w-full">
                <img src={std} alt="image" className="object-cover dark:brightness-[0.2] dark:grayscale w-full h-full" />
              </div>
              <Tabs defaultValue="login" className="w-full ">
              <TabsList className="grid w-full grid-cols-2 bg-teal-300 text-white rounded-full mt-1 ">
                <TabsTrigger className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:rounded-full" value="login">Login</TabsTrigger>
                <TabsTrigger className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:rounded-full" value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-teal-400 font-extrabold underline">Welcom to EduHub</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <LoginForm />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="register">
                <Card>
                  <CardHeader className="text-center">
                  <CardTitle className="text-teal-400 font-extrabold underline">Welcom to EduHub</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <RegisterForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
           </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default InstructorLogin
