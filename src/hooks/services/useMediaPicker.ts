import * as ImagePicker from 'expo-image-picker'
import Toast from 'react-native-root-toast'
import React from 'react'
export const useMediaPicker = () => {
  const [assets, setAssets] = React.useState<ImagePicker.ImagePickerAsset[] | null>(null)
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.OVER_FULL_SCREEN,
      base64: true,
    })
    if (!result.canceled) {
      setAssets(result.assets)
      return result.assets
    } else {
      if (!assets) {
        Toast.show("You didn't choose any image", {
          duration: Toast.durations.SHORT,
        })
        throw new Error("You didn't choose any image")
      }
      Toast.show('Image picker canceled', {
        duration: Toast.durations.SHORT,
      })
      throw new Error('Image picker canceled')
    }
  }

  return { assets, pickImage }
}
