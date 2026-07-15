export function loadImageData(file){

    return new Promise((resolve)=>{

        const img = new Image();

        img.onload = ()=>{

            const canvas =
            document.createElement("canvas");

            canvas.width = img.width;
            canvas.height = img.height;


            const ctx =
            canvas.getContext("2d");


            ctx.drawImage(
                img,
                0,
                0
            );


            const imageData =
            ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            );


            resolve(imageData);

        };


        img.src =
        URL.createObjectURL(file);

    });

}