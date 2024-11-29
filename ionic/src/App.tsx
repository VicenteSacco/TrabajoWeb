import React, { Suspense, lazy } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import PrivateRoute from './components/PrivateRoute';

// Carga diferida de páginas
const HomeAdmin = lazy(() => import('./pages/HomeAdmin'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Product = lazy(() => import('./pages/Product'));
const ProductAdmin = lazy(() => import('./pages/ProductAdmin'));
const CPU = lazy(() => import('./pages/CPU'));
const TarjetasGraficas = lazy(() => import('./pages/TarjetasGraficas'));
const MemoriasRAM = lazy(() => import('./pages/MemoriasRAM'));
const FuentesDePoder = lazy(() => import('./pages/FuentesDePoder'));
const PlacasBase = lazy(() => import('./pages/PlacasBase'));
const Coolers = lazy(() => import('./pages/Coolers'));
const carrito = lazy(() => import('./pages/carrito'));
const wishlist = lazy(() => import('./pages/wishlist')); 
const Unauthorized = lazy(() => import('./pages/Unauthorized'));

// Estilos Ionic
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Suspense fallback={<div>Cargando...</div>}>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/unauthorized" component={Unauthorized} />
          
          {/* Rutas de usuario */}
          <PrivateRoute exact path="/product/:id" component={Product} role="user" />
          <PrivateRoute exact path="/componentes-pcs/cpu" component={CPU} role="user" />
          <PrivateRoute exact path="/componentes-pcs/gpu" component={TarjetasGraficas} role="user" />
          <PrivateRoute exact path="/componentes-pcs/ram" component={MemoriasRAM} role="user" />
          <PrivateRoute exact path="/componentes-pcs/psu" component={FuentesDePoder} role="user" />
          <PrivateRoute exact path="/componentes-pcs/motherboard" component={PlacasBase} role="user" />
          <PrivateRoute exact path="/componentes-pcs/coolers" component={Coolers} role="user" />
          
          {/* Rutas de carrito y wishlist */}
          <PrivateRoute exact path="/Carrito" component={carrito} role="user" />
          <PrivateRoute exact path="/Wishlist" component={wishlist} role="user" />
          
          {/* Rutas de administrador */}
          <PrivateRoute exact path="/HomeAdmin" component={HomeAdmin} role='admin'/>
          <PrivateRoute exact path="/ProductAdmin/:id" component={ProductAdmin} role="admin" />
          <PrivateRoute exact path="/admin/cpu" component={CPU} role="admin" />
          <PrivateRoute exact path="/admin/gpu" component={TarjetasGraficas} role="admin" />
          <PrivateRoute exact path="/admin/ram" component={MemoriasRAM} role="admin" />
          <PrivateRoute exact path="/admin/psu" component={FuentesDePoder} role="admin" />
          <PrivateRoute exact path="/admin/motherboard" component={PlacasBase} role="admin" />
          <PrivateRoute exact path="/admin/coolers" component={Coolers} role="admin" />
          
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Suspense>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;