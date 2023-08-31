import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Levels from '../common/levels'

const TopicDetails = () => {
  return (
    <View>
      <Text style={topic.heading} >Incident Response and Recovery</Text>
      <Levels />
    </View>
  )
}

export default TopicDetails

const topic = StyleSheet.create({})

