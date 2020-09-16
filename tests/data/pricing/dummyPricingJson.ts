import {PricingResponseJson} from '../../../src/types';

export const dummyPricingJson: PricingResponseJson = {
    countCountries: 1,
    countNetworks: 4,
    countries: [
        {
            countryCode: 'BR',
            countryName: 'Brazil',
            countryPrefix: '43',
            networks: [
                {
                    mcc: '232',
                    mncs: [
                        '02'
                    ],
                    networkName: 'A1 Telekom Austria',
                    price: 0.075,
                    features: [],
                    comment: '',
                },
                {
                    mcc: '232',
                    mncs: [
                        '01'
                    ],
                    networkName: 'A1 Telekom Austria (A1.net)',
                    price: 0.075,
                    features: [
                        'alpha',
                        'numeric',
                        'dlr',
                        'sc',
                    ],
                    comment: '',
                },
                {
                    mcc: '232',
                    mncs: [
                        '11'
                    ],
                    networkName: 'A1 Telekom Austria (bob)',
                    price: 0.075,
                    features: [],
                    comment: '',
                },
                {
                    mcc: '232',
                    mncs: [
                        '09'
                    ],
                    networkName: 'A1 Telekom Austria (Tele2Mobil)',
                    price: 0.075,
                    features: [],
                    comment: '',
                },
            ],
        }
    ],
};