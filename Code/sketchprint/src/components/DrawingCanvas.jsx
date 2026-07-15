import { useState, useEffect } from "react";
import { imageToLines } from "../utils/imageToLines";
import { traceImage } from "../utils/imageTracer";
import { svgToShapes } from "../utils/svgToShapes";
import { loadImageData } from "../utils/loadImageData";

import { Stage, Layer, Line, Rect, Circle, Ellipse,
    RegularPolygon,
    Star,
    Arc,
    Shape,
    Image as KonvaImage,
    Text as KonvaText
} from "react-konva";

import "./DrawingCanvas.css";



function DrawingCanvas({ tool, setActions }) {


    const [shapes,setShapes] = useState([]);
    const [drawing,setDrawing] = useState(false);
    const [previewShape,setPreviewShape] = useState(null);
    const [selectedShape, setSelectedShape] = useState(null);
    const [history,setHistory] = useState([]);
    const [redoStack,setRedoStack] = useState([]);
    const [image, setImage] = useState(null);


    function startDrawing(e){

        if(tool === "select") return;


        const pos = e.target
            .getStage()
            .getPointerPosition();


        setDrawing(true);


        if(tool==="pencil"){

            setPreviewShape({
                type:"pencil",
                points:[
                    pos.x,
                    pos.y
                ]
            });

        }


        if(tool==="line"){

            setPreviewShape({
                type:"line",
                points:[
                    pos.x,
                    pos.y,
                    pos.x,
                    pos.y
                ]
            });

        }


        if(tool==="rectangle"){

            setPreviewShape({
                type:"rectangle",
                x:pos.x,
                y:pos.y,
                width:0,
                height:0
            });

        }


        if(tool==="circle"){

            setPreviewShape({
                type:"circle",
                x:pos.x,
                y:pos.y,
                radius:0
            });

        }

        if(tool==="ellipse"){

            setPreviewShape({
                type:"ellipse",
                x:pos.x,
                y:pos.y,
                radiusX:0,
                radiusY:0
            });

        }

        if(tool==="polygon"){

            setPreviewShape({

                type:"polygon",

                x:pos.x,
                y:pos.y,

                radius:0,

                sides:6

            });

        }

        if(tool==="star"){

        setPreviewShape({

        type:"star",

        x:pos.x,

        y:pos.y,

        innerRadius:0,

        outerRadius:0,

        points:5

        });

        }

        if(tool==="diamond"){

            setPreviewShape({

                type:"diamond",

                x:pos.x,
                y:pos.y,

                size:0

            });

        }

        if(tool==="roundedRectangle"){

            setPreviewShape({

                type:"roundedRectangle",

                x:pos.x,
                y:pos.y,

                width:0,
                height:0

            });

        }

        if (tool === "arc") {
            setPreviewShape({
                type: "arc",
                x: pos.x,
                y: pos.y,
                innerRadius: 0,
                outerRadius: 0,
                angle: 180,
                rotation: 0
            });
        }

        if(tool==="heart"){

            setPreviewShape({
                type:"heart",
                x:pos.x,
                y:pos.y,
                size:0
            });

        }

        if(tool==="angledRectangle"){

            setPreviewShape({
                type:"angledRectangle",
                x:pos.x,
                y:pos.y,
                width:0,
                height:0,
                rotation:30
            });

        }

        if(tool==="text"){

    const text = prompt("Enter text:");

    if(text){

        setHistory([
            ...history,
            shapes
        ]);

        setShapes([
            ...shapes,
            {
                type:"text",
                x:pos.x,
                y:pos.y,
                text:text,
                fontSize:36,
                fontFamily:"Arial"
            }
        ]);

    }

    setDrawing(false);
    return;

}


    }




    function draw(e){

        if(!drawing || !previewShape) return;


        const pos = e.target
        .getStage()
        .getPointerPosition();


        let updated = {...previewShape};



        if(updated.type==="pencil"){

            updated.points=[
                ...updated.points,
                pos.x,
                pos.y
            ];

        }



        if(updated.type==="line"){

            updated.points=[
                updated.points[0],
                updated.points[1],
                pos.x,
                pos.y
            ];

        }



        if(updated.type==="rectangle"){

            updated.width =
                pos.x - updated.x;

            updated.height =
                pos.y - updated.y;

        }



        if(updated.type==="circle"){

            updated.radius =
            Math.sqrt(
                Math.pow(pos.x-updated.x,2)+
                Math.pow(pos.y-updated.y,2)
            );

        }

        if(updated.type==="ellipse"){

            updated.radiusX =
                Math.abs(pos.x-updated.x);

            updated.radiusY =
                Math.abs(pos.y-updated.y);

        }

        if(updated.type==="polygon"){

            updated.radius =

            Math.sqrt(

                Math.pow(pos.x-updated.x,2)+

                Math.pow(pos.y-updated.y,2)

            );

        }

        if(updated.type==="star"){

            const r =

            Math.sqrt(

            Math.pow(pos.x-updated.x,2)+

            Math.pow(pos.y-updated.y,2)

            );

            updated.outerRadius=r;

            updated.innerRadius=r/2;

        }

        if(updated.type==="diamond"){

            updated.size = Math.max(
                Math.abs(pos.x-updated.x),
                Math.abs(pos.y-updated.y)
            );

        }

        if(updated.type==="roundedRectangle"){

            updated.width = pos.x-updated.x;
            updated.height = pos.y-updated.y;

        }

        if (updated.type === "arc") {

            const dx = pos.x - updated.x;
            const dy = pos.y - updated.y;

            const radius = Math.max(1, Math.hypot(dx, dy));

            updated.innerRadius = radius - 2;
            updated.outerRadius = radius;

            updated.rotation =
                Math.atan2(dy, dx) * 180 / Math.PI;

        }

        if(updated.type==="heart"){

            updated.size =
                Math.max(
                    Math.abs(pos.x-updated.x),
                    Math.abs(pos.y-updated.y)
                );

        }

        if(updated.type==="angledRectangle"){

            updated.width =
                pos.x-updated.x;

            updated.height =
                pos.y-updated.y;

        }

        setPreviewShape(updated);

    }





    function stopDrawing(){

    if(previewShape){

        setHistory([
            ...history,
            shapes
        ]);

        setShapes([
            ...shapes,
            previewShape
        ]);

        setRedoStack([]);

    }


    setPreviewShape(null);
    setDrawing(false);

}




    function selectShape(index){

        if(tool==="select"){
            setSelectedShape(index);
        }

    }




    function deleteSelected(){

        if(selectedShape===null) return;


        setShapes(
            shapes.filter(
                (_,i)=>i!==selectedShape
            )
        );


        setSelectedShape(null);

    }




    useEffect(()=>{

        function key(e){

            if(e.key==="Delete"){
                deleteSelected();
            }

        }


        window.addEventListener(
            "keydown",
            key
        );


        return()=>{

            window.removeEventListener(
                "keydown",
                key
            );

        };


    },[selectedShape,shapes]);






    function moveShape(e,index){

        const updated=[...shapes];

        const shape=updated[index];

        const pos=e.target.position();



        if(
            shape.type==="rectangle" ||
            shape.type==="circle" ||
            shape.type==="ellipse" ||
            shape.type==="polygon" ||
            shape.type==="star" ||
            shape.type==="diamond" ||
            shape.type==="roundedRectangle" ||
            shape.type==="arc" ||
            shape.type==="heart" ||
            shape.type==="angledRectangle" ||
            shape.type==="text"
        ){
            shape.x = pos.x;
            shape.y = pos.y;
        }



        if(shape.type==="line"){

            shape.points=[
                shape.points[0]+pos.x,
                shape.points[1]+pos.y,
                shape.points[2]+pos.x,
                shape.points[3]+pos.y
            ];

        }



        if(shape.type==="pencil"){

            shape.points =
            shape.points.map((p,i)=>
                i%2===0
                ? p+pos.x
                : p+pos.y
            );

        }


        setShapes(updated);


        e.target.position({
            x:0,
            y:0
        });

    }



    function undo(){

    if(history.length === 0) return;


    const previous =
        history[history.length - 1];


    setRedoStack([
        ...redoStack,
        shapes
    ]);


    setShapes(previous);


    setHistory(
        history.slice(0,-1)
    );

}



function redo(){

    if(redoStack.length === 0) return;


    const next =
        redoStack[redoStack.length-1];


    setHistory([
        ...history,
        shapes
    ]);


    setShapes(next);


    setRedoStack(
        redoStack.slice(0,-1)
    );

}




function clearCanvas(){

    setHistory([
        ...history,
        shapes
    ]);

    setShapes([]);

    setRedoStack([]);

    setSelectedShape(null);

}


loadImage: async(file)=>{


const imageData =
await loadImageData(file);


const traced =
imageToLines(imageData);



setHistory([
    ...history,
    shapes
]);


setShapes([
    ...shapes,
    ...traced
]);


}


    function renderShape(shape,index,preview=false){


        const color =
        preview
        ? "#2196f3"
        : selectedShape===index
        ? "#2196f3"
        : "black";



        if(shape.type==="pencil"){

            return(
                <Line
                key={index}
                points={shape.points}
                stroke={color}
                strokeWidth={8}
                lineCap="round"
                lineJoin="round"
                draggable={tool==="select"}
                onClick={()=>selectShape(index)}
                onDragEnd={(e)=>moveShape(e,index)}
                />
            );

        }




        if(shape.type==="line"){

            return(
                <Line
                key={index}
                points={shape.points}
                stroke={color}
                strokeWidth={8}
                dash={preview?[8,5]:[]}
                draggable={tool==="select"}
                onClick={()=>selectShape(index)}
                onDragEnd={(e)=>moveShape(e,index)}
                />
            );

        }





        if(shape.type==="rectangle"){

            return(
                <Rect
                key={index}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                stroke={color}
                strokeWidth={8}
                draggable={tool==="select"}
                onClick={()=>selectShape(index)}
                onDragEnd={(e)=>moveShape(e,index)}
                />
            );

        }





        if(shape.type==="circle"){

            return(
                <Circle
                key={index}
                x={shape.x}
                y={shape.y}
                radius={shape.radius}
                stroke={color}
                strokeWidth={8}
                draggable={tool==="select"}
                onClick={()=>selectShape(index)}
                onDragEnd={(e)=>moveShape(e,index)}
                />
            );

        }

        if(shape.type==="ellipse"){

            return(

                <Ellipse

                key={index}

                x={shape.x}
                y={shape.y}

                radiusX={shape.radiusX}
                radiusY={shape.radiusY}

                stroke={color}
                strokeWidth={8}

                dash={preview?[8,5]:[]}

                draggable={tool==="select"}

                onClick={()=>selectShape(index)}

                onDragEnd={(e)=>moveShape(e,index)}

                />

            );

        }

        if(shape.type==="polygon"){

            return(

                <RegularPolygon

                key={index}

                x={shape.x}

                y={shape.y}

                sides={shape.sides}

                radius={shape.radius}

                stroke={color}

                strokeWidth={8}

                dash={preview?[8,5]:[]}

                draggable={tool==="select"}

                onClick={()=>selectShape(index)}

                onDragEnd={(e)=>moveShape(e,index)}

                />

            );

        }

        if(shape.type==="star"){

            return(

                <Star

                key={index}

                x={shape.x}

                y={shape.y}

                numPoints={shape.points}

                innerRadius={shape.innerRadius}

                outerRadius={shape.outerRadius}

                stroke={color}

                strokeWidth={8}

                dash={preview?[8,5]:[]}

                draggable={tool==="select"}

                onClick={()=>selectShape(index)}

                onDragEnd={(e)=>moveShape(e,index)}

                />

            );

        }

        if(shape.type==="diamond"){

            return(

                <Rect

                key={index}

                x={shape.x}
                y={shape.y}

                width={shape.size}
                height={shape.size}

                offsetX={shape.size/2}
                offsetY={shape.size/2}

                rotation={45}

                stroke={color}
                strokeWidth={8}

                dash={preview?[8,5]:[]}

                draggable={tool==="select"}

                onClick={()=>selectShape(index)}

                onDragEnd={(e)=>moveShape(e,index)}

                />

            );

        }

        if(shape.type==="roundedRectangle"){

            return(

                <Rect

                key={index}

                x={shape.x}
                y={shape.y}

                width={shape.width}
                height={shape.height}

                cornerRadius={20}

                stroke={color}
                strokeWidth={8}

                dash={preview?[8,5]:[]}

                draggable={tool==="select"}

                onClick={()=>selectShape(index)}

                onDragEnd={(e)=>moveShape(e,index)}

                />

            );

        }

        if (shape.type === "arc") {

            return (
                <Arc
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    innerRadius={Math.max(1, shape.innerRadius)}
                    outerRadius={Math.max(2, shape.outerRadius)}
                    angle={shape.angle}
                    rotation={shape.rotation}
                    stroke={color}
                    strokeWidth={8}
                    dash={preview ? [8,5] : []}
                    draggable={tool==="select"}
                    onClick={() => selectShape(index)}
                    onDragEnd={(e)=>moveShape(e,index)}
                />
            );

        }

        if(shape.type==="angledRectangle"){

            return(

                <Rect
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    rotation={shape.rotation}
                    stroke={color}
                    strokeWidth={8}
                    draggable={tool==="select"}
                    onClick={()=>selectShape(index)}
                    onDragEnd={(e)=>moveShape(e,index)}
                />

            );

        }

        if(shape.type==="heart"){

            return(

                <Shape
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    stroke={color}
                    strokeWidth={8}
                    draggable={tool==="select"}
                    onClick={()=>selectShape(index)}
                    onDragEnd={(e)=>moveShape(e,index)}
                    sceneFunc={(ctx,shapeNode)=>{

                        const s = shape.size;

                        ctx.beginPath();

                        ctx.moveTo(0,s/4);

                        ctx.bezierCurveTo(
                            -s/2,-s/2,
                            -s,-s/8,
                            0,s
                        );

                        ctx.bezierCurveTo(
                            s,-s/8,
                            s/2,-s/2,
                            0,s/4
                        );

                        ctx.closePath();

                        ctx.fillStrokeShape(shapeNode);

                    }}
                />

            );

        }


        if(shape.type==="text"){

            return(

                <KonvaText

                    key={index}

                    x={shape.x}
                    y={shape.y}

                    text={shape.text}

                    fontSize={shape.fontSize}

                    fontFamily={shape.fontFamily}

                    fill={color}

                    draggable={tool==="select"}

                    onClick={()=>selectShape(index)}

                    onDragEnd={(e)=>moveShape(e,index)}

                />

            );

        }



    }


    useEffect(()=>{

        setActions({

            undo,
            redo,
            clearCanvas,

            getShapes:()=>shapes,


            loadImage: async(file)=>{


    const traced =
    await traceImage(file);


    console.log(
        "DrawingCanvas received:",
        traced
    );



    setHistory([
        ...history,
        shapes
    ]);



    setShapes([
        ...shapes,
        ...traced
    ]);

}


            });

    },[shapes,history,redoStack]);




    return(

        <div className="canvasContainer">

            <Stage

            width={900}
            height={600}

            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}

            >

            <Layer>

            {
            image &&
            <KonvaImage
                image={image}
                x={0}
                y={0}
            />
            }

            {
                shapes.map(
                    (shape,i)=>
                    renderShape(shape,i)
                )
            }



            {
                previewShape &&
                renderShape(
                    previewShape,
                    "preview",
                    true
                )
            }


            </Layer>

            </Stage>


        </div>

    );

}



export default DrawingCanvas;