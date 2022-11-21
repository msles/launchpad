import React from "react";
import { Client } from "../api";
import { useLayout } from "../api/hooks/useLayout";
import { Layout } from "../api/layout";

export const LayoutContext = React.createContext<Layout>([]);

export function LayoutProvider(props: {client: Client, children?: React.ReactNode}) {
  const {client, children} = props;
  const layout = useLayout(client);
  return <LayoutContext.Provider value={layout}>
    { children }
  </LayoutContext.Provider>
}
