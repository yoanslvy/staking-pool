"use client";

import Header from "@/components/dashboard/Header";
import StakeForm from "@/components/dashboard/StakeForm";
import { TransactionHistory } from "@/components/dashboard/TransactionHistory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePagination } from "./hooks/usePagination";
import { Transaction } from "@solana/web3.js";

export default function Page() {
  type Transaction = {
    id: string;
    type: "stake" | "unstake" | "reward";
    amount: string;
    date: string;
    status: "completed" | "pending";
  };

  const transactions: Transaction[] = [
    {
      id: "tx-001",
      type: "stake",
      amount: "12.45 SOL",
      date: "2025-04-20",
      status: "completed",
    },
    {
      id: "tx-002",
      type: "reward",
      amount: "0.0345 SOL",
      date: "2025-04-21",
      status: "completed",
    },
    {
      id: "tx-003",
      type: "unstake",
      amount: "5.20 SOL",
      date: "2025-04-22",
      status: "pending",
    },
  ];

  const {
    currentData: paginatedTransactions,
    currentPage,
    totalPages,
    goToPage,
  } = usePagination({
    data: transactions,
    itemsPerPage: 5,
  });

  return (
    <div className="min-h-screen bg-[#e6f0eb]">
      <Header />
      <main className="px-4 py-8">
        {/* Stat cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Total Staked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">245.8 SOL</div>
              <div className="flex items-center text-xs text-green-600">
                +12.5% from last week
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Current APY
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">7.2%</div>
              <div className="flex items-center text-xs text-green-600">
                +0.3% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stake form */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <StakeForm />
        </div>

        {/* Transaction history */}
        <div className="mt-8">
          <TransactionHistory
            transactions={paginatedTransactions}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </div>
      </main>
    </div>
  );
}
