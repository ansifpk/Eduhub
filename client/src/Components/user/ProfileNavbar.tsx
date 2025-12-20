import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { NavLink } from "react-router-dom";

const ProfileNavbar = ({value}:{value:string}) => {
    
  return (
    <div className="flex justify-center mt-5">

      <Tabs defaultValue={value} className="flex items-cente">
        <TabsList className="bg-teal-500 text-white">
          <TabsTrigger value="Profile">
            <NavLink to={"/user/profile"}>Profile</NavLink>
          </TabsTrigger>
          <TabsTrigger  value="Courses">
            <NavLink  to={"/user/profile/course"}>Courses</NavLink>
          </TabsTrigger>
          <TabsTrigger  value="Messages">
            <NavLink to={"/user/profile/message"}>Messages</NavLink>
          </TabsTrigger>
          <TabsTrigger  value="Coupons">
            <NavLink to={"/user/profile/coupon"}>Coupons</NavLink>
          </TabsTrigger>
          <TabsTrigger  value="Plans">
            <NavLink to={"/user/profile/plan"}>Plans</NavLink>
          </TabsTrigger>
          <TabsTrigger value="Settings">
            <NavLink to={"/user/profile/settings"}>Settings</NavLink>
          </TabsTrigger>
        </TabsList>
      </Tabs>

    </div>
  );
};

export default React.memo(ProfileNavbar);
