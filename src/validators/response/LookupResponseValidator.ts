import {LookupResponse, StringBoolean} from '../../types';

export default class LookupResponseValidator {
    constructor(protected res: LookupResponse) {
        let hasError: boolean = false;
        let success: boolean | StringBoolean | null = null;
        let code: string | null = null;

        if (typeof res === 'object') {
            if ('code' in res) {
                code = res.code as string;
            }

            if ('success' in res) {
                success = res.success;
            }
        } else {
            code = `${res}`;
        }

        if (code && 100 !== Number.parseInt(code)) {
            hasError = true;
        }

        if (null !== success && !success) {
            hasError = true;
        }

        if (hasError) {
            throw new Error(JSON.stringify(res));
        }
    }
}