export {};

declare global {
    namespace jest {
        interface Expect {
            nilOrAny: (classType: any) => any;
        }
    }
}