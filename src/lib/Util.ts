export default class Util {
    static uuid(length: number = 32): string {
        return [...Array(length)].map(() => Math.random().toString(36)[2]).join('')
    }
}
