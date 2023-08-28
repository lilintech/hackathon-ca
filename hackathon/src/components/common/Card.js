import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const Card = () => {

const navigation = useNavigation();

const handlePress = () =>{
    // navigate to the topic details page
   navigation.navigate('TopicDetail')
}

  return (
   <TouchableOpacity onPress={handlePress} >
     <View style={card.container}>
      <View style={card.image}>
        <Text>Image</Text>
      </View>
      <View style={card.other}>
        <Text>Cloud Security</Text>
      </View>
    </View>
   </TouchableOpacity>
  
  )
}

export default Card

const card = StyleSheet.create({
    container: {
        width: 170,
        height: 150,
        backgroundColor: 'yellow',
        padding: 5,
      },
    image: {
        flex: 2,
        backgroundColor: 'red',

    },
    other: {
        flex: 2,
        backgroundColor: 'green',

    }
})