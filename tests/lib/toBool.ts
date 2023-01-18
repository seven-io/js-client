export default function toBool<T extends object>(option: keyof T, params: T) {
    return option in params ? params[option] : false;
}
