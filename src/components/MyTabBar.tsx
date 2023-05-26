import { AppColors } from '@assets/themes/colors'
import { AppFonts } from '@assets/themes/font'
import { Animated } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'

export default function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        const inputRange = state.routes.map((_, i) => i)
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.4)),
        })

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
            style={{
              flex: 1,
              padding: 10,
              paddingVertical: 16,
              alignItems: 'center',
              borderBottomWidth: isFocused ? 1 : 0,
              borderBottomColor: AppColors.gray,
            }}
          >
            <Animated.Text
              style={{ opacity, fontFamily: isFocused ? AppFonts.bold : AppFonts.regular }}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
