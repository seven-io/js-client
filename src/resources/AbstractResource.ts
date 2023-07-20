import {BaseClient} from '../BaseClient'

export default abstract class AbstractResource {
    protected constructor(protected readonly client: BaseClient) {
    }
}
