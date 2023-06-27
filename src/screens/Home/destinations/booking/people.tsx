import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import React, { useState, useMemo } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppColors } from '@assets/themes/colors'
import InputWithDynamicLable from '@components/InputWithDynamicLabel'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { InputWithDynamicLabel } from '@components/index'
import { Country } from '@screens/Init/Signup/next'
import { ITicketVisitor } from '@schema/User/Ticket'
import { RouteProp, useRoute } from '@react-navigation/core'
import { UserContext } from '@context/UserContext'

type ParamList = {
  VisitorParams: {
    index: number
  }
}

const People = ({ navigation }: NativeStackScreenProps<any>) => {
  const params = useRoute<RouteProp<ParamList, 'VisitorParams'>>().params
  const { index } = params
  const { setVisitors, visitors } = React.useContext(UserContext)
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: `Guest ${index + 1}`,
      headerStyle: {
        backgroundColor: AppColors.lightRed,
      },
      headerTintColor: AppColors.white,
    })
  }, [])

  const [visitor, setVisitor] = useState<ITicketVisitor>(visitors[index])

  const onInputChange = (text: string, targetName: keyof ITicketVisitor) => {
    setVisitor((prev) => ({
      ...prev,
      [targetName]: text,
    }))
  }
  const handleOnPressSave = () => {
    const newVisitors = [...visitors]
    newVisitors[index] = visitor
    setVisitors(newVisitors)
    navigation.canGoBack() && navigation.goBack()
  }

  return (
    <View>
      <View
        style={{
          backgroundColor: AppColors.white,
          paddingHorizontal: 20,
          paddingVertical: 40,
          gap: 20,
        }}
      >
        <InputWithDynamicLable
          inputProps={{
            'aria-label': 'Full name',
            placeholder: "Enter guest's full name",
            placeholderTextColor: AppColors.gray,
            autoFocus: true,
            autoComplete: 'name',
            style: {
              fontFamily: AppFonts.regular,
              fontSize: AppFontSizes.normal,
              color: AppColors.dark,
            },
            onChangeText: (text) => onInputChange(text, 'name'),
            value: visitor.name,
          }}
          wrapperStyle={{
            borderWidth: 0,
            borderBottomWidth: 1,
            borderRadius: 0,
            paddingHorizontal: 0,
            paddingVertical: 0,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}
        >
          <View
            style={{
              flex: 3,
            }}
          >
            <InputWithDynamicLabel
              wrapperStyle={{
                borderWidth: 0,
                borderBottomWidth: 1,
                borderRadius: 0,
                paddingHorizontal: 0,
                paddingVertical: 0,
              }}
              inputProps={{
                placeholder: "Enter guest's phone number",
                autoComplete: 'tel',
                keyboardType: 'phone-pad',
                'aria-label': 'Phone number',
                style: {
                  fontFamily: AppFonts.regular,
                  fontSize: AppFontSizes.normal,
                  color: AppColors.dark,
                },
                onChangeText: (text) => onInputChange(text, 'phoneNumber'),
                value: visitor.phoneNumber,
              }}
            />
          </View>
        </View>
        <InputWithDynamicLabel
          wrapperStyle={{
            borderWidth: 0,
            borderBottomWidth: 1,
            borderRadius: 0,
            paddingHorizontal: 0,
            paddingVertical: 0,
          }}
          inputProps={{
            placeholder: "Enter guest's address",
            'aria-label': 'Address',
            style: {
              fontFamily: AppFonts.regular,
              fontSize: AppFontSizes.normal,
              color: AppColors.dark,
            },
            onChangeText: (text) => onInputChange(text, 'address'),
            value: visitor.address,
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: AppColors.lightRed,
          paddingVertical: 10,
          alignItems: 'center',
          marginHorizontal: 20,
          borderRadius: 6,
          marginTop: 20,
        }}
        onPress={handleOnPressSave}
      >
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
            color: AppColors.white,
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
      <StatusBar backgroundColor={AppColors.lightRed} />
    </View>
  )
}

export default People
