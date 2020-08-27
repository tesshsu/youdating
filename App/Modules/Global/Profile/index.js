import React, { useRef, useMemo } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { useValues } from 'react-native-redash';

import styles from './styles';
import ActionButton from './ActionButton';
import Header from './Header';
import ProfileScrollView from './ProfileScrollView';
import StickyHeader from './StickyHeader';
import ScrollTopButton from './ScrollTopButton';
import useCurrentMood from '../../../Hooks/useCurrentMood';
import * as PERSONNALITY_DETAILS from '../../../PersonnalityDetails';

export { ActionButton };

export default function Profile(props) {
  const {
    age,
    imageSource,
    firstName,
    city,
    personnality,
    HeaderTopLeftComponent,
    HeaderTopRightComponent,
    leftColumnActions,
    rightColumnActions,
    StickyAvatarImageComponent,
    TabComponent
  } = props;

  const scrollViewRef = useRef();
  const [scrollY, isToggled] = useValues([0, 0], []);
  const { moodInfos, currentMood } = useCurrentMood();

  function onScrollTopButtonPress() {
    if (scrollViewRef.current) {
      scrollViewRef.current.getNode().scrollTo({ y: 0 });
    }
  }

  // eslint-disable-next-line max-len
  const subPersonnality = useMemo(() => PERSONNALITY_DETAILS[currentMood][personnality].personnality, [currentMood, personnality]);

  return (
    <>
      <ProfileScrollView
        scrollViewRef={scrollViewRef}
        scrollY={scrollY}
        isToggled={isToggled}
      >
        { TabComponent }
      </ProfileScrollView>
      <Header
        scrollY={scrollY}
        imageSource={imageSource}
        firstName={firstName}
        personnality={personnality}
        subPersonnality={subPersonnality}
        TopLeftComponent={HeaderTopLeftComponent}
        TopCenterComponent={(
          <View style={{ flex: 1 }}>
            <View
              style={[
                styles.headerOnline,
                { backgroundColor: moodInfos.color }
              ]}
            />
            <Text style={styles.headerText}>{`${age}ANS-${city || 'PARIS'}`}</Text>
          </View>
        )}
        TopRightComponent={HeaderTopRightComponent}
        leftColumnActions={leftColumnActions}
        rightColumnActions={rightColumnActions}
		    LeftButtomComponent={(
          <View style={{ flex: 1 }}>
            <Text style={styles.nameProfil}>{firstName}</Text>
            <Text style={[styles.perfonaliteText, { color: moodInfos.color } ]}>{personnality}</Text>
            <Text style={styles.subPersonalText}>{subPersonnality}</Text>
          </View>
        )}
      />
      <StickyHeader
        isToggled={isToggled}
        firstName={firstName}
        personnality={personnality}
        StickyAvatarImageComponent={StickyAvatarImageComponent}
      />
      <ScrollTopButton isToggled={isToggled} onPress={onScrollTopButtonPress} />
    </>
  );
}

Profile.defaultProps = {
  HeaderTopLeftComponent: null,
  HeaderTopRightComponent: null,
  leftColumnActions: [],
  rightColumnActions: []
};

Profile.propTypes = {
  imageSource: PropTypes.oneOfType([
    PropTypes.shape({ uri: PropTypes.string.isRequired }),
    PropTypes.node
  ]).isRequired,
  firstName: PropTypes.string.isRequired,
  personnality: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  HeaderTopLeftComponent: PropTypes.element,
  HeaderTopRightComponent: PropTypes.element,
  StickyAvatarImageComponent: PropTypes.element,
  leftColumnActions: PropTypes.arrayOf(PropTypes.element),
  rightColumnActions: PropTypes.arrayOf(PropTypes.element),
  TabComponent: PropTypes.element.isRequired
};
