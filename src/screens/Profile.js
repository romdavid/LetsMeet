import { useFocusEffect } from '@react-navigation/core'
import React, { useCallback, useState, useContext } from 'react'
import { REQUEST, requestData } from '../core/server'
import { Text, View, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import profilestyles from '../styles/profilestyles'
import { UserContext } from '../core/UserContext'

// change all profilestyles into GlobalStyles

export default function Profile({ route, navigation }) {
  const name = route.params
  const [profile, setProfile] = useState({})
  const [tags, setTags] = useState([])
  const { userId } = useContext(UserContext)

  useFocusEffect(
    useCallback(() => {
      requestData(REQUEST.PROFILE, userId).then((data) => {
        setProfile(data)
        setTags(data["tags"])
      })
    }, [])
  )

  return (
    <View>
      <View style={profilestyles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('PEdit', {userId, profile })}>
          <Icon name="account-edit" size={50} style={profilestyles.editlogo} />
        </TouchableOpacity>
      </View>
      {/* Base image as profile screen, later on would take photo from phone or camera */}
      <Image
        style={profilestyles.avatar}
        source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
      />

      <View style={profilestyles.body}>
        <View>
          <Text style={profilestyles.info}>
            {profile.name}
          </Text>
        </View>
        <View>
          <Text style={profilestyles.description}>
            {profile.bio}
          </Text>
        </View>
        <Text style={profilestyles.info}>Interests:</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tags}>
              <Text>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tags: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
})