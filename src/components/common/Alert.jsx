import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export default function Alert({
  isAlertOpen,
  setIsAlertOpen,
  title,
  desciption,
  onContinue,
  variant,
}) {
  const variants = (variant) => {
    switch (variant) {
      case "success":
        return "text-green-500";
      case "destructive":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span className={variants(variant)}>{title}</span>
          </AlertDialogTitle>
          <AlertDialogDescription>{desciption}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>বাতিল</AlertDialogCancel>
          <AlertDialogAction onClick={onContinue}>ঠিক আছে</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
