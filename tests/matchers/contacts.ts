import {Contact} from '../../src/types';

export const contactMatcher: Contact = {
    email: expect.nilOrAny(String),
    ID: expect.nilOrAny(String),
    id: expect.nilOrAny(Number),
    nick: expect.nilOrAny(String),
    Name: expect.nilOrAny(String),
    Number: expect.nilOrAny(String),
    number: expect.nilOrAny(String),
}