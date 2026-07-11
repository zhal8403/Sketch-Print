July 11, 2026 – First Pen Plotter Prototype

Time spent this session: 4 hours

Today I started a new project: turning my Ender 3 into a pen plotter. The idea is to create a removable attachment that lets the printer draw on paper instead of printing plastic. Eventually I want to build a website where users can either draw directly on a canvas or upload an image, convert it into G-code, and send it to the printer.

Designing the Pen Holder

I began by designing a pen holder in CAD that mounts directly onto the Ender 3 print head. One of my goals was to make the attachment removable so I can switch between normal 3D printing and drawing without making permanent modifications to the printer. The current design is small and will be improved later.

Printing and Assembly

After finishing the design, I printed the attachment and mounted it onto the printer. I tested different pen positions to make sure the pen stayed vertical and reached the paper without wobbling.

One thing I learned is that even a small change in the pen height makes a noticeable difference in how the lines look, so getting the mounting position right is important.

First Drawing Test

Instead of writing G-code immediately, I used the printer's manual movement controls to test the attachment. I moved the X and Y axes by hand through the printer's interface while the pen rested on the paper.

To my surprise, it worked on the first prototype. The pen stayed in place, the attachment was rigid enough, and the printer was able to draw controlled lines. This confirmed that the mechanical design works before moving on to software.

[(Video Of Protype Test)](https://youtube.com/shorts/iX0R6QXbkKM)

Next Steps

Now that I've proven the simple hardware works, the next milestone is starting software. I'll create simple G-code files that draw basic shapes like squares and circles. Once that's working reliably, I'll start building the website that converts drawings and images into G-code automatically.

Future Ideas

Some features I'd like to add later include:

Upload images and automatically convert them into line drawings.
better holder and constant pressure
Live drawing where the printer follows strokes in real time.
Support for SVG files.
Multiple paper sizes and automatic scaling.
Quick-change marker holders.
An automatic multi-marker system for colored drawings.
Direct printer communication from the website without needing an SD card.
