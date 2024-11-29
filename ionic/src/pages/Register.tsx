import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton, IonCheckbox, IonList, IonSelect, IonSelectOption, IonText, useIonToast } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Register: React.FC = () => {
  const history = useHistory();
  const [present] = useIonToast();
  const [username, setUsername] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleRegister = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:3000/register', {
          username,
          rut,
          email,
          region,
          comuna,
          password
        });

        // Guardar el token y datos del usuario
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        present({
          message: 'Registro exitoso',
          duration: 2000,
          position: 'top',
          color: 'success'
        });

        // Redireccionar al home
        history.push('/home');
      } catch (error: any) {
        present({
          message: error.response?.data?.error || 'Error al registrar usuario',
          duration: 3000,
          position: 'top',
          color: 'danger'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const regiones = [
    'Región Metropolitana',
    'Valparaíso',
    'Biobío',
    'La Araucanía',
    'Antofagasta'
  ];

  const comunasPorRegion: { [key: string]: string[] } = {
    'Región Metropolitana': ['Santiago', 'Providencia', 'Las Condes', 'Ñuñoa'],
    'Valparaíso': ['Viña del Mar', 'Valparaíso', 'Quilpué', 'Villa Alemana'],
    'Biobío': ['Concepción', 'Talcahuano', 'Chiguayante', 'San Pedro de la Paz'],
    'La Araucanía': ['Temuco', 'Padre Las Casas', 'Villarrica', 'Pucón'],
    'Antofagasta': ['Antofagasta', 'Calama', 'Tocopilla', 'Mejillones']
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
            <IonSelect value={region} onIonChange={e => {
              setRegion(e.detail.value!);
              setComuna(''); 
            }}>
              {regiones.map(reg => (
                <IonSelectOption key={reg} value={reg}>{reg}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          {errors.region && <IonText color="danger">{errors.region}</IonText>}
          
          <IonItem>
            <IonLabel position="floating">Comuna</IonLabel>
            <IonSelect value={comuna} onIonChange={e => setComuna(e.detail.value!)} disabled={!region}>
              {region && comunasPorRegion[region]?.map(com => (
                <IonSelectOption key={com} value={com}>{com}</IonSelectOption>
              ))}
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
          
          <IonButton 
            expand="full" 
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Register;