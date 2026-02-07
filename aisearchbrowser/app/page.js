import { Button } from "@/components/ui/button";
import Image from "next/image";
import ChatInputbox from "./_Components/ChatInputbox";

export default function Home() {
  return (
    <div className="w-full">
     {/* chatinput box */}
     <ChatInputbox />
    </div>
  );
}
