import client from './lib/client'
import {ActiveNumber, AvailableNumber, AvailableNumbersParams, NumbersResource} from '../src/resources/numbers'
import Util from '../src/lib/Util'

const resource = new NumbersResource(client)
const availableNumberMatcher: AvailableNumber = {
    "country": expect.any(String),
    "number": expect.any(String),
    "number_parsed": expect.any(String),
    "fees": {
        "monthly": {
            "basic_charge": expect.any(Number),
            "setup": expect.any(Number),
        },
        "annually": {
            "basic_charge": expect.any(Number),
            "setup": expect.any(Number),
        },
        "sms_mo": expect.any(Number),
        "voice_mo": expect.any(Number),
    },
    "features": {
        "sms":expect.any(Boolean),
        "a2p_sms": expect.any(Boolean),
        "voice": expect.any(Boolean),
    }
}
const activeNumberMatcher: ActiveNumber = {
    "country": expect.any(String),
    "number": expect.any(String),
    "friendly_name": expect.any(String),
    "billing": {
        "fees": {
            "setup": expect.any(Number),
            "basic_charge": expect.any(Number),
            "sms_mo": expect.any(Number),
            "voice_mo": expect.any(Number),
        },
        "payment_interval": expect.stringMatching(/annually|monthly/),
    },
    "features": {
        "sms": expect.any(Boolean),
        "a2p_sms": expect.any(Boolean),
        "voice": expect.any(Boolean),
    },
    "forward_sms_mo": {
        "sms": {
            "number": expect.any(Array),
            "enabled": expect.any(Boolean),
        },
        "email": {
            "address": expect.any(Array),
            "enabled": expect.any(Boolean)
        }
    },
    "expires": expect.nilOrAny(String),
    "created": expect.any(String)
}

describe('Numbers', () => {
    it('should return a list of available numbers', async () => {
        const res = await resource.listAvailable({})
        console.log(res)

        expect.arrayContaining<AvailableNumber>(Array(res.availableNumbers.length).fill(availableNumberMatcher))
    })

    it('should return a list of available numbers in Germany, order one and delete it again', async () => {
        const params: AvailableNumbersParams = {country: 'DE', features_sms: true}
        const res = await resource.listAvailable(params)

        expect.arrayContaining<AvailableNumber>(Array(res.availableNumbers.length).fill(availableNumberMatcher))

        res.availableNumbers.forEach((availableNumber) => availableNumber.country === params.country)
        expect(res.availableNumbers.length).toBeTruthy()

        const availableNumber = res.availableNumbers[0]

        const ordered = await resource.order({number: availableNumber, payment_interval: 'monthly'})
        expect(ordered.success).toBeTruthy()
        expect(ordered.error).toBeNull()

        const activeNumber = await resource.getActive({number: availableNumber.number})
        expect(activeNumber).toMatchObject(activeNumberMatcher)

        const deleted = await resource.delete({delete_immediately: true, number: activeNumber})
        expect(deleted.success).toBeTruthy()
    })

    it('should return a list of active numbers', async () => {
        const res = await resource.listActive()

        expect.arrayContaining<ActiveNumber>(Array(res.activeNumbers.length).fill(activeNumberMatcher))

        const active = await resource.getActive({number: res.activeNumbers[0].number})
        expect(active).toMatchObject<ActiveNumber>({
            ...activeNumberMatcher,
            number: res.activeNumbers[0].number,
            friendly_name: res.activeNumbers[0].friendly_name,
        })
    })

    it('should return a list of active numbers', async () => {
        const res = await resource.listActive()
        expect(res.activeNumbers.length).toBeTruthy()

        const activeNumber = res.activeNumbers[0]
        const updatedNumber = await resource.update({number: activeNumber, friendly_name: Util.uuid(24)})

        expect(updatedNumber).toMatchObject<ActiveNumber>({
            ...activeNumberMatcher,
            number: activeNumber.number,
            friendly_name: updatedNumber.friendly_name,
        })
    })
})
