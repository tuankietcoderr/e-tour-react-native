export enum ReportType {
  TOUR = 'tour',
  ROUTE = 'route',
  COMPANY = 'company',
  STAFF = 'staff',
  APPLICATION = 'application',
}

export default interface IReport {
  _id?: string
  reportType: ReportType
  objectId?: string
  content: string
}
