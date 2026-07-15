export function imageToVector(imageData){

    const {width,height,data}=imageData;


    const paths=[];


    const visited =
    new Set();


    function isDark(x,y){

        const i =
        (y*width+x)*4;


        const brightness =
        (
            data[i]+
            data[i+1]+
            data[i+2]
        )/3;


        return brightness < 150;

    }



    function simplify(points, tolerance=2){

        if(points.length<=2)
            return points;


        const result=[points[0]];


        for(let i=1;i<points.length-1;i++){

            const prev =
            points[i-1];

            const current =
            points[i];

            const next =
            points[i+1];


            const dx =
            next[0]-prev[0];

            const dy =
            next[1]-prev[1];


            const distance =
            Math.abs(
                dy*current[0] -
                dx*current[1] +
                next[0]*prev[1] -
                next[1]*prev[0]
            )
            /
            Math.sqrt(
                dx*dx+
                dy*dy
            );


            if(distance>tolerance){

                result.push(current);

            }

        }


        result.push(
            points[points.length-1]
        );


        return result;

    }



    function trace(x,y){

        const points=[];


        const stack=[
            [x,y]
        ];


        while(stack.length){

            const [cx,cy]=stack.pop();


            const key =
            `${cx},${cy}`;


            if(
                visited.has(key)
            )
            continue;


            if(
                cx<0 ||
                cy<0 ||
                cx>=width ||
                cy>=height
            )
            continue;


            if(!isDark(cx,cy))
            continue;


            visited.add(key);


            points.push([
                cx,
                cy
            ]);



            stack.push(
                [cx+1,cy],
                [cx-1,cy],
                [cx,cy+1],
                [cx,cy-1]
            );

        }


        return points;

    }



    for(let y=0;y<height;y++){

        for(let x=0;x<width;x++){


            if(
                isDark(x,y)
                &&
                !visited.has(`${x},${y}`)
            ){

                let path =
                trace(x,y);


                if(path.length>10){

                    path =
                    simplify(path);


                    paths.push({

                        type:"pencil",

                        points:
                        path.flat()

                    });

                }

            }

        }

    }


    return paths;

}