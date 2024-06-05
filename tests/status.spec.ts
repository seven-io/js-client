import client from './lib/client'
import {getStringEnumValues, unionMatcher} from './lib/utils'
import {StatusReportCode, StatusResource, type StatusResponse} from '../src'

const resource = new StatusResource(client)

const expectJson = (json: StatusResponse) => expect(json)
    .toMatchObject<StatusResponse>({
        id: expect.any(Number),
        status: expect.stringMatching(
            unionMatcher(getStringEnumValues(StatusReportCode))),
        statusTime: expect.any(String),
    })

describe('Status', () => {
    it('should return a json response', async () => {
        const arr = await resource.get([])
        arr.forEach(expectJson)
    })
})
