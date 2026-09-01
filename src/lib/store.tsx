import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultBusiness, type Bill, type Business, type MenuItem } from "./types";

const KEYS = {
  business: "billo.business",
  menu: "billo.menu",
  bills: "billo.bills",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? ({ ...(fallback as object), ...JSON.parse(raw) } as T) : fallback;
  } catch {
    return fallback;
  }
}

function readList<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

type StoreValue = {
  ready: boolean;
  business: Business;
  saveBusiness: (b: Business) => void;
  menu: MenuItem[];
  setMenu: (items: MenuItem[]) => void;
  bills: Bill[];
  setBills: (bills: Bill[]) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [business, setBusiness] = useState<Business>(defaultBusiness);
  const [menu, setMenuState] = useState<MenuItem[]>([]);
  const [bills, setBillsState] = useState<Bill[]>([]);

  useEffect(() => {
    setBusiness(read<Business>(KEYS.business, defaultBusiness));
    setMenuState(readList<MenuItem>(KEYS.menu));
    setBillsState(readList<Bill>(KEYS.bills));
    setReady(true);
  }, []);

  const saveBusiness = useCallback((b: Business) => {
    setBusiness(b);
    window.localStorage.setItem(KEYS.business, JSON.stringify(b));
  }, []);

  const setMenu = useCallback((items: MenuItem[]) => {
    setMenuState(items);
    window.localStorage.setItem(KEYS.menu, JSON.stringify(items));
  }, []);

  const setBills = useCallback((next: Bill[]) => {
    setBillsState(next);
    window.localStorage.setItem(KEYS.bills, JSON.stringify(next));
  }, []);

  return (
    <StoreContext.Provider
      value={{ ready, business, saveBusiness, menu, setMenu, bills, setBills }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
