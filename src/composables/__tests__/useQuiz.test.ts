import { it, expect, describe, beforeEach } from 'vitest';
import { type Quiz, QUIZ_ROUND_RESULTS } from '@/types';
import useQuiz from '@/composables/useQuiz';

const stubQuizData = {
  title: 'HTML',
  icon: 'icon-html.svg',
  color: 'red',
  questions: [
    {
      question: 'What does HTML stand for?',
      options: ['Hyper Trainer Marking Language', 'Hyper Text Marketing Language', 'Hyper Text Markup Language', 'Hyper Text Markup Leveler'],
      answer: 'Hyper Text Markup Language'
    },
    {
      question: 'Which of the following is the correct structure for an HTML document?',
      options: [
        '<html><head></head><body></body></html>',
        '<head><html></html><body></body></head>',
        '<body><head></head><html></html></body>',
        '<html><body></body><head></head></html>'
      ],
      answer: '<html><head></head><body></body></html>'
    },
    {
      question: 'Which HTML element is used to define the title of a document?',
      options: ['<head>', '<title>', '<header>', '<top>'],
      answer: '<title>'
    },
    {
      question: 'What is the purpose of the <body> tag in HTML?',
      options: [
        "It defines the document's head section.",
        'It contains all the content such as text, images, and links.',
        'It is used to define the main content of an HTML document.',
        'It specifies the body of the email content in HTML.'
      ],
      answer: 'It contains all the content such as text, images, and links.'
    },
    {
      question: 'Which HTML tag is used to create a hyperlink?',
      options: ['<hyperlink>', '<link>', '<a>', '<href>'],
      answer: '<a>'
    },
    {
      question: 'Which tag is used to display images in HTML?',
      options: ['<img>', '<image>', '<src>', '<pic>'],
      answer: '<img>'
    },
    {
      question: 'What attribute is used to provide the path of an image in the <img> tag?',
      options: ['link', 'src', 'href', 'url'],
      answer: 'src'
    },
    {
      question: 'Which HTML tag is used to create an unordered list?',
      options: ['<ul>', '<ol>', '<list>', '<li>'],
      answer: '<ul>'
    },
    {
      question: 'What does the <br> tag do?',
      options: ['It breaks the text into two sections.', 'It creates a bold text.', 'It inserts a line break.', 'It adds a new row in a table.'],
      answer: 'It inserts a line break.'
    },
    {
      question: 'In HTML, what does the `fieldset` tag do?',
      options: [
        'It is used to group related data in a form.',
        'It sets the field to a fixed size.',
        'It automatically validates the fields within a form.',
        'It hides the fields in a form.'
      ],
      answer: 'It is used to group related data in a form.'
    }
  ]
};
let quiz: Quiz;
function callNextQuestionNTimes(n: number) {
  for (let i = 0; i < n; i++) {
    quiz.nextQuestion();
  }
}
function callCheckAnswerNTimes(n: number) {
  for (let i = 0; i < n; i++) {
    quiz.checkAnswer('some wrong answer');
    quiz.nextQuestion();
  }
}
beforeEach(() => {
  quiz = useQuiz(stubQuizData);
});
describe('useQuiz composable', () => {
  describe('questionCount', () => {
    it('returns correct question count', () => {
      expect(quiz.questionsCount).toEqual(10);
    });
  });
  describe('question', () => {
    it('returns first question', () => {
      expect(quiz.question.value).toEqual(stubQuizData.questions[0].question);
    });
    it('returns n-th question after n calls to nextQuestion', () => {
      quiz.nextQuestion();
      expect(quiz.question.value).toEqual(stubQuizData.questions[1].question);

      callNextQuestionNTimes(3);
      expect(quiz.question.value).toEqual(stubQuizData.questions[4].question);
    });
    it('returns last question even when calls to nextQuestion exceedes n of questions', () => {
      callNextQuestionNTimes(9);
      expect(quiz.question.value).toEqual(stubQuizData.questions[9].question);

      callNextQuestionNTimes(5);
      expect(quiz.question.value).toEqual(stubQuizData.questions[9].question);
    });
  });
  describe('answer', () => {
    it('returns correct answer to specific question', () => {
      expect(quiz.answer.value).toEqual(stubQuizData.questions[0].answer);

      callNextQuestionNTimes(3);
      expect(quiz.answer.value).toEqual(stubQuizData.questions[3].answer);

      callNextQuestionNTimes(9);
      expect(quiz.answer.value).toEqual(stubQuizData.questions[9].answer);
    });
    describe('isOver', () => {
      it('returns false when it is not the last question in the quiz', () => {
        expect(quiz.isOver.value).toEqual(false);

        callCheckAnswerNTimes(3);
        expect(quiz.isOver.value).toEqual(false);

        callCheckAnswerNTimes(5);
        expect(quiz.isOver.value).toEqual(false);
      });
      it('returns true when it is the last question in the quiz', () => {
        callCheckAnswerNTimes(11);
        expect(quiz.isOver.value).toEqual(true);

        callCheckAnswerNTimes(4);
        expect(quiz.isOver.value).toEqual(true);
      });
    });
  });
  describe('result', () => {
    it('returns correct result when quiz round was not started', () => {
      expect(quiz.result.value).toEqual(QUIZ_ROUND_RESULTS.NEW_QUESTION);
    });
  });
  describe('checkAnswer', () => {
    it('sets correct result when no valid answer was provided', () => {
      quiz.checkAnswer('');
      expect(quiz.result.value).toEqual(QUIZ_ROUND_RESULTS.NO_ANSWER);
    });
    it('sets correct result when correct answer was provided', () => {
      quiz.checkAnswer(stubQuizData.questions[0].answer);
      expect(quiz.result.value).toEqual(QUIZ_ROUND_RESULTS.CORRECT_ANSWER);

      callNextQuestionNTimes(4);
      quiz.checkAnswer(stubQuizData.questions[4].answer);
      expect(quiz.result.value).toEqual(QUIZ_ROUND_RESULTS.CORRECT_ANSWER);

      callNextQuestionNTimes(5);
      quiz.checkAnswer(stubQuizData.questions[9].answer);
      expect(quiz.result.value).toEqual(QUIZ_ROUND_RESULTS.CORRECT_ANSWER);

      callNextQuestionNTimes(3);
      quiz.checkAnswer(stubQuizData.questions[9].answer);
      expect(quiz.result.value).toEqual(QUIZ_ROUND_RESULTS.CORRECT_ANSWER);
    });
    it('sets correct result when incorrect answer was provided', () => {
      quiz.checkAnswer('some wrong answer');
      expect(quiz.result.value).toEqual(QUIZ_ROUND_RESULTS.INCORRECT_ANSWER);

      quiz.checkAnswer(stubQuizData.questions[4].answer);
      expect(quiz.result.value).toEqual(QUIZ_ROUND_RESULTS.INCORRECT_ANSWER);

      callNextQuestionNTimes(5);
      quiz.checkAnswer(stubQuizData.questions[6].answer);
      expect(quiz.result.value).toEqual(QUIZ_ROUND_RESULTS.INCORRECT_ANSWER);
    });
  });
  describe('correctAnswersCount', () => {
    it('return 0 when quiz has not started', () => {
      expect(quiz.correctAnswersCount.value).toEqual(0);
    });
    it('return 0 when no valid answer was provided', () => {
      quiz.checkAnswer('');
      quiz.checkAnswer('incorrect question');
      quiz.checkAnswer('another incorrect question');
      expect(quiz.correctAnswersCount.value).toEqual(0);
    });
    it('returns correct number of correct answers', () => {
      quiz.checkAnswer('Wrong answer');
      quiz.nextQuestion();
      quiz.checkAnswer(stubQuizData.questions[1].answer);
      quiz.nextQuestion();
      quiz.checkAnswer(stubQuizData.questions[2].answer);
      quiz.nextQuestion();
      quiz.checkAnswer(stubQuizData.questions[3].answer);
      quiz.nextQuestion();
      expect(quiz.correctAnswersCount.value).toEqual(3);
      quiz.checkAnswer(stubQuizData.questions[4].answer);
      quiz.nextQuestion();
      quiz.checkAnswer('Wrong answer');
      quiz.nextQuestion();
      quiz.checkAnswer('Wrong answer');
      quiz.nextQuestion();
      quiz.checkAnswer('Wrong answer');
      quiz.nextQuestion();
      quiz.checkAnswer(stubQuizData.questions[8].answer);
      quiz.nextQuestion();
      quiz.checkAnswer(stubQuizData.questions[9].answer);
      quiz.nextQuestion();
      quiz.checkAnswer(stubQuizData.questions[9].answer);
      quiz.nextQuestion();
      expect(quiz.correctAnswersCount.value).toEqual(6);
    });
  });
  describe('possibleAnswers', () => {
    it('returns array of possible answers to specified question', () => {
      expect(quiz.possibleAnswers.value).toEqual(stubQuizData.questions[0].options);
      callNextQuestionNTimes(5);
      expect(quiz.possibleAnswers.value).toEqual(stubQuizData.questions[5].options);
      callNextQuestionNTimes(5);
      expect(quiz.possibleAnswers.value).toEqual(stubQuizData.questions[9].options);
      callNextQuestionNTimes(2);
      expect(quiz.possibleAnswers.value).toEqual(stubQuizData.questions[9].options);
    });
  });
});
