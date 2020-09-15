export default function unionMatcher(arr: readonly any[], prepend: string = '') {
    return new RegExp(`${prepend}${arr.join('|')}`);
}