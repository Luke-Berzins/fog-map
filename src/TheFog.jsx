import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   THE FOG — North America, 1000–1900
   Scroll-driven. Twenty-two maps, and what each burned away.

   Geometry: Natural Earth 50m (public domain), clipped to the
   continent, simplified to ~5,400 vertices, delta-encoded.

   The chart is drawn once, in full, and an opaque fog sits on
   top held by an SVG mask. Each chapter punches blurred holes
   in that mask, staggered along the route. Nothing is revealed
   by logic — only by fog ceasing to be there.
   ============================================================ */

const LAND_S = "|}CgzLGPNHWPHFbDf@jAS~GJaAk@?e@QAgED_D_@mAV#faKyqHrA@bD[hBc@h@g@lCy@gAI}Fl@oEtAWZRH#||Jc~Go@G`@RMFPZ_AIw@k@t@@uAeAMTgAFJZSHnB~@v@JxBB`@]Hk@Qm@kB}BkAi@O@Ol@^bBzB`A#jm_@kxJqALCn@W^dBJHPdEq@z@g@wBAgA_@cA?#v|^svIS^{@\\v@Mj@T`B@fBj@l@CNWsAiAeC[aAL#zaNkrBuD|@[n@|@F`ASPVb@EN`@^WpAIt@y@z@WW_@eAMyBJ#h|KgrBcBJAZdAt@tFCEm@P[S[mEJ#rz\\khJ}AAHXs@Vd@XhBIJDk@BSRpEz@QP`Ad@RIw@a@|@EKSf@CZFg@P^PhAsAa@k@sAQuAbA\\aA]Cj@YMM[Ai@Zu@M@_@MA}@LHN#rw\\wkJy@A]XXN^QFVl@DJK`A`@xASoAi@i@BL[m@Ee@P#rqXyyIh@v@l@MDY|@n@HIFg@g@a@Eo@eAYu@l@Cn@#xaYc_JiABWXBRcBd@uArAbAUVVi@As@^HRm@@F~A`@?\\c@h@GLe@^PbAw@_@MVSIQt@CjAc@u@Aa@WXWhANi@e@Fe@#p`YgcJ{@DWPHr@`Ai@a@j@BZrA@NcAz@i@UKcBL#pjYmeJeA|BJbBz@{@S_@ZBZM?Q`@?Yi@p@k@h@j@\\B@u@iAq@_Bb@#vhYojJwABsAdBfAkAXCG\\aAz@Eh@hB|@`@OWcA`@_@r@mCo@d@#hoY_kJ[PRTOHs@YoARBf@hAHgAHUXJT|Be@Xp@j@E`@k@`B{@q@q@c@VISgAG#lbX{iIGrA`@l@L}A\\Pv@_A]y@oA`@O`@#b|XiqIgADYZ@TdAf@cAEKeA{AUbAlDdBNl@W_AErAa@f@u@Hm@I]mAD#lvXokISRCb@bAFeBb@XV_@^a@?JVc@@CLRL|D}BP]WMpA[_DK#xmKmaHYQmBZaEM[LdBj@@`@KD~@Dj@SYI`@SOSx@VW@JDfAI^ODUdAEDa@r@QqAiAA\\TXw@|@#ddMe_GLLgC[`GpAlCNSMh@JBK{Aw@{DMgA_@n@^#n~NwoCsB?WTaBIy@^kBHDJqBrAuBFqEpB[@NSOBgAl@l@DWX]Us@d@DLeFj@WVJPKJZDCRgDJiAt@cAPCVRPjAB`B^DUZVlDSvHXa@k@yAaAXm@pDWhAy@PgA\\c@|B?lDw@r@q@@JjBA\\g@P^pBSl@c@iAUAQZOrDC~B|AfBHXl@|A^?]lALoBi@D}@_Ay@{C{@gFk@s@D#phIctLgCX]h@lDn@bERtA[gBM^MtDMd@SYo@}A@xAUJOWYcAKuETqBt@#~yWo{HwI~@aC|CeD|@cB~BOW[n@x@Z`HmAVUy@i@Gc@Vf@xBJx@[e@S|@KA]xBCAa@qAOnAIhAk@h@JZs@RPVUlADC_@VKISu@E]NF[KGv@ECL`AFx@g@UY_AEoCj@#t`MgzBi@Cc@_@_AHy@KwCt@m@Ek@hAeBDjAJ@P{Dj@{@l@CX`A`An@g@bAEbB?pAd@z@D^WlALpA|Bd@YNo@dAk@bDN|BSn@JX\\rBeAMm@_@G_Hl@a@Wo@CESzAoAUiArCw@WYwAOyDh@#b`B}|K{D]|@Rh@b@sANAVZZwAEMT\\R{@KmBVHVXH_@LTPa@HALv@N?Xd@VdAAFh@f@VnFn@`D|@jF^X`@jCXtH]x@YYMHIn@L`B]EIbANnFDHq@e@P_AIgB}@i@EtBL]ORCISgAWfBRh@QMUj@KnDE|ANh@WwFe@sD?YWbAFpAMeCq@rEYfE`@rBWm@OmALl@o@}ARaAMjBS}@Er@[eA?`@Q]MmAPGTgAIG^c@G@_@bB[}AK~BMm@S{A@kEnATJi@LJ^x@B{@ZLTg@HS\\aAiAeALQ]?}@]MoC`AU}@iBSmCxAGSf@aAmABgAb@oAo@}@LeAMKOTa@y@Ms@@yAv@#|aKofH[Bn@DQg@gBi@dBfA#fk^uxIYMKf@|@DFe@WKGP#vx_@mlI`FfBoAoA}@IBYUQ{AAX^#jp_@{oIWBYW[L~@l@o@?zAj@jDj@b@KeCi@Wa@g@JOM`AMHQOMiAMIT#x}HuqLj@?V{@s@MqALl@PRh@#rmI_{LrAQkAa@]\\TT#zvI}eMlBl@~B_@gEWe@H#d`H{zJTVpAWsB_@J^#h~QobDl@cCAkAk@nE#jdNqvCRPOFKSKN@nAf@Al@}AcAE#taN{`D`@W][AoAt@y@tAIqA?{AhAEf@XPJbA#lgMmcCXh@fB??W_@Qw@Fc@_@EV#`~Mi~CgBdAF`B\\a@U?I{@h@e@pAWMYKL#zdNmyC@p@x@`@Tg@T@b@]g@CJSWa@Cw@c@Vo@hA#~bOyeCnAXj@]i@?Tg@Q]w@H]~@#piNafDqBFbDd@p@e@e@Ta@OE[UL#d{JqyADJf@GIYXILg@w@PSt@#~}Ji~ARBNoAc@R?v@#h~JmdBd@?Iw@{@p@^D#|_KacBNHPSA{@g@PFr@#|q[yxJy@FbBZRY[Oa@D#jz[ytJXCiCiBk@LjBnAn@N#j}XavIo@?Ph@z@a@n@aA`@E@QYEg@Vo@~@#ldYgbJq@d@VLPxAn@H@aAWIh@WNs@m@Q]P#zsXgwIUb@b@@L]T@Ak@c@FKX#t|Xi`Jf@GUk@u@h@b@H#txXu}IB`@n@?NWh@CFW_A{@}@r@FX#z|Xq~Ir@U[Qs@@@XXJ#~lXgpIZVn@SFPHMs@a@i@X#pjXikIdCiAYOyAb@e@f@RL#fbUqtDbAs@Ps@a@NI\\a@FGp@#f|TitDNn@l@OQeAYGQl@#d|OyzL}D[mB?Q@LJOHa@?_@_BFW~BMpBy@uBo@oEd@nBu@k@MnCGv@c@DWO[}@QgE\\lF}@uAm@wBW_CFVUaBSuCSqEDu@Re@x@mBd@Ad@}@^|DzA{B[`An@q@Tl@D@^uC{@{@Dl@]w@Wq@Zs@O_AV@l@sA^t@k@_@q@kF`@xCc@d@UKSeC]kD?kC\\aB?qAPk@^CP`Bj@jAx@yCcAoDBKRTRnDXcBDz@zAo@Wu@}@{BW_@H`B~@aBe@iB|@Rs@kA[{F^yAn@|@`@vABhCr@_A?{@c@u@GiALkBY_@JE\\VT`FfA_@D{@]]H\\hAyAyAsDq@}CH}C`@[PVT~D^zBh@_G_@KHx@`@u@FeBa@RMi@Ys@DcBp@a@t@dDAtFr@sCMwBVmBAgCh@VTbFSzE\\{BMeCXXr@~GO}E^u@b@uFL~@Vg@TP\\e@KMREc@sAMJn@r@d@[ByAo@DTUFeAIDf@[RBi@wA_@[Hd@RARkAI}Ct@l@LM\\hC?UDuCJq@WmBZj@j@vAf@sCYsBFs@[cDnAl@PhAWj@FkBl@v@RhCS[PVPkBd@|BBo@d@v@d@dBCx@e@GZl@H}@FBlAp@z@x@c@p@Ff@SOm@x@v@lBcAx@{@k@c@aAOoA{@lBn@dDNDQg@UnALrA]dBeACNTBl@GWZFV`C_@c@f@gBn@`@R~AG|Bw@x@HiBVFZML_ARLh@iAOyAf@j@Pu@TS^[@Yp@Kc@sA\\NLQJu@a@eB^_@Rr@XeAAULZZhA@m@Jc@f@aB?VTk@Ba@d@\\DIrA\\@t@eAr@_@e@tALLoAbA`BAUl@JL|E_B@Vb@Gn@m@Ab@J@~@q@n@C|BmAa@|@xC}@rADyChB{ANJN{EpAgAz@{@P\\TMd@r@F~Ew@lFYbB[|AeA~B@lDo@_@WnAH~BeAkACm@[zA[xAAW_@`ALb@g@xCkAc@c@~B?\\^Le@`AEj@e@n@Jw@h@HJlECHXxE\\xDYjAq@BYYm@kCk@R_@YQkHj@}@`@L\\[LQa@vAy@}BBe@SaB@cB]wADf@w@hBo@Z_@uGoBo@{@uAS[WdBoBvB{AIQfALb@MJMSe@LOt@?Y\\tAEv@m@h@Aa@Qh@Im@QXCfA^|@GtEp@E}@yBC{@c@lD}@KSm@Gv@Cl@TdAMm@[pCMb@mAdB@|CiAbAf@mALi@\\@`@t@NtAFhLg@}Bd@c@TNJ~Bi@pCRjDa@lCHxH]dALjBUb@g@SWjHj@|Du@fAo@p@{@cIVkCMpCg@pFOxBY^Mb@{AiAi@f@QGk@{AaAY}@gBy@eE_A}DU_JHGP~EtAjBlAFTeAz@BbAWj@oFlBxHbA#hqL{eOeRPxKv@uECmIa@uAFoASoAVgEAZNmBZ^VuHGaB\\`Ez@bMz@tLVv@XbJf@mWg@jCh@tRvBvDz@tBCpB[cBr@HHfJTkHH~C^q@Jv@PpELdKc@t@DmFNu@^t@RtKPvGScGt@_F@Hb@rGMtOFkCZcIMmJx@xAb@rHDuFb@zCbAvKFLR?`ApA\\~KJxEk@kA^zCL{@R_CMsDVoCI_@FCb@SFuAJcBSy@XCRz@b@tFr@`GZf@Ga@_@ZStCC`Dm@u@\\ERjIB`Am@J~@rEHzCW`A]l@f@dCMZ[@f@rDCRgATVKl@jEMMcA{Do@}IUlDs@pAw@MK{CU_BDuBTsBx@{EPoDMmCy@{@s@jFzAvEDtAK?g@r@a@yDu@oABhCKYy@n@j@pBf@|BD{@s@dEh@~BIKo@gCeAiJ[yIZ_FQoAWhCNhKS^M}@IgCLpIyBvCKlAYd@u@U[e@KeOPuKjBqFNgAKpDCjK}Bie@kBrJQuAk@wGs@lM|@nBv@xFd@tJLcCe@jFJbD`@xDBdHUiA_@gEg@gK_@pNTtHhAjA@tHq@kPYsHq@rMh@rMHfAQyCYzAOo@KmJ[nDEjJ^|@E}Cg@`DEbCPlAMsCe@wHQgGc@oEZmAQcERyBEzHo@wIm@eGV_Ep@{@ArAUi@IoRnA|QmByCWvAUeGFhA]a@GcMRvGm@s@EaNJeHbAwAMtHoA}O?}Ix@zCm@}BYsCEaFh@~AWaHS_BR#llQo_McBAIXqCz@]t@Rj@{Bj@}@n@?Py@Eg@\\z@HzAUd@ZiBJtDhAsB?oAZmCUn@TkELr@Dh@^dACcBb@s@l@PpA_Af@eAk@m@gBmAq@k@AkEzAi@fA?\\fB@GbAUb@kCpA[b@_D{@_@_AyAu@s@wBg@S{B?n@Mq@m@hB_@V{BmF@aCZqE@q@HXTp@FwANO^cBAqAV~Br@sBDWLBV|Bf@~B@aAz@i@GP`@GPyCtAR|@NVzARlCjAnDj@~AgAh@A`Am@|@Kr@Z}AAsAj@sAvAfBI^TzB]bBo@|EHC^qCn@~EfChARfBAxCaAhEs@d@@IJrHOmAVBMOCsEZ}DtA{HPgAJEP|ExDlCd@jAWMZ`BKd@]l@Fc@b@|@C_@b@n@^jCHlEm@fADnGgASTJRSLy@DTUsFr@|@X}B[mDr@s@ZAn@NPdC`@tDCITiAVxBFj@`@o@h@fCe@{@Z^L?Pv@DOLJDp@Au@`@vBx@CZd@FA^vAjBp@RUNZ|A?fC`@f@eCdAFrAi@wA{D@uCxGb@v@d@VqI_AgBB_Dn@_E`@uCbAwBxAgJrA{Ap@\\t@}@i@eFCwDNwB^a@r@f@pBw@rABnBXl@iCvB@Tj@RgABcBl@kAz@]v@pAt@iAe@kADs@TaBpAlAuASk@{@k@{@`@[r@a@{@p@u@iBaBx@oACg@b@c@f@{BK_@QAXSOMn@SSKj@SdAqAaK{BkEmCi@gABcD~@sBt@s@nGcCQk@eC_BRSYg@kARZS_@WFYOQz@M[Kl@w@c@Ux@Sg@a@tBAqAcAEw@m@WdBu@TyAwCy@qI~@TLyAYmCd@BQ{Ds@eDbAe@@KPZd@s@Ow@Pe@\\b@PeASm@Lh@b@g@DPL_Ab@cFPy@h@aBc@Sd@n@^Tf@Wx@FVbEHwDT]n@RbAcAFd@tAVHX[hAf@gALgBe@qBC_A^]r@X~@fCr@}B]m@eA_@QYd@`@^{@s@OpAUk@iDw@gA{@u@XQl@O[Vq@e@ELKk@KBIcAG~@]Q?S[SFL_@wANhA]NUKYoA@Z[eAsA_AJORdA^aBISPHl@a@O}@|@f@Xa@D?Lo@IWZl@T~@DoCCDf@m@Ac@h@dCbAaA[OJkBKj@t@xAd@yC[c@b@eAJKHPPC^hBVsBLMHXVeAL{@`@F`AhCC~@QOGf@DwCt@t@NMDeBJv@XeA@K`@\\HgAXeAMc@h@k@ILXk@`@tArAqAc@yAMMTq@BnAhAsBmAs@Hk@|@kALwAUY^uAXz@f@xAFx@Vd@b@lDj@~@?n@RNXr@I{@^d@RFVoImCoCWtAIa@OyCLy@hAlAb@e@ZaBu@kAEU\\o@D[Va@r@Ph@QfAfBRqBLDTl@E_A\\@R~FfC~AApE`@bCfBtDhBpC?tD\\f@Y~CMfBJtKOtFTvAj@tA~BtD\\KHlC~@rC|BlGs@wFfAh@fAnCvBnBbAxDn@zCdAbB|Al@D`Ah@v@E_ARENrCdAeFuAoAsBqEkB}H_BqE{DaCoAsBs@gIcBwE[}D`@eAl@AJz@Es@\\?ZRXv@J|BbAdCa@xC`@cAGeB\\o@n@yBc@HJeALh@dApAt@aBFN`@iA`C{BLQJl@PyCt@uB@HPu@DgBq@c@h@y@E[VMXb@LuANfM`Cx@GKZLJlA_@R\\LSVFHTKTrBzAhAZTb@ZDr@G\\o@\\JPMJaAQm@m@g@v@XKK}Ac@WOl@JeDsAyA[?OWDB`@i@VFYQMoC[jH@GYgBgA`@D\\[GZd@`@zErAl@SOS\\NGTz@XtADHOf@CAv@WJf@\\`CRj@f@PWj@HNKNp@v@OSSNAEWf@ZT`A^Tx@PFOJRDUNZLK@Z^C?Mh@PPRMFhBnBRn@k@h@j@Lj@j@}@ROn@m@l@uAMTg@XKY@YVEv@lC\\Fc@|Aj@Cs@VLVWXrAvGPbCt@pAt@W}@Re@GbA`AjACLu@JTxBCg@f@jA\\JB^`BxACi@n@KjAw@S{@u@OOUlAf@XZC^s@dBk@d@Rd@W@E\\|@fAn@dBj@XVv@Hq@_AmBd@CIWXOMe@d@Nh@_@?_@o@Ed@YXHGUYELQPDCSWBIQNBBYa@c@e@AVEYSd@IFXVHDKDVHOPb@\\I[ZFRPGKjBU^b@MTa@ALaAxAtAa@RYBRT_@l@Fg@_BBTh@b@Hf@s@F[^gATy@f@Nh@\\?zBaBoBbBo@RJFSDAZZEHV|@o@_BzAVJl@m@zBUsB^c@t@aBA}AxErAgDFd@a@fA`Aa@?XVGGL\\Ab@T`@i@?t@cCA@v@m@u@QV@d@nAz@~@IPY^Rz@SiBr@t@v@x@_@SVm@Pw@ISHNRx@XnA?`@TTYEf@hAp@b@bABm@Jr@nAAtAf@dA~AF_@Hr@|@Zh@h@XC@ZrA`@t@A_@PTXj@_@Ul@l@v@d@JGPd@p@O@f@b@QP`@XJ`Au@hEeArCkAnBJj@WhA\\w@?cANb@?o@\\c@QjAkCxHNbEDIh@lBTR|BPDa@g@H`@Up@{AfA]\\{APIYg@h@ZEqA`@B?RTErA}B{@gAt@SMb@XLR[c@_CAoAnEoEdAa@t@FL\\zDl@PQ?MSNFW`Ao@Oa@^VhCm@aAAZOzD\\i@Q@[LLRGTf@f@HES`@XlADk@Kj@oAX~@xCIpALt@b@~Bi@b@n@YLy@@q@UMH\\Te@T[_@Q@Il@hAf@i@f@aAN_@ZZb@NKZRJi@nCeAUf@^n@`@g@h@D^ZjB_@[ERo@r@?^e@j@Qp@ZKTb@DpAGdBc@`CHHOU[LET`@KVlD|@m@a@p@?Gg@P?JLXCY`AjApA~D|Ak@[fAENLd@WWj@SDr@VPOLl@~@HCNUEFRRTr@F[`@\\bA`AYO`@g@HJt@U~A{@zABv@dArC^zBN`HT~@SdByAlBRx@E{@hA{AUtAyAnDqChDa@hBeBhBZAy@XPOkBLkAd@q@bAQ?uDs@eCGa@[u@M}AGQNDTkALq@_@Jw@XLEKkC{AIkAg@k@AyBYyAiBs@{D[qA_@{AEwC\\KSb@CcACi@`@?pAvBzCBhAp@j@GPm@EJZb@P?P_@EdAjEh@q@E_A`@V\\fAk@@GVb@zBMPPh@BfCpBxB@Xy@XKQHS{Ap@uAi@i@VsBDmBCsAa@HMeBVeBQqAd@YEPGs@HaBpAf@UZDAPa@@a@`@s@?\\]w@Xi@p@Vb@JQLLUNUpAj@bA^fCKtDVIGq@^h@Sh@Dt@PG?JigA?Ke@kBo@cAPSb@D^{D?q@c@a@b@fhB?b@q@bDaCO[a@VOE\\oA~@I@Tf@VdCUc@RxC{@fBOfCcArDQnDsBlBqB|EuDxAm@JHuAh@bCc@G]`@JTYVZk@L`AD`Ah@pE~@dCs@pBKlAo@jAQn@m@xDe@`Ag@dDw@tCyA~@}@zCSrCu@|AcBlE_BjBeCd@qAqAe@La@b@Ku@}@EiAj@Yj@iA?cAZ{@xBqBjBgCbDuBm@TCYvAW`A}Am@@`C}@P_@n@JFMc@c@|@Zb@[H{@m@w@OJ^w@f@c@t@@d@kAbAOf@_@ZaAQi@tBUnEqEJq@^ODe@`AyAN}@n@eAJoAMYpBa@@WXQd@MHR\\BzCmA[p@P`Bc@lA]tC}C`Cs@vAWCKZU@Wx@k@P[tBoA|@[`Ae@T[nA_@RVc@CWm@`@o@rBGbAs@r@cAbCFv@Mp@y@n@Uo@yAnAYv@s@b@N~@~@n@d@DdAmCfG_EVBt@{@Jg@MyATsAh@{@~BiAZiAT^`ALn@q@xBq@Pi@xA}@HS}AJu@Q?Pm@RPo@TAk@cBpDwDpCqAZg@@cAb@UJmAn@a@Dm@`AgAJa@SE?Ql@]h@cAN}@RANwA\\g@xBsA`ACRw@|BQ|A}@lDI^UBkBf@QFk@jAq@vBaCFo@Y_@BWdA[l@k@TaA@m@KE]h@m@T~@_BOI{CIjDOPDFv@pAm@LLCo@STDO|CmCXmDhBuB@Wo@_BKaB`@aAEe@\\[H{AXm@e@iB]OP@[w@k@yJJ_CyCLn@WxBAEaAQb@Km@b@OFWu@St@ODPn@mCv@}@HqAqCh@cDBe@Ne@MWr@VZFI~@nAk@CZGiB}AA\\^^W\\B`@XEJRJWf@f@aADeAs@HqA_@m@b@a@ERRIDSUKp@_@_@KHq@ZEZo@XGVP?]VCDUw@EMUZNr@CQcAXRBVd@JbBg@G[a@\\o@Qb@BTODo@WUHIVGOTTd@z@Tf@Gz@i@v@oAg@k@?m@f@fArA@J]Rb@xAEfAQmBUxBB[_@\\E?e@TZtAH`Cw@Ce@u@u@qCQ`CA`Al@b@e@@]Ya@X?Kg@gAa@g@GiBbAbBwAi@_@EWHK@^`B~@t@L|@bBr@iA_A_@@YUS`Ad@k@mB~@N\\}@nBm@P_@]_@a@AJZiAZqA?g@\\v@i@|AMNg@m@U`@Kr@Np@f@Hj@z@`@dA{@tAa@q@s@I]qASxAHdAo@Oo@}C_DZBRWFn@h@r@K{@RaAKg@Vn@UdAb@n@CTbAf@|@Kf@eA{@_@TGJkAh@k@SYtCh@`@`A`@CPc@iAqAy@IbAEx@c@z@m@@W|@YB_@`CUEa@h@{@SKuAXrAs@eAIhAG^N|@m@Bk@a@m@`Ax@pBk@h@_AZMl@sBVTORR@wAjDDPh@At@]`A@Gc@b@o@i@Od@DXc@El@THvCs@GRTJyAJg@TLNs@B_@\\BPhBVxDcA`BgAhBe@IG`GkAy@]L]MSc@LGt@Mi@m@CvAa@`Bf@bBRdEe@WSVWFRj@H~FYnFNKKRMlCe@i@aAnBx@`CSm@a@rDOc@Oh@KFWgAWREbEl@h@On@Rf@Os@q@tB^LHg@CXb@j@Hy@R@PfAVgBQ_@Rj@PBj@l@b@fDAXUf@bAT]L`@l@EGPl@VpA@~@|@p@IAJpBHh@OS[yAUeAq@nAVnAYyAaBO}AoDw@aAPmEH`Ey@oCaAR?t@Dv@d@tBEjATzCx@B^fBj@AVTLv@RhAKgA`@?XlB^e@HLNt@HHOn@PRZbA\\Pf@wCf@QNTXhDxAO@FXvCZxCxAbCh@G^l@d@`Dj@Z^x@Ch@R]D~ANZXu@Tf@VTSf@d@pCb@Zb@Be@PCpCz@nADv@Vv@@I_@i@?~@OlB~A~@Pn@g@Fp@f@Hp@U@Zh@NKw@iAOuCgB{Ae@_BUELy@GTRi@ZQWsAJp@g@o@{@sGqBo@PCq@cAs@}Am@mABn@a@QiAIQiAIz@KDa@mB_ALEm@gA`Ap@pEt@|@o@M]eABbAUr@^XGHp@Mv@^FnCeBp@PvAm@pDp@TXzCDsA]Lm@]Qp@DPMFYe@}@pAuBb@Sw@aAe@Md@AjBrA]LFh@jGb@tCaBnAUEQ~@GkBeAaBVIHRXiAc@u@b@}@a@`BQ_AI^Mn@T~EMLG}@[|AQMMVJARd@@Vg@`@GAg@n@DN[gAIt@S}AMVQC[gBiAuAENOq@Yf@P@{@WS{@A\\SWQ}AE_AVVTo@Qi@JeCk@cAs@yCJsBe@]_@h@uAl@]t@EOS_BIQSHWn@YbAZx@EpBh@jAl@`Bu@RFq@PPRpBa@tB@fCXfFYbA]Kg@dBm@oA@OSy@GvFYhCo@kEk@eCs@yC@MGp@WmG{@cDBp@AUHTn@ZLaAZaJF}Ao@uAPP[lCGPGEOz@g@v@IZ]q@KcA`@DT[T_ARuAGeBXsAID]RGbBKjBVzA]BSs@c@RGhJOvBeBzFwAvG}@qAMg@iADQ}JIwCm@kAk@i@iAuEqBWL|@RuE[oDy@_@B\\RSBPVm@HKk@sAChCUoA_@iAQWB\\NQDkGU_HmBM@`@JeEj@pBd@c@PmAIqAi@cBTVRuBPaEYyDNMFn@^{@PoA?`@TuOI}Cb@cAGuAZyJJ{B\\sBDwG[iJ|A}GD_DReGtAeFf@wB@kDf@`@_@zAQDKcAG`AOk@g@oA?]_@gCAFQQUiB`@x@r@iEc@_Ak@wAA`@GOGaAFoCk@{@@}Ak@qCFs@S[NTTjFdA|EVlAj@`BRvBhAk@RKAf@Q}BDc@Mh@GC_@_Di@Y[yAACNs@QQn@yAgAoA]sFq@FPj@NURg@I{Ai@U]wB]x@Ef@Yc@]wCt@{BpBoDdAcADk@Ob@m@]a@uA_@j@GuAWWFEbAy@NfAr@[LaDE_A]c@u@aG@{CZcDv@}FVgIdAiFLb@Y_DDcDd@cCdAZXdC?bChA{@NmOZmHUwDg@wAr@uBFe@t@o@c@{BbAORNJdB@wFhCxAcAFk@WG}AVd@a@MIx@a@No@z@e@@Wg@QFYsG_@CW}AWc@]b@IhBV\\^hEDVFKPHDtBBnA]iA{@uL_A}AP}@rAqCb@@Na@PkEKeFjAyCHkG]kFV{BQx@_@BMQEkEvAyASHYbAS~BF|@g@WAt@m@uAFuAM\\WUCaBHgAj@mBIx@t@uCi@nArCm@n@sAIJZgAB?\\dAF`CO}BtAIMz@q@_CA[}@f@eAd@Ye@w@oCIaGmBd@AFs@`@Uh@j@rAFVKGU_Bi@b@EA_@}BUf@`@MB_A]j@[zBJfAe@d@LtFq@vAy@Ji@_Ai@eAATMSM|A@d@YOs@HKU[eA[cBL]]zAOeCaA_COq@j@#pwNuhIdG{@e@[mCCiAx@G`@#bkMsfLjDCt@k@iAM{DVEb@h@@#veNukKc@Fa@f@pAVvB}@cCI#n_OmhKGV\\b@tDvAfCHh@u@iB}AsGI#dpNaeKw@j@nAlB\\HxAm@Ay@o@m@}AM#nlScaNbCGhDmB_BA{@RaAj@sANQPTT#vsQeeN{JByATh@Df@^z@BlLEx@][OcCO#lhR{rN?d@^LpBa@~A@XWOQ_AImCDm@X#lpP}aNnAJvCW^KDa@cAQeCJyA\\AXVF#rgQ}sMO`@Td@~DDjGe@pCg@aCqAuEe@yAFgB`@qAv@FT#jmTqjNeANWf@tENtCSdAVxBSfFFuA[kKu@}ACuBT#pbVkwM`BJpBSwCy@_Fe@bDfB#`qSwfMzCw@TSxCi@cAe@{EMoADgB^Dt@dClA#~oRemMgDj@iH_@oBRUV|B`@w@BOPhBR|B`A}CMoBt@HXuBMQ\\BV`ATi@Vb@\\]NAZ`Ef@vBEZe@ZNs@`AzAZdBMnBmAjDmAzBa@dB@dEyA_@k@eASw@BaCbA}CIOi@u@LEIZ[z@Sg@MeBJjB]fBN|Bi@kBU{A\\PYx@OPUeBMaBFOI~@Gm@K#vqO{vKsAg@sAn@uBPy@`@eF~@s@h@Uj@h@d@sEMs@^RDqAR|CbAhGq@Pk@nBQF[l@Bv@N\\p@rBj@~@v@vCd@TCt@oBxGR@Ms@m@gCo@VuA{@_Es@{@s@Q}@VYb@XTc@L[b@#~wM_jLwB\\@jBT`@rBb@tDF|@Ej@o@Pg@O[aBkAkAQgC?#bpNikMyFCwE`@wDrABNk@V|@J|JKlFVvASn@gAvBUFSOIVe@SQeAAmDV#raR}|MFXi@l@VXIXx@P_BPMp@|@Ql@PE^e@TpAIO\\~LFp@c@aAKrBSaEw@qBM|Sd@r@QcCw@oDVy@G~@@j@YOMvAQ}@_@rBGeAa@yAFw@^mF`Ac@GrA_@qBElDQuAMtDa@cD]kF^X[}@OiEj@#leSwnNgBPs@XNX]Pe@YiCMcCZPZiCCuAPuA`@t@VSZ{Bb@YV`@Z|CL|BS~A{@rHK^KGKrFTnBEhAUVWu@KgFFQIjBGaCUbDG}@Wt@QtCb@LIk@a@|C?FOe@i@gK?#h}PazNqFvAGRwGNULLb@cAPcCJpA]DYWEgDHIb@x@PoCJk@\\~@|@_EIaA\\gAYyB`A~J|@bCx@z@MDa@YWj@FVL@b@NNq@HCN`@JtBSYd@h@f@v@CzDoAFJuBjA`E_@d@B_AXvEA~Gu@cEOvGMfA[}AEhEe@iHk@YQyFQnHO|E^b@Ea@M`@AdET|BYMU{Fi@bHLvBc@|@y@gLPMQ_AIdFHbEc@gDIvBc@C[g@EkCDcAV_E@zHw@o@_@uKY`@OzCEASeFAcFj@#hlQu_N_B?wB^AN`Aj@iBa@qIKyCb@nDFkL^GJ`@HnKEgF`@aEp@OJxA`@qCVWIHWi@GwA\\}AMe@Rw@[eGj@IG`@KeH]eCa@iCLyEOoDLu@VgC@g@LZNwBD]d@lDl@oC@s@RjBPpAMg@RXj@jITdESd@WCYrAOc@Zd@`@rDN|BSLP|@OhARvDKKL|I?ZOk@i@d@I~@ZPSp@H@RfAPdEKrAUQSp@N?PjA?xA[h@s@QM|@[B]cAq@Ve@rDcBrBN~H@xCm@mAQ~@@xDc@cBIpAUIKuDSwH^#fxQyiN_C@_CXpA^oA\\t@TdJ^LIGI~Bc@oCKnDOl@St@]s@Ov@e@_EEsDTw@Z#jqTcgNgDF\\RzEXoCLEZNR|Ib@pFe@HIQI^c@QSqDSoJQ#dqUobNOHjD`@gBf@vAF{@d@pEb@F^d@PvCYC_@e@i@RErAL`@d@~@Fa@ZhAl@b@@pAg@J`@RFi@VjAZbBDvAeA`@^d@FjCI`BPn@MQMFO|@D_Bs@kDKmNkDwEMiFF[GbAQiBO_Ed@#xcTkzMqBJz@f@_DQa@F[`@CSg@E`@Wc@Q{C@{@NWl@jAdBl@RrE^dCM`CHfAUdCb@pDLlB`@zHj@dEAlDo@sH}@iFG_Ci@jFRlAOdARvCFXG@]kA_@lBA\\d@bAG]TPNpBTlAY~@ZtCg@fB@vBUcAe@kFE{De@`GPpCIgAYiJYlGB~@OUKFOkAQ}GBpEYq@[sBKaDHiAn@_F@eDr@d@TeB@cBt@gKFc@ODUxDm@sAQCQxCc@TUaEgAeBKgAN^\\W\\mAh@x@ZWD#heQonM}Dd@aFGsCZrDpBz@JWHhCvA`LAwAPg@TEVvBvApEEJ}AdAkADcDo@KiCRtAk@AU]IgJW#~_RgrLg@E{D`AmBvA_BLhGhAlDOxCg@NSzABVUdAL|@a@SSmBGqA[IGTUUCRQeBTr@i@k@_@mAAw@RDR#vjUudM{DKYi@kA[gJx@PZjBh@k@JiA]GPYAyDy@ASdASZOEMaCD{FtAoBdDkAPcBs@lAs@jBgE{@MZKIMwD^_@Q}ANeCd@mAj@e@hAeAvAaBnAEf@f@p@ILyDtAcBVOEHWsEhA}@@WZ}A?c@`AXZz@GZ[`@\\rB[hAVMRPL`DWkAf@Lt@eCw@{@Aa@JL`@s@NL^nEf@xLSJG]W~EOf@KNe@n@EzCvAvDL|Ep@dUf@hBy@ZuA`KOpD[tBkARq@aCYgKYeKNiEOhLkA|LR~HG|CcAqBe@_Kk@^GMIgCCx@KtM^x@OaBe@fD@pAUIm@qCu@t@a@UScD{@cEk@aK_AuAL_@l@B^xA~@#jkVenMiBQQb@sBk@mE@wJnBo@`@hUbDlBjAdCPr@rBb@VhDVv@IxEbA|AMjCeB`Gy@lBAQ_@c@GHM_CcACq@qASr@WCMgE_ClAYdByA_Sg@cK~@b@V#xmQmxMj@C\\_@oAKg@f@l@F#jlNu~In@jAPEYk@FM~@bAr@Js@w@FGfAr@TGaBsAKi@NfA]SW_A}@b@C\\#z{Q{fM|@KCYi@Ks@Vb@X#deRulMjCJxAQoGg@oADxBf@#~rMejLtAWPWUS}@Fc@d@NT#f~MekKfCg@m@Q_Bb@DT#btK_fKoALn@Tz@O[S#liLowJZMm@q@_@A_@VpAh@#rvL}eKtAIxAu@{CZa@\\LD#dtKq~JnBe@FQ_CAWL^j@#loNesLMNd@NbB?MV`Dc@iAU{@JiCI#tfNurLKLLD`DXu@_@mBM#`nNimLf@MuCcAAQ_AGSPzBjAfAL#f`NcoL~@IBi@eCD`Al@#d~OeuL{@?QPfBBv@OqAE#hjOgzKcBR\\LpAGQQTE|@BB]`Aa@gCVQHDV#f|OkfLx@SGa@TQs@i@w@XCx@f@\\#dpO{xKtAc@Hs@i@@c@\\_@f@LN#|}RazMk@LpB^pCBu@_@pCDj@Ge@UxBMKMcAG_GQ]DQb@s@P#twRs}MjACoC[{B@~D\\#biSs}M{@CiC`@vARpD?n@q@_CKJJ#pzRsdNhCEP[eDC_C\\hCF#xoPe}MtAAnAm@yBQq@RVTQV#nwQ}vMzCZ^SaCc@qARVF#lfU}dNzCCrAg@kCUmCp@h@N#vdUs~M~FI}DSiAJFP#viS_tMxCUo@g@{@OcBJi@b@~A\\#ryIcaIV\\xAJEXc@@C^xDjEVn@E^_CcBC`@m@OuAF~BfAu@Ij@j@mCGGVU[ER\\`Aa@_@gCy@If@YQgACcAVIb@tBdA}@CVRs@HNX~@ZwEo@Tl@|Ad@GVz@Lm@@j@j@e@ZmAeAqAUv@jABj@IHa@Qa@k@Yj@rAlDp@Gt@N@eBpA|@^G_AoBZ_Af@Sz@zALBQa@b@Zh@BzA~A|AF^KEQuA[{@y@qAi@tB?J^\\DlBEs@QAm@tDr@xHa@vB\\~@IN{@iEuBfDGaAe@LRe@H_A_BqAPTQW]h@EBYe@]m@HZi@cBaDq@SVQq@_@A]i@W]g@aCo@cARCUi@F#jqRamLb@Pf@I@k@w@A]RFP#|sQyqLYJV^l@?KQPWXh@RGUk@iAF#p{RukLzAQ{@]c@DUNXX#jaTgdLHNf@UCg@[@Qj@#pqKixJDLz@ORWe@Ao@Z#bmNqyMAJ|@FbAIiCu@_@Fh@b@#|~LibNbDKoAOcCNn@J#jwG_`OxJu@vBq@}DQgHh@a@NT~@#rsBq~NhABnB_@BQ{@GaCt@#`mB}qNtAVzBA~AYuB_@wECMPh@T#vuBifNXDb@oAiAOK|@VZ#bsBgzMVBlAqAEs@aAH]vB#noBivMUh@mAHUT~FFj@MEq@kDQ#doBgdNt@E_Ae@k@?GNPLj@L#dzDgiO}Xz@te@`@FT}KYoQFwJQaCv@eKPgEd@~Hv@jg@^|@TOPu@BsIUyOHoBV{@b@}CM_Ak@o@G_IGi@ZBl@dAr@xHdBXNOLy@YcKiA{FgAqA?MXqITkGkAwJEiJXgEf@rIlAfGRk@Vt@TbMd@cDZlBb@zHNnGQnCp@D\\UPoCFMHX`As@B_@\\pCT`Al@pBFdBZa@R|CxCCNeA@gBi@qGd@e@XjDSfBLyAp@yD\\kDG]XHh@t@^vJ_@xADdCf@nCSv@TqCTW`@u@XwBEmEb@RVyAn@Ut@Cd@\\Vt@BnA]v@?hFx@rBSiB^mCUg@b@@Nn@^c@@q@Qe@q@wA?wAfAq@LKLFZjANxBCENrDPbDYe@o@j@QKXHHfARYNZ\\i@L_JZZfAXDtDD~C^nDYhB[nAk@fB^fDq@sC|@~Fx@pFe@qCd@d@NdDDi@LeKi@cAWyDAaL`BDfBh@J@j@bJkAx@e@t@eAtK~@u@H{Hm@_@~@HLbBV}BE}KdBYZqADjBn@CVKXWc@mBIOzB]`AjDLJoAp@rA~BA~Bg@z@oAx@a@hGeAnFKLDIL}FHa@h@bAb@lCZnIGsA\\`@b@vDj@eHDiDMo@NbDb@z@d@q@FeAi@kH]sJh@cHDl@V`CTGPbDHY\\nB?OTNFpDb@SPxAV^^zCh@hPjAzBA`ATfBIUXhAJlGkA]b@d@Hi@j@|D`AlAv@DVpBhB~@Rh@f@nBb@fCe@o@z@tC|@@YZIZj@r@@XQr@NPXbALp@Wg@]AWeB_AnDQqAXj@V`@n@jAU{@`@CXhK\\uBj@dCx@rAKpA@@JW`@}@I_BvAfB\\NT~COmBb@qAADf@Sf@j@R@Rt@BR^GNv@h@xAA`A[kBn@v@l@lEB}C\\`@rAc@ZE\\~AZu@FnAtD~@p@nDOmCh@Q`Af@X~BS{@`@p@Fh@AIQbA?FQk@a@AQlAp@xCc@Aa@oAQi@g@zBj@dCc@P_@s@}@AYZVjDv@xDAMRR@dAIDQwA[zB?Fe@`BQXo@n@MSSd@g@mBe@x@EbBTH]WOxCo@Cq@eB_AvBj@vEcDLWQ[RUaGg@l@?ISzEh@`@U_BeAoA?BOa@G_A?eAl@Tq@nAMvAuAo@nAbB`@O_@VDbB~A^J`@g@?s@`@}Ad@KPWwDkAiBM|BJ|Br@f@?h@YvA?Dc@Wi@v@MqLeDjJfCpBHBs@i@o@kAc@aCIbGUd@]Ow@aGcA{Jl@nB_@w@QNE~CLpBSvGx@_@y@uAiAuH^uAcAlE`@jFOcA}@wAScEb@aBMaAe@xAHa@mA{CGn@OjBFw@yAyA[\\[c@Q|CElALtCMxCo@dEWfBw@gAWqGL_G|@gDF~Be@Ks@dB_@uC@fAWdIKTYiAe@aEc@nD@dBXt@GFKcAa@d@BPi@lAy@_@Mv@F}AtA~@h@n@BUXHLpCP`CKp@WN[eAsA_Bq@rCb@JWcAIz@SgCWc@Y?a@`A]j@PjAOBSaAQMY^Yx@NfAc@Yg@Y?lAiAfE?gBQMKN]{ASlMcD_A_@t@c@tO}AbLe@lBX|ASrEd@rBUfBRxBIqAh@^@hHWfF}@qGq@bFG~B[g@_@vD`@jBq@mBWcIAmA[yAG}IRJUc@YlBa@lD`@xDOpCXpFq@yAWfFDpD]bCm@o@QXOo@WcD[sOo@MCTKaCS}NYkBu@cBoByBSdINlEKz@QHUsBq@_E_@aF}@_DKcC`@b@e@q@YuHNcAu@ReAyCa@eFFsOfBpO{BmBUaYs@oDd@QRCpAgBk@Ua@`@O@YQMiLrAmGChF_Av@k@}DAkFJyX|Bg@MTq@Q_@}@UPStFw@_VLeBMdTYrGBbAQ}@UwCF_No@uI^{Dm@}G\\yCb@m@_@xBSh@UmEYwDDe@Msh@C";
const LAKE_S = "jfOigG@j@w@Lc@G[TSa@kBk@?J[e@aAc@gAE}DTfAKeAe@oEK[K\\e@c@HAr@`An@~EfBrDt@`Br@vCT^MlABaAMXKXFbBg@w@}@Oo@#hyQa|HOTp@UFr@RLp@KHk@GkA}@s@RIp@`@o@eAP_@v@LDZTJ?uATa@h@VDMS[n@AHl@`@Cl@eAn@S|A_B?KwAWhBAn@[{@gC}BFmAXdAi@FUw@mAQDHJ_@Br@RX`@]RaA]DLj@F]`A_BxBLLCNg@h@gA~CYJ@TuAxAR^CfA#jhTqgKSB`Ad@HWRCnDQjA?xB`@sH@hAPbC@ULHNp@?bAVz@\\HL[@VRtB`AvCl@VQt@F~@ZHXSJf@TxK\\jBSTOjCGvAo@wB^aAMBUaD\\DKWKb@O_AKDMe@m@mCEi@ShBiAV??o@pAAx@e@@QmC^sBl@uAEKRaCx@s@BiEYgBo@mAeAoCi@yBCoEZ#lyT_cKOG~Bf@jCTs@HK\\o@?kC}A#txM_uGFNfBx@w@Th@XOz@vC|@pBA~BWfBD`C^tASg@w@eBs@sGg@c@N}@@BL_@?a@K^Ac@]n@HBWzANaASeA?^RMBoFqA#n_Vc~KaAG^V@P|@ZML\\?XXGN}@APV|BNhA[fC?hAd@_Bj@jAHjG`BZ?TSmAMkBy@[WE]v@IlCb@b@LLt@rAX|Ge@{BYOYVOgBa@i@_@lAa@wEDc@GAQdD[tDEEPXVv@QzEAPF?PZCPRt@k@EQgRmAuCe@mGg@{CVbEr@nAl@wCT_ECsAMcAg@{@KZn@#ffOggGc@Ua@{@O?G`@e@H@RPHnBF#|vNagD\\f@z@u@_Ak@Yx@#|kRokIT\\b@[`APvDiAqBWTg@OU^Ci@IHo@m@Gq@JfAb@WFDVkB_@b@`@X@BLx@Xo@ZQn@yAQQZ#xzTg_GAJpAn@To@RP\\a@l@gAHk@u@K?Vi@VQf@ME?i@}@Jn@VaAv@#vpOe}Gj@BT^?R_@RxAX@p@^r@Kk@R`@JCOiAx@p@f@FL`@XHFhAj@v@On@R`@_ArCFhA\\|@lAtAfAZdAMx@aBCkBVaBg@_B?s@a@e@?k@e@mANQb@BhAz@JMO[Wc@g@QG]yBsCGj@e@_@e@C?LXTMNeA_AgA?gBa@sAVi@X?L#`_PczGdAdAITM@k@u@Mc@JC#tnOwaHQAd@PbBMKs@FA~EPdBn@lAQ`ABv@}@ZKvAKl@\\Bi@b@k@jCdAdAFxCr@t@Uf@La@y@LIfEr@t@K{FeDkHiB]aAuAY^n@g@Gm@yASAORp@h@ANWUi@GWc@\\e@e@EiDj@}CB]^c@lAe@b@{@PwCA^|@sA~@d@~@mAPAJ`@FATSCXb@MJMG#tjPsjHuAm@dCj@HRy@Q#tcPigHICZIvAJz@p@e@HAMHZMDuAaAHGm@C#bnOyaHa@EOH?\\}BV}EHsBX]KOHRDGLuAIMNw@A}@fASEKj@y@DJ\\ULNFs@`@KVMKCT\\?RQb@HU^N^jAQh@]n@TA_@l@@_@g@^HXUDi@pAAcAt@ObAtAdB?bCLZ~B|@n@eDj@g@bBXEFV\\f@Tt@WKk@u@SSi@c@UEqA\\g@CM]@f@y@~FyAYs@UJ{B@\\c@f@GIOZq@#`iOs~G\\Qf@Vy@HSIFE#|jOm_HASv@GWb@]G#neOm}GsDt@{@[j@XSDy@q@RA@QR\\Zo@f@Td@Uf@FHFIPl@IPYhAJs@R#|_Rm}Cr@lDLpBC_BPYSBEcAKMPOEi@HKSSUHE[OR#vaSqkJZJGR~@VB\\MLVXD_@|ANa@[ZEYQFQS[HAUc@a@Dg@Wm@B]VFN#fcRwyHv@\\v@EPaAnAkB_@LH]XOXu@h@S^PB_@_@Ma@ZI[q@jAHw@[?MPAl@c@V\\\\B^cBh@u@p@AT#|mRqaIRB`@YGWNg@D|@R_@JgAc@_ALe@l@SHHKD?^Z]Dc@\\ILBIPJTZD`@YRk@YIm@Hk@MeDr@?vA^l@Sn@Fn@YOEd@HF#tiTqpJfDb@`Ab@FHKNhADJRPW`@XDWf@[w@?kBeAwEaBwBRJT_COwLf@pIMXVhAJjED#rfMu~HnBfAaA{@FMzAbA`@j@BlAr@`@ZCmAe@LSKy@Pb@f@Jw@aBJACOcDqAOAHPq@Gv@d@kAOh@P#riLg`IGXrAv@Rt@Fw@nA_AIg@V_@YBKc@Ih@]Q_@Da@MMW?h@s@CP\\EZ#jkLe`IBQa@T@_@h@Sl@Dr@d@QXaAVw@SZY#xjQqsHL^^g@EKnADZPoCd@n@JnAn@x@Sb@JXEIi@w@KGWLIgAm@zAZF_@k@FUUm@EPm@MG_@p@[HJX_Ad@#dePgwHTHEf@Ln@l@NX_@NV\\E_@e@dA\\JMUABa@NFNM[EKq@q@k@eAXX[O@a@\\JZSISN#vzR}hJc@A?RpBlACJq@Rd@NM`@dAb@^l@rAZPR^GXXBs@SCOy@Kv@M@qAu@@k@^IIUl@Q@Ko@g@?Y_Bo@_@c@O\\]S?j@SM#ha]qtJnBZNb@`FVZIDOKOkDa@kEK#vm]uhJf@n@IWHIfBQf@Uo@QgCj@#rlV}rFPNT[c@_@Cj@#`gPmrG?XXXB{@WQEX#n}Lg_Lm@s@B[m@Ca@DiAn@aE`@^ZuADhAh@lAKnALn@QxB`APG[QIq@|@u@#`|RcjKkAo@m@LGS[JuAWMNX\\t@DJd@k@Zb@RERr@PPAK]JS\\t@JWvA[Xo@m@K#lnQ_pKqANl@NpAMvD@xAYFUkED{BT#piM}rG?lAN_ASg@PgAQkAKTe@a@PVFfBZx@#neTe`JXBHc@XOa@Gw@^A`@cANVTIl@tAbAJ\\XeAt@EX[MIk@Fg@RMXOEQk@_@[t@YB[#pqU}nEPXPAt@w@AMSCcAp@#f|UajKFJjAFpDu@iBe@{CfA#haMymHr@a@CUy@@k@TFXl@D#bwSsgJ]HDn@nANr@Ex@VKe@FI]BcCo@#pmRohK}@m@?Z_@Vp@ThAE]U#|_S_xJm@SVOAOa@MiApAAr@REFNp@w@~@GGM#lmMe}Ir@PCGTGlAMPc@cAIa@JKRs@J?L#xuNg`H{@BSQoAAi@VXLf@Gj@HBMvAI#l}M_~I]e@Eg@WXDFcAh@xB@#pzMmnI@Ma@EOQoBGUN{AGlBb@gD?dBRP??KvB??Rz@Ld@Ii@Yb@C#rzM{nIALtC`@nBCPGEOl@Gu@WgBIa@YZQgABGEPOe@Es@L~BnAaCC#lq]ahJv@`Ah@UaBk@#bnUaxJl@j@xBQgDY#~}M{kIf@`@GTRAFYSu@WOKH]I@P\\FOHHD#fuS_vJTFD\\ZIRJAk@NGSGWNa@a@_A@hARe@FNF#nnPoiIo@YaABPV~AA#voTctGfAUm@WYl@#zz\\axLhDN|Aa@aCOeC`@#nhUqjHFUMIU^Fj@P??SREQQ#feU}~EdAaAj@\\x@SZ?RRNUmAWQw@D|@MR[D_@_@gApA#xpT{kFJd@pA`B_@F|Cp@JSu@W{@?k@w@BSi@Sc@u@#heRifJQNi@Br@v@|@Hx@j@\\Cj@V`ADBLVQgAs@a@D]W?\\[CAU_@KE[_@GNm@EOQJs@SN^#zyT_mJEl@TBx@SLa@d@GU_@{@GNNmAHPX#ziKiqIG^rAGENz@Lx@GJU|ASF\\xBf@a@r@_@FHFdBMHIs@KJWG_@zEgCQZJNQd@JAn@gA?SUEPkAMMe@VP`@m@l@ARq@h@kBr@sBMbAgAZCOe@O@NNcApAcCERQ^?UeADWSNBZqBrAqBE#njPeaBf@t@j@JPUmBw@FJ#|yPq}HOSy@JkAg@a@PdB`@jADDI#xpM{mH^Rr@k@@j@b@LW_AZN@Vn@EY_@k@UcBQAd@[BGRu@VZBx@U#jhMkwI}Dc@X\\dAVpDNe@KRKaAI#t|^qxJTLCLh@RBYr@@g@KPGQGkAB#jyTezF\\XA_AQ@UZJF#`uWkaLWO_@NZd@REF_@#`lQ}eHZVXMJNFU_AU@RKA#hsPypHHTRFd@IJUKE]Pe@I#`xMcdHJb@v@Gy@o@IR#ztVyxJ`A@u@]Bc@m@TCL`@Z#liVkxFJB\\]JQKMU@Sv@#dlVokLg@e@g@ZVFJRWZ~@NB}@#~tL_tHN]VILZVEHVHK`@DNSZXYk@UTw@_@S@EOL[[d@SAo@^Wh@N?Pc@XN#lcJ{rHMOENdDtBp@@_CeAUa@m@O#vtWmcLX@Vs@\\Gu@@w@X?V\\D#|pWucLNd@PFz@ABYaBQ#tdVguK^k@mAMc@PCh@NV_@BAJbAIb@_@#vsPaoIMSy@CmAV`APrAQ#feQe~H^?^a@}@ISVPR#btNapHMSk@AKd@q@M_ATEj@NB@c@lB?|@c@#~kQynIvA?p@S?S{@KJPSFuB@n@V#twLgjIUDNRIr@Te@RJVIJW^LKSa@CLS}@J#nkSwwIn@@b@^|@LTGBUC]_@OaB?e@H?P#pgQa`H@RX@XWe@SOT#poN}sGHNNc@YSOe@i@p@x@Z#~iQuuIu@FvCf@dAb@q@s@EYoBE#vdVqmGZHX]y@CITL@#z{]suJ~CFTIuBM_AN#|~]gsJVFq@RpASZY_BHJF#vcQumH\\Mw@HQM~BOJOGMp@Oc@CDI[EWZJV[K?JaAENNk@BIVa@P`BG#r|Vo}IrABj@P~BEWp@aBfAEh@t@eA|BkAAQ~AUeABfCeCuBbBc@@?RSPqCDeCYeAZv@K#hwQ{}IFJ~AAqCg@t@PKJ#zvSmhHHFCQf@o@TXp@DHPxAIz@Jz@l@Fa@p@Go@?WL]WBG{CEaA[AS_@MSFDJUVEj@#l}RihHv@@YSFSv@KAa@\\Qz@InATVO`@N@Ic@OYNiBS_AVMl@W@@Y_@GDLYx@w@JsCIr@RfBHl@U#xqRkxGd@l@^FG\\UDO\\f@ITs@|A?qA]k@LSKYy@B[r@Iu@Gz@u@e@BKMt@qAIiA`@k@e@PKl@Dx@i@p@Jx@YX@pA#rxXqsJz@}@nBw@v@q@oDzAs@jA#huU_lHf@HHXP@c@o@f@GMI[B]V#tqSqpJt@NVXPCKQuBu@u@JJLjAF#ppQekHe@J@J~AEc@YWF#zpQwkHaAOYJd@Lr@?@I#hcR}eKn@[ZLTi@kCEYWC~@{@`@XLr@Qh@HZMOC#pxLisKdASj@\\bADbAW\\c@m@?HLWBo@QXMQSd@aAqElA}@z@RJQL`AEMM#~|MseH]Jh@ETa@BN\\{@{@e@f@\\UEBJk@JTp@GJ#|`Se}BNLrB[_BKc@X#byO}kA?Rh@DAQ`@?V[{@Ke@^#paTgoKhBPnAWzCBiEWE_@YOIZa@IP^]Cs@Z#raTqoK{BGODC`@YBb@Xl@AXQAQd@@XY#tjRmnGuBhAbASrA}@\\g@Sa@A]KPTf@s@t@#zjRgfDMDP`@Ng@TECSPa@o@\\G\\#t`TaxIp@{@IKc@BHUQGEk@Mb@VhB#~gSmyJTXn@NKe@fAg@][z@@U?O[WEWP@XOCNPiAOYYIV|A^SLy@SP\\#hrQguKh@ND\\|@]NL\\MSO{@GkAF#lpL_qIODnBRWWtAKu@_@h@Ic@Gk@TBVeAL#flLgoIFj@XAHT^Hy@iAn@[l@Co@O_An@#|uLgsId@NROmBIKYVKIKi@t@zAD#jePedF]~ALn@J?Iw@HONBGs@f@}Ak@dA#`bOesEg@x@fABy@Qh@a@PD@]c@L#~bVaeIk@A~@THa@rBcBqCpB#bhUswKbASGc@a@CILTHyAd@qBE_@@f@L}BV{AEXRU^N@Ze@jDU|AB|@[#pj]omJf@Fc@Lb@@vCa@s@GkCP#ld]kwJgDk@~EhAw@]#xo\\mwJUMa@Do@\\LLxAc@#zbPqxEw@G_Bv@rAg@jA?GG#|aNmhHcARp@DCLRFJk@IC#zeRcdL]Hd@ZXIKc@UF#vxQgxIaB_@UFtAZ`@C#v~RctIM[a@@Hp@`@ABU#htS}qISs@[D?Xd@t@Ha@#r{JmgI{@l@jCw@oAH#f`SsfKCh@^FK]P[UKKR#peSq~J@[q@a@MD|@v@#doLe`JMn@w@j@lAw@Na@[]BZ";
const RIVER_S = "v{OmmEMj@#vyO}pEX\\#tyPc~Ho@JaCQ#n{Pw~Hc@P#r|Py_ITY#l}PobICt@#p}PicIFS#ztTymJHd@#nvTmnJs@R#heTorKeAY#pbTosKU?#rgRa{KJQt@KjCd@~KK#|~Qi{Kw@c@#`rOg`EQf@#trOwdEAqA#xjOwuEt@d@#fsKakI?q@#ziU{vEq@j@DL#dkU}{EJw@#blUa`Fm@]aAXc@a@gAhA#xpT{kFlBrClBl@#jtSczFFB#|`VcoHXr@E`@#`aVgvH@~@e@Z#|_Vw{HErB#n}U{aIdAi@#xcVsdI_@@#b}TstKkAd@@L#phUgyKf@RgA^qHd@_@l@#~xVohGUl@#vyL}lIv@_@#daM_nIi@I#dpMonIhO?jAW#l~Ue~JyA^qDRgBCsCm@cBGmDP#juTwvGh@U#plQigHo@C#tmQsgHXB#~kR}qGN~@Y^uCxA#~wTw`Hb@{@#ztR}bHi@f@F|@i@jADx@Yh@Z|Ar@L[v@a@L#vxR}gHvCQd@g@n@CBk@r@SjBRj@MZN#`xSckH|A|@bBBdBd@|@S#vzQs}HR}BfC{BhAkB^uCGe@\\c@ESs@Q#zbR{tIUX#dcRmvIkCy@#lzQk}ImCm@#lsQc_JaCI#xmNucHr@{@XeAKS#zzVc}I|ASzATvC?xDuC#jfU}mJUF#`zV{}Fv@B#bcNghH\\CMQ#fbNihHmAN#~jN_iHPB#pcNkiHFQ#rfQ{nHwBK#vyPepH|@G#rlRchDy@bB#nvRcwDr@a@#p}SulEAg@#z|SinEAe@#b_Nk`Iu@J#~tMq`IkAF#jaS}}BAT#dgS{aCWE#zoSkgCMF#x{Vw}FFF#bkVgfFSK#dkRmkIgGaA#~qR}mI}AjAgBH#jeSinI|A`@#f_SkpIK@#dcOssEkAfA#fcUqiG\\E#j`UqjGk@i@#`uTamGZY#xzSk_I_@d@|AdAhDJ#b~OawEbBq@z@H#zdPu_FN_Cj@uA#rxXqsJxA{AhCkA#dnSeiKWg@#txQ{pKyKj@#h{RqqKu@O#z}QwsKtFN^VhALxE]hDF#xfOgwEeAl@#hnQmwHSv@FZp@\\J^]nA#dwQgyHGW#vzQs}H}@fA#tgSymJW\\#ztTymJ_EqA_Eg@}HKiHP#trSupJkBC#bdSo`Kl@|@#fbSodKi@ZxAbA#lsRwdKmC\\k@Q#fwRydKuA@#l{RweKIh@qAG#teRkfKUSkBSM_@#pyRsfKXs@hA?#r`SggKEn@TT#b`RwiKa@eA#fvQ{lKtEB#zsQioKIU#h{OalEi@v@RVfC@Tj@v@Lb@bCdA|@LxA#pzO_pEd@pA#jsOcuElBLz@r@`@bA#jzPe~HU@#btPi~HyI_BqGz@{Ba@yAcAiDb@aBdAyATeFuAsAaAsE_A#r|P{_Ic@b@#h}Py`I?D#p}PicICX#z_QycIaAC#reNmdGbAFj@u@jAMb@l@`ATZv@fAZ@T}@dAd@t@x@d@#fxPgrEZ]tC_Ad@oAx@i@Zo@pGiAf@Vf@K|@XnB}@Ja@bAGhAy@fBg@j@m@p@HIQTOi@Wx@qAh@cB`GcCjAXhCfBvEm@hDCxDa@lELpIqAlBDr@c@x@yB#x}UaeIRiAjAaAD]a@o@qCsAMm@kC_AoENeDo@i@c@w@wB#vgUywIwA?e@nAQBuBq@VW[a@Hq@]q@H_@Si@P{@wD]}@e@n@kBw@}AEo@^gAwAQ#nvTmnJOSh@W#dgTorK{@?#bcTisKQE#zaTosKiB}@QcAs@U_Cl@aHb@cGi@aC{@oDIUg@{@W#rgRa{KuABq@UmCH#f}Qm|KcC@wAq@Sm@#bsRslEcBe@Aq@SQmB]_CvAI\\k@?EZg@@AVcA\\i@d@FVk@RaDpGoB|AJl@WrAuA^BhAm@n@#pqO__El@lB]rA#trOwdE?fBSf@#nlOqtEfEhDRjAs@`CZn@#ljO_xEUXb@l@#nfOgzEn@hA#nyP{|ACs@kCHMKd@[Ge@`@UOk@w@WE_A#zrKqiIJo@#fsKslIm@]sBBaBj@mEZa@d@mALuEkAkAA#v}O{rAuAk@s@b@k@Gg@uAgBkAIk@{@w@_Ab@eC_@aAe@kAA#~kUokE~AvBu@j@#nhUauEr@f@RvAb@d@?p@m@r@HZf@H#dkU}{EBvAm@hA#blUa`FQjA#n`UwaFrAl@Jx@v@M#twTyeFjAvAFpApB]La@dAV#rtS_zFjBRn@`@n@AfAz@xBFrBzAfBSp@`@jCjDdAv@VA#ptSo{FEj@#lzV}{GbBGx@_Bv@G#paVmlHf@l@@\\|AOf@]`D@Db@p@XVb@A\\o@h@MvASTsAAk@pA_@JO`@tG|@jCPxBO`BX#|_VksHe@@Mv@rAlA#v_VcxHh@z@#dsUiyHbBwBdFyC#t_VecIbBk@#xcVsdIZnAwCjE#z`[meKVc@fCAzDvAC\\i@\\oCz@F`@lAh@Kd@{@l@`@\\#`vTsrKvCK#~|T_uKBJ#phUgyKr@k@Uo@HYjAgAzH{@g@u@LG}BIZQCSm@q@aAY#lzRspEaBjAeAJaAf@#fzWabJ}@UC_@gAaAEk@m@GsDpAmBbB#nbVggIv@{@bA_@pCO|LwExBOl@nAMfA^TeArA?x@i@jBZbAc@rAiAvAJf@qA`CKfBFZjAf@bECl@N#hvT{mEnAHjD_Ar@XIf@fAEvDdArBA#fcT{pEQ`@Zl@h@RfArAp@Ip@q@jAThBcArB\\xAM#zuNmaFQbAPVmAhAGx@]H@~@sA`DeAz@Tl@#z{NifFhKtCrBlA#|mMsrGTn@y@f@GfAm@L\\fD`@hADxC#rdW_aG|@s@#hxVagGFThCp@~CNf@bBZNRI#rm\\ghLj@tA}@`ApDfA^r@hLdAjBlAnAXrBg@vCC|@v@]`@FP|AQzCP@lAw@FnAd@#~e]giKlDTn@l@I\\zA~@Gr@~@d@nCPnD[rAz@tJLvCnBzCr@#nwLylIWO~AJ#n{L}mI`AQhAD#faM_nI`CO~Bo@|En@#zbNgoIpHE#`tXo}JIXiAB}NbFo@HgBYc@P?^_AR}@A_IbAeASaA_A}A`@]]S}@qAeAX{@u@eA_J{A{@{@JO#l~Ue~J|A_@nB`@tE?rDu@Fk@vOgBe@oAToAhAu@nAgB|@SJm@bAa@\\}@h@WnDYtAk@xHuAhCMjAgAsAy@~GiBp@wA|Ce@rJn@lDw@|@e@p@eAOk@u@[?]ZY#~eYmlLvBq@#~eYmlLlA}@{Am@#viY_nL~CL#viY_nLpAgA#bsTqvGd@N`@U#tvTmwGn@C`@iAaAcDXw@#rmPctDWa@o@I#zlPguDDC#`mPkuDU_@#`mPkuDfCeBGk@vDYr@a@l@cBd@IB]TKG}@q@aBuAeBh@eAGuBR{A_@]@_@]K?[u@k@S_AoAkAg@qBq@o@[}BOJu@[Mc@Bc@VQNFZa@DuAhDyBo@wBhB[r@oAzAgAVeAUwAy@i@]u@ReAyBe@s@_AEa@jBoBjAc@P}@Gm@VUZmBfJwDl@y@nC{@n@eABcAaAeAiAIg@[c@y@f@e@x@Ex@e@#|pQweH]y@o@@#tmQsgHc@H#~fRclGwBp@oCI}CdAoBlFK~B}AdCuA\\EVb@ZCPw@~@_@Ly@O{@HwDi@m@`@D^s@HiBlAiCWoBX}Aq@u@@#lrRwtG}Af@GRg@DISu@j@#byTsbHd@YL}@cAo@aASuAcAiCs@w@v@_EG[VwBN#vxR}gHG`@kATg@fB#`xSckHkIYcEV#|r\\{pKjBEx@`@Pd@lD~@jBjAnCd@#xaR_qI_@o@Ba@f@O#zbR{tITYKW#x~QgxIsA_@w@cC#~uQy~IqAI#joQm_JwAEwEaB{AC#bmNomG@`@#`{UadIWMa@P}@E[s@cA_@wENp@kBK]uAu@oEM_E_CkB@yBp@mDOqAb@iCVMVoAVaDrB#`dTqhIaElAc@?k@SaDqCwEM#lsOypFj@GHf@nBlBbAg@n@|@t@Ut@`@~@YXCHXp@On@h@C`@jA`@Ct@rBQRd@#|rNy{FdAo@z@PGn@t@jClAt@nAVZb@CZx@AXd@CXh@h@l@Cr@s@`DJjBk@f@k@v@G\\PKj@lAX#r_Ny}GeAdAaCVoEk@kBT#pbN{~Gk@\\q@B#ndNu_H}@X#ndNu_H??#ndNu_H??#xmNucHmAvA{Ef@#zzVc}Ia@HiCu@_FV{Eg@_@HKf@g@TcEK}Au@[q@d@{@k@mAB}CiBQHc@e@DyAe@mENeFcA#teUumJsB_@wA_AuCHP^aB@YO#n~UkqHcA@BhAo@nAgAJe@M#toVucGNh@xBh@H~@vCI^n@#xhZiyK[}@wBSgByAqEaBRMGUl@W?[fDi@nFNlIn@n@`@vAKjA`@rDJrBd@xGh@#phNwvF}AFWp@s@X?TyAj@#dgRkhCiAWWH_Am@#b_N_hHTD#fbNihHZ@#pkN{hHr@VtAG#rcN}hHAM#xcN}iH^Rt@IXPvAq@XHBh@#rfQ{nH`APtDi@PW#t{PmpHXTjEN#rtPisHZn@~AVf@Z#xjR_eD]^sCx@sDn@m@Q#nvRcwDkAlAgArC}CzCI`B#`yS{eEiIvF{@pCk@v@cFpBiAk@_@sAmAk@}CHq@b@#p}SulEI`@eAr@_AbC#z|SinERH#l~SckF{BAyDt@[b@GfBJ~A|@x@zB~Db@fFz@pB#rrMi`IaAOgBRWX@^k@B#~tMq`IFOn@CtEd@#`kN{`IqBZkGK#jaS}}BbAa@~@qB\\N#dgS{aChAu@#niSqcCp@IlAoB|@F#zoSkgCfA\\#hpNaoFqAuByAyAkAe@#zvVspFON@|@n@d@#`|Vo}FBLq@p@?j@k@tAD`BqAvB#bvLs_HSe@{@]wBoBkEu@iBhAAnASPSzA_BVcAMwA\\e@r@Xl@#bkVgfFn@^xAE`D{C#beV{fFxAgAh@x@f@T#ntVijF\\_Ab@Q#byOikAm@T#xkRgkISC#toSwkIq@N}Cc@[[#jeSinIkA_@@U][}AN#z~RipIeBPeA[q@^m@?Q`@}BR#x`OkqE}BtBwApDu@\\#rdOyuEm@dA#pbXwcJ}DdBo@p@~AHTREbAo@TM~@\\n@tBd@O^b@n@fFbA#hwTyoJ@qBh@cArBc@dAq@SEH[`AWZ_@h@BJYW[Ne@`BA#ddUuiG~@X`BAhB_@R_@t@W|C@xEuC]}Al@QJ]oCoFlA_A^}Ab@Gb@e@l@KxCX`CjA#j`UqjG^Vz@F#|uT{mGnAy@xAOVhA~A~@#lrT_qGh@fAQh@z@J#xzSk_Ih@u@w@k@M{@oBqBSq@cEiA#rvU}aIoBnAmBb@eDUaCjAoFHm@Z{@lAaB`@?`@sA]iBAOS@o@g@KaB_BaEKwDbA#nrV_hG~Cc@n@R#bbO{kGl@zA#|qMgxG|ARxBnA#x_XaeJiB[Bq@dBOz@g@jEDfFi@dEzAn@hAYd@PhAnBV#vs[seKv@c@hBA~B]vHFrAv@JdAMf@zA~A@b@#xcAsuAn@o@V_AnE}AxAeALi@v@a@f@wAzAQtAuAbCS`Dd@|AGz@hC#rvZubKDe@{BcACU`A}@fEmApEITk@zC]l@o@~Im@|CaBhBE`Ff@L_A`CPdDa@tCNZY`B[#bcPixEr@MdAy@Wo@g@IAiB#xkOe_FhAXf@WVJfBdCxANbC`CjAe@l@B#vfPkfFd@M#`sXipJ`CQn@uA#v_YyxJlI_F#buSwdKwG[j@SL}A#lmSmjKo@sAqBw@i@s@oCSmA`@_BMy@c@#zkQooKoBT#ryRarKsCU#z}QwsKgBR}@fA#~gO}wEe@T#btPmeBfEmDL{@WMP]\\GNPz@_@j@}@#h_QwpBvAYJw@#h_QwpBv@{A#brRgiCgCzA}AG{Ay@[@#tpOg{FUA\\g@hBs@fAEjCTjEjB@~Bn@nAWtA\\p@z@n@VhAKP#`zVknGv@SPm@bCoAJa@Fe@[a@Ja@W]?o@oAYT{@#hnQmwHJ[`AAv@m@vBj@^CAU#|vQ_zH|@k@#z|Nm`F_F_@#fjYy_KFcAlGi@F_@l@]zCeAnECjEi@Z]Ie@p@s@G_Ao@YTa@jDa@DYrBg@RMEQn@ODWvBi@|HYbBm@Gq@bD_BdA]xBM#j{^sbKCX\\JjAHr@U~C\\FLYNxAf@HV#j{^sbK~BUG_ALOx@c@hA?#ln[i_LxNlAvD~@~B@ZJm@LRTfL~A~DC`OtAdFR|@YlDMxCfBHv@|Ah@r@v@Ff@fBxA\\`Ai@|@k@LFR|@ZbEJt@RJZfBP`AcAv@QdBRj@U#ln[i_L??#ln[i_L??#dfSklJVO#tgSymJh@WGWdDUj@Y#trSupJBMxAI#fwYu}JP~@pCj@b@zA]f@Z\\a@hApAZEd@|@@#tbWevKt@PlINh@N#dgMs_H`@Z#peSq~J|@~@GR#vcSoaKJ^#rmRkdKyGHZiA#pxRudKI@#ptRwdKc@?#baSaeKb@P#l{RweK{@[#t|RghK|B^#daRshKa@c@#`_R}kKcAY#fvQ{lKkAmA#fwRydK^D";

