import IModel from "@interfaces/IModel";

abstract class AModel implements IModel {

    id: string;

    protected APIKey: string = process.env.API_KEY;
    protected APIToken: string = process.env.API_TOKEN;

    /**
     * Constructor for creating a new instance.
     *
     * @param {string} id - the unique identifier
     */
    constructor(id: string) {
        this.setId(id);
    }

    /**
     * Set the ID of the object.
     *
     * @param {string} id - the new ID to set
     * @return {void} 
     * 
     * @throws {Error} if the ID does not match the regex ^[0-9a-fA-F]{24}$
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


    public abstract save(model: IModel): IModel;

    public abstract get(id: string): IModel;

    public abstract update(id: string, model: IModel): IModel;

    public abstract delete(id: string): void;

}

export default AModel;
