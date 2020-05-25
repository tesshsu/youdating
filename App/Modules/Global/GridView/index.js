/* eslint-disable react/forbid-prop-types */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import GridList from 'react-native-grid-list';

import styles from './styles';

export default function GridView(props) {

  const [isSelected, setisSelected] = useState(false)

  const {
    numColumns,
    items,
    showSeparator,
    separatorBorderWidth,
    styles
  } = props;

  const renderItem = ({item, index}) => (
    <View style={styles}>
      <Image source={{uri: item}} style={{width: '100%', height: '100%'}}/>
    </View >
  );

  return (
    <FlatList
      contentContainerStyle={{justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap',}}
      data={items}
      renderItem={renderItem}
    />
  );
}

GridView.propTypes = {
  numColumns: PropTypes.number,
  separatorBorderWidth: PropTypes.number,
  items: PropTypes.array,
  showSeparator: PropTypes.bool,
  styles: PropTypes.style,
};

GridView.defaultProps = {
  numColumns: 3,
  items: [],
  separatorBorderWidth: 5,
  showSeparator: false,
  styles: {}
};