function decode(s) {
  const out = []; let i = 0, lon = 0, lat = 0;
  while (i < s.length) {
    const v = [0, 0];
    for (let k = 0; k < 2; k++) {
      let sh = 0, r = 0, b;
      do { b = s.charCodeAt(i++) - 63; r |= (b & 0x1f) << sh; sh += 5; } while (b >= 0x20);
      v[k] = (r & 1) ? ~(r >> 1) : (r >> 1);
    }
    lon += v[0]; lat += v[1]; out.push([lon / 100, lat / 100]);
  }
  return out;
}
const unpack = (s) => s.split("#").filter(Boolean).map(decode);

const D = Math.PI / 180, R = 6371;
const P1 = 25 * D, P2 = 65 * D, P0 = 45 * D, L0 = -100 * D;
const NN = (Math.sin(P1) + Math.sin(P2)) / 2;
const CC = Math.cos(P1) ** 2 + 2 * NN * Math.sin(P1);
const RHO0 = Math.sqrt(CC - 2 * NN * Math.sin(P0)) / NN;
function proj(lon, lat) {
  const rho = Math.sqrt(Math.max(0, CC - 2 * NN * Math.sin(lat * D))) / NN;
  const th = NN * (lon * D - L0);
  return [R * rho * Math.sin(th), R * (RHO0 - rho * Math.cos(th))];
}

