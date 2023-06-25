import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import InputWithDynamicLable from '@components/InputWithDynamicLabel'
import { InputWithDynamicLabel } from '@components/index'
import { UserContext } from '@context/UserContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ITicketVisitor } from '@schema/User/Ticket'
import React from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Contact = ({ navigation }: NativeStackScreenProps<any>) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Contact information',
      headerStyle: {
        backgroundColor: AppColors.lightRed,
      },
      headerTintColor: AppColors.white,
    })
  }, [])

  const { information, setInformation } = React.useContext(UserContext)

  const handleOnPressSave = () => {
    navigation.canGoBack() && navigation.goBack()
  }

  const onInputChange = (text: string, targetName: keyof ITicketVisitor) => {
    setInformation((prev) => ({
      ...prev,
      [targetName]: text,
    }))
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
            placeholder: 'Enter your full name',
            placeholderTextColor: AppColors.gray,
            autoFocus: true,
            autoComplete: 'name',
            style: {
              fontFamily: AppFonts.regular,
              fontSize: AppFontSizes.normal,
              color: AppColors.dark,
            },
            onChangeText(text) {
              onInputChange(text, 'name')
            },
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
                placeholder: 'Enter your phone number',
                autoComplete: 'tel',
                keyboardType: 'phone-pad',
                'aria-label': 'Phone number',
                style: {
                  fontFamily: AppFonts.regular,
                  fontSize: AppFontSizes.normal,
                  color: AppColors.dark,
                },
                onChangeText(text) {
                  onInputChange(text, 'phoneNumber')
                },
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
            placeholder: 'Enter your email address',
            autoComplete: 'email',
            keyboardType: 'email-address',
            'aria-label': 'Email',
            style: {
              fontFamily: AppFonts.regular,
              fontSize: AppFontSizes.normal,
              color: AppColors.dark,
            },
            onChangeText(text) {
              onInputChange(text, 'address')
            },
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

export default Contact

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    paddingHorizontal: 30,
    justifyContent: 'center',
    backgroundColor: AppColors.dark,
    gap: 20,
  },
  inputContainer: {
    width: '100%',
    height: 50,
    fontFamily: AppFonts.regular,
    fontSize: AppFontSizes.body,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderColor: AppColors.gray,
    borderWidth: 1,
    paddingVertical: 5,
  },
  label: {
    fontFamily: AppFonts.regular,
    fontSize: AppFontSizes.small,
    color: AppColors.secondary,
  },
  input: {
    color: AppColors.white,
    fontFamily: AppFonts.regular,
    fontSize: AppFontSizes.body,
  },
  country: {
    width: '100%',
  },
})
