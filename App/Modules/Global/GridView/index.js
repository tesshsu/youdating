/* eslint-disable react/forbid-prop-types */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import styles from './styles';

export default function GridView(props) {

  const [isSelected, setisSelected] = useState(false)

  const {
    numColumns,
    items,
    showSeparator,
    separatorBorderWidth,
    gridStyle
  } = props;

  const renderItem = ({item, index}) => (
    <View>
    <Image source={item.thumbnail} style={{width: '100%', height: '100%'}}/>
    </View >
  );

  return (
    <FlatList
      onEndReachedThreshold={0}
      onEndReached={({ distanceFromEnd }) => {
        console.debug('on end reached ', distanceFromEnd);
      }}
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
  gridStyle: {}
};
