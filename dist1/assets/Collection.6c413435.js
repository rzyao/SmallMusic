import{l as h,u as C,o as f,a as g,m,b as i,c as l,d as s,F as y,e as w,n as b,t as d,k,p as x,f as B,_ as z}from"./index.18ae5dad.js";const L=e=>(x("data-v-a87f0477"),e=e(),B(),e),I={class:"content-box no-select"},D={class:"content"},S=k('<div class="title-header" data-v-a87f0477>\u6211\u6536\u85CF\u7684\u6B4C\u5355</div><div class="title" data-v-a87f0477><div class="name" data-v-a87f0477>\u6B4C\u5355</div><div class="song-count" data-v-a87f0477>\u64AD\u653E\u6570</div><div class="play-count" data-v-a87f0477>\u6B4C\u66F2\u6570</div></div>',2),F={class:"lists-box"},A={class:"lists scroll"},E=["onClick"],H=L(()=>s("div",{class:"icon"},[s("svg",{t:"1670942647731",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"3264",width:"16",height:"16"},[s("path",{d:"M880.245529 681.54683c3.287261 74.378806-47.322115 157.716302-134.163616 207.892194-113.067344 65.311744-244.44943 53.824391-293.469361-35.401278-47.141496-85.830035 3.034395-206.483367 116.101739-271.758986 91.356969-52.740678 193.840054-51.765337 255.936783-5.057326V117.907927c0-15.460966 12.643313-28.032032 28.104279-28.032032 15.49709 0 28.032032 12.534942 28.032032 28.032032v561.074117c0 0.86697-0.433485 1.661693-0.541856 2.564786z m-65.022754-43.492997c-39.158147-59.965428-146.517938-61.988359-230.036053-11.667972-83.518115 50.428758-123.579356 146.228948-84.421209 206.194377 39.230395 60.037676 142.869439 61.482626 226.387554 11.126115 83.518115-50.428758 127.300102-145.614845 88.069708-205.65252z m-130.767983-295.709035H179.516986c-15.49709 0-28.104279-12.534942-28.104279-28.032031 0-15.569337 12.643313-28.104279 28.104279-28.104279h504.937806c15.460966 0 28.032032 12.534942 28.032032 28.104279a28.032032 28.032032 0 0 1-28.032032 28.032031z m0-168.300561H179.516986c-15.49709 0-28.104279-12.534942-28.104279-28.032031 0-15.569337 12.643313-28.104279 28.104279-28.104279h504.937806c15.460966 0 28.032032 12.534942 28.032032 28.104279a28.032032 28.032032 0 0 1-28.032032 28.032031zM179.516986 454.509049h308.496843c15.569337 0 28.104279 12.534942 28.104279 28.104279 0 15.460966-12.534942 28.032032-28.104279 28.032031h-308.496843c-15.49709 0-28.104279-12.534942-28.104279-28.032031 0-15.533213 12.643313-28.104279 28.104279-28.104279z m0 168.336684h168.300561c15.460966 0 28.032032 12.534942 28.032031 28.104279a28.032032 28.032032 0 0 1-28.032031 28.032032H179.516986c-15.49709 0-28.104279-12.534942-28.104279-28.032032 0-15.569337 12.643313-28.104279 28.104279-28.104279z",fill:"#231815","p-id":"3265"})])],-1)),M={class:"name"},N={class:"playCount"},V={class:"songCount"},q=h({__name:"Collection",setup(e){const r=C();f(()=>{p()});const a=g([]),c=[];async function p(){const n=await m.collectList.toArray();c.splice(0,c.length),a.splice(0,a.length),c.push(...n),c.forEach(async u=>{const o=(await window.devApi.getListDetails(u.id)).body.playlist,_={id:o.id,name:o.name,playCount:o.playCount,songCount:o.trackIds.length};a.push(_)}),console.log(a)}function v(n){r.push({path:"/ListDetails",query:{id:n}})}return(n,u)=>(i(),l("div",I,[s("div",D,[S,s("div",F,[s("div",A,[(i(!0),l(y,null,w(a,(t,o)=>(i(),l("div",{class:b(["list",o%2==0?"background":""]),key:t.id,onClick:_=>v(Number(t.id))},[H,s("div",M,d(t.name),1),s("div",N,d(t.playCount)+"\u6B21",1),s("div",V,d(t.songCount)+"\u9996",1)],10,E))),128))])])])]))}});const R=z(q,[["__scopeId","data-v-a87f0477"]]);export{R as default};
