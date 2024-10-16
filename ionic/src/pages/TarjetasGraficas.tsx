import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import Layout from '../components/Layout';

const TarjetasGraficas: React.FC = () => {
  return (
    <Layout>
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonTitle>TarjetasGraficas</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
            <p>Contenido de TarjetasGraficas</p>
            </IonContent>
        </IonPage>
    </Layout>
  );
};

export default TarjetasGraficas;