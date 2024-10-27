EP2 

Decidimos optar por un modelo de base de datos no relacional, ya que por la naturaleza de nuestra página web, la flexibilidad y escalabilidad de MongoDB se alinean perfectamente con nuestras necesidades.
MongoDB nos permite manejar grandes volúmenes de datos no estructurados de manera eficiente, y adaptarnos a los cambios en el esquema de datos sin necesidad de grandes reestructuraciones.

aqui el ejemplo de los 3 documentos json:


Productos (productos)
{

    "_id": "prod001",
    "nombre": "Laptop XYZ",
    "categoria": "notebooks",
    "marca": "Marca A",
    "precio": 1200,
    "stock": 50,
    "especificaciones":{
      "procesador": "Intel i7",
      "ram": "16GB",
      "almacenamiento": "512GB SSD"
      }
  }

  



Usuarios (usuarios)
{

    "_id": "user001",
    "nombre": "Juan Perez",
    "email": "juan.perez@example.com",
    "direccion": "Calle Falsa 123",
    "wishlist": ["prod001", "prod002"],
    "carrito": [
      {
       "producto_id": "prod003",
        "cantidad": 2
      }
    ]

}




Pedidos (pedidos)
{

    "_id": "pedido001",
    "usuario_id": "user001",
    "productos": [
      {
        "producto_id": "prod001",
        "cantidad": 1,
        "precio": 1200
      },
      {
        "producto_id": "prod003",
        "cantidad": 2,
        "precio": 300
      }
    ],
    "total": 1800,
    "fecha": "2024-10-25"
  
}




En cuanto a los patrones de diseño que usaremos en la pagina web seran:

Drawer y de desborde

estos diseños los usamos en la creacion de los mockups y los mantendremos para el proyecto.
En la parte movil de nuestra pagina web se puede apreciar como los menús son de Drawer y cuando se quiere aplicar un filtro en el producto podemos apreciar el desborde.


