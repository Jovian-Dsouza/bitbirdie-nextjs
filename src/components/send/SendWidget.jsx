import SystemMesage from "@/components/SystemMessage";
import { useWallet } from "@solana/wallet-adapter-react";
import { assets, getAssetByName } from "@/data/solanaAssests";
import {
  VersionedTransaction,
  Connection,
  Transaction,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import { ArrowDownIcon } from "@heroicons/react/24/solid";
import { AssetBox } from "@/components/jupiter/AssetBox";

const formatToAddress = (address) => {
  const n = 6;
  const formattedAddress =
    address.substring(0, n) +
    "..." +
    address.substring(address.length - n, address.length);
  return formattedAddress;
};
sendAndConfirmTransaction;
export function SendWidget({ fromToken, toAddress, amountIn }) {
  const fromAsset = getAssetByName(fromToken);
  const { publicKey, sendTransaction, signTransaction } = useWallet();
  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC);

  async function handleSend() {
    console.log("sending");
    try {
      if (!publicKey) {
        alert("Please connect wallet");
        return;
      }
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(toAddress),
          lamports: amountIn * LAMPORTS_PER_SOL, // Convert SOL to lamports
        })
      );
      let blockhash = (await connection.getLatestBlockhash("finalized"))
        .blockhash;
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;
      const signedTransaction = await signTransaction(transaction);
      
      const rawTransaction = signedTransaction.serialize();
      const signature = sendTransaction(rawTransaction, connection);
      await connection.confirmTransaction(signature, "processed");
      console.log("Transaction confirmed:", signature);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  }

  return (
    <SystemMesage title="Send" onConfirm={handleSend}>
      <div className="flex flex-col items-center justify-center gap-3">
        <AssetBox name={fromAsset.name} amount={amountIn} img={fromAsset.img} />
        <ArrowDownIcon className="h-4 w-4" />
        <div className="info-box flex space-x-1">
          <div className="text-white font-bold">Address: </div>
          <div className="text-gray-300 font-bold">
            {formatToAddress(toAddress)}
          </div>
        </div>
      </div>
    </SystemMesage>
  );
}
