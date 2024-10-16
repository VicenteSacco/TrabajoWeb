import './ExploreContainer.css'; // Importa el archivo de estilos

// Define una interfaz para las propiedades del componente
interface ContainerProps { }

// Define el componente funcional utilizando la interfaz para las propiedades
const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    // Utiliza JSX para definir la estructura del HTML
    <div id="container">
      Hola mundo
    </div>
  );
};

// Exporta el componente para que pueda ser utilizado en otros archivos
export default ExploreContainer;