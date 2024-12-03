import Container, { Service } from 'typedi';

import {
  AuthFailureError,
  BadRequestError,
  NotFoundError,
} from '../../core/ApiError';
import { Constants } from '../../core/Constant';
import { AppDataSource } from '../../data-source';
import { Cards } from '../../entity/Cards';
import { Sets } from '../../entity/Sets';
import { TestKits } from '../../entity/TestKit';
import { TestQuestion } from '../../entity/TestQuestion';
import { TestResultDetails } from '../../entity/TestResultDetails';
import { Tests } from '../../entity/Tests';
import { User } from '../../entity/User';
import { UserProgress } from '../../entity/UserProgress';
import { UserProgressService } from '../user-progress/UserProgressService';

function getRandomElements<T>(
  array: T[],
  numElements: number,
  exclude?: T,
): T[] {
  const filteredArray = exclude
    ? array.filter((item) => item !== exclude)
    : array;
  if (numElements >= filteredArray.length) {
    return filteredArray.slice(); // Return the full array if numElements is greater than or equal to array length
  }

  const result: T[] = [];
  const indices: Set<number> = new Set();

  // Generate a set of unique random indices
  while (indices.size < numElements) {
    const randomIndex = Math.floor(Math.random() * filteredArray.length);
    indices.add(randomIndex);
  }

  // Select elements from the original array based on the random indices
  for (const index of indices) {
    result.push(filteredArray[index]);
  }

  return result;
}

