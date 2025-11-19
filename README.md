# 🟦 Sistema de Consulta SRI & ANT – Diseño y Arquitectura de Software

Este proyecto implementa un sistema web que permite consultar información del SRI y la ANT a partir de la cédula/RUC de una persona natural y la placa de un vehículo.  
Incluye un patrón de diseño para manejar la baja disponibilidad de la ANT utilizando **cache-aside** y un **proxy interno**.

Proyecto desarrollado en **Spring Boot 3**, **Thymeleaf**, **WebClient** y **caché en memoria**.

---

## ✨ Características principales

✔ Formulario web estilizado minimalista con colores del SRI  
✔ Consulta al SRI para verificar si un RUC existe como contribuyente  
✔ Transformación automática de cédula → RUC persona natural (cédula + "001")  
✔ Obtención de datos del contribuyente vía API REST del SRI  
✔ Obtención de datos del vehículo vía API REST del SRI  
✔ Consulta de puntos de licencia en la ANT  
✔ Implementación del patrón **Cache-Aside + Proxy** para fallas de la ANT  
✔ Interfaz moderna y responsiva (HTML + CSS)

---

## 🏗 Arquitectura del Sistema

- **Frontend:** Thymeleaf + HTML + CSS minimalista  
- **Backend:** Spring Boot (Java 17)  
- **Cliente HTTP:** WebClient (reactivo)  
- **Caché:** Spring Cache + ConcurrentMapCache  
- **Patrón usado:** Proxy + Cache-Aside Pattern  

### 📌 Flujo General

1. El usuario ingresa:  
   - Email  
   - Cédula/RUC  
   - Placa  
2. El sistema convierte la cédula en RUC (si son 10 dígitos → agrega “001”).  
3. Llama a la API del SRI para verificar si es contribuyente.  
4. Si es válido:  
   - Muestra información del contribuyente  
   - Muestra datos del vehículo  
   - Consulta puntos de licencia en la ANT  
5. La consulta de ANT pasa por un **servicio proxy** que almacena en caché.  
6. Si ANT está caída → se devuelve la última respuesta guardada.

---

## 🔧 Tecnologías utilizadas

- Java 17  
- Spring Boot 3.5.7  
- Spring Cache  
- Spring WebClient (reactivo)  
- Thymeleaf  
- Maven  
- HTML + CSS minimalista  

---

## 🌐 APIs utilizadas

### ✔ Validar si un RUC es contribuyente
```

[https://srienlinea.sri.gob.ec/sri-catastro-sujeto-servicio-internet/rest/ConsolidadoContribuyente/existePorNumeroRuc?numeroRuc=](https://srienlinea.sri.gob.ec/sri-catastro-sujeto-servicio-internet/rest/ConsolidadoContribuyente/existePorNumeroRuc?numeroRuc=)

```

### ✔ Obtener información del contribuyente
```

[https://srienlinea.sri.gob.ec/sri-catastro-sujeto-servicio-internet/rest/ConsolidadoContribuyente/obtenerPorNumerosRuc?&ruc=](https://srienlinea.sri.gob.ec/sri-catastro-sujeto-servicio-internet/rest/ConsolidadoContribuyente/obtenerPorNumerosRuc?&ruc=)

```

### ✔ Obtener datos del vehículo
```

[https://srienlinea.sri.gob.ec/sri-matriculacion-vehicular-recaudacion-servicio-internet/rest/BaseVehiculo/obtenerPorNumeroPlacaOPorNumeroCampvOPorNumeroCpn?numeroPlacaCampvCpn=](https://srienlinea.sri.gob.ec/sri-matriculacion-vehicular-recaudacion-servicio-internet/rest/BaseVehiculo/obtenerPorNumeroPlacaOPorNumeroCampvOPorNumeroCpn?numeroPlacaCampvCpn=)

```

### ✔ Obtener puntos de licencia (ANT)
```

[https://consultaweb.ant.gob.ec/PortalWEB/paginas/clientes/clp_grid_citaciones.jsp?ps_tipo_identificacion=CED&ps_identificacion=XXXXXX&ps_placa=](https://consultaweb.ant.gob.ec/PortalWEB/paginas/clientes/clp_grid_citaciones.jsp?ps_tipo_identificacion=CED&ps_identificacion=XXXXXX&ps_placa=)

````

---

## 🚀 Cómo ejecutar el proyecto

### 1️⃣ **Clonar el repositorio**
```bash
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo
````

### 2️⃣ **Ejecutar con Maven**

```bash
mvn spring-boot:run
```

### 3️⃣ **O ejecutar desde IntelliJ IDEA**

* Abrir el proyecto
* Esperar a que Maven descargue dependencias
* Abrir la clase:

  ```
  SriAntBackend3Application.java
  ```
* Clic en **Run ▶️**

---

## 🧪 Cómo probar el sistema

Una vez ejecutado, abrir en navegador:

```
http://localhost:8080/
```

### ✔ Ejemplo de prueba funcional (RUC que siempre funciona)

En el formulario:

* Email: [prueba@gmail.com](mailto:prueba@gmail.com)
* Cédula/RUC: `1768152560001`
* Placa: cualquier placa (ej: `ABC-1234`)

Esto mostrará datos válidos del contribuyente.

### ✔ Para probar vehículo y ANT:

Usa el **RUC real del dueño del vehículo** y la placa verdadera.

Si el vehículo pertenece al RUC → SRI devuelve datos correctos
Si no → “El vehículo no existe” (normal)

### ✔ Probar caché de ANT

1. Ejecuta una consulta con una cédula válida → Se guarda en caché
2. Apaga tu internet o bloquea la web ANT
3. Ejecuta la misma consulta →
   **TE DEVUELVE EL RESULTADO DESDE CACHÉ**

Esto demuestra que el patrón Cache-Aside está funcionando.

---

## 🧱 Patrón aplicado: Cache-Aside + Proxy

### 1. Servicio real (ANT)

```java
public Mono<String> consultarPuntos(String cedula)
```

### 2. Servicio Proxy con caché

```java
@Cacheable(value = "antCache", key = "#cedula")
public Mono<String> obtenerPuntosConCache(String cedula)
```

El Proxy:

* Intercepta la llamada
* Busca primero en caché
* Si no existe, llama a ANT
* Guarda la respuesta
* Si ANT falla → devuelve el dato guardado previamente

Perfecto para **servicios con baja disponibilidad**.

## 👩‍💻 Autora

**Ashlee Soledispa Villamar**
Universidad de las Américas – UDLA
Ingeniería en Software
Materia: Diseño y Arquitectura de Software



y seguimos.
```
