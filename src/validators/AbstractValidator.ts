export default abstract class AbstractValidator<T extends { [k: string]: any }> {
    readonly errors: Partial<{ [key in keyof T]: string[] }> = {}

    constructor(protected readonly params: T) {
        Object.keys(params).forEach((key: keyof T) => this.errors[key] = [])
    }

    abstract validate(): boolean

    protected addError(key: keyof T, error: string) {
        this.errors[key]!.push(error)
    }
}
