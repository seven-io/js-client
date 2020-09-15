import environment, {Environment} from './lib/environment';
import {environmentMatcher} from './matchers/environment';

describe('Environment', () => {
    it('should have environment variables set', () => {
        expect(environment).toMatchObject<Environment>(environmentMatcher);
    });
});