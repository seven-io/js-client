import {Contact, CountryPricing, PricingResponse, StatusResponse} from '../types'
import Util from './Util'

export default class TextTransformer {
    static contacts(csv: string): Contact[] {
        return Util.csvToArray(csv, false).map<Contact>(([id, nick, number]) => ({
            email: `${nick}_${number}@seven.dev`,
            id: Number.parseInt(id),
            nick,
            number,
        }))
    }

    static pricing(csv: string): PricingResponse {
        const networks = Util.csvToArray(csv, true)

        const countries: CountryPricing[] = []

        for (const network of networks) {
            const [
                countryCode, countryName, countryPrefix, mcc,
                mncs, networkName, price, features, comment,
            ] = network
            const country = countries.find(c => c.countryCode === countryCode)
            const hasCountry = undefined !== country
            const obj = country || {
                countryCode,
                countryName,
                countryPrefix,
                networks: [],
            }

            obj.networks.push({
                comment,
                features: features.split(',').filter(s => '' !== s),
                mcc,
                mncs: mncs.split(','),
                networkName: networkName.trim(),
                price: Number.parseFloat(price),
            })

            if (!hasCountry) countries.push(obj)
        }

        return {
            countCountries: countries.length,
            countNetworks: networks.length,
            countries,
        }
    }

    static status(text: string): StatusResponse {
        const [report, timestamp] = Util.splitByLine(text)

        return {
            status: report as StatusResponse['status'],
            statusTime: timestamp,
            id: 0,
        }
    }
}
