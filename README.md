# BSC Management System

Sistema de gestión para BSC: Inventario, usuarios, pedidos y reportes.

## Tecnologías

- **Frontend:** Angular + Angular Material
- **Backend:** .NET 6 (API RESTful, JWT)
- **Base de datos:** SQL Server

## Estructura del Proyecto
Arquitectura 3 capas (UI, Business Logic, Data Access):
UI (Presentación):
Todo el código Angular (componentes, templates, módulos) es la capa de presentación.

Business Logic (Lógica de Negocio):
En Angular, la lógica de negocio está en los servicios (services/), donde se gestionan reglas, validaciones y comunicación con la API.
En el backend (.NET), la lógica de negocio se ubica en los controladores y servicios.

Data Access (Acceso a Datos):
En Angular, los servicios (api.service.ts) consumen la API REST, pero el acceso real a datos está en el backend.
En .NET, el acceso a datos está en el DbContext y los modelos de Entity Framework.

### Frontend (Angular):
```
bsc-management-frontend/
├── angular.json
├── package.json
├── README.md
├── src/
│   ├── app/
│   │   ├── app.component.*
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── models/
│   │   │   └── services/
│   │   ├── modules/
│   │   │   ├── admin/
│   │   │   │   └── users/
│   │   │   │       ├── components/
│   │   │   │       │   └── user-form/
│   │   │   │       ├── users.component.*
│   │   │   │       ├── services/
│   │   │   │       └── models/
│   │   │   ├── inventory/
│   │   │   │   ├── products/
│   │   │   │   ├── reports/
│   │   │   └── sales/
│   │   │       └── orders/
│   │   └── environments/
│   ├── assets/
│   └── index.html
└── tsconfig.json
```
- Módulo de usuarios (CRUD)
- Módulo de productos (CRUD)
- Módulo de pedidos 
- Reportes de inventario y pedidos

### Backend (ASP.NET Core .NET 6)
```
BSC.API/
├── Controllers/
│   ├── AuthController.cs (login JWT funcional)
│   ├── UsuariosController.cs (CRUD completo)
│   ├── ProductController.cs (CRUD completo)
│   ├── PedidosController.cs (GET funcional, POST en progreso)
│   ├── ReportesController.cs (GET para vistas SQL)
│   └── ... (Otros controladores: AuditoriaProductosController, DetallePedidosController, PerfilesController)
├── Models/
│   ├── Usuario.cs
│   ├── Producto.cs
│   ├── Pedido.cs
│   └── ... (todas las entidades: AuditoriaProducto, DetallePedido, Perfil)
├── Data/
│   └── BSCDbContext.cs (configurado con relaciones)
└── appsettings.json (JWT y SQL Server)
```

## Instalación y ejecución

### Frontend
```sh
cd bsc-management-frontend
npm install
ng serve
```

### Backend
```sh
cd BSC.API
dotnet restore
dotnet run
```

## Funcionalidades

- Autenticación JWT
- Gestión de usuarios (CRUD)
- Gestión de productos (CRUD)
- Gestión y consulta de pedidos
- Reportes de inventario y pedidos

## Diagrama del sistema

https://drive.google.com/file/d/1rgWLPHNrqaUs3a-5gGV3HuyyFGvvxZ4-/view?usp=sharing

---

## Licencia

MIT
