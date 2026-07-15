; Pen Plotter Test (No Auto Home)

G90
G21

; Raise before moving
G0 Z15 F1000

; Move to start
G0 X80 Y80 F3000

; Lower pen
G0 Z0 F600

; Draw square
G1 X120 Y80 F1200
G1 X120 Y120
G1 X80 Y120
G1 X80 Y80

; Lift pen
G0 Z15 F1000

; Park
G0 X10 Y10 F3000

M84