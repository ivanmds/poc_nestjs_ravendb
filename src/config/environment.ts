export const environment = {
    server: { port: process.env.SERVER_PORT || 3000 },
    ravendb: {
        connectionString: process.env.RAVENDB_CONNECTION_STRING || "http://localhost:8080",
        databaseName: process.env.DATABASE_NAME || "customerDB"
    },
    redis: {
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || 'localhost'
    }
}