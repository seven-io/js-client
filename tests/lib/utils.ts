import Util from '../../src/lib/Util'

export function createRandomURL(): string {
    return `https://my.tld/${Util.uuid(21)}`
}

export function getStringEnumValues(Enum: {
    [k: string]: string
}): string[] {
    return Object.keys(Enum)
        .map(key => Enum[key])
        .filter(k => !(parseInt(k) >= 0))
}

export function isValidURL(url: string): boolean {
    try {
        new URL(url)

        return true
    } catch (_) {
        return false
    }
}

export function unionMatcher(arr: readonly any[], prepend: string = ''): RegExp {
    return new RegExp(`${prepend}${arr.join('|')}`)
}

export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
