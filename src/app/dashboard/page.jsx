import Card from "@/components/dashbaord/Card";
import Title from "@/components/dashbaord/Title";

const cards = [
  {
    id: 1,
    title: "শিক্ষার্থী",
    amount: 200,
  },
  {
    id: 2,
    title: "শিক্ষকগণ",
    amount: 20,
  },
  {
    id: 3,
    title: "ইভেন্টস",
    amount: 4,
  },
  {
    id: 4,
    title: "ব্যাচসমূহ",
    amount: 10,
  },
];

export default function Page() {
  return (
    <>
      <Title title="ড্যাশবোর্ড" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </>
  );
}
