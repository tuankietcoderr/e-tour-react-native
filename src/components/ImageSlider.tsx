import { View, Text, FlatList, Image, useWindowDimensions, Dimensions } from 'react-native'
import React from 'react'
import { imageStorage } from '@lib/converter'

interface ImageSliderProps {
  images: string[] | undefined
  width?: number
  height?: number
  autoplay?: boolean
  duration?: number // ms
}

const ImageSlider = ({
  images = [],
  width = Dimensions.get('window').width,
  height = 240,
  autoplay = false,
  duration = 3000,
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [error, setError] = React.useState(false)
  const ref = React.useRef<FlatList>(null)
  const onScroll = React.useCallback((e) => {
    const { contentOffset } = e.nativeEvent
    const viewSize = e.nativeEvent.layoutMeasurement
    const pageNum = Math.floor(contentOffset.x / viewSize.width)
    setCurrentIndex(pageNum)
  }, [])
  React.useEffect(() => {
    if (autoplay && images.length > 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => {
          if (prev === images.length - 1) {
            return 0
          }
          return prev + 1
        })
      }, duration)
    }
  }, [currentIndex])
  React.useEffect(() => {
    try {
      if (autoplay && images.length > 1 && !error) {
        ref.current?.scrollToIndex({
          index: currentIndex,
          animated: true,
        })
      }
    } catch (e) {
      setError(true)
    }
  }, [currentIndex])
  return (
    <View
      style={{
        zIndex: 1,
      }}
    >
      <FlatList
        ref={ref}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={!autoplay ? onScroll : () => {}}
        data={images?.map((image) => imageStorage(image))}
        ListEmptyComponent={() => (
          <Image
            source={{ uri: imageStorage(''), width, height }}
            resizeMode="contain"
            style={{
              width,
              height,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            }}
          />
        )}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item, width, height }}
            resizeMode="cover"
            style={{
              width,
              height,
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
            }}
          />
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          gap: 5,
        }}
      >
        {images.length > 1 &&
          images?.map((_, index) => (
            <Text
              key={index}
              style={{
                color: currentIndex === index ? 'white' : 'black',
                opacity: currentIndex === index ? 1 : 0.5,
              }}
            >
              ⬤
            </Text>
          ))}
      </View>
    </View>
  )
}

export default ImageSlider
