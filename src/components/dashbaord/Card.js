export default function Card({ card }) {
  return (
    <div className="border border-muted rounded-lg p-5 hover:outline outline-2 outline-primary outline-offset-2 cursor-pointer shadow-sm">
      <h4 className="font-semibold">{card.title}</h4>
      <p className="text-sm text-muted-foreground">
        এই সপ্তাহে 10+ {card.title}
      </p>
      <h2 className="text-xl font-bold mt-2">{card.amount}</h2>
    </div>
  );
}
