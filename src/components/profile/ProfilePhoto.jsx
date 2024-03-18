import { firstLetter } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ProfilePhoto({ avatar, name }) {
  return (
    <Avatar className="w-full h-full">
      <AvatarImage src={avatar?.src} alt={name} />
      <AvatarFallback>{firstLetter(name)}</AvatarFallback>
    </Avatar>
  );
}
