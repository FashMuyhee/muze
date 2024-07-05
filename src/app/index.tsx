import { View, Text, StyleSheet } from 'react-native';
import React from 'react';


type Props = {};

const Intro = (props: Props) => {
  return (
    <View style={styles.container}>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
export default Intro;
