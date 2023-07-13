import {
  View,
  Text,
  Image,
  StyleProp,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import React from 'react'
import { AppColors } from '@assets/themes/colors'
import { AppFonts, AppFontSizes } from '@assets/themes/font'
import { BookmarkIconOutline, FavoriteIconOutline } from '@assets/themes/icons/outline'
import { imageStorage, toDot } from '@lib/converter'
import { Rating, AirbnbRating } from 'react-native-ratings'
import { BASE_IMAGES_URL } from '@utils/server'
import MarkerIcon from '@assets/themes/icons/outline/MarkerIcon'
import { useNavigation } from '@react-navigation/core'
import { ROUTES } from '@constants/route'
import useCreateSave from '@hooks/socket/useCreateSave'
import { BookmarkIconFill } from '@assets/themes/icons/fill'
import { useAppDispatch } from '@store/hooks'
import { saveTourThunk, unsaveTourThunk } from '@store/features/saved/thunk'

export interface CommonCardHorizontallyProps {
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
  route?: string[]
  id: string
  hideSaved?: boolean
}

const CommonCardHorizontally = ({
  salePrice = -1,
  originalPrice = 0,
  isDomestic = false,
  rating = 0,
  isFavorite = false,
  isSaved = false,
  reviewCount = 0,
  hideTourType = false,
  route = [],
  hideSaved = false,
  ...props
}: CommonCardHorizontallyProps) => {
  const { width } = useWindowDimensions()
  const navigation = useNavigation<any>()
  const onPress = () => {
    navigation.navigate(ROUTES.TOUR_DETAIL, {
      route_id: props.id,
    })
  }
  const [isSavedRoute, setIsSavedRoute] = React.useState<boolean>(isSaved)
  const { saveRoute, unSaveRoute } = useCreateSave()
  const dispatch = useAppDispatch()

  const handleSaveRoute = () => {
    setIsSavedRoute(!isSavedRoute)
    if (isSavedRoute) {
      dispatch(unsaveTourThunk(props.id))
    } else {
      dispatch(saveTourThunk(props.id))
    }
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: AppColors.white,
        flexDirection: 'row',
        gap: 10,
        width: width - 20 * 2,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: AppColors.gray,
      }}
    >
      <View>
        <Image
          source={{
            uri: imageStorage(props.image || ''),
            width: 140,
            height: 140,
          }}
          style={{
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
            alignSelf: 'flex-start',
          }}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flex: 6,
        }}
      >
        <View
          style={{
            gap: 6,
            flex: 1,
          }}
        >
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                fontSize: AppFontSizes.body,
                fontFamily: AppFonts.bold,
                color: AppColors.secondary,
                paddingTop: 10,
                flex: 1,
              }}
              numberOfLines={2}
            >
              {props.title}
            </Text>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingRight: 10,
              }}
              onPress={handleSaveRoute}
            >
              {!hideSaved &&
                (!isSavedRoute ? (
                  <BookmarkIconOutline viewBox="0 0 13 13" width={24} height={24} color="#FFCD29" />
                ) : (
                  <BookmarkIconFill viewBox="0 0 13 13" width={24} height={24} color="#FFCD29" />
                ))}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              paddingRight: 10,
            }}
          >
            <MarkerIcon viewBox="0 0 24 24" width={12} height={12} />
            <Text
              style={{
                fontSize: AppFontSizes.small,
                fontFamily: AppFonts.regular,
                paddingRight: 10,
              }}
              numberOfLines={2}
            >
              {route.length > 0 ? route.join(' - ') : 'No given route'}
            </Text>
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
          <View>
            {salePrice === -1 ? (
              <Text
                style={{
                  fontSize: AppFontSizes.medium,
                  fontFamily: AppFonts.bold,
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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  paddingRight: 10,
                }}
              >
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
                    fontFamily: AppFonts.bold,
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
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CommonCardHorizontally
