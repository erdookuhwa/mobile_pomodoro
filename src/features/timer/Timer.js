import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Focus } from '../focus/Focus';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

import { fontSizes, spacing, colors } from '../../utils/sizes';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const interval = React.useRef(null);
  const [ minutes, setMinutes ] = useState(DEFAULT_TIME);
  const [ isStarted, setIsStarted ] = useState(false);
  const [ progress, setProgress ] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown 
          minutes={minutes}
          isPaused={!isStarted} 
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>

      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar 
          progress={progress}
          color='#fff'
          style={{ height: 10 }}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
        {
          isStarted ? 
            <RoundedButton 
              title='pause' 
              onPress={() => setIsStarted(false)}
            />
            :
            <RoundedButton 
              title='start' 
              onPress={() => setIsStarted(true)}
            />
        }
      </View>

      <View style={styles.clearSubject}>
        <RoundedButton 
          title='end'
          size={70}
          onPress={() => clearSubject()}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.xxl,
    textAlign: 'center',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearSubject: {
    paddingBottom: spacing.lg,
    paddingLeft: spacing.md,
    alignItems: 'center',
  }
});