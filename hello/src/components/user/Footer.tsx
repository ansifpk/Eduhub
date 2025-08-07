const Footer = () => {
  // console.log("footer");

  return (
    <div className="bg-blue-950 text-white mt-3  h-[200px] flex items-center justify-center w-full">
       <div >
         <ul className="flex items-center justify-center text-center gap-10" >
            <li>EduHub</li>
            <li>Virtual Class</li>
         </ul>
         <ul className="flex sm:text-xs text-xs md:text-medium  items-center justify-center text-center gap-1  lg:gap-10 md:gap-10">
            <li>Privecy Policies</li>
            <li>Terms & Conditions</li>
            <li className="">© 2024 Class Technologies Inc.</li>
         </ul>
       </div>
    </div>
  )
}

export default Footer
