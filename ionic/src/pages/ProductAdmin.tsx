import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonItem, 
  IonLabel, 
  IonInput,
  IonAlert,
  useIonToast
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { getItemById, updateItemDiscount, updateItemStock } from '../services/apiService'; 
import './Product.css';

interface Product {
  _id: string;
  id: number;
  name: string;
  price: number;
  price2: number;
  description: string;
  likes: number;
  unidades: number;
  features: string[];
  image: string;
}

const ProductAdmin: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [present] = useIonToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [discountPercent, setDiscountPercent] = useState<string>('');
  const [showDiscountAlert, setShowDiscountAlert] = useState(false);
  const [newStock, setNewStock] = useState<string>('');
  const [showStockAlert, setShowStockAlert] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await getItemById(id);
      setProduct(data);
      if (data.unidades) {
        setNewStock(data.unidades.toString());
      }
    } catch (error) {
      present({
        message: 'Error al cargar el producto',
        duration: 2000,
        color: 'danger'
      });
    }
  };

  const handleApplyDiscount = async () => {
    if (!product || !discountPercent) return;

    const discount = parseFloat(discountPercent);
    if (isNaN(discount) || discount < 0 || discount > 1) {
        present({
            message: 'Por favor ingrese un descuento válido entre 0 y 1',
            duration: 2000,
            color: 'warning'
        });
        return;
    }

    try {
        // Si el precio original no ha sido guardado, guardamos el precio actual
        if (product.price2 === 0) {
            const originalPrice = product.price;
            await updateItemDiscount(id, {
                price2: originalPrice, // Guardamos el precio original
                price: Math.round(originalPrice * (1 - discount)) // Aplicamos el descuento
            });
        } else {
            // Si ya hay un descuento, aplicamos otro descuento sobre el precio con descuento
            const newPrice = Math.round(product.price2 * (1 - discount));
            await updateItemDiscount(id, {
                price: newPrice,
                price2: product.price2 // Mantenemos el precio original
            });
        }

        setProduct(prev => {
            if (!prev) return null;
            return {
                ...prev,
                price: Math.round(product.price * (1 - discount)), // Actualizamos el precio
                price2: product.price // Guardamos el precio original
            };
        });

        present({
            message: 'Descuento aplicado correctamente',
            duration: 2000,
            color: 'success'
        });
        setShowDiscountAlert(false);
    } catch (error) {
        present({
            message: 'Error al aplicar el descuento',
            duration: 2000,
            color: 'danger'
        });
    }
  };

  const handleRemoveDiscount = async () => {
    if (!product || !product.price2) return;

    try {
      await updateItemDiscount(id, {
        price: product.price2,
        price2: 0
      });

      setProduct(prev => {
        if (!prev) return null;
        return {
          ...prev,
          price: prev.price2,
          price2: 0
        };
      });

      present({
        message: 'Descuento removido correctamente',
        duration: 2000,
        color: 'success'
      });
    } catch (error) {
      present({
        message: 'Error al remover el descuento',
        duration: 2000,
        color: 'danger'
      });
    }
  };

  const handleUpdateStock = async () => {
    if (!product || !newStock) return;

    const stockNumber = parseInt(newStock);
    if (isNaN(stockNumber) || stockNumber < 0) {
      present({
        message: 'Por favor ingrese un stock válido',
        duration: 2000,
        color: 'warning'
      });
      return;
    }

    try {
      await updateItemStock(id, stockNumber); 

      setProduct(prev => {
        if (!prev) return null;
        return {
          ...prev,
          unidades: stockNumber 
        };
      });

      present({
        message: 'Stock actualizado correctamente',
        duration: 2000,
        color: 'success'
      });
      setShowStockAlert(false);
    } catch (error) {
      present({
        message: 'Error al actualizar el stock',
        duration: 2000,
        color: 'danger'
      });
    }
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
              <p className="price">
                ${product.price.toLocaleString()}
                {product.price2 > 0 && (
                  <span className="original-price">${product.price2.toLocaleString()}</span>
                )}
              </p>

              <div className="admin-controls">
                <IonButton onClick={() => setShowDiscountAlert(true)}>
                  Aplicar Descuento
                </IonButton>
                {product.price2 > 0 && (
                  <IonButton onClick={handleRemoveDiscount} color="danger">
                    Quitar Descuento
                  </IonButton>
                  )}
                <IonButton onClick={() => setShowStockAlert(true)}>
                  Actualizar Stock
                </IonButton>
              </div>

              <div className="stock-info">
                <p>Stock disponible: {product.unidades} unidades</p>
              </div>

              <div className="description">
                <h2>Descripción</h2>
                <p>{product.description}</p>
                <h3>Características</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <IonAlert
              isOpen={showDiscountAlert}
              onDidDismiss={() => setShowDiscountAlert(false)}
              header="Aplicar Descuento"
              inputs={[
                {
                  name: 'discount',
                  type: 'number',
                  placeholder: 'Ingrese el descuento (0-1)',
                  min: 0,
                  max: 1,
                  attributes: {
                    inputmode: 'decimal'
                  }
                }
              ]}
              buttons={[
                {
                  text: 'Cancelar',
                  role: 'cancel'
                },
                {
                  text: 'Aplicar',
                  handler: (data) => {
                    const discountValue = parseFloat(data.discount);
                    if (discountValue >= 0 && discountValue <= 1) {
                      setDiscountPercent(discountValue.toString()); 
                      handleApplyDiscount();
                    } else {
                      alert('Por favor, ingrese un valor de descuento entre 0 y 1.');
                      return false;
                    }
                  }
                }
              ]}
            />


          <IonAlert
            isOpen={showStockAlert}
            onDidDismiss={() => setShowStockAlert(false)}
            header="Actualizar Stock"
            inputs={[
              {
                name: 'stock',
                type: 'number',
                placeholder: 'Ingrese el nuevo stock',
                min: 0,
                value: newStock
              }
            ]}
            buttons={[
              {
                text: 'Cancelar',
                role: 'cancel'
              },
              {
                text: 'Actualizar',
                handler: (data) => {
                  setNewStock(data.stock);
                  handleUpdateStock();
                }
              }
            ]}
          />
        </IonContent>
      </IonPage>
    </Layout>
  );
};

export default ProductAdmin;
