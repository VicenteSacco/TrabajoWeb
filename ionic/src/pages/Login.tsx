import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonList, IonText } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/authStore';

const Login: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [pass, setPass] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const history = useHistory();
  const { login } = useAuthStore();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!usuario) newErrors.usuario = 'El nombre de usuario es obligatorio';
    if (!pass) newErrors.pass = 'La contraseña es obligatoria';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          usuario,
          pass,
        });
  
        const { token, user } = response.data;
  
       
        if (!user) {
          console.error('User  data is undefined');
          setErrors({ login: 'Error en la respuesta del servidor' });
          return; 
        }
  
        
        const userData = {
          ...user,
          role: user.role || 'user' 
        };
  
        
        login(token, userData);
  
        console.log('Login successful, role:', userData.role);
  
        // Redirigir según el rol
        if (userData.role === 'admin') {
          history.push('/HomeAdmin/');
        } else {
          history.push('/home');
        }
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error('Error al iniciar sesión', error.response ? error.response.data : error.message);
          setErrors({ login: 'Usuario o contraseña incorrectos' });
        } else {
          console.error('Error desconocido', error);
          setErrors({ login: 'Error al iniciar sesión' });
        }
      }
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
            <IonInput value={usuario} onIonChange={e => setUsuario(e.detail.value!)} />
          </IonItem>
          {errors.usuario && <IonText color="danger">{errors.usuario}</IonText>}
          
          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput type="password" value={pass} onIonChange={e => setPass(e.detail.value!)} />
          </IonItem>
          {errors.pass && <IonText color="danger">{errors.pass}</IonText>}
          {errors.login && <IonText color="danger">{errors.login}</IonText>}
          
          <IonButton expand="full" onClick={handleLogin}>Iniciar Sesión</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Login;