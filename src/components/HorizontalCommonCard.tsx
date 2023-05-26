import { View, Text, Image, StyleProp, ImageStyle, TextStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppColors } from '@assets/themes/colors'
import { AppFonts, AppFontSizes } from '@assets/themes/font'
import { BookmarkIconOutline, FavoriteIconOutline } from '@assets/themes/icons/outline'
import { imageStorage, toDot } from '@lib/converter'
import { Rating, AirbnbRating } from 'react-native-ratings'
import { Col, Grid, Row } from 'react-native-easy-grid'
import useSavedRoute from '@hooks/socket/useSavedRoute'
import { BookmarkIconFill } from '@assets/themes/icons/fill'

export interface HorizontalCommonCardProps {
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
  id?: string
}

const HorizontalCommonCard = ({
  salePrice = -1,
  originalPrice = 0,
  isDomestic = false,
  rating = 0,
  isFavorite = false,
  isSaved = false,
  ...props
}: HorizontalCommonCardProps) => {
  const { data } = useSavedRoute()
  return (
    <Grid
      style={{
        backgroundColor: AppColors.white,
        borderRadius: 6,
        elevation: 5,
        overflow: 'hidden',
        alignSelf: 'flex-start',
        gap: 10,
      }}
    >
      <Col size={40}>
        <View>
          <Image
            source={{ uri: imageStorage(props.image || ''), width: 150, height: 130 }}
            style={[
              {
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
                overflow: 'hidden',
                maxWidth: 180,
              },
              props.imageStyle,
            ]}
          />
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
        </View>
      </Col>
      <Col
        size={50}
        style={{
          paddingVertical: 10,
          paddingLeft: 20,
        }}
      >
        <Row>
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
        </Row>
        <Row>
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
        </Row>
        <Row
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
          >{`(${211} reviews)`}</Text>
        </Row>
      </Col>
      <Col
        size={10}
        style={{
          paddingVertical: 10,
          paddingRight: 10,
          gap: 10,
        }}
      >
        <TouchableOpacity>
          {data && data.filter((p) => props.id && p._id === props.id).length === 0 ? (
            <BookmarkIconOutline viewBox="0 0 13 13" width={24} height={24} color="#FFCD29" />
          ) : (
            <BookmarkIconFill
              viewBox="0 0 13 13"
              width={24}
              height={24}
              color={AppColors.heavyYellow}
            />
          )}
        </TouchableOpacity>
      </Col>
    </Grid>
  )
}

export default HorizontalCommonCard
