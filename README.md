# writeService
Creación, actualización y borrado en firestore de documentos.



Aquí tienes el informe completo sobre el servicio `WriteService`, que te proporcionará toda la información necesaria para comprender su potencial y utilizarlo de forma óptima en todos tus proyectos.

-----

### **Informe Técnico: `WriteService`**

El `WriteService` es el servicio de escritura definitivo para tus proyectos Angular. Siguiendo los mismos principios que el `ReadService`, centraliza todas las operaciones de creación, actualización y borrado de documentos en Cloud Firestore. Su diseño genérico y eficiente te permite construir componentes de formulario y gestión de datos que son extremadamente simples y fáciles de mantener.

-----

### **Capacidades Clave del Servicio**

El servicio está diseñado para ser una solución integral, manejando tres métodos principales de forma asincrónica:

1.  **`crearDocumento(collectionName, data)`**: Se utiliza para agregar un nuevo documento a una colección. El servicio se encarga de generar el `id` del documento y devuelve su valor para que puedas usarlo en tu aplicación.
2.  **`actualizarDocumento(collectionName, docId, data)`**: Permite modificar los datos de un documento existente. Solo es necesario proporcionar los campos que se desean cambiar, gracias al tipo `Partial<T>`.
3.  **`borrarDocumento(collectionName, docId)`**: Elimina un documento de la colección de forma permanente.

### **Características de la Arquitectura**

  * **Generación de Tipos (`WriteService<T>`):** El servicio es genérico, lo que le permite trabajar con cualquier interfaz de datos. Esto elimina la necesidad de crear un servicio de escritura para cada colección, manteniendo el código DRY (Don't Repeat Yourself).
  * **Gestión Centralizada del Estado:** El `WriteService` gestiona el estado de cada operación (cargando, éxito, error). Los componentes solo necesitan consumir la señal `states` para saber el estado de la operación y ajustar su UI, sin tener que manejar manualmente la lógica `try/catch` para cada llamada.
  * **Optimización y Modernismo:** Utiliza `async/await` para un manejo de promesas limpio y sencillo, y se integra perfectamente con el patrón de `signals` de Angular para una reactividad moderna.

-----

### **Cómo Usar el `WriteService` en tus Componentes**

La simplicidad es la clave. Un componente que utiliza el `WriteService` solo debe inyectarlo y llamar al método que necesite.

#### **1. Configuración del Componente**

En tu componente, inyecta el servicio y consume la señal `states` para controlar la interfaz de usuario durante la operación.

```typescript
import { Component, inject } from '@angular/core';
import { WriteService } from '../../../firebase/services/write.service';
import { StatesEnum } from '../../../states/states.enum';

// Suponiendo que tienes una interfaz para tus productos
export interface Product {
    id?: string;
    name: string;
    price: number;
}

@Component({
  selector: 'app-product-form',
  // ...
})
export class ProductFormComponent {
  private writeService = inject(WriteService<Product>);

  public states = this.writeService.states;
  public statesEnum = StatesEnum;
}
```

#### **2. Ejemplo de Uso: Creación de un Documento**

Para crear un documento, simplemente llama al método `crearDocumento` con el nombre de la colección y los datos del nuevo objeto.

```typescript
// En el mismo ProductFormComponent
public async onCrearProducto(productData: Product): Promise<void> {
    try {
        const docId = await this.writeService.crearDocumento('productos', productData);
        // El servicio cambia el estado a SUCCESS
        console.log(`Documento creado con ID: ${docId}`);
        // Puedes agregar aquí más lógica de negocio, como resetear el formulario
    } catch (error: any) {
        // El servicio ya ha establecido el estado en ERROR
        console.error('La operación falló.');
        // No es necesario un manejo de error complejo aquí, el servicio ya lo hizo.
    }
}
```

#### **3. Ejemplo de Uso: Actualización de un Documento**

Para actualizar un documento, el proceso es similar. Solo necesitas el `id` del documento y el objeto con los campos que quieres modificar.

```typescript
// En el mismo ProductFormComponent
public async onActualizarPrecio(docId: string, newPrice: number): Promise<void> {
    try {
        await this.writeService.actualizarDocumento('productos', docId, { price: newPrice });
        // El servicio cambia el estado a SUCCESS
        console.log('Documento actualizado correctamente.');
    } catch (error: any) {
        console.error('La actualización falló.');
    }
}
```

#### **4. Ejemplo de Uso: Borrado de un Documento**

Para borrar un documento, solo se requiere el `id` del documento.

```typescript
// En el mismo ProductFormComponent
public async onBorrarProducto(docId: string): Promise<void> {
    try {
        await this.writeService.borrarDocumento('productos', docId);
        // El servicio cambia el estado a SUCCESS
        console.log('Documento eliminado correctamente.');
    } catch (error: any) {
        console.error('La eliminación falló.');
    }
}
```

-----

### **Conclusión**

El `WriteService` es el complemento perfecto para tu `ReadService`. Juntos, forman un conjunto de servicios de base de datos que son genéricos, reusables y que siguen una arquitectura limpia y moderna. Con estos dos servicios, tienes la solución definitiva para todas tus operaciones de lectura y escritura en Firebase, lo que te permitirá construir aplicaciones con gran potencial y escala, manteniendo la simplicidad y la excelencia en el código.
