export default interface Keystore {
  _id: any
  client: Credential
  primaryKey: string
  secondaryKey: string
  status?: boolean
}
