import { useEffect, useState } from "react";
import { Client } from "../client";
import { Layout } from "../layout";

export function useLayout(client: Client): Layout {
  const [layout, setLayout] = useState<Layout>([]);
  useEffect(() => {
    const subscription = client.layout.subscribe(setLayout);
    return () => subscription.unsubscribe();
  }, [client]);
  return layout;
}