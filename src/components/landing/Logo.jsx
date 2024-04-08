import Link from "next/link";
export default function Logo() {
  return (
    <div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
      <Link href="/" aria-label="logo" className="flex space-x-2 items-center">
        <img
          src="/bitbirdie2.png"
          alt="logo"
          className="h-[3.04rem] w-[3.87rem] "
        />
        <span className="text-xl font-bold text-[#F1F5F9] font-kumbhsans">BitBirdie</span>
      </Link>
    </div>
  );
}
