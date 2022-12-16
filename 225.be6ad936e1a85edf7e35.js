"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[225],{5144:function(e,t,r){r.d(t,{V:function(){return n},Z:function(){return a}});var n=new Intl.NumberFormat("ru",{style:"currency",currency:"RUB",maximumFractionDigits:2}),a=new Intl.NumberFormat("ru",{style:"percent",maximumFractionDigits:2,minimumFractionDigits:2})},5764:function(e,t,r){r.d(t,{K:function(){return i}});var n=r(7378);function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,a,o=[],i=!0,u=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){u=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(u)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var i=function(e){var t=a((0,n.useState)(0),2),r=t[0],o=t[1],i=new IntersectionObserver((function(e){var t=e[0];t.isIntersecting||(t.target.scrollIntoView({behavior:"smooth"}),i.unobserve(t.target))}));return(0,n.useEffect)((function(){setTimeout((function(){if(0!==r){var t=document.getElementById(e);t&&i.observe(t)}}),100)}),[r]),o}},3991:function(e,t,r){r.d(t,{Z:function(){return l}});var n=r(7378);function a(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||i(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,a,o=[],i=!0,u=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){u=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(u)throw a}}return o}(e,t)||i(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){if(e){if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(e,t):void 0}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var l=function(e){var t=o((0,n.useState)(!0),2),r=t[0],i=t[1],u=a(e).map((function(e){return Object.assign({},e)}));return{byNumber:function(e){return i(!r),function(e,t,r){return t?e.sort((function(e,t){return+e[r]-+t[r]})):e.sort((function(e,t){return+t[r]-+e[r]}))}(u,r,e)},byString:function(e){return i(!r),function(e,t,r){return t?e.sort((function(e,t){return console.log(e,t),e[r].toString().localeCompare(t[r].toString())})):e.sort((function(e,t){return t[r].toString().localeCompare(e[r].toString())}))}(u,r,e)},sortOrder:r}}},2152:function(e,t,r){r.d(t,{O:function(){return i}});var n=r(7378);function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,a,o=[],i=!0,u=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){u=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(u)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var i=function(e){var t=a((0,n.useState)(e),2),r=t[0],o=t[1];return[r,function(){return o(!r)}]}},1225:function(e,t,r){r.r(t),r.d(t,{Filter:function(){return O},FilterDate:function(){return je},FilterSelect:function(){return D},InvoiceTable:function(){return _},Invoices:function(){return P},SelectRate:function(){return Se},SelectRateCell:function(){return U},TableContent:function(){return ue},TableHeader:function(){return me},TableSummary:function(){return ye},Tabs:function(){return ge},TotalSummary:function(){return we},VatRateButtons:function(){return ke},default:function(){return s}});var n=r(6538),a=r(7581),o=r(2321),i=r(7378),u=r(9248),l=r(1320);function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,a,o=[],i=!0,u=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){u=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(u)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return f(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var s=function(){var e=(0,a.i)((function(e){return e.invoiceSlice})).summary,t=(0,u.ls)(),r=t.sales,f=t.purches,s=t.recieved,m=t.issued,d=c((0,i.useState)(0),2),y=d[0],v=d[1];return i.createElement(i.Fragment,null,i.createElement(n.Z,{sx:{borderBottom:1,borderColor:"divider"}},i.createElement(ge,{value:y,handleChange:function(e,t){return v(t)}}),i.createElement(we,{nds:e.nds})),i.createElement(o.Z,{value:y,index:0},i.createElement(P,{textInfo1:l.xn.Sale,textInfo2:l.RY.Sale,invoices:r,clientType:l.w3.Buyer,summ:e.sales.summ,nds:e.sales.nds})),i.createElement(o.Z,{value:y,index:1},i.createElement(P,{textInfo1:l.xn.Purchase,textInfo2:l.RY.Purchase,invoices:f,clientType:l.w3.Seller,summ:e.purches.summ,nds:e.purches.nds})),i.createElement(o.Z,{value:y,index:2},i.createElement(P,{textInfo1:l.xn.Received,textInfo2:l.RY.Received,invoices:s,clientType:l.w3.Buyer,summ:e.recieved.summ,nds:e.recieved.nds})),i.createElement(o.Z,{value:y,index:3},i.createElement(P,{textInfo1:l.xn.Issued,textInfo2:l.RY.Issued,invoices:m,clientType:l.w3.Seller,summ:e.issued.summ,nds:e.issued.nds})))},m=r(9827),d=r(2152);function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,a,o=[],i=!0,u=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){u=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(u)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return v(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return v(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var p=r(4260),h=r(1011),b=r(6474),g=r(1942);function E(e){return function(e){if(Array.isArray(e))return S(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return S(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return S(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var w=function(e,t,r){return E(e).filter((function(e){var n=e.date;return n>=t&&n<=r}))};function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,a,o=[],i=!0,u=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){u=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(u)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Z(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Z(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Z(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var I=r(5144),A=r(8544);function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,a,o=[],i=!0,u=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){u=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(u)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return j(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return j(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var O=function(e){var t,r,a,o,u=e.invoices,c=e.setFiltered,f=C((0,d.O)(!1),2)[1],s=C((0,d.O)(!1),2)[1],v=C((t="more",r=y((0,i.useState)(t),2),a=r[0],o=r[1],[a,function(e){var t=e.target.value;o(t)}]),2),E=v[0],S=v[1],w=function(){var e=x((0,i.useState)("client"),2),t=e[0],r=e[1],n=x((0,i.useState)("string"),2),a=n[0],o=n[1];return[t,function(e){var t=e.target.value;r(t),"summ"===t&&o("number"),"date"===t&&o("date"),"client"===t&&o("string")},a]}(),Z=C(w,3),I=Z[0],A=Z[1],j=Z[2],O=(0,m.e)(),T="string"===j?function(e){var t=e.target.value;c(function(e,t,r){var n=new RegExp(e,"g");return t.filter((function(e){return-1!==e[r].toString().toLowerCase().search(n)}))}(t,u,I))}:function(e){var t=+e.target.value;c(function(e,t,r){if(0===e)return t;switch(r){case"more":return t.filter((function(t){return+t.summ>e}));case"less":return t.filter((function(t){return+t.summ<e}));case"equal":return t.filter((function(t){return+t.summ===e}));default:return t.filter((function(t){return t.summ===e}))}}(t,u,E))};return i.createElement(i.Fragment,null,i.createElement(n.Z,{sx:{display:"flex",direction:"row",justifyContent:"center",alignItems:"center",height:30,mb:3}},i.createElement(p.Z,{sx:{color:"#2477CC"}},i.createElement(h.Z,null,"Фильтр по:")),i.createElement(D,{onClick:f,onChange:A,value:I,items:l.I2}),"summ"===I&&i.createElement(D,{onClick:s,onChange:S,value:E,items:l.oj}),"date"===I?i.createElement(je,{invoices:u,setFiltered:c}):i.createElement(b.Z,{size:"small",sx:{ml:3},label:"Фильтр",variant:"standard",onChange:T,type:j}),i.createElement(g.Z,{variant:"outlined",sx:{ml:3},onClick:function(){O("info","Результат фильтрации сброшен!"),c(u)}},"Сброс")))},T=r(5957),k=r(6630),D=function(e){var t=e.onClick,r=e.onChange,n=e.value,a=e.items;return i.createElement(T.Z,{size:"small",onClick:t,value:n,onChange:r,sx:{width:150,ml:2}},a.map((function(e,t){return i.createElement(k.Z,{key:t,value:e.value},e.name)})))},F=r(6970);function M(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,a,o=[],i=!0,u=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){u=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(u)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return R(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return R(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function R(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var U=function(e){var t,r=e.children,a=e.index,o=e.getSelectValue,u=M((0,i.useState)(!1),2),l=u[0],c=u[1],f=function(){return c(!l)},s=-1===(t=r)?"mix":I.Z.format(t);return i.createElement(i.Fragment,null,l?i.createElement(F.Z,{variant:"body",align:"center"},i.createElement(n.Z,{sx:{display:"flex",justifyContent:"center",alignItmes:"center"}},i.createElement(Se,{value:r.toString(),width:120,onChange:function(e){return o(e.target.value,a)}}),i.createElement(ke,{handleSwitchInput:f}))):i.createElement(F.Z,{variant:"body",onClick:f,align:"center",sx:{"&:hover":{cursor:"pointer"}}},s))},Y=r(8973),$=r(9119),P=function(e){var t=e.textInfo1,r=e.textInfo2,n=e.invoices,a=e.clientType,o=e.summ,u=e.nds;return i.createElement(Y.Z,{maxWidth:"xl"},i.createElement(ye,{textInfo:r,summ:o,nds:u}),i.createElement($.Z,{sx:{marginY:2,color:"#2477CC"}}),i.createElement(_,{invoices:n,clientType:a,table:t}))},z=r(4776),V=r(5283),L=r(8767),N=r(1413),B=r(7239),K=r(3866),H=r(7975),J=r(5764);function W(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,a,o=[],i=!0,u=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){u=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(u)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return q(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return q(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function q(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var _=function(e){var t=e.invoices,r=e.clientType,o=e.table,u="dark"===(0,z.Z)().palette.mode?10:1,l=(0,a.z)(),c=W((0,i.useState)(t||[]),2),f=c[0],s=c[1],m=(0,J.K)("lastRow");return(0,i.useEffect)((function(){s(t)}),[t]),i.createElement(i.Fragment,null,i.createElement(V.Z,{direction:"row",spacing:2},i.createElement(n.Z,{sx:{width:1}},i.createElement(O,{invoices:t,setFiltered:s}),i.createElement(L.Z,{component:"div",sx:{width:"100%",overflowY:"auto",overflowX:"hidden"},elevation:u},i.createElement(N.Z,{sx:{maxHeight:570}},i.createElement(B.Z,{stickyHeader:!0,size:"small","aria-label":"a dense table",id:"InvoiceTable"},i.createElement(me,{clientType:r,filtered:f,table:o}),i.createElement(ue,{filtered:f,table:o})),i.createElement(K.Z,{createItem:function(){m(Math.random()),l((0,A.SA)(H.sb,o))},deleteItem:function(){return l((0,A.M5)(o))}}))))))},X=r(2587),G=r(1903),Q=r(493),ee=r(3783),te=r(6391);function re(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,a,o=[],i=!0,u=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){u=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(u)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return ne(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return ne(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ne(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var ae=function(e){var t=e.children,r=e.index,n=e.getDate,a=e.width,o=void 0===a?150:a,u=re((0,i.useState)(!1),2),l=u[0],c=u[1],f=re((0,i.useState)(),2),s=f[0],m=f[1],d=re((0,i.useState)(!1),2),y=d[0],v=d[1],p=function(){m(t),c(!l)},b=(0,i.useMemo)((function(){return(0,ee.yW)(+t)}),[t]),g=(0,i.useMemo)((function(){return(0,ee.UL)(b)}),[b]);return i.createElement(i.Fragment,null,l?i.createElement(F.Z,{variant:"body",align:"center",sx:{padding:.5,width:o},"data-testid":"DateCell"},i.createElement(te.Z,{value:b,onChange:function(e){if("Invalid Date"!==(null==e?void 0:e.format())&&void 0!==(null==e?void 0:e.format())){var a=e&&Date.parse(e.format());a&&(n(a,r),m(a||t),c(!l),v(!1))}else v(!0)},error:y,focus:l,onKeyDown:function(e){"Escape"===e.code&&(p(),n(s||t,r))},width:100})):i.createElement(F.Z,{variant:"body",onClick:p,align:"center","data-testid":"DateCell",sx:{"&:hover":{cursor:"pointer"},padding:1,width:o}},i.createElement(h.Z,{sx:{margin:.5,height:20}},g)))},oe=r(8101),ie=r(1135),ue=function(e){var t=e.filtered,r=e.table,n=(0,a.z)(),o=function(e){return n((0,A.qK)(e,r))},u=function(e){var t=(0,a.z)(),r=(0,a.i)((function(e){return e.invoiceSlice})),n=(0,m.e)();return{getNDS:function(a,o){var i=+(20*r[e][o].summ/120).toFixed(2);if(+a>i)return n("warning","НДС не может превышать 20% от суммы документа (".concat(I.V.format(i),"})"));t((0,A.aL)({value:a,table:e,index:o,prop:l.IJ.nds}))},getDate:function(r,a){var o=(new Date).getFullYear();if(new Date(r).getFullYear()!==o)return n("warning","Допустима дата в рамках текущего года - ".concat(o));t((0,A.aL)({value:r,table:e,index:a,prop:l.IJ.date}))},getRate:function(r,n){return t((0,A.aL)({value:r,table:e,index:n,prop:l.IJ.rate}))},getSumm:function(r,n){return t((0,A.aL)({value:r,table:e,index:n,prop:l.IJ.summ}))},getNum:function(r,n){return t((0,A.aL)({value:r,table:e,index:n,prop:l.IJ.num}))},getClient:function(r,n){return t((0,A.aL)({value:r,table:e,index:n,prop:l.IJ.client}))}}}(r),c=u.getNDS,f=u.getDate,s=u.getRate,d=u.getSumm,y=u.getNum,v=u.getClient;return i.createElement(i.Fragment,null,i.createElement(X.Z,null,t.map((function(e,t){return i.createElement(G.Z,{key:t},i.createElement(F.Z,{variant:"body"},i.createElement(Q.Z,{size:"small",checked:e.checked,onChange:function(){return n((0,A.Kv)(t,r))}})),i.createElement(oe.Z,{index:t,type:"string",prop:"number",getInputData:y},e.number),i.createElement(ae,{index:t,getDate:f},e.date),i.createElement(oe.Z,{index:t,type:"string",prop:"client",getInputData:v},e.client),i.createElement(U,{index:t,getSelectValue:s},e.rate),i.createElement(oe.Z,{index:t,type:"number",prop:"nds",isMoney:!0,getInputData:c},e.nds),i.createElement(oe.Z,{index:t,type:"number",prop:"summ",isMoney:!0,getInputData:d},e.summ),i.createElement(F.Z,{variant:"body"},i.createElement(ie.Z,{action:o,index:t})))}))))},le=r(3991),ce=r(3949),fe=r(4065),se=r(4313),me=function(e){var t=e.clientType,r=e.filtered,o=e.table,u=(0,a.z)(),c=(0,le.Z)(r),f=c.byNumber,s=c.byString,m=c.sortOrder,d=function(e){return u((0,A.Hu)(s(l.Z.client),o))},y=function(e){return u((0,A.Hu)(f(l.Z.summ),o))};return i.createElement(se.Z,null,i.createElement(G.Z,null,i.createElement(F.Z,{variant:"head",width:50},i.createElement(n.Z,null,m?i.createElement(ce.Z,{sx:{height:15,ml:1}}):i.createElement(fe.Z,{sx:{height:15,ml:1}}))),i.createElement(F.Z,{variant:"head",width:100,sx:{"&:hover":{cursor:"pointer"}},onClick:d,align:"center"},l.SZ.number),i.createElement(F.Z,{variant:"head",width:150,sx:{"&:hover":{cursor:"pointer"}},onClick:function(e){return u((0,A.Hu)(f(l.Z.date),o))},align:"center"},l.SZ.date),i.createElement(F.Z,{variant:"head",width:240,sx:{"&:hover":{cursor:"pointer"}},onClick:d,align:"center"},t),i.createElement(F.Z,{variant:"head",width:140,sx:{"&:hover":{cursor:"pointer"}},onClick:y,align:"center"},l.SZ.rate),i.createElement(F.Z,{variant:"head",width:100,sx:{"&:hover":{cursor:"pointer"}},onClick:y,align:"center"},l.SZ.nds),i.createElement(F.Z,{variant:"head",width:110,sx:{"&:hover":{cursor:"pointer"}},onClick:y,align:"center"},l.SZ.summ),i.createElement(F.Z,{variant:"head",width:60},"Удалить")))},de=r(3546),ye=function(e){var t=e.textInfo,r=e.summ,a=e.nds;return i.createElement(n.Z,{sx:{display:"flex"}},i.createElement(Y.Z,null,i.createElement(V.Z,{sx:{width:1,justifyContent:"center"},direction:"row"},i.createElement(de.Z,{text:t,width:280,textVariant:"body1"},r),i.createElement(de.Z,{text:"НДС",width:260,textVariant:"body1"},a))))},ve=r(6868),pe=r(4547),he=r(6504);function be(){return be=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},be.apply(this,arguments)}var ge=function(e){var t=e.value,r=e.handleChange;return i.createElement(ve.Z,{value:t,onChange:r,"aria-label":"basic tabs example",centered:!0},i.createElement(pe.Z,be({label:l.RY.Sale},(0,he.P)(0))),i.createElement(pe.Z,be({label:l.RY.Purchase},(0,he.P)(1))),i.createElement(pe.Z,be({label:l.RY.Received},(0,he.P)(2))),i.createElement(pe.Z,be({label:l.RY.Issued},(0,he.P)(3))))},Ee=[{value:"0",name:"0%"},{value:"0.1",name:"10%"},{value:"0.2",name:"20%"},{value:"-1",name:"mix"}],Se=function(e){var t=e.value,r=e.width,n=e.onChange;return console.log(t),i.createElement(T.Z,{value:t,onChange:n,sx:{height:31,width:r-35,mr:.5}},Ee&&Ee.map((function(e){return i.createElement(k.Z,{key:e.value,value:e.value.toString()},e.name)})))},we=function(e){var t=e.nds;return i.createElement(n.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"space-around",mb:1,mt:1}},i.createElement(de.Z,{text:"НДС к уплате: ",width:300,textVariant:"h6"},t))};function xe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,a,o=[],i=!0,u=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){u=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(u)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Ze(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Ze(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Ze(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var Ie=Date.now();function Ae(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,a,o=[],i=!0,u=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){u=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(u)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Ce(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Ce(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Ce(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var je=function(e){var t=function(e,t){var r=xe((0,i.useState)(Ie),2),n=r[0],a=r[1],o=xe((0,i.useState)(Ie),2),u=o[0],l=o[1],c=xe((0,i.useState)(!1),2),f=c[0],s=c[1],m=function(e,r,n){var a=e&&Date.parse(e.format());a&&(t(n(a)),r(a))};return[f,function(t){m(t,a,(function(t){var r=(0,ee.pz)(t,u);return s(r),r?w(e,t,u):e}))},function(t){m(t,l,(function(t){var r=(0,ee.pz)(n,t);return s(r),r?w(e,n,t):e}))},n,u]}(e.invoices,e.setFiltered),r=Ae(t,5),n=r[0],a=r[1],o=r[2],u=r[3],l=r[4],c=(0,i.useMemo)((function(){return(0,ee.cA)(u)}),[u]),f=(0,i.useMemo)((function(){return(0,ee.cA)(l)}),[l]);return i.createElement(i.Fragment,null,i.createElement(p.Z,{sx:{ml:2,color:"#2477CC"}},"c:"),i.createElement(te.Z,{value:c,onChange:a,error:!n,width:100}),i.createElement(p.Z,{sx:{ml:2,color:"#2477CC"}},"по:"),i.createElement(te.Z,{value:f,onChange:o,error:!n,width:100}))},Oe=r(3760),Te=r(3820),ke=function(e){var t=e.handleSwitchInput;return i.createElement(Oe.Z,{color:"primary","aria-label":"add",sx:{padding:.4},onClick:t},i.createElement(Te.Z,{color:"success",fontSize:"medium"},"check_circle"))}},6504:function(e,t,r){function n(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}r.d(t,{P:function(){return n}})},6391:function(e,t,r){var n=r(6474),a=r(4442),o=r(7881),i=r(8902),u=r(7378);function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},l.apply(this,arguments)}t.Z=function(e){var t=e.value,r=e.onChange,c=e.error,f=e.focus,s=e.onKeyDown,m=e.width;return u.createElement(u.Fragment,null,u.createElement(a._,{dateAdapter:i.Z},u.createElement(o.$,{inputFormat:"DD.MM.YYYY",value:t,onChange:r,renderInput:function(e){return u.createElement(n.Z,l({},e,{sx:{"& .MuiInputBase-input":{height:20,padding:.5,margin:.5,width:m||150}},autoFocus:f||!1,onKeyDown:s,error:c}))}})))}},8101:function(e,t,r){r.d(t,{Z:function(){return f}});var n=r(7378),a=r(5144),o=r(6970),i=r(3355),u=r(1011);function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,a,o=[],i=!0,u=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){u=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(u)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return c(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return c(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var f=function(e){var t=e.children,r=e.index,c=e.type,f=e.prop,s=e.isMoney,m=e.step,d=e.getInputData,y=e.ml,v=void 0===y?0:y,p=e.mr,h=void 0===p?0:p,b=l((0,n.useState)(!1),2),g=b[0],E=b[1],S=l((0,n.useState)(),2),w=S[0],x=S[1],Z=l((0,n.useState)(),2),I=Z[0],A=Z[1],C=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,r=(0,n.useRef)(),a=(0,n.useCallback)((function(n,a,o){r.current&&clearTimeout(r.current),r.current=setTimeout((function(){e(n,a,o)}),t)}),[e,t]);return a}(d),j=function(){x(t),E(!g),A(t)},O=s?a.V.format(+t):t;return(0,n.useEffect)((function(){d(w||t,r,f)}),[t]),n.createElement(n.Fragment,null,g?n.createElement(o.Z,{variant:"body",align:"center",sx:{ml:v,mr:h}},n.createElement(i.Z,{autoFocus:g,onChange:function(e){var t=e.target.value;A(t),C(I,r,f)},onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code){var t=e.target.value;E(!1),x(t),d(t,r,f)}"Escape"===e.code&&(j(),d(w||1,r,f))},onBlur:j,onFocus:function(e){return e.target.select()},value:I,type:c,inputProps:{step:m||.01,min:0}})):n.createElement(o.Z,{variant:"body",onClick:j,align:"center",sx:{"&:hover":{cursor:"pointer",ml:v,mr:h}}},n.createElement(u.Z,null,O)))}},3866:function(e,t,r){var n=r(8973),a=r(3298),o=r(1942),i=r(7378),u=r(6655),l=r(2976),c=i.memo((function(e){var t=e.createItem,r=e.deleteItem;return i.createElement(n.Z,{component:"div",sx:{"& > :not(style)":{m:1},display:"flex",justifyContent:"space-between"}},i.createElement(a.Z,{onClick:t,color:"secondary","aria-label":"add",size:"small"},i.createElement(l.Z,null)),i.createElement(o.Z,{onClick:r,variant:"outlined",startIcon:i.createElement(u.Z,null),id:"lastRow"},"Удалить отмеченные"))}));t.Z=c},1135:function(e,t,r){var n=r(6655),a=r(3760),o=r(7378);t.Z=function(e){var t=e.action,r=e.index;return o.createElement(a.Z,{sx:{ml:1},onClick:function(){return t(r)},"aria-label":"delete"},o.createElement(n.Z,null))}},3546:function(e,t,r){var n=r(6538),a=r(8767),o=r(1011),i=r(7378),u=r(5144),l=i.memo((function(e){var t=e.children,r=e.text,l=e.width,c=e.textVariant,f=e.direction,s=f||"row";return i.createElement(n.Z,{sx:{display:"flex",justifyContent:"center",flexWrap:"wrap",marginLeft:2}},i.createElement(a.Z,{elevation:0,sx:{width:l,display:"flex",justifyContent:"space-around",flexDirection:{flexDirection:s},alignItems:"center",padding:.1}},i.createElement(o.Z,{variant:"body1"},r),i.createElement(o.Z,{variant:c},u.V.format(t))))}));t.Z=l},2321:function(e,t,r){var n=r(6538),a=r(7378),o=["children","value","index"];function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i.apply(this,arguments)}function u(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}t.Z=function(e){var t=e.children,r=e.value,l=e.index,c=u(e,o);return a.createElement("div",i({role:"tabpanel",hidden:r!==l,id:"simple-tabpanel-".concat(l),"aria-labelledby":"simple-tab-".concat(l)},c),r===l&&a.createElement(n.Z,{sx:{p:2}},t))}}}]);