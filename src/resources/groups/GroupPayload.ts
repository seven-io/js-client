import type {Group} from './types'
import {ApiPayload} from "../../ApiPayload";

export default class GroupPayload extends ApiPayload<Pick<Group, 'name'>> {
    convert(): {
        [k: string]: any
    } {
        return this.params
    }
}
