# SketchPrint

SketchPrint transforms an Ender 3 3D printer into a pen plotter capable of drawing images, text, and artwork on paper. The project combines hardware modifications with a React-based web application that converts drawings and uploaded images into a generated G-code file for plotting. That you can upload to your printer like a normal print file

## Features

* Upload and trace images
* Convert images into line art
* Generate drawing paths for an Ender 3
* Export G-code for plotting
* Adjustable line thickness settings
* Drawing preview before plotting
* Designed for marker and pen attachments

## How It Works

1. Upload an image.
2. SketchPrint traces the image into vector-like paths.
3. The paths are converted into plotting movements.
4. G-code is generated.
5. Load the G-code onto an Ender 3 equipped with a pen holder. (may need to adjust height of thye z axis limit switch (I found that 4.5 cm work well))
6. Watch the printer recreate the image on paper.

## Technologies Used

* React
* Vite
* JavaScript
* HTML/CSS
* Image Tracing Libraries
* G-code Generation
* Creality Ender 3

## Challenges

One of the biggest challenges was converting regular images into clean drawing paths that could be plotted efficiently. Other challenges included handling image scaling, positioning drawings correctly on the page, generating usable G-code, and debugging React and canvas-related issues.

## What I'm Proud Of

I'm proud that SketchPrint combines software, hardware, and creativity into a single project. It takes a digital image and turns it into a real-world drawing using a modified 3D printer.

## Future Plans

* Multi-color pen system 
* Live printer controls
* Better image optimization
* Additional drawing styles

## Requirements

* Ender 3 3D Printer
* Pen/Marker Holder Attachment
* Paper Drawing Surface
* Computer with a web browser

## Disclaimer

SketchPrint is designed for plotting with pens and markers. Drawing quality depends on printer calibration, marker thickness, paper placement, and image complexity.


## Help 
multi color is very hard to implement in this small space if you have idea message [my slack](https://hackclub.enterprise.slack.com/team/U09KUU24SMS)
