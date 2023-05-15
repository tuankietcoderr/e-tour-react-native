import { getRequest } from '@utils/api'

const getCompanyInformation = async (companyId: string) => {
  try {
    const res = await getRequest(`/company/${companyId}`)
    return res.data
  } catch (err) {
    throw err
  }
}

export { getCompanyInformation }
