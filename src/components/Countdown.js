import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { spacing, fontSizes, colors } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({
  minutes = 0.1,
  isPaused,
  onProgress,
  onEnd
}) => {
  const interval = React.useRef(null);
  const [ millis, setMillis ] = useState(null);

  const Countdown = () => {
    setMillis( (time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes))
  }, [minutes])

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    if(isPaused) {
      if(interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(Countdown, 1000);

    return () => clearInterval(interval.current)
  }, [isPaused])

  const minute = Math.floor(millis / 1000 / 60 ) % 60;
  const seconds = Math.floor(millis / 1000 ) % 60;

  return (
    <Text style={styles.text}>
      {formatTime( minute )} : {formatTime( seconds )}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  }
});