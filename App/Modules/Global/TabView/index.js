/* eslint-disable no-param-reassign */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { TabView as NativeTabView, SceneMap } from 'react-native-tab-view';

import TabBar from './TabBar';

export default function TabView(props) {
  const ref = useRef();
  const {
    scenes,
    labelStyle,
    onIndexChange
  } = props;

  const [routesMap, scenesMap] = scenes.reduce((prev, curr) => {
    prev[0].push({
      key: curr.key,
      title: curr.title
    });

    prev[1][curr.key] = curr.View;

    return prev;
  }, [[], {}]);

  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
  const [routes] = React.useState(routesMap);

  const renderScenes = SceneMap(scenesMap);

  function handleIndexChange(index) {
    setCurrentRouteIndex(index);
    if (onIndexChange) {
      onIndexChange(index);
    }
  }

  return (
    <NativeTabView
      ref={ref}
      navigationState={{ index: currentRouteIndex, routes }}
      renderScene={renderScenes}
      renderTabBar={tabBarProps => (
        <TabBar
          {...tabBarProps}
          labelStyle={labelStyle}
          onIndexChange={handleIndexChange}
        />
      )}
      onIndexChange={setCurrentRouteIndex}
    />
  );
}

TabView.defaultProps = {
  labelStyle: {},
  onIndexChange: null
};

TabView.propTypes = {
  scenes: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      View: PropTypes.func
    }).isRequired
  ).isRequired,
  onIndexChange: PropTypes.func,
  labelStyle: Text.propTypes.style,
};
