import { View, Text, TextStyle } from 'react-native'
import React from 'react'
import { AppFonts } from '@assets/themes/font'

interface IVariant {
  info: string
  success: string
  warning: string
  error: string
  ghost: string
}

type TVariant = keyof IVariant

interface IProps {
  message: string
  visible: boolean
  variant?: TVariant
  style?: TextStyle
}

const CustomAlert = ({ visible = false, variant = 'info', ...props }: IProps) => {
  let style: TextStyle = {}
  switch (variant) {
    case 'info':
      style = {
        color: 'blue',
      }
      break
    case 'success':
      style = {
        color: 'green',
      }
      break
    case 'warning':
      style = {
        color: 'yellow',
      }
      break
    case 'error':
      style = {
        color: 'red',
      }
      break
    case 'ghost':
      style = {
        color: 'grey',
      }
      break
    default:
      break
  }
  return (
    <Text
      style={{
        display: visible ? 'flex' : 'none',
        marginTop: 5,
        fontFamily: AppFonts.regular,
        ...style,
        ...props.style,
      }}
    >
      {props.message}
    </Text>
  )
}

export default CustomAlert
