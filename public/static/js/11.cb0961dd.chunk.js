(this.webpackJsonpclient_src=this.webpackJsonpclient_src||[]).push([[11],{387:function(e,t,a){"use strict";a.r(t);var s=a(455),n=a.n(s),r=a(456),l=a(112),i=a(12),o=a(2),c=a(3),d=a(5),u=a(4),p=a(0),h=a(23),m=a(9),f=a(47),b=a(113),j=a(438),g=a(943),O=a.n(g),P=a(372),v=a(111),x=a(10),y=a(470),w=a(440),_=a(499),T=a.n(_),E=a(461),S=a.n(E),C=a(425),k=a(454),F=a(6),z=a(7),N=a.n(z),G=a(457),I=a.n(G),L=a(1),B=["Puesto","Impresor","GrupoMaterial","CodNumera","Area","Lote","FullScreen","PesoManual"],A=F.a.getState().tabList[F.a.getState().tabActive].id,D=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var s;return Object(o.a)(this,a),(s=t.call(this,e)).goFull=function(){s.setState(Object(i.a)(Object(i.a)({},s.state),{},{isFull:!s.state.isFull}))},s.refreshPallets=function(){s.getLastPallets(),s.getPallets()},s.getLastPallets=function(){Object(C.t)(s.state.pesada.pesadaPlanta,s.state.pesada.area,s.state.pesada.pesadaPuesto).then((function(e){s.setState(Object(i.a)(Object(i.a)({},s.state),{},{ultimosPallet:e.data}))}))},s.handlerSelectChange=function(e){var t=e.target.name,a=e.target.value;s.setState(Object(i.a)(Object(i.a)({},s.state),{},{pesada:Object(i.a)(Object(i.a)({},s.state.pesada),{},Object(l.a)({},t,a))}),(function(){"pesadaPlanta"===t&&s.buscarTurnos(),"pesadaProducto"===t&&Object(C.o)(s.state.pesada.pesadaPlanta,a).then((function(e){s.setState(Object(i.a)(Object(i.a)({},s.state),{},{pesada:Object(i.a)(Object(i.a)({},s.state.pesada),{},{producto:e.data[0]})}))})),"pesadaPuesto"===t&&s.getLastPallets(),""!==s.state.pesada.pesadaPlanta&&""!==s.state.pesada.pesadaTurno&&""!==s.state.pesada.numpal&&""!==s.state.pesada.pesadaPuesto&&""!==s.state.pesada.pesadaImpresora&&s.setState(Object(i.a)(Object(i.a)({},s.state),{},{habilitado:!0}))}))},s.componentDidMount=Object(r.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:N.a.all([Object(w.a)()]).then((function(e){s.setState({plantas:e[0].data})})).catch((function(e){401===e.response.status?s.setState({ifYouCan:!1}):s.setState()}));case 1:case"end":return e.stop()}}),e)}))),s.getPallets=function(){Object(C.w)(s.state.pesada.pesadaPlanta).then((function(e){s.setState(Object(i.a)(Object(i.a)({},s.state),{},{pallets:e.data}))}))},s.buscarTurnos=function(){N.a.all([Object(w.b)(s.state.pesada.pesadaPlanta),Object(k.f)(s.state.pesada.pesadaPlanta,A),Object(C.w)(s.state.pesada.pesadaPlanta)]).then((function(e){Object(k.a)(e[1].data,B).then((function(t){t&&N.a.all([Object(C.p)(s.state.pesada.pesadaPlanta,e[1].data.filter((function(e){return e.descr===B[2]}))[0].valor)]).then((function(a){s.setState(Object(i.a)(Object(i.a)({},s.state),{},{turnos:e[0].data,pesada:Object(i.a)(Object(i.a)({},s.state.pesada),{},{lote:e[1].data.filter((function(e){return e.descr===B[5]}))[0].valor,area:e[1].data.filter((function(e){return e.descr===B[4]}))[0].valor,pesoManual:"1"===e[1].data.filter((function(e){return e.descr===B[7]}))[0].valor}),productos:a[0].data,puestos:e[1].data.filter((function(e){return e.descr===B[0]})),impresoras:e[1].data.filter((function(e){return e.descr===B[1]})),params:e[1].data,pallets:e[2].data,paramsOk:t,isFull:"1"===e[1].data.filter((function(e){return e.descr===B[6]}))[0].valor}),(function(){s.state.pesada.pesoManual||Object(C.N)("GREENPESCONS",(function(e,t){null!==e&&s.setState({socketOk:!1}),(0!==t||0===t&&0!==s.state.pesada.pesobalanza)&&s.setState(Object(i.a)(Object(i.a)({},s.state),{},{pesada:Object(i.a)(Object(i.a)({},s.state.pesada),{},{pesobalanza:t})}))}))}))})).catch((function(e){console.error(e.response),401===e.response.status&&s.setState({ifYouCan:!1})})),s.setState({paramsOk:t})})).catch((function(e){console.error(e.response),401===e.response.status&&s.setState({ifYouCan:!1})}))}))},s.handlerConsumir=function(){s.state.consumiendo?Object(C.I)(s.state.pesada.numpal,11).then((function(e){s.setState(Object(i.a)(Object(i.a)({},s.state),{},{consumiendo:!1,msg:s.props.t("greenpallet.ConsumoCancelado"),msgType:O.a.success,pesada:Object(i.a)(Object(i.a)({},s.state.pesada),{},{pesadaProducto:"",pallet:null,numpal:""}),wait:!1}))})):Object(C.I)(s.state.pesada.numpal,12).then((function(e){s.setState(Object(i.a)(Object(i.a)({},s.state),{},{consumiendo:!0,msg:s.props.t("greenpallet.Consumiendo Pallet"),msgType:O.a.blink,pesada:Object(i.a)(Object(i.a)({},s.state.pesada),{},{horaini:I()().subtract((new Date).getTimezoneOffset()/60,"hour"),pesadaProducto:"",pallet:s.state.pallets.find((function(e){return e.numpal===s.state.pesada.numpal}))}),wait:!1}))}))},s.handlerCerrarPallet=function(){if(0!==s.state.pesada.pesadaCantidadBolsa)if(s.state.pesada.pesadaCantidadBolsa>s.state.pesada.pallet.unidades)s.setState({msg:"La Cantidad de bolsas debe ser menor a la del pallet original",msgType:O.a.error});else{if(s.state.pesada.pesoManual){if(parseInt(s.state.pesada.valormanual)>parseInt(s.state.pesada.pallet.kneto))return void s.setState({msg:"La Peso de las bolsas debe ser menor a la del pallet original",msgType:O.a.error})}else if(parseInt(s.state.pesada.pesobalanza)>parseInt(s.state.pesada.pallet.kneto))return void s.setState({msg:"La Peso de las bolsas debe ser menor a la del pallet original",msgType:O.a.error});Object(C.c)({idPlanta:parseInt(s.state.pesada.pesadaPlanta),idNumpal:parseInt(s.state.pesada.numpal),idUsuario:parseInt(F.a.getState().userid.toString()),idProducto:s.state.pesada.pesadaProducto,knetos:s.state.pesada.pesoManual?parseFloat(s.state.pesada.valormanual):parseFloat(s.state.pesada.pesobalanza),haper:s.state.pesada.horaini,hcierr:I()().subtract((new Date).getTimezoneOffset()/60,"hour"),cantbolsas:parseFloat(s.state.pesada.pesadaCantidadBolsas),idArea:parseInt(s.state.pesada.area)},7).then((function(e){s.setState(Object(i.a)(Object(i.a)({},s.state),{},{consumiendo:!1,pesando:!1,numpal:"",msg:"Se ha consumido pallet correctamente en forma parcial.",msgType:O.a.success,pesada:Object(i.a)(Object(i.a)({},s.state.pesada),{},{numpal:"",pallet:null,pesadaProducto:"",pesadaCantidadBolsas:0,valormanual:0})}),(function(){s.getPallets(),s.getLastPallets()}))})).catch((function(e){s.setState({msg:"ERROR al cerrar el pallet",msgType:O.a.error}),console.error(e)}))}else s.setState({msg:"La Cantidad de bolsas debe ser mayor a 0",msgType:O.a.error})},s.handlerInputChange=function(e){var t,a=e.target.name,n=e.target.value;"pesadaCantidadBolsas"===a?s.setState(Object(i.a)(Object(i.a)({},s.state),{},{pesada:Object(i.a)(Object(i.a)({},s.state.pesada),{},(t={},Object(l.a)(t,a,n),Object(l.a)(t,"pesobalanza",parseFloat(s.state.pesada.producto.pesfijo*e.target.value).toFixed(3)),t))})):s.setState(Object(i.a)(Object(i.a)({},s.state),{},{pesada:Object(i.a)(Object(i.a)({},s.state.pesada),{},Object(l.a)({},a,n))}))},s.handlerConsumoTotal=function(){s.setState({wait:!0}),Object(C.d)({idPlanta:parseInt(s.state.pesada.pesadaPlanta),idNumpal:parseInt(s.state.pesada.pallet.numpal),idUsuario:parseInt(F.a.getState().userid.toString()),idProducto:s.state.pesada.pesadaProducto,knetos:parseFloat(s.state.pesada.pallet.kneto),haper:s.state.pesada.horaini,hcierr:I()().subtract((new Date).getTimezoneOffset()/60,"hour"),cantbolsas:parseInt(s.state.pesada.pallet.unidades),idArea:parseInt(s.state.pesada.area)},8).then((function(e){s.setState(Object(i.a)(Object(i.a)({},s.state),{},{consumiendo:!1,pesando:!1,numpal:"",msg:"Se ha consumido el total del pallet correctamente.",msgType:O.a.success,pesada:Object(i.a)(Object(i.a)({},s.state.pesada),{},{numpal:"",pallet:null,pesadaProducto:"",pesadaCantidadBolsas:0,valormanual:0})}),(function(){s.getPallets(),s.getLastPallets()}))})).catch((function(e){console.error(e)}))},s.handlerConsumoParcial=function(){s.setState(Object(i.a)(Object(i.a)({},s.state),{},{consumiendo:!0,pesando:!0}))},s.componentWillUnmount=function(){console.log(s.state.pesada.pesoManual),s.state.pesada.pesoManual||Object(C.O)()},s.state={isFull:!1,ifYouCan:!0,ifYouAddPermission:!1,wait:!1,habilitado:!1,consumiendo:!1,pesando:!1,socketOk:!0,pesada:{pallet:null,numpal:"",pesadaPlanta:"",pesadaPuesto:"",pesadaImpresora:"",pesadaTurno:"",pesadaProducto:"",pesobalanza:0,pesadaCantidadBolsas:0,palletNumero:0,pesadaArea:"",palletPeso:"0",estadobalanza:"",pesoManual:!1,valormanual:0,horaini:null,horafin:null,lote:"-",producto:{}},ultimosPallet:[],plantas:[],impresoras:[],pallets:[],turnos:[],productos:[],puestos:[],paramsOk:null,msg:""},s}return Object(c.a)(a,[{key:"render",value:function(){var e,t,a=this;return this.state.ifYouCan?!0===this.state.paramsOk||null===this.state.paramsOk?Object(L.jsx)(T.a,{enabled:this.state.isFull,onChange:function(e){return a.setState({isFull:e})},children:Object(L.jsxs)(h.a,{direction:"column",margin:"0",children:[Object(L.jsxs)(m.a,{width:"100%",children:[Object(L.jsx)("div",{className:O.a.title,children:Object(L.jsxs)("div",{className:O.a.titleText,children:[this.props.t("greentrz.consumo"),Object(L.jsx)("span",{className:O.a.msg,children:Object(L.jsx)("div",{className:this.state.msgType,children:this.props.t(this.state.msg)})}),Object(L.jsx)(v.a,{padding:"5px",styleType:"outline",classes:O.a.fullscreenBtn,visible:!0,loading:this.state.wait,disabled:this.state.consumiendo,id:"refreshPallets",icon:"refresh",onPress:this.refreshPallets}),Object(L.jsx)(v.a,{padding:"5px",styleType:"outline",visible:!0,loading:this.state.wait,disabled:this.state.consumiendo,id:"pesarfullscreen",icon:this.state.isFull?"chevron-down":"chevron-up",onPress:this.goFull})]})}),Object(L.jsx)("div",{className:O.a.icon,children:Object(L.jsx)("img",{src:y.a,alt:"Pallet"})})]}),Object(L.jsx)(m.a,{width:"100%",height:"auto",padding:"5px",margin:"0 0 20px 0",children:Object(L.jsxs)(j.a,{title:this.props.t("general.configuracion"),classes:O.a.group,children:[Object(L.jsxs)(m.a,{width:"49%",padding:"5px",children:[Object(L.jsx)(b.a,{id:"pesadaPlanta",label:this.props.t("general.planta"),items:this.state.plantas,itemId:"id",disabled:this.state.consumiendo,itemText:"descripcion",value:this.state.pesada.pesadaPlanta,onSelect:this.handlerSelectChange}),Object(L.jsx)(b.a,{id:"pesadaTurno",label:this.props.t("general.turno"),items:this.state.turnos,itemId:"id",itemText:"descr",disabled:this.state.consumiendo,value:this.state.pesada.pesadaTurno,onSelect:this.handlerSelectChange}),Object(L.jsx)(b.a,{id:"pesadaPuesto",label:this.props.t("general.puesto"),items:this.state.puestos,itemId:"id",itemText:"valor",disabled:this.state.consumiendo,value:this.state.pesada.pesadaPuesto,onSelect:this.handlerSelectChange})]}),Object(L.jsxs)(m.a,{width:"49%",height:"100%",padding:"5px",children:[Object(L.jsx)(b.a,{id:"pesadaImpresora",label:this.props.t("general.impresora"),items:this.state.impresoras,itemId:"id",itemText:"valor",disabled:this.state.consumiendo,value:this.state.pesada.pesadaImpresora,onSelect:this.handlerSelectChange}),Object(L.jsx)(b.a,{id:"numpal",label:this.props.t("greenpallet.numpal"),items:this.state.pallets,itemId:"numpal",itemText:"numpal",disabled:this.state.consumiendo,value:this.state.pesada.numpal,onSelect:this.handlerSelectChange}),Object(L.jsx)(v.a,{width:"100%",margin:"0",visible:!0,styleType:"success",loading:this.state.wait,disabled:!this.state.habilitado,text:this.state.consumiendo?this.props.t("greentrz.cancelarConsumo"):this.props.t("greentrz.consumir"),id:"pesar",icon:this.state.pesando?"stop":"play",onPress:this.handlerConsumir})]})]})}),Object(L.jsxs)(h.a,{classes:O.a.container,width:"100%",height:"calc(100% - 20rem)",direction:"row",children:[Object(L.jsx)(m.a,{width:"50%",height:"auto",padding:"5px",children:Object(L.jsx)(j.a,{title:this.props.t("greentrz.UltimosPalletConsumido"),columns:!0,disabled:!this.state.consumiendo,height:"100%",classes:O.a.groupPesada,children:Object(L.jsx)("ul",{className:O.a.listaPallet,children:this.state.ultimosPallet.map((function(e){return Object(L.jsxs)("li",{children:[e.idNumpal,Object(L.jsxs)("small",{children:[" ","-"," ",Object(L.jsx)(S.a,{format:"DD/MM/YYYY HH:mm:ss",children:e.fechorPes})]}),Object(L.jsxs)("b",{children:[e.idProducto," - ",e.cantbolsas," bolsas. ",e.knetos,"kg"]})]},e.idNumpal)}))})})}),Object(L.jsx)(m.a,{width:"50%",height:"auto",padding:"0px",children:Object(L.jsxs)(h.a,{classes:O.a.container,width:"100%",height:"100%",direction:"column",children:[Object(L.jsx)(m.a,{width:"100%",height:"70%",padding:"5px",children:Object(L.jsxs)(j.a,{height:"100%",title:this.props.t("greentrz.PesadaActual"),classes:O.a.group,disabled:!this.state.consumiendo,children:[Object(L.jsxs)(h.a,{classes:O.a.container,width:"100%",height:"33%",direction:"row",wrap:"wrap",children:[Object(L.jsx)(m.a,{width:"50%",height:"auto",children:Object(L.jsxs)("div",{className:O.a.numPallet,children:["PALLET N\xb0",Object(L.jsx)("div",{children:this.state.pesada.pallet?this.state.pesada.pallet.numpal:"-"})]})}),Object(L.jsx)(m.a,{width:"50%",height:"auto",children:Object(L.jsxs)("div",{className:O.a.numPallet,children:["LOTE N\xb0",Object(L.jsx)("div",{children:this.state.pesada.pallet?this.state.pesada.pallet.lote:"-"})]})}),Object(L.jsx)(m.a,{width:"100%",height:"auto",children:Object(L.jsxs)("div",{className:O.a.producto,children:["PRODUCTO",Object(L.jsx)("div",{children:this.state.pesada.pallet?this.state.pesada.pallet.descr_mat:"-"})]})})]}),Object(L.jsxs)(h.a,{classes:O.a.container,width:"100%",height:"33%",direction:"row",children:[Object(L.jsx)(m.a,{width:"50%",height:"auto",children:Object(L.jsxs)("div",{className:O.a.detalleBolsas,children:[this.props.t("greentrz.pesototal"),Object(L.jsxs)("div",{children:[this.state.pesada.pallet?this.state.pesada.pallet.kneto:"-"," ","Kg."]})]})}),Object(L.jsx)(m.a,{width:"50%",height:"auto",children:Object(L.jsxs)("div",{className:O.a.detalleBolsas,children:[this.props.t("greentrz.cantcajas"),Object(L.jsxs)("div",{children:[this.state.pesada.pallet?this.state.pesada.pallet.unidades:"-"," ","Cajas."]})]})})]}),Object(L.jsxs)(h.a,{classes:O.a.container,width:"100%",height:"33%",direction:"row",wrap:"wrap",children:[Object(L.jsx)(b.a,{id:"pesadaProducto",label:this.props.t("general.producto"),items:this.state.productos,itemId:"codsap",itemText:["codsap","descrMat"],value:this.state.pesada.pesadaProducto,onSelect:this.handlerSelectChange,width:"100%"}),Object(L.jsxs)(m.a,{width:"100%",height:"auto",children:[Object(L.jsx)(v.a,{width:"50%",margin:"0",visible:!0,styleType:"success",loading:this.state.wait,text:this.props.t("greentrz.consumoTotal"),id:"pesar",icon:"play",disabled:""===this.state.pesada.pesadaProducto,onPress:this.handlerConsumoTotal}),Object(L.jsx)(v.a,{width:"50%",margin:"0",visible:!0,loading:this.state.wait,text:this.props.t("greentrz.consumoParcial"),id:"pesar",icon:"pause",disabled:""===this.state.pesada.pesadaProducto,onPress:this.handlerConsumoParcial})]})]})]})}),Object(L.jsx)(m.a,{width:"100%",height:"30%",padding:"5px",children:Object(L.jsxs)(j.a,{columns:!0,height:"100%",title:this.state.pesada.pesoManual?this.props.t("greentrz.PesoManual"):this.props.t("greentrz.PesoBalanza"),disabled:!this.state.pesando,classes:O.a.groupPesada,children:[Object(L.jsxs)(h.a,{classes:O.a.container,width:"100%",height:"auto",direction:"row",children:[Object(L.jsx)(m.a,{width:"50%",height:"auto",children:Object(L.jsx)("div",{className:O.a.detalleBolsas,children:Object(L.jsx)(f.a,{id:"pesadaCantidadBolsas",label:this.props.t("greentrz.cantbolasa"),type:"number",min:"0",max:parseFloat(null===(e=this.state.pesada.pallet)||void 0===e?void 0:e.unidades)-1,value:this.state.pesada.pesadaCantidadBolsas,onChange:this.handlerInputChange})})}),Object(L.jsx)(m.a,{width:"50%",height:"auto",classes:O.a.pesada,children:Object(L.jsx)("div",{className:O.a.peso,children:this.state.pesada.pesoManual?Object(L.jsxs)("div",{className:O.a.valormanual,children:[Object(L.jsx)(f.a,{id:"valormanual",type:"number",min:"0",max:parseFloat(null===(t=this.state.pesada.pallet)||void 0===t?void 0:t.kneto)-1,value:this.state.pesada.valormanual,onChange:function(e){return a.setState(Object(i.a)(Object(i.a)({},a.state),{},{pesada:Object(i.a)(Object(i.a)({},a.state.pesada),{},{valormanual:e.target.value})}))}}),Object(L.jsx)("span",{children:"kg"})]}):Object(L.jsxs)("div",{children:[this.state.pesada.pesobalanza," kg"]})})})]}),Object(L.jsx)(v.a,{width:"100%",heigh:"100%",visible:!0,styleType:"success",loading:this.state.wait,text:this.props.t("greentrz.cerrarPallet"),id:"cerrarPallet",icon:"save",onPress:this.handlerCerrarPallet})]})})]})})]})]})}):Object(L.jsx)(h.a,{direction:"columns",padding:"0",margin:"0",wrap:"wrap",children:Object(L.jsx)(m.a,{height:"100vh",children:Object(L.jsx)(x.c,{icon:"need_param",title:this.props.t("error.needParamsTitle"),message:this.props.t("error.needParamsExplain"),data:B.join(", ")})})}):Object(L.jsx)(h.a,{direction:"columns",padding:"0",margin:"0",wrap:"wrap",children:Object(L.jsx)(m.a,{height:"100vh",children:Object(L.jsx)(x.c,{icon:"401",title:this.props.t("error.noAuth"),message:this.props.t("error.noAuthMessage")})})})}}]),a}(p.PureComponent);t.default=Object(P.a)()(D)},425:function(e,t,a){"use strict";a.d(t,"a",(function(){return b})),a.d(t,"d",(function(){return j})),a.d(t,"c",(function(){return g})),a.d(t,"b",(function(){return N})),a.d(t,"C",(function(){return y})),a.d(t,"e",(function(){return R})),a.d(t,"f",(function(){return G})),a.d(t,"g",(function(){return I})),a.d(t,"A",(function(){return J})),a.d(t,"i",(function(){return z})),a.d(t,"j",(function(){return d})),a.d(t,"B",(function(){return v})),a.d(t,"k",(function(){return B})),a.d(t,"l",(function(){return L})),a.d(t,"m",(function(){return S})),a.d(t,"n",(function(){return C})),a.d(t,"o",(function(){return p})),a.d(t,"p",(function(){return u})),a.d(t,"s",(function(){return P})),a.d(t,"q",(function(){return h})),a.d(t,"r",(function(){return O})),a.d(t,"u",(function(){return w})),a.d(t,"t",(function(){return T})),a.d(t,"w",(function(){return Q})),a.d(t,"x",(function(){return K})),a.d(t,"y",(function(){return Y})),a.d(t,"z",(function(){return A})),a.d(t,"E",(function(){return E})),a.d(t,"F",(function(){return m})),a.d(t,"G",(function(){return f})),a.d(t,"J",(function(){return M})),a.d(t,"I",(function(){return q})),a.d(t,"K",(function(){return F})),a.d(t,"L",(function(){return H})),a.d(t,"M",(function(){return D})),a.d(t,"N",(function(){return o})),a.d(t,"O",(function(){return c})),a.d(t,"h",(function(){return k})),a.d(t,"D",(function(){return x})),a.d(t,"v",(function(){return _})),a.d(t,"H",(function(){return U}));var s=a(448),n=a.n(s),r=a(7),l=a.n(r),i=null;function o(e,t){(i=n()("http://localhost:1212")).on("connect_error",(function(e){return t(e,null)})),i.on("pesobalanza",(function(e){return t(null,e)})),i.on("miestado",(function(e){return t(null,e)})),i.on("estadoBalanza",(function(e){return t(null,e)})),i.emit("myTransactionName",e),i.emit("subscribeGetPesoBal",300),console.log("subscribe",i)}function c(){var e,t;console.log("Unsubscribing",i),null===(e=i)||void 0===e||e.disconnect(),null===(t=i)||void 0===t||t.destroy()}function d(e){return l()({method:"GET",url:'../as-productos?filter={"where":{"idPlanta":'+e+"}}"})}function u(e,t){return l()({method:"GET",url:'../as-productos?filter={"where":{"idPlanta":'+e+',"idGrpmat":'+t+"}}"})}function p(e,t){return l()({method:"GET",url:'../as-productos?filter={"where":{"idPlanta":'+e+',"codsap":'+t+"}}"})}function h(e,t){return l()({method:"GET",url:'../cod-numeras?filter={"where":{"id":'+t+',"idPlanta":'+e+"}}"})}function m(e){return l()({method:"POST",url:"../as-detipals",data:e,headers:{"Content-Type":"application/json"}})}function f(e){return l()({method:"POST",url:"../as-hdetipals",data:e,headers:{"Content-Type":"application/json"}})}function b(e){return l()({method:"PUT",url:"../greentrz/"+e.idPlanta+"/"+e.numpal+"/"+e.idArea,data:e,headers:{"Content-Type":"application/json"}})}function j(e,t){return l()({method:"POST",url:"../greentrz/consumo-total/"+e.idNumpal+"/"+t,data:e,headers:{"Content-Type":"application/json"}})}function g(e,t){return l()({method:"POST",url:"../greentrz/consumo-parcial/"+e.idNumpal+"/"+t,data:e,headers:{"Content-Type":"application/json"}})}function O(e,t,a){return l()({method:"GET",url:'../as-detipals?filter={"limit": 10,"skip": 0,"order": ["numpal DESC","fec_prod DESC"],"where":{"idPlanta":'+e+',"idArea":'+t+',"ptoPes":'+a+',"idEstado":2}}'})}function P(e,t,a){return l()({method:"GET",url:'../as-detipals?filter={"limit": 10,"skip": 0,"order": ["numpal DESC","fec_prod DESC"],"where":{"idPlanta":'+e+',"idArea":'+t+',"ptoPes":'+a+',"idEstado":5}}'})}function v(e,t){return l()({method:"GET",url:"../greentrz/totalAConsumir/"+e+"/"+t})}function x(e,t){return l()({method:"GET",url:"../greentrz/totalProducidoFinal/"+e+"/"+t})}function y(e,t){return l()({method:"GET",url:"../greentrz/totalConsumidoFinal/"+e+"/"+t})}function w(e,t,a){return l()({method:"GET",url:'../as-detipals?filter={"limit": 1,"skip": 0,"order": ["numpal DESC"],"where":{"idPlanta":'+e+',"idArea":'+t+',"idEstado":1}}'})}function _(e,t,a){return l()({method:"GET",url:'../as-detipals?filter={"limit": 1,"skip": 0,"order": ["numpal DESC"],"where":{"idPlanta":'+e+',"idArea":'+t+',"idEstado":4}}'})}function T(e,t,a){return l()({method:"GET",url:'../as-conspals?filter={"limit": 15,"skip": 0,"order": ["hcierr DESC"],"where":{"idPlanta":'+e+',"idArea":'+t+',"ptoPes":'+a+',"idEstado":12}}'})}function E(e,t){return l()({method:"PUT",url:"../cod-numeras/"+e,data:t,headers:{"Content-Type":"application/json"}})}function S(e,t,a){return l()({method:"GET",url:"../greentrz/pallets/"+e+"/"+t+"/"+a})}function C(e){return l()({method:"GET",url:"../greentrz/palletsByNumpal/"+e})}function k(e,t,a){return l()({method:"DELETE",url:"../greentrz/pallet/"+e+"/"+t+"/"+a})}function F(e){return l()({method:"PUT",url:"../greentrz/remanejar/"+e.numpal,data:e})}function z(){return l()({method:"GET",url:"../param-cams"})}function N(e){return l()({method:"POST",url:"../param-cams/",data:e,headers:{"Content-Type":"application/json"}})}function G(e){return l()({method:"PUT",url:"../param-cams/"+e.id,data:e,headers:{"Content-Type":"application/json"}})}function I(e){return l()({method:"DELETE",url:"../param-cams/"+e,headers:{"Content-Type":"application/json"}})}function L(e){return l()({method:"GET",url:'../param-cams?filter={"where":{"idPlanta":'+e+"}}"})}function B(e){return l()({method:"GET",url:'../as-detipals?filter={"where":{"idPlanta":'+e+"}}"})}function A(e,t){return l()({method:"GET",url:"../as-pospal/getPositionPallet/"+e+"/"+t})}function D(e){return l()({method:"POST",url:"../as-pospals",data:e,headers:{"Content-Type":"application/json"}})}function M(e){return l()({method:"PUT",url:"../as-pospals/"+e.id,data:e,headers:{"Content-Type":"application/json"}})}function U(e){return l()({method:"POST",url:"../as-hpospals/",data:e,headers:{"Content-Type":"application/json"}})}function q(e,t){return l()({method:"PUT",url:"../as-detipal/estado-pallet/"+e+"/"+t,headers:{"Content-Type":"application/json"}})}function R(e){return l()({method:"DELETE",url:"../as-pospals/"+e,headers:{"Content-Type":"application/json"}})}function Y(e){return l()({method:"GET",url:"../camaras/getPalletsInCamaras/"+e})}function H(e,t){return l()({method:"GET",url:"../camaras/getPalletInCamara/"+e+"/"+t})}function K(e,t){return l()({method:"GET",url:"../as-detipal/getPalletDesasociados/"+e+"/"+t})}function Q(e){return l()({method:"GET",url:"../as-detipal/pallets-a-consumir/"+e})}function J(e){return l()({method:"GET",url:'../prodfamilias?filter={"where":{"idPlanta":'+e+"}}"})}},438:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var s=a(2),n=a(3),r=a(5),l=a(4),i=a(0),o=a(439),c=a.n(o),d=a(1),u=function(e){Object(r.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).createStyles=function(){var t=[c.a.content];return e.props.classes&&t.push(e.props.classes),t.join(" ")},e}return Object(n.a)(a,[{key:"render",value:function(){var e={width:"auto",height:"auto"};return this.props.position&&(e.position=this.props.position),this.props.top&&(e.top=this.props.top),this.props.left&&(e.left=this.props.left),this.props.right&&(e.right=this.props.right),this.props.bottom&&(e.bottom=this.props.bottom),this.props.margin&&(e.margin=this.props.margin),this.props.padding&&(e.padding=this.props.padding),this.props.width&&(e.width=this.props.width),this.props.height&&(e.height=this.props.height),this.props.overflow&&(e.overflow=this.props.overflow),this.props.minHeight&&(e.minHeight=this.props.minHeight),this.props.disabled?Object(d.jsxs)("div",{className:c.a.framedisable,style:e,children:[Object(d.jsx)("span",{className:c.a.title,children:this.props.title}),Object(d.jsx)("div",{className:this.createStyles(),children:this.props.children})]}):Object(d.jsxs)("div",{className:c.a.frame,style:e,children:[Object(d.jsx)("span",{className:c.a.title,children:this.props.title}),Object(d.jsx)("div",{className:this.createStyles(),children:this.props.children})]})}}]),a}(i.PureComponent)},439:function(e,t,a){e.exports={frame:"styles_frame__25tn_",columns:"styles_columns__3Pn4b",title:"styles_title__1TbAA",content:"styles_content__2umkp",framedisable:"styles_framedisable__3jgiF"}},440:function(e,t,a){"use strict";a.d(t,"b",(function(){return l})),a.d(t,"a",(function(){return r}));var s=a(7),n=a.n(s);function r(){return n()({method:"GET",url:"../plantas"})}function l(e){return n()({method:"GET",url:'../prd-turnos?filter={"where":{"idPlanta":'+e+"}}"})}},454:function(e,t,a){"use strict";a.d(t,"e",(function(){return c})),a.d(t,"b",(function(){return u})),a.d(t,"c",(function(){return p})),a.d(t,"d",(function(){return h})),a.d(t,"f",(function(){return d})),a.d(t,"a",(function(){return m}));var s=a(455),n=a.n(s),r=a(456),l=a(7),i=a.n(l);function o(e,t){return e.reduce((function(e,a){return(e[a[t]]=e[a[t]]||[]).push(a),e}),{})}function c(){return i()({method:"GET",url:"../trxparams?filter[include][0][relation]=planta&filter[include][1][relation]=trx"})}function d(e,t){return i()({method:"GET",url:'../trxparams?filter={"where":{"id_planta":'+e+',"id_trx":'+t+"}}"})}function u(e){return i()({method:"POST",url:"../trxparams",data:e})}function p(e){return i()({method:"PUT",url:"../trxparams/"+e.id,data:e})}function h(e){return i()({method:"DELETE",url:"../trxparams/"+e})}function m(e,t){return f.apply(this,arguments)}function f(){return(f=Object(r.a)(n.a.mark((function e(t,a){var s;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t&&a){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,o(t,"descr");case 4:if(s=e.sent,Object.keys(s).length===a.length){e.next=7;break}return e.abrupt("return");case 7:return e.abrupt("return",Object.keys(s).every((function(e){return a.includes(e)})));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},470:function(e,t,a){"use strict";t.a=a.p+"static/media/pallet.c6ae7989.svg"},499:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var s=t[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,a,s){return a&&e(t.prototype,a),s&&e(t,s),t}}(),n=a(0),r=o(n),l=o(a(13)),i=o(a(500));function o(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.fullScreenElement=null,a.detectFullScreen=a.detectFullScreen.bind(a),a}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),s(t,[{key:"componentDidMount",value:function(){i.default.addEventListener("fullscreenchange",this.detectFullScreen)}},{key:"componentWillUnmount",value:function(){i.default.removeEventListener("fullscreenchange",this.detectFullScreen)}},{key:"componentDidUpdate",value:function(){this.handleProps(this.props)}},{key:"handleProps",value:function(e){var t=i.default.fullscreenElement===this.node;t&&!e.enabled?this.leaveFullScreen():!t&&e.enabled&&this.enterFullScreen()}},{key:"detectFullScreen",value:function(){i.default.fullscreenElement===this.node?(this.fullScreenElement=i.default.fullscreenElement,this.props.onChange(!0)):!i.default.fullscreenElement&&this.fullScreenElement&&(this.fullScreenElement=null,this.props.onChange(!1))}},{key:"enterFullScreen",value:function(){i.default.fullscreenEnabled&&i.default.requestFullscreen(this.node)}},{key:"leaveFullScreen",value:function(){i.default.fullscreenEnabled&&i.default.exitFullscreen()}},{key:"render",value:function(){var e=this,t=["fullscreen"];return this.props.enabled&&t.push("fullscreen-enabled"),r.default.createElement("div",{className:t.join(" "),ref:function(t){return e.node=t},style:this.props.enabled?{height:"100%",width:"100%"}:void 0},this.props.children)}}]),t}(n.Component);c.propTypes={children:l.default.node.isRequired,enabled:l.default.bool.isRequired,onChange:l.default.func},c.defaultProps={enabled:!1,onChange:function(){}},t.default=c},500:function(e,t,a){"use strict";a.r(t);var s={fullscreenEnabled:0,fullscreenElement:1,requestFullscreen:2,exitFullscreen:3,fullscreenchange:4,fullscreenerror:5,fullscreen:6},n=["webkitFullscreenEnabled","webkitFullscreenElement","webkitRequestFullscreen","webkitExitFullscreen","webkitfullscreenchange","webkitfullscreenerror","-webkit-full-screen"],r=["mozFullScreenEnabled","mozFullScreenElement","mozRequestFullScreen","mozCancelFullScreen","mozfullscreenchange","mozfullscreenerror","-moz-full-screen"],l=["msFullscreenEnabled","msFullscreenElement","msRequestFullscreen","msExitFullscreen","MSFullscreenChange","MSFullscreenError","-ms-fullscreen"],i="undefined"!==typeof window&&"undefined"!==typeof window.document?window.document:{},o="fullscreenEnabled"in i&&Object.keys(s)||n[0]in i&&n||r[0]in i&&r||l[0]in i&&l||[],c={requestFullscreen:function(e){return e[o[s.requestFullscreen]]()},requestFullscreenFunction:function(e){return e[o[s.requestFullscreen]]},get exitFullscreen(){return i[o[s.exitFullscreen]].bind(i)},get fullscreenPseudoClass(){return":"+o[s.fullscreen]},addEventListener:function(e,t,a){return i.addEventListener(o[s[e]],t,a)},removeEventListener:function(e,t,a){return i.removeEventListener(o[s[e]],t,a)},get fullscreenEnabled(){return Boolean(i[o[s.fullscreenEnabled]])},set fullscreenEnabled(e){},get fullscreenElement(){return i[o[s.fullscreenElement]]},set fullscreenElement(e){},get onfullscreenchange(){return i[("on"+o[s.fullscreenchange]).toLowerCase()]},set onfullscreenchange(e){return i[("on"+o[s.fullscreenchange]).toLowerCase()]=e},get onfullscreenerror(){return i[("on"+o[s.fullscreenerror]).toLowerCase()]},set onfullscreenerror(e){return i[("on"+o[s.fullscreenerror]).toLowerCase()]=e}};t.default=c},943:function(e,t,a){e.exports={form:"styles_form__2thOD",icon:"styles_icon__3O1K4",shadow:"styles_shadow__2UVZA",title:"styles_title__3tFYF",valormanual:"styles_valormanual__2aOQD",titleText:"styles_titleText__3QPRs",eliminar:"styles_eliminar__1Y-DX",detail:"styles_detail__1IaWG",combos:"styles_combos__10AkV",fullscreenBtn:"styles_fullscreenBtn__3spId",topheader:"styles_topheader__Gq-xQ",numPallet:"styles_numPallet__1aGzh",producto:"styles_producto__cmAPo",detalleBolsas:"styles_detalleBolsas__3ePPc",estadoBalaza:"styles_estadoBalaza__3h0Qk",peso:"styles_peso__1ViNq",groupPesada:"styles_groupPesada__25KyA",marginBottom:"styles_marginBottom__2LriE",listaPallet:"styles_listaPallet__YzaX0",bolsas:"styles_bolsas__3eNq7",msg:"styles_msg__1LZlL",error:"styles_error__bMAXT",success:"styles_success__7R6cd",blink:"styles_blink__Bve4M","blink-animation":"styles_blink-animation__3GFnG"}}}]);
//# sourceMappingURL=11.cb0961dd.chunk.js.map