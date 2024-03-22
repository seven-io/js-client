export {}

declare global {
    namespace jest {
        interface Matchers<R> {
            nilOrAny(classType: any): CustomMatcherResult;
        }
    }
}
