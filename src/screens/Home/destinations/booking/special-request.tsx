import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppColors } from '@assets/themes/colors'
import { AppFonts } from '@assets/themes/font'

const SpecialRequest = ({ navigation }: NativeStackScreenProps<any>) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Special request',
      headerStyle: {
        backgroundColor: AppColors.lightRed,
      },
      headerTintColor: AppColors.white,
    })
  }, [])

  const handleOnPressSave = () => {
    navigation.canGoBack() && navigation.goBack()
  }
  return (
    <View>
      <View
        style={{
          backgroundColor: AppColors.white,
          padding: 20,
        }}
      >
        <TextInput
          style={{
            borderBottomColor: AppColors.gray,
            borderBottomWidth: 1,
            fontFamily: AppFonts.regular,
            textAlignVertical: 'top',
          }}
          multiline={true}
          placeholder="Enter your request"
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: AppColors.lightRed,
          paddingVertical: 10,
          alignItems: 'center',
          margin: 20,
          borderRadius: 6,
        }}
        onPress={handleOnPressSave}
      >
        <Text
          style={{
            color: AppColors.white,
            fontFamily: AppFonts.semiBold,
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SpecialRequest
