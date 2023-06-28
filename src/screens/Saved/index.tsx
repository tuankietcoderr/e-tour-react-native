import MyTabBar from '@components/MyTabBar'
import { ROUTES } from '@constants/route'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import SavedTours from './tours'
import SavedVouchers from './vouchers'
const Tab = createMaterialTopTabNavigator()
const Saved = () => {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen key={ROUTES.SAVED_TOURS} name={'Saved tours'} component={SavedTours} />
      <Tab.Screen key={ROUTES.SAVED_VOUCHERS} name={'Saved vouchers'} component={SavedVouchers} />
    </Tab.Navigator>
  )
}

export default Saved
