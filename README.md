
# 🏛️ Sistema de Consulta SRI + ANT  
Microservicio en Java + Frontend React + Caché para consultas del SRI y ANT  
---

Este sistema permite consultar tres fuentes oficiales ecuatorianas:

1. **Contribuyentes del SRI** (validar existencia y obtener datos de persona natural)  
2. **Datos vehiculares del SRI** (por número de placa)  
3. **Puntos de licencia de la ANT** (con caché por baja disponibilidad)

Desarrollado conforme a la consigna de la materia **ISWZ2202 – Diseño y Arquitectura de Software**.

---

## 🚀 Tecnologías utilizadas

### 🔹 Backend (Java – Spring Boot 3)
- Java 17  
- Spring Web  
- WebFlux (WebClient)  
- Spring Cache  
- Maven  

### 🔹 Frontend (React)
- React + Vite  
- Axios  

### 🔹 Caché
- In-Memory Cache (Spring Cache)  
- *Opcional:* Redis Cloud (configurable)

---

# 🧩 Arquitectura (Modelo C4)

Los diagramas se encuentran creados en **IcePanel** y cada uno contiene un **enlace directo a este repositorio**, cumpliendo la consigna del profesor.

### ✔ Nivel 1 – Context Diagram  
Muestra:
- Usuario  
- Sistema de Consulta SRI + ANT  
- SRI (servicio externo)  
- ANT (servicio externo)

### ✔ Nivel 2 – App Diagram  
Descompone el sistema principal en:
- Frontend React  
- Backend Java  
- Módulo de Caché  
- Servicios externos

### ✔ Nivel 3 – Component Diagram  
Detalla los componentes internos del backend:
- SriAntController  
- SriAntService  
- SRIClient  
- ANTClient  
- AntCache  


# 🛠️ Ejecución del Backend

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/ashleesoledispa/sri-ant-backend3

### 2️⃣ Ejecutar con Maven

```bash
mvn spring-boot:run
```

### 3️⃣ Abrir en navegador

```
http://localhost:8080/
```

---

# 🛠️ Ejecución del Frontend (React)

### 1️⃣ Ir al directorio del frontend

```bash
cd frontend
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Ejecutar React

```bash
npm run dev
```

Abrir:

```
http://localhost:5173
```

---

# 🧪 Pruebas recomendadas

### ✔ RUC válido para pruebas (SRI)

```
1768152560001
```

### ✔ Email cualquiera

```
ejemplo@mail.com
```

### ✔ Placa de vehículo

```
ABC-1234   (para pruebas)
MBC-1561   (si el RUC asociado coincide)
```

---

# 🔐 Endpoints expuestos por el Backend

### ✔ Validar existencia del contribuyente

```
GET /api/sri/existe?ruc={ruc}
```

### ✔ Obtener datos del contribuyente

```
GET /api/sri/obtener?ruc={ruc}
```

### ✔ Consultar vehículo

```
GET /api/vehiculo?placa={placa}
```

### ✔ Consultar puntos de licencia ANT (con caché)

```
GET /api/ant/puntos?cedula={cedula}
```

---

# ⚙️ Patrón de caché implementado

Debido a la baja disponibilidad del servicio ANT, se implementó un patrón:

## ⭐ Cache-Aside (Look-Aside Pattern)

1. El backend consulta primero el caché.
2. Si existe → devuelve el dato sin llamar a ANT.
3. Si no existe → llama a ANT.
4. Si ANT responde → guarda en caché.
5. Si ANT falla → devuelve el último valor guardado.

Esto garantiza disponibilidad incluso si ANT está caída.

---

# 👩‍💻 Autor

**Ashlee Soledispa**
ISWZ2202 – Diseño y Arquitectura de Software
