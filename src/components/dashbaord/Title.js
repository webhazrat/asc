export default function Title({ title, children }) {
  return (
    <div className="flex items-center gap-4 justify-between">
      <h1 className="text-lg font-bold">{title}</h1>
      {children}
    </div>
  );
}
