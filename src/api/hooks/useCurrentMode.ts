import { useEffect, useState } from "react";
import { Client } from "../client";
import { ModeType } from "../mode";

export function useCurrentMode(client: Client): ModeType|undefined {
  const [mode, setMode] = useState<ModeType|undefined>(client.currentMode.latest);
  useEffect(() => {
    setMode(client.currentMode.latest);
    const subscription = client.currentMode.observable.subscribe(setMode);
    return () => subscription.unsubscribe();
  }, [client]);
  return mode;
}