"use client";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { Briefcase } from "lucide-react";
import { getAllQuotes } from "@lib/sanityActions";
import { Separator } from "@components/ui/separator";
import { ScrollArea } from "@components/ui/scroll-area";
import { formatDate } from "@lib/formatDate";
import Link from "next/link";
import { cn } from "@lib/utils";

const QuoteSlide = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await getAllQuotes();
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error.message);
      }
    };

    fetchQuotes();
  }, []);
  let content;
  content = quotes?.map((q) => (
    <div key={q._id}>
      <div className="flex justify-between items-center my-2 mt-3 bg-muted px-3 py-2 rounded-md">
        <p className="font-medium capitalize">{q.category}</p>
        <p className="text-primary">{q.budget}</p>
        <p className="text-gray-500">{formatDate(q._createdAt)}</p>
      </div>
      <Separator />
    </div>
  ));

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={"drop-shadow-md text-white "} variant="ghost">
          <Briefcase />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col ">
        <SheetHeader>
          <SheetTitle>Your Submited Quotes</SheetTitle>

          <Link
            className={cn(buttonVariants(), "w-full")}
            href="/dashboard/getquote"
          >
            <SheetClose className="w-full">Get a Quote</SheetClose>
          </Link>
        </SheetHeader>
        <ScrollArea className="flex-1">
          {!quotes?.length ? (
            <h1 className="text-xl mt-10 text-center text-primary font-medium">
              No Quote
            </h1>
          ) : (
            content
          )}
        </ScrollArea>
        <SheetFooter>
          <div className="flex justify-between items-center w-full">
            <h1 className="text-primary flext items-center">
              {quotes?.length ? quotes?.length : ""}
              {quotes?.length > 1
                ? "quotes"
                : quotes?.length > 0
                ? "quote"
                : ""}
            </h1>
            <span>&copy;{new Date().getUTCFullYear()}</span>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default QuoteSlide;
