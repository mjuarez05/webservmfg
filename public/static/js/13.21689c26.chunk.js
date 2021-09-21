(this.webpackJsonpclient_src=this.webpackJsonpclient_src||[]).push([[13],{378:function(e,t,a){"use strict";a.r(t);var s=a(112),r=a(12),n=a(2),o=a(3),i=a(28),c=a(5),l=a(4),d=a(0),p=a(23),h=a(9),u=a(47),m=a(111),x=a(61),g=a(497),f=a(656),j=a.n(f),b=a(469),O=(a(442),a(372)),v=a(10),w=a(113),S=a(20),T=a(461),C=a.n(T),I=a(657),R=a.n(I),D=a(1),y=function(e){return[{Header:e("transacciones.title"),foldable:!0,columns:[{Header:"ID",accessor:"id"},{Header:e("transacciones.nombre"),accessor:"name",Cell:function(e){return Object(D.jsx)("span",{className:"number",children:e.value})}},{accessor:"trx",Header:e("transacciones.trx")},{accessor:"icon",Header:e("transacciones.icono"),filterable:!1,sorteable:!1,Cell:function(e){return Object(D.jsx)(S.Icon,{name:e.original.icon})}},{accessor:"component",Header:e("transacciones.componente")},{accessor:"menuId",Header:e("transacciones.grupo")},{Header:"",filterable:!1,sorteable:!1,width:40,Cell:function(t){return Object(D.jsx)("button",{className:j.a.eliminar,alt:e("general.eliminar"),children:Object(D.jsx)(S.Icon,{name:"close"})})}}]}]},H=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(e){var o;return Object(n.a)(this,a),(o=t.call(this,e)).getData=function(){var e=Object(i.a)(o);Object(x.i)().then((function(t){e.setState({transacciones:t.data}),""!==o.state.trx.id&&o.getTRXRoles(o.state.trx.id)})).catch((function(t){console.error(t.response),401===t.response.status&&e.setState({ifYouCan:!1})}))},o.getTRXRoles=function(e){var t=Object(i.a)(o);Object(x.j)(e).then((function(e){t.setState({roles:e.data[0].roles}),t.getRoles()})).catch((function(e){console.error(e.response),401===e.response.status&&t.setState({ifYouCan:!1})}))},o.getRoles=function(){var e=Object(i.a)(o);Object(g.e)().then((function(t){var a=o.state.roles;R()(t.data,a,"id"),e.setState({allroles:t.data})})).catch((function(t){console.error(t.response),401===t.response.status&&e.setState({ifYouCan:!1})}))},o.componentDidMount=function(){o.getData()},o.handleInputChange=function(e){var t=Object(r.a)(Object(r.a)({},o.state.trx),{},Object(s.a)({},e.target.name,e.target.value));o.setState({trx:t})},o.handlerSubmit=function(e){o.setState({wait:!0});var t=Object(i.a)(o);e.preventDefault(),"crear"===o.state.mode&&""===o.state.trx.id?Object(x.b)({name:o.state.trx.name,trx:o.state.trx.trx,icon:o.state.trx.icon,component:o.state.trx.component,menuId:o.state.trx.menuId}).then((function(e){o.getData(),o.props.t("transacciones.create"),o.setState({trx:{id:"",name:"",icon:"",trx:"",menuId:"",component:""},mode:"crear",wait:!1,msg:o.props.t("transacciones.creadoOk")})})).catch((function(e){o.setState({wait:!1}),console.error(e.response),t.setState({msg:void 0!==e.response?o.props.t("transacciones."+e.response.data.error.message):o.props.t("transacciones.error")})})):Object(x.c)({name:o.state.trx.name,trx:o.state.trx.trx,icon:o.state.trx.icon,component:o.state.trx.component,id:o.state.trx.id,menuId:o.state.trx.menuId}).then((function(e){o.getData(),o.setState({trx:{id:"",name:"",trx:"",component:"",icon:"",menuId:""},mode:"crear",wait:!1,msg:o.props.t("transacciones.modificadoOk")})})).catch((function(e){o.setState({wait:!1}),console.error(e.response),t.setState({msg:void 0!==e.response?o.props.t("transacciones."+e.response.data.error.code):o.props.t("transacciones.error")})}))},o.handlerClear=function(){o.setState({trx:{id:"",name:"",icon:"",component:"",trx:"",menuId:""},rol:{id:"",name:"",description:"",created:"",modified:""},roles:[],mode:"crear",wait:!1,msg:""})},o.handlerGridAction=function(e,t,a,s){return{onClick:function(e){(o.setState({trx:{id:t.original.id,name:t.original.name,icon:t.original.icon,trx:t.original.trx,menuId:t.original.menuId,component:t.original.component},msg:"",mode:"editar"}),o.getTRXRoles(t.original.id),""===a.Header)&&(!0===window.confirm(o.props.t("general.estaseguro"))?o.handlerDelete(t.original.id):o.handlerClear())}}},o.handlerGridRolesAction=function(e,t,a,s){return{onClick:function(e){(o.setState({rol:{id:t.original.id,name:t.original.name,description:t.original.description,created:t.original.created,modified:t.original.modified},msg:"",mode:"editar"}),""===a.Header)&&(!0===window.confirm(o.props.t("general.estaseguro"))?o.handlerDeleteRol(o.state.trx.id,t.original.id):o.handlerClear())}}},o.handlerAddRole=function(){var e=Object(i.a)(o);Object(x.a)(o.state.trx.id,o.state.rolSelected).then((function(e){o.getData(),o.setState({msg:o.props.t("transacciones.roleAdded")})})).catch((function(t){console.error(t.response),e.setState({msg:void 0!==t.response?o.props.t("transacciones."+t.response.data.error.code):o.props.t("transacciones.error")})}))},o.handlerGoAddRoles=function(){o.setState((function(e){return{msg:"",ifYouAddRole:!e.ifYouAddRole}}))},o.handlerSelectChange=function(e){o.setState({rolSelected:e.target.value})},o.handlerDeleteRol=function(e,t){var a=Object(i.a)(o);Object(x.f)(e,t).then((function(e){Object(x.l)(e.data[0].id).then((function(){o.getData(),o.setState({msg:o.props.t("usuarios.roleDeleted")})})).catch((function(e){console.error(e.response),a.setState({msg:void 0!==e.response?o.props.t("usuarios."+e.response.data.error.code):o.props.t("usuarios.error")})}))}))},o.handlerDelete=function(e){var t=Object(i.a)(o);Object(x.d)(e).then((function(e){o.handlerClear(),o.getData(),o.setState({msg:o.props.t("transacciones.eliminadoOK")})})).catch((function(e){console.error(e.response),t.setState({msg:void 0!==e.response?o.props.t("transacciones."+e.response.data.error.code):o.props.t("transacciones.error")})}))},o._columns=y,o.state={trx:{id:"",trx:"",name:"",icon:"",component:"",menuId:""},rol:{id:"",name:"",description:"",created:"",modified:""},roles:[],allroles:[],rolSelected:"",ifYouCan:!0,ifYouAddRole:!1,transacciones:[],msg:"",mode:"crear",wait:!1},o}return Object(o.a)(a,[{key:"render",value:function(){return this.state.ifYouCan?this.state.ifYouAddRole?Object(D.jsxs)(p.a,{direction:"columns",padding:"0",margin:"0",wrap:"wrap",children:[Object(D.jsx)(h.a,{height:"100%",padding:"0",width:"25%",auto:!0,children:Object(D.jsxs)(p.a,{direction:"column",padding:"0",margin:"0",wrap:"nowrap",round:"3px",children:[Object(D.jsx)("div",{className:j.a.title,children:Object(D.jsx)("h3",{children:this.props.t("transacciones.addrole",{role:this.state.trx.name})})}),Object(D.jsx)("div",{className:j.a.icon,children:Object(D.jsxs)("span",{className:"fa-stack fa-lg",children:[Object(D.jsx)("i",{className:"fa fa-circle fa-stack-2x fa-inverse "+j.a.shadow}),Object(D.jsx)("i",{className:"fa fa-rocket fa-stack-1x "})]})}),Object(D.jsxs)("div",{className:"padding-default",children:[Object(D.jsx)(w.a,{id:"RolesToTrx",items:this.state.allroles,itemId:"id",itemText:"name",onSelect:this.handlerSelectChange}),Object(D.jsx)(m.a,{visible:"editar"===this.state.mode,type:"outline",loading:this.state.wait,disabled:this.state.wait,text:this.props.t("general.volver"),id:"volverToTxr",icon:"arrow-left",width:"100%",classes:j.a.btn,onPress:this.handlerGoAddRoles}),Object(D.jsx)(m.a,{visible:!0,loading:this.state.wait,disabled:""===this.state.rolSelected,text:this.props.t("transacciones.addrole"),styleType:"success",id:"addRoleToTRX",icon:"shield",width:"100%",classes:j.a.btn,onPress:this.handlerAddRole}),Object(D.jsx)("br",{}),Object(D.jsx)("div",{className:"center",children:this.state.msg})]}),Object(D.jsx)("div",{className:"center",children:this.state.msgPermisos})]})}),Object(D.jsx)(h.a,{height:"100%",padding:"0",width:"74%",auto:!0,children:Object(D.jsx)(b.a,{className:"-striped -highlight",data:this.state.roles,columns:(e=this.props.t,[{Header:e("roles.roles"),foldable:!0,columns:[{Header:"ID",accessor:"id",show:!1},{Header:e("roles.name"),accessor:"name"},{accessor:"description",Header:e("roles.description")},{accessor:"created",Header:e("roles.created"),show:!1,Cell:function(e){return Object(D.jsx)(C.a,{locale:localStorage.getItem("i18nextLng"),format:"DD-MM-YYYY HH:mm",children:e.original.created})}},{accessor:"modified",Header:e("roles.modified"),show:!1,Cell:function(e){return Object(D.jsx)(C.a,{locale:localStorage.getItem("i18nextLng"),format:"DD-MM-YYYY HH:mm",children:e.original.modified})}},{Header:"",filterable:!1,sortable:!1,width:40,Cell:function(t){return Object(D.jsx)("button",{className:j.a.eliminar,alt:e("general.eliminar"),children:Object(D.jsx)(S.Icon,{name:"close"})})}}]}]),sortable:!0,multiSort:!0,resizable:!0,filterable:!0,defaultPageSize:5,getTdProps:this.handlerGridRolesAction,previousText:this.props.t("general.previous"),nextText:this.props.t("general.next"),loadingText:this.props.t("general.loading"),noDataText:this.props.t("general.norowsfound"),pageText:this.props.t("general.page"),ofText:this.props.t("general.of"),rowsText:this.props.t("general.rows")})})]}):Object(D.jsxs)(p.a,{direction:"columns",padding:"0",margin:"0",wrap:"wrap",children:[Object(D.jsx)(h.a,{height:"100%",padding:"0",width:"25%",auto:!0,children:Object(D.jsxs)(p.a,{direction:"column",padding:"0",margin:"0",wrap:"nowrap",round:"3px",children:[Object(D.jsx)("div",{className:j.a.title,children:Object(D.jsx)("h3",{children:"crear"===this.state.mode?this.props.t("transacciones.newTRX"):this.props.t("transacciones.modificarTRX",{trx:this.state.trx.name})})}),Object(D.jsx)("div",{className:j.a.icon,children:Object(D.jsxs)("span",{className:"fa-stack fa-lg",children:[Object(D.jsx)("i",{className:"fa fa-circle fa-stack-2x fa-inverse "+j.a.shadow}),Object(D.jsx)("i",{className:"fa fa-rocket fa-stack-1x "})]})}),Object(D.jsxs)("div",{className:"padding-default",children:[Object(D.jsx)(u.a,{id:"name",type:"text",label:this.props.t("transacciones.nombre"),placeholder:this.props.t("transacciones.nombre"),value:this.state.trx.name||"",onChange:this.handleInputChange}),Object(D.jsx)(u.a,{id:"trx",type:"text",label:this.props.t("transacciones.trx"),placeholder:this.props.t("transacciones.trx"),value:this.state.trx.trx||"",onChange:this.handleInputChange}),Object(D.jsx)(u.a,{id:"icon",type:"text",label:this.props.t("transacciones.icono"),placeholder:this.props.t("transacciones.icono"),value:this.state.trx.icon||"",onChange:this.handleInputChange}),Object(D.jsx)(u.a,{id:"component",type:"text",label:this.props.t("transacciones.componente"),placeholder:this.props.t("transacciones.componente"),autocomplete:!1,required:!0,value:this.state.trx.component||"",onChange:this.handleInputChange}),Object(D.jsx)(u.a,{id:"menuId",type:"text",label:this.props.t("transacciones.grupo"),placeholder:this.props.t("transacciones.grupo"),autocomplete:!1,required:!0,value:this.state.trx.menuId||"",onChange:this.handleInputChange}),Object(D.jsxs)("div",{className:"center",children:[Object(D.jsx)(m.a,{visible:!0,loading:this.state.wait,disabled:""===this.state.trx.trx||""===this.state.trx.name||""===this.state.trx.icon||""===this.state.trx.component||""===this.state.trx.menuId,text:"editar"===this.state.mode?this.props.t("general.editar"):this.props.t("general.crear"),styleType:"success",id:"guardar",icon:"user",width:"100%",classes:j.a.btn,onPress:this.handlerSubmit}),Object(D.jsx)(m.a,{visible:"editar"===this.state.mode,loading:this.state.wait,disabled:this.state.wait,text:this.props.t("transacciones.addrole"),styleType:"info",id:"addRoleToTrx",icon:"shield",width:"100%",classes:j.a.btn,onPress:this.handlerGoAddRoles}),Object(D.jsx)("br",{}),Object(D.jsx)(m.a,{visible:"editar"===this.state.mode,type:"outline",loading:this.state.wait,disabled:this.state.wait,text:this.props.t("general.cancelar"),id:"cancelar",icon:"eraser",width:"100%",classes:j.a.btn,onPress:this.handlerClear}),Object(D.jsx)("div",{className:"center",children:this.state.msg})]})]})]})}),Object(D.jsx)(h.a,{height:"100%",padding:"0",width:"74%",auto:!0,children:Object(D.jsx)(b.a,{className:"-striped -highlight",data:this.state.transacciones,columns:y(this.props.t),sortable:!0,multiSort:!0,resizable:!0,filterable:!0,defaultPageSize:25,getTdProps:this.handlerGridAction,previousText:this.props.t("general.previous"),nextText:this.props.t("general.next"),loadingText:this.props.t("general.loading"),noDataText:this.props.t("general.norowsfound"),pageText:this.props.t("general.page"),ofText:this.props.t("general.of"),rowsText:this.props.t("general.rows")})})]}):Object(D.jsx)(p.a,{direction:"columns",padding:"0",margin:"0",wrap:"wrap",children:Object(D.jsx)(h.a,{height:"100vh",children:Object(D.jsx)(v.c,{icon:"401",title:this.props.t("error.noAuth"),message:this.props.t("error.noAuthMessage")})})});var e}}]),a}(d.PureComponent);t.default=Object(O.a)()(H)},497:function(e,t,a){"use strict";a.d(t,"e",(function(){return n})),a.d(t,"a",(function(){return o})),a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return c})),a.d(t,"d",(function(){return l}));var s=a(7),r=a.n(s);function n(){return r()({method:"GET",url:"roles"})}function o(e){return r()({method:"POST",url:"roles",data:e})}function i(e){return r()({method:"PUT",url:"roles",data:e})}function c(e){return r()({method:"DELETE",url:"roles/"+e})}function l(e){return r()({method:"GET",url:"roles?filter[where][name]="+e})}},656:function(e,t,a){e.exports={form:"styles_form__tMSnV",icon:"styles_icon__3m-kQ",shadow:"styles_shadow__34ALN",title:"styles_title__2HDAp",eliminar:"styles_eliminar__stIbx",btn:"styles_btn__1X8XZ"}},657:function(e,t,a){var s=a(185),r=a(658);e.exports=function(e,t,a){return e&&e.length&&t&&t.length?r(e,t,s(a,2)):e}},658:function(e,t,a){var s=a(79),r=a(659),n=a(663),o=a(78),i=a(184),c=Array.prototype.splice;e.exports=function(e,t,a,l){var d=l?n:r,p=-1,h=t.length,u=e;for(e===t&&(t=i(t)),a&&(u=s(e,o(a)));++p<h;)for(var m=0,x=t[p],g=a?a(x):x;(m=d(u,g,m,l))>-1;)u!==e&&c.call(u,m,1),c.call(e,m,1);return e}},659:function(e,t,a){var s=a(660),r=a(661),n=a(662);e.exports=function(e,t,a){return t===t?n(e,t,a):s(e,r,a)}},660:function(e,t){e.exports=function(e,t,a,s){for(var r=e.length,n=a+(s?1:-1);s?n--:++n<r;)if(t(e[n],n,e))return n;return-1}},661:function(e,t){e.exports=function(e){return e!==e}},662:function(e,t){e.exports=function(e,t,a){for(var s=a-1,r=e.length;++s<r;)if(e[s]===t)return s;return-1}},663:function(e,t){e.exports=function(e,t,a,s){for(var r=a-1,n=e.length;++r<n;)if(s(e[r],t))return r;return-1}}}]);
//# sourceMappingURL=13.21689c26.chunk.js.map