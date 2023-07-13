import React from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  Text,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native'
import { Feather, Entypo } from '@expo/vector-icons'
import { AppFontSizes, AppFonts } from '@assets/themes/font'

const SearchBar = ({
  onEndEditing,
}: {
  onEndEditing?: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar__unclicked}>
        {/* search Icon */}
        <Feather name="search" size={20} color="black" style={{ marginLeft: 1 }} />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Phu Quoc, Vung Tau,..."
          onEndEditing={onEndEditing}
        />
      </View>
    </View>
  )
}
export default SearchBar

// styles
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: AppFontSizes.normal,
    fontFamily: AppFonts.regular,
    marginLeft: 10,
    width: '90%',
  },
})
