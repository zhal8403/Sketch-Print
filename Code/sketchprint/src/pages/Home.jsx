import { useState } from "react";

import Toolbar from "../components/Toolbar";
import DrawingCanvas from "../components/DrawingCanvas";

import "../styles/Home.css";


function Home(){

    const [tool,setTool] = useState("pencil");

    const [actions,setActions] = useState(null);


    return(
        <div className="home">

            <Toolbar
                tool={tool}
                setTool={setTool}
                actions={actions}
            />


            <DrawingCanvas
                tool={tool}
                setActions={setActions}
            />


        </div>
    );

}


export default Home;