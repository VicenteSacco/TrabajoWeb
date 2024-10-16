import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';


const Home: React.FC = () => {
  const history = useHistory();

  const products = [
    {
      id: 1,
      name: 'Cooler',
      image: 'https://media.solotodo.com/media/products/1609958_picture_1654805920.jpg',
      link: '/product/cooler'
    },
    {
      id: 2,
      name: 'Tarjeta Gráfica',
      image: 'https://media.solotodo.com/media/products/1777144_picture_1688474884.png',
      link: '/product/gpu'
    },
    {
      id: 3,
      name: 'Memoria RAM',
      image: 'https://media.solotodo.com/media/products/1647073_picture_1664272071.jpg',
      link: '/product/ram'
    },
    // Agrega más productos según sea necesario
  ];

  const handleProductClick = (link: string) => {
    history.push(link);
  };

  return (
    <Layout>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Inicio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            {products.map(product => (
              <div key={product.id} onClick={() => handleProductClick(product.link)}>
                <img src={product.image} alt={product.name} />
                <p className="legend">{product.name}</p>
              </div>
            ))}
          </Carousel>
        </IonContent>
      </IonPage>
    </Layout>
  );
};

export default Home;