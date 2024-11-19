import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonList, IonText } from '@ionic/react';
import React, { useState } from 'react';

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

  const handleLogin = () => {
    if (validateForm()) {
      // Lógica para manejar el inicio de sesión
      console.log('Formulario válido');
      fetch('localhost:3000')
        .then((res)=>{
          res.json().then((data)=>{
            localStorage.setItem("token" , data.token);
          })
        });
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