/* ------------------------------------------------------------ */
const CH = [
  { yr: "c. 1000", era: "c. 1000", title: "Vinland", who: "Leif Eiriksson and the Greenlanders",
    wiki: ["Vinland", "Leif Erikson"], see: ["L'Anse aux Meadows"],
    text: "Norse ships coast three lands south from Greenland — Helluland's flat stones, Markland's forests, Vinland's grapes. A camp at L'Anse aux Meadows lasts a few seasons. Then Europe forgets for five hundred years.",
    cost: "Abandoned inside a decade. The knowledge survives only in sagas.",
    add: ["Helluland, Markland, Vinland — three names that never reach a map"],
    b: [[-45,61,180],[-50,62.5,180],[-51,64,180],[-53,66,180],[-62,65,180],[-63,63,170],[-60,58,170],[-58,55,160],[-57,52,160],[-56,50,160],[-55.5,51.6,150],[-55,48.5,150],[-58,49,150]] },

  { yr: "1513", era: "1513–1519", title: "La Florida and the Gulf", who: "Ponce de León, Álvarez de Pineda",
    wiki: ["Juan Ponce de León", "Alonso Álvarez de Pineda"], see: [["Dry Tortugas", "Dry Tortugas National Park"]],
    text: "Ponce de León names a peninsula for the Easter feast and takes it for an island. Six years later Pineda runs the whole Gulf shore and proves it isn't — and that there is no strait through to Asia anywhere along it.",
    cost: "Ponce de León dies of a Calusa arrow wound in 1521.",
    strike: ["Florida as an island", "a strait through the Gulf"],
    b: [[-80.1,26.2,150],[-80.4,25.2,150],[-81.8,26.2,150],[-82.7,27.8,150],[-84,29.9,150],[-86,30.3,150],[-88.5,30.3,150],[-90,29.2,150],[-93.5,29.6,150],[-95.5,28.8,150],[-97.3,26.2,150],[-97.2,21.5,150],[-91,21,160],[-87,21.3,150],[-81.3,29.9,140],[-80.9,32.1,150],[-79,33,150],[-77.5,20.5,160],[-82,22.5,160],[-75,20,160],[-73,19,150],[-66.5,18.3,150]] },

  { yr: "1534", era: "1534–1542", title: "The great river", who: "Jacques Cartier",
    wiki: ["Jacques Cartier"], see: [["Gulf of St. Lawrence", "Gulf of Saint Lawrence"]],
    text: "Cartier is looking for a strait to Asia and finds a river instead. He gets as far as Hochelaga, where rapids stop him. He names them Lachine — China — and turns back.",
    guide: "Domagaya and Taignoagny, sons of Donnacona, taken to France and brought back to interpret.",
    cost: "Scurvy kills about 25 of 110 wintering at Stadacona. Domagaya's cedar remedy saves the rest.",
    strike: ["a strait to Asia through the Gulf"],
    b: [[-57,51.5,150],[-60,49.5,160],[-62,48.5,160],[-64,48.5,150],[-66,49,150],[-68,49,150],[-70,47.5,140],[-71.2,46.8,140],[-72.5,46.2,130],[-73.6,45.5,130],[-64,46.5,150],[-60,46.5,140],[-56,47.5,150],[-53,48,150],[-59,47,150]] },

  { yr: "1539", era: "1539–1542", title: "Through the southeast", who: "Hernando de Soto",
    wiki: ["Hernando de Soto"], see: ["Mississippi River"],
    text: "Six hundred men march four years through the Mississippian towns looking for another Peru. They find no gold, cross the great river, and leave smallpox behind. De Soto is buried in it.",
    guide: "Interpreters and porters taken by force from nearly every town on the route.",
    cost: "About 600 set out; roughly half reached Mexico. The towns they passed through fared worse.",
    add: ["the lower Mississippi"],
    b: [[-82.6,27.7,160],[-84.3,30.4,160],[-82,32.5,160],[-84.5,34.5,160],[-88,34.3,160],[-90.5,34.8,160],[-92.5,34.7,160],[-95,33,160],[-93,31.5,160],[-91,31.5,160],[-89.9,30,150],[-86,33,160],[-80.5,33.5,150]] },

  { yr: "1540", era: "1540–1542", title: "The cities of Cíbola", who: "Francisco Vázquez de Coronado",
    wiki: ["Francisco Vázquez de Coronado"], see: ["Grand Canyon"],
    text: "The seven golden cities turn out to be Zuñi pueblos. Coronado pushes on to Quivira in the Kansas grass on the word of a guide who is leading him out to die, and comes back with nothing but a continent's worth of coastline in his head.",
    guide: "El Turco, a captive from the plains, who steered the column into the grass and was executed for it.",
    cost: "Two years, no gold, Coronado broken by a fall from his horse.",
    strike: ["the Seven Cities of Cíbola"], add: ["Quivira"],
    b: [[-107,31,160],[-110.9,32.2,160],[-109,34.5,160],[-107.5,35.2,160],[-106.6,35.7,160],[-104,35.2,160],[-101,36.5,160],[-99,37.5,160],[-97.5,38.5,160],[-112.1,36.1,170],[-113,35,160],[-114,34.5,160]] },

  { yr: "1542", era: "1542", title: "The coast of California", who: "Juan Rodríguez Cabrillo",
    wiki: ["Juan Rodríguez Cabrillo"], see: [["Channel Islands", "Channel Islands (California)"], "Cabrillo National Monument"],
    text: "Cabrillo sails north past the Channel Islands, breaks a limb and dies of it, and his crew carries on to somewhere near the Oregon line before the weather turns them. The coast they chart stays a line without a hinterland for two hundred years.",
    cost: "Cabrillo dies of an infected fracture, wintering on San Miguel Island.",
    b: [[-117.2,32.7,150],[-118.5,34,150],[-120.5,34.5,150],[-122,36.6,150],[-123.5,38.5,150],[-124,40.5,150],[-124.2,42,150]] },

  { yr: "1603", era: "1603–1635", title: "The cartographer of New France", who: "Samuel de Champlain",
    wiki: ["Samuel de Champlain"], see: ["Lake Champlain", "Bay of Fundy"],
    text: "Champlain surveys Acadia, founds Quebec, and takes the Ottawa–Nipissing route inland. His 1632 map is the first to draw the Great Lakes as anything but rumour.",
    guide: "Algonquin and Huron-Wendat allies, who chose the route and set the terms of travel.",
    add: ["the Great Lakes"],
    b: [[-66.5,44.8,160],[-64,45,150],[-70.5,43.5,150],[-73.4,44.5,120],[-73.3,45.4,130],[-75.7,45.4,130],[-77.5,46,130],[-79.5,46.3,130],[-80.9,45.9,140],[-81.5,45.2,150],[-82.5,44.5,140],[-80.5,44.5,130],[-79.5,43.8,130],[-77.5,44,130],[-76,44.2,120],[-82.5,46,140],[-84.7,45.9,130]] },

  { yr: "1607", era: "1607–1609", title: "The Chesapeake", who: "John Smith",
    wiki: [["John Smith", "John Smith (explorer)"]], see: ["Chesapeake Bay"],
    text: "Smith maps the bay and its rivers in an open boat, stopping at every Powhatan town that will have him. His 1612 chart is so good the English are still using it sixty years later.",
    guide: "Powhatan towns fed the party and named the rivers he wrote down.",
    b: [[-76.4,37,140],[-76.5,38.3,140],[-76.2,39.3,140],[-77.4,38.9,140],[-77.9,37.6,140],[-75.9,37.2,140],[-76.9,36.9,140],[-75.5,35.9,140]] },

  { yr: "1609", era: "1609–1611", title: "The inland sea", who: "Henry Hudson",
    wiki: ["Henry Hudson"], see: ["Hudson Bay"],
    text: "Hudson tries a river first, then a strait, and comes out into a bay so vast he takes it for the Pacific. He winters in James Bay, his crew mutinies, and he is set adrift. The bay keeps his name.",
    cost: "Hudson, his son, and seven others set adrift in June 1611. None ever found.",
    strike: ["the bay as an opening to the Pacific"],
    b: [[-74,40.7,140],[-73.9,42,140],[-73.7,42.7,140],[-64,61.5,160],[-68,62,160],[-72,62.5,160],[-76,62.5,160],[-79,62,160],[-82,61.5,160],[-85,60,170],[-82,58,170],[-80,55,160],[-79.5,52.5,150],[-79.8,51.3,140],[-81.5,51.6,140],[-82,53,150],[-78.5,57,160],[-78,60,160]] },

  { yr: "1634", era: "1634–1682", title: "Down the Mississippi", who: "Nicolet, Marquette & Jolliet, La Salle",
    wiki: ["Jean Nicolet", "Jacques Marquette", "Louis Jolliet", ["La Salle", "René-Robert Cavelier, Sieur de La Salle"]], see: ["Mississippi River", "Niagara Falls"],
    text: "Nicolet reaches Green Bay in a damask robe, expecting China. Forty years later Marquette and Jolliet find the river runs south, not west — so it goes to the Gulf, not the Pacific. La Salle follows it to the mouth and claims the whole watershed for Louis XIV.",
    guide: "Illinois and Miami guides drew the portage route on birchbark before they set out.",
    strike: ["a western outlet for the Mississippi"],
    b: [[-84.5,45.8,150],[-87.6,44.5,150],[-88,46.5,150],[-89,43.5,150],[-90.5,43.8,160],[-91.2,41.5,160],[-90.6,39.8,160],[-90.2,38.6,160],[-89.5,36.5,160],[-90,35,160],[-91,33,160],[-91.2,30.9,160],[-89.9,29.9,150],[-88,42,150],[-86,41.7,150],[-85,42.5,150],[-92,42,160]] },

  { yr: "1670", era: "1670–1743", title: "Rupert's Land, sight unseen", who: "The Hudson's Bay Company, Kelsey, La Vérendrye",
    wiki: ["Hudson's Bay Company", "Henry Kelsey", ["La Vérendrye", "Pierre Gaultier de Varennes, sieur de La Vérendrye"]], see: ["Lake Winnipeg"],
    text: "A London charter hands over every river draining into the bay — a territory no one at the table has seen. Henry Kelsey walks out onto the plains in 1690; La Vérendrye's sons push west toward mountains they have only been told about.",
    guide: "Cree and Assiniboine middlemen ran the trade the Company depended on, and drew the maps it used.",
    add: ["Rupert's Land — a border defined by watershed, not by anyone living in it"],
    b: [[-94,58.8,180],[-92.3,57,180],[-88,55.5,180],[-85.5,55.3,170],[-82,52.5,170],[-96,55,180],[-97.3,53.8,170],[-96.8,50.5,170],[-99,51,170],[-101,52,180],[-104,52.5,180],[-107,53,180],[-110,53.3,170],[-100,50,170],[-97.2,49.5,160],[-101,47.5,160],[-104,49,170],[-92,54,180],[-89,52,170],[-85,50,170]] },

  { yr: "1769", era: "1769–1776", title: "Alta California and the Great Basin", who: "Anza, Domínguez & Escalante",
    wiki: ["Juan Bautista de Anza", ["Domínguez–Escalante", "Domínguez–Escalante Expedition"]], see: ["Utah Lake", "Great Basin"],
    text: "Anza opens a land route from Sonora to San Francisco Bay. Two friars set out from Santa Fe to reach Monterey, get turned back by the Utah winter, and instead put the first European lines through the Great Basin.",
    guide: "Ute guides through the Wasatch; Southern Paiute directions on the way back.",
    strike: ["a road from Santa Fe to Monterey"],
    add: ["a great westward river, from Miera's map of the journey"],
    b: [[-117.2,32.7,150],[-117.8,33.7,150],[-118.5,34.1,150],[-120.6,35.4,150],[-121.9,36.6,150],[-122.4,37.8,150],[-114.6,32.7,150],[-112,33.4,150],[-110.9,32.2,150],[-108,36,160],[-106.6,35.7,150],[-108.5,38,160],[-110,39,160],[-111.9,40.3,160],[-113.5,39,160],[-112.5,37.5,160],[-114,36.5,160]] },

  { yr: "1770", era: "1770–1772", title: "Overland to the Coppermine", who: "Samuel Hearne and Matonabbee",
    wiki: ["Samuel Hearne", "Matonabbee"], see: ["Bloody Falls", "Great Slave Lake"],
    text: "Two attempts fail before Matonabbee agrees to lead. They walk to the Arctic Ocean and back, and Hearne returns with the answer nobody in London wants: there is no navigable passage here.",
    guide: "Matonabbee, Dene leader, who set the route, the pace and the provisioning — and without whom Hearne fails a third time.",
    cost: "Some 5,000 km on foot. Hearne witnesses the killing at Bloody Falls and can do nothing.",
    strike: ["a navigable passage west from Hudson Bay"],
    b: [[-94,58.8,160],[-98,60,170],[-102,62,180],[-106,63.5,180],[-110,64.5,180],[-113.5,65.3,170],[-115.1,67.8,170],[-112,63,180],[-109,62.5,170],[-113,62,180],[-117,61.2,170],[-105,60,180],[-100,64,180]] },

  { yr: "1778", era: "1778–1793", title: "From Canada, by land", who: "Peter Pond, Alexander Mackenzie",
    wiki: ["Peter Pond", ["Alexander Mackenzie", "Alexander Mackenzie (explorer)"]], see: ["Lake Athabasca", "Mackenzie River"],
    text: "Pond's rough sketches of Athabasca convince Mackenzie a river runs to the Pacific. It runs to the Arctic instead. Four years later he crosses the Rockies to Bella Coola and writes it on a rock.",
    guide: "Dene guides on the northern river; Nuxalk and Dakelh routes over the mountains to the coast.",
    cost: "He names the great river Disappointment.",
    strike: ["a river from Athabasca to the Pacific"],
    b: [[-111.4,58.5,170],[-110,58.7,160],[-113,60.5,170],[-114,61.2,170],[-117.2,61.2,170],[-121,63.5,180],[-125,65.5,180],[-129,67.3,180],[-133.7,68.3,180],[-125.5,66.3,180],[-121,66.8,180],[-118,66.3,170],[-115,58,170],[-119,56,170],[-122,55.7,170],[-124,54,170],[-122.7,52.4,160],[-126.7,52.4,160],[-128,52.5,150],[-113,54,170]] },

  { yr: "1790", era: "1790–1814", title: "The great map of the North-West", who: "David Thompson",
    wiki: [["David Thompson", "David Thompson (explorer)"]], see: ["Columbia River", "Rocky Mountains"],
    text: "Thompson surveys the western interior on foot and by canoe, fixing positions by star sight. The map he finishes in 1814 is accurate enough to stay in use for the rest of the century.",
    guide: "Charlotte Small, Métis, his wife and interpreter, travelled almost the entire survey with him.",
    cost: "Twenty-eight years in the field. He dies poor and largely unread.",
    b: [[-115,52,170],[-117,51.5,170],[-116.9,50.9,160],[-117.5,49.2,160],[-119,47.6,160],[-121,46.2,160],[-123.9,46.2,160],[-120,50.5,170],[-121.5,53.9,170],[-118,54,170],[-113,53.5,170],[-109,53.3,170],[-106,53.2,170],[-102,53.3,170],[-98,54,170],[-116,58,170],[-119,58,170],[-124,58,180],[-113,49.5,170],[-110,50,170],[-106,50,170],[-102,50,170],[-98,49.5,160],[-90,48.5,170],[-93,50,180],[-88,50,170],[-95,52,180]] },

  { yr: "1804", era: "1804–1806", title: "The Corps of Discovery", who: "Meriwether Lewis, William Clark",
    wiki: ["Lewis and Clark Expedition", "Sacagawea"], see: [["Great Falls of the Missouri", "Great Falls of the Missouri River"], "Columbia River"],
    text: "Jefferson buys a territory nobody has surveyed and sends thirty-odd people to find out what is in it. There is no water route across. The Bitterroots nearly finish them.",
    guide: "Sacagawea, Lemhi Shoshone, whose brother sold them the horses; Old Toby over the Bitterroots.",
    cost: "One death in two years — Sergeant Floyd, of a burst appendix, before they were properly started.",
    strike: ["a water route across the continent"],
    b: [[-90.2,38.7,160],[-92.5,39.2,160],[-94.6,39.1,160],[-95.9,41.3,160],[-97.5,43,160],[-100,46.9,170],[-101.3,47.3,170],[-104,47.9,170],[-107,47.9,170],[-110,47.9,170],[-112,47.5,160],[-113.8,46.5,160],[-115,46.4,160],[-116.9,46.4,160],[-118.5,46,160],[-121,45.7,160],[-123.9,46.2,160],[-109,45.7,160],[-106,46.5,160]] },

  { yr: "1806", era: "1806–1820", title: "The Great American Desert", who: "Zebulon Pike, Stephen Long",
    wiki: ["Pike Expedition", "Stephen Harriman Long"], see: ["Pikes Peak"],
    text: "Pike sees his peak and fails to climb it, then gets arrested by the Spanish. Long crosses the same plains and labels them unfit for farming. The label sticks to American maps for fifty years and shapes where people go.",
    cost: "Pike taken to Chihuahua under guard; his papers confiscated.",
    add: ["the Great American Desert — a lie that lasted fifty years"],
    b: [[-95,39,160],[-98,38.5,160],[-101,38.3,160],[-104,38.7,160],[-105.1,38.8,160],[-106.3,37.7,160],[-105.9,35.7,160],[-104.7,41.1,160],[-105,40.3,160],[-102,40,160],[-99,40.5,160],[-96,41,160]] },

  { yr: "1812", era: "1812–1818", title: "A line drawn on paper", who: "Brock, Drummond, and the surveyors",
    wiki: ["War of 1812", "Treaty of 1818"], see: ["Lake Erie"],
    text: "The war settles nothing on the ground and everything on the map. Fort Erie is besieged and blown up; three years later negotiators run the border along the 49th parallel, straight through country neither side has walked.",
    cost: "A border agreed in London and Washington, over the heads of everyone living along it.",
    add: ["the 49th parallel"],
    b: [[-79,42.9,120],[-79.2,43.6,120],[-81,42.5,130],[-83,42.3,130],[-82.5,45.5,130],[-76.5,44.3,120],[-74.5,45,120],[-71,45,120],[-67.8,47,130],[-95,49,160],[-100,49,170],[-110,49,170],[-114,49,160],[-120,49,170],[-123,49,150],[-89,48,160],[-84,46.5,140]] },

  { yr: "1824", era: "1824–1846", title: "Mountain men and the Pathfinder", who: "Jedediah Smith, John Frémont",
    wiki: ["Jedediah Smith", "John C. Frémont"], see: [["South Pass", "South Pass (Wyoming)"], "Great Salt Lake"],
    text: "Trappers rediscover South Pass, the gap that makes the Oregon Trail possible, and tell almost no one. Frémont arrives twenty years later with instruments and a publisher, maps what they already knew, and finally kills off the river to the Pacific that never existed.",
    guide: "Crow knowledge of South Pass; Kit Carson and Thomas Fitzpatrick on the ground.",
    cost: "Jedediah Smith killed on the Cimarron in 1831, aged thirty-two.",
    strike: ["Rio Buenaventura", "the Mer de l'Ouest"],
    b: [[-107.5,42.5,170],[-109.6,43.2,170],[-111,43.5,170],[-112.5,42,160],[-114,41,160],[-115,40,160],[-117,40.5,160],[-119,39.5,160],[-120.5,39.3,160],[-121.5,38.6,160],[-118.5,37,160],[-116,36,160],[-114,35,160],[-113,37,160],[-111,38,160],[-109,40,160],[-106.5,40,160],[-110,44.5,170],[-113,45,170],[-116,44,160],[-119,44,160],[-121,42,160],[-122,41,160],[-104,41,160]] },

  { yr: "1869", era: "1869", title: "Through the canyon", who: "John Wesley Powell",
    wiki: ["John Wesley Powell", ["the 1869 descent", "Powell Geographic Expedition of 1869"]], see: ["Grand Canyon"],
    text: "Ten men and four boats into the last unmapped gap in the United States, Powell rowing one-armed. The river is faster and longer than anyone has told them.",
    cost: "Six came through. The three who climbed out at Separation Canyon were never seen again.",
    strike: ["the last blank space in the United States"],
    b: [[-109.5,40.5,150],[-110.5,38.5,150],[-110,37.9,150],[-111.5,37,150],[-112.5,36.3,150],[-113.5,36.1,150],[-114,36.1,150]] },

  { yr: "1576", era: "1576–1859", title: "The last blank", who: "Frobisher to Franklin",
    wiki: ["Northwest Passage", "Martin Frobisher", "Franklin's lost expedition"], see: ["Baffin Island"],
    text: "Three centuries of ships feeding themselves into the ice for a passage that turns out to be unusable. Franklin's two vessels vanish in 1845; the expeditions sent to find him chart more of the Arctic than the passage ever would have.",
    guide: "Inuit testimony led searchers to the truth years before the Admiralty would accept it.",
    cost: "Franklin's 129 men, all lost. Around forty expeditions sent after them.",
    strike: ["a usable Northwest Passage"],
    b: [[-64,62.8,170],[-68,64,180],[-72,66,180],[-75,70,190],[-77,74,190],[-80,77,190],[-72,76,190],[-68,70,180],[-90,74.5,190],[-100,74.5,190],[-110,74.6,190],[-118,74.5,190],[-95,72,180],[-92,70,180],[-96,69,180],[-100,69,180],[-105,69,180],[-110,69,180],[-115,68.5,180],[-120,70,180],[-123,72,180],[-108,73,180],[-102,72,180],[-85,72,180],[-88,76,190],[-95,77,190],[-105,78,190],[-88,80,190],[-78,80,190],[-70,81,190],[-118,77,190],[-135,69.5,170],[-140,70,170],[-90,66,180],[-85,68,180],[-80,68,180],[-60,76,190],[-65,72,180]] },

  { yr: "1869", era: "1869–1900", title: "The survey", who: "Hayden, King, Wheeler, Powell; the Dominion Land Survey; the Geological Survey of Canada",
    wiki: [["U.S. Geological Survey", "United States Geological Survey"], ["Hayden Survey, 1871", "Hayden Geological Survey of 1871"], "Wheeler Survey", "Dominion Land Survey", "Geological Survey of Canada"], see: ["Yellowstone National Park"],
    text: "The last of the fog goes not to explorers but to salaried men working in grids on government contract — triangulating townships, running baselines, filling in the parts nobody wrote a book about. There is no moment of discovery here. It is paperwork, and it finishes the map.",
    cost: "The blanks close on salary, not on adventure. Nobody remembers a single name.",
    full: true, b: [] },
].map((c, i) => ({ ...c, n: i + 1 }));

