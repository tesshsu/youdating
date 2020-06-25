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

const IMAGE_BACKGROUND_PRO_INSUF = require('../assets/images/match/professionnel/insuf.png');
const IMAGE_BACKGROUND_SOCIALE_INSUF = require('../assets/images/match/couple/insuf.png');
const IMAGE_BACKGROUND_PERSO_INSUF = require('../assets/images/match/personnel/insuf.png');
const IMAGE_BACKGROUND_LOVE_INSUF = require('../assets/images/match/couple/insuf.png');

const IMAGE_BACKGROUND_PRO_EXCEL = require('../assets/images/match/professionnel/excel.png');
const IMAGE_BACKGROUND_SOCIALE_EXCEL = require('../assets/images/match/couple/excel.png');
const IMAGE_BACKGROUND_PERSO_EXCEL = require('../assets/images/match/personnel/excel.png');
const IMAGE_BACKGROUND_LOVE_EXCEL = require('../assets/images/match/couple/excel.png');

const IMAGE_BACKGROUND_PRO_MAUV = require('../assets/images/match/professionnel/mauv.png');
const IMAGE_BACKGROUND_SOCIALE_MAUV = require('../assets/images/match/couple/mauv.png');
const IMAGE_BACKGROUND_PERSO_MAUV = require('../assets/images/match/personnel/mauv.png');
const IMAGE_BACKGROUND_LOVE_MAUV = require('../assets/images/match/couple/mauv.png');

const IMAGE_BACKGROUND_PRO_SATIS = require('../assets/images/match/professionnel/satis.png');
const IMAGE_BACKGROUND_SOCIALE_SATIS = require('../assets/images/match/couple/satis.png');
const IMAGE_BACKGROUND_PERSO_SATIS = require('../assets/images/match/personnel/satis.png');
const IMAGE_BACKGROUND_LOVE_SATIS = require('../assets/images/match/couple/satis.png');


