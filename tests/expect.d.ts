export {}

declare global {
    namespace expect {
        import CustomMatcherResult = jest.CustomMatcherResult

        interface Expect {
            nilOrAny(classType: any): CustomMatcherResult;
        }

        interface Matchers<R> {
            nilOrAny(classType: any): CustomMatcherResult;
        }

        interface AsymmetricMatchers {
            nilOrAny(classType: any): CustomMatcherResult;
        }
    }
}
