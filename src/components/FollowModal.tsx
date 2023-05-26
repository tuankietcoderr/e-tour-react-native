import useFollow from '@hooks/socket/useFollow'
import { IFollower, NotificationType } from '@schema/User/Notification'
import React from 'react'
import { CPicker, onClose, onOpen } from './Picker'
import Toast from 'react-native-root-toast'
import { AppColors } from '@assets/themes/colors'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { AppFontSizes, AppFonts } from '@assets/themes/font'
import { capitalize } from '@lib/converter'

interface IFollowModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  id: string
  follower: IFollower | undefined
  notificationType?: string
  type?: 'route' | 'company'
  onOpenSheet?: () => void
  onCloseSheet?: () => void
  additionalFunction?: () => void
}

const FollowModal = React.memo(
  ({
    isOpen,
    setIsOpen = (isOpen: boolean) => {},
    id = '',
    type = 'route',
    follower = undefined,
    notificationType = NotificationType.ALL,
    onOpenSheet = () => {},
    onCloseSheet = () => {},
    additionalFunction = undefined,
  }: IFollowModalProps) => {
    const { followRoute, unfollowRoute, isError, error, followCompany, unfollowCompany } =
      useFollow()
    const isFollowed = !!follower || false
    const types = [
      NotificationType.ALL,
      NotificationType.ONLY_SPECIAL,
      NotificationType.NONE,
      isFollowed ? 'Unfollow' : 'Follow',
    ]
    const [selected, setSelected] = React.useState(notificationType)

    const onSelected = (item: string) => {
      setSelected(item)
    }

    const onPressFollow = (item: string) => {
      switch (item) {
        case 'Follow':
          type === 'route' ? followRoute(id, selected) : followCompany(id, selected)
          break
        case 'Unfollow':
          type === 'route' ? unfollowRoute(id) : unfollowCompany(id)
          break
        default:
          break
      }
      additionalFunction !== undefined && additionalFunction()
      onCloseSheet()
    }

    React.useEffect(() => {
      if (isError) {
        Toast.show('Error', {
          duration: Toast.durations.LONG,
          backgroundColor: AppColors.lightRed,
          position: Toast.positions.CENTER,
        })
      }
    }, [isError])

    return (
      <CPicker
        height={isFollowed ? 120 : 300}
        data={types}
        id={id}
        actionsSheetProps={{
          closeOnPressBack: true,
          closeOnTouchBackdrop: true,
          onClose: onCloseSheet,
          onOpen: onOpenSheet,
        }}
        closeText="Close"
        searchable={false}
        renderListItem={(item, index) =>
          item !== 'Follow' && item !== 'Unfollow' ? (
            <TouchableOpacity
              style={{ padding: 10, display: isFollowed ? 'none' : 'flex' }}
              onPress={() => onSelected(item as string)}
            >
              <Text
                style={{
                  fontFamily: selected === item ? AppFonts.semiBold : AppFonts.regular,
                  fontSize: AppFontSizes.body,
                  color: selected === item ? AppColors.lightRed : 'black',
                }}
              >
                {capitalize((item as string).split('-').join(' '), true)}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                paddingVertical: 14,
                backgroundColor: item === 'Unfollow' ? AppColors.white : AppColors.lightRed,
                borderRadius: 6,
                marginTop: 10,
                borderWidth: item === 'Unfollow' ? 1 : 0,
                borderColor: AppColors.lightRed,
                display: item === 'Follow' && isFollowed ? 'none' : 'flex',
              }}
              onPress={() => onPressFollow(item)}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: AppFonts.semiBold,
                  color: item !== 'Unfollow' ? AppColors.white : AppColors.lightRed,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )
        }
        setSelected={setSelected}
        label={isFollowed ? '' : 'Notification type'}
      />
    )
  }
)

export default FollowModal
