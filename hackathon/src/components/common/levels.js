import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApplicationProvider, Icon } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const Levels = () => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light}}>
      <View style={styles.container}>
       <Icon name={checkmark-circle-2-outline} />
        <Text>Some random text to fill up space</Text>
      </View>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Levels;
