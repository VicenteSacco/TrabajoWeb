import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel, useIonToast, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonInput } from '@ionic/react';
import useCartStore from '../store/cartStore';
import './carrito.css'; 

const Carrito: React.FC = () => {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [present] = useIonToast();

  const handleProceedToPayment = () => {
    present({
      message: 'Redirigiendo...',
      duration: 2000,
      color: 'success'
    });
   
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Carrito</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {items.length === 0 ? (
            <IonItem>
              <IonLabel>No hay productos en el carrito.</IonLabel>
            </IonItem>
          ) : (
            items.map(item => (
              <IonCard key={item._id} className="cart-item">
                <IonCardHeader>
                  <IonCardTitle>Producto ID: {item._id}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonLabel>
                    Cantidad: 
                    <IonInput 
                      type="number" 
                      value={item.quantity} 
                      onIonChange={(e) => updateQuantity(item._id, parseInt(e.detail.value!) || 0)} 
                      className="quantity-input"
                    />
                  </IonLabel>
                  <IonButton color="danger" onClick={() => removeItem(item._id)}>Eliminar</IonButton>
                </IonCardContent>
              </IonCard>
            ))
          )}
        </IonList>
        <IonButton expand="full" onClick={handleProceedToPayment} className="proceed-button">Proceder al Pago</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Carrito;