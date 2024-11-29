import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import { getItems } from '../services/apiService';
import './Home.css';

const HomeAdmin: React.FC = () => {
  const history = useHistory();
  const [products, setProducts] = useState<any[]>([]);

 

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getItems();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  
  if (loading) {
    return <div>Cargando...</div>; 
  }
  


  const handleProductClick = (id: string) => {
    history.push(`/ProductAdmin/${id}`);
  };
  
  return (
    <Layout>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>GamerAssurance - Panel de Administración</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="carousel-container">
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={5000}
            showStatus={false}
            className="main-carousel"
          >
            {products.map(product => (
              <div 
                key={product._id} 
                className="carousel-slide"
                onClick={() => handleProductClick(product._id)}
              >
                <img src={product.image} alt={product.name} />
                <div className="carousel-content">
                  <h2>{product.name}</h2>
                </div>
              </div>
            ))}
          </Carousel>
          </div>

          <div className="featured-categories">
            <h2>Categorías Destacadas</h2>
            <div className="category-grid">
              {[
                { name: 'Procesadores', path: '/admin/componentes-pcs/cpu', icon: '🔲' },
                { name: 'Tarjetas Gráficas', path: '/admin/componentes-pcs/gpu', icon: '🎮' },
                { name: 'Memorias RAM', path: '/admin/componentes-pcs/ram', icon: '💾' },
                { name: 'Fuentes de Poder', path: '/admin/componentes-pcs/psu', icon: '⚡' },
                { name: 'Placas Base', path: '/admin/componentes-pcs/motherboard', icon: '🔧' },
                { name: 'Refrigeración', path: '/admin/componentes-pcs/coolers', icon: '❄️' }
              ].map(category => (
                <div 
                  key={category.path}
                  className="category-card"
                  onClick={() => history.push(category.path)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <h3>{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </IonContent>
      </IonPage>
    </Layout>
  );
};

export default HomeAdmin;
