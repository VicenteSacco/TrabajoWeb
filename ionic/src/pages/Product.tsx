import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonCard, IonCardContent, IonIcon, IonTextarea } from '@ionic/react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { heart, storefrontOutline, cart } from 'ionicons/icons';
import { getItems, addItem } from '../services/apiService';
import './Product.css';

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [items, setItems] = useState<any[]>([]);
  const [newItemName, setNewItemName] = useState<string>('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleAddItem = async () => {
    if (newItemName.trim()) {
      const newItem = await addItem({ name: newItemName });
      setItems([...items, newItem]);
      setNewItemName('');
    }
  };

  // Datos de ejemplo del producto
  const product = {
    id,
    name: 'Producto de Ejemplo',
    price: '$999.990',
    description: 'Esta es una descripción detallada del producto de ejemplo.',
    likes: 5,
    unidades: 10,
    features: [
      'Característica 1',
      'Característica 2',
      'Característica 3'
    ],
    image: 'https://media.solotodo.com/media/products/1777144_picture_1688474884.png'
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

          <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
            <IonButton onClick={() => scrollToSection('descripcion')} fill="default">Descripción</IonButton>
            <IonButton onClick={() => scrollToSection('calificacion')} fill="default">Calificación</IonButton>
          </div>

          <img src={product.image} alt={product.name} style={{ width: '25%', height: 'auto' }} />
          <IonButton color="light">
            <IonIcon slot="icon-only" icon={heart}></IonIcon>
          </IonButton>
          <IonButton color="light">
            <IonIcon slot="icon-only" icon={cart} ></IonIcon>
          </IonButton>
          
          <div>
            <h2>{product.price}<IonButton color="primary">Aplicar descuento</IonButton></h2>
          </div>
          <div>
            <h2><IonIcon slot="icon-only" icon={storefrontOutline} >Unidades disponibles</IonIcon>{product.unidades} Unidades disponibles<IonButton color="primary">Cambiar stock</IonButton></h2>
          </div>
          
          <IonCard id="descripcion">
            <IonCardContent>
              <h3>Descripción</h3>
              <p>{product.description}</p>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </IonCardContent>
          </IonCard>
          
          <IonCard id="calificacion">
            <IonCardContent>
              <h3>Calificación</h3>
              <p>{product.likes} Me gustas</p>
              <IonTextarea
                aria-label="Custom textarea"
                placeholder="Escribe tu opinión aquí"
                class="custom"
                counter={true}
                maxlength={100}
              ></IonTextarea>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </Layout>
  );
};

export default Product;