#!/usr/bin/env python3
# Riporta il fondo uniforme di un'illustrazione al colore di sfondo del sito (#0b1220),
# senza toccare l'ufficio: maschera del fondo per riempimento dai bordi, poi sostituzione
# graduale (le ombre morbide sotto la lastra restano, solo più scure in proporzione).
# Uso: python tools/sfondo-sito.py <ingresso> <uscita.png>
import cv2, numpy as np, sys
im=cv2.imread(sys.argv[1]); H,W=im.shape[:2]
target=np.array([0x20,0x12,0x0b],np.float32)   # BGR di #0b1220
lab=cv2.cvtColor(im,cv2.COLOR_BGR2LAB).astype(np.float32)
bg=np.median(np.concatenate([lab[:8].reshape(-1,3),lab[-8:].reshape(-1,3),lab[:,:8].reshape(-1,3),lab[:,-8:].reshape(-1,3)]),0)
d=np.linalg.norm(lab-bg,axis=2)
cand=(d<14).astype(np.uint8)
n,cc=cv2.connectedComponents(cand)
edge=set(np.unique(np.concatenate([cc[0],cc[-1],cc[:,0],cc[:,-1]])))-{0}
mask=np.isin(cc,list(edge)).astype(np.float32)
mask=cv2.GaussianBlur(mask,(0,0),1.5)
bgbgr=np.median(np.concatenate([im[:8].reshape(-1,3),im[-8:].reshape(-1,3)]),0).astype(np.float32)
# ogni pixel del fondo: stesso rapporto di luminosità rispetto al fondo medio, ma sul colore del sito
ratio=im.astype(np.float32)/np.maximum(bgbgr,1)
newbg=np.clip(ratio*target,0,255)
out=im.astype(np.float32)*(1-mask[...,None])+newbg*mask[...,None]
cv2.imwrite(sys.argv[2],out.astype(np.uint8))
print('fondo originale (BGR)',bgbgr,'-> #0b1220; pixel di fondo',int((mask>0.5).sum()))
