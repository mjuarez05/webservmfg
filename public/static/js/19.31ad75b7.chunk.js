(this.webpackJsonpclient_src=this.webpackJsonpclient_src||[]).push([[19],{391:function(e,t,s){"use strict";s.r(t);var r=s(112),a=s(12),i=s(2),o=s(3),n=s(28),l=s(5),c=s(4),d=s(0),p=s(23),m=s(9),h=s(47),u=s(113),g=s(111),f=s(497),j=s(61),b=s(7),O=s.n(b);function x(e){return O()({method:"GET",url:"ACLs?filter[where][principalId]="+e})}function w(e){return O()({method:"POST",url:"ACLs",data:e})}function v(e){return O()({method:"DELETE",url:"ACLs/"+e})}var S=s(665),T=s.n(S),y=s(372),P=s(10),C=s(20),R=s(469),D=(s(442),s(461)),I=s.n(D),H=s(1),N=function(e){return[{Header:e("roles.roles"),foldable:!0,columns:[{Header:"ID",accessor:"id",show:!1},{Header:e("roles.name"),accessor:"name"},{accessor:"description",Header:e("roles.description")},{accessor:"created",Header:e("roles.created"),Cell:function(e){return Object(H.jsx)(I.a,{locale:localStorage.getItem("i18nextLng"),format:"DD-MM-YYYY HH:mm",children:e.original.created})}},{accessor:"modified",Header:e("roles.modified"),Cell:function(e){return Object(H.jsx)(I.a,{locale:localStorage.getItem("i18nextLng"),format:"DD-MM-YYYY HH:mm",children:e.original.modified})}},{Header:"",filterable:!1,sortable:!1,width:40,Cell:function(t){return Object(H.jsx)("button",{className:T.a.eliminar,alt:e("general.eliminar"),children:Object(H.jsx)(C.Icon,{name:"close"})})}}]}]},_=function(e){return[{Header:e("roles.permisosDe"),foldable:!0,columns:[{Header:"ID",accessor:"id",show:!1},{Header:e("permisos.model"),accessor:"model"},{Header:e("permisos.accessType"),accessor:"accessType"},{Header:e("permisos.property"),accessor:"property"},{Header:e("permisos.permission"),accessor:"permission"},{Header:e("permisos.principalType"),accessor:"principalType",show:!1},{Header:e("permisos.principalId"),accessor:"principalId",show:!1},{Header:"",filterable:!1,sortable:!1,width:40,Cell:function(t){return Object(H.jsx)("button",{className:T.a.eliminar,alt:e("general.eliminar"),children:Object(H.jsx)(C.Icon,{name:"close"})})}}]}]},E=function(e){return[{id:"ALLOW",value:e("permisos.allow")},{id:"DENY",value:e("permisos.deny")}]},Y=function(e){Object(l.a)(s,e);var t=Object(c.a)(s);function s(e){var o;return Object(i.a)(this,s),(o=t.call(this,e)).getModels=function(){var e=Object(n.a)(o);Object(j.h)().then((function(t){e.setState({allmodels:t.data.models})})).catch((function(t){console.error(t.response),401===t.response.status&&e.setState({ifYouCan:!1})}))},o.getMethods=function(e){var t=Object(n.a)(o);Object(j.g)(e).then((function(e){t.setState({allmethods:e.data.methods})})).catch((function(e){console.error(e.response),401===e.response.status&&t.setState({ifYouCan:!1})}))},o.getRoles=function(){var e=Object(n.a)(o);Object(f.e)().then((function(t){e.setState({roles:t.data})})).catch((function(t){console.error(t.response),401===t.response.status&&e.setState({ifYouCan:!1})}))},o.getPermissionsForRole=function(e){var t=Object(n.a)(o);x(e).then((function(e){t.setState({permisos:e.data})})).catch((function(e){console.error(e.response),401===e.response.status&&t.setState({ifYouCan:!1})}))},o.componentDidMount=function(){o.getRoles(),o.getModels()},o.handleInputChange=function(e){var t=Object(a.a)(Object(a.a)({},o.state.rol),{},Object(r.a)({},e.target.name,e.target.value));o.setState({rol:t})},o.handleInputChangePermiso=function(e){var t=Object(a.a)(Object(a.a)({},o.state.permiso),{},Object(r.a)({},e.target.name,e.target.value));o.setState({permiso:t})},o.handlerSubmit=function(e){o.setState({wait:!0});var t=Object(n.a)(o);e.preventDefault(),"crear"===o.state.modeRol&&""===o.state.rol.id?Object(f.a)({name:o.state.rol.name,description:o.state.rol.description,created:new Date,modified:new Date}).then((function(e){o.getRoles(),o.props.t("roles.create"),o.setState({rol:{id:"",name:"",description:"",created:"",modified:""},modeRol:"crear",wait:!1,msg:o.props.t("roles.creadoOK")})})).catch((function(e){o.setState({wait:!1}),console.error(e.response),t.setState({msg:void 0!==e.response?o.props.t("roles."+e.response.data.error.message):o.props.t("roles.error")})})):Object(f.b)({name:o.state.rol.name,description:o.state.rol.description,id:o.state.rol.id,created:o.state.rol.created,modified:new Date}).then((function(e){o.getRoles(),o.setState({rol:{id:"",name:"",description:"",created:"",modified:""},modeRol:"crear",wait:!1,msg:o.props.t("roles.modificadoOK")})})).catch((function(e){o.setState({wait:!1}),console.error(e.response),t.setState({msg:void 0!==e.response?o.props.t("roles."+e.response.data.error.code):o.props.t("roles.error")})}))},o.handlerSubmitPermsio=function(e){o.setState({wait:!0});var t=Object(n.a)(o);e.preventDefault(),w({model:o.state.permiso.model,accessType:o.state.permiso.accessType,property:o.state.permiso.property,permission:o.state.permiso.permission,principalType:o.state.permiso.principalType,principalId:o.state.permiso.principalId}).then((function(e){o.getPermissionsForRole(o.state.rol.name),o.props.t("permisos.create"),o.setState({permiso:{model:"",accessType:"",permission:"",property:"",principalId:o.state.permiso.principalId,principalType:"ROLE"},modePermisos:"crear",wait:!1,msgPermisos:o.props.t("permisos.creadoOK")})})).catch((function(e){o.setState({wait:!1}),console.error(e.response),t.setState({msg:void 0!==e.response?o.props.t("permisos."+e.response.data.error.message):o.props.t("permisos.error")})}))},o.handlerClear=function(){o.setState({rol:{id:"",name:"",description:"",created:"",modified:""},modeRol:"crear",wait:!1,msg:""})},o.handlerClearPermisos=function(){o.setState({permiso:{model:"",accessType:"",permission:"",property:"",principalId:o.state.permiso.principalId,principalType:"ROLE"},modePermisos:"crear",wait:!1,msgPermisos:""})},o.handlerGridAction=function(e,t,s,r){return{onClick:function(e){void 0!==t&&(o.handlerClearPermisos(),o.getPermissionsForRole(t.original.name),o.setState({rol:{id:t.original.id,name:t.original.name,created:t.original.created,modified:t.original.modified,description:t.original.description},permiso:{model:"",accessType:"",permission:"",principalType:"ROLE",property:"*",principalId:t.original.name},msg:"",modeRol:"editar"}),""===s.Header&&(!0===window.confirm(o.props.t("general.estaseguro"))?o.handlerDelete(t.original.id):o.handlerClear()))}}},o.handlerGridPermisosAction=function(e,t,s,r){return{onClick:function(e){void 0!==t&&(""===s.Header&&(!0===window.confirm(o.props.t("general.estaseguro"))?o.handlerDeletePermiso(t.original.id):o.handlerClear()))}}},o.handlerDelete=function(e){var t=Object(n.a)(o);Object(f.c)(e).then((function(e){o.handlerClear(),o.getRoles(),o.setState(Object(a.a)(Object(a.a)({},o.state),{},{msg:o.props.t("roles.eliminadoOK")}))})).catch((function(e){console.error(e.response),t.setState({msg:void 0!==e.response?o.props.t("roles."+e.response.data.error.code):o.props.t("roles.error")})}))},o.handlerDeletePermiso=function(e){var t=Object(n.a)(o);v(e).then((function(e){o.getPermissionsForRole(o.state.rol.name),o.setState(Object(a.a)(Object(a.a)({},o.state),{},{msg:o.props.t("permisos.eliminadoOK")}))})).catch((function(e){console.error(e.response),t.setState({msg:void 0!==e.response?o.props.t("roles."+e.response.data.error.code):o.props.t("roles.error")})}))},o.handlerSelectChange=function(e){o.setState({permiso:Object(a.a)(Object(a.a)({},o.state.permiso),{},Object(r.a)({},e.target.name,e.target.value))}),"model"===e.target.name&&o.getMethods(e.target.value)},o.handlerGoAddPermission=function(){o.setState({msg:"",ifYouAddPermission:!o.state.ifYouAddPermission})},o._columns=N,o.state={rol:{id:"",name:"",creted:"",modified:"",description:""},permiso:{id:"",model:"",accessType:"",permission:"",principalType:"ROLE",property:"",principalId:""},ifYouCan:!0,ifYouAddPermission:!1,roles:[],allmodels:[],allmethods:[],permisos:[],msg:"",msgPermisos:"",modeRol:"crear",modePermisos:"crear",wait:!1},o}return Object(o.a)(s,[{key:"render",value:function(){return this.state.ifYouCan?this.state.ifYouAddPermission?Object(H.jsxs)(p.a,{direction:"columns",padding:"0",margin:"0",wrap:"wrap",children:[Object(H.jsx)(m.a,{height:"100%",padding:"0",width:"25%",auto:!0,children:Object(H.jsxs)(p.a,{direction:"column",padding:"0",margin:"0",wrap:"nowrap",round:"3px",children:[Object(H.jsx)("div",{className:T.a.title,children:Object(H.jsx)("h3",{children:this.props.t("permisos.newPermiso",{rol:this.state.rol.name})})}),Object(H.jsx)("div",{className:T.a.icon,children:Object(H.jsxs)("span",{className:"fa-stack fa-lg",children:[Object(H.jsx)("i",{className:"fa fa-circle fa-stack-2x fa-inverse "+T.a.shadow}),Object(H.jsx)("i",{className:"fa fa-key fa-stack-1x "})]})}),Object(H.jsxs)("div",{className:"padding-default",children:[Object(H.jsx)(u.a,{id:"model",items:this.state.allmodels,onSelect:this.handlerSelectChange}),Object(H.jsx)(u.a,{id:"property",items:this.state.allmethods,onSelect:this.handlerSelectChange}),Object(H.jsx)(u.a,{id:"accessType",itemId:"id",itemText:"value",items:(e=this.props.t,[{id:"READ",value:e("permisos.read")},{id:"CREATE",value:e("permisos.create")},{id:"EXECUTE",value:e("permisos.execute")},{id:"*",value:e("permisos.all")}]),onSelect:this.handlerSelectChange}),Object(H.jsx)(u.a,{id:"permission",itemId:"id",itemText:"value",items:E(this.props.t),onSelect:this.handlerSelectChange}),Object(H.jsxs)("div",{className:"center",children:[Object(H.jsx)(g.a,{visible:"editar"===this.state.modeRol,type:"outline",loading:this.state.wait,disabled:this.state.wait,text:this.props.t("general.volver"),id:"volverToRoles",icon:"arrow-left",width:"100%",classes:T.a.btn,onPress:this.handlerGoAddPermission}),Object(H.jsx)(g.a,{visible:!0,loading:this.state.wait,disabled:""===this.state.permiso.accessType||""===this.state.permiso.permission||""===this.state.permiso.property||""===this.state.permiso.model,text:"crear"===this.state.modePermisos?this.props.t("general.crear"):this.props.t("general.editar"),styleType:"success",id:"guardar",icon:"key",width:"100%",classes:T.a.btn,onPress:this.handlerSubmitPermsio}),Object(H.jsx)(g.a,{visible:"editar"===this.state.modePermisos,type:"outline",loading:this.state.wait,disabled:this.state.wait,text:this.props.t("general.cancelar"),id:"cancelar",icon:"eraser",width:"100%",classes:T.a.btn,onPress:this.handlerClearPermisos})]}),Object(H.jsx)("div",{className:"center",children:this.state.msg})]})]})}),Object(H.jsx)(m.a,{height:"100%",padding:"0",width:"74%",auto:!0,children:Object(H.jsx)(R.a,{className:"-striped -highlight",data:this.state.permisos,columns:_(this.props.t),sortable:!0,multiSort:!0,resizable:!0,filterable:!0,defaultPageSize:15,getTdProps:this.handlerGridPermisosAction,previousText:this.props.t("general.previous"),nextText:this.props.t("general.next"),loadingText:this.props.t("general.loading"),noDataText:this.props.t("general.norowsfound"),pageText:this.props.t("general.page"),ofText:this.props.t("general.of"),rowsText:this.props.t("general.rows")})})]}):Object(H.jsxs)(p.a,{direction:"columns",padding:"0",margin:"0",wrap:"wrap",children:[Object(H.jsx)(m.a,{height:"100%",padding:"0",width:"25%",auto:!0,children:Object(H.jsxs)(p.a,{direction:"column",padding:"0",margin:"0",wrap:"nowrap",round:"3px",children:[Object(H.jsx)("div",{className:T.a.title,children:Object(H.jsx)("h3",{children:"crear"===this.state.modeRol?this.props.t("roles.newRoles"):this.props.t("roles.modificarRoles",{rol:this.state.rol.name})})}),Object(H.jsx)("div",{className:T.a.icon,children:Object(H.jsxs)("span",{className:"fa-stack fa-lg",children:[Object(H.jsx)("i",{className:"fa fa-circle fa-stack-2x fa-inverse "+T.a.shadow}),Object(H.jsx)("i",{className:"fa fa-shield fa-stack-1x "})]})}),Object(H.jsxs)("div",{className:"padding-default",children:[Object(H.jsx)(h.a,{id:"name",type:"text",label:this.props.t("roles.name"),placeholder:this.props.t("roles.name"),value:this.state.rol.name||"",onChange:this.handleInputChange}),Object(H.jsx)(h.a,{id:"description",type:"text",label:this.props.t("roles.description"),placeholder:this.props.t("roles.description"),value:this.state.rol.description||"",onChange:this.handleInputChange}),Object(H.jsxs)("div",{className:"center",children:[Object(H.jsx)(g.a,{visible:!0,loading:this.state.wait,disabled:""===this.state.rol.name||""===this.state.rol.description,text:"crear"===this.state.modeRol?this.props.t("general.crear"):this.props.t("general.editar"),styleType:"success",id:"guardar",icon:"shield",width:"100%",classes:T.a.btn,onPress:this.handlerSubmit}),Object(H.jsx)("br",{}),Object(H.jsx)(g.a,{visible:"editar"===this.state.modeRol,type:"outline",loading:this.state.wait,disabled:this.state.wait,text:this.props.t("general.cancelar"),id:"cancelar",icon:"eraser",width:"100%",classes:T.a.btn,onPress:this.handlerClear})]}),Object(H.jsx)("div",{className:"center",children:this.state.msg})]})]})}),Object(H.jsx)(m.a,{height:"100%",padding:"0",width:"74%",auto:!0,children:Object(H.jsx)(R.a,{className:"-striped -highlight",data:this.state.roles,columns:N(this.props.t),sortable:!0,multiSort:!0,resizable:!0,filterable:!0,defaultPageSize:15,getTdProps:this.handlerGridAction,previousText:this.props.t("general.previous"),nextText:this.props.t("general.next"),loadingText:this.props.t("general.loading"),noDataText:this.props.t("general.norowsfound"),pageText:this.props.t("general.page"),ofText:this.props.t("general.of"),rowsText:this.props.t("general.rows")})})]}):Object(H.jsx)(p.a,{direction:"columns",padding:"0",margin:"0",wrap:"wrap",children:Object(H.jsx)(m.a,{height:"100vh",children:Object(H.jsx)(P.c,{icon:"401",title:this.props.t("error.noAuth"),message:this.props.t("error.noAuthMessage")})})});var e}}]),s}(d.PureComponent);t.default=Object(y.a)()(Y)},497:function(e,t,s){"use strict";s.d(t,"e",(function(){return i})),s.d(t,"a",(function(){return o})),s.d(t,"b",(function(){return n})),s.d(t,"c",(function(){return l})),s.d(t,"d",(function(){return c}));var r=s(7),a=s.n(r);function i(){return a()({method:"GET",url:"roles"})}function o(e){return a()({method:"POST",url:"roles",data:e})}function n(e){return a()({method:"PUT",url:"roles",data:e})}function l(e){return a()({method:"DELETE",url:"roles/"+e})}function c(e){return a()({method:"GET",url:"roles?filter[where][name]="+e})}},665:function(e,t,s){e.exports={form:"styles_form__1D29L",icon:"styles_icon__n7zUr",shadow:"styles_shadow__2NSPn",title:"styles_title__38rz-",eliminar:"styles_eliminar__10v4_",btn:"styles_btn__2lEWD"}}}]);
//# sourceMappingURL=19.31ad75b7.chunk.js.map