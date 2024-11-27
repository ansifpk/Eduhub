import { Card, CardFooter, CardHeader } from '@/Components/ui/card'
import { Clock } from 'lucide-react'
import React from 'react'

const Wallet = () => {
  return (
    <div>
       <Card className="max-w-sm overflow-hidden transition-shadow hover:shadow-lg">
     
     <div className="relative h-48 bg-gray-200">
       <img 
         src="/api/placeholder/400/200" 
         alt={'title'}
         className="w-full h-full object-cover"
       />
     </div>

     <CardHeader className="p-4">
     
       <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
         <span>{'category'}</span>
         <div className="flex items-center gap-1">
           <Clock className="w-4 h-4" />
           <span>{'duration'}</span>
         </div>
       </div>

     
       <h3 className="text-lg font-bold mb-2">{'title'}</h3>
       
      
       <p className="text-sm text-gray-600 mb-4">{'description'}</p>
     </CardHeader>

     <CardFooter className="p-4 flex items-center justify-between border-t">
    
       <div className="flex items-center gap-2">
         <img
          
           className="w-8 h-8 rounded-full"
         />
         <span className="text-sm font-medium">{'instructor.name'}</span>
       </div>

      
       <div className="text-right">
         <span className="text-blue-500 font-bold">{'price'}</span>
       </div>
     </CardFooter>
   </Card>
    </div>
  )
}

export default Wallet
