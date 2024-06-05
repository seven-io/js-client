import {Client} from '../Client.ts'
import {Endpoint} from '../lib'

export abstract class AbstractResource {
    constructor(protected readonly client: Client) {
    }

    abstract get endpoint(): Endpoint
}
