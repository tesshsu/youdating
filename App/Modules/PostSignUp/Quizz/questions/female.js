const IMAGE_SCREEN_1 = require('../../../../../assets/images/quizz/screen1.png');
const IMAGE_SCREEN_2 = require('../../../../../assets/images/quizz/screen2.png');
const IMAGE_SCREEN_3 = require('../../../../../assets/images/quizz/screen3.png');
const IMAGE_SCREEN_3B = require('../../../../../assets/images/quizz/screen3B.png');
const IMAGE_SCREEN_4 = require('../../../../../assets/images/quizz/screen4.png');
const IMAGE_SCREEN_4B = require('../../../../../assets/images/quizz/screen4B.png');
const IMAGE_SCREEN_5 = require('../../../../../assets/images/quizz/screen5.png');
const IMAGE_SCREEN_6 = require('../../../../../assets/images/quizz/screen6.png');


const SCREEN_1 = {
  image: IMAGE_SCREEN_1,
  questions: [
    {
      question: 'TE SENS-TU CONSTAMMENT POUSSÉE À EXPRIMER CE QUE TU PENSES EN PUBLIC ?',
      answers: [
        { type: 1, answer: 'Oui, je communique beaucoup, c’est important pour moi que les gens sachent ce que je pense.' },
        { type: 2, answer: 'Non, je préfère rester discrète, je ne vois pas l’utilité d’en informer tout le monde tout le temps.' },
      ]
    },
    {
      question: 'LA PLUPART DU TEMPS, LORSQUE TU ÉCHOUES ?',
      answers: [
        { type: 2, answer: 'Tu l’acceptes assez facilement même si tu es déçue.' },
        { type: 1, answer: 'Tu as beaucoup de mal à l’accepter, il n’est pas question de lâcher.' },
      ]
    },
    {
      question: 'DANS LA VIE DE TOUS LES JOURS, METS-TU PLUS D’ÉNERGIE À ÊTRE ?',
      answers: [
        { type: 1, answer: 'Exigeante avec Toi-même.' },
        { type: 2, answer: 'Compréhensive avec les autres.' },
      ]
    },
  ]
};

const SCREEN_2 = {
  image: IMAGE_SCREEN_2,
  questions: [
    {
      question: 'FACE À QUELQU’UN QUI CHERCHE LE CONFLIT ?',
      answers: [
        { type: 1, answer: 'Tu rentres dans le conflit pour le/la dissuader de continuer.' },
        { type: 2, answer: 'Tu tentes de contourner le conflit pour préserver ta paix et ta tranquillité.' },
      ]
    },
    {
      question: 'LORSQUE TU ES FACE À QUELQU’UN QUI N’EST PAS D’ACCORD AVEC TOI ?',
      answers: [
        { type: 1, answer: 'Tu tentes de lui démontrer que tu as raison par tous les moyens possibles pour qu’il/elle change d’avis.' },
        { type: 2, answer: 'Tu ne cherches pas à le/la convaincre particulièrement parce que tu sais qu’il/elle a déjà son opinion sur la question.' },
      ]
    },
    {
      question: 'PARMI CES PROPOSITIONS LAQUELLES TE DÉFINIT LE MIEUX SELON TOI ?',
      answers: [
        { type: 'SPORT', answer: 'Sportive concerné par le physique et le bien-être en général.' },
        { type: 'SPIRIT', answer: 'Spirituelle attirée par les religions et l’occulte.' },
        { type: 'INTELLECT', answer: 'Intellectuelle intéressée par l’apprentissage et les études en tous genres.' },
        { type: 'COMIQ', answer: 'Comique portée sur le divertissement et la plaisanterie.' }
      ]
    },
  ]
};

const SCREEN_3 = {
  a: {
    image: IMAGE_SCREEN_3,
    questions: [
      {
        question: 'PENSES-TU QUE TON AMBITION S’EXPRIME ESSENTIELLEMENT À TRAVERS ?',
        answers: [
          { type: 160, answer: 'Ta vision des choses.' },
          { type: 180, answer: 'Tes actes quotidiens.' },
        ]
      },
      {
        question: 'LORSQUE TU DÉSIRES QUELQUE CHOSE, COMMENT RÉAGIS-TU EN GÉNÉRAL ?',
        answers: [
          { type: 180, answer: 'C’est trop difficile de patienter, et il te le faut tout de suite.' },
          { type: 160, answer: 'C’est très difficile de patienter mais tu sais que tu l’auras bientôt de toutes façons.' },
        ]
      },
      {
        question: 'FACE À UN DÉSACCORD DIRAIS-TU QUE TU ES ?',
        answers: [
          { type: 180, answer: 'Plus spontanée dans tes réactions que stratégique.' },
          { type: 160, answer: 'Plus stratégique dans tes réactions que spontanée.' },
        ]
      },
    ]
  },
  b: {
    image: IMAGE_SCREEN_3B,
    questions: [
      {
        question: 'FACE À DES PERSONNES EXTRAVERTIES, EXPANSIVES AS-TU TENDANCE ?',
        answers: [
          { type: 260, answer: 'À Continuer à collaborer même si c’est un peu lourd pour toi.' },
          { type: 280, answer: 'À décrocher parce que c’est trop lourd pour toi.' },
        ]
      },
      {
        question: 'LE PLUS SOUVENT, TU TE SENS PLUTÔT ?',
        answers: [
          { type: 280, answer: 'Vivre l’instant présent comme il vient.' },
          { type: 260, answer: 'Vivre avec le besoin de participer à de nombreux projets.' },
        ]
      },
      {
        question: 'POUR TOI, VAUT-IL MIEUX ?',
        answers: [
          { type: 260, answer: 'Se lancer dans plusieurs projets au risque de ne pas aboutir.' },
          { type: 280, answer: 'Éviter de se lancer si tu penses ne pas aboutir.' },
        ]
      },
    ]
  }
};

