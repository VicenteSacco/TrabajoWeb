import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonCheckbox, IonList, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import React, { useState } from 'react';
import './register.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!username) newErrors.username = 'El nombre de usuario es obligatorio';
    if (!rut) newErrors.rut = 'El RUT es obligatorio';
    if (!email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!validateEmail(email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    if (!region) newErrors.region = 'La región es obligatoria';
    if (!comuna) newErrors.comuna = 'La comuna es obligatoria';
    if (!password) newErrors.password = 'La contraseña es obligatoria';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!termsAccepted) newErrors.termsAccepted = 'Debe aceptar los términos y condiciones';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      // Lógica para manejar el registro
      console.log('Formulario válido');
    } else {
      console.log('Formulario inválido');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrarse</IonTitle>
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
            <IonLabel position="floating">RUT</IonLabel>
            <IonInput value={rut} onIonChange={e => setRut(e.detail.value!)} />
          </IonItem>
          {errors.rut && <IonText color="danger">{errors.rut}</IonText>}
          <IonItem>
            <IonLabel position="floating">Correo Electrónico</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={e => setEmail(e.detail.value!)}
              className={errors.email ? 'input-error' : ''}
            />
          </IonItem>
          {errors.email && <IonText color="danger">{errors.email}</IonText>}
          <IonItem>
            <IonLabel position="floating">Región</IonLabel>
            <IonSelect value={region} onIonChange={e => setRegion(e.detail.value!)}>
              <IonSelectOption value="region1">Región 1</IonSelectOption>
              <IonSelectOption value="region2">Región 2</IonSelectOption>
              {/* Agregar más opciones de región según sea necesario */}
            </IonSelect>
          </IonItem>
          {errors.region && <IonText color="danger">{errors.region}</IonText>}
          <IonItem>
            <IonLabel position="floating">Comuna</IonLabel>
            <IonSelect value={comuna} onIonChange={e => setComuna(e.detail.value!)}>
              <IonSelectOption value="comuna1">Comuna 1</IonSelectOption>
              <IonSelectOption value="comuna2">Comuna 2</IonSelectOption>
              {/* Agregar más opciones de comuna según sea necesario */}
            </IonSelect>
          </IonItem>
          {errors.comuna && <IonText color="danger">{errors.comuna}</IonText>}
          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} />
          </IonItem>
          {errors.password && <IonText color="danger">{errors.password}</IonText>}
          <IonItem>
            <IonLabel position="floating">Confirmación de contraseña</IonLabel>
            <IonInput type="password" value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!)} />
          </IonItem>
          {errors.confirmPassword && <IonText color="danger">{errors.confirmPassword}</IonText>}
          <IonItem>
            <IonLabel>Acepto los términos y condiciones</IonLabel>
            <IonCheckbox checked={termsAccepted} onIonChange={e => setTermsAccepted(e.detail.checked)} />
          </IonItem>
          {errors.termsAccepted && <IonText color="danger">{errors.termsAccepted}</IonText>}
          <IonButton expand="full" onClick={handleRegister}>Registrarse</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Register;
