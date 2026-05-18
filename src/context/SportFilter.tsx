import { createContext, useContext, useState, type ReactNode } from "react";

interface SportFilterCtx {
  sport: string;
  setSport: (s: string) => void;
}

const Ctx = createContext<SportFilterCtx | null>(null);

export function SportFilterProvider({ children }: { children: ReactNode }) {
  const [sport, setSport] = useState<string>("all");
  return <Ctx.Provider value={{ sport, setSport }}>{children}</Ctx.Provider>;
}

export function useSportFilter() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSportFilter must be used within SportFilterProvider");
  return ctx;
}
