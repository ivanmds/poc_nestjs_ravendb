export const environment = {
    server: { port: process.env.SERVER_PORT || 3000 },
    ravendb: {
        connectionString: process.env.RAVENDB_CONNECTION_STRING || "http://localhost:8080",
        databaseName: process.env.DATABASE_NAME || "customerDB"
    }
}