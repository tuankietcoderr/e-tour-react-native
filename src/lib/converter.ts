import { AppColors } from '@assets/themes/colors'
import { BASE_IMAGES_URL } from '@utils/server'

const AVATAR_IMAGE_PLACEHOLDER: string = 'https://i.ibb.co/mXW0BSM/Screenshot-2023-06-11-145619.png'
const IMAGE_PLACEHOLDER: string = 'https://i.ibb.co/Sv1Wrm7/Screenshot-2023-06-11-150019-min.png'
const VOUCHER_IMAGE_PLACEHOLDER: string =
  'https://i.ibb.co/r6p6NF8/kisspng-coupon-discounts-and-allowances-computer-icons-coupon-vector-5adc48cd532174-3159344815243859.png'

const COMPANY_IMAGE_PLACEHOLDER: string =
  'https://i.ibb.co/M9jCpnv/kisspng-business-company-building-organization-economy-5ac1d028b0b523-5689799215226511767238-min.png'
export function toDot(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function imageStorage(id: string) {
  return id ? BASE_IMAGES_URL + '/' + id : IMAGE_PLACEHOLDER
}

export function avatarStorage(id: string) {
  if (id.includes('file://') || id.includes('blob') || id.includes('http')) return id
  return id ? BASE_IMAGES_URL + '/' + id : AVATAR_IMAGE_PLACEHOLDER
}

export function voucherStorage(id: string) {
  return id ? BASE_IMAGES_URL + '/' + id : VOUCHER_IMAGE_PLACEHOLDER
}

export function companyStorage(id: string) {
  return id ? BASE_IMAGES_URL + '/' + id : COMPANY_IMAGE_PLACEHOLDER
}

export const rateConverter = (rate: number): string => {
  return rate < 1
    ? 'Very bad'
    : rate < 2
    ? 'Bad'
    : rate < 3
    ? 'Normal'
    : rate < 4
    ? 'Good'
    : rate < 5
    ? 'Very good'
    : 'Excellent'
}

export const rateColorConverter = (rate: number) => {
  return rate < 1
    ? AppColors.red
    : rate < 2
    ? AppColors.lightRed
    : rate < 3
    ? AppColors.yellow
    : rate < 4
    ? AppColors.blue
    : rate < 5
    ? AppColors.secondary
    : AppColors.success
}

export function capitalize(str: string, all: boolean = false): string {
  if (all)
    return str
      .split(' ')
      .map((s) => capitalize(s))
      .join(' ')
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function randomUUID() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function uniqueArray(array: any[]) {
  const unique = [] as any[]
  const distinct = [] as any[]
  for (let i = 0; i < array.length; i++) {
    if (!unique[array[i].age]) {
      distinct.push(array[i])
      unique[array[i].age] = 1
    }
  }
  return distinct
}
