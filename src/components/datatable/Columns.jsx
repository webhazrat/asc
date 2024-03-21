import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { format } from "date-fns";

export const batchesColumns = () => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          টাইটেল
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "passingYear",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          পাশের সাল
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "examinee",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          পরিক্ষার্থী
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "joined",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          জয়েন হয়েছে
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          তারিখ
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              শিক্ষার্থী
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const teachersColumns = () => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          নাম
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "designation",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          টাইটেল
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "subject",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          সাবজেক্ট
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "joined",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          যোগদানের তারিখ
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          অবস্থা
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          তারিখ
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              শিক্ষার্থী
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const eventsColumns = (setEventId, setEventData) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          টাইটেল
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "feeDetail",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ফি
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          স্থান
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ইভেন্ট তারিখ
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return format(new Date(row.getValue("date")), "dd MMMM yyyy");
    },
  },
  {
    accessorKey: "author.name",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          অথোর
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          স্ট্যাটাস
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          তারিখ
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return format(new Date(row.getValue("createdAt")), "dd MMMM yyyy");
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-6 w-6 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              অংশগ্রহনকারী
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEventData(event)}>
              আপডেট
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              আয় ব্যয়
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 hover:!text-red-500"
              onClick={() => setEventId(event._id)}
            >
              ডিলিট
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
