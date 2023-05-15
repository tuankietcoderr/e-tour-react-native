import IReport from '@schema/User/Report'
import { postRequest } from '@utils/api'

const reportWithType = async (data: IReport) => {
  try {
    const res = await postRequest('/report', data)
    return res.data
  } catch (err) {
    throw err
  }
}

export { reportWithType }
