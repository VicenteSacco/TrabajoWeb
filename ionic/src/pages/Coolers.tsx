import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import Layout from '../components/Layout';

const Coolers: React.FC = () => {
  return (
    <Layout>
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonTitle>Coolers</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
            <p>Contenido de Coolers</p>
            </IonContent>
        </IonPage>
    </Layout>
  );
};

export default Coolers;