/* Share of the continent's land actually cleared at each step. Measured, not
   estimated: the brush circles are rasterised, blurred with the same sigma the
   SVG filter uses, thresholded at 50% alpha, intersected with the land. */
const CHARTED = [0, 1, 3, 5, 8, 11, 12, 14, 14, 16, 19, 25, 26, 30, 35, 40, 43, 45, 45, 49, 49, 57, 100];

const LABELS = [
  ["L'Anse aux Meadows", -55.53, 51.6, "end"], ["Newfoundland", -55.9, 48.2, "end"],
  ["Labrador", -62.5, 54.5], ["Baffin Island", -71, 68.5], ["Greenland", -47.5, 70],
  ["Iceland", -19.5, 64.9, "end"], ["Hudson Bay", -85, 59.5], ["James Bay", -80.4, 52.4],
  ["Québec", -71.21, 46.81, "end"], ["Hochelaga", -73.55, 45.5, "end"],
  ["Port-Royal", -65.6, 44.72, "end"], ["Plymouth", -70.66, 41.96, "end"],
  ["Jamestown", -76.78, 37.21, "end"], ["Roanoke", -75.67, 35.93, "end"],
  ["St. Augustine", -81.31, 29.9, "start"], ["Havana", -82.38, 23.13, "end"],
  ["Lake Superior", -87.5, 47.7], ["Lake Michigan", -86.9, 43.1], ["Lake Huron", -82.2, 44.2],
  ["Lake Erie", -81.2, 42.1], ["Lake Ontario", -77.9, 43.8],
  ["Michilimackinac", -84.73, 45.85, "end"], ["Green Bay", -88.1, 44.5, "end"],
  ["St. Louis", -90.2, 38.63, "end"], ["New Orleans", -90.07, 29.95, "start"],
  ["Santa Fe", -105.94, 35.69, "start"], ["Zuñi pueblos", -108.85, 35.07, "end"],
  ["Grand Canyon", -112.6, 36.2, "end"], ["Separation Canyon", -113.6, 36.05, "end"],
  ["Great Salt Lake", -112.6, 41.4, "end"], ["Monterey", -121.9, 36.6, "end"],
  ["San Diego", -117.16, 32.72, "end"], ["Fort Clatsop", -123.9, 46.2, "end"],
  ["Fort Mandan", -101.3, 47.3, "start"], ["South Pass", -108.9, 42.4, "start"],
  ["Pike's Peak", -105.04, 38.84, "start"], ["York Factory", -92.3, 57.05, "start"],
  ["Fort Prince of Wales", -94.16, 58.8, "start"], ["Lake Winnipeg", -96, 52.3, "start"],
  ["The Forks", -97.14, 49.89, "end"], ["Lake Athabasca", -109.4, 59.2, "start"],
  ["Great Slave Lake", -113.6, 61.9, "start"], ["Great Bear Lake", -120.3, 65.7, "start"],
  ["Bloody Falls", -115.3, 67.7, "start"], ["Bella Coola", -126.8, 52.37, "end"],
  ["Fort Erie", -78.6, 42.95, "start"], ["Frobisher Bay", -66.5, 63.6, "end"],
  ["King William Is.", -97.5, 69.1, "end"], ["Melville Island", -110, 75.6],
  ["Ellesmere Island", -79, 79.6], ["Mississippi R.", -91.5, 34.5, "end"],
  ["Missouri R.", -105.5, 48.5, "end"], ["Columbia R.", -118.4, 46.6, "start"],
  ["Rio Grande", -104.8, 30.2, "end"], ["Yukon R.", -152, 64.8],
  ["Mackenzie R.", -133.5, 67.8, "start"],
];

