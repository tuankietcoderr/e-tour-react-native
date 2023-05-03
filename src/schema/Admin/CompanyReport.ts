import { Schema, Types, model } from 'mongoose';

export interface CompanyReportInterface {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  image: string;
  company: Types.ObjectId;
}

const companyReportsSchema = new Schema<CompanyReportInterface>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
  },
  {
    timestamps: true,
  },
);

const CompanyReport = model('CompanyReport', companyReportsSchema);

module.exports = CompanyReport;
