export default function toBool<T>(option: keyof T, params: T) {
    return option in params ? params[option] : false;
}