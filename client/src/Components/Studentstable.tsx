import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function Studentstable() {
  const [search, setSearch] = useState("");
  return (
    <>
     <div className="flex items-center justify-between space-y-2">
        <div>
          <div className="text-white">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here is the list of courses of your...
            </p>
          </div>
        </div>
        <div>
          <div className="text-white flex gap-2">
            <div>
              <Input
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                className="md:w-[100px] lg:w-[300px] bg-black text-white"
              />
            </div>
            <Select >
          <SelectTrigger id="framework" className="h-10 w-[50px] lg:w-[150px] text-black">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Old">Old</SelectItem>
            <SelectItem value="Name - A-Z">Name - A-Z</SelectItem>
            <SelectItem value="Name Z-A">Name Z-A</SelectItem>
            <SelectItem value="Price Low - Highy">Price Low - Highy</SelectItem>
            <SelectItem value="Name Highy - Low">Name Highy - Low</SelectItem>
          </SelectContent>
        </Select>
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>email</TableHead>
                <TableHead>name</TableHead>
                <TableHead>Joined At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-white">
              <TableRow>
                <TableCell>ansifpk@gmail.com</TableCell>
                <TableCell>ansifpk</TableCell>
                <TableCell>12/33/2/354</TableCell>
                <TableCell>block</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-black" variant="outline">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 ">
                      <DropdownMenuItem>List</DropdownMenuItem>
                      <DropdownMenuItem>Detailes</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
