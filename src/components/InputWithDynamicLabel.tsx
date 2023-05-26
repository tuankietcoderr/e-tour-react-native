import { View, Text, StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native'
import React from 'react'
import { AppFonts, AppFontSizes } from '@assets/themes/font'
import { AppColors } from '@assets/themes/colors'

interface InputWithDynamicLableProps {
  wrapperStyle?: ViewStyle
  inputProps: TextInputProps
  wrapChildren?: React.ReactNode
}

const InputWithDynamicLable = (props: InputWithDynamicLableProps) => {
  const [focus, setFocus] = React.useState<boolean>(false)
  return (
    <View style={[styles.inputContainer, { ...props.wrapperStyle }]}>
      <Text style={focus ? styles.labelFocus : styles.labelNoFocus}>
        {props.inputProps['aria-label']}
      </Text>
      <TextInput
        style={[styles.input, props.inputProps.style]}
        placeholderTextColor={AppColors.gray}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props.inputProps}
      />
      {props.wrapChildren}
    </View>
  )
}

export default InputWithDynamicLable

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 70,
    paddingHorizontal: 30,
    gap: 60,
    backgroundColor: AppColors.primary,
  },
  inputContainer: {
    width: '100%',
    // height: 50,
    fontFamily: AppFonts.regular,
    fontSize: AppFontSizes.body,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderColor: AppColors.gray,
    borderWidth: 1,
    paddingVertical: 5,
    minHeight: 50,
    justifyContent: 'center',
  },
  labelFocus: {
    fontFamily: AppFonts.regular,
    fontSize: AppFontSizes.small,
    color: AppColors.primary,
  },
  labelNoFocus: {
    display: 'none',
  },
  input: {
    fontFamily: AppFonts.regular,
    fontSize: AppFontSizes.body,
  },
})
