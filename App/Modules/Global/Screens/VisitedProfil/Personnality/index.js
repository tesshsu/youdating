import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

import MoodSelector from '../../../MoodSelector';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';

export default function Personnality() {
  const { moodInfos } = useCurrentMood();

  return (
    <>
      <MoodSelector />
      <Text
        style={[
          styles.title,
          { color: moodInfos.color }
        ]}
      >
        AMBITIEUX / OBSESSIONNEL
      </Text>
      <Text style={styles.paragraph}>
        {'Ta capacité à exiger toujours plus de ton partenaire et de toi-même fait de toi un véritable dominant. Ton perfectionnisme en couple te confère une personnalité très entreprenante qui te permet de t\'impliquer sérieusement pour faire progresser la relation de manière plus efficace.'}
      </Text>
      <Text style={styles.paragraph}>
        {'★ DE MANIÈRE GÉNÉRALE :\nTu aimes t\'investir avec force dans ce que tu entreprends personnellement. Tes convictions te poussent à te battre en permanence et à ne jamais abandonner avant d’avoir atteint ton but. Tu fais d’ailleurs partie des personnalités les plus impliquées que YOU’S ait détecté.'}
      </Text>
      <Text style={styles.paragraph}>
        {'★ SELON TA PHILOSOPHIE :\nL\'ambition est fondamentale, elle tient un rôle essentiel dans ta vie personnelle au point de la mettre en avant dans la plupart des choses que tu entreprends. D\'ailleurs tu te challenges tellement que les obstacles sont devenus une force pour toi, ils te poussent à agir davantage, te stimulent et t\'obligent à relever des défis toujours plus grands. Ainsi ta détermination t\'aide et t\'incite constamment à repousser tes propres limites pour atteindre les objectifs que tu t\'es fixé.'}
      </Text>
      <Text style={styles.paragraph}>
        {'★ SELON TA PHILOSOPHIE :\nL\'ambition est fondamentale, elle tient un rôle essentiel dans ta vie personnelle au point de la mettre en avant dans la plupart des choses que tu entreprends. D\'ailleurs tu te challenges tellement que les obstacles sont devenus une force pour toi, ils te poussent à agir davantage, te stimulent et t\'obligent à relever des défis toujours plus grands. Ainsi ta détermination t\'aide et t\'incite constamment à repousser tes propres limites pour atteindre les objectifs que tu t\'es fixé.'}
      </Text>
      <Text style={styles.paragraph}>
        {'★ DE NATURE PERSÉVERANTE DEPUIS L\'ENFANCE :\nTu as suffisamment pris confiance en toi pour être pleinement créatif quand la situation l’exige. Tu sais que tu peux compter sur ta productivité à tout moment pour avancer plus efficacement dans tes projets.  Tu recherches avant tout à progresser de façon pratique au travers de l’expérience. Pour toi, c’est d’abord l’adrénaline du challenge qui t\'encourage chaque jour un peu plus à t\'épanouir personnellement.'}
      </Text>
    </>
  );
}
