import {
    Subaccount,
    SubaccountsAutoChargeResponse,
    SubaccountsCreateResponse,
    SubaccountsDeleteResponse,
    SubaccountsResource,
    SubaccountsTransferCreditsResponse,
} from '../src'
import client from './lib/client'

const resource = new SubaccountsResource(client)

const assertCreate = (res: SubaccountsCreateResponse): void => res.success
    ? expect.objectContaining<SubaccountsCreateResponse>({
        error: null,
        subaccount: expect.objectContaining<Subaccount>({
            auto_topup: {
                amount: expect.any(Number),
                threshold: expect.any(Number),
            },
            balance: expect.any(Number),
            company: expect.any(String),
            contact: {
                email: expect.any(String),
                name: expect.any(String),
            },
            id: expect.any(Number),
            total_usage: expect.any(Number),
            username: expect.nilOrAny(String),
        }),
        success: true,
    })
    : expect.objectContaining<SubaccountsCreateResponse>({
        error: expect.any(String),
        subaccount: undefined,
        success: false,
    })

const assertDelete = (res: SubaccountsDeleteResponse): void => res.success
    ? expect.objectContaining<SubaccountsDeleteResponse>({
        error: null,
        success: true,
    })
    : expect.objectContaining<SubaccountsDeleteResponse>({
        error: expect.any(String),
        success: false,
    })

const assertAutoCharge = (res: SubaccountsAutoChargeResponse): void => res.success
    ? expect.objectContaining<SubaccountsAutoChargeResponse>({
        error: null,
        success: true,
    })
    : expect.objectContaining<SubaccountsAutoChargeResponse>({
        error: expect.any(String),
        success: false,
    })

const assertTransferCredits = (res: SubaccountsTransferCreditsResponse): void => res.success
    ? expect.objectContaining<SubaccountsTransferCreditsResponse>({
        error: null,
        success: true,
    })
    : expect.objectContaining<SubaccountsTransferCreditsResponse>({
        error: expect.any(String),
        success: false,
    })

describe('Subaccounts', () => {
    let subaccount: Subaccount | undefined

    it('should return an array uf subaccounts',
        async () => {
            expect.arrayContaining<Subaccount>(await resource.read())
        })

    it('should create an account',
        async () => {
            const res = await resource.create({
                email: 'js_client_test_subaccount@seven.io',
                name: 'Anja Andersson',
            })
            await assertCreate(res)
            subaccount = res.subaccount
        })

    it('should fail to create an account',
        async () => {
            const res = await resource.create({
                email: '',
                name: '',
            })
            await assertCreate(res)
        })

    it('should transfer credits',
        async () => {
            expect(subaccount).toBeDefined()

            const res = await resource.transferCredits({
                amount: 1,
                id: subaccount!.id,
            })
            await assertTransferCredits(res)
        })

    it('should fail to transfer credits',
        async () => {
            expect(subaccount).toBeDefined()

            const res = await resource.transferCredits({
                amount: -1,
                id: subaccount!.id,
            })
            await assertTransferCredits(res)
        })

    it('should set up auto charging',
        async () => {
            expect(subaccount).toBeDefined()

            const res = await resource.autoCharge({
                amount: 1,
                id: subaccount!.id,
                threshold: 2,
            })
            await assertAutoCharge(res)
        })

    it('should fail to set up auto charging',
        async () => {
            const res = await resource.autoCharge({
                amount: -1,
                id: 0,
                threshold: -2,
            })
            await assertAutoCharge(res)
        })

    it('should delete an account',
        async () => {
            expect(subaccount).toBeDefined()

            const res = await resource.delete({id: subaccount!.id})
            await assertDelete(res)
        })

    it('should fail to delete an account',
        async () => {
            const res = await resource.delete({id: 0})
            await assertDelete(res)
        })
})
