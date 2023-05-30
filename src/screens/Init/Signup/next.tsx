import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { AngleRightIcon } from '@assets/themes/icons/outline'
import CustomAlert from '@components/CustomAlert'
import { CPicker, onClose, onOpen } from '@components/Picker'
import { InputWithDynamicLabel } from '@components/index'
import { ROUTES } from '@constants/route'
import { SignUpContext } from '@context/SignUpContext'
import { signUp } from '@services/auth'
import axios from 'axios'
import { ScrollView, useWindowDimensions } from 'react-native'
import Toast from 'react-native-root-toast'
import MarkerIcon from '@assets/themes/icons/outline/MarkerIcon'

export interface Country {
  name: string
  code: string
  emoji: string
  unicode: string
  image: string
}

interface ICredential {
  fullName: string
  email: string
  phoneNumber: string
  identity: string
  address: string
}

const NextSignUp = ({ navigation }: NativeStackScreenProps<any>) => {
  // ** Country Picker **//
  const [data, setData] = useState<Country[]>([])
  const [selected, setSelected] = useState<Country | undefined>(undefined)
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [phoneCode, setPhoneCode] = useState<string>('auto')

  const filteredData = useMemo(() => {
    if (data && data.length > 0) {
      const filtered = data.filter((item: Country) =>
        item.name.toLocaleLowerCase('en').includes(query.toLocaleLowerCase('en'))
      )
      return filtered
    }
    return []
  }, [data, query])

  const handleOpenCountry = async () => {
    if (data.length > 0) {
      onOpen('country')
      return
    }
    setLoading(true)
    const result = await axios.get(
      'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json'
    )
    if (result.status === 200) {
      setData(result.data)
      onOpen('country')
    }
    setQuery('')
    setLoading(false)
  }

  const handleSelectCountry = async (item: Country) => {
    setSelected(item)
    onClose('country')
    const result = await axios.get('http://country.io/phone.json')
    if (result.status === 200) {
      const q: string = result.data[item.code]
      setPhoneCode(q || '')
    }
  }
  const onSearch = (text: string) => {
    setQuery(text)
  }
  // ** End Country Picker **//

  const renderListItem = (item: Country) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelectCountry(item)}
        style={{
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontFamily: AppFonts.regular,
            fontSize: AppFontSizes.body,
            gap: 10,
          }}
        >
          {item?.emoji} {item?.name}
        </Text>
      </TouchableOpacity>
    )
  }

  const { width, height } = useWindowDimensions()

  const { signUpForm, setSignUpForm } = React.useContext(SignUpContext)
  const [form, setForm] = useState<ICredential>({
    fullName: '',
    email: '',
    phoneNumber: '',
    identity: '',
    address: '',
  })
  const [error, setError] = useState({
    fullName: false,
    email: false,
    phoneNumber: false,
    identity: false,
    address: false,
  })

  const onInputChange = (key: keyof ICredential, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const onBlur = (key: keyof ICredential) => {
    if (form[key].length === 0) {
      setError({ ...error, [key]: true })
    } else {
      setError({ ...error, [key]: false })
    }
  }

  const canNext: boolean =
    form.email.length > 0 &&
    form.fullName.length > 0 &&
    form.identity.length > 0 &&
    form.phoneNumber.length > 0 &&
    form.address.length > 0

  const handlePressNext = async () => {
    // **! VALIDATE FORM ** //
    if (!canNext)
      return setError((prev) => {
        return {
          ...prev,
          fullName: true,
          email: true,
          phoneNumber: true,
          identity: true,
        }
      })
    if (!form.fullName.length) {
      return setError((prev) => {
        return {
          ...prev,
          fullName: true,
        }
      })
    }
    if (!form.email.length) {
      return setError((prev) => {
        return {
          ...prev,
          email: true,
        }
      })
    }
    if (!form.phoneNumber.length) {
      return setError((prev) => {
        return {
          ...prev,
          phoneNumber: true,
        }
      })
    }
    if (!form.identity.length) {
      return setError((prev) => {
        return {
          ...prev,
          identity: true,
        }
      })
    }
    if (!form.address.length) {
      return setError((prev) => {
        return {
          ...prev,
          address: true,
        }
      })
    }
    // **! END VALIDATE FORM ** //
    setSignUpForm({
      ...signUpForm,
      ...form,
    })
    const data = {
      ...signUpForm,
      ...form,
    }
    // ** TODO: CREATE USER ** //
    Toast.show('Creating your account...', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
    })
    await signUp(data)
      .then((res) => {
        Alert.alert('Good job', 'Your account has been successfully created!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate(ROUTES.APP_PROVIDER)
            },
          },
        ])
      })
      .catch((err) => {
        Alert.alert('Error', err.response.data.message)
      })
  }

  const handleOnPressMarker = () => {
    navigation.navigate(ROUTES.MAP, {
      setAddressParams: (address: string) => {
        setForm((prev) => ({ ...prev, address }))
      },
    })
  }

  return (
    <ScrollView>
      <View style={[styles.container, { height }]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 0,
              zIndex: 1,
            }}
            onPress={() => navigation.goBack()}
          >
            <AngleRightIcon
              style={{
                transform: [{ rotate: '180deg' }],
              }}
              width={30}
              height={30}
              fill={AppColors.white}
              viewBox="0 0 20 20"
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: AppFonts.extraBold,
              fontSize: AppFontSizes.h2,
              color: AppColors.primary,
            }}
          >
            Sign Up
          </Text>
        </View>
        <View>
          <InputWithDynamicLabel
            wrapperStyle={{
              borderColor: error.fullName ? AppColors.red : AppColors.gray,
              borderWidth: 1,
            }}
            inputProps={{
              placeholder: 'Enter your full name',
              autoFocus: true,
              autoComplete: 'name',
              'aria-label': 'Full name',
              onChangeText: (text) => onInputChange('fullName', text),
              onBlur: () => onBlur('fullName'),
              value: form.fullName,
            }}
          />
          <CustomAlert
            message="Please enter your username"
            variant="error"
            visible={error.fullName}
          />
        </View>
        <View>
          <InputWithDynamicLabel
            wrapperStyle={{
              borderColor: error.email ? AppColors.red : AppColors.gray,
              borderWidth: 1,
            }}
            inputProps={{
              placeholder: 'Enter your email',
              autoComplete: 'email',
              'aria-label': 'Email',
              keyboardType: 'email-address',
              onChangeText: (text) => onInputChange('email', text),
              onBlur: () => onBlur('email'),
              value: form.email,
            }}
          />
          <CustomAlert message="Please enter your email" variant="error" visible={error.email} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nationality</Text>
          {selected ? (
            <TouchableOpacity onPress={handleOpenCountry} style={styles.country}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: AppFontSizes.body,
                  }}
                >
                  {selected.emoji}
                </Text>
                <Text
                  style={{
                    fontSize: AppFontSizes.body,
                    fontFamily: AppFonts.semiBold,
                  }}
                >
                  {selected.code}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.country} onPress={handleOpenCountry}>
              <Text
                style={{
                  fontFamily: AppFonts.regular,
                  color: AppColors.gray,
                  fontSize: AppFontSizes.body,
                }}
              >
                Choose
              </Text>
            </TouchableOpacity>
          )}
          {data && (
            <CPicker
              id="country"
              data={filteredData}
              inputValue={query}
              searchable={true}
              label="Select Country"
              setSelected={setSelected}
              onSearch={onSearch}
              renderListItem={useMemo(() => renderListItem, [filteredData])}
            />
          )}
        </View>
        {loading && <ActivityIndicator />}
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}
        >
          <View
            style={[
              styles.inputContainer,
              {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            <TextInput
              style={[
                styles.input,
                {
                  color: AppColors.gray,
                },
              ]}
              value={`(${
                phoneCode.includes('+') || phoneCode.includes('auto') ? phoneCode : '+' + phoneCode
              })`}
              editable={false}
            />
          </View>
          <View
            style={{
              flex: 3,
            }}
          >
            <InputWithDynamicLabel
              wrapperStyle={{
                borderColor: error.phoneNumber ? AppColors.red : AppColors.gray,
                borderWidth: 1,
              }}
              inputProps={{
                placeholder: 'Enter your phone number',
                autoComplete: 'tel',
                keyboardType: 'phone-pad',
                'aria-label': 'Phone number',
                onChangeText: (text) => onInputChange('phoneNumber', text),
                onBlur: () => onBlur('phoneNumber'),
                value: form.phoneNumber,
              }}
            />
            <CustomAlert
              message="Please enter your phone number"
              variant="error"
              visible={error.phoneNumber}
            />
          </View>
        </View>
        <View>
          <InputWithDynamicLabel
            wrapperStyle={{
              borderColor: error.address ? AppColors.red : AppColors.gray,
              borderWidth: 1,
            }}
            inputProps={{
              placeholder: 'Enter your address',
              autoComplete: 'street-address',
              'aria-label': 'Address',
              onChangeText: (text) => onInputChange('address', text),
              onBlur: () => onBlur('address'),
              value: form.address,
              multiline: true,
              numberOfLines: 3,
            }}
            wrapChildren={
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 0,
                  zIndex: 3,
                  bottom: 0,
                  justifyContent: 'center',
                }}
                onPress={handleOnPressMarker}
              >
                <MarkerIcon width={20} height={20} viewBox="0 0 24 24" color={AppColors.red} />
              </TouchableOpacity>
            }
          />
          <CustomAlert
            message="Please enter your address"
            visible={error.address}
            variant="error"
          />
        </View>
        <View>
          <InputWithDynamicLabel
            inputProps={{
              placeholder: 'Enter your ID/Passport number',
              keyboardType: 'number-pad',
              'aria-label': 'ID/Passport number',
              onChangeText: (text) => onInputChange('identity', text),
              onBlur: () => onBlur('identity'),
              value: form.identity,
            }}
          />
          <CustomAlert
            message="Please enter your ID/Passport number"
            variant="error"
            visible={error.identity}
          />
        </View>
        <View
          style={{
            gap: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: AppColors.primary,
              height: 50,
              justifyContent: 'center',
              borderRadius: 6,
              opacity: canNext ? 1 : 0.5,
            }}
            onPress={handlePressNext}
            disabled={!canNext}
          >
            <Text
              style={{
                fontFamily: AppFonts.semiBold,
                fontSize: AppFontSizes.body,
                textAlign: 'center',
                color: AppColors.white,
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default NextSignUp

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    paddingHorizontal: 30,
    justifyContent: 'center',
    backgroundColor: AppColors.white,
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