import React from 'react'
import Image from "next/image"

function BrianAsk({message_details}) {

  return (
    <div className="bg-slate-700 rounded-xl px-6 py-3 flex flex-col items-center space-y-4">
      <div className="text-xl font-semibold">Ask Brian</div>
      <p className="text-sm whitespace-pre-line">{message_details}</p>
      <div className="flex space-x-2 justify-center items-center">
        <div className="text-xs text-gray-300">Powered by brianknows.org</div>
        <Image src="/brian_logo.png" width={22} height={22} />
      </div>
    </div>
  );
}

export default BrianAsk