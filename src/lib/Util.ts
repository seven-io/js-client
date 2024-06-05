export default class Util {
    static isNumeric(val: any): boolean {
        return Number.isFinite(val) && !Number.isNaN(Number.parseFloat(val))
    }

    static isAlphaNumeric(str: string): boolean { // Thanks, Michael @ https://stackoverflow.com/a/25352300/9737058
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i)

            if (!(code > 47 && code < 58) && // numeric (0-9)
                !(code > 64 && code < 91) && // upper alpha (A-Z)
                !(code > 96 && code < 123)) { // lower alpha (a-z)
                return false
            }
        }

        return true
    }

    static uuid(length: number = 32): string {
        return [...Array(length)].map(() => Math.random().toString(36)[2]).join('')
    }
}
