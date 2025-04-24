"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select-content";
import { SelectItem } from "@/components/ui/select-item";
import { SelectTrigger } from "@/components/ui/select-trigger";
import { SelectValue } from "@/components/ui/select-value";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { useMemo } from "react";

interface Transaction {
  id: string;
  type: "stake" | "unstake" | "reward";
  amount: string;
  date: string;
  status: "completed" | "pending";
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

export function TransactionHistory({
  transactions,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 5,
}: TransactionHistoryProps) {
  const currentTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return transactions.slice(start, start + itemsPerPage);
  }, [transactions, currentPage, itemsPerPage]);

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-slate-800">Transaction History</CardTitle>
        <Select defaultValue="all">
          <SelectTrigger className="w-[120px] border-slate-200 bg-white text-sm">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="stake">Stake</SelectItem>
            <SelectItem value="unstake">Unstake</SelectItem>
            <SelectItem value="reward">Reward</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border border-slate-200">
          <div className="grid grid-cols-5 border-b border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-500">
            <div>Type</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Status</div>
            <div className="text-right">Action</div>
          </div>

          {currentTransactions.map((tx) => (
            <div
              key={tx.id}
              className="grid grid-cols-5 border-b border-slate-200 p-3 text-sm last:border-0"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`rounded-full p-1 ${
                    tx.type === "stake"
                      ? "bg-green-100 text-green-700"
                      : tx.type === "reward"
                      ? "bg-[#2A9D8F]/20 text-[#2A9D8F]"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {tx.type === "stake" ? (
                    <CreditCard className="h-3 w-3" />
                  ) : tx.type === "reward" ? (
                    <DollarSign className="h-3 w-3" />
                  ) : (
                    <ArrowUpRight className="h-3 w-3" />
                  )}
                </div>
                <span className="capitalize">{tx.type}</span>
              </div>
              <div>{tx.amount}</div>
              <div>{tx.date}</div>
              <div>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    tx.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {tx.status === "completed" ? "Completed" : "Pending"}
                </span>
              </div>
              <div className="text-right">
                <Button
                  variant="default"
                  size="sm"
                  className="h-8 text-[#2A9D8F]"
                >
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, transactions.length)} of{" "}
            {transactions.length} transactions
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-8 border-slate-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum =
                  currentPage <= 3
                    ? i + 1
                    : currentPage >= totalPages - 2
                    ? totalPages - 4 + i
                    : currentPage - 2 + i;

                if (pageNum <= totalPages && pageNum > 0) {
                  return (
                    <Button
                      key={i}
                      variant={pageNum === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => onPageChange(pageNum)}
                      className={`h-8 w-8 p-0 ${
                        pageNum === currentPage
                          ? "bg-[#2A9D8F] text-white"
                          : "border-slate-200"
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                }
                return null;
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="h-8 border-slate-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
