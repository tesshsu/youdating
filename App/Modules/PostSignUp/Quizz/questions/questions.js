const IMAGE_SCREEN_1 = require('../../../../../assets/images/quizz/screen1.png');
const IMAGE_SCREEN_2 = require('../../../../../assets/images/quizz/screen2.png');
const IMAGE_SCREEN_3 = require('../../../../../assets/images/quizz/screen3.png');
const IMAGE_SCREEN_4 = require('../../../../../assets/images/quizz/screen4.png');
const IMAGE_SCREEN_5 = require('../../../../../assets/images/quizz/screen5.png');
const IMAGE_SCREEN_6 = require('../../../../../assets/images/quizz/screen6.png');
const SCREEN_1 = {
  image: IMAGE_SCREEN_1,
  questions: [
    {
      question: 'TE SENS-TU CONSTAMMENT POUSSÉ À EXPRIMER CE QUE TU PENSES EN PUBLIC ?',
      answers: [
        { type: 1, answer: 'Oui je communique beaucoup, c’est important pour moi que les gens sachent ce que je pense.' },
        { type: 2, answer: 'Non, je préfère rester discret(e), je ne vois pas l’utilité d’en informer tout le monde tout le temps.' },
      ]
    },
    {
      question: 'LA PLUPART DU TEMPS, LORSQUE TU ÉCHOUES ?',
      answers: [
        { type: 2, answer: 'Tu l’acceptes assez facilement même si tu es déçu (e)' },
        { type: 1, answer: 'TU as beaucoup de mal à l’accepter, il n’est pas question de lâcher' },
      ]
    },
    {
      question: 'DANS LA VIE DE TOUS LES JOURS, PASSES-TU PLUS DE TEMPS À ÊTRE ?',
      answers: [
        { type: 1, answer: 'Exigeant(e) avec Toi-même.' },
        { type: 2, answer: 'Compréhensif(e) avec les autres.' },
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
        { type: 1, answer: 'Tu rentres dans le conflit pour le dissuader de continuer.' },
        { type: 2, answer: 'Tu tentes de contourner le conflit pour préserver ta paix et ta tranquilité.' },
      ]
    },
    {
      question: 'Lorsque tu te trouves face à une personne qui n’est pas d’accord avec toi :? ',
      answers: [
        { type: 1, answer: 'Tu tentes de lui démontrer que tu as raison par tous les moyens possibles pour qu’il change d’avis' },
        { type: 2, answer: 'Tu ne cherches pas à le convaincre particulièrement parce que tu sais qu’il a déjà son opinion sur la question.' },
      ]
    },
  ]
};

const SCREEN_3 = {
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
          { type: 180, answer: 'C’est trop difficile de patienter, il te le faut de suite.' },
          { type: 160, answer: 'C’est très difficile de patienter mais tu sais que tu l’auras bientôt de toutes façons.' },
        ]
      },
      {
        question: 'FACE À UN DÉSACCORD DIRAIS-TU QUE TU ES ?',
        answers: [
          { type: 180, answer: 'Plus spontané dans tes réactions que stratégique.' },
          { type: 160, answer: 'Plus stratégique dans tes réactions que spontané.' },
        ]
      }
    ]
};

const SCREEN_4 = {
    image: IMAGE_SCREEN_4,
    questions: [
      {
        question: 'POUR TOI, LORSQUE TU TE RETROUVES FACE À UN OBSTACLE ?',
        answers: [
          { type: 180, answer: 'c’est le moyen d’en faire une force.' },
          { type: 160, answer: 'c’est la nécessité de réfléchir davantage.' },
        ]
      },
      {
        question: 'QUELLE PLACE PREND L’AVIS DES AUTRES DANS TES DÉCISIONS ?',
        answers: [
          { type: 160, answer: 'J’ai besoin de l’avis des autres même si je finis par les prendre seul.' },
          { type: 180, answer: 'Je n’ai pas besoin des autres pour prendre mes décisions..' },
        ]
      }
    ]
};

const SCREEN_5 = {
  image: IMAGE_SCREEN_5,
  questions: [
    {
      question: 'QUEL GENRE DE COLLABORATEUR(TRICE) RECHERCHES-TU POUR CRÉER UN PROJET ?',
      answers: [
        { type: 180, answer: 'Un(e) partenaire qui entreprend beaucoup et qui est compétitif(ve)' },
        { type: 280, answer: 'n(e) partenaire qui collabore beaucoup et qui est serviable.' },
        { type: 160, answer: 'Un(e) partenaire qui réfléchit beaucoup et qui est très stratégique.' },
        { type: 260, answer: 'Un(e) partenaire qui tolère beaucoup et qui est diplomate.' },
      ]
    },
    {
      question: 'PERSONNELLEMENT QU’ATTENDS-TU DE TES PROCHES ?',
      answers: [
        { type: 180, answer: 'Des proches impliqués et francs' },
        { type: 280, answer: 'Des proches ouverts et fêtards' },
        { type: 260, answer: 'Des proches attentionnés et à l’écoute' },
        { type: 160, answer: 'Des proches directif et fédérateurs' },
      ]
    },
  ]
};

const SCREEN_6 = {
  image: IMAGE_SCREEN_6,
  questions: [
    {
      question: 'QUEL GENRE DE PETITE AMIE RECHERCHES-TU POUR ÊTRE HEUREUX ?',
      answers: [
        { type: 180, answer: 'Une petite amie spontanée et décisionnaire, qui cherche toujours à tout contrôler.' },
        { type: 280, answer: 'Une petite amie arrangeante et accueillante, qui ne dit pas vraiment ce qu’elle pense.' },
        { type: 160, answer: 'Une petite amie impliquée et à l’écoute, qui se sert trop souvent des autres.' },
        { type: 260, answer: 'Une petite amie compatissante et bienveillante, qui se laisse trop vite influencer.' }
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
