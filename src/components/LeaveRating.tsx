import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { TextInput } from 'react-native-gesture-handler'
import { Rating } from 'react-native-ratings'
import { Rate } from '@schema/User/Rate'
import { UserContext } from '@context/UserContext'
import useCreateRate from '@hooks/socket/useCreateRate'
import Toast from 'react-native-root-toast'

interface LeaveRatingProps {
  route_id: string
}

const LeaveRating = (props: LeaveRatingProps) => {
  const [isClicked, setIsClicked] = React.useState(false)
  const [comment, setComment] = React.useState<Rate>({
    description: '',
    star: 5,
    userId: {},
    touristsRouteId: props.route_id,
  })
  const { createRate, data, error } = useCreateRate()
  React.useEffect(() => {
    if (data) {
      Toast.show('Thanks for rating', {
        duration: Toast.durations.SHORT,
        backgroundColor: AppColors.success,
      })
      // Alert.alert('Success', 'Create rate success')
    }
    if (error) {
      Toast.show('Failed to rate', {
        duration: Toast.durations.SHORT,
        backgroundColor: AppColors.red,
      })
    }
  }, [data, error])
  const onChangeText = (text: string) => {
    setComment((prev) => ({ ...prev, description: text }))
  }

  const handlePressLeaveRating = () => {
    setIsClicked(true)
  }

  const handleOnPressCancel = () => {
    setIsClicked(false)
  }

  const handleSubmit = () => {
    if (comment.description === '') return Alert.alert('Warning', "Comment can't be empty")
    setIsClicked(false)
    createRate(comment)
  }

  return (
    <View>
      {!isClicked ? (
        <TouchableOpacity
          style={{
            backgroundColor: AppColors.blue,
            padding: 10,
            borderRadius: 6,
            alignItems: 'center',
          }}
          onPress={handlePressLeaveRating}
        >
          <Text
            style={{
              color: AppColors.white,
              fontFamily: AppFonts.semiBold,
            }}
          >
            Leave a rating
          </Text>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            gap: 10,
          }}
        >
          <TextInput
            placeholder="Leave a comment"
            style={{
              borderColor: AppColors.gray,
              borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 6,
              padding: 10,
              fontFamily: AppFonts.regular,
            }}
            value={comment.description}
            onChangeText={onChangeText}
            multiline
          />
          <Rating
            ratingCount={5}
            startingValue={5}
            imageSize={20}
            onFinishRating={(e: number) => setComment((prev) => ({ ...prev, star: e }))}
          />
          <Text
            style={{
              fontFamily: AppFonts.regular,
              fontSize: AppFontSizes.small,
              color: AppColors.gray,
              textAlign: 'center',
            }}
          >
            (Click or swipe to rate)
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 8,
                borderRadius: 6,
              }}
              onPress={handleOnPressCancel}
            >
              <Text
                style={{
                  fontFamily: AppFonts.semiBold,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: AppColors.blue,
                paddingHorizontal: 20,
                paddingVertical: 8,
                borderRadius: 6,
              }}
              onPress={handleSubmit}
            >
              <Text
                style={{
                  color: AppColors.white,
                  fontFamily: AppFonts.semiBold,
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}

export default LeaveRating
