import loadable from '@loadable/component';

const LoaderViewHome = loadable(() => import('./view/Home'));
const LoaderViewWelcome = loadable(() => import('./view/Welcome'));
const LoaderViewUsuarios = loadable(() =>
  import('././view/Administrator/Usuarios'),
);
const LoaderViewTRX = loadable(() =>
  import('./view/Administrator/Transacciones'),
);
const LoaderViewError = loadable(() => import('./view/Error'));
const LoaderViewRole = loadable(() => import('./view/Administrator/Roles'));
const LoaderViewMonitorFaena = loadable(() => import('./view/Faena/Monitor'));
const LoaderViewProfile = loadable(() => import('./view/Profile'));
const LoaderViewSock = loadable(() => import('./view/GreenTrz/Socket'));
const LoaderViewListProductos = loadable(() =>
  import('./view/Planeamiento/ListProductos'),
);
const LoaderViewAddProductos = loadable(() =>
  import('./view/Planeamiento/EditProductos'),
);
const LoaderViewGreenPesada = loadable(() => import('./view/GreenTrz/Pesada'));
const LoaderViewTrxParam = loadable(() =>
  import('./view/Administrator/TrxParam'),
);
const LoaderViewEditProductos = loadable(() =>
  import('./view/Planeamiento/EditProductos'),
);
const LoaderViewGreenEditPallets = loadable(() =>
  import('./view/GreenTrz/EditPallets'),
);
const LoaderViewGreenListPallets = loadable(() =>
  import('./view/GreenTrz/ListPallets'),
);
const LoaderViewGreenPesPrdFinal = loadable(() =>
  import('./view/GreenTrz/PesPrdFinal'),
);
const LoaderViewGreenPesCons = loadable(() =>
  import('./view/GreenTrz/PesCons'),
);
const LoaderViewGreenCamaras = loadable(() =>
  import('./view/GreenTrz/Camaras'),
);

const LoaderViewGreenCamarasAdmin = loadable(() =>
  import('./view/Administrator/CamarasAdmin'),
);
const LoaderViewGreenFiltroCamaras = loadable(() =>
  import('./view/GreenTrz/FiltroCamaras'),
);
export {
  LoaderViewTrxParam,
  LoaderViewHome,
  LoaderViewWelcome,
  LoaderViewUsuarios,
  LoaderViewTRX,
  LoaderViewError,
  LoaderViewRole,
  LoaderViewMonitorFaena,
  LoaderViewProfile,
  LoaderViewSock,
  LoaderViewListProductos,
  LoaderViewAddProductos,
  LoaderViewEditProductos,
  LoaderViewGreenPesada,
  LoaderViewGreenEditPallets,
  LoaderViewGreenListPallets,
  LoaderViewGreenPesPrdFinal,
  LoaderViewGreenPesCons,
  LoaderViewGreenCamaras,
  LoaderViewGreenCamarasAdmin,
  LoaderViewGreenFiltroCamaras,
};
