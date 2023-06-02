import { AppColors } from '@assets/themes/colors'
import { AppFonts } from '@assets/themes/font'
import CustomAlert from '@components/CustomAlert'
import InputWithDynamicLable from '@components/InputWithDynamicLabel'
import { InputWithDynamicLabel } from '@components/index'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import IReport, { ReportType } from '@schema/User/Report'
import { reportWithType } from '@services/report'
import React from 'react'
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import Toast from 'react-native-root-toast'

const ReportIssue = ({ navigation }: NativeStackScreenProps<any>) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Report Issue',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontFamily: AppFonts.semiBold,
      },
      headerStyle: {
        backgroundColor: AppColors.primary,
      },
      headerTintColor: AppColors.white,
    })
  }, [])

  const [form, setForm] = React.useState<IReport>({
    content: '',
    reportType: ReportType.APPLICATION,
  })

  const onInputChange = (key: keyof IReport, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async () => {
    if (form.content === '') {
      Toast.show('Please enter your issue', {
        position: Toast.positions.BOTTOM,
      })
      return
    }

    try {
      setLoading(true)
      const res = await reportWithType(form)
      Toast.show('Your issue has been reported. Thank you for improve our application!', {
        position: Toast.positions.CENTER,
        backgroundColor: AppColors.success,
      })
      navigation.goBack()
    } catch (e) {
      Toast.show('Something went wrong. Please try again!', {
        position: Toast.positions.CENTER,
        backgroundColor: AppColors.error,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View
      style={{
        padding: 20,
        gap: 20,
      }}
    >
      <View
        style={{
          gap: 10,
        }}
      ></View>
      <InputWithDynamicLabel
        wrapperStyle={{
          borderColor: AppColors.gray,
          borderWidth: 1,
        }}
        inputProps={{
          placeholder: 'Enter your issue',
          autoFocus: true,
          autoComplete: 'off',
          'aria-label': 'Isssue description',
          onChangeText: (text) => onInputChange('content', text),
          value: form.content,
          numberOfLines: 5,
          textAlignVertical: 'top',
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: AppColors.primary,
          padding: 16,
          borderRadius: 6,
          alignItems: 'center',
          opacity: loading || form.content === '' ? 0.5 : 1,
        }}
        disabled={loading || form.content === ''}
        onPress={handleSubmit}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
              color: AppColors.white,
            }}
          >
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default ReportIssue