const MATCHBACKGROUND = {
  PRO_INSUF: IMAGE_BACKGROUND_PRO_INSUF,
  SOCIAL_INSUF: IMAGE_BACKGROUND_SOCIALE_INSUF,
  PERSO_INSUF: IMAGE_BACKGROUND_PERSO_INSUF,
  LOVE_INSUF: IMAGE_BACKGROUND_LOVE_INSUF,  
  PRO_EXCEL: IMAGE_BACKGROUND_PRO_EXCEL,
  SOCIAL_EXCEL: IMAGE_BACKGROUND_SOCIALE_EXCEL,
  PERSO_EXCEL: IMAGE_BACKGROUND_PERSO_EXCEL,
  LOVE_EXCEL: IMAGE_BACKGROUND_LOVE_EXCEL,
  PRO_MAUV: IMAGE_BACKGROUND_PRO_MAUV,
  SOCIAL_MAUV: IMAGE_BACKGROUND_SOCIALE_MAUV,
  PERSO_MAUV: IMAGE_BACKGROUND_PERSO_MAUV,
  LOVE_MAUV: IMAGE_BACKGROUND_LOVE_MAUV,
  PRO_SATIS: IMAGE_BACKGROUND_PRO_SATIS,
  SOCIAL_SATIS: IMAGE_BACKGROUND_SOCIALE_SATIS,
  PERSO_SATIS: IMAGE_BACKGROUND_PERSO_SATIS,
  LOVE_SATIS: IMAGE_BACKGROUND_LOVE_SATIS
};

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
	match: {
	   mauvaise : {
		   title: 'COMPATIBILITE PROFESSIONNEL MAUVAISE',
		   note: 25,
		   contentTitle: "Risque de désaccords à l'horizon",
		   backgroundImage: MATCHBACKGROUND.PRO_MAUV,
		   content: `vos attentes concernant votre avenirs professionnelles ne sont pas les mêmes du tout mais pas de stresse, vous pouvez toujours trouver 
		   un terrain d'entente pour avancer plus sereinement dans vos projets communs.
		   Actuellement, vos visions divergent trop fortement pour avancer de manières constructives dans ce 
		   que vous entreprenez ensemble. Vous n'abordez pas le partenariat sous le même angle, ce qui peut crée quelques
		   conflits et tensions entre vous. Essayez donc d'être plus collaboratif et réceptif aux besoins de l'autre pour améliorer l'efficacité dans votre relation`		   
	   },
	   insuffisante: {
		   title: 'COMPATIBILITE PROFESSIONNEL INSUFFISANTE',
		   note: 50,
		   contentTitle: "Votre coopération n'est pas la plus optimale qui soit ",
		   backgroundImage: MATCHBACKGROUND.PRO_INSUF,
		   content: `mais rien de grave avec plus de volonté et d'implication, vos plus grandes faiblesses pourraient vite devenir vos plus grandes forces.
           Dans la configuration actuelle, vous risquez d'avoir des difficultés à vous entendre sur la manière de 
		   procéder. Aucun de vous n'est véritablement satisfait du comportement de l'autre. 
		   Vos attentes étant différentes, votre collaboration risque inévitablement d'en souffrir ce 
		   qui pourrait a terme vous empêcher d'evoluer plus sérieusement dans des projets en communs. 
		   Essayez donc d'être plus conciliant et apprenez a mieux comprendre la pensée de l'autre pour être plus performant dans votre partenariat.`
	   },
	   satisfaisante: {
		   title: 'COMPATIBILITE PROFESSIONNEL SATISFAISANTE',
		   note: 70,
		   backgroundImage: MATCHBACKGROUND.PRO_SATIS,
		   contentTitle: " Votre compatibilé est trés encourageante ",
		   content: `mais attention ils vous restent encore quelques étapes à franchir pour être véritablement au 
		   top !!
		   A cette instant précis, votre partenariat se passe plutôt bien, l'un de vous est déja satisfait par l'attitude de l'autre ce qui facilite la collaboration entre vous. Mais malgré cela ils vous restent encore quelques efforts à fournir pour être plus performant dans la mise en place de vos projets en communs. Essayez donc de communiquer davantage en prenant en compte 
		   les attentes de l'autre, cela vous aidera à resserer les liens dans les moments les plus difficiles.`
	   },
	   excellente: {
		   title: 'COMPATIBILITE PROFESSIONNEL EXCELLENTE',
		   note: 90,
		   backgroundImage: MATCHBACKGROUND.PRO_EXCEL,
		   contentTitle: " Bravo, vous êtes au top, vous formez un duo de choc",
		   content: `vous pouvez accomplir de grandes choses ensemble alors profitez-en des maintenant.
		   Dans la situation présente, vous correspondez tout les deux exactement aux profils recherchés. 
		   Vous pouvez compter l'un sur l'autre pour vous accompagné dans ce que vous accomplissez 
		   professionnellement. Votre équipe est une valeur sure, vous savez vous mettre d'accord pour 
		   avancer plus efficacement dans vos projets.c'est pour ces raisons que votre partenariat à de 
		   grandes chances de reussir. Continuer donc de vous faire confiance et de vous soutenir 
		   mutuellement pour apprécier le bien être et la motivation que peut vous procurer une telle 
		   collaboration`
	   }
	}
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
    ],
	match: {
	   mauvaise : {
		   title: 'COMPATIBILITE SOCIAL MAUVAISE',
		   note: 25,
		   backgroundImage: MATCHBACKGROUND.SOCIAL_MAUV,
		   contentTitle: "Vos besoins s'opposent fortement",
		   content: `vous ne recherchez pas le même genre d'amitier mais il y a une bonne nouvelle vous pouvez 
		   toujours agir pour améliorer votre relation si vous le souhaitez vraiment !!
		   
		             Actuellement, vos attentes respectives sont très differentes, ce qui peut entrainé beaucoup 
					 de désaccords dans la manière de voir ou de gerer une situation commune. A long terme le 
					 comportement de l'autre à donc de fortes chances de vous déplaire et de crée de véritables 
					 tensions entre vous si vous ne reagissez pas maintenant . 
					 Essayez donc d'être plus tolérant l'un envers  l"autre et apprenez à vous connaitre 
					 davantage pour profiter pleinement de chaque instants passés ensemble`
		   
	   },
	   insuffisante: {
		   title: 'COMPATIBILITE SOCIAL INSUFFISANTE',
		   note: 50,
		   backgroundImage: MATCHBACKGROUND.SOCIAL_INSUF,
		   contentTitle: "votre entente pourrait être meilleur ",
		   content: `mais rassurez vous il n'est jamais trop tard pour devenir les meilleurs amis du monde !!
		   A l'heure actuelle, vos besoins respectifs pourrait facilement vous empêcher d'évoluer et même de 
		   profiter pleinement des qualités de l'autre. Vos attentes n'étant pas les même vous risquez de vous 
		   heurter à des incompréhension qui finiront par vous éloignés petit à petit. Essayez
		   donc de vous comprendre davantage et de vous adapter à l'autre pour améliorer la communication au sein de la relation`
	   },
	   satisfaisante: {
		   title: 'COMPATIBILITE SOCIAL SATISFAISANTE',
		   note: 70,
		   backgroundImage: MATCHBACKGROUND.SOCIAL_SATIS,
		   contentTitle: "C'est plutot bon signe ",
		   content: `vous êtes sur la bonne voie alors profitez de votre entente pour sortir, discuter et rigoler ensemble comme le font tous les véritables amis !!
           A cet instant, vous êtes proche d'une excellente relation car vous comblez en partie les besoins de l'autre mais l'un de vous deux en attends un peu 
		   plus pour être totalement conquis. Vos différentes façons de penser peuvent parfois créer quelques désaccords entre vous et vous empêcher d'apprécier 
		   les bons moments de franche camaraderie .Continuer donc d'approfondir votre relation en apprenant à vous connaître davantage pour profiter encore  
		   plus de votre amitié`
	   },
	   excellente: {
		   title: 'COMPATIBILITE SOCIAL EXCELLENTE',
		   note: 90,
		   backgroundImage: MATCHBACKGROUND.SOCIAL_EXCEL,
		   contentTitle: " félicitation, vous êtes sur la plus haute marche du podium ",
		   content: `vos personnalités se complètent parfaitement. votre entente fait de vous de véritables amis.
		   actuellement votre relation est très propice à l'épanouissement , à créer de nombreux projets ou même tout simplement à profiter 
		   de vos envies ensemble. vous avez tout les deux la personnalité que l'autre recherches ce qui est plutôt rare !! 
		   continuez donc à  saisir ces opportunités pour prendre du plaisir ensemble en appréciant à sa juste valeur votre belle amitié`
	   }
	}
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
    ],
	match: {
	   mauvaise : {
		   title: 'COMPATIBILITE COUPLE MAUVAISE',
		   note: 25,
		   backgroundImage: MATCHBACKGROUND.LOVE_MAUV,
		   contentTitle: " Vos attentes divergent enormement ",
		   content: `mais pas de panique pour chaques problèmes il existe des solutions que vous pouvez adapter pour améliorer votre relation amoureuse!!

		             Dans le cas présent, vous risquez d'atteindre vos limites rapidement si vous restez dans cette configuation. Votre couple pourrait tres vite se dégradér, il 
					 faut donc que vous preniez les choses en main dès maintenant si vous voulez éviter le pire . 
					 Essayer donc d'être plus à l'écoute et attentionné l'un envers l'autre pour mieux comprendre ce qui vous empêche d'evoluer plus sereinement ensemble`
		   
	   },
	   insuffisante: {
		   title: 'COMPATIBILITE COUPLE INSUFFISANTE',
		   note: 50,
		   backgroundImage: MATCHBACKGROUND.LOVE_INSUF,
		   contentTitle: "dans cette configuration vos personnalités se font obstacles  ",
		   content: `mais rien n'est définitif soyez en certain. les compromis peuvent véritablement améliorer votre relation de couple 
		   si vous y accordez un peu plus de temps!!
		   dans ce contexte précis, aucun de vous ne sera pleinement satisfait par le comportement de l'autre. Vos attentes concernant votre 
		   partenaire ne sont pas les même, ce qui risque de  provoquer des conflits d'intêrets et des frustrations entre vous. Ne 
		   laissez pas les incompréhension gâcher votre bonheur présent. Essayez donc d'être plus impliqué et coopératif  l'un 
		   envers l'autre pour pouvoir enfin profiter de véritables instants privilégier au sein de votre relation`
	   },
	   satisfaisante: {
		   title: 'COMPATIBILITE COUPLE SATISFAISANTE',
		   note: 70,
		   backgroundImage: MATCHBACKGROUND.LOVE_SATIS,
		   contentTitle: "votre relation est très encourageante ",
		   content: `vous êtes sur la bonne voie . le perfect match n'est pas si loin !!

           Dans la situation actuelle, l'un de vous est déja assez satisfait par la relation alors que l'autre n'est pas 
		   encore totalement convaincu.  Dans la relation certaines manières d'agir peuvent crée des désaccords qui 
		   oblige chacun à adopter une posture défensive, ce qui vous empêche tout les deux à terme de profiter pleinement de votre vie en couple . Essayez 
		   donc de vous calibrer à l'autre et apprenez a resserer les liens en partageant davantage votre vision des choses`
	   },
	   excellente: {
		   title: 'COMPATIBILITE COUPLE EXCELLENTE',
		   note: 90,
		   backgroundImage: MATCHBACKGROUND.LOVE_EXCEL,
		   contentTitle: " félicitation votre relation atteint des sommets ",
		   content: `Vos personnalités s'accordent merveilleusement bien, vous avez tout ce qu'il faut pour former le couple parfait.
		   En l'etat, vous avez trouvés chez l'autre la personnalité idéale qui vous permet de vous épanouir comme vous le souhaitez. 
		   Vous êtes sur la même longueur d'onde. Votre partenaire sera donc vous combler et son attitude pourra davantage vous stimuler ou vous apaiser 
		   en fonction de la situation. Alors profitez-en un maximum ce n'est pas tout les jours que vous êtes face a quelqu'un qui vous correspond si bien. 
		   Essayez donc d'entreprendre ensemble le plus souvent possible et continuer a vieiller l'un sur l'autre pour vivre une véritable love story`
	   }
	}
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
    ],
	match: {
	   mauvaise : {
		   title: 'COMPATIBILITE PERSONNELLE MAUVAISE',
		   note: 25,
		   backgroundImage: MATCHBACKGROUND.PERSO_MAUV,
		   contentTitle: " Vos attentes sont aux antipodes !! ",
		   content: `Vous n'abordez pas la vie de la même facon mais pas de panique rien ne vous empêchent d'apprendre à mieux vous connaître 
		              pour améliorer votre relation.

		             A l'heure actuelle, le risque de désaccords est élevé. Vos visions se confrontent trop souvent pour que vous puissiez vous épanouir 
					 convenablement dans la relation. Vos besoins respectifs étant différents, vous peinez à faire de véritables compromis ensemble. 
					 Apprenez donc à revoir vos attentes et soyez plus indulgent face a l'attitude de l'autre pour apprécier davantage les moments 
					 que vous passerez ensemble`
		   
	   },
	   insuffisante: {
		   title: 'COMPATIBILITE PERSONNELLE INSUFFISANTE',
		   note: 50,
		   backgroundImage: MATCHBACKGROUND.PERSO_INSUF,
		   contentTitle: "vous attendez beaucoup plus l'un de l'autre  ",
		   content: `vos besoins ne sont pas assez pris en compte, ce qui vous oblige à faire du surplace au lieu 
		   d'avancer mais ne vous en faites pas tout peut  s'arranger si on sait ou et comment agir.
		   A cet instant, vos comportements vous eloignent plus qu'ils ne vous rapprochent. A terme vous risquez de 
		   passer à côter de qualités qui pourraient s'averer utile à votre relation. Les fréquentes mésententes 
		   peuvent tout les deux vous décourager et vous empêchez d'apprécier l'autre à sa juste valeur. Essayer 
		   donc d'être plus flexible et plus a l'écoute des envies de chacun ce qui vous permettra de mieux vous épanouir ensemble`
	   },
	   satisfaisante: {
		   title: 'COMPATIBILITE PERSONNELLE SATISFAISANTE',
		   note: 70,
		   backgroundImage: MATCHBACKGROUND.PERSO_SATIS,
		   contentTitle: " Vous savez tout les deux faire des compromis pour avancer ",
		   content: ` Votre compatibilité est plutôt bonne mais sachez quand même que l'un de vous deux fait plus 
		   d'effort que l'autre pour maintenir la relation dans un bon état.

           Actuellement, vous êtes dans une configuration qui vous permet de mieux comprendre ce que l'autre veut. 
		   Même si tout n'est pas parfait vous savez comment composer ensemble et profiter des opportunités 
		   communes pour accomplir certaines taches plus facilement. Continuez donc à être plus attentif et 
		   disponible à l'egard de l'autre pour conserver une bonne communication au sein de la relation`
	   },
	   excellente: {
		   title: 'Votre compatibilité est au maximum',
		   note: 90,
		   backgroundImage: MATCHBACKGROUND.PERSO_EXCEL,
		   contentTitle: " félicitation votre relation atteint des sommets ",
		   content: `Vos attentes s'accordent parfaitement avec les siennes. Plus rien ne peut vous arrêtter alors  
		   profitez en pour rigoler, partager, sortir et vivre votre relation pleinement.
		   A ce moment précis, vous possedez tous les deux la personnalité dont l'autre a besoin pour s'épanouir plus sereinement 
		   dans la relation. Vos comportements vous stimulent fortement  vous êtes tout les deux satisfaits  et 
		   motivés par l'attitude de l'autre, ce qui vous poussent à entreprendre plus souvent ensemble et 
		   vous apaisent quand cela est necessaire. Cette attitude renforce davantage la confiance entre vous et 
		   vous permet d'apprécier encore plus intensement chaques instants passées ensembles. Continuez donc a être 
		   collaboratif et bienvellant l'un envers l'autre pour vous apporter le meilleur`
	   }
	}
  }
};

const COLOR_SCHEME = Appearance.getColorScheme();

export {
  COLORS,
  MOODS,
  COLOR_SCHEME
};
