import { Client } from "../api";
import { useCurrentMode } from "../api/hooks/useCurrentMode";
import { ModeType } from "../api/mode";
import { Draw } from "./draw";
import { Pong } from "./pong";

function ActiveMode(props: {client: Client}) {
  const {client} = props;
  const mode = useCurrentMode(client);
  switch (mode) {
    case ModeType.draw:
      return <Draw client={client}/>;
    case ModeType.pong:
      return <Pong client={client}/>;
    default:
      return <></>;
  }
}

export default ActiveMode;