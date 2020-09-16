export default (Enum: { [k: string]: string }): string[] =>
    Object.keys(Enum)
        .map(key => Enum[key])
        .filter(k => !(parseInt(k) >= 0));