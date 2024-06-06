import {Client} from '../Client.ts'

export abstract class AbstractResource {
    constructor(protected readonly client: Client) {
    }
}
