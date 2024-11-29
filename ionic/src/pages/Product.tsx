import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonCard, 
  IonCardContent, 
  IonIcon,
  IonTextarea,
  useIonToast
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { heart, cart } from 'ionicons/icons';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import { getItemById } from '../services/apiService'; 
import './Product.css';

interface Product {
  _id: string;
  id: number;
  name: string;
  price: number;
  description: string;
  likes: number;
  unidades: number;
  features: string[];
  image: string;
}

const Product: React.FC = () => {
  const { addItem } = useCartStore();
  const { addToWishlist } = useAuthStore(); 
  const { id } = useParams<{ id: string }>();
  const [present] = useIonToast();
  const [product, setProduct] = useState<Product | null>(null);
  
  useEffect(() => {
    fetchProduct();
  }, [id]);
  
  const fetchProduct = async () => {
    try {
      const data = await getItemById(id);
      setProduct(data);
    } catch (error) {
      present({
        message: 'Error al cargar el producto',
        duration: 2000,
        color: 'danger'
      });
    }
  };

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);

  const handleAddToCart = async () => {
    if (product) {
      try {
        await addItem(product._id, 1); 
        present({
          message: 'Producto añadido al carrito',
          duration: 2000,
          color: 'success'
        });
      } catch (error) {
        present({
          message: 'Error al añadir al carrito',
          duration: 2000,
          color: 'danger'
        });
      }
    }
  };
  
  const handleAddToWishlist = async () => {
    if (product) {
      try {
        await addToWishlist(product._id); 
        addToWishlist(product._id); 
        present({
          message: 'Producto añadido a la lista de deseos',
          duration: 2000,
          color: 'success'
        });
      } catch (error) {
        present({
          message: 'Error al añadir a la wishlist',
          duration: 2000,
          color: 'danger'
        });
      }
    }
  };

  const handleSubmitReview = () => {
    present({
      message: 'Reseña enviada correctamente',
      duration: 2000,
      color: 'success'
    });
    setReview('');
    setRating(5);
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <Layout>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{product.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="product-container">
            <img src={product.image} alt={product.name} className="product-image" />
            
            <div className="product-info">
              <h1>{product.name}</h1>
              <p className="price">${product.price.toLocaleString()}</p>
              
              <div className="user-controls">
                <IonButton onClick={handleAddToCart}>
                  <IonIcon slot="start" icon={cart} />
                  Añadir al Carrito
                </IonButton>
                <IonButton onClick={handleAddToWishlist}>
                  <IonIcon slot="start" icon={heart} />
                  Añadir a Wishlist
                </IonButton>
              </div>

              <div className="description">
                <h2>Descripción</h2>
                <p>{product.description}</p>
              </div>

              <div className="review-section">
                <h2 > Dejar una Reseña</h2>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <IonIcon
                      key={star}
                      icon="star"
                      className={`star ${rating >= star ? 'selected' : ''}`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                <IonTextarea
                  placeholder="Escribe tu reseña aquí"
                  value={review}
                  onIonChange={e => setReview(e.detail.value!)}
                />
                <IonButton onClick={handleSubmitReview}>
                  Enviar Reseña
                </IonButton>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </Layout>
  );
};

export default Product;