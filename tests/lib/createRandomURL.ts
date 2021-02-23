import {v4 as uuidv4} from 'uuid';

export const createRandomURL = () => {
    return `https://my.tld/${uuidv4()}`;
};