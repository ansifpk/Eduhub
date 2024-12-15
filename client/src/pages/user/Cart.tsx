import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import school from "../../assets/home-page/lovely-teenage-girl-with-curly-hair-posing-yellow-tshirt-min 1.png";
import tec from "../../assets/home-page/3099563.jpg";
import { Separator } from "@/Components/ui/separator";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import course from "@/service/course";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-select";
const Cart = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-center gap-5 mt-5">
        <div className="w-[500px] h-[170px] bg-blue-50  rounded-2 border shadow-lg">
          <div className="flex">
          <div className="flex w-[350px] overflow-hidden h-[130px]  ">
          <img
            src={tec}
            // src={school}
            width={"200px"}
            height={"150px"}
            alt={"review.name"}
            className="h-[120px]  w-[200px]  object-fill border m-1 rounded-2"
          />
         <div className="flex justify-center items-center">
          <div>
          <p className="font-medium text-xs text-muted-foreground">Category: hi <br /><br />Topic: hi <br /><br /> instructor: hi</p>
          </div>
        </div>
          </div>
          
          <div>
            <p>Price</p>
            <p className="font-medium text-xs text-muted-foreground">RS : 500</p>
          </div>
          </div>
          <p className="text-black">title</p>
        </div>
        <div className="w-[300px]  h-[190px] bg-green-50  rounded-2 border shadow-lg">
         <div className="m-2">
         <p className="font-medium text-s text-muted-foreground">Sub totall</p>
          <Separator className="my-1" />
          <p className="font-medium text-s text-muted-foreground">Coupoun Descount</p>
          <Separator className="my-1" />
          <p className="font-medium ">Totall</p>
        
          <Button type="button" className="w-full bg-[#49BBBD] text-white ">purchase</Button>
         </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
