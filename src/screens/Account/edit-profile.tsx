import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import Line from '@components/Line'
import { UserContext } from '@context/UserContext'
import { useMediaPicker } from '@hooks/services/useMediaPicker'
import { BASE_IMAGES_URL } from '@utils/server'
import { User } from '@schema/User/User'
import { avatarStorage, imageStorage } from '@lib/converter'
import Toast from 'react-native-root-toast'
import { uploadImage } from '@utils/upload'
import { updateUser } from '@services/user'
import MarkerIcon from '@assets/themes/icons/outline/MarkerIcon'
import { ROUTES } from '@constants/route'

const EditProfile = ({ navigation }: NativeStackScreenProps<any>) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Edit Profile',
      headerStyle: {
        backgroundColor: AppColors.primary,
      },
      headerTintColor: AppColors.white,
      headerShadowVisible: false,
      headerTitleStyle: {
        fontFamily: AppFonts.semiBold,
      },
    })
  }, [])
  const { user, setUser } = React.useContext(UserContext)
  const [userModify, setUserModify] = React.useState<User | undefined>(undefined)
  const [file, setFile] = React.useState<string | undefined>(undefined)
  React.useEffect(() => {
    setUserModify((prev) => ({
      ...prev,
      fullName: user?.fullName,
      email: user?.email,
      image: user?.image || '',
      phoneNumber: user?.phoneNumber,
      address: user?.address,
    }))
  }, [user])
  const onChange = (text: string, name: keyof User) => {
    setUserModify((prev) => ({ ...prev, [name]: text }))
  }

  const { pickImage } = useMediaPicker()
  const handleOnChangeProfilePicture = async () => {
    await pickImage()
      .then((res) => {
        setUserModify((prev) => ({ ...prev, image: res[0].uri }))
        const fileType = res[0].uri.split('.').pop()
        const base64 = `data:image/${fileType};base64,` + res[0].base64
        setFile(base64)
      })
      .catch((err) => {
        Toast.show(err.message, {
          position: Toast.positions.BOTTOM,
          backgroundColor: AppColors.error,
        })
      })
  }

  const [loading, setLoading] = React.useState(false)

  const handleSave = async () => {
    try {
      setLoading(true)
      let tempUser = userModify as User
      if (file) {
        const res = await uploadImage(file)
        setUserModify((prev) => ({ ...prev, image: res.data.imageId }))
        tempUser = {
          ...tempUser,
          image: res.data.imageId,
        }
      }
      const updatedUser = await updateUser(tempUser)
      if (updatedUser) {
        Toast.show('Update successfully', {
          position: Toast.positions.BOTTOM,
          backgroundColor: AppColors.success,
        })
        setUser(updatedUser.data)
      }
    } catch (err: any) {
      Toast.show(err.message, {
        position: Toast.positions.BOTTOM,
        backgroundColor: AppColors.error,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOnPressMarker = () => {
    navigation.navigate(ROUTES.MAP, {
      setAddressParams: (address: string) => {
        setUserModify((prev) => ({ ...prev, address }))
      },
    })
  }

  if (!user) {
    return <ActivityIndicator size={'large'} />
  }
  return (
    <View>
      <Text
        style={{
          fontFamily: AppFonts.semiBold,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        Profile picture
      </Text>
      <View
        style={{
          backgroundColor: AppColors.white,
          padding: 20,
          flexDirection: 'row',
          gap: 20,
        }}
      >
        <View
          style={{
            elevation: 10,
            backgroundColor: AppColors.white,
            alignSelf: 'flex-start',
            borderRadius: 6,
          }}
        >
          <Image
            source={{ uri: avatarStorage(userModify?.image || ''), width: 80, height: 80 }}
            style={{
              alignSelf: 'flex-start',
              borderRadius: 6,
            }}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: -6,
              right: -6,
              width: 20,
              height: 20,
              backgroundColor: AppColors.secondary,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleOnChangeProfilePicture}
          >
            <Text
              style={{
                color: AppColors.white,
                fontFamily: AppFonts.semiBold,
              }}
            >
              {'+'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: AppFonts.regular,
            color: AppColors.gray,
            maxWidth: '80%',
            fontSize: AppFontSizes.normal,
          }}
          numberOfLines={2}
        >
          Customize your profile by adding your picture
        </Text>
      </View>
      <Line />
      <View style={styles.labelContainer}>
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
          }}
        >
          Profile name
        </Text>
        <TextInput
          value={userModify?.fullName}
          onChangeText={(text) => onChange(text, 'fullName')}
          style={{
            fontFamily: AppFonts.regular,
            color: userModify?.fullName !== user.fullName ? AppColors.dark : AppColors.gray,
            borderBottomColor: AppColors.gray,
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingBottom: 0,
          }}
          placeholder={user.fullName || ''}
        />
      </View>
      <Line />
      <View style={styles.labelContainer}>
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
          }}
        >
          Email
        </Text>
        <TextInput
          value={userModify?.email}
          onChangeText={(text) => onChange(text, 'email')}
          style={{
            fontFamily: AppFonts.regular,
            color: userModify?.email !== user.email ? AppColors.dark : AppColors.gray,
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingBottom: 0,
            borderBottomColor: AppColors.gray,
          }}
          placeholder={user.email || ''}
        />
      </View>
      <Line />
      <View style={styles.labelContainer}>
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
          }}
        >
          Phone number
        </Text>
        <TextInput
          value={userModify?.phoneNumber}
          onChangeText={(text) => onChange(text, 'phoneNumber')}
          style={{
            fontFamily: AppFonts.regular,
            color: userModify?.phoneNumber !== user.phoneNumber ? AppColors.dark : AppColors.gray,
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingBottom: 0,
            borderBottomColor: AppColors.gray,
          }}
          placeholder={user.phoneNumber || ''}
        />
      </View>
      <Line />
      <View style={styles.labelContainer}>
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
          }}
        >
          Identity
        </Text>
        <TextInput
          value={userModify?.identity}
          onChangeText={(text) => onChange(text, 'identity')}
          style={{
            fontFamily: AppFonts.regular,
            color: userModify?.identity !== user.identity ? AppColors.dark : AppColors.gray,
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingBottom: 0,
            borderBottomColor: AppColors.gray,
          }}
          placeholder={user.identity || ''}
        />
      </View>
      <Line />
      <View style={{ ...styles.labelContainer }}>
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
            flex: 1,
          }}
        >
          Address
        </Text>
        <View
          style={{
            position: 'relative',
            // flex: 2,
            flexDirection: 'row',
            alignItems: 'center',
            maxWidth: '60%',
            // gap: 10,
          }}
        >
          <TextInput
            value={userModify?.address}
            onChangeText={(text) => onChange(text, 'address')}
            style={{
              fontFamily: AppFonts.regular,
              color: userModify?.address !== user.address ? AppColors.dark : AppColors.gray,
              borderBottomWidth: StyleSheet.hairlineWidth,
              paddingBottom: 0,
              borderBottomColor: AppColors.gray,
              paddingRight: 10,
            }}
            numberOfLines={3}
            multiline={true}
            placeholder={user.address || ''}
          />
          <TouchableOpacity
            style={{
              // position: 'absolute',
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
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: AppColors.primary,
          padding: 16,
          borderRadius: 6,
          margin: 20,
          alignItems: 'center',
          opacity: loading ? 0.7 : 1,
        }}
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text
            style={{
              color: AppColors.white,
              fontFamily: AppFonts.semiBold,
            }}
          >
            Save
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  labelContainer: {
    backgroundColor: AppColors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    alignItems: 'center',
  },
})
