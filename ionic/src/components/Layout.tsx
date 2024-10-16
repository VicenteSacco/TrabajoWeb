import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonMenu, IonList, IonItem, IonMenuButton, IonFooter, IonPopover, useIonViewWillEnter, useIonViewDidLeave, IonMenuToggle, IonSearchbar } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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

  useIonViewWillEnter(() => {
    setShowNavbar(true);
  });

  useIonViewDidLeave(() => {
    setShowNavbar(false);
  });

  const togglePopover = (key: string, event: React.MouseEvent) => {
    setPopoverState({
      show: !popoverState.show || popoverState.key !== key,
      event: event,
      key: key
    });
  };

  const handleNavigation = (path: string) => {
    setPopoverState({ show: false, event: undefined, key: '' });
    setShowNavbar(false);
    history.push(path);
  };

  return (
    <>
      {/* Define el menú */}
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menú</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle autoHide={false}>
              <IonItem button routerLink="/home">Inicio</IonItem>
              <IonItem button onClick={(e) => togglePopover('componentesPC', e)}>Componentes para PC</IonItem>
              <IonItem button onClick={(e) => togglePopover('notebooks', e)}>Notebooks</IonItem>
              <IonItem button onClick={(e) => togglePopover('pcsPreArmados', e)}>PC's Pre Armados</IonItem>
              <IonItem button onClick={(e) => togglePopover('servicioTecnico', e)}>Servicio Técnico</IonItem>
              <IonItem button routerLink="/login">Iniciar Sesión</IonItem>
              <IonItem button routerLink="/register">Registrarse</IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      {/* Define el contenido principal */}
      <IonPage id="main-content">
        {showNavbar && (
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start" className="navbar-buttons">
                <IonButton routerLink="/home">Inicio</IonButton>
                <IonButton onClick={(e) => togglePopover('componentesPC', e)}>Componentes para PC</IonButton>
                <IonButton onClick={(e) => togglePopover('notebooks', e)}>Notebooks</IonButton>
                <IonButton onClick={(e) => togglePopover('pcsPreArmados', e)}>PC's Pre Armados</IonButton>
                <IonButton onClick={(e) => togglePopover('servicioTecnico', e)}>Servicio Técnico</IonButton>
              </IonButtons>
              <IonSearchbar
                value={searchText}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                placeholder="Buscar"
                style={{ maxWidth: '200px' }}
              />
              <IonButtons slot="end" className="navbar-buttons">
                <IonButton routerLink="/login">Iniciar Sesión</IonButton>
                <IonButton routerLink="/register">Registrarse</IonButton>
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

      {/* Popovers para los botones de la barra de navegación */}
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
      <IonPopover
        isOpen={popoverState.show && popoverState.key === 'notebooks'}
        event={popoverState.event}
        onDidDismiss={() => setPopoverState({ show: false, event: undefined, key: '' })}
      >
        <IonList>
          <IonItem button onClick={() => handleNavigation('/notebooks/gaming')}>Gaming</IonItem>
          <IonItem button onClick={() => handleNavigation('/notebooks/trabajo')}>Trabajo</IonItem>
          <IonItem button onClick={() => handleNavigation('/notebooks/todos')}>Todos los Notebooks</IonItem>
        </IonList>
      </IonPopover>
      <IonPopover
        isOpen={popoverState.show && popoverState.key === 'pcsPreArmados'}
        event={popoverState.event}
        onDidDismiss={() => setPopoverState({ show: false, event: undefined, key: '' })}
      >
        <IonList>
          <IonItem button onClick={() => handleNavigation('/pcs-pre-armados/600k')}>PC de $600.000 o menos</IonItem>
          <IonItem button onClick={() => handleNavigation('/pcs-pre-armados/1200k')}>PC de $1.200.000 o menos</IonItem>
          <IonItem button onClick={() => handleNavigation('/pcs-pre-armados/arma-tu-pc')}>Arma tu PC</IonItem>
        </IonList>
      </IonPopover>
      <IonPopover
        isOpen={popoverState.show && popoverState.key === 'servicioTecnico'}
        event={popoverState.event}
        onDidDismiss={() => setPopoverState({ show: false, event: undefined, key: '' })}
      >
        <IonList>
          <IonItem button onClick={() => handleNavigation('/servicio-tecnico/armado')}>Armado</IonItem>
          <IonItem button onClick={() => handleNavigation('/servicio-tecnico/limpieza')}>Limpieza</IonItem>
          <IonItem button onClick={() => handleNavigation('/servicio-tecnico/cotiza')}>Cotiza con un Experto</IonItem>
        </IonList>
      </IonPopover>
    </>
  );
};

export default Layout;