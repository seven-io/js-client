import {
    Contact,
    CountryPricing,
    PricingResponseJson,
    StatusResponseJson,
    VoiceResponseJson
} from '../types';
import Util from './Util';

export default class TextTransformer {
    static contacts(csv: string): Contact[] {
        return Util.csvToArray(csv, false).map(([id, nick, number]) => ({
            id: Number.parseInt(id),
            nick,
            number,
        }));
    }

    static pricing(csv: string): PricingResponseJson {
        const networks = Util.csvToArray(csv, true);

        const countries: CountryPricing[] = [];

        for (const network of networks) {
            const [countryCode, countryName, countryPrefix, mcc,
                mncs, networkName, price, features, comment] = network;
            const country = countries.find(c => c.countryCode === countryCode);
            const hasCountry = undefined !== country;
            const obj = country || {
                countryCode,
                countryName,
                countryPrefix,
                networks: [],
            };

            obj.networks.push({
                comment,
                features: features.split(',').filter(s => '' !== s),
                mcc,
                mncs: mncs.split(','),
                networkName: networkName.trim(),
                price: Number.parseFloat(price),
            });

            if (!hasCountry) {
                countries.push(obj);
            }
        }

        return {
            countCountries: countries.length,
            countNetworks: networks.length,
            countries,
        };
    }

    static status(text: string): StatusResponseJson {
        const [report, timestamp] = Util.splitByLine(text);

        return <StatusResponseJson>{
            report,
            timestamp,
        };
    }

    static voice(text: string): VoiceResponseJson {
        const [code, id, cost] = Util.splitByLine(text);

        return {
            code: Number.parseInt(code),
            cost: Number.parseFloat(cost),
            id: Number.parseInt(id),
        };
    }
}