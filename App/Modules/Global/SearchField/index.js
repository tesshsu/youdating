/* eslint-disable react/forbid-prop-types */
import React, {
  useRef, useCallback, useEffect, useState
} from 'react';
import PropTypes from 'prop-types';
import { SearchBar } from 'react-native-elements';
import styles from './styles';

export default function SearchField(props) {
  const {
    placeholder,
    onChangeText,
    value,
    containerStyle,
    inputContainerStyle,
    lightTheme,
    searchIcon,
    clearIcon
  } = props;

  return (
    <>
      <SearchBar
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        lightTheme={lightTheme}
        containerStyle={containerStyle}
        inputContainerStyle={inputContainerStyle}
        searchIcon={searchIcon}
        clearIcon={clearIcon}
      />
    </>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  lightTheme: PropTypes.bool,
  containerStyle: PropTypes.style,
  inputContainerStyle: PropTypes.style,
  searchIcon: PropTypes.bool,
  clearIcon: PropTypes.bool,
};

SearchBar.defaultProps = {
  placeholder: null,
  onChangeText: {},
  value: null,
  containerStyle: {},
  inputContainerStyle: {},
  searchIcon: true,
  clearIcon: true,
  lightTheme: false
};
