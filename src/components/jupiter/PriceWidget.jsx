import { useWallet } from "@solana/wallet-adapter-react";
import { assets, getAssetByName } from "@/data/solanaAssests";
import { VersionedTransaction, Connection } from "@solana/web3.js";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { AssetBox } from "./AssetBox";

export function PriceWidget({ from, to }) {
  const fromAsset = getAssetByName(from);
  const toAsset = getAssetByName(to);
  const fromAmount = 1;
  const [toAmount, setToAmount] = useState(null);

  async function getPrice() {
    const quote = await (
      await fetch(
        `https://price.jup.ag/v4/price?ids=${fromAsset.name}&vsToken=${toAsset.name}`
      )
    ).json();

    // console.log(quote)
    if (quote && quote.data) {
      setToAmount(quote.data[fromAsset.name].price);
    }
  }

  useEffect(() => {
    getPrice();
    const intervalId = setInterval(() => {
      getPrice();
    }, 1000);
    // Clean up function to clear the interval when the component unmounts or when the dependencies change
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-slate-700 rounded-xl px-6 py-3 flex flex-col items-center space-y-4">
      <div className="text-xl font-semibold">Market Price</div>

      {toAmount ? (
        <div className="flex items-center justify-center space-x-3">
          <AssetBox
            name={fromAsset.name}
            amount={fromAmount}
            img={fromAsset.img}
          />
          <ArrowRightIcon className="h-4 w-4 text-violet-300" />
          <AssetBox name={toAsset.name} amount={toAmount} img={toAsset.img} />
        </div>
      ) : null}

      <div className="flex space-x-2 justify-center">
        <div className="text-sm">Powered by Jupiter</div>
        <Image src="/jupiter-logo.svg" width={16} height={16} />
      </div>
    </div>
  );
}
