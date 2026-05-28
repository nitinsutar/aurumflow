import { Bot, Send } from "lucide-react";
import { Section } from "@/components/ui";

const prompts = ["Show pending job cards", "Show gold stock by karat", "Show material issued to Iqbal", "Show delayed orders", "Show wastage this month", "Suggest reorder items", "Summarize production status"];

export default function AssistantPage() {
  return <div className="space-y-6"><h1 className="text-2xl font-semibold text-ink">AI Assistant Placeholder</h1><Section title="Smart Operations Assistant"><div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]"><div className="space-y-2">{prompts.map((prompt) => <button className="w-full rounded-md border border-slate-200 px-3 py-2 text-left text-sm hover:bg-slate-50" key={prompt}>{prompt}</button>)}</div><div className="rounded-lg bg-slate-50 p-4"><div className="mb-4 flex items-center gap-2 text-sm font-medium text-ink"><Bot className="h-4 w-4" /> Mock response</div><div className="space-y-3 text-sm text-slate-600"><p>There are 8 open job cards. 3 are delayed, 2 are in stone setting, and 1 is in rework. Gold stock by karat: 24K 580.42g, 22K 920.70g, 18K 410.25g.</p><p>Suggested reorder: 18K alloy and platinum 950 based on approved orders and current production reservations.</p></div><form className="mt-6 flex gap-2"><input className="flex-1" placeholder="Ask about stock, karigars, delayed orders, or wastage" /><button className="inline-flex items-center justify-center rounded-md bg-ink px-4 text-white"><Send className="h-4 w-4" /></button></form></div></div></Section></div>;
}
