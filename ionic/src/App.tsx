import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import CPU from './pages/CPU';
import TarjetasGraficas from './pages/TarjetasGraficas';
import MemoriasRAM from './pages/MemoriasRAM';
import FuentesDePoder from './pages/FuentesDePoder';
import PlacasBase from './pages/PlacasBase';
import Coolers from './pages/Coolers';
import Login from './pages/Login';
import Register from './pages/Register';
import React from 'react';
import Product from './pages/Product';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true} />
        <Route path="/componentes-pcs/cpu" component={CPU} exact={true} />
        <Route path="/componentes-pcs/gpu" component={TarjetasGraficas} exact={true} />
        <Route path="/componentes-pcs/ram" component={MemoriasRAM} exact={true} />
        <Route path="/componentes-pcs/psu" component={FuentesDePoder} exact={true} />
        <Route path="/componentes-pcs/motherboard" component={PlacasBase} exact={true} />
        <Route path="/componentes-pcs/coolers" component={Coolers} exact={true} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Redirect from="/" to="/home" exact />
        <Route path="/home" component={Home} exact={true} />
        <Route path="/product/:id" component={Product} exact={true} />
        <Redirect from="/" to="/home" exact={true} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;