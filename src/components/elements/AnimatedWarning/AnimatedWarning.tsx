import { Box, Row, StyledText } from '@mobile/components/elements';
import theme from '@mobile/theme';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface AnimatedWarningProps {
  variant: 'safe' | 'attention' | 'danger' | 'evacuate';
}

const AnimatedWarning = (props: AnimatedWarningProps) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const fade = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };
  const getWarningColor = () => {
    const colors = {
      safe: theme.colors.safe,
      attention: theme.colors.attention,
      danger: theme.colors.danger,
      evacuate: theme.colors.evacuate,
    };

    return colors[props.variant];
  };

  useEffect(() => {
    fade();
  }, []);

  return (
    <>
      {(props.variant === 'evacuate' || props.variant === 'danger') && (
        <>
          <Animated.View
            style={{
              backgroundColor: getWarningColor(),
              width: '3%',
              position: 'absolute',
              height: '100%',
              opacity,
              left: 0,
            }}
          />
          <Animated.View
            style={{
              backgroundColor: getWarningColor(),
              width: '3%',
              position: 'absolute',
              height: '100%',
              opacity,
              right: 0,
            }}
          />
        </>
      )}
    </>
  );
};

export default AnimatedWarning;
