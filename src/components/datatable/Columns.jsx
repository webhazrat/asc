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
import CustomAvatar from "../common/CustomAvatar";
import Link from "next/link";

export const batchesColumns = (setBatchId, setBatchData) => [
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
    accessorKey: "examineeNumber",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          পরিক্ষার্থীর সংখ্যা
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "joinedNumber",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          জয়েন সংখ্যা
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
      const batch = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-6 w-6 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>শিক্ষার্থী</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setBatchData(batch)}>
              আপডেট
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 hover:!text-red-500"
              onClick={() => setBatchId(batch._id)}
            >
              ডিলিট
            </DropdownMenuItem>
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
    accessorKey: "fees",
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
    cell: ({ row }) => {
      const fees = row.getValue("fees").map((fee) => (
        <p key={fee.category}>
          {fee.category} - {fee.amount}
        </p>
      ));
      return fees;
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
            <DropdownMenuItem>
              <Link href={`/dashboard/events/participants/${event._id}`}>
                অংশগ্রহনকারী
              </Link>
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

export const batchStudentsColumns = () => [
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
    accessorKey: "avatar",
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
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <CustomAvatar
              avatar={
                row.getValue("avatar")
                  ? `/uploads/avatars/${row.getValue("avatar")}`
                  : ""
              }
              name={row.getValue("name")}
            />
          </div>
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          মোবাইল নাম্বার
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <a href={`tel:${row.getValue("phone")}`} className="text-primary">
          {row.getValue("phone")}
        </a>
      );
    },
  },
  {
    accessorKey: "presentAddress",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          বর্তমান ঠিকানা
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
          যোগদানের তারিখ
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
      const student = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              বিস্তারিত
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const participationsColumns = () => [
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
    accessorKey: "event.title",
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
    accessorKey: "fees",
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
    cell: ({ row }) => {
      const fees = row.getValue("fees").map((fee) => (
        <p key={fee.category}>
          {fee.category} - {fee.amount}
        </p>
      ));
      return fees;
    },
  },
  {
    accessorKey: "event.date",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ইভেন্টের তারিখ
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.event.date;
      return format(new Date(date), "dd MMMM yyyy");
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
          অংশগ্রহণের তারিখ
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
      const student = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              বিস্তারিত
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const studentsColumns = () => [
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
    accessorKey: "avatar",
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
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <CustomAvatar
              avatar={
                row.getValue("avatar")
                  ? `/uploads/avatars/${row.getValue("avatar")}`
                  : ""
              }
              name={row.getValue("name")}
            />
          </div>
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          মোবাইল নাম্বার
          <ChevronsUpDown size={12} className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <a href={`tel:${row.getValue("phone")}`} className="text-primary">
          {row.getValue("phone")}
        </a>
      );
    },
  },
  {
    accessorKey: "presentAddress",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          বর্তমান ঠিকানা
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
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          রোল
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
          যোগদানের তারিখ
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
      const student = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              বিস্তারিত
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              আপডেট
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
