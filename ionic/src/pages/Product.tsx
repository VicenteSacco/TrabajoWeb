import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Datos de ejemplo del producto
  const product = {
    id,
    name: 'Producto de Ejemplo',
    price: '$999.990',
    features: [
      'Característica 1',
      'Característica 2',
      'Característica 3'
    ],
    image: 'https://media.solotodo.com/media/products/1777144_picture_1688474884.png'
  };

  return (
    <Layout>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{product.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonItem>
            <IonLabel></IonLabel>
            <IonSelect placeholder="Selecciona un filtro">
              <IonSelectOption value="opcion1">Opción 1</IonSelectOption>
              <IonSelectOption value="opcion2">Opción 2</IonSelectOption>
              <IonSelectOption value="opcion3">Opción 3</IonSelectOption>
            </IonSelect>
          </IonItem>
          <img src={product.image} alt={product.name} style={{ width: '25%', height: 'auto' }} />
          <h2>{product.price}</h2>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          
          <IonButton expand="full" color="primary">Agregar al Carrito</IonButton>
        </IonContent>
      </IonPage>
    </Layout>
  );
};

export default Product;