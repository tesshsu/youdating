import React from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

import styles from './styles';
import MoodSelector from '../../../MoodSelector';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import { moderateScale, verticalScale } from '../../../../../Helpers/ScaleHelper';

const IMAGE_STARS = require('../../../../../../assets/images/stars.png');
const IMAGE_GRAPH = require('../../../../../../assets/images/graph.png');

export default function Stats() {
  const { moodInfos } = useCurrentMood();

  return (
    <>
      <MoodSelector />
      <Text
        style={[
          styles.title,
          { marginTop: 0 }
        ]}
      >
        E.L.C.T
      </Text>
      <Image
        source={IMAGE_GRAPH}
        style={styles.graphImage}
      />
      <Text style={styles.title}>STATISTIQUES INDIVIDUELLES</Text>
      <View>
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.labelText}>AMBITION ET PRODUCTIVITE</Text>
          </View>
          <View style={styles.letter}>
            <Text style={styles.letterText}>E</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.valueText}>
              16
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.labelText}>
              COMPASSION ET ATTENTION PORTEE VERS AUTRUI
            </Text>
          </View>
          <View style={styles.letter}>
            <Text style={styles.letterText}>C</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.valueText}>
              10
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.labelText}>AMBITION ET PRODUCTIVITE</Text>
          </View>
          <View style={styles.letter}>
            <Text style={styles.letterText}>E</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.valueText}>
              16
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.labelText}>ANALYSE ET STRATEGIE</Text>
          </View>
          <View style={styles.letter}>
            <Text style={styles.letterText}>L</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.valueText}>
              19
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.labelText}>PATIENCE ET CALME</Text>
          </View>
          <View style={styles.letter}>
            <Text style={styles.letterText}>T</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.valueText}>
              10
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.labelText}>
              VOLONTARIAT ET INVESTISSEMENT PERSONNEL
            </Text>
          </View>
          <View style={styles.letter}>
            <Text style={styles.letterText}>E</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.valueText}>
              17
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.title}>RESULTATS</Text>
      <View style={styles.row}>
        <View style={styles.label}>
          <Text style={styles.labelText}>
            Entreprenariat :
          </Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.valueText}>
            15.4
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.label}>
          <Text style={styles.labelText}>
            Leadership :
          </Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.valueText}>
            18
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.label}>
          <Text style={styles.labelText}>
            Collaboration :
          </Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.valueText}>
            11.4
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.label}>
          <Text style={styles.labelText}>
            Tolérance :
          </Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.valueText}>
            11
          </Text>
        </View>
      </View>
      <Text style={styles.title}>NOTE GLOBALE</Text>
      <View style={styles.row}>
        <View style={styles.label}>
          <Text
            style={[
              styles.labelText,
              {
                color: moodInfos.color,
                fontWeight: 'bold',
                fontSize: moderateScale(18)
              }
            ]}
          >
            E.L.C.T
          </Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.valueText}>
            <Text
              style={{
                color: moodInfos.color,
                fontSize: moderateScale(18)
              }}
            >
              13.9
            </Text>
              /20
          </Text>
        </View>
      </View>
      <View style={styles.line} />
      <Text
        style={[
          styles.title,
          { color: moodInfos.color }
        ]}
      >
        CONSEIL
      </Text>
      <Text style={styles.text}>
        {'POUR MIEUX COLLABORER SOIS PLUS A L\'ECOUTE'}
      </Text>
      <View style={styles.line} />
      <Text style={styles.title}>LEADERENT</Text>
      <View style={styles.row}>
        <View style={styles.label}>
          <Text
            style={[
              styles.labelText,
              {
                fontFamily: 'Segoe-UI-Bold',
                color: moodInfos.color,
                fontSize: moderateScale(19),
                marginBottom: verticalScale(22)
              }
            ]}
          >
            COMMANDANT
          </Text>
        </View>
        <View style={styles.value}>
          <Image
            source={IMAGE_STARS}
            style={styles.starsImage}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.label}>
          <Text style={styles.labelText}>
            ATTITUDE CONFLICTUELLE
          </Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.valueText}>
            ÉLÉVÉE
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.label}>
          <Text style={styles.labelText}>
            ATTITUDE HÉSITANTE
          </Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.valueText}>
            FAIBLE
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.label}>
          <Text style={styles.labelText}>
            ATTITUDE INSOUCIANTE
          </Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.valueText}>
            FAIBLE
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.label}>
          <Text style={styles.labelText}>
            ATTITUDE INSOUCIANTE
          </Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.valueText}>
            FAIBLE
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.label}>
          <Text style={styles.labelText}>
            ATTITUDE POSSESIVE
          </Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.valueText}>
            ÉLEVÉE
          </Text>
        </View>
      </View>
    </>
  );
}
