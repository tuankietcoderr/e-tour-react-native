import { View, Text, StyleSheet, TextStyle, FlatList } from 'react-native'
import React from 'react'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { AppColors } from '@assets/themes/colors'

export type Step = {
  index: number
  label: string
  style?: TextStyle
}

interface IBookingStepProps {
  steps: Step[]
  currentStep: number //! step <= steps
  stepsToShow?: number[]
}

export const steps: Step[] = [
  {
    index: 0,
    label: 'Booking',
  },
  {
    index: 1,
    label: 'Payment',
  },
  {
    index: 2,
    label: 'Result',
  },
]

const BookingStep = (props: IBookingStepProps) => {
  const steps: Step[] = props.stepsToShow
    ? props.steps.filter((_, index) => props.stepsToShow?.includes(index))
    : props.steps
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {steps.map((step, index) => {
        return (
          <View
            key={step.label}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              opacity: step.index === props.currentStep ? 1 : 0.5,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <View style={styles.progressLabel}>
                <Text
                  style={{
                    fontFamily: AppFonts.semiBold,
                  }}
                >
                  {step.index + 1}
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: AppFonts.semiBold,
                  color: AppColors.white,
                }}
              >
                {step.label}
              </Text>
            </View>
            {index < steps.length - 1 && (
              <View
                style={{
                  width: 20,
                  height: 2,
                  backgroundColor: AppColors.white,
                  opacity: 0.5,
                }}
              />
            )}
          </View>
        )
      })}
    </View>
  )
}

export default BookingStep

const styles = StyleSheet.create({
  progressLabel: {
    width: 30,
    height: 30,
    alignSelf: 'flex-start',
    backgroundColor: AppColors.white,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
