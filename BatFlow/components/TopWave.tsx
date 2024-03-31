import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../pages/Styles';
import { ViewStyle } from 'react-native';

const style: ViewStyle = {
  position: 'absolute',
  top: 35,
  zIndex: 4,
};

const TopWave = () => {
  return (
    <Svg style={style} viewBox="0 0 1440 320" width="1440" height="100">
      <Path
        fill={colors.primary}
        fillOpacity="1"
        d="M0,192L30,170.7C60,149,120,107,180,80C240,53,300,43,360,74.7C420,107,480,181,540,197.3C600,213,660,171,720,138.7C780,107,840,85,900,117.3C960,149,1020,235,1080,240C1140,245,1200,171,1260,154.7C1320,139,1380,181,1410,202.7L1440,224L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
      />
    </Svg>
  );
};

export default TopWave;
