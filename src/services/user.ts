import { User } from '@schema/User/User'
import { api, putRequest } from '@utils/api'

const registerUser = async (data: User) => {
  try {
    const res = await api.post(`/user/signup`, data)
    if (res.status === 200) {
      return res.data
    }
  } catch (err: any) {
    return err.response.data.message
  }
}

const getUserById = async (id: string) => {
  const res = await api.get(``)
}

const updateUser = async (data: User) => {
  try {
    const res = await putRequest(`/user/profile`, data)
    return res
  } catch (err: any) {
    throw err.response.data
  }
}

export { registerUser, getUserById, updateUser }
