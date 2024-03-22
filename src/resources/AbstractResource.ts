import Client from '../index'
import {Endpoint} from '../lib'

export abstract class AbstractResource {
    constructor(protected readonly client: Client) {
    }

    abstract get endpoint(): Endpoint
}
