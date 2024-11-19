import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonList, IonText } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!username) newErrors.username = 'El nombre de usuario es obligatorio';
    if (!password) newErrors.password = 'La contraseña es obligatoria';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username,
          password
        });
        const { token, roll } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('roll', roll);
        console.log('Inicio de sesión exitoso', roll);
        // Redirige según el rol del usuario
        //  if (roll === 'admin') {
        //   // Redireccionar a la página de administrador
        // } else {
        //   // Redireccionar a la página de usuario normal
        // }
      } catch (error) {
        console.error('Error al iniciar sesión', error);
      }
    } else {
      console.log('Formulario inválido');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Nombre de usuario</IonLabel>
            <IonInput value={username} onIonChange={e => setUsername(e.detail.value!)} />
          </IonItem>
          {errors.username && <IonText color="danger">{errors.username}</IonText>}
          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} />
          </IonItem>
          {errors.password && <IonText color="danger">{errors.password}</IonText>}
          <IonButton expand="full" onClick={handleLogin}>Iniciar Sesión</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Login;