/* inscribed on the fog, so they go when it goes. `kill` = the chapter that disproves it */
const CONJ = [
  ["TERRA INCOGNITA", -108, 62.5, 24, 8, 0, 22],
  ["HIC · SVNT · DRACONES", -133, 78, 15, 5, 0, 21],
  ["Mare Congelatum", -70, 81.2, 13, 3, 1, 21],
  ["Passage du Nord-Ouest", -99, 75.5, 13, 3, 1, 21],
  ["Mer de l'Ouest", -122, 48.5, 16, 3, 1, 19],
  ["R. Buenaventura", -117, 39.2, 13, 2, 1, 19],
  ["Quivira", -98.5, 39.5, 15, 4, 1, 16],
  ["Cíbola", -109.5, 36.6, 15, 4, 1, 5],
  ["Norumbega", -69.5, 45.8, 13, 2, 1, 7],
  ["Mare Occidentale", -146, 33, 14, 4, 1, 22],
  ["parts unknown", -152, 61, 13, 2, 1, 22],
];

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const BAR_H = 46;

/* Links are stored as an article title, or [label, article title]. */
const wu = (t) => "https://en.wikipedia.org/wiki/" + encodeURIComponent(t.replace(/ /g, "_"));
const Links = ({ items, color }) => (
  <span style={{ color: "#7d918d" }}>
    {items.map((x, i) => {
      const [lab, art] = Array.isArray(x) ? x : [x, x];
      return (
        <span key={art}>
          {i > 0 ? " · " : null}
          <a href={wu(art)} target="_blank" rel="noopener noreferrer"
             style={{ color, textDecoration: "underline", textDecorationColor: "rgba(200,220,215,0.28)",
                      textUnderlineOffset: "2px" }}>{lab}</a>
        </span>
      );
    })}
  </span>
);

