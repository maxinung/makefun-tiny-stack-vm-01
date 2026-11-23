import{mkdirSync,readdirSync,readFileSync,statSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
function R(p,q){
 let s=[],c=[],m=new Int32Array(256),o='',pc=0,n=0,ip=0,a,b,t;
 for(;;){
  if(n>=1e6)return[Buffer.from(o,'latin1'),10];
  if(pc<0||pc>=p.length)return[Buffer.from(o,'latin1'),9];
  let k=p[pc];
  switch(k){
  case 0:return[Buffer.from(o,'latin1'),0];
  case 1:
   if(pc+2>p.length)return[Buffer.from(o,'latin1'),9];
   if(s.length>255)return[Buffer.from(o,'latin1'),3];
   s.push((p[pc+1]<<24)>>24);pc+=2;break;
  case 2:
   if(pc+5>p.length)return[Buffer.from(o,'latin1'),9];
   if(s.length>255)return[Buffer.from(o,'latin1'),3];
   s.push(p[pc+1]|p[pc+2]<<8|p[pc+3]<<16|p[pc+4]<<24);pc+=5;break;
  case 3:
   if(!s.length)return[Buffer.from(o,'latin1'),2];
   s.pop();pc++;break;
  case 4:
   if(!s.length)return[Buffer.from(o,'latin1'),2];
   if(s.length>255)return[Buffer.from(o,'latin1'),3];
   s.push(s[s.length-1]);pc++;break;
  case 5:
   if(s.length<2)return[Buffer.from(o,'latin1'),2];
   a=s[s.length-1];s[s.length-1]=s[s.length-2];s[s.length-2]=a;pc++;break;
  case 6:
   if(s.length<2)return[Buffer.from(o,'latin1'),2];
   if(s.length>255)return[Buffer.from(o,'latin1'),3];
   s.push(s[s.length-2]);pc++;break;
  case 7:
   if(s.length<3)return[Buffer.from(o,'latin1'),2];
   a=s[s.length-3];s[s.length-3]=s[s.length-2];s[s.length-2]=s[s.length-1];s[s.length-1]=a;pc++;break;
  case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:
   if(s.length<2)return[Buffer.from(o,'latin1'),2];
   b=s.pop();a=s.pop();
   if(k==16)t=(a+b)|0;
   else if(k==17)t=(a-b)|0;
   else if(k==18)t=Math.imul(a,b);
   else if(k==19){if(!b)return[Buffer.from(o,'latin1'),4];t=(a/b)|0;}
   else if(k==20){if(!b)return[Buffer.from(o,'latin1'),4];t=a%b;}
   else if(k==21){if(!b)return[Buffer.from(o,'latin1'),4];t=Math.trunc((a>>>0)/(b>>>0))|0;}
   else if(k==22){if(!b)return[Buffer.from(o,'latin1'),4];t=((a>>>0)%(b>>>0))|0;}
   else if(k==24)t=a&b;
   else if(k==25)t=a|b;
   else if(k==26)t=a^b;
   else if(k==28)t=a<<(b&31);
   else if(k==29)t=a>>(b&31);
   else if(k==30)t=(a>>>(b&31))|0;
   else if(k==32)t=a==b?1:0;
   else if(k==33)t=a<b?1:0;
   else t=(a>>>0)<(b>>>0)?1:0;
   s.push(t);pc++;break;
  case 23:
   if(!s.length)return[Buffer.from(o,'latin1'),2];
   s[s.length-1]=(-s[s.length-1])|0;pc++;break;
  case 27:
   if(!s.length)return[Buffer.from(o,'latin1'),2];
   s[s.length-1]=~s[s.length-1];pc++;break;
  case 48:
   if(pc+3>p.length)return[Buffer.from(o,'latin1'),9];
   pc=pc+3+((p[pc+1]|p[pc+2]<<8)<<16>>16);break;
  case 49:
   if(pc+3>p.length)return[Buffer.from(o,'latin1'),9];
   if(!s.length)return[Buffer.from(o,'latin1'),2];
   a=s.pop();pc=a==0?pc+3+((p[pc+1]|p[pc+2]<<8)<<16>>16):pc+3;break;
  case 50:
   if(pc+3>p.length)return[Buffer.from(o,'latin1'),9];
   if(!s.length)return[Buffer.from(o,'latin1'),2];
   a=s.pop();pc=a!=0?pc+3+((p[pc+1]|p[pc+2]<<8)<<16>>16):pc+3;break;
  case 51:
   if(pc+3>p.length)return[Buffer.from(o,'latin1'),9];
   if(c.length>=64)return[Buffer.from(o,'latin1'),7];
   c.push(pc+3);pc=p[pc+1]|p[pc+2]<<8;break;
  case 52:
   if(!c.length)return[Buffer.from(o,'latin1'),8];
   pc=c.pop();break;
  case 64:
   if(!s.length)return[Buffer.from(o,'latin1'),2];
   a=s.pop();
   if(a<0||a>255)return[Buffer.from(o,'latin1'),6];
   s.push(m[a]);pc++;break;
  case 65:
   if(s.length<2)return[Buffer.from(o,'latin1'),2];
   a=s.pop();b=s.pop();
   if(a<0||a>255)return[Buffer.from(o,'latin1'),6];
   m[a]=b;pc++;break;
  case 80:
   if(!s.length)return[Buffer.from(o,'latin1'),2];
   a=s.pop();t=String(a);
   if(o.length+t.length>65536)return[Buffer.from(o,'latin1'),11];
   o+=t;pc++;break;
  case 81:
   if(!s.length)return[Buffer.from(o,'latin1'),2];
   a=s.pop();
   if(o.length>=65536)return[Buffer.from(o,'latin1'),11];
   o+=String.fromCharCode(a&255);pc++;break;
  case 82:
   if(s.length>255)return[Buffer.from(o,'latin1'),3];
   s.push(ip<q.length?q[ip++]:-1);pc++;break;
  case 83:
   if(!s.length)return[Buffer.from(o,'latin1'),2];
   a=s.pop();return[Buffer.from(o,'latin1'),a&255];
  default:return[Buffer.from(o,'latin1'),5];
  }
  n++;
 }
}
for(const id of readdirSync(I).sort()){
 if(!statSync(join(I,id)).isDirectory())continue;
 mkdirSync(join(O,id),{recursive:true});
 let r=R(readFileSync(join(I,id,'program.bin')),readFileSync(join(I,id,'input.bin')));
 writeFileSync(join(O,id,'stdout.bin'),r[0]);
 writeFileSync(join(O,id,'exit.txt'),String(r[1])+'\n');
}
