import React from "react";
import Image from "next/image";

function SystemMesage({ children }: any) {
  const displayName = "BitBirdie";
  const avatar = "/bitbirdie_logo.jpeg";

  return (
    <div className={`py-4 text-white`}>
      <div className="flex space-x-4 px-10 max-w-2xl mx-auto">
        <Image
          src={avatar}
          alt=""
          className="h-6 w-6 rounded-full"
          width={32}
          height={32}
        />
        <div className="flex flex-col">
          {/* <div className="text-md font-bold">{displayName}</div> */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default SystemMesage;
