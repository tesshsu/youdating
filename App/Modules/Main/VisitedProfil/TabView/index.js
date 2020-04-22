import React, { useEffect } from 'react';

import {
  Moods,
  Personnality,
  Stats,
  Skills
} from '../tabs';
import Tabs from '../../../Global/Profile/Tabs';
import useVisitedProfil from '../../../../Hooks/useVisitedProfil';

const SCENES = [
  { title: 'moods', key: 'moods', View: Moods },
  { title: 'compétences', key: 'skills', View: Skills },
];

const FULL_ACCESS_SCENES = [
  { title: 'moods', key: 'moods', View: Moods },
  { title: 'personnalité', key: 'personnality', View: Personnality },
  { title: 'statistiques', key: 'stats', View: Stats },
  { title: 'compétences', key: 'skills', View: Skills },
];

export default function TabView() {
  const { gotFullAccess } = useVisitedProfil();

  useEffect(() => {
    console.log(gotFullAccess ? 'UNLOCKED' : 'LOCKED');
  }, [gotFullAccess]);

  if (gotFullAccess) {
    return (
      <Tabs
        key="FULL"
        scenes={FULL_ACCESS_SCENES}
      />
    );
  }

  return (
    <Tabs
      key="RESTRICTED"
      scenes={SCENES}
    />
  );
}