/* The map is one masked, filtered SVG: anything that changes inside it forces the
   browser to re-rasterise the blur and the noise for the whole frame. That is fine
   on a laptop and miserable on a phone. Below this bar we drop the texture, soften
   the mask blur, shorten the fades and hold the camera still. */
const isLow = () =>
  typeof window !== "undefined" &&
  (!!window.matchMedia?.("(max-width: 1023px)").matches ||
   !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
   (navigator.hardwareConcurrency || 8) <= 2);

export default function TheFog() {
  const g = useMemo(() => {
    const land = unpack(LAND_S), lake = unpack(LAKE_S), river = unpack(RIVER_S);
    let minX = 1e12, maxX = -1e12, topY = -1e12;
    for (const sh of land) {
      const clon = sh.reduce((a, p) => a + p[0], 0) / sh.length;
      if (clon > -50) continue;
      for (const [lo, la] of sh) {
        const [x, y] = proj(lo, la);
        if (x < minX) minX = x; if (x > maxX) maxX = x; if (y > topY) topY = y;
      }
    }
    const pad = (maxX - minX) * 0.015;
    minX -= pad; maxX += pad; topY += pad;
    const botY = proj(-100, 16.5)[1];
    const W = 1320, scale = W / (maxX - minX), H = Math.round((topY - botY) * scale);
    const P = (lo, la) => { const [x, y] = proj(lo, la); return [(x - minX) * scale, (topY - y) * scale]; };
    const d = (shapes, close) => shapes.map((pts) =>
      "M" + pts.map(([lo, la]) => P(lo, la).map((v) => v.toFixed(1)).join(" ")).join("L") + (close ? "Z" : "")).join(" ");
    const grat = [];
    for (let la = 20; la <= 80; la += 10) { const p = []; for (let lo = -172; lo <= -40; lo += 3) p.push([lo, la]); grat.push(p); }
    for (let lo = -170; lo <= -40; lo += 10) { const p = []; for (let la = 14; la <= 84; la += 2) p.push([lo, la]); grat.push(p); }
    return { W, H, scale, P, land: d(land, 1), lake: d(lake, 1), river: d(river, 0), grat: d(grat, 0) };
  }, []);

  const [step, setStep] = useState(0);
  const [share, setShare] = useState(null);
  const [busy, setBusy] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [low, setLow] = useState(isLow);
  const svgRef = useRef(null), labRef = useRef(null), conjRef = useRef(null);
  const secRefs = useRef([]);
  const headRef = useRef(null), headBot = useRef(0), remeasure = useRef(() => {});
  const viewRef = useRef({ x: 0, y: 0, w: g.W, h: g.H });
  const rafRef = useRef(0), holdRef = useRef(0);
  const cur = step > 0 ? CH[step - 1] : null;
  const pct = CHARTED[step];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const on = () => setLow(isLow());
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  /* ---------- camera: fly in, let the line trace, then pull back ---------- */
  const apply = useCallback((v) => {
    viewRef.current = v;
    svgRef.current?.setAttribute("viewBox", `${v.x.toFixed(1)} ${v.y.toFixed(1)} ${v.w.toFixed(1)} ${v.h.toFixed(1)}`);
    const k = v.w / g.W;
    if (labRef.current) labRef.current.style.fontSize = (11.5 * k).toFixed(2) + "px";
    if (conjRef.current) conjRef.current.style.fontSize = (16 * k).toFixed(2) + "px";
  }, [g.W]);

  const targetFor = useCallback((n) => {
    const full = { x: 0, y: 0, w: g.W, h: g.H };
    if (n === 0 || n === CH.length) return full;
    const ch = CH[n - 1];
    if (!ch.b.length) return full;
    let a = 1e9, b = 1e9, c = -1e9, e = -1e9;
    for (const [lo, la, km] of ch.b) {
      const [x, y] = g.P(lo, la), r = km * g.scale * 0.9;
      a = Math.min(a, x - r); c = Math.max(c, x + r);
      b = Math.min(b, y - r); e = Math.max(e, y + r);
    }
    const ar = g.W / g.H;
    let w = Math.max((c - a) * 1.14, (e - b) * 1.14 * ar, g.W * 0.4);
    w = Math.min(w, g.W); const h = w / ar;
    return { x: Math.max(0, Math.min(g.W - w, (a + c) / 2 - w / 2)),
             y: Math.max(0, Math.min(g.H - h, (b + e) / 2 - h / 2)), w, h };
  }, [g]);

  const glide = useCallback((to, dur) => {
    const from = { ...viewRef.current }, t0 = performance.now();
    cancelAnimationFrame(rafRef.current);
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur), e = ease(p);
      apply({ x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e,
              w: from.w + (to.w - from.w) * e, h: from.h + (to.h - from.h) * e });
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [apply]);

  useEffect(() => {
    const full = { x: 0, y: 0, w: g.W, h: g.H }, near = targetFor(step);
    clearTimeout(holdRef.current);
    if (low) { if (viewRef.current.w !== g.W) apply(full); return; }
    glide(near, 1150);
    if (near !== full && (near.w < g.W - 1)) {
      holdRef.current = setTimeout(() => glide(full, 1700), 3200); // after the line has traced
    }
    return () => { clearTimeout(holdRef.current); cancelAnimationFrame(rafRef.current); };
  }, [step, low, g.W, g.H, targetFor, glide, apply]);

  useEffect(() => { apply(viewRef.current); }, [apply]);

  /* ---------- scroll drives the chapter ----------
     Measure the text block, not the section box. The box is 76vh with the text
     centred inside it, so testing the box fires a chapter roughly 35vh before
     its words are on screen. Active = the last block whose top has risen above
     the reading line, which is monotone in scroll position and cannot skip. */
  useEffect(() => {
    let raf = 0;
    /* Offsets are cached. The previous version called getBoundingClientRect on all
       twenty-four blocks every scroll frame — twenty-four forced layouts a frame,
       on top of everything the map is already doing. */
    let tops = [];
    const measure = () => {
      const y = window.scrollY;
      tops = secRefs.current.map((el) => {
        if (!el) return Infinity;
        const block = el.firstElementChild || el;
        return block.getBoundingClientRect().top + y;
      });
      headBot.current = headRef.current ? headRef.current.getBoundingClientRect().bottom + y : 0;
    };
    const pick = () => {
      raf = 0;
      const y = window.scrollY;
      const line = y + window.innerHeight * (window.innerWidth < 1024 ? 0.80 : 0.68);
      let active = 0;
      for (let i = 0; i < tops.length; i++) if (tops[i] <= line) active = i;
      const el = secRefs.current[active];
      if (el) setStep(Math.max(0, Math.min(CH.length, +el.dataset.step)));
      setPinned(y > Math.max(40, headBot.current - BAR_H - 12));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(pick); };
    const onResize = () => { measure(); onScroll(); };
    remeasure.current = onResize;
    measure(); pick();
    const settle = setTimeout(onResize, 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => {
      clearTimeout(settle);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, []);

  /* anything that changes the page height invalidates the cached offsets */
  useEffect(() => { remeasure.current(); }, [share, low]);

  /* ---------- #12 deep links ---------- */
  const scrollTo = useCallback((n) => {
    secRefs.current[n]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);
  useEffect(() => {
    const n = parseInt((window.location.hash || "").slice(1), 10);
    if (n >= 1 && n <= CH.length) setTimeout(() => secRefs.current[n]?.scrollIntoView({ block: "center" }), 120);
  }, []);
  useEffect(() => {
    try { window.history.replaceState(null, "", step ? `#${step}` : "#"); } catch (e) { /* sandboxed */ }
  }, [step]);
  useEffect(() => {
    const k = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); scrollTo(Math.min(CH.length + 1, step + 1)); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); scrollTo(Math.max(0, step - 1)); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [step, scrollTo]);

  /* ---------- share card: a standalone frame of chapter 21 ---------- */
  const makeCard = useCallback(async () => {
    setBusy(true);
    try {
      const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      const holes = CH.slice(0, 21).flatMap((c) => c.b.map(([lo, la, km]) => {
        const [x, y] = g.P(lo, la); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(km * g.scale).toFixed(1)}"/>`;
      })).join("");
      const routes = CH.slice(0, 21).filter((c) => c.b.length > 1).map((c) =>
        `<path d="M${c.b.map(([lo, la]) => g.P(lo, la).map((v) => v.toFixed(1)).join(" ")).join("L")}" fill="none" stroke="#a8402c" stroke-width="1.3" opacity=".3"/>`).join("");
      const words = CONJ.map(([t, lo, la, sz, sp, it]) => {
        const [x, y] = g.P(lo, la);
        return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" font-size="${sz}" letter-spacing="${sp}" font-style="${it ? "italic" : "normal"}" font-family="Georgia,serif" fill="#7a8b88">${esc(t)}</text>`;
      }).join("");
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${g.W}" height="${g.H}" viewBox="0 0 ${g.W} ${g.H}">
<defs><filter id="fe" x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur stdDeviation="17"/></filter>
<mask id="mk"><rect width="${g.W}" height="${g.H}" fill="#fff"/><g filter="url(#fe)" fill="#000">${holes}</g></mask></defs>
<rect width="${g.W}" height="${g.H}" fill="#0c1a1d"/>
<path d="${g.land}" fill="#dcd2b6" fill-rule="evenodd"/><path d="${g.lake}" fill="#16333a"/>
<path d="${g.river}" fill="none" stroke="#3f6a75" stroke-width="1.1" opacity=".85"/>
<path d="${g.land}" fill="none" stroke="#22322e" stroke-width="1.1"/>${routes}
<g mask="url(#mk)"><rect width="${g.W}" height="${g.H}" fill="#b6bfbb"/>${words}</g></svg>`;
      const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
      const CW = 1200, MH = Math.round(CW * g.H / g.W), BAND = 300;
      const cv = document.createElement("canvas");
      cv.width = CW; cv.height = MH + BAND;
      const x = cv.getContext("2d");
      x.fillStyle = "#070e10"; x.fillRect(0, 0, CW, MH + BAND);
      x.drawImage(img, 0, 0, CW, MH);
      URL.revokeObjectURL(url);
      x.fillStyle = "#d8b45a"; x.font = "700 108px Georgia, serif"; x.textBaseline = "top";
      x.fillText(`${100 - CHARTED[21]}%`, 64, MH + 46);
      x.fillStyle = "#cfdad6"; x.font = "34px Georgia, serif";
      x.fillText("of North America was still fog in 1859,", 64, MH + 176);
      x.fillText("when the surveyors arrived.", 64, MH + 220);
      x.fillStyle = "#5f7773"; x.font = "22px Georgia, serif";
      x.fillText("THE FOG · 1000–1900", CW - 330, MH + 60);
      const blob = await new Promise((r) => cv.toBlob(r, "image/png"));
      setShare(URL.createObjectURL(blob));
    } catch (e) { setShare("error"); }
    setBusy(false);
  }, [g]);

  const FOG = "#b6bfbb", MADDER = "#a8402c", BRASS = "#d8b45a";
  const secs = [{ k: "intro" }, ...CH.map((c) => ({ k: "ch", c })), { k: "end" }];

  return (
    <div className="w-full" style={{ background: "#070e10", color: "#c3cfcb",
      fontFamily: "ui-sans-serif, -apple-system, 'Segoe UI', Roboto, sans-serif" }}>

      {/* Compact pinned bar — takes over once the full title has scrolled off. */}
      <div aria-hidden={!pinned}
        style={{ position: "fixed", top: 0, left: 0, right: 0, height: BAR_H, zIndex: 40,
                 background: "#070e10", borderBottom: "1px solid #1d2f30",
                 transform: pinned ? "translateY(0)" : `translateY(-${BAR_H + 2}px)`,
                 transition: "transform 240ms cubic-bezier(.3,0,.2,1)",
                 pointerEvents: pinned ? "auto" : "none" }}>
        <div className="max-w-[1500px] mx-auto px-5 sm:px-8 flex items-center gap-3" style={{ height: "100%" }}>
          <span style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif", fontSize: "1.05rem", color: "#e7ede9" }}>
            The Fog
          </span>
          <span className="hidden sm:inline text-[10px] tracking-[0.28em] uppercase" style={{ color: "#4f6663" }}>
            North America · 1000–1900
          </span>
          <span className="flex-1" />
          <span className="tabular-nums leading-none"
                style={{ fontFamily: "ui-serif, Georgia, serif", fontSize: "1.05rem", color: cur ? BRASS : "#41544f" }}>
            {cur ? cur.yr : "—"}
          </span>
          <span className="tabular-nums leading-none text-xs"
                style={{ fontFamily: "ui-monospace, Menlo, monospace", color: pct === 100 ? "#8fbf9a" : "#9db0ab" }}>
            {100 - pct}% fog
          </span>
        </div>
      </div>

      <header ref={headRef} className="max-w-[1500px] mx-auto px-5 sm:px-8 pt-8 pb-5">
        <div className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase" style={{ color: "#6b8580" }}>
          North America, 1000–1900 · what each map burned away
        </div>
        <h1 className="mt-1 text-4xl sm:text-6xl leading-none"
            style={{ fontFamily: "ui-serif, Georgia, 'Times New Roman', serif", color: "#e7ede9" }}>
          The Fog
        </h1>
        <p className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: "#8fa39e", maxWidth: "56ch" }}>
          Everything here is already lived in, named, and travelled. The fog is European ignorance of it, and
          nothing else. Scroll to move through it.
        </p>
      </header>

      <div className="max-w-[1500px] mx-auto lg:flex lg:gap-8 px-5 sm:px-8">

        {/* ---------------- sticky map ---------------- */}
        <div className="sticky z-20 self-start lg:w-[57%] flex flex-col"
             style={{ top: BAR_H, background: "#070e10" }}>
          <div className="rounded-md overflow-hidden mt-2"
               style={{ border: "1px solid #1d2f30", background: "#0c1a1d" }}>
            <svg ref={svgRef} viewBox={`0 0 ${g.W} ${g.H}`}
                 className="block w-full h-auto"
                 style={{ maxHeight: "70vh" }}
                 preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="feather" x="-15%" y="-15%" width="130%" height="130%">
                  <feGaussianBlur stdDeviation={low ? 12 : 17} />
                </filter>
                {/* Full-area turbulence, re-rasterised whenever anything in the map
                    moves. Six octaves instead of nine, and skipped entirely on phones —
                    they get the flat wash below instead. */}
                {!low && (
                  <filter id="fogtex" x="0%" y="0%" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.0034" numOctaves="3" seed="12" result="n1" />
                    <feColorMatrix in="n1" type="matrix"
                      values="0 0 0 0 0.10  0 0 0 0 0.14  0 0 0 0 0.14  0.34 0.34 0.34 0 -0.05" result="c1" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.0062" numOctaves="2" seed="31" result="n2" />
                    <feColorMatrix in="n2" type="matrix"
                      values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.3 0.3 0.3 0 -0.06" result="c2" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="1" seed="4" result="n3" />
                    <feColorMatrix in="n3" type="matrix"
                      values="0 0 0 0 0.2  0 0 0 0 0.24  0 0 0 0 0.23  0.3 0.3 0.3 0 -0.12" result="c3" />
                    <feMerge><feMergeNode in="c1" /><feMergeNode in="c2" /><feMergeNode in="c3" /></feMerge>
                  </filter>
                )}
                <linearGradient id="fogshade" x1="0" y1="0" x2="0.3" y2="1">
                  <stop offset="0" stopColor="#c3ccc7" />
                  <stop offset="1" stopColor="#a7b3af" />
                </linearGradient>
                <mask id="lift">
                  <rect x="0" y="0" width={g.W} height={g.H} fill="#fff" />
                  <g filter="url(#feather)">
                    {CH.map((c) => c.full ? (
                      <rect key={c.n} x={-g.W} y={-g.H} width={g.W * 3} height={g.H * 3} fill="#000"
                            opacity={step >= c.n ? 1 : 0}
                            style={{ transition: `opacity ${low ? 1100 : 2600}ms cubic-bezier(.33,0,.2,1)` }} />
                    ) : (
                      <g key={c.n}>
                        {c.b.map(([lo, la, km], i) => {
                          const [x, y] = g.P(lo, la);
                          return <circle key={i} cx={x} cy={y} r={km * g.scale} fill="#000"
                            opacity={step >= c.n ? 1 : 0}
                            style={{ transition: `opacity ${low ? 420 : 620}ms ease-out`,
                                     transitionDelay: `${!low && step >= c.n ? (i / Math.max(1, c.b.length - 1)) * 900 : 0}ms` }} />;
                        })}
                      </g>
                    ))}
                  </g>
                </mask>
              </defs>

              <rect x="0" y="0" width={g.W} height={g.H} fill="#0c1a1d" />
              <path d={g.grat} fill="none" stroke="#16302f" strokeWidth="0.6" opacity="0.8" vectorEffect="non-scaling-stroke" />
              <path d={g.land} fill="#dcd2b6" fillRule="evenodd" />
              <path d={g.lake} fill="#16333a" />
              <path d={g.river} fill="none" stroke="#3f6a75" strokeWidth="1.1" strokeLinecap="round" opacity="0.85" vectorEffect="non-scaling-stroke" />
              <path d={g.land} fill="none" stroke="#22322e" strokeWidth="1.1" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />

              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                {CH.map((c) => c.b.length < 2 ? null : (
                  <path key={c.n} pathLength="1"
                    d={"M" + c.b.map(([lo, la]) => g.P(lo, la).map((v) => v.toFixed(1)).join(" ")).join("L")}
                    stroke={MADDER} strokeWidth={cur && cur.n === c.n ? 2.1 : 1.3} vectorEffect="non-scaling-stroke"
                    strokeDasharray="1" strokeDashoffset={step >= c.n ? 0 : 1}
                    opacity={step < c.n ? 0 : cur && cur.n === c.n ? 0.95 : 0.22}
                    style={{ transition: `stroke-dashoffset ${low ? 800 : 1700}ms cubic-bezier(.3,0,.2,1), opacity 700ms` }} />
                ))}
              </g>

              <g ref={labRef} style={{ fontFamily: "ui-serif, Georgia, serif", fontSize: "11.5px", fill: "#34443f" }}>
                {LABELS.map(([t, lo, la, a], i) => {
                  const [x, y] = g.P(lo, la);
                  return <text key={i} x={x} y={y} textAnchor={a || "middle"} letterSpacing="0.3">{t}</text>;
                })}
              </g>

              {/* ---- the fog, and the words written on it ---- */}
              <g mask="url(#lift)">
                <rect x="0" y="0" width={g.W} height={g.H} fill={low ? "url(#fogshade)" : FOG} />
                {!low && <rect x="0" y="0" width={g.W} height={g.H} filter="url(#fogtex)" />}
                <g ref={conjRef} style={{ fontFamily: "ui-serif, Georgia, serif", fontSize: "16px", fill: "#7a8b88" }}>
                  {CONJ.map(([t, lo, la, sz, sp, it, kill], i) => {
                    const [x, y] = g.P(lo, la);
                    const struck = step >= kill;
                    return <text key={i} x={x} y={y} textAnchor="middle" fontSize={`${(sz / 16).toFixed(3)}em`}
                      letterSpacing={sp} fontStyle={it ? "italic" : "normal"}
                      style={{ textDecoration: struck ? "line-through" : "none",
                               fill: struck ? "#93706a" : undefined, transition: "fill 600ms" }}>{t}</text>;
                  })}
                </g>
              </g>
            </svg>
          </div>

          {/* year / counter / chapter ticks */}
          <div className="flex items-center gap-3 sm:gap-4 py-2">
            <div className="tabular-nums leading-none shrink-0"
                 style={{ fontFamily: "ui-serif, Georgia, serif", fontSize: "1.5rem", color: cur ? BRASS : "#41544f" }}>
              {cur ? cur.yr : "—"}
            </div>
            <div className="flex-1 flex items-end gap-[2px] h-6">
              {CH.map((c) => (
                <button key={c.n} onClick={() => scrollTo(c.n)} aria-label={`${c.era} ${c.title}`}
                  className="flex-1 min-w-0 touch-manipulation" style={{ height: step === c.n ? "100%" : step > c.n ? "58%" : "34%",
                    background: step === c.n ? BRASS : step > c.n ? "#5f7773" : "#1e2f2d", borderRadius: 1 }} />
              ))}
            </div>
            <div className="tabular-nums leading-none shrink-0 text-right"
                 style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: "1.05rem",
                          color: pct === 100 ? "#8fbf9a" : "#9db0ab" }}>
              {100 - pct}%
              <span className="block text-[9px] tracking-[0.16em] uppercase mt-0.5" style={{ color: "#4f6663" }}>fog</span>
            </div>
          </div>
        </div>

        {/* ---------------- scrolling text ---------------- */}
        <div className="lg:w-[43%] relative z-10">
          {secs.map((s, i) => (
            <section key={i} data-step={s.k === "ch" ? s.c.n : s.k === "end" ? CH.length : 0}
              ref={(el) => (secRefs.current[i] = el)}
              className="min-h-[76vh] flex items-center py-10">
              {s.k === "intro" && (
                <div>
                  <h2 className="text-2xl" style={{ fontFamily: "ui-serif, Georgia, serif", color: "#e7ede9" }}>
                    Before any of it
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "#9db0ab" }}>
                    A continent under cloud, with Latin where the knowledge runs out and conjecture where the
                    soundings do. Twenty-two expeditions clear it, one route at a time. Watch how little each
                    one actually opens — and notice who was doing the guiding.
                  </p>
                  <p className="mt-4 text-xs" style={{ color: "#4f6663" }}>Scroll ↓</p>
                </div>
              )}

              {s.k === "ch" && (
                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span style={{ color: BRASS, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12 }}>{s.c.era}</span>
                    <span className="tabular-nums text-[11px]" style={{ color: "#41544f", fontFamily: "ui-monospace, Menlo, monospace" }}>
                      {String(s.c.n).padStart(2, "0")} / {CH.length}
                    </span>
                  </div>
                  <h2 className="mt-1 text-2xl sm:text-3xl" style={{ fontFamily: "ui-serif, Georgia, serif", color: "#e7ede9" }}>
                    {s.c.title}
                  </h2>
                  <div className="text-xs mt-1" style={{ color: "#6b8580" }}>{s.c.who}</div>
                  <p className="mt-3 text-sm sm:text-[15px] leading-relaxed" style={{ color: "#9db0ab" }}>{s.c.text}</p>

                  <div className="mt-4 grid gap-2" style={{ fontSize: 12.5 }}>
                    {s.c.guide && (
                      <div style={{ borderLeft: "2px solid #3f6a75", paddingLeft: 10 }}>
                        <span className="block text-[10px] tracking-[0.2em] uppercase mb-0.5" style={{ color: "#4f6663" }}>Whose knowledge</span>
                        <span style={{ color: "#a9bcb7" }}>{s.c.guide}</span>
                      </div>
                    )}
                    {s.c.cost && (
                      <div style={{ borderLeft: `2px solid ${MADDER}`, paddingLeft: 10 }}>
                        <span className="block text-[10px] tracking-[0.2em] uppercase mb-0.5" style={{ color: "#4f6663" }}>What it cost</span>
                        <span style={{ color: "#a9bcb7" }}>{s.c.cost}</span>
                      </div>
                    )}
                    {s.c.strike && (
                      <div style={{ borderLeft: "2px solid #5b4a55", paddingLeft: 10 }}>
                        <span className="block text-[10px] tracking-[0.2em] uppercase mb-0.5" style={{ color: "#4f6663" }}>Struck from the map</span>
                        <span style={{ color: "#93706a", textDecoration: "line-through" }}>{s.c.strike.join(" · ")}</span>
                      </div>
                    )}
                    {s.c.add && (
                      <div style={{ borderLeft: `2px solid ${BRASS}`, paddingLeft: 10 }}>
                        <span className="block text-[10px] tracking-[0.2em] uppercase mb-0.5" style={{ color: "#4f6663" }}>Added to the map</span>
                        <span style={{ color: "#c9b184" }}>{s.c.add.join(" · ")}</span>
                      </div>
                    )}
                    {s.c.see && s.c.see.length > 0 && (
                      <div style={{ borderLeft: "2px solid #4d7d68", paddingLeft: 10 }}>
                        <span className="block text-[10px] tracking-[0.2em] uppercase mb-0.5" style={{ color: "#4f6663" }}>Still there</span>
                        <Links items={s.c.see} color="#8fbf9a" />
                      </div>
                    )}
                    {s.c.wiki && s.c.wiki.length > 0 && (
                      <div style={{ borderLeft: "2px solid #3c4f4c", paddingLeft: 10 }}>
                        <span className="block text-[10px] tracking-[0.2em] uppercase mb-0.5" style={{ color: "#4f6663" }}>Read the record</span>
                        <Links items={s.c.wiki} color="#a9bcb7" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {s.k === "end" && (
                <div className="w-full">
                  <h2 className="text-2xl sm:text-3xl" style={{ fontFamily: "ui-serif, Georgia, serif", color: "#e7ede9" }}>
                    And then it was paperwork
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "#9db0ab" }}>
                    Nine hundred years, and the fog goes out on a government payroll. Worth saying plainly: the map
                    being finished never meant the land was unknown. It means one set of people finally wrote down
                    what another set had been telling them the whole way — Domagaya, Matonabbee, Sacagawea, the Cree
                    mapmakers of the Bay, the Inuit who knew where Franklin's ships went years before London would
                    hear it.
                  </p>

                  <div className="mt-6 rounded-md p-5" style={{ border: "1px solid #24383a", background: "#0b1417" }}>
                    <div className="flex items-baseline gap-3">
                      <span className="tabular-nums leading-none" style={{ fontFamily: "ui-serif, Georgia, serif", fontSize: "3rem", color: BRASS }}>
                        {100 - CHARTED[21]}%
                      </span>
                      <span className="text-sm" style={{ color: "#9db0ab" }}>
                        of North America was still fog in 1859, when the surveyors arrived.
                      </span>
                    </div>
                    {!share && (
                      <button onClick={makeCard} disabled={busy}
                        className="mt-4 px-4 py-2 rounded text-sm"
                        style={{ border: `1px solid ${BRASS}`, background: "rgba(216,180,90,0.12)", color: "#e0c072",
                                 fontFamily: "ui-monospace, Menlo, monospace" }}>
                        {busy ? "Drawing…" : "Make the share card"}
                      </button>
                    )}
                    {share === "error" && <p className="mt-3 text-xs" style={{ color: "#93706a" }}>Couldn't render the image here — the figure above is the shareable bit.</p>}
                    {share && share !== "error" && (
                      <div className="mt-4">
                        <img src={share} alt="43% of North America was still fog in 1859" className="w-full rounded" style={{ border: "1px solid #24383a" }} />
                        <p className="mt-2 text-[11px]" style={{ color: "#4f6663" }}>
                          Long-press (or right-click) to save. <a href={share} download="the-fog-1859.png" style={{ color: "#7d918d", textDecoration: "underline" }}>Or download it.</a>
                        </p>
                      </div>
                    )}
                  </div>

                  <p className="mt-6 text-[11px] leading-relaxed" style={{ color: "#4f6663" }}>
                    Coastlines, lakes and rivers: Natural Earth 50m, public domain. Routes are schematic — enough to
                    carry the fog, not survey lines. Figures and dates come from general accounts and are
                    approximate; treat the round numbers as round. The Arctic runs second-to-last though it starts
                    in 1576, because that is how it behaved on the maps: still blank when everything else had
                    filled. Every link goes to Wikipedia; the green ones are places you can still stand in.
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
