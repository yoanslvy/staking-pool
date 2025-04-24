"use client";

import { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [connected, setConnected] = useState(false);

  const connectWallet = () => {
    setConnected(true);
  };

  return (
    <header className="sticky top-0 z-10 border-b border-[#d0e0d8] bg-[#e6f0eb]/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
            >
              <path
                d="M19 6.5C19 8.43 17.43 10 15.5 10C13.57 10 12 8.43 12 6.5C12 4.57 13.57 3 15.5 3C17.43 3 19 4.57 19 6.5Z"
                fill="#2A9D8F"
              />
              <path
                d="M15.5 13C18.54 13 21 15.46 21 18.5V21H10V18.5C10 15.46 12.46 13 15.5 13Z"
                fill="#2A9D8F"
              />
              <path
                d="M9 6.5C9 8.43 7.43 10 5.5 10C3.57 10 2 8.43 2 6.5C2 4.57 3.57 3 5.5 3C7.43 3 9 4.57 9 6.5Z"
                fill="#2A9D8F"
              />
              <path
                d="M5.5 13C8.54 13 11 15.46 11 18.5V21H0V18.5C0 15.46 2.46 13 5.5 13Z"
                fill="#2A9D8F"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-800">Solana Staking</h1>
        </div>

        {connected ? (
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm shadow-sm">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="font-medium text-slate-800">8Kvw...A3c9</span>
          </div>
        ) : (
          <Button
            onClick={connectWallet}
            className="rounded-full bg-[#2A9D8F] px-4 py-2 text-sm text-white hover:bg-[#238177]"
          >
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
}
