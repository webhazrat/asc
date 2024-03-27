import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";

export default function ShowPasswordAction({ showPassword, setShowPassword }) {
  return (
    <Button
      type="button"
      variant="link"
      className="absolute top-0 right-0"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
    </Button>
  );
}
