import Image from "next/image";

export default function Student({ student }) {
  return (
    <div className="border border-muted rounded-lg p-4 space-y-3 hover:outline outline-2 outline-primary outline-offset-2 cursor-pointer">
      <Image
        src={student.image ? `/${student.image}` : "/placeholder.png"}
        width={100}
        height={100}
        alt="student"
        className="rounded-full m-auto"
      />
      <div className="text-center">
        <h4>{student.name}</h4>
        <a href={`tel:88${student.phone}`}>{student.phone}</a>
      </div>
    </div>
  );
}
