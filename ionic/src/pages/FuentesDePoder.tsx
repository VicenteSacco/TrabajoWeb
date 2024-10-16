import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import Layout from '../components/Layout';

const FuentesDePoder: React.FC = () => {
  return (
    <Layout>
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonTitle>FuentesDePoder</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
            <p>Contenido de FuentesDePoder</p>
            </IonContent>
        </IonPage>
    </Layout>
  );
};

export default FuentesDePoder;