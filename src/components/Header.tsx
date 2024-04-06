"use client";
import Link from "next/link";
import { menuLinks } from "@/data/constants";
import { useContext, useEffect, useState } from "react";
import Container from "./Container";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import OktoWalletContainer from "./oktoWallet/OktoWalletContainer";
import Image from "next/image";
import { WalletButton } from "./solana/solana-provider";

function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showWallet, setShowWallet] = useState(false);

  useEffect(() => {
    console.log(session);
  }, [session]);

  function handleButtonClick() {
    if (session) {
      setShowWallet(true);
    } else {
      signIn();
    }
  }

  return (
    <nav className="z-10 w-full absolute bg-transparent hidden lg:block">
      <OktoWalletContainer show={showWallet} setShow={setShowWallet} />
      <Container>
        <div className="flex flex-wrap items-center justify-between pt-2 gap-6 md:gap-0 relative">
          <div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
            <Link
              href="/"
              aria-label="logo"
              className="flex space-x-2 items-center"
            >
              <Image
                src="/bitbirdie_logo.jpeg"
                alt="logo"
                className="h-10 w-10 rounded-full"
                width={32}
                height={32}
              />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                BitBirdie
              </span>
            </Link>
          </div>

          <div className="flex-col z-20 flex-wrap gap-6 p-8 rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 justify-end w-full invisible opacity-0 translate-y-1 absolute top-full left-0 transition-all duration-300 scale-95 origin-top lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none dark:shadow-none dark:border-gray-700">
            {!pathname.includes("/chats") && (
              <div className="text-gray-600 dark:text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
                <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                  {menuLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="block md:px-4 transition hover:text-primary"
                      >
                        <span>{link.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <WalletButton />
            {/* {!showWallet && (
              <div className="flex space-x-2 mt-12 lg:mt-0">
                <button
                  onClick={() => {
                    handleButtonClick();
                  }}
                  className="relative border rounded-lg flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-sm font-semibold text-white">
                    Open Wallet
                  </span>
                </button>
              </div>
            )} */}
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Header;
