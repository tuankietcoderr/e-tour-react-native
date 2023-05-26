import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { AppColors } from '../../assets/themes/colors'
import { navigator } from '../../assets/themes/navigator'
const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      {navigator.map((nav, index) => (
        <Tab.Screen
          key={nav.name}
          name={nav.name}
          component={nav.component}
          options={{ headerShown: false, ...nav.options }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default BottomTabs

const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 'auto',
        backgroundColor: AppColors.white,
        elevation: 10,
      }}
    >
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
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }
        const IconOutline = navigator.at(index).iconOutline
        const IconFill = navigator.at(index).iconFill
        const GeneIcon = isFocused ? IconFill : IconOutline
        const color = isFocused ? AppColors.primary : AppColors.gray
        return (
          <TouchableOpacity
            key={state.routes[index].key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',

              paddingVertical: 10,
            }}
          >
            <GeneIcon width={20} height={20} viewBox={'0 0 13 13'} color={color} />
            <Text style={{ color }}>{label.replace('HistoryTab', 'History')}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
