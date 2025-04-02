import client from './lib/client'
import {ActiveNumber, AvailableNumber, NumbersResource} from '../src/resources/numbers'

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

    it('should return a list of available numbers in Germany', async () => {
        const country = 'DE'
        const res = await resource.listAvailable({country})

        expect.arrayContaining<AvailableNumber>(Array(res.availableNumbers.length).fill(availableNumberMatcher))

        res.availableNumbers.forEach((availableNumber) => availableNumber.country === country)
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
})
