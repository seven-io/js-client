export default class Util {
    static toNumberedBool(value: any): any {
        return typeof value === 'boolean'
            ? value
                ? 1
                : 0
            : value
    }

    static splitByLine(str: string): string[] {
        return str.split(/[\r\n]+/)
    }

    static isNumeric(val: any): boolean {
        return Number.isFinite(val) && !Number.isNaN(Number.parseFloat(val))
    }

    /* Thanks Michael @ https://stackoverflow.com/a/25352300/9737058 */
    static isAlphaNumeric(str: string) {
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

    static csvToArray(csv: string, skipHeader: boolean): (string[])[] {
        const arr = Util.splitByLine(csv.trim().replace(/"/g, ''))

        if (skipHeader) {
            arr.shift()
        }

        return arr.map(l => l.trim().split(';'))
    }
}
