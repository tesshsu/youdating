import React from 'react';
import { Text } from 'react-native';

import useCurrentMood from '../../../Hooks/useCurrentMood';

export default function MoodText(props) {
  const {
    style,
    children,
    ...restProps
  } = props;

  const { moodInfos } = useCurrentMood();

  return (
    <Text
      {...restProps}
      style={[
        style,
        { color: moodInfos.color },
      ]}
    >
      { children }
    </Text>
  );
}

MoodText.defaultProps = Text.defaultProps;
MoodText.propTypes = Text.propTypes;
