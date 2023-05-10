import axios from 'axios'
import { BASE_IMAGES_URL } from './server'

const uploadImage = async (file: string) => {
  try {
    const res = await axios
      .post(BASE_IMAGES_URL + '/base64', {
        url: file,
      })
      .catch((err) => {
        throw err
      })
    const data = await res.data
    return data
  } catch (err) {
    throw new Error('Error uploading image')
  }
}

export { uploadImage }
