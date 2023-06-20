import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';


const Loading: React.FC = () => {

  const { colors } = useTheme()

  return <ActivityIndicator 
    color={colors.primary}
    size="large"
  />;
}

export default Loading;