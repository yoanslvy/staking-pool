"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function StakeForm() {
  const [amount, setAmount] = useState("");

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-slate-800">Stake SOL</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-white border-slate-200"
        />
        <Button className="w-full bg-[#2A9D8F] text-white hover:bg-[#238177]">
          Stake
        </Button>
      </CardContent>
    </Card>
  );
}
