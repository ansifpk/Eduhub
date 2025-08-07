
const Button = ({className,text,type,onClick}:{className:string,text:string,type:"button"|"submit",onClick?:()=>void}) => {
  return (
    <>
    <button type={type?type:"button"} onClick={onClick}  className={`px-4 py-2 rounded ${className}`}>
         {text}         
     </button>
    </>
  )
}

export default Button
