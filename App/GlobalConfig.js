import { Appearance } from 'react-native-appearance';

const COLORS = {
  blue: '#2580EB',
  purple: '#B2499D',
  pink: '#EB3780',
  yellow: '#F1BB6D'
};

const PRO_TAGS = [
  'AÉRONAUTIQUE',
  'AGROALIMENTAIRE',
  'ARTISANAT',
  'ASSURANCE',
  'BANQUE',
  'BTP',
  'COMMERCE',
  'FONCTION PUBLIQUE',
  'INFORMATIQUE',
  'IMMOBILIER',
  'TRANSPORT-LOGISTIQUE',
  'MARKETING',
  'MÉDECINE'
];

const MOODS = {
  PRO: {
    title: 'Professionnel',
    titleFeminize: 'Professionnelle',
    color: COLORS.blue,
    lightColor: '#8DBAE5',
    searches: [
      {
        label: 'RECHERCHE UN EMPLOI',
        tags: PRO_TAGS
      },
      {
        label: 'RECHERCHE A RECRUTER',
        tags: PRO_TAGS
      },
      {
        label: 'RECHERCHE UNE COLLABORATION',
        tags: PRO_TAGS
      },
      {
        label: 'RECHERCHE A ÉLARGIR MON RÉSEAU',
        tags: PRO_TAGS
      },
      {
        label: 'RECHERCHE A ÉCHANGER DANS LE DOMAINE',
        tags: PRO_TAGS
      },
      {
        label: 'TOUTE RECHERCHES CONFONDUES',
        tags: ['TOUT TAGS CONFONDUS']
      }
    ],
  },
  SOCIAL: {
    title: 'Sociale',
    titleFeminize: 'Sociale',
    color: COLORS.purple,
    searches: [
      {
        label: 'RECHERCHE À FAIRE UNE ACTIVITÉ AVEC QUELQU\'UN',
        tags: ['BILLARD', 'BOWLING', 'CINÉMA', 'LOISIRS', 'PISCINE', 'SPORT']
      },
      {
        label: 'RECHERCHE SIMPLEMENT À DISCUTER ET À PASSER DE BONS MOMENTS',
        tags: [
          'AUTOMOBILES',
          'CULTURE GÉNÉRALE',
          'FILMS',
          'GASTRONOMIE',
          'JEUX VIDÉOS',
          'MODE & BEAUTÉ',
          'MULTIMÉDIA',
          'TECHNOLOGIE',
          'SERIES',
          'SPORTS',
          'VOYAGES',
        ]
      },
      {
        label: 'RECHERCHE A PARTAGER MA PASSION',
        tags: ['TOUTES PASSIONS CONFONDUES']
      },
      {
        label: 'RECHERCHE PARTENAIRE POUR SORTIR FAIRE LA FÊTE',
        tags: ['AFTERWORK', 'BOIRE UN VERRE', 'DANSER', 'RESTAURANT']
      },
      {
        label: 'TOUTE RECHERCHES CONFONDUES',
        tags: ['TOUT TAGS CONFONDUS']
      }
    ]
  },
  LOVE: {
    title: 'Couple',
    titleFeminize: 'de couple',
    color: COLORS.pink,
    searches: [
      {
        label: 'RECHERCHE RELATION SÉRIEUSE',
        tags: ['TOUS PROFILS']
      },
      {
        label: 'RECHERCHE RELATION SANS ENGAGEMENT',
        tags: ['TOUS PROFILS']
      },
      {
        label: 'RECHERCHE TOUTES RELATIONS CONFONDUES',
        tags: ['TOUS PROFILS']
      },
      {
        label: 'TOUTE RECHERCHES CONFONDUES',
        tags: ['TOUT TAGS CONFONDUS']
      }
    ]
  },
  PERSO: {
    title: 'Personnel',
    titleFeminize: 'Personnelle',
    color: COLORS.yellow,
    searches: [
      {
        label: 'ENVIE DE DISCUTER',
        tags: [
          'ANNONCE ÉVENEMENTS',
          'AVIS & CONSEILS',
          'DISCUSSIONS LÉGÈRES',
          'DISCUSSIONS SÉRIEUSES',
          'DIVERS ET VARIÉS',
          'ENFANTS',
          'GRAND-PARENTS',
          'GROSSESSES',
        ]
      },
      {
        label: 'ENVIE DE SORTIR',
        tags: [
          'BOIRE UN VERRE',
          'BOWLING',
          'CINÉMA',
          'RESTAURANT',
          'SOIRÉE DANSANTE',
        ]
      },
      {
        label: 'ENVIE D\'ORGANISER',
        tags: [
          'ANNIVERSAIRE',
          'DÎNER FAMILLIAL',
          'FÊTE',
          'JEUX SOCIÉTÉ',
          'SOIRÉE JEUNE',
          'SURPRISES',
          'VOYAGES',
        ]
      },
      {
        label: 'TOUTE RECHERCHES CONFONDUES',
        tags: ['TOUT TAGS CONFONDUS']
      }
    ]
  }
};

const COLOR_SCHEME = Appearance.getColorScheme();

export {
  COLORS,
  MOODS,
  COLOR_SCHEME
};
