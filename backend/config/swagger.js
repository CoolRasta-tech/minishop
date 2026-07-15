const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MiniShop API",
            version: "1.0.0",
            description:
                "API backend per l'e-commerce di videogiochi MiniShop — Progetto Fondamenti del Web",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
        tags: [
            { name: "AuthController", description: "Registrazione e autenticazione utente" },
            { name: "ProductController", description: "Gestione catalogo videogiochi" },
            { name: "OrderController", description: "Creazione e consultazione ordini" },
            { name: "WishlistController", description: "Gestione lista desideri utente" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Inserisci il token JWT ottenuto dal login",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "665a1b2c3d4e5f6789012345" },
                        username: { type: "string", example: "pier" },
                        email: {
                            type: "string",
                            format: "email",
                            example: "pier@test.com",
                        },
                        role: {
                            type: "string",
                            enum: ["user", "admin"],
                            example: "user",
                        },
                    },
                },
                RegisterRequest: {
                    type: "object",
                    required: ["username", "email", "password"],
                    properties: {
                        username: { type: "string", example: "pier" },
                        email: {
                            type: "string",
                            format: "email",
                            example: "pier@test.com",
                        },
                        password: { type: "string", minLength: 6, example: "secret123" },
                    },
                },
                LoginRequest: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "pier@test.com",
                        },
                        password: { type: "string", example: "secret123" },
                    },
                },
                LoginResponse: {
                    type: "object",
                    properties: {
                        token: { type: "string", example: "eyJhbGciOiJIUzI1NiIs..." },
                        user: { $ref: "#/components/schemas/User" },
                    },
                },
                Product: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "665a1b2c3d4e5f6789012345" },
                        name: { type: "string", example: "God of War Ragnarok" },
                        description: {
                            type: "string",
                            example: "Kratos e Atreus affrontano il destino di Asgard.",
                        },
                        price: { type: "number", example: 69.99 },
                        imageUrl: {
                            type: "string",
                            example: "https://example.com/god-of-war.jpg",
                        },
                        category: {
                            type: "string",
                            enum: ["ps5", "xbox", "nintendo", "pc", "retro"],
                            example: "ps5",
                        },
                        genre: {
                            type: "string",
                            enum: [
                                "action",
                                "rpg",
                                "sport",
                                "horror",
                                "adventure",
                                "simulation",
                                "fighting",
                                "platform",
                            ],
                            example: "action",
                        },
                        stock: { type: "integer", example: 20 },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                ProductRequest: {
                    type: "object",
                    required: ["name", "price", "category", "stock"],
                    properties: {
                        name: { type: "string", example: "God of War Ragnarok" },
                        description: {
                            type: "string",
                            example: "Kratos e Atreus affrontano il destino di Asgard.",
                        },
                        price: { type: "number", example: 69.99 },
                        imageUrl: {
                            type: "string",
                            example: "https://example.com/god-of-war.jpg",
                        },
                        category: {
                            type: "string",
                            enum: ["ps5", "xbox", "nintendo", "pc", "retro"],
                            example: "ps5",
                        },
                        genre: {
                            type: "string",
                            enum: [
                                "action",
                                "rpg",
                                "sport",
                                "horror",
                                "adventure",
                                "simulation",
                                "fighting",
                                "platform",
                            ],
                            example: "action",
                        },
                        stock: { type: "integer", example: 20 },
                    },
                },
                ProductUpdateRequest: {
                    type: "object",
                    properties: {
                        price: { type: "number", example: 59.99 },
                        stock: { type: "integer", example: 15 },
                    },
                },
                OrderItem: {
                    type: "object",
                    properties: {
                        product: { $ref: "#/components/schemas/Product" },
                        quantity: { type: "integer", example: 2 },
                        priceAtOrder: { type: "number", example: 69.99 },
                    },
                },
                Order: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "665a1b2c3d4e5f6789012345" },
                        user: { type: "string", example: "665a1b2c3d4e5f6789054321" },
                        items: {
                            type: "array",
                            items: { $ref: "#/components/schemas/OrderItem" },
                        },
                        totalPrice: { type: "number", example: 139.98 },
                        status: {
                            type: "string",
                            enum: ["pending", "confirmed", "shipped", "delivered"],
                            example: "pending",
                        },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                OrderRequest: {
                    type: "object",
                    required: ["items"],
                    properties: {
                        items: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    productId: {
                                        type: "string",
                                        example: "665a1b2c3d4e5f6789012345",
                                    },
                                    quantity: { type: "integer", example: 2 },
                                },
                            },
                        },
                    },
                },
                Error: {
                    type: "object",
                    properties: {
                        message: { type: "string", example: "Errore del server" },
                        error: { type: "string", example: "Dettaglio errore" },
                    },
                },
            },
        },
        paths: {
            "/health": {
                get: {
                    summary: "Health check",
                    responses: {
                        200: {
                            description: "API attiva",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "MiniShop API is running",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },

            "/api/auth/register": {
                post: {
                    tags: ["AuthController"],
                    summary: "Registrazione nuovo utente",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/RegisterRequest" },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: "Registrazione completata",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Registrazione utente completata",
                                            },
                                            user: { $ref: "#/components/schemas/User" },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: "Nome o email gia registrati",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        500: {
                            description: "Errore del server",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                    },
                },
            },

            "/api/auth/login": {
                post: {
                    tags: ["AuthController"],
                    summary: "Login utente",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/LoginRequest" },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "Login effettuato",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/LoginResponse" },
                                },
                            },
                        },
                        401: {
                            description: "Email o password non validi",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        500: {
                            description: "Errore del server",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                    },
                },
            },

            "/api/products": {
                get: {
                    tags: ["ProductController"],
                    summary: "Lista prodotti con filtri opzionali",
                    parameters: [
                        {
                            name: "category",
                            in: "query",
                            schema: {
                                type: "string",
                                enum: ["ps5", "xbox", "nintendo", "pc", "retro"],
                            },
                            description: "Filtra per piattaforma",
                        },
                        {
                            name: "genre",
                            in: "query",
                            schema: {
                                type: "string",
                                enum: [
                                    "action",
                                    "rpg",
                                    "sport",
                                    "horror",
                                    "adventure",
                                    "simulation",
                                    "fighting",
                                    "platform",
                                ],
                            },
                            description: "Filtra per genere",
                        },
                        {
                            name: "search",
                            in: "query",
                            schema: { type: "string" },
                            description: "Cerca nel nome del prodotto",
                        },
                        {
                            name: "sort",
                            in: "query",
                            schema: {
                                type: "string",
                                enum: ["name", "price", "stock"],
                            },
                            description: "Ordinamento (default: data di creazione)",
                        },
                    ],
                    responses: {
                        200: {
                            description: "Lista dei prodotti",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: { $ref: "#/components/schemas/Product" },
                                    },
                                },
                            },
                        },
                        500: {
                            description: "Errore del server",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                    },
                },
                post: {
                    tags: ["ProductController"],
                    summary: "Crea un nuovo prodotto (solo Admin)",
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ProductRequest" },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: "Prodotto creato",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Product" },
                                },
                            },
                        },
                        401: {
                            description: "Token mancante o non valido",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        403: {
                            description: "Permessi insufficienti (richiesto ruolo admin)",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        500: {
                            description: "Errore del server",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                    },
                },
            },

            "/api/products/{id}": {
                get: {
                    tags: ["ProductController"],
                    summary: "Dettaglio singolo prodotto",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                            description: "ID del prodotto",
                        },
                    ],
                    responses: {
                        200: {
                            description: "Dettaglio del prodotto",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Product" },
                                },
                            },
                        },
                        404: {
                            description: "Prodotto non trovato",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        500: {
                            description: "Errore del server",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                    },
                },
                put: {
                    tags: ["ProductController"],
                    summary: "Aggiorna prezzo e stock (solo Admin)",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                            description: "ID del prodotto",
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ProductUpdateRequest" },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "Prodotto aggiornato",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Product" },
                                },
                            },
                        },
                        401: {
                            description: "Token mancante o non valido",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        403: {
                            description: "Permessi insufficienti (richiesto ruolo admin)",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        404: {
                            description: "Prodotto non trovato",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        500: {
                            description: "Errore del server",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                    },
                },
                delete: {
                    tags: ["ProductController"],
                    summary: "Elimina un prodotto (solo Admin)",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                            description: "ID del prodotto",
                        },
                    ],
                    responses: {
                        200: {
                            description: "Prodotto eliminato",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Prodotto eliminato",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: "Token mancante o non valido",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        403: {
                            description: "Permessi insufficienti (richiesto ruolo admin)",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        404: {
                            description: "Prodotto non trovato",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        500: {
                            description: "Errore del server",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                    },
                },
            },

            "/api/orders": {
                get: {
                    tags: ["OrderController"],
                    summary: "Lista ordini dell'utente loggato",
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: "Lista degli ordini",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: { $ref: "#/components/schemas/Order" },
                                    },
                                },
                            },
                        },
                        401: {
                            description: "Token mancante o non valido",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        500: {
                            description: "Errore del server",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                    },
                },
                post: {
                    tags: ["OrderController"],
                    summary: "Crea un nuovo ordine dal carrello",
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/OrderRequest" },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: "Ordine creato",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Order" },
                                },
                            },
                        },
                        400: {
                            description: "Stock insufficiente o prodotto non valido",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        401: {
                            description: "Token mancante o non valido",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        404: {
                            description: "Prodotto non trovato",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        500: {
                            description: "Errore del server",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                    },
                },
            },

            "/api/orders/{id}": {
                get: {
                    tags: ["OrderController"],
                    summary: "Dettaglio singolo ordine",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                            description: "ID dell'ordine",
                        },
                    ],
                    responses: {
                        200: {
                            description: "Dettaglio dell'ordine",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Order" },
                                },
                            },
                        },
                        401: {
                            description: "Token mancante o non valido",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        403: {
                            description: "Ordine non appartiene all'utente",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        404: {
                            description: "Ordine non trovato",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        500: {
                            description: "Errore del server",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                    },
                },
            },

            "/api/wishlist": {
                get: {
                    tags: ["WishlistController"],
                    summary: "Wishlist dell'utente loggato",
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: "Lista dei prodotti nella wishlist",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: { $ref: "#/components/schemas/Product" },
                                    },
                                },
                            },
                        },
                        401: {
                            description: "Token mancante o non valido",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        404: {
                            description: "Utente non trovato",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        500: {
                            description: "Errore del server",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                    },
                },
            },

            "/api/wishlist/{id}": {
                post: {
                    tags: ["WishlistController"],
                    summary: "Aggiunge un prodotto alla wishlist",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                            description: "ID del prodotto da aggiungere",
                        },
                    ],
                    responses: {
                        200: {
                            description: "Prodotto aggiunto alla wishlist",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Prodotto aggiunto alla wishlist",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: "Prodotto gia presente nella wishlist",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        401: {
                            description: "Token mancante o non valido",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        404: {
                            description: "Prodotto non trovato",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        500: {
                            description: "Errore del server",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                    },
                },
                delete: {
                    tags: ["WishlistController"],
                    summary: "Rimuove un prodotto dalla wishlist",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                            description: "ID del prodotto da rimuovere",
                        },
                    ],
                    responses: {
                        200: {
                            description: "Prodotto rimosso dalla wishlist",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Prodotto rimosso dalla wishlist",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: "Prodotto non presente nella wishlist",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        401: {
                            description: "Token mancante o non valido",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        404: {
                            description: "Prodotto non trovato",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                        500: {
                            description: "Errore del server",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Error" },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: [],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;