import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonMenu, IonList, IonItem, IonMenuButton, IonFooter, IonPopover, useIonViewWillEnter, useIonViewDidLeave, IonMenuToggle, IonSearchbar } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import './Layout.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [popoverState, setPopoverState] = useState<{ show: boolean, event: React.MouseEvent | undefined, key: string }>({
    show: false,
    event: undefined,
    key: ''
  });
  const [showNavbar, setShowNavbar] = useState(true);
  const [searchText, setSearchText] = useState('');
  const history = useHistory();
  const { user, logout } = useAuthStore();

  useIonViewWillEnter(() => {
    setShowNavbar(true);
  });

  useIonViewDidLeave(() => {
    setShowNavbar(false);
  });

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  const togglePopover = (key: string, event: React.MouseEvent) => {
    setPopoverState({
      show: !popoverState.show || popoverState.key !== key,
      event: event,
      key: key
    });
  };

  const handleNavigation = (path: string) => {
    setPopoverState({ show: false, event: undefined, key: '' });
    const finalPath = user?.role === 'admin' ? `/admin${path}` : path;
    history.push(finalPath);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Buscar:', searchText);
  };

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menú</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle autoHide={false}>
              <IonItem button onClick={() => handleNavigation('/home')}>Inicio</IonItem>
              <IonItem button onClick={(e) => togglePopover('componentesPC', e)}>Componentes para PC</IonItem>
              <IonItem button onClick={(e) => togglePopover('notebooks', e)}>Notebooks</IonItem>
              <IonItem button onClick={(e) => togglePopover('pcsPreArmados', e)}>PC's Pre Armados</IonItem>
              <IonItem button onClick={(e) => togglePopover('servicioTecnico', e)}>Servicio Técnico</IonItem>
              <IonItem button onClick={() => handleNavigation('/Carrito')}>Carrito</IonItem>
              <IonItem button onClick={() => handleNavigation('/wishlist')}>Wishlist</IonItem>
              {!user ? (
                <>
                  <IonItem button onClick={() => history.push('/login')}>Iniciar Sesión</IonItem>
                  <IonItem button onClick={() => history.push('/register')}>Registrarse</IonItem>
                </>
              ) : (
                <IonItem button onClick={handleLogout}>Cerrar Sesión</IonItem>
              )}
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content">
        {showNavbar && (
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start" className="navbar-buttons">
                <IonButton onClick={() => handleNavigation('/home')}>Inicio</IonButton>
                <IonButton onClick={(e) => togglePopover('componentesPC', e)}>Componentes para PC</IonButton>
                <IonButton onClick={(e) => togglePopover('notebooks', e)}>Notebooks</IonButton>
                <IonButton onClick={(e) => togglePopover('pcsPreArmados', e)}>PC's Pre Armados</IonButton>
                <IonButton onClick={(e) => togglePopover('servicioTecnico', e)}>Servicio Técnico</IonButton>
                <IonButton onClick={() => handleNavigation('/carrito')}>Carrito</IonButton>
                <IonButton onClick={() => handleNavigation('/wishlist')}>Wishlist</IonButton>
              </IonButtons>
              <form onSubmit={handleSearch}>
                <IonSearchbar
                  value={searchText}
                  onIonChange={(e) => setSearchText(e.detail.value!)}
                  placeholder="Buscar"
                  style={{ maxWidth: '200px' }}
                />
              </form>
              <IonButtons slot="end" className="navbar-buttons">
                {!user ? (
                  <>
                    <IonButton onClick={() => history.push('/login')}>Iniciar Sesión</IonButton>
                    <IonButton onClick={() => history.push('/register')}>Registrarse</IonButton>
                  </>
                ) : (
                  <>
                    <IonButton onClick={handleLogout}>Cerrar Sesión</IonButton>
                    {user.role === 'admin' && (
                      <IonButton color="warning">Panel Admin</IonButton>
                    )}
                  </>
                )}
              </IonButtons>
              <IonButtons slot="end" className="menu-button hide-on-large">
                <IonMenuButton />
              </IonButtons>
            </IonToolbar>
          </IonHeader>
        )}
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">GamerAssurance</IonTitle>
            </IonToolbar>
          </IonHeader>
          {children}
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonTitle className="footer-title">© 2024 GamerAssurance. Todos los derechos reservados.</IonTitle>
          </IonToolbar>
        </IonFooter>
      </IonPage>

      <IonPopover
        isOpen={popoverState.show && popoverState.key === 'componentesPC'}
        event={popoverState.event}
        onDidDismiss={() => setPopoverState({ show: false, event: undefined, key: '' })}
      >
        <IonList>
          <IonItem button onClick={() => handleNavigation('/componentes-pcs/cpu')}>CPU</IonItem>
          <IonItem button onClick={() => handleNavigation('/componentes-pcs/gpu')}>Tarjetas Gráficas</IonItem>
          <IonItem button onClick={() => handleNavigation('/componentes-pcs/ram')}>Memorias RAM</IonItem>
          <IonItem button onClick={() => handleNavigation('/componentes-pcs/psu')}>Fuentes de Poder</IonItem>
          <IonItem button onClick={() => handleNavigation('/componentes-pcs/motherboard')}>Placas Base</IonItem>
          <IonItem button onClick={() => handleNavigation('/componentes-pcs/coolers')}>Coolers</IonItem>
        </IonList>
      </IonPopover>
    </>
  );
};

export default Layout;