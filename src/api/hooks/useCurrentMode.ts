import { useEffect, useState } from "react";
import { Client } from "../client";
import { ModeType } from "../mode";

export function useCurrentMode(client: Client): ModeType|undefined {
  const [mode, setMode] = useState<ModeType|undefined>(undefined);
  useEffect(() => {
    const subscription = client.currentMode.subscribe(setMode);
    return () => subscription.unsubscribe();
  }, [client]);
  return mode;
}