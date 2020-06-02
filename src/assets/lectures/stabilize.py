from vidstab.VidStab import VidStab
import cv2


stabilizer = VidStab(kp_method='SIFT')
fourcc = cv2.VideoWriter_fourcc(*"XVID")

vidcap = cv2.VideoCapture('18.avi')
grabbed_frame, frame = vidcap.read()
width = frame.shape[1]
height = frame.shape[0] 
vid = cv2.VideoWriter("output.avi", fourcc, 30, (width,height))
xwidth = int(width * 1.2)
xheight = int(height * 1.2) 
dim = (xwidth, xheight) 
crop_x = int(width*0.15)
crop_y = int(height*0.15)
new_width = xwidth - crop_x
new_height = xheight - crop_y

vidcap = cv2.VideoCapture('18.avi')
while True:
    grabbed_frame, frame = vidcap.read()
    # Pass frame to stabilizer even if frame is None
    # stabilized_frame will be an all black frame until iteration 30
    
    if frame is None:
        # There are no more frames available to stabilize
        break
    
    stabilized_frame = stabilizer.stabilize_frame(input_frame=frame, smoothing_window=1,border_size=50, border_type="replicate")
   
    resized = cv2.resize(stabilized_frame, dim, interpolation = cv2.INTER_AREA) 
    #crop = image[50:600,20:500]
    croped = resized[crop_y:new_height, crop_x:new_width]

    #cv2.imshow('Video Capture',croped)
    #cv2.imshow('Orignal',resized)
    if cv2.waitKey(1) & 0xFF == ord('q'): # press q to quit
          break
    if stabilized_frame is None:
        # There are no more frames available to stabilize
        break
    
    vid.write(croped)
    
vid.release()

print("Ali")