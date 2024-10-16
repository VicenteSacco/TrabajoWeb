import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import Layout from '../components/Layout';

const MemoriasRAM: React.FC = () => {
  return (
    <Layout>
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonTitle>MemoriasRAM</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
            <p>Contenido de MemoriasRAM</p>
            </IonContent>
        </IonPage>
    </Layout>
  );
};

export default MemoriasRAM;