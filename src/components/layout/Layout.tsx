import { useContext } from 'react';
import { Display, Position } from '../../api/layout';
import { LayoutContext } from "../../context/LayoutContext";
import DraggableBox from './DraggableBox';
import { Client } from '../../api/client';


function Layout(props: {client: Client}) {

    const layout = useContext(LayoutContext);

    const submitLayoutChange = async (display: Display, position: Position) => {
        const channel = props.client.channel('layout');
        const done = channel.next(); // the change is complete once the next layout message is received
        channel.send({id: display.id, position});
        return done as Promise<void>;
    }

    const displays = layout.map(({display, position}, index) => 
        <DraggableBox key={index} display={display} position={position}
            onChange={changedPosition => submitLayoutChange(display, changedPosition)}/>);

    return <div className="border border-dark border-3 rounded container-lg" style={{ position: 'relative', height: '50vh', padding: '10px', marginBottom: '20px', marginTop: '20px'}}>
        {displays}
    </div>
}

export default Layout;