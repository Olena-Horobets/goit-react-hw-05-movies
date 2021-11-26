(this["webpackJsonpgoit-react-hw-05-movies"]=this["webpackJsonpgoit-react-hw-05-movies"]||[]).push([[4],{53:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"c",(function(){return c})),a.d(t,"b",(function(){return i})),a.d(t,"d",(function(){return r}));var n="https://api.themoviedb.org/3/",c="6f7abc44fc4837d6e8737cb8523ac04e",i="https://image.tmdb.org/t/p/w342",r={IDLE:"idle",PENDING:"pending",RESOLVED:"resolved",REJECTED:"rejected"}},54:function(e,t,a){"use strict";a.d(t,"e",(function(){return l})),a.d(t,"b",(function(){return u})),a.d(t,"a",(function(){return d})),a.d(t,"c",(function(){return v})),a.d(t,"d",(function(){return b}));var n=a(58),c=a.n(n),i=a(59),r=a(53);function o(){return s.apply(this,arguments)}function s(){return s=Object(i.a)(c.a.mark((function e(){var t,a,n,i=arguments;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=i.length>0&&void 0!==i[0]?i[0]:"",a=i.length>1&&void 0!==i[1]?i[1]:{},e.next=4,fetch(t,a);case 4:if(200!==(n=e.sent).status){e.next=11;break}return e.next=8,n.json();case 8:e.t0=e.sent,e.next=12;break;case 11:e.t0=Promise.reject(new Error("Not found"));case 12:return e.abrupt("return",e.t0);case 13:case"end":return e.stop()}}),e)}))),s.apply(this,arguments)}function l(e){var t=e.period;return o("".concat(r.a,"trending/all/").concat(t,"?api_key=").concat(r.c))}function u(e){var t=e.query;return o("".concat(r.a,"search/movie?api_key=").concat(r.c,"&language=en-US&page=1&include_adult=false&query=").concat(t))}function d(e){var t=e.movieId;return o("".concat(r.a,"movie/").concat(t,"?api_key=").concat(r.c,"&language=en-US"))}function v(e){var t=e.movieId;return o("".concat(r.a,"movie/").concat(t,"/credits?api_key=").concat(r.c,"&language=en-US"))}function b(e){var t=e.movieId;return o("".concat(r.a,"movie/").concat(t,"/reviews?api_key=").concat(r.c,"&language=en-US&page=1"))}},55:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return r}));var n=a(60),c=a.n(n),i=function(e){return c()("".concat(e.title||e.name," ").concat(e.id),{lower:!0,strict:!0})},r=function(e){return e.match(/[a-zA-Z0-9]+$/)[0]}},56:function(e,t,a){"use strict";t.a=a.p+"static/media/fallbackPhoto.a42b9e03.jpg"},66:function(e,t,a){e.exports={movieCard:"MovieDetailsPage_movieCard__37NZ1",btn:"MovieDetailsPage_btn__ogNFA",backBtn:"MovieDetailsPage_backBtn__1jgnQ MovieDetailsPage_btn__ogNFA",wrapper:"MovieDetailsPage_wrapper__25lPT",movieImage:"MovieDetailsPage_movieImage__117Jb",overview:"MovieDetailsPage_overview__pBMlV",genres:"MovieDetailsPage_genres__1d0TG",genresItem:"MovieDetailsPage_genresItem__2PnJL",rating:"MovieDetailsPage_rating__1Cnpf",ratingNumber:"MovieDetailsPage_ratingNumber__F-peX",additional:"MovieDetailsPage_additional__3imIk",castBtn:"MovieDetailsPage_castBtn__3Ymnf MovieDetailsPage_btn__ogNFA",reviewsBtn:"MovieDetailsPage_reviewsBtn__3kqM7 MovieDetailsPage_btn__ogNFA",activeBtn:"MovieDetailsPage_activeBtn__1lNpy",infoWrapper:"MovieDetailsPage_infoWrapper__3PxD6"}},72:function(e,t,a){"use strict";a.r(t);var n=a(57),c=a(66),i=a.n(c),r=a(56),o=a(0),s=a(1),l=a(10),u=a(54),d=a(55),v=a(53),b=a(16),g=a(2),j=Object(o.lazy)((function(){return a.e(1).then(a.bind(null,67))})),_=Object(o.lazy)((function(){return a.e(6).then(a.bind(null,69))}));t.default=function(){var e,t,a,c=Object(s.h)(),f=Object(s.g)(),m=null===c||void 0===c||null===(e=c.state)||void 0===e?void 0:e.from,p=null===c||void 0===c||null===(t=c.state)||void 0===t?void 0:t.keyWord,h=Object(s.j)(),O=h.url,x=h.path,D=Object(s.i)().slug,N=Object(d.b)(D),P=Object(o.useState)(v.d.IDLE),k=Object(n.a)(P,2),E=k[0],w=k[1],M=Object(o.useState)({}),y=Object(n.a)(M,2),I=y[0],B=y[1];return Object(o.useEffect)((function(){Object(u.a)({movieId:N}).then((function(e){return B(e)}),w(v.d.RESOLVED)).catch((function(e){return w(v.d.REJECTED)}))}),[N]),E===v.d.RESOLVED?Object(g.jsxs)("div",{className:i.a.movieCard,children:[m&&Object(g.jsx)("button",{className:i.a.backBtn,type:"button",onClick:function(e){f.push(m)},children:"back to ".concat(p)}),Object(g.jsx)("h2",{className:"title",children:I.title}),Object(g.jsxs)("div",{className:i.a.wrapper,children:[Object(g.jsx)("img",{className:i.a.movieImage,src:I.poster_path?"".concat(v.b).concat(I.poster_path):"".concat(r.a),alt:I.title}),Object(g.jsxs)("div",{className:i.a.overview,children:[Object(g.jsx)("p",{children:I.overview}),I.genres&&Object(g.jsx)("ul",{className:i.a.genres,children:I.genres.map((function(e){return Object(g.jsx)("li",{className:i.a.genresItem,children:e.name},e.name)}))}),I.vote_average>0&&Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("h3",{children:"Movie rating:"}),Object(g.jsx)("div",{className:i.a.rating,style:{background:"conic-gradient(".concat((a=I.vote_average,"#ff4c29 0deg ".concat(36*a,"deg, #ffffff77 ").concat(36*a,"deg 0deg")),")")},children:Object(g.jsx)("p",{className:i.a.ratingNumber,children:"".concat(10*I.vote_average," %")})})]})]}),Object(g.jsxs)("div",{className:i.a.additional,children:[Object(g.jsx)(l.c,{to:{pathname:"".concat(O,"/cast"),state:{from:m,keyWord:p}},className:i.a.castBtn,activeClassName:i.a.activeBtn,children:"CAST"}),Object(g.jsx)(l.c,{to:{pathname:"".concat(O,"/reviews"),state:{from:m,keyWord:p}},className:i.a.reviewsBtn,activeClassName:i.a.activeBtn,children:"REVIEWS"}),Object(g.jsx)("div",{className:i.a.infoWrapper,children:Object(g.jsx)(o.Suspense,{fallback:b.a,children:Object(g.jsxs)(s.d,{children:[Object(g.jsx)(s.b,{path:"".concat(x,"/cast"),children:I&&Object(g.jsx)(j,{})}),Object(g.jsx)(s.b,{path:"".concat(x,"/reviews"),children:I&&Object(g.jsx)(_,{})})]})})})]})]})]}):E===v.d.IDLE?Object(g.jsx)("p",{children:"enter something"}):E===v.d.REJECTED?Object(g.jsx)("div",{className:"errorImage"}):void 0}}}]);
//# sourceMappingURL=movie-details-page.45837eee.chunk.js.map