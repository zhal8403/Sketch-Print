export function svgToShapes(svgText) {

    const parser = new DOMParser();

    const doc = parser.parseFromString(
        svgText,
        "image/svg+xml"
    );

    const paths = doc.querySelectorAll("path");

    const shapes = [];

    paths.forEach(path => {

        const length = path.getTotalLength();

        const points = [];

        for (let i = 0; i <= length; i += 2) {

            const p = path.getPointAtLength(i);

            points.push(p.x);
            points.push(p.y);

        }

        shapes.push({

            type: "pencil",

            points

        });

    });

    return shapes;

}