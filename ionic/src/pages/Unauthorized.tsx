import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';

const Unauthorized: React.FC = () => {
  const history = useHistory();

  return (
    <Layout>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Acceso No Autorizado</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="unauthorized-container">
            <h1>403 - Acceso No Autorizado</h1>
            <p>No tienes permisos para acceder a esta página.</p>
            <IonButton onClick={() => history.push('/home')}>
              Volver al Inicio
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    </Layout>
  );
};

export default Unauthorized;