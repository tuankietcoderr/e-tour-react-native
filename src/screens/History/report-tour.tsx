import {
  View,
  Text,
  StatusBar,
  Touchable,
  Animated,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { reportList } from '@lib/type-of-report'
import { TouchableHighlight } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/core'
import IReport, { ReportType } from '@schema/User/Report'
import { reportWithType } from '@services/report'
import Toast from 'react-native-root-toast'

type ParamList = {
  ReportTour: {
    objectId: string
    reportType: ReportType
  }
}

const ReportTour = ({ navigation }: NativeStackScreenProps<any>) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Report ' + reportType,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: AppColors.primary,
      },
      headerTitleStyle: {
        fontFamily: AppFonts.semiBold,
      },
    })
  }, [])
  const { objectId, reportType } = useRoute<RouteProp<ParamList, 'ReportTour'>>().params
  const [loading, setLoading] = React.useState<boolean>(false)
  const [currentReportIndex, setCurrentReportIndex] = React.useState<number>(0)
  const report = reportList[currentReportIndex]
  const [content, setContent] = React.useState<string>(report)
  const handleOnPressSend = async () => {
    if (!content) return Toast.show('Please describe your problem with this tour')
    const data: IReport = {
      content: report + '\n' + content,
      reportType,
      objectId,
    }
    setLoading(true)
    await reportWithType(data)
      .then((res) => {
        if (res) {
          Toast.show('Report successfully. We will review your report as soon as possible', {
            position: Toast.positions.BOTTOM,
            backgroundColor: AppColors.success,
          })
          navigation.goBack()
        } else {
          Toast.show('Report failed. Please try again', {
            position: Toast.positions.BOTTOM,
            backgroundColor: AppColors.primary,
          })
        }
      })
      .catch((err) => {
        Toast.show('Report failed. Please try again', {
          position: Toast.positions.BOTTOM,
          backgroundColor: AppColors.primary,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <View
      style={{
        padding: 20,
        gap: 20,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontFamily: AppFonts.semiBold,
          fontSize: AppFontSizes.medium,
        }}
      >
        Please choose a type of report
      </Text>
      <View
        style={{
          gap: 10,
        }}
      >
        {reportList.map((r, index) => (
          <TouchableHighlight
            onPress={() => {
              setCurrentReportIndex(index)
            }}
            underlayColor={AppColors.blue}
            style={{
              backgroundColor: currentReportIndex === index ? AppColors.blue : 'white',
              paddingVertical: 16,
              paddingHorizontal: 10,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: AppColors.primary,
            }}
            key={r.toString() + index.toString() + Math.random().toString() + Date.now().toString()}
          >
            <Animated.Text
              style={{
                fontFamily: currentReportIndex === index ? AppFonts.semiBold : AppFonts.regular,
                color: currentReportIndex === index ? 'white' : AppColors.primary,
              }}
            >
              {r}
            </Animated.Text>
          </TouchableHighlight>
        ))}
      </View>
      {currentReportIndex === reportList.length - 1 && (
        <TextInput
          placeholder={'Please describe your problem with this tour'}
          multiline={true}
          style={{
            backgroundColor: AppColors.white,
            borderRadius: 6,
            padding: 10,
            textAlignVertical: 'top',
            fontFamily: AppFonts.regular,
            borderWidth: 1,
            borderColor: AppColors.primary,
            color: AppColors.primary,
          }}
          onChangeText={setContent}
          numberOfLines={4}
        />
      )}
      <TouchableOpacity
        style={{
          paddingVertical: 16,
          borderRadius: 6,
          paddingHorizontal: 10,
          backgroundColor: AppColors.primary,
          opacity: loading ? 0.5 : 1,
        }}
        onPress={handleOnPressSend}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text
            style={{
              fontFamily: AppFonts.bold,
              color: AppColors.white,
              textAlign: 'center',
            }}
          >
            Send
          </Text>
        )}
      </TouchableOpacity>
      <StatusBar backgroundColor={AppColors.primary} />
    </View>
  )
}

export default ReportTour
