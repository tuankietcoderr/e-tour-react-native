import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    StatusBar,
    Dimensions,
  } from 'react-native'
  import React from 'react'
  import { NativeStackScreenProps } from '@react-navigation/native-stack'
  import { AppColors } from '@assets/themes/colors'
  import { AppFontSizes, AppFonts } from '@assets/themes/font'
  import { RouteProp, useRoute } from '@react-navigation/core'
  import { LinearGradient } from 'expo-linear-gradient'
  import CompanyCard from '@components/CompanyCard'
  import { Company } from '@schema/Company/Company'
  import { getCompanyInformation } from '@services/company'
  import Toast from 'react-native-root-toast'
  import ImageSlider from '@components/ImageSlider'
  import moment from 'moment'
  import FollowModal from '@components/FollowModal'
  import { UserContext } from '@context/UserContext'
  import { onClose, onOpen } from '@components/Picker'
  import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
  import { IFollower, NotificationType } from '@schema/User/Notification'
  import { ROUTES } from '@constants/route'
  import { ReportType } from '@schema/User/Report'
  import { User } from '@schema/User/User'
  
  type ParamList = {
    CompanyDetail: {
      companyId: string
      company: Company
    }
  }
  
  const CompanyDetail = ({ navigation }: NativeStackScreenProps<any>) => {
    React.useEffect(() => {
      navigation.setOptions({
        headerShown: true,
        headerStyle: {
          backgroundColor: AppColors.secondary,
        },
        headerTitleStyle: {
          fontFamily: AppFonts.semiBold,
        },
        headerTintColor: 'white',
        title: 'Company Detail',
        headerRight: (props) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTES.REPORT_TOUR, {
                reportType: ReportType.COMPANY,
              })
            }
          >
            <FontAwesome name="flag" size={24} color={props.tintColor} />
          </TouchableOpacity>
        ),
      })
    }, [])
    const { companyId } = useRoute<RouteProp<ParamList, 'CompanyDetail'>>().params
    const [company, setCompany] = React.useState<Company | null>(null)
    const follower = company && (company?.followers as IFollower | undefined)
  
    React.useEffect(() => {
      ;(async () => {
        try {
          const res = await getCompanyInformation(companyId)
          setCompany(res)
        } catch (e) {
          setCompany({} as Company)
          Toast.show('Error when getting company information', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            backgroundColor: AppColors.error,
          })
        }
      })()
    }, [companyId])
  
    const { user } = React.useContext(UserContext)
    const [isOpen, setIsOpen] = React.useState(false)
    const [follow, setFollow] = React.useState(false)
  
    React.useEffect(() => {
      setFollow(company && company.isFollowing ? true : false)
    }, [company])
  
    const onCloseSheet = () => {
      onClose(companyId)
      setIsOpen(false)
    }
    const onOpenSheet = () => {
      onOpen(companyId)
      setIsOpen(true)
    }
  
    return (
      <View>
        {company && (
          <FollowModal
            follower={follower as IFollower | undefined}
            notificationType={follower?.notificationType || NotificationType.ALL}
            id={company._id}
            type="company"
            isOpen={isOpen}
            additionalFunction={() => {
              setFollow(!follow)
            }}
            setIsOpen={setIsOpen}
            onCloseSheet={onCloseSheet}
            onOpenSheet={onOpenSheet}
          />
        )}
        <View
          style={{
            height: 200,
          }}
        >
          <LinearGradient
            // Button Linear Gradient
            colors={[AppColors.secondary, AppColors.blue]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0.3, y: 0 }}
            style={{
              opacity: 0.6,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1,
            }}
          />
          {company ? (
            <View
              style={{
                paddingHorizontal: 20,
                transform: [{ translateY: 120 }],
              }}
            >
              <CompanyCard companyId={companyId} showDescription={false} />
            </View>
          ) : (
            <ActivityIndicator size={'large'} />
          )}
        </View>
        {company && (
          <View
            style={{
              transform: [{ translateY: 80 }],
              paddingHorizontal: 20,
              gap: 20,
            }}
          >
            <Text
              style={{
                fontFamily: AppFonts.regular,
                color: AppColors.gray,
              }}
            >
              Established on{' '}
              <Text
                style={{
                  fontFamily: AppFonts.semiBold,
                }}
              >
                {moment(company.createdAt).format('ll')}
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: AppColors.white,
                borderRadius: 6,
                padding: 10,
                borderWidth: 1,
                borderColor: AppColors.secondary,
                alignSelf: 'flex-start',
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: AppFonts.regular,
                }}
              >
                <Text
                  style={{
                    fontFamily: AppFonts.semiBold,
                  }}
                >
                  {company.followerNum || 0}
                </Text>{' '}
                follower(s)
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  borderLeftWidth: 1,
                  borderLeftColor: AppColors.secondary,
                  paddingLeft: 10,
                }}
                onPress={onOpenSheet}
              >
                {follow ? (
                  <MaterialCommunityIcons
                    name="bell-ring-outline"
                    size={24}
                    color={AppColors.secondary}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="bell-plus-outline"
                    size={24}
                    color={AppColors.secondary}
                  />
                )}
                <Text
                  style={{
                    fontFamily: AppFonts.regular,
                    color: AppColors.secondary,
                  }}
                >
                  {follow ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>
            <ImageSlider
              images={company?.previewImages}
              width={Dimensions.get('window').width - 40}
              height={300}
            />
            <Text
              style={{
                fontFamily: AppFonts.regular,
              }}
            >
              Contact:{' '}
              <Text
                style={{
                  fontFamily: AppFonts.semiBold,
                  textDecorationColor: AppColors.blue,
                  textDecorationLine: 'underline',
                }}
              >
                {company?.email}
              </Text>
            </Text>
          </View>
        )}
        <StatusBar backgroundColor={AppColors.secondary} />
      </View>
    )
  }
  
  export default CompanyDetail