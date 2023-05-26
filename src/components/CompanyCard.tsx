import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { Company } from '@schema/Company/Company'
import { AppColors } from '@assets/themes/colors'
import { ROUTES } from '@constants/route'
import { useNavigation } from '@react-navigation/core'
import { companyStorage } from '@lib/converter'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { SimpleLineIcons } from '@expo/vector-icons'
import { UserContext } from '@context/UserContext'
import FollowModal from './FollowModal'
import { onClose, onOpen } from './Picker'
import { getCompanyInformation } from '@services/company'
import Toast from 'react-native-root-toast'

const CompanyCard = ({
  companyId,
  showDescription = true,
}: {
  companyId: string
  showDescription?: boolean
}) => {
  const navigation = useNavigation<any>()
  const handleOnPressCompany = () => {
    navigation.navigate(ROUTES.COMPANY_DETAIL, { companyId: companyId })
  }

  const [company, setCompany] = React.useState<Company | null>(null)

  React.useEffect(() => {
    ;(async () => {
      try {
        if (companyId) {
          const res = await getCompanyInformation(companyId)
          setCompany(res)
        }
      } catch (e) {
        setCompany({} as Company)
        Toast.show('Error when getting company information', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: AppColors.error,
        })
      }
    })()
  }, [companyId])

  return (
    <>
      {company ? (
        <View
          style={
            {
              // overflow: 'hidden',
            }
          }
        >
          <TouchableOpacity
            style={{
              backgroundColor: AppColors.white,
              borderRadius: 6,
              paddingHorizontal: 10,
              paddingVertical: 20,
              borderWidth: 1,
              borderColor: AppColors.gray,
              flexDirection: 'row',
              gap: 20,
            }}
            onPress={handleOnPressCompany}
          >
            <Image
              source={{ uri: companyStorage(company?.image || ''), width: 80, height: 80 }}
              resizeMode="contain"
              style={{
                backgroundColor: AppColors.white,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: AppColors.gray,
              }}
            />
            <View
              style={{
                alignSelf: 'center',
                gap: 10,
                flex: 3,
              }}
            >
              <Text
                style={{
                  fontFamily: AppFonts.bold,
                  fontSize: AppFontSizes.medium,
                }}
              >
                {company?.name || 'No given name'}
              </Text>
              {showDescription && (
                <Text
                  style={{
                    fontFamily: AppFonts.regular,
                  }}
                  numberOfLines={3}
                >
                  {company?.description || 'No given description'}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </>
  )
}

export default React.memo(CompanyCard)
