
abstract class AModel implements IModel {

    id: string;

    protected APIKey: string = process.env.API_KEY;
    protected APIToken: string = process.env.API_TOKEN;

    /**
     * Set the ID of the object.
     *
     * @param {string} id - the new ID to set
     * @return {void} 
     */
    public setId(id: string): void {
        const idRegex = new RegExp('^[0-9a-fA-F]{24}$');

        if (!idRegex.test(id)) {
            throw new Error(`ID must match regex ${idRegex}, but got ${id}`);
        }

        this.id = id;
    }


    /**
     * Get the ID of the object.
     *
     * @return {string} the ID of the object
     */
    public getId(): string {
        return this.id;
    }


    public abstract create(model: IModel): IModel;

    public abstract get(id: string): IModel;

    public abstract update(id: string, model: IModel): IModel;

    public abstract delete(id: string): void;

}
