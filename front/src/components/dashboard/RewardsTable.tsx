import { Select } from "../ui/select";
import { SelectContent } from "../ui/select-content";
import { SelectItem } from "../ui/select-item";
import { SelectTrigger } from "../ui/select-trigger";
import { SelectValue } from "../ui/select-value";

export function RewardsTable() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-slate-800">Recent Rewards</h3>
        <Select defaultValue="all">
          <SelectTrigger className="w-[120px] border-slate-200 bg-white text-sm">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rewards</SelectItem>
            <SelectItem value="claimed">Claimed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-slate-200">
        <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-500">
          <div>Date</div>
          <div>Amount</div>
          <div>Type</div>
          <div>Status</div>
        </div>

        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="grid grid-cols-4 border-b border-slate-200 p-3 text-sm last:border-0"
          >
            <div>Apr {3 - i}, 2025</div>
            <div className="font-medium">
              0.{Math.floor(Math.random() * 15) + 10} SOL
            </div>
            <div>Daily Reward</div>
            <div>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                Claimed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
