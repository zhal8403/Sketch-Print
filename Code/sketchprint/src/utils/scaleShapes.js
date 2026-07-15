export function scaleShapes(
    shapes,
    targetWidth
){

    const xs=[];


    shapes.forEach(shape=>{

        if(shape.points){

            for(let i=0;i<shape.points.length;i+=2){

                xs.push(
                    shape.points[i]
                );

            }

        }

    });


    const max =
    Math.max(...xs);


    const scale =
    targetWidth/max;



    return shapes.map(shape=>({

        ...shape,

        points:
        shape.points.map(
            (p,i)=>
            p*scale
        )

    }));

}