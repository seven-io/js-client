export abstract class ApiPayload<T extends {
    [k: string]: any
} = {}> {
    protected readonly payload: {
        [k in keyof T]: any
    }

    constructor(public readonly params: T) {
        this.payload = params
    }

    public abstract convert(): {
        [k: string]: any
    }
}
