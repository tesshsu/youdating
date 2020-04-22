import React, {
  useRef, useMemo, useEffect
} from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';

import styles from './styles';
import RoundIconButton from '../../../../../Global/RoundIconButton';
import { verticalScale } from '../../../../../../Helpers/ScaleHelper';

const containerTransition = (
  <Transition.Sequence>
    <Transition.Change interpolation="easeInOut" />
    <Transition.Together>
      <Transition.In type="slide-bottom" durationMs={600} interpolation="easeInOut" />
      <Transition.In type="fade" durationMs={600} interpolation="easeInOut" />
      <Transition.Out type="slide-bottom" durationMs={600} interpolation="easeInOut" />
      <Transition.Out type="fade" durationMs={600} interpolation="easeInOut" />
    </Transition.Together>
  </Transition.Sequence>
);

const childrenTransition = (
  <Transition.Sequence>
    <Transition.Out type="scale" durationMs={10000} interpolation="easeInOut" />
    <Transition.In type="scale" durationMs={10000} interpolation="easeInOut" />
  </Transition.Sequence>
);

export default function Panel(props) {
  const {
    title,
    color,
    onClose,
    children
  } = props;

  const containerRef = useRef();
  const childrenContainerRef = useRef();

  useEffect(() => {
    if (childrenContainerRef.current) {
      childrenContainerRef.current.animateNextTransition();
    }
  }, [children]);

  function handeCloseIconPress() {
    onClose();

    if (containerRef.current) {
      containerRef.current.animateNextTransition();
    }
  }

  const showPanel = useMemo(() => children.some(c => !!c), [children]);

  return (
    <Transitioning.View
      ref={containerRef}
      transition={containerTransition}
    >
      { showPanel && (
        <View key="container" style={[styles.container, { borderColor: color }]}>
          <View style={styles.header}>
            <Text style={[styles.titleText, { color }]}>{ title }</Text>
            <RoundIconButton
              backgroundColor={color}
              size={verticalScale(20)}
              iconSize={verticalScale(10)}
              iconName="x"
              iconColor="white"
              onPress={handeCloseIconPress}
            />
          </View>
          <Transitioning.View
            useRef={childrenContainerRef}
            style={styles.mediaContainer}
            transition={childrenTransition}
          >
            { children }
          </Transitioning.View>
        </View>
      )}
    </Transitioning.View>
  );
}

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
