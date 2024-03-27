import { useCountDownTimer } from "@/hooks/useCountDownTimer";

export default function EventCountDown({ endDate }) {
  const { days, hours, minutes } = useCountDownTimer(endDate);

  return (
    <div className="absolute bottom-2 left-2 backdrop-filter backdrop-blur-sm bg-white/70 rounded-lg">
      <ul className="flex divide-x-[1px] divide-gray-50/30">
        <li className="py-2 px-5">
          {days} <div>দিন</div>
        </li>
        <li className="py-2 px-5">
          {hours} <div>ঘন্টা</div>
        </li>
        <li className="py-2 px-5">
          {minutes} <div>মিনিট</div>
        </li>
      </ul>
    </div>
  );
}