@Service()
export class TestService {
  private userRepo;
  private setRepo;
  private cardRepo;
  private testRepo;
  private testQuestionRepo;
  private testResultDetailRepo;
  private testKitsRepo;
  private userProgress;
  private userProgressService: UserProgressService;
  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
    this.setRepo = AppDataSource.getRepository(Sets);
    this.cardRepo = AppDataSource.getRepository(Cards);
    this.testRepo = AppDataSource.getRepository(Tests);
    this.testQuestionRepo = AppDataSource.getRepository(TestQuestion);
    this.testResultDetailRepo = AppDataSource.getRepository(TestResultDetails);
    this.testKitsRepo = AppDataSource.getRepository(TestKits);
    this.userProgress = AppDataSource.getRepository(UserProgress);
    this.userProgressService = Container.get(UserProgressService);
  }

  createTest = async (data: {
    setId: string;
    userId: string;
    level: number;
  }): Promise<any> => {
    const { setId, userId, level } = data;
    if (!userId || !setId) {
      throw new BadRequestError('User id or Set id is required');
    }
    const flashcardSet = await this.setRepo.findOne({
      where: { id: setId },
      relations: ['cards'],
    });
    if (!flashcardSet) throw new NotFoundError('Flashcard set not found');
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });
    if (!user) throw new AuthFailureError('Please login to do the test!');
    if (!level) {
      return this.createQuestionFromCardInSet(flashcardSet, user);
    } else {
      return this.createTestFromTestKit(flashcardSet, user, level);
    }
  };

  createQuestionFromCardInSet = async (
    flashcardSet: Sets,
    user: User,
  ): Promise<any> => {
    // let cardsToTest = getRandomElements(flashcardSet.cards, 10);
    let cardsToTest: Cards[] = [];
    // const [learnedCards, count] = await
    const [knowCards, knowCardsCount] = await this.userProgress.findAndCount({
      where: {
        user: {
          id: user.id,
        },
        set: {
          id: flashcardSet.id,
        },
        status: 'known',
      },
      relations: ['card'],
    });
    if (knowCardsCount > 0) {
      cardsToTest = getRandomElements(
        knowCards.map((knowCard) => knowCard.card),
        10,
      );
    }

    const test = new Tests();
    test.user = user;
    test.set = flashcardSet;
    test.questions = [];
    test.level = Constants.LEVEL.EASY;

    for (const flashcard of cardsToTest) {
      const question = new TestQuestion();
      question.test = test;

      // Get other cards excluding the current question card
      const randomCards = getRandomElements(
        flashcardSet.cards,
        3,
        flashcard as Cards,
      );

      if (flashcard.image) {
        question.questionType = 'image';
        question.questionText = flashcard['image'];
        question.correctAnswer = flashcard['term'];
        question.explain = flashcard['define'];
        question.options = [
          flashcard['term'],
          ...randomCards.map((card) => card['term']),
        ];
      } else {
        // Randomly decide the type of question: term or definition
        const questionTypeIndex = Math.floor(Math.random() * 2);

        if (questionTypeIndex === 0) {
          question.questionType = 'choice';
          question.questionText = `${flashcard['term']}?`;
          question.correctAnswer = flashcard['define'];
          question.options = [
            flashcard['define'],
            ...randomCards.map((card) => card['define']),
          ];
        } else {
          question.questionType = 'choice';
          question.questionText = `${flashcard['define']}`;
          question.correctAnswer = flashcard['term'];
          question.options = [
            flashcard['term'],
            ...randomCards.map((card) => card['term']),
          ];
        }
      }

      // Ensure unique options
      question.options = Array.from(new Set(question.options));

      // If there are not enough unique options, reduce the number of options
      if (question.options.length < 4) {
        const additionalCards = getRandomElements(
          flashcardSet.cards,
          4 - question.options.length,
          flashcard as Cards,
        );
        const additionalOptions =
          question.questionType === 'image' ||
          question.questionType === 'definition'
            ? additionalCards.map((card) => card['term'])
            : additionalCards.map((card) => card['define']);

        additionalOptions.forEach((option) => {
          if (!question.options.includes(option)) {
            question.options.push(option);
          }
        });

        question.options = Array.from(new Set(question.options));
      }

      // Shuffle options
      for (let i = question.options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [question.options[i], question.options[j]] = [
          question.options[j],
          question.options[i],
        ];
      }

      test.questions.push(question);
    }
    const testResultArray: TestResultDetails[] = [];
    for (const question of test.questions) {
      const result = new TestResultDetails();
      result.question = question;
      result.test = test;
      testResultArray.push(result);
    }
    await AppDataSource.transaction(async (manager) => {
      await manager.save(test);
      await manager.save(test.questions);
      await manager.save(testResultArray);
    });

    return {
      id: test.id,
      name: flashcardSet.name,
      questions: test.questions.map((question) => ({
        id: question.id,
        questionType: question.questionType,
        questionText: question.questionText,
        options:
          typeof question.options === 'string'
            ? JSON.parse(question.options)
            : question.options,
        correctAnswer: question.correctAnswer,
        explain: question.explain,
      })),
    };
  };

  createTestFromTestKit = async (
    set: Sets,
    user: User,
    level: number,
  ): Promise<any> => {
    const [testKits, count] = await this.testKitsRepo.findAndCount({
      where: {
        set: { id: set.id },
        level: level,
      },
      relations: ['questions'],
    });
    if (count === 0) {
      throw new NotFoundError('Test kit not found');
    }

    const totalQuestion = [];
    for (const kit of testKits) {
      const [questionsInKit, countKits] =
        await this.testQuestionRepo.findAndCount({
          where: {
            testKit: { id: kit.id },
          },
        });
      if (countKits === 0) continue;
      totalQuestion.push(...questionsInKit);
    }

    const randomQuestion = getRandomElements(totalQuestion, 10);
    const test = new Tests();
    test.set = set;
    test.level = level;
    test.user = user;
    test.questions = randomQuestion.map((question) => {
      const testQuestion = new TestQuestion();
      testQuestion.test = test;
      testQuestion.questionType = question.questionType;
      testQuestion.questionText = question.questionText;
      testQuestion.correctAnswer = question.correctAnswer;
      testQuestion.options =
        typeof question.options === 'string'
          ? JSON.parse(question.options)
          : question.options;
      testQuestion.explain = question.explain;
      return testQuestion;
    });
    const testResultArray: TestResultDetails[] = [];
    for (const question of test.questions) {
      const result = new TestResultDetails();
      result.question = question;
      result.test = test;
      testResultArray.push(result);
    }
    await AppDataSource.transaction(async (manager) => {
      await manager.save(test);
      await manager.save(test.questions);
      await manager.save(testResultArray);
    });

    return {
      id: test.id,
      name: set.name,
      questions: test.questions.map((question) => {
        return {
          id: question.id,
          questionType: question.questionType,
          questionText: question.questionText,
          options: question.options,
          correctAnswer: question.correctAnswer,
          explain: question.explain,
        };
      }),
    };
  };
}
