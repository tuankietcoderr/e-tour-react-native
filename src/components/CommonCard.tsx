import { AppColors } from '@assets/themes/colors'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { BookmarkIconFill } from '@assets/themes/icons/fill'
import { BookmarkIconOutline } from '@assets/themes/icons/outline'
import { ROUTES } from '@constants/route'
import { imageStorage, toDot } from '@lib/converter'
import { useNavigation } from '@react-navigation/core'
import { saveTourThunk, unsaveTourThunk } from '@store/features/saved/thunk'
import { useAppDispatch } from '@store/hooks'
import React from 'react'
import { Image, ImageStyle, StyleProp, Text, TextStyle, TouchableOpacity, View } from 'react-native'
import { Rating } from 'react-native-ratings'

export interface CommonCardProps {
  title: string
  originalPrice: number
  isDomestic: boolean
  salePrice?: number
  titleStyle?: StyleProp<TextStyle>
  rating?: number
  reviewCount?: number
  image?: string
  isFavorite?: boolean
  isSaved?: boolean
  imageStyle?: StyleProp<ImageStyle>
  hideTourType?: boolean
  id: string
}

type ParamList = {
  route_id: string
}

const CommonCard = ({
  salePrice = -1,
  originalPrice = 0,
  isDomestic = false,
  rating = 0,
  isFavorite = false,
  isSaved = false,
  reviewCount = 0,
  hideTourType = false,
  ...props
}: CommonCardProps) => {
  const navigation = useNavigation<any>()
  const handlePressCommonCard = () => {
    navigation.navigate(ROUTES.TOUR_DETAIL, {
      route_id: props.id,
      isSaved,
    })
  }
  const [isSavedRoute, setIsSavedRoute] = React.useState<boolean>(isSaved)
  const dispatch = useAppDispatch()
  const handleSaveRoute = () => {
    setIsSavedRoute(!isSavedRoute)
    if (isSavedRoute) {
      dispatch(unsaveTourThunk(props.id))
    } else {
      dispatch(saveTourThunk(props.id))
    }
  }
  const WIDTH = 260
  return (
    <TouchableOpacity
      style={{
        borderRadius: 6,
        // elevation: 5,
        overflow: 'hidden',
        alignSelf: 'flex-start',
        backgroundColor: AppColors.white,
        minHeight: 320,
        borderWidth: 1,
        borderColor: AppColors.gray,
      }}
      onPress={handlePressCommonCard}
    >
      <View>
        <Image
          source={{
            uri: imageStorage(props?.image || ''),
            width: WIDTH,
            height: 130,
          }}
          style={[
            {
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              maxWidth: WIDTH,
              width: WIDTH,
            },
            props.imageStyle,
          ]}
          resizeMode="cover"
        />
        {!hideTourType && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              position: 'absolute',
              left: 0,
              top: 0,
              backgroundColor: isDomestic ? AppColors.secondary : AppColors.heavyYellow,
              borderBottomRightRadius: 6,
            }}
          >
            <Text
              style={{
                color: isDomestic ? AppColors.white : AppColors.dark,
                fontFamily: AppFonts.semiBold,
              }}
            >
              {' '}
              {isDomestic ? 'DOMESTIC' : 'INTERNATIONAL'}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          width: WIDTH,
          padding: 10,
          maxWidth: WIDTH,
          gap: 8,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 6,
          }}
        >
          <Text
            style={[
              {
                color: AppColors.secondary,
                fontSize: AppFontSizes.body,
                fontFamily: AppFonts.extraBold,
                textTransform: 'capitalize',
                flex: 1,
              },
              props.titleStyle,
            ]}
            numberOfLines={2}
          >
            {props.title}
          </Text>
          <View
            style={{
              gap: 8,
            }}
          >
            <TouchableOpacity onPress={handleSaveRoute}>
              {!isSavedRoute ? (
                <BookmarkIconOutline viewBox="0 0 13 13" width={30} height={30} color="#FFCD29" />
              ) : (
                <BookmarkIconFill
                  viewBox="0 0 13 13"
                  width={30}
                  height={30}
                  color={AppColors.heavyYellow}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {salePrice === -1 ? (
            <Text
              style={{
                fontSize: AppFontSizes.medium,
                fontFamily: AppFonts.medium,
              }}
            >
              {toDot(originalPrice)}{' '}
              <Text
                style={{
                  fontSize: AppFontSizes.small,
                }}
              >
                {' '}
                VND
              </Text>
            </Text>
          ) : (
            <View>
              <Text
                style={{
                  textDecorationLine: 'line-through',
                  color: AppColors.gray,
                  fontSize: AppFontSizes.small,
                }}
              >
                {toDot(originalPrice)} VND
              </Text>
              <Text
                style={{
                  color: AppColors.error,
                  fontSize: AppFontSizes.medium,
                  fontFamily: AppFonts.medium,
                }}
              >
                {toDot(salePrice)}{' '}
                <Text
                  style={{
                    fontSize: AppFontSizes.small,
                  }}
                >
                  {' '}
                  VND
                </Text>
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Rating
            startingValue={rating}
            imageSize={16}
            ratingCount={5}
            readonly
            style={{
              alignItems: 'flex-start',
            }}
          />
          <Text
            style={{
              fontFamily: AppFonts.regular,
              fontSize: AppFontSizes.small,
              color: AppColors.gray,
            }}
          >{`(${reviewCount} reviews)`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CommonCard
