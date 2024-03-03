import IModel from "@interfaces/IModel";
import TrelloID from "types/TrelloID";

abstract class AModel implements IModel {

    protected _id: TrelloID;

    protected APIKey: string = process.env.API_KEY;
    protected APIToken: string = process.env.API_TOKEN;


    /**
     * Set the ID of the object.
     * Is called when you assign a new ID to the object.
     * 
     *
     * @param {string} id - the new ID to set
     * 
     * @throws {Error} if the ID does not match the regex ^[0-9a-fA-F]{24}$
     */
    public set id(id: string) {
        this._id = new TrelloID(id);
    }


    /**
     * Get the ID of the object.
     *
     * @return {string} the ID of the object
     */
    public get id(): string {
        return this.id.toString();
    }


    public abstract create(): IModel;

    public abstract get(id: string): IModel;

    public abstract update(id: string, model: IModel): IModel;

    public abstract delete(id: string): void;

}

export default AModel;
