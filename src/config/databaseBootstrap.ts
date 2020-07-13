import { DocumentStore, GetDatabaseNamesOperation, CreateDatabaseOperation } from "ravendb";
import { environment } from "./environment";
import { CustomerWithDeviceIndex } from "./Indexs/customer_with_device.index";

export class DatabaseBootstrap {

    protected readonly store: DocumentStore;
    constructor() {
        this.store = new DocumentStore(environment.ravendb.connectionString, environment.ravendb.databaseName);

        this.store.initialize();
    }

    async initDb(): Promise<any> {
        var getDatabaseNames = new GetDatabaseNamesOperation(0, 25);
        const databaseNames = await this.store.maintenance.server.send(getDatabaseNames);

        if (!databaseNames.find(name => name == environment.ravendb.databaseName)) {
            const createDatabase = new CreateDatabaseOperation({ databaseName: environment.ravendb.databaseName });
            await this.store.maintenance.server.send(createDatabase);
        }

        await new CustomerWithDeviceIndex().execute(this.store);
    }
}