import { SERVER_URL, firstLetter } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ProfilePhoto({ avatar, name }) {
  return (
    <Avatar className="w-full h-full">
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback>{firstLetter(name)}</AvatarFallback>
    </Avatar>
  );
}