const SCREEN_4 = {
  a: {
    image: IMAGE_SCREEN_4,
    questions: [
      {
        question: 'POUR TOI, LORSQUE TU TE RETROUVES FACE À UN OBSTACLE C’EST ?',
        answers: [
          { type: 180, answer: 'Le moyen d’en faire une force.' },
          { type: 160, answer: 'La nécessité de réfléchir davantage.' },
        ]
      },
      {
        question: 'QUELLE PLACE PREND L’AVIS DES AUTRES DANS TES DÉCISIONS ?',
        answers: [
          { type: 160, answer: 'J’ai besoin de l’avis des autres même si je finis par les prendre seule.' },
          { type: 180, answer: 'Je n’ai pas besoin des autres pour prendre mes décisions.' },
        ]
      },
      {
        question: 'SELON TOI TE CONSIDÈRES-TU HEUREUX ?',
        answers: [
          { type: 'FAMILLY', answer: 'Quand tu vis entourée de ta famille.' },
          { type: 'LUXE', answer: 'Quand tu vis dans le grand luxe.' },
          { type: 'LOVE', answer: 'Quand tu vis d’amour et d’eau fraîche.' },
          { type: 'TRAVEL', answer: 'Quand tu vis comme un globe-trotteuse.' },
        ]
      },
    ]
  },
  b: {
    image: IMAGE_SCREEN_4B,
    questions: [
      {
        question: 'POUR TOI « REMETTRE AU LENDEMAIN CE QUE L’ON PEUT FAIRE LE JOUR MÊME » ?',
        answers: [
          { type: 260, answer: 'Je préfère éviter, autant faire ce qu’il y a à faire.' },
          { type: 280, answer: 'On n’est pas à la minute, je pourrais toujours le faire demain.' },
        ]
      },
      {
        question: 'EN GROUPE, TU ES PLUTÔT DU GENRE ?',
        answers: [
          { type: 260, answer: 'À participer, collaborer, aider les autres, c’est ta deuxième nature.' },
          { type: 280, answer: 'Tu es là, mais tu préfères rester en retrait pour observer et écouter les gens.' },
        ]
      },
      {
        question: 'SELON TOI TE CONSIDÈRES-TU HEUREUX ?',
        answers: [
          { type: 'FAMILLY', answer: 'Quand tu vis entourée de ta famille.' },
          { type: 'LUXE', answer: 'Quand tu vis dans le grand luxe.' },
          { type: 'LOVE', answer: 'Quand tu vis d’amour et d’eau fraîche.' },
          { type: 'TRAVEL', answer: 'Quand tu vis comme un globe-trotteuse.' },
        ]
      },
    ]
  }
};

const SCREEN_5 = {
  image: IMAGE_SCREEN_5,
  questions: [
    {
      question: 'QUEL GENRE DE COLLABORATEUR(TRICE) RECHERCHES-TU POUR CRÉER UN PROJET ?',
      answers: [
        { type: 180, answer: 'Un(e) partenaire qui entreprend beaucoup, compétitif(ve) et qui n’écoute que lui/elle.' },
        { type: 280, answer: 'Un(e) partenaire qui collabore beaucoup, serviable et qui manque de leadership.' },
        { type: 160, answer: 'Un(e) partenaire qui analyse beaucoup, très stratégique et qui calcule tout ce qu’il/elle fait.' },
        { type: 260, answer: 'Un(e) partenaire qui tolère beaucoup, diplomate et qui est totalement détaché(e).' },
      ]
    },
    {
      question: 'PERSONNELLEMENT QU’ATTENDS-TU DE TES PROCHES ?',
      answers: [
        { type: 180, answer: 'Des proches impliqués francs et qui sont intrusifs.' },
        { type: 280, answer: 'Des proches ouverts, fêtards et qui ne se positionnent pas ou peu.' },
        { type: 260, answer: 'Des proches réconfortants, à l’écoute et qui ne savent pas toujours donner leur avis.' },
        { type: 160, answer: 'Des proches directif, fédérateurs et qui restent encore trop centrés sur eux-mêmes.' },
      ]
    },
  ]
};

const SCREEN_6 = {
  image: IMAGE_SCREEN_6,
  questions: [
    {
      question: 'QUEL GENRE DE PETITE AMI RECHERCHES-TU POUR ÊTRE HEUREUX ?',
      answers: [
        { type: 180, answer: 'Une petite ami spontané et décisionnaire, qui cherche toujours à tout contrôler.' },
        { type: 280, answer: 'Une petite ami arrangeant et accueillant, qui ne dit pas vraiment ce qu’il pense.' },
        { type: 160, answer: 'Une petite ami impliqué et à l’écoute, qui se sert trop souvent des autres.' },
        { type: 260, answer: 'Une petite ami compatissant et bienveillant, qui se laisse trop vite influencer.' }
      ]
    },
    {
      question: 'QUELS GENRES D’AMIS RECHERCHES-TU POUR PASSER UN BON MOMENT ? ',
      answers: [
        { type: 260, answer: 'Des amis attentionnés qui te soutiennent et qui ne prennent pas suffisamment d’initiatives envers toi.' },
        { type: 180, answer: 'Des amis engagés sûrs d’eux, qui se mettent trop souvent en avant.' },
        { type: 160, answer: 'Des amis persuasifs et pertinents, qui cherchent toujours le petit détail.' },
        { type: 280, answer: 'Des amis très discrets et conciliants, qui manquent de spontanéité. ' },
      ]
    },
  ]
};


export default [
  SCREEN_1,
  SCREEN_2,
  SCREEN_3,
  SCREEN_4,
  SCREEN_5,
  SCREEN_6
];
