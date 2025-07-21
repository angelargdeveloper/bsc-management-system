# BSC Management System

Sistema de gestión para BSC: Inventario, usuarios, pedidos y reportes.

## Tecnologías

- **Frontend:** Angular + Angular Material
- **Backend:** .NET 6 (API RESTful, JWT)
- **Base de datos:** SQL Server

## Estructura del Proyecto

### Frontend (Angular)
- Módulo de usuarios (CRUD)
- Módulo de productos (CRUD)
- Módulo de pedidos (en progreso)
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

![Diagrama Eraser.io](https://app.eraser.io/workspace/wXEA2VcQChnrOdxZnjPD?origin=share)

---

## Licencia

MIT
