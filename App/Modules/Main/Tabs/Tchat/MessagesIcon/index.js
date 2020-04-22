import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from '../../../../../Helpers/ScaleHelper';
import Badge from '../../../../Global/Badge';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import useConversation from '../../../../../Hooks/useConversations';

export default function MessagesIcon({ tintColor }) {
  const { moodInfos } = useCurrentMood();
  const { unreadMessagesCount } = useConversation();

  return (
    <Badge
      disabled={unreadMessagesCount === 0}
      backgroundColor={tintColor === moodInfos.color ? 'white' : moodInfos.color}
      color={tintColor === moodInfos.color ? moodInfos.color : 'white'}
      type="value"
      value={unreadMessagesCount}
      size={verticalScale(15)}
      textStyle={{ fontSize: moderateScale(10) }}
      badgeContainerStyle={{ top: -verticalScale(6), right: -verticalScale(6) }}
    >
      <FontAwesome5 name="comments" color={tintColor} size={scale(20)} />
    </Badge>
  );
}

MessagesIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};
