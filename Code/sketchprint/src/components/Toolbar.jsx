import "./Toolbar.css";
import { useRef } from "react";

import { generateGCode } from "../utils/gcode";

function Toolbar({ tool, setTool, actions }) {

    const fileInput =
    useRef();
    
    function handleImage(e){

    const file =
    e.target.files[0];


    if(file){

        console.log(
            "Selected file:",
            file
        );

        actions.loadImage(file);

    }

}
    
    function downloadGCode(){


    const shapes =
        actions.getShapes();


    const code =
        generateGCode(shapes);


    const blob =
        new Blob(
            [code],
            {type:"text/plain"}
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href=url;

    link.download="drawing.gcode";

    link.click();

}

    
    return (
        <div className="toolbar">

        <button
            className={tool === "pencil" ? "active" : ""}
            onClick={() => setTool("pencil")}
        >
            Free
        </button>

        <button
            className={tool === "line" ? "active" : ""}
            onClick={() => setTool("line")}
        >
            Line
        </button>

        <button
            className={tool === "rectangle" ? "active" : ""}
            onClick={() => setTool("rectangle")}
        >
            Rectangle
        </button>

        <button
            className={tool === "circle" ? "active" : ""}
            onClick={() => setTool("circle")}
        >
            Circle
        </button>

        <button
            className={tool==="ellipse"?"active":""}
            onClick={()=>setTool("ellipse")}
        >
            Oval
        </button>

        <button
            className={tool==="arc"?"active":""}
            onClick={()=>setTool("arc")}
        >
            Arc
        </button>

        <button
            className={tool==="roundedRectangle"?"active":""}
            onClick={()=>setTool("roundedRectangle")}
        >
            Rounded
        </button>

        <button
            className={tool==="angledRectangle"?"active":""}
            onClick={()=>setTool("angledRectangle")}
        >
            Angled Rect
        </button>

        <button
            className={tool==="polygon"?"active":""}
            onClick={()=>setTool("polygon")}
        >
            Polygon
        </button>

        <button
            className={tool==="star"?"active":""}
            onClick={()=>setTool("star")}
        >
            Star
        </button>

        <button
            className={tool==="diamond"?"active":""}
            onClick={()=>setTool("diamond")}
        >
            Diamond
        </button>

        <button
            className={tool==="heart"?"active":""}
            onClick={()=>setTool("heart")}
        >
            Heart
        </button>

        <button
    className={tool==="text"?"active":""}
    onClick={()=>setTool("text")}
>
    Text
</button>

        <input

ref={fileInput}

type="file"

accept=".png,.jpg,.jpeg"

style={{
display:"none"
}}

onChange={handleImage}

/>



<button

onClick={()=>fileInput.current.click()}

>

Image

</button>


        <button
            className={tool === "select" ? "active" : ""}
            onClick={() => setTool("select")}
            >
            Select
        </button>

        <button onClick={()=>actions?.undo()}>
            Undo  ↩
        </button>


        <button onClick={()=>actions?.redo()}>
            ↪  Redo
        </button>


        <button onClick={()=>actions?.clearCanvas()}>
            Clear
        </button>

        <div className="spacer"></div>

        <button 
            className="plotButton"
            onClick={downloadGCode}
            >
            ⚙ Generate G-Code
        </button>

        </div>
    );
}


export default Toolbar;