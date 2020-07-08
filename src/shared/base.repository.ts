import DocumentStore from "ravendb";
import { environment } from "config/environment";

export class BaseRepository<TEntity> {
    protected readonly store: DocumentStore;

    constructor(collectionName: string ) {
        this.store = new DocumentStore(environment.ravendb.connectionString, environment.ravendb.databaseName);
        this.store.conventions.findCollectionNameForObjectLiteral = TEntity => collectionName;
        this.store.initialize();   
    }
}