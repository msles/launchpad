import { Client } from "../api";
import ActiveMode from "./ActiveMode";
import GuestPage from "./GuestPage";

function Home(props: {client: Client}) {
  return <div>
    <ActiveMode client={props.client}/>
    <GuestPage/>
  </div>
}

export default Home;