!function(){"use strict";const{Array:e,Object:t,Number:n,Math:s,Error:r,Uint8Array:a,Uint16Array:o,Uint32Array:i,Int32Array:c,Map:l,DataView:u,Promise:h,TextEncoder:f,crypto:p,postMessage:d,TransformStream:g,ReadableStream:w,WritableStream:y,CompressionStream:m,DecompressionStream:_}=self,b=void 0,S="undefined",v="function";class k{constructor(e){return class extends g{constructor(t,n){const s=new e(n);super({transform(e,t){t.enqueue(s.append(e))},flush(e){const t=s.flush();t&&e.enqueue(t)}})}}}}const z=[];for(let e=0;256>e;e++){let t=e;for(let e=0;8>e;e++)1&t?t=t>>>1^3988292384:t>>>=1;z[e]=t}class C{constructor(e){this.crc=e||-1}append(e){let t=0|this.crc;for(let n=0,s=0|e.length;s>n;n++)t=t>>>8^z[255&(t^e[n])];this.crc=t}get(){return~this.crc}}class D extends g{constructor(){let e;const t=new C;super({transform(e,n){t.append(e),n.enqueue(e)},flush(){const n=new a(4);new u(n.buffer).setUint32(0,t.get()),e.value=n}}),e=this}}const I={concat(e,t){if(0===e.length||0===t.length)return e.concat(t);const n=e[e.length-1],s=I.getPartial(n);return 32===s?e.concat(t):I._shiftRight(t,s,0|n,e.slice(0,e.length-1))},bitLength(e){const t=e.length;if(0===t)return 0;const n=e[t-1];return 32*(t-1)+I.getPartial(n)},clamp(e,t){if(32*e.length<t)return e;const n=(e=e.slice(0,s.ceil(t/32))).length;return t&=31,n>0&&t&&(e[n-1]=I.partial(t,e[n-1]&2147483648>>t-1,1)),e},partial:(e,t,n)=>32===e?t:(n?0|t:t<<32-e)+1099511627776*e,getPartial:e=>s.round(e/1099511627776)||32,_shiftRight(e,t,n,s){for(void 0===s&&(s=[]);t>=32;t-=32)s.push(n),n=0;if(0===t)return s.concat(e);for(let r=0;r<e.length;r++)s.push(n|e[r]>>>t),n=e[r]<<32-t;const r=e.length?e[e.length-1]:0,a=I.getPartial(r);return s.push(I.partial(t+a&31,t+a>32?n:s.pop(),1)),s}},A={bytes:{fromBits(e){const t=I.bitLength(e)/8,n=new a(t);let s;for(let r=0;t>r;r++)0==(3&r)&&(s=e[r/4]),n[r]=s>>>24,s<<=8;return n},toBits(e){const t=[];let n,s=0;for(n=0;n<e.length;n++)s=s<<8|e[n],3==(3&n)&&(t.push(s),s=0);return 3&n&&t.push(I.partial(8*(3&n),s)),t}}},q=class{constructor(e){const t=this;t.blockSize=512,t._init=[1732584193,4023233417,2562383102,271733878,3285377520],t._key=[1518500249,1859775393,2400959708,3395469782],e?(t._h=e._h.slice(0),t._buffer=e._buffer.slice(0),t._length=e._length):t.reset()}reset(){const e=this;return e._h=e._init.slice(0),e._buffer=[],e._length=0,e}update(e){const t=this;"string"==typeof e&&(e=A.utf8String.toBits(e));const n=t._buffer=I.concat(t._buffer,e),s=t._length,a=t._length=s+I.bitLength(e);if(a>9007199254740991)throw new r("Cannot hash more than 2^53 - 1 bits");const o=new i(n);let c=0;for(let e=t.blockSize+s-(t.blockSize+s&t.blockSize-1);a>=e;e+=t.blockSize)t._block(o.subarray(16*c,16*(c+1))),c+=1;return n.splice(0,16*c),t}finalize(){const e=this;let t=e._buffer;const n=e._h;t=I.concat(t,[I.partial(1,1)]);for(let e=t.length+2;15&e;e++)t.push(0);for(t.push(s.floor(e._length/4294967296)),t.push(0|e._length);t.length;)e._block(t.splice(0,16));return e.reset(),n}_f(e,t,n,s){return e>19?e>39?e>59?e>79?void 0:t^n^s:t&n|t&s|n&s:t^n^s:t&n|~t&s}_S(e,t){return t<<e|t>>>32-e}_block(t){const n=this,r=n._h,a=e(80);for(let e=0;16>e;e++)a[e]=t[e];let o=r[0],i=r[1],c=r[2],l=r[3],u=r[4];for(let e=0;79>=e;e++){16>e||(a[e]=n._S(1,a[e-3]^a[e-8]^a[e-14]^a[e-16]));const t=n._S(5,o)+n._f(e,i,c,l)+u+a[e]+n._key[s.floor(e/20)]|0;u=l,l=c,c=n._S(30,i),i=o,o=t}r[0]=r[0]+o|0,r[1]=r[1]+i|0,r[2]=r[2]+c|0,r[3]=r[3]+l|0,r[4]=r[4]+u|0}},R={getRandomValues(e){const t=new i(e.buffer),n=e=>{let t=987654321;const n=4294967295;return()=>(t=36969*(65535&t)+(t>>16)&n,(((t<<16)+(e=18e3*(65535&e)+(e>>16)&n)&n)/4294967296+.5)*(s.random()>.5?1:-1))};for(let r,a=0;a<e.length;a+=4){const e=n(4294967296*(r||s.random()));r=987654071*e(),t[a/4]=4294967296*e()|0}return e}},H={importKey:e=>new H.hmacSha1(A.bytes.toBits(e)),pbkdf2(e,t,n,s){if(n=n||1e4,0>s||0>n)throw new r("invalid params to pbkdf2");const a=1+(s>>5)<<2;let o,i,c,l,h;const f=new ArrayBuffer(a),p=new u(f);let d=0;const g=I;for(t=A.bytes.toBits(t),h=1;(a||1)>d;h++){for(o=i=e.encrypt(g.concat(t,[h])),c=1;n>c;c++)for(i=e.encrypt(i),l=0;l<i.length;l++)o[l]^=i[l];for(c=0;(a||1)>d&&c<o.length;c++)p.setInt32(d,o[c]),d+=4}return f.slice(0,s/8)},hmacSha1:class{constructor(e){const t=this,n=t._hash=q,s=[[],[]];t._baseHash=[new n,new n];const r=t._baseHash[0].blockSize/32;e.length>r&&(e=(new n).update(e).finalize());for(let t=0;r>t;t++)s[0][t]=909522486^e[t],s[1][t]=1549556828^e[t];t._baseHash[0].update(s[0]),t._baseHash[1].update(s[1]),t._resultHash=new n(t._baseHash[0])}reset(){const e=this;e._resultHash=new e._hash(e._baseHash[0]),e._updated=!1}update(e){this._updated=!0,this._resultHash.update(e)}digest(){const e=this,t=e._resultHash.finalize(),n=new e._hash(e._baseHash[1]).update(t).finalize();return e.reset(),n}encrypt(e){if(this._updated)throw new r("encrypt on already updated hmac called!");return this.update(e),this.digest(e)}}},P=typeof p!=S&&typeof p.getRandomValues==v,B="Invalid password",K="Invalid signature",T="zipjs-abort-check-password";function V(e){return P?p.getRandomValues(e):R.getRandomValues(e)}const x=16,E={name:"PBKDF2"},U=t.assign({hash:{name:"HMAC"}},E),W=t.assign({iterations:1e3,hash:{name:"SHA-1"}},E),M=["deriveBits"],N=[8,12,16],O=[16,24,32],L=10,F=[0,0,0,0],j=typeof p!=S,G=j&&p.subtle,X=j&&typeof G!=S,J=A.bytes,Q=class{constructor(e){const t=this;t._tables=[[[],[],[],[],[]],[[],[],[],[],[]]],t._tables[0][0][0]||t._precompute();const n=t._tables[0][4],s=t._tables[1],a=e.length;let o,i,c,l=1;if(4!==a&&6!==a&&8!==a)throw new r("invalid aes key size");for(t._key=[i=e.slice(0),c=[]],o=a;4*a+28>o;o++){let e=i[o-1];(o%a==0||8===a&&o%a==4)&&(e=n[e>>>24]<<24^n[e>>16&255]<<16^n[e>>8&255]<<8^n[255&e],o%a==0&&(e=e<<8^e>>>24^l<<24,l=l<<1^283*(l>>7))),i[o]=i[o-a]^e}for(let e=0;o;e++,o--){const t=i[3&e?o:o-4];c[e]=4>=o||4>e?t:s[0][n[t>>>24]]^s[1][n[t>>16&255]]^s[2][n[t>>8&255]]^s[3][n[255&t]]}}encrypt(e){return this._crypt(e,0)}decrypt(e){return this._crypt(e,1)}_precompute(){const e=this._tables[0],t=this._tables[1],n=e[4],s=t[4],r=[],a=[];let o,i,c,l;for(let e=0;256>e;e++)a[(r[e]=e<<1^283*(e>>7))^e]=e;for(let u=o=0;!n[u];u^=i||1,o=a[o]||1){let a=o^o<<1^o<<2^o<<3^o<<4;a=a>>8^255&a^99,n[u]=a,s[a]=u,l=r[c=r[i=r[u]]];let h=16843009*l^65537*c^257*i^16843008*u,f=257*r[a]^16843008*a;for(let n=0;4>n;n++)e[n][u]=f=f<<24^f>>>8,t[n][a]=h=h<<24^h>>>8}for(let n=0;5>n;n++)e[n]=e[n].slice(0),t[n]=t[n].slice(0)}_crypt(e,t){if(4!==e.length)throw new r("invalid aes block size");const n=this._key[t],s=n.length/4-2,a=[0,0,0,0],o=this._tables[t],i=o[0],c=o[1],l=o[2],u=o[3],h=o[4];let f,p,d,g=e[0]^n[0],w=e[t?3:1]^n[1],y=e[2]^n[2],m=e[t?1:3]^n[3],_=4;for(let e=0;s>e;e++)f=i[g>>>24]^c[w>>16&255]^l[y>>8&255]^u[255&m]^n[_],p=i[w>>>24]^c[y>>16&255]^l[m>>8&255]^u[255&g]^n[_+1],d=i[y>>>24]^c[m>>16&255]^l[g>>8&255]^u[255&w]^n[_+2],m=i[m>>>24]^c[g>>16&255]^l[w>>8&255]^u[255&y]^n[_+3],_+=4,g=f,w=p,y=d;for(let e=0;4>e;e++)a[t?3&-e:e]=h[g>>>24]<<24^h[w>>16&255]<<16^h[y>>8&255]<<8^h[255&m]^n[_++],f=g,g=w,w=y,y=m,m=f;return a}},Y=class{constructor(e,t){this._prf=e,this._initIv=t,this._iv=t}reset(){this._iv=this._initIv}update(e){return this.calculate(this._prf,e,this._iv)}incWord(e){if(255==(e>>24&255)){let t=e>>16&255,n=e>>8&255,s=255&e;255===t?(t=0,255===n?(n=0,255===s?s=0:++s):++n):++t,e=0,e+=t<<16,e+=n<<8,e+=s}else e+=1<<24;return e}incCounter(e){0===(e[0]=this.incWord(e[0]))&&(e[1]=this.incWord(e[1]))}calculate(e,t,n){let s;if(!(s=t.length))return[];const r=I.bitLength(t);for(let r=0;s>r;r+=4){this.incCounter(n);const s=e.encrypt(n);t[r]^=s[0],t[r+1]^=s[1],t[r+2]^=s[2],t[r+3]^=s[3]}return I.clamp(t,r)}},Z=H.hmacSha1;let $=j&&X&&typeof G.importKey==v,ee=j&&X&&typeof G.deriveBits==v;class te extends g{constructor({password:e,rawPassword:n,signed:s,encryptionStrength:o,checkPasswordOnly:i}){super({start(){t.assign(this,{ready:new h((e=>this.resolveReady=e)),password:ae(e,n),signed:s,strength:o-1,pending:new a})},async transform(e,t){const n=this,{password:s,strength:o,resolveReady:c,ready:l}=n;s?(await(async(e,t,n,s)=>{const a=await re(e,t,n,ie(s,0,N[t])),o=ie(s,N[t]);if(a[0]!=o[0]||a[1]!=o[1])throw new r(B)})(n,o,s,ie(e,0,N[o]+2)),e=ie(e,N[o]+2),i?t.error(new r(T)):c()):await l;const u=new a(e.length-L-(e.length-L)%x);t.enqueue(se(n,e,u,0,L,!0))},async flush(e){const{signed:t,ctr:n,hmac:s,pending:o,ready:i}=this;if(s&&n){await i;const c=ie(o,0,o.length-L),l=ie(o,o.length-L);let u=new a;if(c.length){const e=le(J,c);s.update(e);const t=n.update(e);u=ce(J,t)}if(t){const e=ie(ce(J,s.digest()),0,L);for(let t=0;L>t;t++)if(e[t]!=l[t])throw new r(K)}e.enqueue(u)}}})}}class ne extends g{constructor({password:e,rawPassword:n,encryptionStrength:s}){let r;super({start(){t.assign(this,{ready:new h((e=>this.resolveReady=e)),password:ae(e,n),strength:s-1,pending:new a})},async transform(e,t){const n=this,{password:s,strength:r,resolveReady:o,ready:i}=n;let c=new a;s?(c=await(async(e,t,n)=>{const s=V(new a(N[t]));return oe(s,await re(e,t,n,s))})(n,r,s),o()):await i;const l=new a(c.length+e.length-e.length%x);l.set(c,0),t.enqueue(se(n,e,l,c.length,0))},async flush(e){const{ctr:t,hmac:n,pending:s,ready:o}=this;if(n&&t){await o;let i=new a;if(s.length){const e=t.update(le(J,s));n.update(e),i=ce(J,e)}r.signature=ce(J,n.digest()).slice(0,L),e.enqueue(oe(i,r.signature))}}}),r=this}}function se(e,t,n,s,r,o){const{ctr:i,hmac:c,pending:l}=e,u=t.length-r;let h;for(l.length&&(t=oe(l,t),n=((e,t)=>{if(t&&t>e.length){const n=e;(e=new a(t)).set(n,0)}return e})(n,u-u%x)),h=0;u-x>=h;h+=x){const e=le(J,ie(t,h,h+x));o&&c.update(e);const r=i.update(e);o||c.update(r),n.set(ce(J,r),h+s)}return e.pending=ie(t,h),n}async function re(n,s,r,o){n.password=null;const i=await(async(e,t,n,s,r)=>{if(!$)return H.importKey(t);try{return await G.importKey("raw",t,n,!1,r)}catch(e){return $=!1,H.importKey(t)}})(0,r,U,0,M),c=await(async(e,t,n)=>{if(!ee)return H.pbkdf2(t,e.salt,W.iterations,n);try{return await G.deriveBits(e,t,n)}catch(s){return ee=!1,H.pbkdf2(t,e.salt,W.iterations,n)}})(t.assign({salt:o},W),i,8*(2*O[s]+2)),l=new a(c),u=le(J,ie(l,0,O[s])),h=le(J,ie(l,O[s],2*O[s])),f=ie(l,2*O[s]);return t.assign(n,{keys:{key:u,authentication:h,passwordVerification:f},ctr:new Y(new Q(u),e.from(F)),hmac:new Z(h)}),f}function ae(e,t){return t===b?(e=>{if(typeof f==S){const t=new a((e=unescape(encodeURIComponent(e))).length);for(let n=0;n<t.length;n++)t[n]=e.charCodeAt(n);return t}return(new f).encode(e)})(e):t}function oe(e,t){let n=e;return e.length+t.length&&(n=new a(e.length+t.length),n.set(e,0),n.set(t,e.length)),n}function ie(e,t,n){return e.subarray(t,n)}function ce(e,t){return e.fromBits(t)}function le(e,t){return e.toBits(t)}class ue extends g{constructor({password:e,passwordVerification:n,checkPasswordOnly:s}){super({start(){t.assign(this,{password:e,passwordVerification:n}),de(this,e)},transform(e,t){const n=this;if(n.password){const t=fe(n,e.subarray(0,12));if(n.password=null,t[11]!=n.passwordVerification)throw new r(B);e=e.subarray(12)}s?t.error(new r(T)):t.enqueue(fe(n,e))}})}}class he extends g{constructor({password:e,passwordVerification:n}){super({start(){t.assign(this,{password:e,passwordVerification:n}),de(this,e)},transform(e,t){const n=this;let s,r;if(n.password){n.password=null;const t=V(new a(12));t[11]=n.passwordVerification,s=new a(e.length+t.length),s.set(pe(n,t),0),r=12}else s=new a(e.length),r=0;s.set(pe(n,e),r),t.enqueue(s)}})}}function fe(e,t){const n=new a(t.length);for(let s=0;s<t.length;s++)n[s]=we(e)^t[s],ge(e,n[s]);return n}function pe(e,t){const n=new a(t.length);for(let s=0;s<t.length;s++)n[s]=we(e)^t[s],ge(e,t[s]);return n}function de(e,n){const s=[305419896,591751049,878082192];t.assign(e,{keys:s,crcKey0:new C(s[0]),crcKey2:new C(s[2])});for(let t=0;t<n.length;t++)ge(e,n.charCodeAt(t))}function ge(e,t){let[n,r,a]=e.keys;e.crcKey0.append([t]),n=~e.crcKey0.get(),r=me(s.imul(me(r+ye(n)),134775813)+1),e.crcKey2.append([r>>>24]),a=~e.crcKey2.get(),e.keys=[n,r,a]}function we(e){const t=2|e.keys[2];return ye(s.imul(t,1^t)>>>8)}function ye(e){return 255&e}function me(e){return 4294967295&e}const _e="deflate-raw";class be extends g{constructor(e,{chunkSize:t,CompressionStream:n,CompressionStreamNative:s}){super({});const{compressed:r,encrypted:a,useCompressionStream:o,zipCrypto:i,signed:c,level:l}=e,h=this;let f,p,d=ve(super.readable);a&&!i||!c||(f=new D,d=Ce(d,f)),r&&(d=ze(d,o,{level:l,chunkSize:t},s,n)),a&&(i?d=Ce(d,new he(e)):(p=new ne(e),d=Ce(d,p))),ke(h,d,(()=>{let e;a&&!i&&(e=p.signature),a&&!i||!c||(e=new u(f.value.buffer).getUint32(0)),h.signature=e}))}}class Se extends g{constructor(e,{chunkSize:t,DecompressionStream:n,DecompressionStreamNative:s}){super({});const{zipCrypto:a,encrypted:o,signed:i,signature:c,compressed:l,useCompressionStream:h}=e;let f,p,d=ve(super.readable);o&&(a?d=Ce(d,new ue(e)):(p=new te(e),d=Ce(d,p))),l&&(d=ze(d,h,{chunkSize:t},s,n)),o&&!a||!i||(f=new D,d=Ce(d,f)),ke(this,d,(()=>{if((!o||a)&&i){const e=new u(f.value.buffer);if(c!=e.getUint32(0,!1))throw new r(K)}}))}}function ve(e){return Ce(e,new g({transform(e,t){e&&e.length&&t.enqueue(e)}}))}function ke(e,n,s){n=Ce(n,new g({flush:s})),t.defineProperty(e,"readable",{get:()=>n})}function ze(e,t,n,s,r){try{e=Ce(e,new(t&&s?s:r)(_e,n))}catch(s){if(!t)return e;try{e=Ce(e,new r(_e,n))}catch(t){return e}}return e}function Ce(e,t){return e.pipeThrough(t)}const De="data",Ie="close";class Ae extends g{constructor(e,n){super({});const s=this,{codecType:r}=e;let a;r.startsWith("deflate")?a=be:r.startsWith("inflate")&&(a=Se);let o=0,i=0;const c=new a(e,n),l=super.readable,u=new g({transform(e,t){e&&e.length&&(i+=e.length,t.enqueue(e))},flush(){t.assign(s,{inputSize:i})}}),h=new g({transform(e,t){e&&e.length&&(o+=e.length,t.enqueue(e))},flush(){const{signature:e}=c;t.assign(s,{signature:e,outputSize:o,inputSize:i})}});t.defineProperty(s,"readable",{get:()=>l.pipeThrough(u).pipeThrough(c).pipeThrough(h)})}}class qe extends g{constructor(e){let t;super({transform:function n(s,r){if(t){const e=new a(t.length+s.length);e.set(t),e.set(s,t.length),s=e,t=null}s.length>e?(r.enqueue(s.slice(0,e)),n(s.slice(e),r)):t=s},flush(e){t&&t.length&&e.enqueue(t)}})}}const Re=new l,He=new l;let Pe,Be=0,Ke=!0;async function Te(e){try{const{options:t,scripts:s,config:r}=e;if(s&&s.length)try{Ke?importScripts.apply(b,s):await Ve(s)}catch(e){Ke=!1,await Ve(s)}self.initCodec&&self.initCodec(),r.CompressionStreamNative=self.CompressionStream,r.DecompressionStreamNative=self.DecompressionStream,self.Deflate&&(r.CompressionStream=new k(self.Deflate)),self.Inflate&&(r.DecompressionStream=new k(self.Inflate));const a={highWaterMark:1},o=e.readable||new w({async pull(e){const t=new h((e=>Re.set(Be,e)));xe({type:"pull",messageId:Be}),Be=(Be+1)%n.MAX_SAFE_INTEGER;const{value:s,done:r}=await t;e.enqueue(s),r&&e.close()}},a),i=e.writable||new y({async write(e){let t;const s=new h((e=>t=e));He.set(Be,t),xe({type:De,value:e,messageId:Be}),Be=(Be+1)%n.MAX_SAFE_INTEGER,await s}},a),c=new Ae(t,r);Pe=new AbortController;const{signal:l}=Pe;await o.pipeThrough(c).pipeThrough(new qe(r.chunkSize)).pipeTo(i,{signal:l,preventClose:!0,preventAbort:!0});try{await i.getWriter().close()}catch(e){}const{signature:u,inputSize:f,outputSize:p}=c;xe({type:Ie,result:{signature:u,inputSize:f,outputSize:p}})}catch(e){Ee(e)}}async function Ve(e){for(const t of e)await import(t)}function xe(e){let{value:t}=e;if(t)if(t.length)try{t=new a(t),e.value=t.buffer,d(e,[e.value])}catch(t){d(e)}else d(e);else d(e)}function Ee(e=new r("Unknown error")){const{message:t,stack:n,code:s,name:a}=e;d({error:{message:t,stack:n,code:s,name:a}})}function Ue(e,n,s){return class{constructor(r){const o=this;var i,c;i=r,c="level",(typeof t.hasOwn===v?t.hasOwn(i,c):i.hasOwnProperty(c))&&r.level===b&&delete r.level,o.codec=new e(t.assign({},n,r)),s(o.codec,(e=>{if(o.pendingData){const t=o.pendingData;o.pendingData=new a(t.length+e.length);const{pendingData:n}=o;n.set(t,0),n.set(e,t.length)}else o.pendingData=new a(e)}))}append(e){return this.codec.push(e),r(this)}flush(){return this.codec.push(new a,!0),r(this)}};function r(e){if(e.pendingData){const t=e.pendingData;return e.pendingData=null,t}return new a}}addEventListener("message",(({data:e})=>{const{type:t,messageId:n,value:s,done:r}=e;try{if("start"==t&&Te(e),t==De){const e=Re.get(n);Re.delete(n),e({value:new a(s),done:r})}if("ack"==t){const e=He.get(n);He.delete(n),e()}t==Ie&&Pe.abort()}catch(e){Ee(e)}})),self.initCodec=()=>{const{Deflate:e,Inflate:t}=((e,t={},n)=>({Deflate:Ue(e.Deflate,t.deflate,n),Inflate:Ue(e.Inflate,t.inflate,n)}))(fflate,b,((e,t)=>e.ondata=t));self.Deflate=e,self.Inflate=t}}();
