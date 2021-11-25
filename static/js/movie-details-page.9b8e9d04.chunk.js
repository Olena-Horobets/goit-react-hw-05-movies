(this["webpackJsonpgoit-react-hw-05-movies"]=this["webpackJsonpgoit-react-hw-05-movies"]||[]).push([[3],{52:function(t,e,c){"use strict";c.d(e,"a",(function(){return n})),c.d(e,"c",(function(){return r})),c.d(e,"b",(function(){return a})),c.d(e,"d",(function(){return i}));var n="https://api.themoviedb.org/3/",r="6f7abc44fc4837d6e8737cb8523ac04e",a="https://image.tmdb.org/t/p/w342",i={IDLE:"idle",PENDING:"pending",RESOLVED:"resolved",REJECTED:"rejected"}},53:function(t,e,c){"use strict";c.d(e,"e",(function(){return s})),c.d(e,"b",(function(){return d})),c.d(e,"a",(function(){return j})),c.d(e,"c",(function(){return b})),c.d(e,"d",(function(){return l}));var n=c(56),r=c.n(n),a=c(57),i=c(52);function o(){return u.apply(this,arguments)}function u(){return u=Object(a.a)(r.a.mark((function t(){var e,c,n,a=arguments;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=a.length>0&&void 0!==a[0]?a[0]:"",c=a.length>1&&void 0!==a[1]?a[1]:{},t.next=4,fetch(e,c);case 4:if(200!==(n=t.sent).status){t.next=11;break}return t.next=8,n.json();case 8:t.t0=t.sent,t.next=12;break;case 11:t.t0=Promise.reject(new Error("Not found"));case 12:return t.abrupt("return",t.t0);case 13:case"end":return t.stop()}}),t)}))),u.apply(this,arguments)}function s(t){var e=t.period;return o("".concat(i.a,"trending/all/").concat(e,"?api_key=").concat(i.c))}function d(t){var e=t.query;return o("".concat(i.a,"search/movie?api_key=").concat(i.c,"&language=en-US&page=1&include_adult=false&query=").concat(e))}function j(t){var e=t.movieId;return o("".concat(i.a,"movie/").concat(e,"?api_key=").concat(i.c,"&language=en-US"))}function b(t){var e=t.movieId;return o("".concat(i.a,"movie/").concat(e,"/credits?api_key=").concat(i.c,"&language=en-US"))}function l(t){var e=t.movieId;return o("".concat(i.a,"movie/").concat(e,"/reviews?api_key=").concat(i.c,"&language=en-US&page=1"))}},54:function(t,e,c){"use strict";c.d(e,"a",(function(){return a})),c.d(e,"b",(function(){return i}));var n=c(58),r=c.n(n),a=function(t){return r()("".concat(t.title||t.name," ").concat(t.id),{lower:!0,strict:!0})},i=function(t){return t.match(/[a-zA-Z0-9]+$/)[0]}},65:function(t,e,c){"use strict";c.r(e);var n=c(55),r=c(0),a=c(1),i=c(10),o=c(53),u=c(54),s=c(52),d=c(2);var j=function(){var t=Object(a.i)().slug,e=Object(u.b)(t),c=Object(r.useState)([]),i=Object(n.a)(c,2),s=i[0],j=i[1];return Object(r.useEffect)((function(){Object(o.c)({movieId:e}).then((function(t){return j(t.cast)})).catch((function(t){return console.log(t)}))}),[e]),Object(d.jsxs)("div",{className:"movieCard",children:[Object(d.jsx)("h3",{children:"CAST"}),s&&Object(d.jsx)("ul",{children:s.map((function(t){return Object(d.jsx)("li",{children:t.name},t.id)}))})]})};var b=function(){var t=Object(a.i)().slug,e=Object(u.b)(t),c=Object(r.useState)([]),i=Object(n.a)(c,2),s=i[0],j=i[1];return Object(r.useEffect)((function(){Object(o.d)({movieId:e}).then((function(t){return j(t.results)})).catch((function(t){return console.log(t)}))}),[e]),Object(d.jsxs)("div",{className:"movieCard",children:[Object(d.jsx)("h3",{children:"Reviews"}),s&&s.length?Object(d.jsx)("ul",{children:s.map((function(t){return Object(d.jsxs)("li",{children:[Object(d.jsx)("h4",{children:t.author}),Object(d.jsx)("p",{children:t.content})]},t.id)}))}):Object(d.jsx)("p",{children:"no reviews"})]})};e.default=function(){var t,e=Object(a.h)(),c=Object(a.g)(),l=null===e||void 0===e||null===(t=e.state)||void 0===t?void 0:t.from,f=Object(a.j)(),h=f.url,O=f.path,v=Object(a.i)().slug,p=Object(u.b)(v),m=Object(r.useState)(s.d.IDLE),g=Object(n.a)(m,2),x=g[0],E=g[1],k=Object(r.useState)({}),w=Object(n.a)(k,2),I=w[0],S=w[1];return Object(r.useEffect)((function(){Object(o.a)({movieId:p}).then((function(t){return S(t)}),E(s.d.RESOLVED)).catch((function(t){return E(s.d.REJECTED)}))}),[p]),x===s.d.RESOLVED?Object(d.jsxs)("div",{className:"movieCard",children:[Object(d.jsxs)("h1",{style:{color:"darkviolet"},children:["MOVIE TITLE: ",I.title]}),l&&Object(d.jsx)("button",{type:"button",onClick:function(t){c.push(l)},children:"back"}),Object(d.jsx)("img",{src:I.poster_path?"".concat(s.b).concat(I.poster_path):"../../images/fallback-photo.jpg",alt:I.title}),Object(d.jsx)(i.c,{to:{pathname:"".concat(h,"/cast"),state:{from:l}},children:"CAST"})," ",Object(d.jsx)(i.c,{to:{pathname:"".concat(h,"/reviews"),state:{from:l}},children:"REVIEWS"}),Object(d.jsxs)(a.d,{children:[Object(d.jsx)(a.b,{path:"".concat(O,"/cast"),children:I&&Object(d.jsx)(j,{})}),Object(d.jsx)(a.b,{path:"".concat(O,"/reviews"),children:I&&Object(d.jsx)(b,{})})]})]}):x===s.d.IDLE?Object(d.jsx)("p",{children:"enter something"}):x===s.d.REJECTED?Object(d.jsx)("div",{className:"errorImage"}):void 0}}}]);
//# sourceMappingURL=movie-details-page.9b8e9d04.chunk.js.map