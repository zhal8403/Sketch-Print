let cv = null;


function waitForOpenCV(){

    return new Promise(resolve=>{

        const check = setInterval(()=>{

            if(window.cv && window.cv.Mat){

                clearInterval(check);

                cv = window.cv;

                console.log("OpenCV ready");

                resolve();

            }

        },100);

    });

}



export async function traceImage(file){


    console.log(
        "Starting image trace:",
        file.name
    );


    await waitForOpenCV();


    console.log(
        "After OpenCV, loading image"
    );



    return new Promise(resolve=>{


        const reader = new FileReader();



        reader.onload = ()=>{


            const img = new Image();



            img.onload = ()=>{


                console.log(
                    "Image loaded:",
                    img.width,
                    img.height
                );



                const canvas =
                document.createElement("canvas");



                const maxSize = 800;


                const scale =
                Math.min(
                    1,
                    maxSize /
                    Math.max(
                        img.width,
                        img.height
                    )
                );



                canvas.width =
                img.width * scale;


                canvas.height =
                img.height * scale;



                const ctx =
                canvas.getContext("2d");



                ctx.drawImage(
                    img,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );



                console.log(
                    "Processing image"
                );



                const src =
                cv.imread(canvas);



                const gray =
                new cv.Mat();


                const blur =
                new cv.Mat();


                const edges =
                new cv.Mat();



                cv.cvtColor(
                    src,
                    gray,
                    cv.COLOR_RGBA2GRAY
                );



                cv.GaussianBlur(
                    gray,
                    blur,
                    new cv.Size(3,3),
                    0
                );



                cv.Canny(
                    blur,
                    edges,
                    50,
                    150
                );



                console.log(
                    "Finding contours"
                );



                const contours =
                new cv.MatVector();


                const hierarchy =
                new cv.Mat();



                cv.findContours(
                    edges,
                    contours,
                    hierarchy,
                    cv.RETR_LIST,
                    cv.CHAIN_APPROX_SIMPLE
                );



                console.log(
                    "Contours:",
                    contours.size()
                );



                const shapes = [];



                for(
                    let i = 0;
                    i < contours.size();
                    i++
                ){


                    const contour =
                    contours.get(i);



                    const points = [];



                    for(
                        let j = 0;
                        j < contour.data32S.length;
                        j += 2
                    ){

                        points.push(
                            contour.data32S[j],
                            contour.data32S[j+1]
                        );

                    }



                    if(points.length > 12){

                        shapes.push({

                            type:"pencil",

                            points

                        });

                    }



                    contour.delete();

                }





                console.log(
                    "Raw shapes:",
                    shapes.length
                );



                // CENTER AND SCALE


                let minX = Infinity;
                let minY = Infinity;
                let maxX = -Infinity;
                let maxY = -Infinity;



                shapes.forEach(shape=>{

                    for(
                        let i=0;
                        i<shape.points.length;
                        i+=2
                    ){

                        minX =
                        Math.min(
                            minX,
                            shape.points[i]
                        );


                        minY =
                        Math.min(
                            minY,
                            shape.points[i+1]
                        );


                        maxX =
                        Math.max(
                            maxX,
                            shape.points[i]
                        );


                        maxY =
                        Math.max(
                            maxY,
                            shape.points[i+1]
                        );

                    }

                });



                const width =
                maxX-minX;


                const height =
                maxY-minY;



                if(
                    width <= 0 ||
                    height <= 0
                ){

                    resolve([]);

                    return;

                }



                const canvasWidth = 900;
                const canvasHeight = 600;
                const padding = 50;



                const fit =
                Math.min(
                    (canvasWidth-padding*2)/width,
                    (canvasHeight-padding*2)/height
                );



                const offsetX =
                (canvasWidth-width*fit)/2;


                const offsetY =
                (canvasHeight-height*fit)/2;



                const finalShapes =
                shapes.map(shape=>{


                    const points=[];



                    for(
                        let i=0;
                        i<shape.points.length;
                        i+=2
                    ){

                        points.push(

                            (shape.points[i]-minX)
                            *fit
                            +offsetX,


                            (shape.points[i+1]-minY)
                            *fit
                            +offsetY

                        );

                    }



                    return {

                        type:"pencil",

                        points

                    };


                });



                console.log(
                    "Final shapes:",
                    finalShapes.length
                );



                src.delete();
                gray.delete();
                blur.delete();
                edges.delete();
                contours.delete();
                hierarchy.delete();



                resolve(finalShapes);



            };



            img.src =
            reader.result;


        };



        reader.readAsDataURL(file);



    });


}