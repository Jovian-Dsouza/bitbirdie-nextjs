// import type {
//   WalletConnectChainID,
//   WalletConnectWallet,
//   WalletConnectWalletAdapterConfig as BaseWalletConnectWalletAdapterConfig,
// } from "@jnwng/walletconnect-solana";
import { signIn, signOut } from "next-auth/react";
import type { WalletName } from "@solana/wallet-adapter-base";
import {
  BaseSignerWalletAdapter,
  WalletAdapterNetwork,
  WalletConnectionError,
  WalletDisconnectedError,
  WalletDisconnectionError,
  WalletLoadError,
  WalletNotConnectedError,
  WalletNotReadyError,
  WalletReadyState,
  WalletSignMessageError,
  WalletSignTransactionError,
  WalletWindowClosedError,
} from "@solana/wallet-adapter-base";
import {
  PublicKey,
  Transaction,
  TransactionVersion,
  VersionedTransaction,
} from "@solana/web3.js";
import { Session } from "next-auth";
import OktoSDK from "./sdk";

export const OktoWalletName = "Okto" as WalletName<"Okto">;

export type OktoWalletAdapterConfig = {
  network: WalletAdapterNetwork.Mainnet | WalletAdapterNetwork.Devnet;
  session: Session & {id_token: string} | null;
  clientApiKey: string;
}; // & Pick<BaseWalletConnectWalletAdapterConfig, "options">;

export class OktoWalletAdapter extends BaseSignerWalletAdapter {
  name = OktoWalletName;
  url = "https://okto.tech/";
  icon = "https://bitbirdie.vercel.app/okto_logo.png";
  // V0 transactions are supported via the `transaction` parameter, and is off-spec.
  // Legacy transactions have these [parameters](https://docs.walletconnect.com/2.0/advanced/rpc-reference/solana-rpc#solana_signtransaction)
  readonly supportedTransactionVersions: ReadonlySet<TransactionVersion> =
    new Set(["legacy" as TransactionVersion, 0 as TransactionVersion]);

  private _publicKey: PublicKey | null;
  private _connecting: boolean;
  private _wallet: OktoSDK;
  private _config: OktoWalletAdapterConfig;
  private _readyState: WalletReadyState =
    typeof window === "undefined"
      ? WalletReadyState.Unsupported
      : WalletReadyState.Loadable;

  constructor(config: OktoWalletAdapterConfig) {
    super();

    this._publicKey = null;
    this._connecting = false;
    this._config = config;
    this._wallet = new OktoSDK({
      clientApiKey: this._config.clientApiKey,
      baseUrl: "https://sandbox-api.okto.tech",
    });
  }

  get publicKey() {
    return this._publicKey;
  }

  get connecting() {
    return this._connecting;
  }

  get readyState() {
    return this._readyState;
  }

  componentDidMount() {
    console.log("Okto component mounted");
  }

  async connect(): Promise<void> {
    try {
      if (this.connected || this.connecting) return;
      if (this._readyState !== WalletReadyState.Loadable)
        throw new WalletNotReadyError();
      this._connecting = true;
      console.log("Google session: ", this._config.session);
      if (!this._config.session) {
        try {
          signIn();
          return;
          // TODO after google sign in handle pin setting
        } catch (error: any) {
          throw new WalletConnectionError(error?.message, error);
        }
      }
      if (!this._config.session.id_token){
        throw new WalletConnectionError("ID token not found in session")
      }
      

    //   this._wallet.authenticate(this._config.session.id_token, (result, error) => {
    //     if (result) {
    //       console.log("result", JSON.stringify(result, null, 2));
    //       // test_getUserDetails();
    //     //   test_getWallets();
    //     }
    //     if (error) {
    //       console.error("Error: authenticate");
    //     }
    //   });

      const publicKey = new PublicKey(
        "4VWScaB5wELhcJGUtNS1P6csfnSV355LKMxzSDoSJzZc"
      ); //TODO replace with public key address
      this.emit("connect", publicKey);
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    } finally {
      this._connecting = false;
    }
  }

  async disconnect(): Promise<void> {
    // const wallet = this._wallet;
    // if (wallet) {
    //   wallet.client.off("session_delete", this._disconnected);

    //   this._wallet = null;
    //   this._publicKey = null;

    //   try {
    //     await wallet.disconnect();
    //   } catch (error: any) {
    //     this.emit("error", new WalletDisconnectionError(error?.message, error));
    //   }
    // }
    if (!this._config.session) {
      signOut()
    }

    this.emit("disconnect");
  }

  async signTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T
  ): Promise<T> {
    // try {
    //   const wallet = this._wallet;
    //   if (!wallet) throw new WalletNotConnectedError();

    //   try {
    //     return (await wallet.signTransaction(transaction)) as T;
    //   } catch (error: any) {
    //     throw new WalletSignTransactionError(error?.message, error);
    //   }
    // } catch (error: any) {
    //   this.emit("error", error);
    //   throw error;
    // }
    throw Error;
  }

  async signMessage(message: Uint8Array): Promise<Uint8Array> {
    // try {
    //   const wallet = this._wallet;
    //   if (!wallet) throw new WalletNotConnectedError();

    //   try {
    //     return await wallet.signMessage(message);
    //   } catch (error: any) {
    //     throw new WalletSignMessageError(error?.message, error);
    //   }
    // } catch (error: any) {
    //   this.emit("error", error);
    //   throw error;
    // }
    throw Error;
  }

  private _disconnected = () => {
    // const wallet = this._wallet;
    // if (wallet) {
    //   wallet.client.off("session_delete", this._disconnected);

    //   this._wallet = null;
    //   this._publicKey = null;
    // if (!this._config.session) {
    //   signOut();
    // }

    this.emit("error", new WalletDisconnectedError());
    this.emit("disconnect");
    // }
  };
}
