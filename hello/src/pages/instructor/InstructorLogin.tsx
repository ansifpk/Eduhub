import InstructorLoginForm from '../../components/intructor/InstructorLoginForm'
import React from 'react'

const InstructorLogin = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <InstructorLoginForm />
      </div>
    </div>
  )
}

export default React.memo(InstructorLogin)
