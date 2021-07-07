import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';
import { spacing } from '../../utils/sizes';

export const Timing = ({ onChangeTime }) => {

  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton style={styles.buttonWrapper}
          title='10'
          size={75}
          onPress={() => onChangeTime(10)}
        />
        <RoundedButton style={styles.buttonWrapper}
          title='15'
          size={75}
          onPress={() => onChangeTime(15)}
        />
        <RoundedButton style={styles.buttonWrapper}
          title='20'
          size={75}
          onPress={() => onChangeTime(20)}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    margin: spacing.sm
  }
})