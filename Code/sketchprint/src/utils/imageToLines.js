export function imageToLines(imageData) {

    const shapes = [];

    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;

    for (let y = 0; y < height; y++) {

        let current = [];

        for (let x = 0; x < width; x++) {

            const i = (y * width + x) * 4;

            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const brightness = (r + g + b) / 3;

            if (brightness < 120) {

                current.push(x, y);

            } else {

                if (current.length > 2) {

                    shapes.push({
                        type: "pencil",
                        points: current
                    });

                }

                current = [];

            }

        }

        if (current.length > 2) {

            shapes.push({
                type: "pencil",
                points: current
            });

        }

    }

    return shapes;

}