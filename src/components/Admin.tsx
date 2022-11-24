import { Button, ButtonGroup } from "react-bootstrap";
import { Client } from "../api";
import { useCurrentMode } from "../api/hooks/useCurrentMode";
import { ModeType } from "../api/mode";
import { Layout } from "./layout";

function Admin(props: {client: Client}) {
  const currentMode = useCurrentMode(props.client);
  const switchMode = props.client.channel<ModeType>('mode');
  return <div>
    <Layout client={props.client}/>
    <ButtonGroup>
      <Button onClick={() => switchMode.send(ModeType.draw)} disabled={currentMode === ModeType.draw}>Draw</Button>
      <Button onClick={() => switchMode.send(ModeType.pong)} disabled={currentMode === ModeType.pong}>Pong</Button>
    </ButtonGroup>
  </div>
}

export default Admin;