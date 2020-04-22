import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from './styles';
import TabView from '../../TabView';
import { verticalScale } from '../../../../Helpers/ScaleHelper';

export const TABS_SCENES_PROP_TYPE = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    View: PropTypes.elementType.isRequired
  })
);

export default function Tabs({ scenes }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [heights, setHeights] = useState(() => scenes.map(() => 0));

  const onLayout = useCallback((ev, index) => {
    const { height } = ev.nativeEvent.layout;

    if (height > heights[index]) {
      heights[index] = height;
      setHeights([...heights]);
    }
  }, [heights]);

  const wrappedScenes = useMemo(() => scenes.map((s, index) => {
    const WrappedView = props => (
      <View
        key={index.toString()}
        onLayout={ev => onLayout(ev, index)}
        style={styles.sceneWrapper}
      >
        <s.View {...props} />
      </View>
    );

    return { ...s, View: WrappedView };
  }), [scenes, onLayout]);

  return (
    <View
      style={{ height: heights[activeIndex] ? heights[activeIndex] + verticalScale(60) : undefined }}
    >
      <TabView
        scenes={wrappedScenes}
        onIndexChange={setActiveIndex}
      />
    </View>
  );
}

Tabs.propTypes = {
  scenes: TABS_SCENES_PROP_TYPE.isRequired
};
