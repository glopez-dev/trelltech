
interface IModel {

    id: string;

    setId(id: string): void;

    getId(): string;

    get(id: string): IModel;

    update(id: string, model: IModel): IModel;

    delete(id: string): void;

    create(model: IModel): IModel;

}