import { firstLetter } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function CustomAvatar({ avatar, name }) {
  return (
    <Avatar className="w-full h-full">
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback>{firstLetter(name)}</AvatarFallback>
    </Avatar>
  );
}
