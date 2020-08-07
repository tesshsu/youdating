const IMAGE_Q1A = require('../../../../../../assets/images/Bipolarity/perso/question1_a.jpg');
const IMAGE_Q1B = require('../../../../../../assets/images/Bipolarity/perso/question1_b.jpg');
const IMAGE_Q2A = require('../../../../../../assets/images/Bipolarity/perso/question2_a.jpg');
const IMAGE_Q2B = require('../../../../../../assets/images/Bipolarity/perso/question2_b.jpg');
const IMAGE_Q3A = require('../../../../../../assets/images/Bipolarity/perso/question3_a.jpg');
const IMAGE_Q3B = require('../../../../../../assets/images/Bipolarity/perso/question3_b.jpg');
const IMAGE_Q4A = require('../../../../../../assets/images/Bipolarity/perso/question4_a.jpg');
const IMAGE_Q4B = require('../../../../../../assets/images/Bipolarity/perso/question4_b.jpg');
const IMAGE_Q5A = require('../../../../../../assets/images/Bipolarity/perso/question5_a.jpg');
const IMAGE_Q5B = require('../../../../../../assets/images/Bipolarity/perso/question5_b.jpg');
const IMAGE_Q6A = require('../../../../../../assets/images/Bipolarity/perso/question6_a.jpg');
const IMAGE_Q6B = require('../../../../../../assets/images/Bipolarity/perso/question6_b.jpg');
const IMAGE_Q7A = require('../../../../../../assets/images/Bipolarity/perso/question7_a.jpg');
const IMAGE_Q7B = require('../../../../../../assets/images/Bipolarity/perso/question7_b.jpg');
const IMAGE_Q8A = require('../../../../../../assets/images/Bipolarity/perso/question8_a.jpg');
const IMAGE_Q8B = require('../../../../../../assets/images/Bipolarity/perso/question8_b.jpg');
const IMAGE_Q9A = require('../../../../../../assets/images/Bipolarity/perso/question9_a.jpg');
const IMAGE_Q9B = require('../../../../../../assets/images/Bipolarity/perso/question9_b.jpg');
const IMAGE_Q10A = require('../../../../../../assets/images/Bipolarity/perso/question10_a.jpg');
const IMAGE_Q10B = require('../../../../../../assets/images/Bipolarity/perso/question10_b.jpg');

const question_1 = "dans la vie de tous les jours, vous êtes plutôt attirés par ?";
const question_2 = "plutôt a l'aise ?";
const question_3 = "si vous aviez une villa vous seriez plutôt ?";
const question_4 = "tu es plutôt du genre ?";
const question_5 = "le dimanche, le plus souvent vous appréciez avant tout ?";
const question_6 = "si tu devais avoir un animal domestique ca serait plutôt ?";
const question_7 = "dans quel genre de pays voudrais tu vivres ?";
const question_8 = "plutot du genre a boire ?";
const question_9 = "plutôt vacances ?";
const question_10 = "quand vous accomplissez quelque chose en générale vous regardez d'abord ?";

export const QUESTIONS = [
	  {
		id: 0,
		title: 'question n1',
		question: question_1,
		avatarA: IMAGE_Q1A,
		avatarB: IMAGE_Q1B,
		answerA: 'le sport',
		answerB: 'la culture générale'
	  },
	  {
		id: 1,
		title: 'question n2',
		question: question_2,
		avatarA: IMAGE_Q2A,
		avatarB: IMAGE_Q2B,
		answerA: 'en ville',
		answerB: 'à la campagne'
	  },
	  {
		id: 2,
		title: 'question n3',
		question: question_3,
		avatarA: IMAGE_Q3A,
		avatarB: IMAGE_Q3B,
		answerA: 'style ancien',
		answerB: 'style moderne'
	  },
	  {
		id: 3,
		title: 'question n4',
		question: question_4,
		avatarA: IMAGE_Q4A,
		avatarB: IMAGE_Q4B,
		answerA: 'concert à la maison',
		answerB: 'concert en live'
	  },
	  {
		id: 4,
		title: 'question n5',
		question: question_5,
		avatarA: IMAGE_Q5A,
		avatarB: IMAGE_Q5B,
		answerA: 'chill devant un film',
		answerB: 'vous balader '
	  },
	  {
		id: 5,
		title: 'question n6',
		question: question_6,
		avatarA: IMAGE_Q6A,
		avatarB: IMAGE_Q6B,
		answerA: 'un chat',
		answerB: 'un chien'
	  },
	  {
		id: 6,
		title: 'question n7',
		question: question_7,
		avatarA: IMAGE_Q7A,
		avatarB: IMAGE_Q7B,
		answerA: 'climat tempéré',
		answerB: 'climat tropicale'
	  },
	  {
		id: 7,
		title: 'question n8',
		question: question_8,
		avatarA: IMAGE_Q8A,
		avatarB: IMAGE_Q8B,
		answerA: 'du thé',
		answerB: 'du café'
	  },
	  {
		id: 8,
		title: 'question n9',
		question: question_9,
		avatarA: IMAGE_Q9A,
		avatarB: IMAGE_Q9B,
		answerA: "d'hivers",
		answerB: "d'été"
	  },
	  {
		id: 9,
		title: 'question n10',
		question: question_10,
		avatarA: IMAGE_Q10A,
		avatarB: IMAGE_Q10B,
		answerA: 'le résultat',
		answerB: 'le chemin parcouru'
	  }
];
