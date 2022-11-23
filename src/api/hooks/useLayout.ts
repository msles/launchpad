import { useEffect, useState } from "react";
import { Client } from "../client";
import { Layout } from "../layout";

export function useLayout(client: Client): Layout {
  const [layout, setLayout] = useState<Layout>(client.layout.latest);
  useEffect(() => {
    setLayout(client.layout.latest);
    const subscription = client.layout.observable.subscribe(setLayout);
    return () => subscription.unsubscribe();
  }, [client]);
  return layout;
}