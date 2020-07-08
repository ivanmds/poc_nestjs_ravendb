export class Result<TEntity> {
    isSuccess: boolean = true;
    errors: string[];
    data: TEntity;
}