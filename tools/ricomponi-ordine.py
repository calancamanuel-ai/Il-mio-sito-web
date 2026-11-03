# Una tantum (3 novembre 2026): ufficio in ordine definitivo = base nitida (_ordine-base-nitida.jpg) +
# zone cambiate della versione finale di Gemini (_ordine-candidata-6.jpg: vetrina, computer della reception,
# gradino tolto), con luce e contrasto riportati su quelli della base. Percorsi da adattare se si rifà.
import cv2, numpy as np
I='/tmp/claude-0/-home-user-Il-mio-sito-web/58887d85-a816-5621-a220-5499ca395ab0/images/'
a=cv2.imread(I+'32.jpg').astype(np.float32)   # base nitida e luminosa
b=cv2.imread(I+'31.jpg').astype(np.float32)   # finale: vetrina a schermo, computer in reception, niente gradino
H,W=a.shape[:2]
zones={
 'vetrina':  [(205,470),(370,470),(400,540),(400,745),(330,740),(200,705)],
 'reception':[(470,670),(615,670),(615,800),(480,800)],
 'gradino':  [(620,740),(805,740),(805,870),(620,870)],
}
out=a.copy()
for name,pts in zones.items():
    m=np.zeros((H,W),np.uint8); cv2.fillPoly(m,[np.array(pts,np.int32)],255)
    ring=cv2.dilate(m,np.ones((31,31),np.uint8))-m          # cornice intorno alla zona, uguale nelle due immagini
    r=ring>0
    # luce e contrasto della finale riportati su quelli della base, canale per canale
    bb=b.copy()
    for c in range(3):
        ma,sa=a[...,c][r].mean(),a[...,c][r].std(); mb,sb=b[...,c][r].mean(),b[...,c][r].std()
        bb[...,c]=(b[...,c]-mb)*(sa/max(sb,1))+ma
    # un po' di definizione in più solo sulla zona incollata
    blur=cv2.GaussianBlur(bb,(0,0),1.0); bb=bb*1.45-blur*0.45
    k=cv2.GaussianBlur(m.astype(np.float32)/255,(0,0),4)[...,None]
    out=out*(1-k)+bb*k
    print(name,'ok')
out=np.clip(out,0,255).astype(np.uint8)
cv2.imwrite('nit/ricomposta2.png',out)
