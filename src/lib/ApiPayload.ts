export class ApiPayload<T extends {
    [k: string]: any
} = {}> {
    protected readonly payload: {
        [k in keyof T]: any
    }

    constructor(public readonly params: T = {} as T) {
        this.payload = params
    }

    convert(): { [p: string]: any } {
        return this.payload
    }
}
