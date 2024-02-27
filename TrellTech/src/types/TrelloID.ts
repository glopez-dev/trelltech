
export default class TrelloID {
    private _id: string;

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        const idRegex = new RegExp('^[0-9a-fA-F]{24}$');

        if (!idRegex.test(value)) {
            throw new Error(`ID must match regex ${idRegex}, but got ${value}`);
        }

        this._id = value;
    }

    constructor(id: string) {
        this._id = id;
    }


    public toString(): string {
        return this.id;
    }


}
