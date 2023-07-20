import Sms77Client from '../src/Sms77Client'
import {
    Subaccount,
    SubaccountsAutoChargeErrorResponse,
    SubaccountsAutoChargeParams,
    SubaccountsAutoChargeResponse,
    SubaccountsAutoChargeSuccessResponse,
    SubaccountsCreateErrorResponse,
    SubaccountsCreateParams,
    SubaccountsCreateResponse,
    SubaccountsCreateSuccessResponse,
    SubaccountsDeleteErrorResponse,
    SubaccountsDeleteParams,
    SubaccountsDeleteResponse,
    SubaccountsDeleteSuccessResponse,
    SubaccountsReadResponse,
    SubaccountsTransferCreditsErrorResponse,
    SubaccountsTransferCreditsParams,
    SubaccountsTransferCreditsResponse,
    SubaccountsTransferCreditsSuccessResponse,
} from '../src/types'
import client from './lib/client'

const read: Sms77Client['subaccounts']['read'] = process.env.SMS77_LIVE_TEST
    ? client.subaccounts.read : jest.fn(async (): Promise<SubaccountsReadResponse> => [
        {
            'id': 941955,
            'username': null,
            'company': '',
            'balance': 4,
            'total_usage': 0,
            'auto_topup': {
                'threshold': 1,
                'amount': 3,
            },
            'contact': {
                'name': 'Tanya Tester',
                'email': 'tanya.tester@seven.io',
            },
        },
    ])

const createSuccess: Sms77Client['subaccounts']['create'] = process.env.SMS77_LIVE_TEST
    ? client.subaccounts.create : jest.fn(async (): Promise<SubaccountsCreateSuccessResponse> => ({
        error: null,
        subaccount: {
            auto_topup: {
                amount: 0,
                threshold: 0,
            },
            balance: 0,
            company: null,
            contact: {
                email: 'seven@gmail.com',
                name: 'Anja Andersson',
            },
            id: 123,
            total_usage: 0,
            username: null,
        },
        success: true,
    }))

const createError: Sms77Client['subaccounts']['create'] = process.env.SMS77_LIVE_TEST
    ? client.subaccounts.create : jest.fn(async (): Promise<SubaccountsCreateErrorResponse> => ({
        error: '',
        success: false,
    }))

const deleteSuccess: Sms77Client['subaccounts']['delete'] = process.env.SMS77_LIVE_TEST
    ? client.subaccounts.delete : jest.fn(async (): Promise<SubaccountsDeleteSuccessResponse> => ({
        error: null,
        success: true,
    }))

const deleteError: Sms77Client['subaccounts']['delete'] = process.env.SMS77_LIVE_TEST
    ? client.subaccounts.delete : jest.fn(async (): Promise<SubaccountsDeleteErrorResponse> => ({
        error: '',
        success: false,
    }))

const transferCreditsSuccess: Sms77Client['subaccounts']['transferCredits'] = process.env.SMS77_LIVE_TEST
    ? client.subaccounts.transferCredits : jest.fn(async (): Promise<SubaccountsTransferCreditsSuccessResponse> => ({
        error: null,
        success: true,
    }))

const transferCreditsError: Sms77Client['subaccounts']['transferCredits'] = process.env.SMS77_LIVE_TEST
    ? client.subaccounts.transferCredits : jest.fn(async (): Promise<SubaccountsTransferCreditsErrorResponse> => ({
        error: '',
        success: false,
    }))

const autoChargeSuccess: Sms77Client['subaccounts']['autoCharge'] = process.env.SMS77_LIVE_TEST
    ? client.subaccounts.autoCharge : jest.fn(async (): Promise<SubaccountsAutoChargeSuccessResponse> => ({
        error: null,
        success: true,
    }))

const autoChargeError: Sms77Client['subaccounts']['autoCharge'] = process.env.SMS77_LIVE_TEST
    ? client.subaccounts.autoCharge : jest.fn(async (): Promise<SubaccountsAutoChargeErrorResponse> => ({
        error: '',
        success: false,
    }))

async function assertCreate(res: SubaccountsCreateResponse) {
    res.success
        ? expect.objectContaining<SubaccountsCreateSuccessResponse>(res)
        : expect.objectContaining<SubaccountsCreateErrorResponse>(res)
}

async function assertDelete(res: SubaccountsDeleteResponse) {
    res.success
        ? expect.objectContaining<SubaccountsDeleteSuccessResponse>(res)
        : expect.objectContaining<SubaccountsDeleteErrorResponse>(res)
}

async function assertAutoCharge(res: SubaccountsAutoChargeResponse) {
    res.success
        ? expect.objectContaining<SubaccountsAutoChargeSuccessResponse>(res)
        : expect.objectContaining<SubaccountsAutoChargeErrorResponse>(res)
}

async function assertTransferCredits(res: SubaccountsTransferCreditsResponse) {
    res.success
        ? expect.objectContaining<SubaccountsTransferCreditsSuccessResponse>(res)
        : expect.objectContaining<SubaccountsTransferCreditsErrorResponse>(res)
}

describe('Subaccounts', () => {
    let subaccount: Subaccount

    it('should return an array uf subaccounts',
        async () => expect.arrayContaining<Subaccount>(await read()))

    it('should create an account',
        async () => {
            const params: SubaccountsCreateParams = {
                email: 'js_client_test_subaccount@seven.io',
                name: 'Anja Andersson',
            }
            const res = await createSuccess(params) as SubaccountsCreateSuccessResponse
            await assertCreate(res)
            subaccount = res.subaccount
        })

    it('should fail to create an account',
        async () => {
            const params: SubaccountsCreateParams = {
                email: '',
                name: '',
            }
            await assertCreate(await createError(params))
        })

    it('should transfer credits',
        async () => {
            const params: SubaccountsTransferCreditsParams = {
                amount: 1,
                id: subaccount.id,
            }
            await assertTransferCredits(await transferCreditsSuccess(params))
        })

    it('should fail to transfer credits',
        async () => {
            const params: SubaccountsTransferCreditsParams = {
                amount: -1,
                id: subaccount.id,
            }
            await assertTransferCredits(await transferCreditsError(params))
        })

    it('should set up auto charging',
        async () => {
            const params: SubaccountsAutoChargeParams = {
                amount: 1,
                id: subaccount.id,
                threshold: 2,
            }
            await assertAutoCharge(await autoChargeSuccess(params))
        })

    it('should fail to set up auto charging',
        async () => {
            const params: SubaccountsAutoChargeParams = {
                amount: -1,
                id: 0,
                threshold: -2,
            }
            await assertAutoCharge(await autoChargeError(params))
        })

    it('should delete an account',
        async () => {
            const params: SubaccountsDeleteParams = {
                id: subaccount.id,
            }
            const res = await deleteSuccess(params) as SubaccountsDeleteSuccessResponse
            await assertDelete(res)
        })

    it('should fail to delete an account',
        async () => {
            const params: SubaccountsDeleteParams = {
                id: 0,
            }
            await assertDelete(await deleteError(params))
        })
})
