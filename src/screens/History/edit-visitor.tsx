import { View, Text, LogBox } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ITicketVisitor, Ticket } from '@schema/User/Ticket'
import { AppColors } from '@assets/themes/colors'
import { RouteProp, useRoute } from '@react-navigation/core'
import { TouchableOpacity } from 'react-native'
import InputWithDynamicLable from '@components/InputWithDynamicLabel'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { InputWithDynamicLabel } from '@components/index'
import { StatusBar } from 'react-native'

type ParamList = {
  EditVisitorParams: {
    visitor: ITicketVisitor
    setState: (visitor: ITicketVisitor) => void
  }
}
const EditVisitor = ({ navigation }: NativeStackScreenProps<any>) => {
  const params = useRoute<RouteProp<ParamList, 'EditVisitorParams'>>().params
  const { visitor, setState } = params
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Edit visitor ' + visitor.name,
      headerStyle: {
        backgroundColor: AppColors.blue,
      },
      headerTintColor: AppColors.white,
    })
    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])
  }, [])
  const [visitorState, setVisitorState] = React.useState<ITicketVisitor>(visitor)
  const onInputChange = (text: string, targetName: keyof ITicketVisitor) => {
    setVisitorState((prev) => ({
      ...prev,
      [targetName]: text,
    }))
  }
  const handleOnPressSave = () => {
    setState(visitorState)
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
            value: visitorState.name,
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
                value: visitorState.phoneNumber?.toString(),
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
            value: visitorState.address,
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: AppColors.blue,
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
      <StatusBar backgroundColor={AppColors.blue} />
    </View>
  )
}

export default EditVisitor
