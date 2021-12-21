
interface Cred {
    prop: string
    value: number | object | string | null
}


export const Credential = (cred: Cred) => {
    return {
        type: 'Credential_In',
        payload: { prop: cred.prop, value: cred.value }
    }
}