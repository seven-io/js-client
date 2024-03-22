import {StatusReportCode, StatusResource, StatusResponse} from '../src'
import client from './lib/client'
import environment from './lib/environment'
import {getStringEnumValues, ResourceMock, unionMatcher} from './lib/utils'

const report = StatusReportCode.Delivered
const timestamp = '2020-09-15 21:26:14.777'

jest.mock('../src', () => ({
    StatusResource: jest.fn().mockImplementation((): ResourceMock<StatusResource> => {
        return environment.live
            ? new StatusResource(client)
            : {
                async get() {
                    return [
                        {
                            id: 123,
                            status: report,
                            statusTime: timestamp,
                        },
                    ]
                },
            }
    }),
}))

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
