import React, { useState, useCallback } from 'react';
import { Pressable, Text } from 'react-native';

import styles from './App.styles';

const BG_COLOR_INITIAL = '#FFFFFF';
const TEXT_COLOR_LIGHT = '#FFFFFF';
const TEXT_COLOR_DARK = '#000000';

const MAX_DECIMAL_COLOR_NUMBER = 16_777_215;
const BRIGHTNESS_BOUNDARY = 128;

const calculateBrightness = (color: string) => {
  // Parse the r, g, b
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  // Calculate brightness
  return (r * 299 + g * 587 + b * 114) / 1_000;
};

const App = () => {
  const [bgColor, setBgColor] = useState<string>(BG_COLOR_INITIAL);

  const isDarkBgColor = calculateBrightness(bgColor) < BRIGHTNESS_BOUNDARY;

  const generateRandomColor = useCallback(() => {
    const randomColor = Math.floor(Math.random() * MAX_DECIMAL_COLOR_NUMBER).toString(16);

    setBgColor(`#${randomColor.padStart(6, '0')}`);
  }, []);

  return (
    <Pressable style={[styles.container, { backgroundColor: bgColor }]} onPress={generateRandomColor}>
      <Text style={[styles.text, { color: isDarkBgColor ? TEXT_COLOR_LIGHT : TEXT_COLOR_DARK }]}>Hello there</Text>
    </Pressable>
  );
};

export default React.memo(App);
