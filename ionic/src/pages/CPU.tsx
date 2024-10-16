import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import Layout from '../components/Layout';

const CPU: React.FC = () => {
  return (
    <Layout>
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonTitle>CPU</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
            <p>Contenido de CPU</p>
            </IonContent>
        </IonPage>
    </Layout>
  );
};

export default CPU;