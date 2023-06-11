import { View, Text, StatusBar, FlatList, TouchableOpacity, LogBox } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppColors } from '@assets/themes/colors'
import { ITicketVisitor, PaymentStatus, Ticket } from '@schema/User/Ticket'
import { RouteProp, useRoute } from '@react-navigation/core'
import LinkCard from '@components/LinkCard'
import { AppFonts } from '@assets/themes/font'
import { UserIconOutline } from '@assets/themes/icons/outline'
import { TextInput } from 'react-native'
import { ROUTES } from '@constants/route'
import useTicket from '@hooks/socket/useTicket'
import Toast from 'react-native-root-toast'
import MarkerIcon from '@assets/themes/icons/outline/MarkerIcon'

type ParamList = {
  VisitorsManagementParams: {
    ticket: Ticket
  }
}

const VisitorsManagement = ({ navigation }: NativeStackScreenProps<any>) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Visitors information management',
      headerStyle: {
        backgroundColor: AppColors.blue,
      },
      headerTintColor: AppColors.white,
    })
    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])
  }, [])
  const params = useRoute<RouteProp<ParamList, 'VisitorsManagementParams'>>().params
  const { ticket } = params
  const [ticketState, setTicketState] = React.useState<Ticket>(ticket)
  const { updateTicket, updateResult, isError, error } = useTicket()
  React.useEffect(() => {
    if (isError) {
      Toast.show('Error', {
        position: Toast.positions.BOTTOM,
        backgroundColor: AppColors.red,
      })
    }
    if (updateResult) {
      setTicketState(updateResult)
    }
  }, [updateResult, isError])
  const setState = (visitor: ITicketVisitor) => {
    setTicketState((prev) => ({
      ...prev,
      visitors: prev.visitors.map((item) => (item._id === visitor._id ? visitor : item)),
    }))
  }
  const handleOnPressSaveChanges = () => {
    updateTicket({
      ...ticketState,
      status: PaymentStatus.PENDING,
    })
    Toast.show('Update successfully', {
      position: Toast.positions.BOTTOM,
      backgroundColor: AppColors.success,
    })
  }
  const handleOnPressLinkCard = (visitor: ITicketVisitor) => {
    navigation.navigate(ROUTES.EDIT_VISITOR, { visitor, setState })
  }

  const handleOnPressMarker = () => {
    navigation.navigate(ROUTES.MAP, {
      setAddressParams: (address: string) => {
        setTicketState((prev) => ({ ...prev, pickupLocation: address }))
      },
    })
  }

  return (
    <View
      style={{
        padding: 20,
        gap: 20,
      }}
    >
      <View
        style={{
          gap: 10,
        }}
      >
        {ticketState.visitors.length > 0 && (
          <Text
            style={{
              fontFamily: AppFonts.semiBold,
            }}
          >
            Customer list
          </Text>
        )}
        <FlatList
          data={ticketState.visitors}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          contentContainerStyle={{
            paddingVertical: 10,
          }}
          renderItem={({ item }) => (
            <LinkCard
              title={item.name}
              subtitle={item.phoneNumber}
              showShadow={false}
              style={{
                borderColor: AppColors.gray,
                borderWidth: 1,
                padding: 0,
              }}
              icon={<UserIconOutline width={20} height={20} />}
              onPress={() => handleOnPressLinkCard(item)}
            />
          )}
          onEndReachedThreshold={0.5}
        />
      </View>
      <View
        style={{
          gap: 10,
        }}
      >
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
            marginBottom: 10,
          }}
        >
          Pickup position
        </Text>
        <View style={{}}>
          <TextInput
            value={ticketState.pickupLocation}
            style={{
              borderColor: AppColors.gray,
              borderWidth: 1,
              borderRadius: 6,
              padding: 10,
              backgroundColor: AppColors.white,
              fontFamily: AppFonts.regular,
            }}
            multiline
            placeholder="Pickup position"
            onChangeText={(text) => setTicketState({ ...ticketState, pickupLocation: text })}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              top: 0,
              zIndex: 3,
              bottom: 0,
              justifyContent: 'center',
            }}
            onPress={handleOnPressMarker}
          >
            <MarkerIcon width={20} height={20} viewBox="0 0 24 24" color={AppColors.red} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          gap: 10,
        }}
      >
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
            marginBottom: 10,
          }}
        >
          Special requirement
        </Text>
        <TextInput
          value={ticketState.specialRequirement}
          style={{
            borderColor: AppColors.gray,
            borderWidth: 1,
            borderRadius: 6,
            padding: 10,
            backgroundColor: AppColors.white,
            fontFamily: AppFonts.regular,
            textAlignVertical: 'top',
          }}
          multiline
          numberOfLines={4}
          placeholder="Special requirement"
          onChangeText={(text) => setTicketState({ ...ticketState, specialRequirement: text })}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: AppColors.secondary,
          padding: 10,
          borderRadius: 6,
        }}
        onPress={handleOnPressSaveChanges}
      >
        <Text
          style={{
            fontFamily: AppFonts.semiBold,
            color: AppColors.white,
            textAlign: 'center',
          }}
        >
          Save changes
        </Text>
      </TouchableOpacity>
      <StatusBar backgroundColor={AppColors.blue} />
    </View>
  )
}

export default VisitorsManagement
