import { Schema, model, Types } from 'mongoose';

export interface ApplicationReportInterface {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  image: string;
}

const applicationReportsSchema = new Schema<ApplicationReportInterface>(
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
  },
  {
    timestamps: true,
  },
);

const ApplicationReport = model('ApplicationReport', applicationReportsSchema);

module.exports = ApplicationReport;
