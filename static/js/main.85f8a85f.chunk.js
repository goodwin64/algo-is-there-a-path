(window["webpackJsonpalgo-tes"]=window["webpackJsonpalgo-tes"]||[]).push([[0],{11:function(e,t,i){},14:function(e,t,i){},15:function(e,t,i){"use strict";i.r(t);var a=i(0),n=i.n(a),o=i(3),r=i.n(o),d=(i(11),i(1)),c=i(4),l=i.n(c),u=i(5),b=i.n(u);i(14);function f(e,t){for(var i={},a=function(a){var n=e[a],o=S(a,t.boardSizeY,t.boardSizeX),r=Object(d.a)(o,2),c=r[0],l=r[1],u=[z(e,c,l,"top",t.boardSizeY,t.boardSizeX),z(e,c,l,"right",t.boardSizeY,t.boardSizeX),z(e,c,l,"bottom",t.boardSizeY,t.boardSizeX),z(e,c,l,"left",t.boardSizeY,t.boardSizeX)],b=u[0],f=u[1],m=u[2],v=u[3],w=function(e,t,i){var a=S(t.id,i.boardSizeY,i.boardSizeX),n=Object(d.a)(a,2),o=n[0],r=n[1],c=[z(e,o,r,"top",i.boardSizeY,i.boardSizeX),z(e,o,r,"right",i.boardSizeY,i.boardSizeX),z(e,o,r,"bottom",i.boardSizeY,i.boardSizeX),z(e,o,r,"left",i.boardSizeY,i.boardSizeX)];return new Set([c[0],c[1],c[2],c[3],t].filter(Boolean).filter(function(e){return h(e,t)}).map(function(e){return e.id}))}(e,n,t);a in i||(i[a]=w),[b,f,m,v].forEach(function(e){e&&h(n,e)&&e.id in i&&s(w,i[e.id])}),[b,f,m,v].forEach(function(e){e&&h(n,e)&&e.id in i&&i[e.id].forEach(function(e){i[e]&&s(i[e],w)})})},n=0;n<e.length;n++)a(n);return i}function s(e,t){t.forEach(function(t){return e.add(t)})}function S(e,t,i){return[Math.floor(e/t),e%i]}function z(e,t,i,a,n,o){var r=0,d=0;if("left"===a){if(0===i)return;r=-1}else if("right"===a){if(i===o-1)return;r=1}else"top"===a?d=-1:"bottom"===a&&(d=1);return e[(t+d)*n+(i+r)]}function h(e,t){return Boolean(e&&t&&e.value===t.value)}var m={boardSizeX:25,boardSizeY:25,boardSizePx:720},v={cellSizePx:m.boardSizePx/m.boardSizeX},w=Array(m.boardSizeX*m.boardSizeY).fill(null).map(function(e,t){return{value:Math.round(Math.random()),id:t}}),g=f(w,m);var p=function(){var e=n.a.useState(-1),t=Object(d.a)(e,2),i=t[0],a=t[1],o=n.a.useState(-1),r=Object(d.a)(o,2),c=r[0],u=r[1],s=g[i]||new Set;console.log("startPointNeighbours",s);var S=function(e){var t=+e.target.dataset.cellId;t===i?a(-1):t===c?u(-1):-1===i?a(t):u(t)};return n.a.createElement("div",null,n.a.createElement("div",{id:"board",style:{width:m.boardSizePx,height:m.boardSizePx}},b.a.chunk(w,m.boardSizeY).map(function(e){return n.a.createElement("div",{className:"row",key:e[0].id},e.map(function(e){return n.a.createElement("div",{key:e.id,className:l()("cell",{filled:e.value,startPoint:i===e.id,endPoint:c===e.id,isInNeighbour:s.has(e)}),"data-cell-id":e.id,onClick:S,style:{width:v.cellSizePx,height:v.cellSizePx}},i===e.id||c===e.id||e.id)}))})),n.a.createElement("h1",{className:"result"},-1===i||-1===c?"select start & end points":function(e,t,i,a){var n=f(e,a)[t],o=e[i];return n.has(o.id)}(w,i,c,m)?"path exists":"no path"))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},6:function(e,t,i){e.exports=i(15)}},[[6,1,2]]]);
//# sourceMappingURL=main.85f8a85f.chunk.js.map