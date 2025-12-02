export class RencontreDto {
    constructor(
        private _status: string,

    ) { }

    public get status(): string {
        return this._status;
    }

    public set status(value: string) {  
        this._status = value;
    }

    public toJson(): any {
        return {
            status: this._status,
        };
    }
}


