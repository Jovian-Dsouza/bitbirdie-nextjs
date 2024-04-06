import { useWallet } from "@solana/wallet-adapter-react";
import { assets, getAssetByName } from "@/data/solanaAssests";
import { VersionedTransaction, Connection } from "@solana/web3.js";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export function SwapWidget({ from, to, fromAmount }) {
  const fromAsset = getAssetByName(from);
  const toAsset = getAssetByName(to);
  const [toAmount, setToAmount] = useState(0);
  const [quoteResponse, setQuoteResponse] = useState(null);
  const wallet = useWallet();
  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC);

  async function getQuote(currentAmount) {
    if (isNaN(currentAmount) || currentAmount <= 0) {
      console.error("Invalid fromAmount value:", currentAmount);
      return;
    }

    const quote = await (
      await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${
          fromAsset.mint
        }&outputMint=${toAsset.mint}&amount=${
          currentAmount * Math.pow(10, fromAsset.decimals)
        }&slippage=0.5`
      )
    ).json();

    if (quote && quote.outAmount) {
      const outAmountNumber =
        Number(quote.outAmount) / Math.pow(10, toAsset.decimals);
      setToAmount(outAmountNumber);
    }

    setQuoteResponse(quote);
  }

  async function signAndSendTransaction() {
    console.log("Sign and send transaction done")
    if (!wallet.connected || !wallet.signTransaction) {
      console.error(
        "Wallet is not connected or does not support signing transactions"
      );
      return;
    }

    // get serialized transactions for the swap
    const { swapTransaction } = await (
      await fetch("https://quote-api.jup.ag/v6/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteResponse,
          userPublicKey: wallet.publicKey?.toString(),
          wrapAndUnwrapSol: true,
          // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
          // feeAccount: "fee_account_public_key"
        }),
      })
    ).json();

    try {
      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      const signedTransaction = await wallet.signTransaction(transaction);

      const rawTransaction = signedTransaction.serialize();
      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        {
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: txid,
        },
        "confirmed"
      );

      console.log(`https://solscan.io/tx/${txid}`);
    } catch (error) {
      console.error("Error signing or sending the transaction:", error);
    }
  }

  useEffect(()=>{
    getQuote(fromAmount)
  }, [])

  return (
    <div className="bg-slate-700 rounded-xl px-6 py-3 flex flex-col items-center space-y-4">
      <div className="text-xl font-semibold">Swap</div>

      <div className="flex items-center justify-center space-x-3">
        <AssetBox
          name={fromAsset.name}
          amount={fromAmount}
          img={fromAsset.img}
        />
        <ArrowRightIcon className="h-4 w-4 text-violet-300" />
        <AssetBox name={toAsset.name} amount={toAmount} img={toAsset.img} />
      </div>

      <button
        onClick={signAndSendTransaction}
        className="bg-violet-400 font-bold text-white px-4 py-2 mt-4 rounded-xl"
      >
        Confirm
      </button>
      <div className="flex space-x-2 justify-center">
        <div className="text-sm">Powered by Jupiter</div>
        <Image src="/jupiter-logo.svg" width={16} height={16}/>
      </div>
    </div>
  );
}

function AssetBox({img, amount, name}){
  const roundedAmount = parseFloat(amount).toFixed(4);
  return (
    <div className="flex bg-[#17183C] px-2 py-1 rounded border border-violet-300 items-center justify-center space-x-2">
      <Image
        src={img}
        alt=""
        className="h-6 w-6 rounded-full"
        width={32}
        height={32}
      />
      <div className="font-semibold">{roundedAmount}</div>
      <div className="">{name}</div>
    </div>
  );
}