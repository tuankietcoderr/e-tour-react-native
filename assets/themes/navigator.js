'use strict'
import Account from '@screens/Account'
import History from '@screens/History'
import Home from '@screens/Home'
import Saved from '@screens/Saved'
import { BookmarkIconFill, HistoryIconFill, HomeIconFill, UserIconFill } from './icons/fill'
import {
  HomeIconOutline,
  HistoryIconOutline,
  BookmarkIconOutline,
  UserIconOutline,
} from './icons/outline'
import { ROUTES } from '@constants/route'
import HistoryTab from '@screens/History/tab'

export const navigator = [
  {
    index: 0,
    name: 'Home',
    path: '/home',
    iconOutline: ({ width, height, viewBox, color, ...props }) => (
      <HomeIconOutline width={width} height={height} viewBox={viewBox} color={color} />
    ),
    iconFill: ({ width, height, viewBox, color, ...props }) => (
      <HomeIconFill width={width} height={height} viewBox={viewBox} color={color} />
    ),
    component: Home,
  },
  {
    index: 1,
    name: ROUTES.HISTORY_TAB,
    path: '/history',
    iconOutline: ({ width, height, viewBox, color, ...props }) => (
      <HistoryIconOutline width={width} height={height} viewBox={viewBox} color={color} />
    ),
    iconFill: ({ width, height, viewBox, color, ...props }) => (
      <HistoryIconFill width={width} height={height} viewBox={viewBox} color={color} />
    ),
    component: HistoryTab,
  },
  {
    index: 2,
    name: 'Saved',
    path: '/saved',
    iconOutline: ({ width, height, viewBox, color, ...props }) => (
      <BookmarkIconOutline width={width} height={height} viewBox={viewBox} color={color} />
    ),
    iconFill: ({ width, height, viewBox, color, ...props }) => (
      <BookmarkIconFill width={width} height={height} viewBox={viewBox} color={color} />
    ),
    component: Saved,
  },
  {
    index: 3,
    name: 'Account',
    path: '/account',
    iconOutline: ({ width, height, viewBox, color, ...props }) => (
      <UserIconOutline width={width} height={height} viewBox={viewBox} color={color} />
    ),
    iconFill: ({ width, height, viewBox, color, ...props }) => (
      <UserIconFill width={width} height={height} viewBox={viewBox} color={color} />
    ),
    component: Account,
  },
]
