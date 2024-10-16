import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import Layout from '../components/Layout';

const PlacasBase: React.FC = () => {
  return (
    <Layout>
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonTitle>PlacasBase</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
            <p>Contenido de PlacasBase</p>
            </IonContent>
        </IonPage>
    </Layout>
  );
};

export default PlacasBase;