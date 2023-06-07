import React from 'react'
import { View } from 'react-native'

import { ROUTES } from '@constants/route'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Animated, TouchableOpacity } from 'react-native'
import History from '..'
import PendingTicket from '../pending'
import { AppFonts } from '@assets/themes/font'
import { AppColors } from '@assets/themes/colors'
import MyTabBar from '@components/MyTabBar'
const Tab = createMaterialTopTabNavigator()

const HistoryTab = () => {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen key={ROUTES.PENDING_TICKET} name={'Pending ticket'} component={PendingTicket} />
      <Tab.Screen key={ROUTES.HISTORY} name={'Booked ticket'} component={History} />
    </Tab.Navigator>
  )
}

export default HistoryTab
