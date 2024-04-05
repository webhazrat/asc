import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const accounts = [
  {
    id: "INV001",
    eventTitle: "রমজানে ইফতার কর্মসূচি 2023",
    collection: "50000",
    cost: "50000",
  },
  {
    id: "INV002",
    eventTitle: "রমজানে ইফতার কর্মসূচি 2022",
    collection: "50000",
    cost: "50000",
  },
  {
    id: "INV003",
    eventTitle: "রমজানে ইফতার কর্মসূচি 2021",
    collection: "50000",
    cost: "50000",
  },
  {
    id: "INV004",
    eventTitle: "রমজানে ইফতার কর্মসূচি 2020",
    collection: "50000",
    cost: "50000",
  },
];

export default function Calculation() {
  return (
    <div className="container pb-10">
      <h2 className="text-2xl font-bold mb-4 text-center">ইভেন্টের হিসাব</h2>

      <div className="border border-muted rounded-2xl backdrop-filter backdrop-blur-lg">
        <ScrollArea className="table-auto w-full">
          <Table className="rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ক্রমিক</TableHead>
                <TableHead>ইভেন্ট</TableHead>
                <TableHead>সর্বমোট কালেকশন</TableHead>
                <TableHead>খরচ</TableHead>
                <TableHead className="text-right">উদ্বৃত্ত/ঘাটতি</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.id}</TableCell>
                  <TableCell>{account.eventTitle}</TableCell>
                  <TableCell>{account.collection}</TableCell>
                  <TableCell>{account.cost}</TableCell>
                  <TableCell className="text-right">
                    {account.collection - account.cost}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm">বিস্তারিত</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
