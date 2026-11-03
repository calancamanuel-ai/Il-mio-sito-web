# Ripulisce e ingrandisce x2 un'illustrazione generata (Gemini a 1K): toglie i blocchi della compressione,
# ingrandisce con la rete EDSR di OpenCV e aggiunge una maschera di contrasto leggera. Non ridisegna nulla.
# Uso: python tools/nitidezza.py <ingresso> <uscita.png> <EDSR_x2.pb>
# Requisiti: pip install opencv-contrib-python-headless numpy; modello:
#   https://raw.githubusercontent.com/Saafke/EDSR_Tensorflow/master/models/EDSR_x2.pb (38 MB, non nel repository)
import cv2, numpy as np, sys, time
src, out = sys.argv[1], sys.argv[2]
img = cv2.imread(src)
# 1. via i blocchi e la grana della compressione, bordi preservati
den = cv2.fastNlMeansDenoisingColored(img, None, 4, 4, 7, 21)
# 2. ingrandimento x2 con rete neurale (EDSR)
sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(sys.argv[3]); sr.setModel('edsr', 2)
t=time.time(); up = sr.upsample(den); print('edsr', round(time.time()-t,1),'s', up.shape)
# 3. maschera di contrasto leggera
blur = cv2.GaussianBlur(up, (0,0), 1.2)
sharp = cv2.addWeighted(up, 1.5, blur, -0.5, 0)
cv2.imwrite(out, sharp, [cv2.IMWRITE_PNG_COMPRESSION, 6])
