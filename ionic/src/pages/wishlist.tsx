import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel, useIonToast, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/react';
import useAuthStore from '../store/authStore'; 
import useCartStore from '../store/cartStore'; 
import './wishlist.css'; 

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useAuthStore();
  const { addItem } = useCartStore();
  const [present] = useIonToast();

  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id);
    present({
      message: 'Producto eliminado de la wishlist',
      duration: 2000,
      color: 'success'
    });
  };

  const handleAddToCart = (id: string) => {
    addItem(id, 1);
    present({
      message: 'Producto añadido al carrito',
      duration: 2000,
      color: 'success'
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Wishlist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {wishlist.length === 0 ? (
            <IonItem>
              <IonLabel>No hay productos en la wishlist.</IonLabel>
            </IonItem>
          ) : (
            wishlist.map(productId => (
              <IonCard key={productId} className="wishlist-item">
                <IonCardHeader>
                  <IonCardTitle>Producto ID: {productId}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonButton expand="full" onClick={() => handleAddToCart(productId)}>Añadir al Carrito</IonButton>
                  <IonButton color="danger" expand="full" onClick={() => handleRemoveFromWishlist(productId)}>Eliminar</IonButton>
                </IonCardContent>
              </IonCard>
            ))
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Wishlist;