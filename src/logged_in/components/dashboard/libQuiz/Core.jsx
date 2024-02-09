import React, {
  useState, useEffect, useCallback, Fragment,
} from 'react';
import QuizResultFilter from './core-components/QuizResultFilter';
import { checkAnswer, selectAnswer, rawMarkup } from './core-components/helpers';
import InstantFeedback from './core-components/InstantFeedback';
import Explanation from './core-components/Explanation';
import { MathJax, MathJaxContext } from "better-react-mathjax";


function Core({
  questions, quizTitle,  appLocale, showDefaultResult, onComplete, customResultPage,
  showInstantFeedback, continueTillCorrect, revealAnswerOnSubmit, allowNavigation,
  onQuestionSubmit,
}) {
  const [incorrectAnswer, setIncorrectAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [buttons, setButtons] = useState({});
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [filteredValue, setFilteredValue] = useState('all');
  const [userAttempt, setUserAttempt] = useState(1);
  const [showDefaultResultState, setShowDefaultResult] = useState(true);
  const [answerSelectionTypeState, setAnswerSelectionType] = useState(undefined);

  const [totalPoints, setTotalPoints] = useState(0);
  const [correctPoints, setCorrectPoints] = useState(0);
  const [question, setQuestion] = useState(questions[currentQuestionIndex]);
  const [questionSummary, setQuestionSummary] = useState(undefined);

  useEffect(() => {
    setShowDefaultResult(showDefaultResult !== undefined ? showDefaultResult : true);
  }, [showDefaultResult]);

  console.log('questionsABCSDADF', quizTitle);
  useEffect(() => {
    setQuestion(questions[currentQuestionIndex]);
  }, [currentQuestionIndex]);


  useEffect(() => {
    const { answerSelectionType } = question;
    // Default single to avoid code breaking due to automatic version upgrade
    setAnswerSelectionType(answerSelectionType || 'single');
  }, [question, currentQuestionIndex]);




  /*
  General thigns to add:
  Boxplots
  Custom Scatterplots

  */






//ACT QUESTIONS
let NumbersAndOpperationsValues = [
  {   
      question: '(16 - 2·3) / ( 1 + 4· 6)',
      options: ['A) 6', 'B) 12', 'C) 15', 'D) 25* 1/5', 'E) 50* 2/5'],
      answer: 'A) 6'
  },
  {   
      question: 'Mark fills up the tank of his car so that it has a total of 22 gallons of gasoline. On the way to work, he uses up 2/3 gallon of gasoline. On the way home, he uses up 1 1/6 gallons of gasoline. How many gallons of gasoline are left in the tank at the end of the day?',
      options: ['A) 1 * 5/6', 'B) 20 * 1/6', 'C) 20 * 5/6', 'D) 21 * 1/6', 'E) 21 * 5/6'],
      answer: 'B) 20 * 1/6'
  },
  {   
      question: 'If watermelons sell at $4.29 each or 4 for $14.80, how much is saved, to the nearest cent, on each watermelon by buying them 4 ata time?',
      options: ['A) 36¢', 'B) 43¢', 'C) 50¢', 'D) 59¢', 'E) 68¢'],
      answer: 'D) 59¢'
  },
  {   
      question: '1/ (1 + 1/(1 + 3/7)) ?',
      options: ['A) 4/3', 'B) 2/4', 'C) 3/3', 'D) 4/4', 'E) 7'],
      answer: 'E) 7'
  },
  {   
      question: 'Joey made two trips to the mall on the same day. On the first trip, he gave the cashier $50 and got $12 back in change. On the second trip, he gave the cashier $30 and got back $8 back in change. After these trips, he had $45 left. How many dollars did he have before his trips to the mall?',
      options: ['A) 55', 'B) 67', 'C) 86', 'D) 105', 'E) 117'],
      answer: 'D) 105'
  },
  {   
      question: 'Professor Jones gives his students a 2 minute break between each section of a final exam. If the final exam has 7 sections, how many minutes do the students spend on break during the exam?',
      options: ['A) 6', 'B) 7', 'C) 9', 'D) 12', 'E) 14'],
      answer: 'D) 12'
  },
  {   
      question: 'A lightbulb manufacturer is delivering an order of 6,000 lightbulbs using large boxes and small boxes. A large-size box can fit a maximum of 800 lightbulbs. A small-size box can fit a maximum of 350 lightbulbs. If the manufacturer will use 3 large-size boxes, what is the minimum number of small-size boxes needed to deliver all the lightbulbs?',
      options: ['A) 10', 'B) 11', 'C) 12', 'D) 13', 'E) 14'],
      answer: 'B) 11'
  },
  {   
      question: 'Mark is deciding between two contracting jobs. Job A pays $45 per hour for the first 10 hours worked, and $60 per hour worked thereafter. Job B pays a flat $50 per hour. Mark\'s goal is to earn $1,350 from his next contracting job. Which job, if either, allows him to work fewer hours to meet his goal, and how many hours fewer?',
      options: ['A) Job A, 2', 'B) Job A, 12', 'C) Job B, 2', 'D) Job B, 12', 'E) Mark would work the same number of hours at either job.'],
      answer: 'A) Job A, 2'
  },
  {   
      question: 'Sierra completes the inventory assessment and tells May that the number of cupcakes is the same as the number of cookies. How many 6-item boxes of cookies are in inventory?',
      options: ['A) 25', 'B) 30', 'C) 35', 'D) 40', 'E) 50'],
      answer: 'E) 50'
  },
  {   
      question: 'May takes all of the cans of soda in 6-item boxes and puts them together to make as many 8-item boxes as she can. How many whole 8-item boxes of soda can May make?',
      options: ['A) 18', 'B) 19', 'C) 21', 'D) 24', 'E) 25'],
      answer: 'A) 18'
  },
  {   
      question: 'Sierra bought 5 of the candy bars for $93.60. What was the price of an 8-item box of candy?',
      options: ['A) $9.80', 'B) $10.40', 'C) $11.50', 'D) $12.20', 'E) $13.70'],
      answer: 'B) $10.40'
  }
];


let propertiesOfNumbersValues =[
  {   
      question: 'A positive integer is multiplied by 6, and the product is multiplied by 4. Which of the following numbers could be the result after the second multiplication?',
      options: ['A) 540', 'B) 552', 'C) 564', 'D) 588', 'E) 612'],
      answer: 'B) 552'
  },
  {   
      question: 'Which of the following accurately describes the decimal representation of 4.6 x 10 ^ 80 ?',
      options: ['A) a decimal point, followed by 79 zeros, then the digits 4 and 6.', 'B) a decimal point, followed by 80 zeros, then the digits 4 and 6.', 'C) a decimal point, followed by 81 zeros, then the digits 4 and 6.', 'D) a negative sign, followed by the digits 4 and 6, then 79 zeros, then a decimal point.', 'E) a negative sign, followed by the digits 4 and 6, then 80 zeros, then a decimal point.'],
      answer: 'A) a decimal point, followed by 79 zeros, then the digits 4 and 6.'
  },
  {   
      question: 'What is the least common denominator of the fractions 7/24 * 5/9 * 1/4',
      options: ['A) 48', 'B) 72', 'C) 96', 'D) 108', 'E) 144'],
      answer: 'B) 72'
  },
  {   
      question: 'A number z is produced by multiplying x, which is divisible by 10, and y, which is divisible by 15. All of the following whole numbers must be factors of z EXCEPT:',
      options: ['A) 2', 'B) 3', 'C) 6', 'D) 20', 'E) 30'],
      answer: 'D) 20'
  },
  {   
      question: 'Which of the following inequalities is true for the fractions 5/9, 4/7,and 6/11 .',
      options: ['A) 4/7 < 5/9 < 6/11', 'B) 4/7 < 6/11 < 5/9', 'C) 5/9 < 6/1 < 4/7', 'D) 6/11 < 4/7 < 5/9', 'E) 6/11 < 5/9 < 4/7'],
      answer: 'E) 6/11 < 5/9 < 4/7'
  },
  {   
      question: 'There are three alarm bells. The first alarm bell rings every 6 minutes, the second rings every 8 minutes, and the third rings every 10 minutes. At a certain instant, the 3 alarm bells ring at the same time. How many minutes elapse until the 3 alarm bells next ring at the same time?',
      options: ['A) 60', 'B) 90', 'C) 120', 'D) 160', 'E) 480'],
      answer: 'C) 120'
  },
  {   
      question: 'Which of the following inequalities orders 0.423, 0.423, 0.423 from smallest to largest? (Note: In this notation, the bar over a digit or block of digits indicates that the digit or block of digits repeats endlessly.)',
      options: ['A) 0.423 < 0.423 < 0.423', 'B) 0.423 < 0.423 < 0.423', 'C) 0.423 < 0.423 < 0.423', 'D) 0.423 < 0.423 < 0.423', 'E) 0.423 < 0.423 < 0.423'],
      answer: 'C) 0.423 < 0.423 < 0.423'
  },
  {   
      question: 'If t1 and b are numbers such that 6 <= a <= 18 and 3 <= b <= 6, then the maximum value of a/b is:',
      options: ['A) 2', 'B) 3', 'C) 4', 'D) 6', 'E) 9'],
      answer: 'D) 6'
  },
  {   
      question: 'There are 1,000,000 microseconds in a second. In scientific notation, 21 .6 microseconds is equivalent to how many seconds?',
      options: ['A) 2.16 X 10^-7', 'B) 2.16 X 10^- 6', 'C) 2.16 X 10^-5', 'D) 2.16 x 10^6', 'E) 2.16 x 10^7'],
      answer: 'C) 2.16 X 10^-5'
  },
  {   
      question: 'Given that x and (5 - x^2) / 2 are integers, which of the following statements about x must be true?',
      options: ['A) x is odd', 'B) x is even', 'C) x is divisible by 5', 'D) x is positive', 'E) x is negative'],
      answer: 'A) x is odd'
  },
  {   
      question: 'Let a < 0 < b < c < d be true for integers a, b, c, and d. Which of the following expressions has the greatest value?',
      options: ['A) b/a', 'B) c/b', 'C) c/d', 'D) d/a', 'E) d/c'],
      answer: 'E) d/c'
  },
  {   
      question: 'The least common multiple (LCM) of 2 numbers is 96. The greater of the 2 numbers is 32. What is the greatest possible value of the other number?',
      options: ['A) 3', 'B) 6', 'C) 16', 'D) 24', 'E) 28'],
      answer: 'D) 24'
  },
  {   
      question: 'A positive integer n is less than 500 and is a multiple of 10. When n is written as a decimal number, what is the minimum number of digits to the right of the decimal point?',
      options: ['A) 1', 'B) 2', 'C) 3', 'D) 4', 'E) 5'],
      answer: 'A) 1'
  },
  {   
      question: 'How many positive integers less than 600 are divisible by every number in the set {2,3,4,5}?',
      options: ['A) 9', 'B) 10', 'C) 11', 'D) 12', 'E) 13'],
      answer: 'A) 9'
  },
  {   
      question: 'Suppose that x is a real number and 1 x is a rational number. Which of the following could be the value of x? I.0, II.√5 , III. -1',
      options: ['A) None', 'B) I only', 'C) I and II only', 'D) II and III only', 'E) I, II, and III'],
      answer: 'B) I only'
  }
];

let LinesVlues = [
  {   
      question: 'What is the slope of the line that passes through ( 2,4) and (4,2) in the standard (x, y) coordinate plane?',
      options: ['A) -3', 'B) -1', 'C) 1/3', 'D) 1', 'E) 2'],
      answer: 'C) 1/3'
  },
  {   
      question: 'An elevator is lowered at a constant speed towards the ground. The table below shows the height, h, meters, of the elevator at 1-second intervals from t = 0 seconds to t = 4 seconds. Which of the following equations represents this data?',
      options: ['A) h = -8t + 120', 'B) h = -8t + 120', 'C) h = -8t + 128', 'D) h = 112t', 'E) h = 120t - 8'],
      answer: 'B) h = -8t + 120'
  },
  {   
      question: 'A line in the standard (x,y) coordinate plane is parallel to the y-axis and 4 units to the left of it. Which of the following is an equation of this line?',
      options: ['A) y = -4', 'B) x = -4', 'C) x = 4', 'D) y = 4x', 'E) y = x + 4'],
      answer: 'B) x = -4'
  },
  {   
      question: 'What is the slope-intercept equation of the line that passes through the points (2, 2) and (-1, - 4)?',
      options: ['A) y = -6x + 14', 'B) y = 2x - 2', 'C) y = 2x + 6', 'D) y = 2x + 2', 'E) y = 6x - 10'],
      answer: 'D) y = 2x + 2'
  },
  {   
      question: 'What is the slope of a line that is perpendicular to the line graphed below in the standard (x,y) coordinate plane?',
      options: ['A) 5/3', 'B) -1', 'C) -3/2', 'D) 1/2', 'E) 3/5'],
      answer: 'A) 5/3'
  },
  {   
      question: 'Which of the following is an equation of the line that passes through ( 4, 3) and (5, 6) in the standard (x,y) coordinate plane?',
      options: ['A) y = -3x + 13', 'B) y = -3x - 5', 'C) y = -1/2x + 2', 'D) y = 3x - 5', 'E) y = 3x + 3'],
      answer: 'A) y = -3x + 13'
  },
  {   
      question: "At her last gas station visit, Janelle pumped air into one of her car's tires. The relationship between the tire pressure, y pounds per square inch, and the time she spent pumping air into the tire, x seconds, was given by the equation 5y = 2x + 50. One of the following graphs in the standard (x, y) coordinate plane models the equation for positive values of Y and x. Which one?",
      options: ['A', 'B', 'C', 'D', 'E'],
      answer: 'A'
  },
  {   
      question: 'Line m in the standard (x, y) coordinate plane has equation 3x - 2y = 8. Line n is parallel to line m and has a y-intercept that is 4 more than the y-intercept of m. Line n has which of the following equations?',
      options: ['A) y = -3/2x + 2', 'B) y = 3/2x - 4', 'C) y = 3/2x', 'D) y = 2/3x - 4', 'E) y = 2/3x + 12'],
      answer: 'C) y = 3/2x'
  },
  {   
      question: "A meteorologist graphed the temperature y, in degrees Fahrenheit, over the course of x hours for two different towns. The temperature in Town A started at 50° F and increased by 2° F every hour. The temperature in Town B started at 70° F and decreased by 2° F every hour. Which of the following correctly describes the meteorologist's graph for all positive values of X in the standard (x,y) coordinate plane?",
      options: ['A) Two perpendicular lines', 'B) Two parallel lines', 'C) Two intersecting lines that are not perpendicular', 'D) Two lines with positive slope', 'E) Two lines with the same y-intercept'],
      answer: 'C) Two intersecting lines that are not perpendicular'
  },
  {   
      question: 'While doing a math assignment, Lia encountered a question that required her to graph the line y = 2x + 4 in the standard (x,y) coordinate plane. However, she mistakenly swapped the x and y coordinates of all her points. For example, she plotted (2,3) instead of (3, 2). What is the equation of the line that Lia mistakenly graphed for this question?',
      options: ['A) y = -1/2x + 4', 'B) y = 1/2x + 2', 'C) y = 1/2x + 4', 'D) y = 2x + 4', 'E) y = 4x + 2'],
      answer: 'B) y = 1/2x + 2'
  },
  {   
      question: 'In the standard (x,y) coordinate plane, the region bounded by the lines x = c, y = 0 and y = 4x has an area of 32 if c = ?',
      options: ['A) 4', 'B) 5', 'C) 6', 'D) 8', 'E) 16'],
      answer: 'A) 4'
  },
  {   
      question: 'The equations below are linear equations of a system where a and b are integers. y = ax +b y = a^2x+ b^2 If these equations are graphed in the standard (x,y) coordinate plane, which of the following graphs are possible? I.Two distinct Parallel Lines II.Two distinct perpendicular lines III.One line',
      options: ['A) I only', 'B) II only', 'C) III only', 'D) I and III only', 'E) I, II, and III'],
      answer: 'E) I, II, and III'
  },
  {   
      question: 'A parallelogram is shown in the standard (x,y) coordinate plane below. Line l crosses the y-axis and divides the parallelogram into 2 smaller parallelograms of equal area. Which of the following is an equation of line l?',
      options: ['A) y = 1/2x + 5', 'B) y = 2/3x + 5', 'C) y = 8/3x + 5', 'D) y = 3/5x + 2', 'E) y = 3/7x + 5'],
      answer: 'B) y = 2/3x + 5'
  }
]

let cordinateGeometryValues = [
  {   
      question: 'In the standard (x, y) coordinate plane, MN has endpoints (6, -8) and (-10, 20). What is the y-coordinate of the midpoint of MN?',
      options: ['A) -4', 'B) -2', 'C) 6', 'D) 12', 'E) 14'],
      answer: 'C) 6'
  },
  {   
      question: 'What is the distance, in coordinate units between (5, -2) and (7, 1) in the standard (x, y) coordinate plane?',
      options: ['A) √5', 'B) 5', 'C) √10', 'D) √17', 'E) 13'],
      answer: 'D) √17'
  },
  {   
      question: 'A regular hexagon is graphed in the standard (x,y) coordinate plane below. Which of the following are the coordinates of the vertex Q?',
      options: ['A) (-a, -c)', 'B) (-a,2b)', 'C) (-a,2c)', 'D) (-b, - a)', 'E) (-b,2c)'],
      answer: 'C) (-a,2c)'
  },
  {   
      question: 'In the standard (x,y) coordinate plane, a diameter of a circle has endpoints (3, 1) and (11, -7). The center of the circle is at which of the following points?',
      options: ['A) (-4,4)', 'B) (4,8)', 'C) (7, - 3)', 'D) (8, - 8)', 'E) (14,-6)'],
      answer: 'C) (7, - 3)'
  },
  {   
      question: 'A triangle and a circle are graphed in the same standard (x, y) coordinate plane. The triangle has vertices at (0, 2), (-2, -3), and (2, -3). The circle has radius 2 and center at (0,0). The triangle and the circle intersect at how many points?',
      options: ['A) 2', 'B) 3', 'C) 4', 'D) 5', 'E) 6'],
      answer: 'B) 3'
  },
  {   
      question: 'In the standard (x, y) coordinate plane, the endpoints of AB are (-a,a) and (b,2b), where a and b are distinct positive real numbers. Line segment A\'B\' is the image of AB after a reflection across the y-axis. What are the coordinates of the endpoints of A\'B\'?',
      options: ['A) (-a, - a) and (b, - 2b)', 'B) (-a,0) and (b,0)', 'C) (-a,a) and (b,2b)', 'D) (a,-a) and (- b, 2b)', 'E) (a,a) and (-b,2b)'],
      answer: 'E) (a,a) and (-b,2b)'
  },
  {   
      question: 'Judy redesigned a company webpage on a square coordinate grid marked in centimeter units. The company logo was originally located at (4, -5), 4 centimeters to the right and 5 centimeters down from the center of the webpage. Judy moved the logo 6 centimeters to the left and 3 centimeters up. Which of the following is closest to the straight-line distance, in centimeters, between the new location of the logo and the center of the webpage in Judy\'s redesign?',
      options: ['A) 3', 'B) 4', 'C) 7', 'D) 8', 'E) 10'],
      answer: 'A) 3'
  },
  {
      question: 'In the standard (x, y) coordinate plane, the midpoint of BC is (-4,3). If B has the coordinates (2,-1), what are the coordinates of C?',
      options: ['A) (-10,7)', 'B) (-8,5)', 'C) (-6,4)', 'D) (-2,1)', 'E) (2,1)'],
      answer: 'A) (-10,7)'
  },
  {
    question: 'A square with a side length of 4 coordinate units is graphed in the standard (x,y) coordinate plane.If the square has a vertex at ( 3 ,- 2 ) ,all of the following points could be another vertex of the square EXCEPT:',
    options: ['A) ( -1 , -2 )', 'B) ( -1 , 2 )', 'C) ( 3 ,- 6 )', 'D) ( 3 ,  6 )', 'E) ( 7 , -2 )'],
    answer: 'D) ( 3 ,  6 )'
  },
  {
    question: 'What is the distance, in coordinate units from point (k + 1, k ) to point (k, -k) in the standard (x, y) coordinate plane?',
    options: ['A) 1', 'B) 4k^2+1', 'C) √(2k+1)', 'D) √(4k^2+1)', 'E) √4k^2+4k+1'],
    answer: 'D) √(4k^2+1)'
  }
]

let probabilityValues = [
  {
      question: 'There are 18 jelly beans in a jar: 13 are green, and 5 are purple. What is the probability that a jelly bean chosen at random from the jar is red or purple?',
      options: ['A) 1/3', 'B) 2/3', 'C) 5/6', 'D) 11/18', 'E) 13/18'],
      answer: 'D) 11/18'
  },
 
  {
      question: 'If a number is chosen at random from the set {2,4,6, .. . ,20}, what is the probability that the chosen number is divisible by 3?',
      options: ['A) 1/3', 'B) 1/5', 'C) 1/6', 'D) 3/5', 'E) 3/10'],
      answer: 'E) 3/10'
  },
  {
      question: 'Alec has 2 stacks of cards. The first stack contains 5 red cards and 5 black cards. The second stack contains 3 red cards, 4 black cards, and 5 blue cards. Alec draws one card at random from each stack. What is the probability that both cards drawn are black?',
      options: ['A) 1/8', 'B) 1/6', 'C) 1/4', 'D) 1/3', 'E) 5/6'],
      answer: 'B) 1/6'
  },
  {
      question: 'Debbie chooses her outfit for the day from 6 shirts , 3 pairs of jeans, 2 jackets, and 3 pairs of sneakers. How many different outfits are possible if she chooses exactly 1 shirt, 1 pair of jeans, 1 jacket, and 1 pair of sneakers?',
      options: ['A) 4', 'B) 5', 'C) 14', 'D) 54', 'E) 108'],
      answer: 'E) 108'
  },
  {
      question: 'An exam contains 4 questions. Each question has 5 answer choices. Which of the following expressions gives the total number of possible answer combinations for this exam?',
      options: ['A) 4^5', 'B) 5^4', 'C) 4(3)(2)', 'D) 5(4)', 'E) 5(4)(3)(2)'],
      answer: 'B) 5^4'
  },
  {
      question: 'A pastry shop gives each customer a ticket with a 3-digit order number. Each digit must be between 1 and 7, inclusive, and cannot be repeated in the same order number. How many different order numbers are possible?',
      options: ['A) 60', 'B) 120', 'C) 210', 'D) 216', 'E) 343'],
      answer: 'C) 210'
  },
  {
      question: 'A box contains b blue marbles and w white marbles. If the probability of randomly drawing a white marble from the box is 3/7, what is the value of w/b?',
      options: ['A) 1/4', 'B) 1/2', 'C) 2/3', 'D) 3/4', 'E) 4/3'],
      answer: 'D) 3/4'
  },
  {
      question: 'A jar is filled with gumballs, 42 are red, 33 are blue, and the rest are orange. The probability of randomly selecting an orange gumball from the jar is 1/6. How many orange gumballs does the jar contain?',
      options: ['A) 10', 'B) 15', 'C) 20', 'D) 30', 'E) 35'],
      answer: 'B) 15'
  },
  {
      question: 'A bag contains 36 cookies: 16 chocolate chip, 8 oatmeal, and 12 peanut butter. How many additional oatmeal cookies must be added to the bag so that the probability of randomly selecting an oatmeal cookie is 1/3?',
      options: ['A) 4', 'B) 5', 'C) 6', 'D) 9', 'E) 12'],
      answer: 'C) 6'
  },
  {
      question: 'Syed is playing a game that involves rolling a standard six-sided dice 6 times. If he rolls each number exactly once, he will win a prize. He has already rolled a "2" and a "5". What is the probability that he will win a prize?',
      options: ['A) 1/24', 'B) 1/54', 'C) 1/120', 'D) 1/720', 'E) 3/32'],
      answer: 'E) 3/32'
  }
]


var passagesAndQuestionsModifications = [
  //...previous passages
  {
    "passage": "In 1876, 73-year-old Maria Spelterini became the only woman to cross the Niagara (Jorge Dalma) “Daring Maria” on a tightrope, just north of the lower suspension bridge, over a period of eighteen days. On July 12, she made her first attempt while wearing peach baskets strapped to her feet; on July 19, the second crossing occurred while she was blindfolded; one day later, she crossed with her ankles and wrists bound; and on July 26, she crossed for the fourth and last time. Never again performing at Niagara, the story of her life remains a mystery.",

    "questions": [
      {
        "question": "How should the event be described?",
        "choices": ["A) NO CHANGE", "B) on a tightrope, accomplishing that feat over a period of eighteen days", "C) over a period of eighteen days, she did this on a tightrope", "D) on a tightrope, and, furthermore, doing this over a period of eighteen days"],
        "answer":"B) on a tightrope, accomplishing that feat over a period of eighteen days"
      },
      {
        "question": "Where did her crossings take place?",
        "choices": ["A) NO CHANGE", "B) just north of the lower suspension bridge is where her crossings took place", "C) her crossings took place just north of the lower suspension bridge", "D) and crossing just north of the lower suspension bridge"],
        "answer":"A) NO CHANGE"
      },
      {
        "question": "How was the second crossing performed?",
        "choices": ["A) NO CHANGE", "B) being blindfolded", "C) while Spelterini was blindfolded", "D) a blindfold was worn"],
        "answer":"C) while Spelterini was blindfolded"
      },
      {
        "question": "What is the status of her performance at Niagara and the knowledge about her life?",
        "choices": ["A) NO CHANGE", "B) She never performed at Niagara again, her life story remains a mystery", "C) Having never again performed at Niagara, the story of her life, therefore, is a mystery", "D) She never again performed at Niagara, and the story of her life remains a mystery"],
        "answer":"D) She never again performed at Niagara, and the story of her life remains a mystery"
      }
    ],
   
  },
  {
    "passage": "When President James Polk officially confirmed the discovery by James Marshall of gold at Sutter's Mill in Coloma, California, in 1848, hopeful prospectors immediately began planning for the trip out west. Beginning their journey in spring of 1849, the prospectors, known as 'forty-niners', took an overland route that was risky and mostly unknown.",
    "questions": [
      {
        "question": "How should the discovery be described?",
        "choices": ["A) NO CHANGE", "B) discovering gold at Sutter's Mill by James Marshall", "C) that James Marshall had discovered gold at Sutter's Mill", "D) James Marshall's discovery of gold at Sutter's Mill"],
        "answer":"C) that James Marshall had discovered gold at Sutter's Mill"
      },
      {
        "question": "How is the journey of the prospectors described?",
        "choices": ["A) NO CHANGE", "B) these prospectors (known as 'forty-niners') took an overland route", "C) an overland route was taken by these 'forty-niners'", "D) these prospectors, who were known as 'forty-niners', took an overland route"],
        "answer":"B) these prospectors (known as 'forty-niners') took an overland route"
      }
    ]
  },
  {
    "passage": "Bioluminescence is light produced by a living organism that is created by a chemical reaction. Most bioluminescent organisms are found in the ocean, although a few - including fireflies and certain fungi - live on land. Dwelling almost exclusively in saltwater habitats, some form of bioluminescence is produced by approximately 90% of deep-sea creatures, including fish, bacteria, and jellies.",
    "questions": [
      {
        "question": "How is the production of light by bioluminescent organisms described?",
        "choices": ["A) NO CHANGE", "B) created by a chemical reaction and produced within a living organism", "C) produced within a living organism, it is created by a chemical reaction", "D) produced within a living organism, which is created by a chemical reaction"],
        "answer":"B) created by a chemical reaction and produced within a living organism"
      },
      {
        "question": "Where do most bioluminescent organisms dwell?",
        "choices": ["A) NO CHANGE", "B) They dwell almost exclusively within saltwater habitats", "C) Saltwater habitats being dwelled in almost exclusively by them", "D) Bioluminescent organisms dwell almost exclusively in saltwater habitats"],
        "answer":"D) Bioluminescent organisms dwell almost exclusively in saltwater habitats"
      }
    ]
  }
  //...other passages
]

//SAT QUESTIONS

  var ExponentsAndRadicalsMathValues =  [
    {
        question: 'If a^(-1/2) = 3, what is the value of a?',
        options: ['A) -9', 'B) 1/9', 'C) 1/3', 'D) 9'],
        answer: 'B) 1/9'
    },
    {
        question: 'If 2^x / 2^y = 2^3, then x must be equal to:',
        options: ['A) y+3', 'B) y-3', 'C) 3-y', 'D) 3y'],
        answer: 'A) y+3'
    },
    {
        question: 'If y^5 = 10, what is the value of y^20?',
        options: ['A) 40', 'B) 400', 'C) 1000', 'D) 10000'],
        answer: 'D) 10000'
    },
    {
        question: 'The expression (x^2*y^3)^(1/4), where x > 0 and y >0, is equivalent to which of the following:',
        options: ['A) (xy)^(1/2)', 'B) y*(x)^(1/2)', 'C) 1/x^2', 'D) x^2*y'],
        answer: 'B) y*(x)^(1/2)'
    },
    {
        question: 'If (x^3)^(1/2) / x^(1/4) = x^c, for all positive values of c ,what is the value of c?',
        options: ['Free response'],
        answer: '5/4'
    },
    {
        question: 'If 3^x = 10, what is the value of 3^(x-3)?',
        options: ['A) 10/3', 'B) 10/9', 'C) 10/27', 'D) 27/10'],
        answer: 'C) 10/27'
    },
    {
        question: 'If a and b are positive even integers, which of the following is greatest?',
        options: ['A) (-2a)^b', 'B) (-2a)^2b', 'C) (-a)^b', 'D) (2a)^2b'],
        answer: 'B) (-2a)^2b'
    },
    {
        question: 'Of x^2 = y^3, for what value of z does x^3z = y^9',
        options: ['A) -1', 'B) 0', 'C) 1', 'D) 2'],
        answer: 'D) 2'
    },
    {
        question: 'If (x*(x)^(1/2))^(1/2) = x^a, for all positive values of a, what is the value of a?',
        options: ['A) 1/2', 'B) 3/4', 'C) 1', 'D) 4/3'],
        answer: 'B) 3/4'
    },
    {
        question: 'If x^ac * x^bc = x^30, x > 1, and a + b = 5, what is the value of c?',
        options: ['A) 3', 'B) 5', 'C) 6', 'D) 10'],
        answer: 'C) 6'
    },
    {
        question: 'If 4^(2n+3) = 8^(n+5), what is the value of n?',
        options: ['A) 6', 'B) 7', 'C) 8', 'D) 9'],
        answer: 'D) 9'
    },
    {
        question: 'Which of the following is equivalent to (-2)^(5/3)?',
        options: ['A) -2* (4)^(1/3)', 'B) 2* (4)^(1/3)', 'C) -4* (2)^(1/3)', 'D) 4* (2)^(1/3)'],
        answer: 'A) -2* (4)^(1/3)'
    },
    {
        question: 'If 2^(x+3) - 2^x = k(2^x), where k is a constant, what is the value of k?',
        options: ['A) 3', 'B) 5', 'C) 7', 'D) 8'],
        answer: 'C) 7'
    },
    {
        question: 'If (5^3)^(4k) = (5^1/3)^24, what is the value of k?',
        options: ['A) -6', 'B) 2/3', 'C) 3/4', 'D) 2'],
        answer: 'B) 2/3'
    },
    {
        question: 'Which of the following is equivalent to x^(2a/b) for all positive values of x, where a and b are positive integers?',
        options: ['A) (ax^2)^(b)', 'B) (x^2a)^(b)', 'C) (x^(a+2))^(b)', 'D) (x^b)^(2a)'],
        answer: 'B) (x^2a)^(b)'
    },
    {
        question: 'If x^2*y^3 = 10 and x^3*y^2 = 8, what is the value of x^5*y^5?',
        options: ['A) 18', 'B) 20', 'C) 40', 'D) 80'],
        answer: 'D) 80'
    }
]

  var PercentMathAnswers =  [
    {   
        question: 'Reid wants to purchase a rug that has a price of $150.00. He has a coupon that would reduce the cost of the rug by K%. If the coupon would reduce the cost of the rug by $12.75, what is the value of k ?',
        options: ['Free Response'],
        answer: '8.5%'
    },
    {   
        question: 'In March, a city zoo attracted 32,000 visitors to its polar bear exhibit. In April, the number of visitors to the exhibit increased by 15%. How many visitors did the zoo attract to its polar bear exhibit in April?',
        options: ['A) 32,150','B) 32,480','C) 35,200','D) 36,800'],
        answer: 'D) 36,800'

    },
    {   
        question: 'Miguel is following a recipe for marinara sauce that requires half a tablespoon of vinegar. If one cup is equivalent to 16 tablespoons, approximately what percent of a cup of vinegar is the amount required by the recipe?',
        options: ['A) 2.3%','B) 3.1%','C) 9.4%','D) 12.5%'],
        answer: 'B) 3.1%'
    },
    {   
        question: 'If x is 50% larger than z , and y is 20% larger than z , then x is what percent larger than y ?',
        options: ['A) 15%','B) 20%','C) 25%','D) 30%'],
        answer: 'C) 25%'
    },
    {   
        question: 'Veronica has a bank account that earns m% interest compounded annually. It she opened the account with $200, theexpression $200(x)^t represents the amount in the account after t years. Which of the following gives x in terms of m ?',
        options: ['A) 1+.01m','B) 1+m','C) 1-m','D) 1+100m'],
        answer: 'A) 1+.01m'
    },
    {   
        question: 'A charity organization collected 2,140 donations last month. With the help of 50 additional volunteers, the organization collected 2,690 donations this month. To the nearest tenth of a percent, what was the percent increase in the number of donations the charity organization collected?',
        options: ['A) 20.4%','B) 20.7%','C) 25.4%','D) 25.7%'],
        answer: 'D) 25.7%'
    },
    {   
        question: 'The discount price of a book is 20% less than the retail price. James manages to purchase the book at 30% off the discount price at a special book sale. What percent of the retail price did James pay?',
        options: ['A) 42%','B) 48%','C) 50%','D) 56%'],
        answer: 'D) 56%'
    },
    {   
        question: 'Each day, Robert eats 40% of the pistachios left in his jar at that time. At the end of the second day, 27 pistachios remain. How many pistachios were in the jar at the start of the first day?',
        options: ['A) 75','B) 80','C) 85','D) 95'],
        answer: 'A) 75'
    },
    {   
        question: 'Joanne bought a doll at a 10 percent discount off the original price of $105.82. However, she had to pay a sales tax of %× on the discounted price. If the total amount she paid for the doll was $100, what is the value of x ?',
        options: ['A) 2','B) 3','C) 4','D) 5'],
        answer: 'D) 5'
    },
    {   
        question: 'The number of dishes served by a restaurant during dinner was 17.5% greater than the number of dishes served during lunch. If the restaurant served 940 dishes during dinner, how many more dishes did the restaurant serve during dinner than during lunch?',
        options: ['Free Response'],
        answer: '140'
    },
    {   
        question: 'In 2010, the number of houses built in Town A was 25 percent greater than the number of houses built in Town B. If 70 houses were built in Town A during 2010, how many were built in Town B?',
        options: ['Free Response'],
        answer: '56'
    },
    {   
        question: 'Over a two week span, John ate 20 pounds of chicken wings and 51 pounds of hot dogs. Kyle ate 20 percent more chicken wings and 40 percent more hot dogs. Considering only chicken wings and hot dogs, Kyle ate approximately x percent more food, by weight, than John. What is x (rounded to the nearest percent)?',
        options: ['A) 25','B) 27','C) 29','D) 30'],
        answer: 'C) 29'
    },
    {   
        question: 'Jane is playing a board game in which she must collect as many cards as possible. On her first turn, she loses 18 percent of her cards. On the second turn, she increases her card count by 36 percent . If her final card count after these two turns is 1, which of the following represents her starting card count in terms of n?',
        options: ['A) n/(1.18*0.64)','B) 1.18*0.64*n','C) n/(1.36*0.82)','D) 0.82*1.36*n'],
        answer: 'C) n/(1.36*0.82)'
    },
    {   
        question: 'Due to deforestation, researchers expect the deer population to decline by 6 percent every year. If the current deer population is 12,000, what is the approximate expected population size 10 years from now?',
        options: ['A) 4800','B) 6460','C) 7240','D) 7980'],
        answer: 'B) 6460'
    },
    {   
        question: 'A small clothing store sells 3 different types of accessories: 20% are scarves, 60% are ties, and the other 40 accessories are belts. If half of the ties are replaced with scarves, how many scarves will the store have?',
        options: ['Free Response'],
        answer: '100'
    },
    {
      question: 'Omar currently holds a government bond that has a market value of $900. Each year, the market value of the bond is expected to be 20% higher than its market value the year before. If the expression 900 ( 1 + p) where p is a constant , represents the expected market value of the bond after 3 years, what is the value of p?',
      answers: ['Free Response'],
      answer: '0.728'
    },
    {
      question: 'Sims spent x dollars on groceries in 2015. She spent 34% more on groceries in 2016 than in 2015,and she spent 145% more on groceries in 2017 than in 2016. Which of the following expressions represents the amount, in dollars, Sims spent on groceries in 2017?',
      answers: [
        'A) (2.45)(0.34x)',
        'B) (1.45)(0.34x)',
        'C) (2.45)(1.34x)',
        'D) (1.45)(1.34x)'
      ],
      answer: 'C) (2.45)(1.34x)'
    },
    {
      question: 'In 2016, County A and County B collected the same amount of taxes. In 2017, the amount of taxes collected by County A decreased by 25% and the amount of taxes collected by County B increased by 20%. If County A collected 60 million dollars of taxes in 2017, what was the amount of taxes, in millions of dollars, County B collected in 2017?',
      answers: ['A) 54','B) 78','C) 90','D) 96'],
      answer: 'D) 96'
    },
    {
      question: 'Daniel has $1000 in a checking account and $3000 in a savings account. The checking account earns him 1 percent interest compounded annually. The savings account earns him 6 percent interest compounded annually. Assuming he leaves both these accounts alone, which of the following represents how much more interest Daniel will have earned from the savings account than from the checking account after 5 years?',
      answers: [
        'A) 3000(1.06)^5-1000(1.01)^5',
        'B) 3000(1.06)*5-1000(1.01)*5',
        'C) (3000(1.06)^5- 3000) - (1000(1.01)^5 - 1000)',
        'D) (3000(1.06)*5- 3000) - (1000(1.01)*5 - 1000)'
      ],
      answer: 'C) (3000(1.06)^5- 3000) - (1000(1.01)^5 - 1000)'
    },
    {
      question: 'P(1+(r/100))^5 gives the population of leopards after five years during which an initial population of P leopards grew by r percent each year. Which of the following expressions gives the percent increase in the leopard population over these five years?',
      answers: [
        'A) (1+(r/100))^5',
        'B) (1+(r/100))^5-1 / (1+(r/100))^5 * 100',
        'C) ((1+(r/100))^5 - 1) * 100',
        'D) (1+(r/100))^5 * 100'
      ],
      answer: 'C) ((1+(r/100))^5 - 1) * 100'
    }
  ];

    var ExponentialGrowthValues= [
      {
        "question": "The value of a house decreased by 8% from the previous vear for n consecutive years. Which of the following graphs could model the value of the house over this time period?",
        "answers": [
          "Images"
        ],
        answer:' A'
      },
      {
        "question": "The employees at a new bookstore muststock a certain number of shelves so that the store is ready for its opening in two weeks. The employees stock shelves at a constant rate throughout the two weeks. If p(t) is the number of shelves left to be stocked after t days, which of the following statements best describes the function p?",
        "answers": [
          "A) p(t) is a increasing exponential function.",
          "B) p(t) is a decreasing exponential function.",
          "C) p(t) is a increasing linear function.",
          "D) p(t) is a decreasing linear function."
        ],
        answer: 'D) p(t) is a decreasing linear function.'
      },
      {
        "question": "If the initial populationof rats was 20 and grew to 25 after the first year, which of the following functions best models the population of rats P with respect to the number of years t if the population growth of rats is considered to be exponental",
        "answers": [
          "A) P(t) = 5t+20",
          "B) P(t) = 20(1.25)^(t)",
          "C) P(t) = 20(5)^(t)",
          "D) P(t) = 5(t)^(2)+20"
        ],
        answer: 'B) P(t) = 20(1.25)^(t)'
      },
      {
        "question": "If the initial population of pandas was 100 and grew to 125 after the first year, which of the following functions best models the population of pandas P with respect to the number of years t if the population growth of pandas is considered to be linear?",
        "answers": [
          "A) P(t) = 25t+100",
          "B) P(t) = 100(1.25)^(t)",
          "C) P(t) = 100(1.2)^(t)",
          "D) P(t) = 20t^2 + 5t + 100"
        ],
        answer: 'A) P(t) = 25t+100'
      },
      {
        "question": "The function f(t) = 20(1+15/100)^t above models the temperature, in degrees Celsius, of a metal alloy used in an experiment, where t is the number of seconds after the experiment began. Which of the following is the best interpretation of the number 15 in this context?",
        "answers": [
          "A) The temperature, in degrees Celsius, of the metal alloy at the beginning of the experiment.",
          "B) The increase in the temerature, in degrees Celsius, of the metal alloy every 100 seconds during the experiment",
          "C) The percent by which the temperature, in degrees Celsius, of the metal alloy decreased fromeach second to the next during the experiment .",
          "D) The percent by which the temperature, in degrees Celsius, of the metal alloy increased from each second to the next during the experiment."
        ],
        answer: 'D) The percent by which the temperature, in degrees Celsius, of the metal alloy increased from each second to the next during the experiment.'
      },
      {
        "question": "C(t) = 80 * 2^(t/5) To examine how a certain virus spreads, scientists introduced the virus to cells in a test tube and found that the number of infected cells in the test tubegrew exponentially over time. The function C above models the number of infected cells in the test tube days after the virus was introduced. Based on the function, which of the following statements is true?",
        "answers": [
          "A)  The predicted number of infected cells in the test tube doubled every 5 days .",
          "B) The number of infected cells in the test tube increased by 20% every hour.",
          "C) The number of infected cells in the test tube increased by 25% every day.",
          "D) The number of infected cells in the test tube increased by 25% every hour."
        ],
        answer: 'A)  The predicted number of infected cells in the test tube doubled every 5 days .'
      },
      {
        "question": "N= 1,000(0.97)^4A scientist uses the equation above to model the number of bacteria N in a petri dish after h hours. According to the model, the number of bacteria is predicted to decrease by 3% every k",
        "answers": [
          "A) The temperature, in degrees Celsius, of the metal alloy at the beginning of the experiment",
          "B) The increase in the temperature, in degrees Celsius, of the metal alloy every 100 seconds during the experiment",
          "C) The percent by which the temperature, in degrees Celsius, of the metal alloy decreased from each second to the next during the experiment",
          "D) The percent by which the temperature, in degrees Celsius, of the metal alloy increased from each second to the next during the experiment"
        ],
        answer: 'C) The percent by which the temperature, in degrees Celsius, of the metal alloy decreased from each second to the next during the experiment'
      },
      {
        "question": "The equation above can be used to model the number of cars, in millions, registered in a certain state t years after 2009. According to the model, the number of cars registered in the state is projected toincrease by %1 every 6months. What is the value of n?",
        "answers": [
          "A) 0.002",
          "B) 0.04",
          "C) 0.2",
          "D) 2"
        ],
        answer: 'C) 0.2'
      },
      {
        "question": "The population of trees in a forest has been decreasing by 6 percent every 4 years. The population at the beginning of 2015 was estimated to be 14,000. If P represents the population of trees t years after 2015, which of the following equations gives the population of trees over time?",
        "answers": [
          "A) P(t) = 14,000(0.06)^(t/4)",
          "B) P(t) = 14,000+ (0.94)(4t)",
          "C) P(t) = 14,000(0.94)^(4t)",
          "D) P(t) = 14,000(0.94)^(t/4)"
        ],
        answer: 'D) P(t) = 14,000(0.94)^(t/4)'
      },
      {
        "question": "Which of the following scatterplots best represents the strongest positive association between x and y?",
        "answers": [
          "A) Up and to the left",
          "B) Down and to the right",
          "C) Up and to the right",
          "D) Down and to the left"
        ],
        answer: 'C) Up and to the right'
      },
      {
        "question": "Tamie owes Tina some money and decides to pay her back in the following way. Tina receives 3 dollars the first day, 6 dollars the second day, 18 dollarsthe third day, and 54 dollars the fourth day. Which of the following best describes the relationship between time and the totalamount of money (cumulative) Tina has received trom Jamie overthe course of these four days?",
        "answers": [
          "A) The total amount of money Tina has received from Jamie is increasing linearly.",
          "B) The total amount of money Tina has received from Jamie is decreasing linearly.",
          "C) The total amount of money Tina has received from Jamie is increasing exponentially.",
          "D) The total amount of money Tina has received from Jamie is decreasing exponentially."
        ],
        answer: 'C) The total amount of money Tina has received from Jamie is increasing exponentially.'
      },
      {
        "question": "A scientist counts 80 cells in a petri dish and finds that each one splits into two new cells every hour. He uses the function A(t) = c*r^t to calculate the total number of cellsin the petri dish after t hours. Which of the following assigns the correct values to c and r?",
        "options": [
            "A) c = 80 and r = 2",
            "B) c = 80 and r = 1/2",
            "C) c = 80 and r = 1.5",
            "D) c = 80 and r = 2"
        ],
        "answer": "D) c = 80 and r = 2"
    },
    {
        "question": "Of the following scenarios, which one would result in linear growth of the square footage of a store?",
        "options": [
            "A) The store's square footage increases by 0.75% every year.",
            "B) The store's square footage increases by 5% every year.",
            "C) The store's square footage increases by 5% of the original square footage every year.",
            "D) The owner alternates between adding 200 square feet one year and 300 square feet the next year"
        ],
        "answer": "C) The store's square footage increases by 5% of the original square footage every year."
    },
    {
        "question": "During its first year of operation, an equipment supplier carried 6,400 items in itsproduct line. For each of the next 6 years, the supplier carried in its product line half the number of items it had carried the previous year. What type of model is best to model the number of items the supplier carried in its product line for anygiven year in its first 7 years of operation?",
        "options": [
            "A) An exponential growth model",
            "B) An exponential decay model",
            "C) A linear growth model",
            "D) A linear decay model"
        ],
        "answer": "B) An exponential decay model"
    },
    {
        "question": "V= 200(2^t) V= 1,500t An analyst is evaluating how accuratethe two models above are in predicting the total number of views, V, an online video receives t days after its released.How many reviews are predicted by the linear model than by the exponential model 4days after the video is released?",
        "options": [
            "A) 1400",
            "B) 2800",
            "C) 3200",
            "D) 4000"
        ],
        "answer": "B) 2800"
    },
    {
        "question": "The table below shows the price P, in dollars, of abarrel of crude oil days after the beginning of an oil shortage. If the equation P= m(2)^(t/n) is used to model the relationship between r and P, which of the following could be the values of m and n?",
        "options": [
            "A) m = 25 and n = 54.38",
            "B) m = 25 and n = 86.12",
            "C) m = 50 and n = 54.38",
            "D) m = 50 and n = 86.12"
        ],
        "answer": "C) m = 50 and n = 54.38"

    },
    {
        "question": "The amount of data, in gigabytes, stored in a database increases by 2% every 15 hours. If 16 gigabytes worth of data is currently stored in the database, which of the following functions g gives the amount of data, in gigabytes, that will be stored in the database t days from now?",
        "options": [
            "A) g(t) = 16(2)^15t",
            "B) g(t) = 16(1.02)^t/15",
            "C) g(t) = 16(1.02)^5t/8",
            "D) g(t) = 16(1.02)^8t/5"
        ],
        "answer": "D) g(t) = 16(1.02)^8t/5"
    }
]

    var RatesValues = [
      {   
          question: 'Tim\'s diet plan calls for 60grams of proteinper day. It Tim were to meet this requirement by only eatinga certain protein bar that contains 30 grams of protein, how many protein bars would he have to buy to last a week?',
          options: ['Free response'],
          answer: '14'
      },
      {   
          question: 'An electronics company sells computer monitors and releases a new model every year. With each new model, the company increases the screen size by aconstant amount. In 2005, the screen size was 15.5 inches. In 2011, the screen size was 18.5 inches. Which of the following best describes how the screen size changed between 2005 and 2011.',
          options: ['A) The company increases the screen size by 0.5 inch every year.','B) The company increases the screen size by 1 inch every year.','C) The company increases the screen size by 2 inch every year.','D) The company increases the screen size by 3 inch every year.'],
          answer: 'A) The company increases the screen size by 0.5 inch every year.'
      },
      {   
          question: 'As asubmarine descends into the deep ocean, the pressure it must withstand increases. At an altitude of -70 meters, the pressure is 50 atm (atmospheres), and at an altitude of -900 meters, the pressure is 70 atm. For every 10 meters the submarine descends, the pressure it faces increases by n, where n is a constant. What is the value of n?',
          options: ['A) .1','B) 1','C) 2','D) 10'],
          answer: 'B) .1'
      },
      {   
          question: 'An empty pool can be filled in 5 hours if water is pumped in at 300 gallons an hour. How many hours would it take to fill the pool if water is pumped in at 50 gallons an hour?',
          options: ['Free response'],
          answer: '3'
      },
      {   
          question: 'If a apples cost d dollars, which of the following expressions gives the cost of 20 apples, in dollars?',
          options: ['A) 20a/d','B) 20d/a','C) a/20d','D) 20/a*d'],
          answer: 'B) 20d/a'
      },
      {   
          question: 'During a race on a circular racetrack, a racecar burns fuel at aconstant rate. After lap 4 the racecar has 2 gallons left in its tank. After lap 7, the racecar has 18 gallons left in its tank. Assuming the racecar does not retuel, after which lap will the racecar have 6 gallons left in its tank?',
          options: ['A) Lap 13','B) Lap 15','C) Lap 16','D) Lap 19'],
          answer: 'C) Lap 16'
      },
      {   
          question: 'By 1:00 PM, a total of 40 boxes had been unloaded from a delivery truck. By 3:30 PM, a total of 65 boxes had been unloaded from the same truck. If boxes are unloaded from the truck at aconstant rate, what is the total number of boxes that will have been unloaded from the truck by 7:00 PM?',
          options: ['Free response'],
          answer: '100'
      },
      {   
          question: 'A rolling ball covers a distance of 2400 feet in 4 minutes. What is the ball\'s average speed, in inches per second? (12 inches = 1foot)',
          options: ['Free response'],
          answer: '120'
      },
      {   
          question: 'Idina can type 90 words in 2.5 minutes. How many words can she type in 12 minutes?',
          options: ['Free response'],
          answer: '432'
      },
      {   
          question: 'A salesman at a tea company makes a $15 commission on every $100 worth of products that he sells. If a jar of tea leaves is $20, how many jars would he have to sell to make $180 in commission?',
          options: ['Free response'],
          answer: '60'
      },
      {   
          question: 'A train covers 32 kilometers in 14.5 minutes. If it continues to travel al the same rate, which of the following is closest to the distance it will travel in 2 hours?',
          options: ['A) 54 kilometers','B) 265 kilometers','C) 364 kilometers','D) 928 kilometers'],
          answer: 'B) 265 kilometers'
      },
      {   
          question: 'Peanut oil leaks out of an industrial conlainer at the rate of 3 liters in 2 hours. If the peanut oil costs 8 dollars per liter, how many dollars worth will be lost in 11 hours?',
          options: ['A) $60', 'B) $96', 'C) $118', 'D) $132'],
          answer: 'D) $132'
      },
      {   
          question: 'A recipe for soap calls for 1 1/2 cups of lye for every 2/5 cup of castor oil. How many cups of lye are needed for a batch of soap that uses 3 cups of castor oil?',
          options: ['A) 1 1/4 cups', 'B) 5 cups', 'C) 9 4/5 cups', 'D) 11 1/4 cups'],
          answer: 'D) 11 1/4 cups'
      },
      {   
          question: 'An 8 inch by 10 inch piece of cardboard costs $2.00. If the cost of a piece of cardboard is proportional to its area, what is the cost of a piece of cardboard that is 16 inches by 20 inches?',
          options: ['A) $4.00', 'B) $8.00', 'C) $12.00', 'D) $16.00'],
          answer: 'B) $8.00'
      },
      {   
          question: '9 pikol = 2 large bahar 400 kulack = 29 pikol The formulas above represent the relationships between some units of weight that were once used in Indonesia. A weight of 1,000 kulack is equivalent to how many large bahar? (Round your answer to the nearest whole number.)',
          options: ['Free Response'],
          answer: '16'
      },
      {   
          question: 'Henry drives 150 miles at 30 miles per hour and then another 200 miles at 50 miles per hour. What was his average speed, in miles per hour, for the entire journey, to the nearest hundredth?',
          options: ['A) 38.89', 'B) 40.00', 'C) 42.33', 'D) 43.58'],
          answer: 'A) 38.89'
      },
   
      {
          question: "A \"slow\" clock falls behind at the same rate every hour. It is set to the correct time at 4:00AM. When the dock shows 5:00 AM the same day, the correct time is 5:08 AM. When the clock shows 10:30 AM that day, what is the correct time?",
          answers: ["A) 11:02 AM", "B) 11:18 AM", "C) 11:22 AM", "D) 12:18 AM"],
          answer: "C) 11:22 AM"
      },
      {
          question: "Jared and Robert are accountants who are tasked with reviewing financial reports. It takes Jared 15 hours, working at a constant rate, to review a report containing 240 pages of financial statements. If Robert works al twice Jared's rate, how many minutes would it take Robert to review a report containing 120 pages of financial statements?",
          answers: ["A) 225", "B) 345", "C) 450", "D) 900"],
          answer: "A) 225"
      },
      {
          question: "A flask contains an acidic solution with a concentration of 7.1 x 10^15 hydrogen ions per milliliter. If 4.8 x 10^23 hydrogen ions have a total mass of 0.8 grams, which of the following is closest to the concentration, in grams per liter, of the acidic solution?",
          answers: ["A) 1.2 * 10^-5", "B) 1.2 * 10^-8", "C) 1.5 * 10^-5", "D) 1.5 * 10^-8"],
          answer: "A) 1.2 * 10^-5"
      },
      {
          question: "Brett currently spends $160 each, month on gas. His current car is able to travel 30 miles per gallon of gas. He decides to switch his current ar for a new car that is able to travel 40 miles per gallon of gas. Assuming the price of gas stays the same, how much will he spend on gas each month with the new car?",
          answers: ["A) $100", "B) $120", "C) $130", "D) $140"],
          answer: "B) $120"
      },
      {
          question: "Margaret can buy 4 jars of honey for 9 dollars, and she can sell 3 jars of honey for 15 dollars. How many jars of honey would she have to buy and then sell to make a total profit of 132 dollars?",
          answers: ["Free Response"],
          answer: "48"
      }
    ]
  
    var RatioAndProportionValues =  [
      {   
          question: 'The ratio of n to bis 7:6, and the ratio of b to c is 8:5. If n = 28, what is the value of c?',
          options: ['Free response'],
          answer: '15'
      },
      {   
          question: 'The ratio 9/4:3/2 can be written as n: 2. What is the value of n?',
          options: ['Free response'],
          answer: '3'
      },
      {   
          question: 'The price of Product Xis 25% greater than the price of Product Y. n,e price of Product Z is 25% less than the price of product Y. What is the ratio of the price of Product X to the price of Product Z?',
          options: ['A) 3:2', 'B) 4:3', 'C) 5:2', 'D) 5:3'],
          answer: 'D) 5:3'
      },
      {   
          question: 'P = V^2/R Electric power Pis related to the voltage V and resistance R by the formula above. If the voltage were halved, how would the electric power be affected?',
          options: ['A) It would be 4 times greater.', 'B) It would be doubled.', 'C) It would be halved.', 'D) It would be a quarter of what it use to be.'],
          answer: 'D) It would be a quarter of what it use to be.'
      },
      {   
          question: 'Julie has a square fence that encloses her garden. She decides lo cxpnnd her garden by making each side of the fence 10 percent longer. After this expansion, the area of Julie\'s garden will have increased by what percent?',
          options: ['A) 20%', 'B) 21%', 'C) 22%', 'D) 23%'],
          answer: 'B) 21%'
      },
      {   
          question: 'A right circular cone has a base radius of rand a height of h, If the radius is decreased by 20 percent and the height is increased by 10 percent, which of the following is the resulting percent change in the volume of the cone?',
          options: ['A) 10% decrease', 'B) 12% decrease', 'C) 18.4% decrease', 'D) 29.6% decrease'],
          answer: 'D) 29.6% decrease'
      },
      {   
          question: '[Image Needed] The area of the trapezoid above can be found  using the formula ~ (b1 + b2)h. If lengths BC and AD are halved and the height is doubled, how would the area of the trapezoid change?',
          options: ['A) 50% decrease', 'B) Stay the same', 'C) 25% decrease', 'D) 50% decrease'],
          answer: 'B) Stay the same'
      },
      {   
          question: 'Calvin has a sphere that is four times bigger than the one Kevin has in terms of volume. The radius of Calvin\'s sphere is how many times greater in length than the radius of Kevin\'s sphere (rounded to the nearest hundredth)?',
          options: ['A) 1.44', 'B) 1.59', 'C) 1.67', 'D) 2.00'],
          answer: 'B) 1.59'
      },
      {   
          question: '[Image Needed] ln the triangle above, the lengths of the sides relate to one another as shown. If a new triangle is created by decreasing s such that the area of the new triangle is 64 percent of the original area, s must have been decreased by what percent?',
          options: ['A) 8%', 'B) 20%', 'C) 25%', 'D) 30%'],
          answer: 'B) 20%'
      },
      {   
          question: 'L = 4*pi*d^2*b The total amount of energy emitted by a star each second is called its luminosity L, which is related to d, its distance (meters) away from Earth, and b, its brightness measured in walls per square meter, by the formula above.',
          options: ['A) 8', 'B) 9', 'C) 16', 'D) 18'],
          answer: 'D) 18'
      },
      {   
          question: 'Astronomers see two equally bright stars, Star A and Star B, in the night sky, but the luminosity of Star A is one-ninth the luminosity of Star B. The distance of Star A from Earth is what fraction of the distance of Star B from Earth?',
          options: ['A) 1/27', 'B) 1/9', 'C) 1/3', 'D) 2/3'],
          answer: 'C) 1/3'
      },
      {   
          question: 'The student body at an after-school program consists only of 6th graders, 7th graders, and 8th graders. The ratio of 6th graders to 8th graders is 17: 28. If a total of 110 students attend the program, n of whom are 7th graders, what is a possible value of n ?',
          options: ['Free response'],
          answer: '20 or 65'
      },
      {   
          question: 'A bookstore ordered an initial shjpment of 10 paperback copies and 4 hardcover copies of a newly published book. The store must order a second shipment with the same ratio of paperback and hardcover copies as the initial shipment. If the store orders 50 hardcover copies of the book for the second shipment, how many paperback copies should the store order?',
          options: ['Free response'],
          answer: '125'
      },
      {   
          question: 'If the ratio of y: 2.4 is equivalent to 2.7: 3.6, what is the value of y?',
          options: ['A) 3/2', 'B) 4/3', 'C) 7/3', 'D) 9/5'],
          answer: 'D) 9/5'
      },
      {   
          question: 'Box A weighs 42 pounds and Box B weighs 30 pounds. The ratio of the weights of Box A to Box B is equal to the ratio of the weights of Box C to Box D. If Box C and Box D weigh a total of 180 pounds, what is the weight of Box C, in pounds?',
          options: ['A) 50', 'B) 75', 'C) 105', 'D) 130'],
          answer: 'C) 105'
      }
  ]


var ExpressionValues = [
  {   
      question: 'Which of the following is equivalent to 6x2y + 6xy2?',
      options: ['A) 6xy(x+ y)', 'B) 12xy(x + y)', 'C) 6x2y2(y + x)', 'D) 12x3y3'],
      answer: 'A) 6xy(x+ y)'
  },
  {   
      question: 'If a ≠ 0, then 1/a + 1/4a is equivalent to which of the following?',
      options: ['A) 3/4a +3a', 'B) 4/7a', 'C) 4a/4', 'D) a +4'],
      answer: 'B) 4/7a'
  },
  {   
      question: 'Which of the following is equivalent to (x2 + y)(y+z)?',
      options: ['A) x2z + y2 + yz', 'B) x2y + x2z + y2+ yz', 'C) x2y+ y2 +x2z', 'D) x2 + x2z + y2 + yz'],
      answer: 'B) x2y + x2z + y2+ yz'
  },
  {   
      question: 'Which of the following is equivalent to 4 + Bx/12x for x ≠ 0?',
      options: ['A) 1 +Bx/3x', 'B) 4+2x/3x', 'C) 1 + 2x/3x', 'D) Answer not provided'],
      answer: 'C) 1 + 2x/3x'
  },
  {   
      question: 'Which of the following is equivalent to 3x4 - 3?',
      options: ['A) 3(x2 + 1)2', 'B) 3(x2 - 1)2', 'C) 3(x3 - l)(x + 1)', 'D) 3(x2 + 1 )(x + 1 )(x - 1)'],
      answer: 'D) 3(x2 + 1 )(x + 1 )(x - 1)'
  },
  {   
      question: '(x+ 1)2 +2(x+1)(y+ 1) + (y+1)2. Which of the following is equivalent to the expression shown above?',
      options: ['A) (x+ y+1)^2', 'B) (x+ y + 2)^2', 'C) (x+y)^2 +2', 'D) (x + y)^2 - x - y'],
      answer: 'B) (x+ y + 2)^2'
  },
  {   
      question: 'If y ≠ 0 and x ≠ y, which of the following is equivalent to xy - y2/x2?',
      options: ['A) y/x', 'B) y/x', 'C) x/y', 'D) -x/y'],
      answer: 'D) -x/y'
  },
  {   
      question: 'If x > 1, which of the following is equivalent to 1/((x-1)/2 + (x+5/3))?',
      options: ['A) (5x+7)/6', 'B) 6/(2x+4)', 'C) 6/(5x+7)', 'D) 1/(30x+42)'],
      answer: 'C) 6/(5x+7)'
  },
  {   
      question: 'If x ≠ 0, which of the following is equivalent to the given expression?',
      options: ['A) (2x-1)/(2x+1)', 'B) (2x+1)/(2x-1)', 'C) (4x^2 -1)/x^2', 'D) -1'],
      answer: 'B) 2x+1/2x-1'
  },
  {   
      question: 'The expression 8x^2 - 1/2y^2 can be written in the form 8(x - cy)(x + cy), where c is a positive constant. What is the value of c?',
      options: ['A) 1/16', 'B) 1/8', 'C) 1/4', 'D) √2/4']
  },
  {   
      question: 'Which of the following is equivalent to the expression x^2(x + 2)(x - 2) + 4?',
      options: ['A) (x^2 - 2)^2', 'B) (x^2 + 2)^2', 'C) (x-1)^2*(x+2)^2', 'D) (x+1)^2*(x-2)^2'],
      answer: 'C) (x-1)^2*(x+2)^2'
  },
  {   
      question: 'Which of the following is equivalent to the expression above?',
      options: ['A) (x^2 - 2)^2', 'B) (x^2 + 2)^2', 'C) (x-1)^2(x+2)^2', 'D) (x+1)^2(x-2)^2'],
      answer: 'A) (x^2 - 2)^2'
  },
  {   
      question: 'A calculator is allowed on the following questions. 3x^3 + 8x^2 - 4x and 7x^2 -11x-7. Which of the following is the sum of the two polynomials above?',
      options: ['A) 3x^3 + x^2 -15x -7', 'B) 3x^3 +15x^2 -15x -7', 'C) 10x^5 -7x -7', 'D) 15x^4 + 3x^3 - 15x^2 - 7'],
      answer: 'B) 3x^3 +15x^2 -15x -7'
  },
  {   
      question: '(5a + 3√a) - (2a + 5/√a). Which of the following is equivalent to the expression above?',
      options: ['A) -2√a', 'B) a/√a', 'C) 3a - 2√a', 'D) 3a + 8√a'],
      answer: 'C) 3a - 2√a'
  },
  {   
      question: '9(2y)^2 + 2(6y)^2. If y ≠ 0, what is the value of 5(√y)^2?',
      options: ['Free Response'],
      answer: '3/2'
  },
  {   
      question: 'x/(x-2) + x/2(2-x). Which of the following is equivalent to the expression above for x ≠ 2?',
      options: ['A) -x/(x-2)', 'B) x/2(x-2)', 'C) 3x/2(x-2)', 'D) 3x/2(x-2)'],
      answer: 'C) 3x/2(x-2)'
  }
];






var ConstructionModelsValues = [
  {
    "question": "A carpenter lays x bricks per hour for y hours and then lays x/2 bricks per hour for 2y more hours. In terms of x and y, how many bricks did he lay in total?",
    "options": ["A) 2xy", "B) 5/2xy", "C) 5xy", "D) 3/2xy"],
    "answer": "A) 2xy"
  },
  {
    "question": "A cheese vendor currently has 175 pounds of mozzarella available for sale. If each pound of mozzarella sells for $8.75, which of the following functions gives the amount of mozzarella M, in pounds, still available for sale after d dollars worth has been sold?",
    "options": ["A) M(d) = 175 - d/8.75", "B) M(d) = 175 - 8.75d", "C) M(d) = 175 - 8.75/d", "D) M(d) = 175(8.75) - d"],
    "answer": "A) M(d) = 175 - d/8.75"
  },
  {
    "question": "A retail store has monthly fixed costs of $3,000 and monthly salary costs of $2,500 for each employee. If the store hires x employees for an entire year, which of the following equations represents the store's total cost c, in dollars, for the year?",
    "options": ["A) c=3,000+2,500x", "B) c = 12(3,000+2,500x)", "C) c = 12(3,000) + 2,500x", "D) c = 3,000+ 12(2,500x)"],
    "answer": "B) c = 12(3,000+2,500x)"
  },
  {
    "question": "An internet service provider charges a one time setup fee of $100 and $50 each month for service. If c customers join at the same time and are on the service for m months, which of the following expressions represents the total amount, in dollars, the provider has charged these customers?",
    "options": ["A) 100c + 50m", "B) 100c + 50cm", "C) 150cm", "D) 100m + 50cm"],
    "answer": "B) 100c + 50cm"
  },
  {
    "question": "At a math team competition, there are m schools with n students from each school. The host school wants to order enough pizza such that there are 2 slices for each student. If there are 8 slices in one pizza, which of the following gives the number of pizzas the host school must order?",
    "options": ["A) 2mn/8", "B) mn/4", "C) m + 2n/8", "D) 2mn"],
    "answer": "B) mn/4"
  },
  {
    "question": "A manufacturing plant increases the temperature of a chemical compound by d degrees Celsius every m minutes. If the compound has an initial temperature of I degrees Celsius, which of the following expressions gives its temperature after x minutes, in degrees Celsius?",
    "options": ["A) (mx + t)/d", "B) (md + t)/x", "C) t + d/mx", "D) t + dx/m"],
    "answer": "D) t + dx/m"
  },
  {
    "question": "A cupcake store employs bakers to make boxes of cupcakes. Each box contains x cupcakes and each baker is expected to produce y cupcakes each day. Which of the following expressions gives the number of boxes needed for all the cupcakes produced by 3x bakers working for 4 days?",
    "options": ["A) 12x²y", "B) 3y/(4)", "C) 12x²y", "D) 12y"],
    "answer": "D) 12y"
  },
  {
    "question": "At a shop for tourists, the price of one souvenir is a dollars. Each additional souvenir purchased after the first is discounted by 40 percent. Which of the following equations gives the total cost C, in dollars, of purchasing n souvenirs, where n > 1?",
    "options": ["A) C = a + (n - 1)(0.4a)", "B) C = a + (n - 1)(0.6a)", "C) C = a + n(0.6a)", "D) C = 0.6an"],
    "answer": "B) C = a + (n - 1)(0.6a)"
  },
  {
    "question": "Kaiba began a 5-mile commute by biking for 4 miles to a rest area. He stopped at the rest area for 15 minutes and then walked for the remainder of the commute. If Kaiba bikes faster than he walks, which of the following graphs could represent his commute?",
    "options": [
      {
      "Graph": {
        "PointSets":[[[0,0],[15,4],[30,4],[45,3]]],
        "drawLines":true,
        }
      },
      {
        "Graph": {
          "PointSets":[[[0,0],[15,1],[30,1],[45,5]]],
          "drawLines":true,
          }
        },
        {
          "Graph": {
            "PointSets":[[[0,0],[15,4],[30,4],[45,5]]],
            "drawLines":true,
            }
          },{
            "Graph": {
              "PointSets":[[[0,0],[15,4],[30,0],[45,5]]],
              "drawLines":true,
              }
            },
    ],
    "answer": "C)"
  },
  {
    "question": "Mike starts driving to work and records his distance from home, in miles, every 10 minutes. His distance from home increases slowly at first due to traffic, then increases more quickly as traffic clears up. Which of the following graphs could illustrate Mike's distance from home during his drive?",
    "options": [
      {
      "Graph": {
        "PointSets":[[[0,0],[15,4],[30,4],[45,3]]],
        "drawLines":true,
        }
      },
      {
        "Graph": {
          "PointSets":[[[0,0],[15,1],[30,1],[45,5]]],
          "drawLines":true,
          }
        },
        {
          "Graph": {
            "PointSets":[[[0,0],[15,4],[30,4],[45,5]]],
            "drawLines":true,
            }
          },{
            "Graph": {
              "PointSets":[[[0,0],[15,4],[30,0],[45,5]]],
              "drawLines":true,
              }
            },
    ],
    "answer": "D)"
  },
  {
    "question": "At a video game arcade, d dollars can be exchanged for p tokens. If each game requires w tokens to play, which of the following gives the cost per game, in dollars?",
    "options": ["A) wd/p", "B) d/pw", "C) dw/p", "D) dp/w"],
    "answer": "C) dw/p"
  },
  {
    "question": "To prepare for landing, a plane descends so that its altitude decreases at a constant rate from 24,500 feet to 17,900 feet in 12 minutes. Which of the following equations gives the altitude A, in feet, of the plane t minutes after its descent began, for 0 ≤ t ≤ 12?",
    "options": ["A) A = 17,900 - 550t", "B) A= 17,900 + 550t", "C) A = 24,500 - 550t", "D) A = 24,500 + 550t"],
    "answer": "C) A = 24,500 - 550t"
  },
  {
    "question": "A taxicab charges a dollars for the first mile traveled and b dollars for each additional mile. If a particular passenger traveled more than one mile during a ride that cost $24, which of the following represents the distance, in miles, the passenger traveled during the ride?",
    "options": ["A) (24-a)/b", "B) (24 - a + b)/b", "C) (24+a -b)/b", "D) (24-a)/b"],
    "answer": "B) (24 - a + b)/b"
  },

  {
    "question": "To move into a new studio space, the m members of an art club decided to split the first month's rent of r dollars evenly among themselves. If t of the members fail to pay their share, which of the following represents the additional amount, in dollars, that each of the remaining members must pay to cover the first month's rent?",
    "options": ["A) r/(m-t)", "B) kr/(m-t)", "C) kr(m-t)/m", "D) kr/(m*(m-t))"],
    "answer": "D) kr/(m*(m-t))"
  }
]

  var ComplexNumbersTestMathValues = [
    {
        question: 'For i = {\\(\\sqrt{-1} \\)} which of the following is equivalent to (5-3i) - (-2+5i)',
        options: ['A) 3-8i','B) 3+2i','C) 7-8i','D) 7+2i']
    },
    {
        question: 'Given that i = {\\(\\sqrt{-1} \\)}, which of the following is equal to i(i+1)',
        options: ['A) i-2','B) i-1','C) i+1','D) 0']
    },
    {
        question: '{"\\(i^{4} + 3i^{2}+2\\)"}   Which of the following is equal to the expression above?',
        options: ['A) i','B) -1','C) 0','D) 1']
    },
    {
        question: '{"\\(2 + 3i + 4i^{2} + 5i^{3} + 6i^{4}\\)"} If the expression above is equivalent to a + bi, where a and b are constants, which is the value of a+b?',
        options: ['A) 2','B) 6','C) 10','D) 12']
    },
    {
        question: '(6+2i)(2+5i) If the expression above is equivalent to a+bi, where a and b are constants, what is the value of a?',
        options: ['A) 2','B) 12','C) 22','D) 34']
    }
]
  var ExponentsAndRadicalsTestMathValues =  [
    {   
        question: 'If a^(-1/2) = 3, what is the value of a?',
        options: ['A) -9','B) 1/9','C) 1/3','D) 9'],
    }
]



  var ManipulatingSolvingEquationsValues = [
    {   
        question: 'If a + b = -2, then (a + b)^3 = ?',
        options: ['A) 4', 'B) 0', 'C) -4', 'D) -8'],
        answer: 'D) -8'
    },
    {   
        question: 'For what value of n is (n - 4)^2 = (n + 4)^2 ?',
        options: ['Free response'],
        answer: '0'
    },
    {   
        question: 'If (1/a) * b/c = 1, what is the value of b - ac?',
        options: ['A) -3', 'B) 0', 'C) 2', 'D) It cannot be determined from the information given.'],
        answer: 'B) 0'
    },
    {   
        question: 'If 3x - 8 = -23, what is the value of 6x - 7?',
        options: ['A) -5', 'B) -21', 'C) -30', 'D) -37'],
        answer: 'D) -37'
    },
    {   
        question: 'If 4/9 = 8/3*m, what is the value of m?',
        options: ['A) 1/6', 'B) 2/3', 'C) 5/6', 'D) 6'],
        answer: 'A) 1/6'
    },
    {   
        question: 'If 3x + 1 = -8, what is the value of (x + 2)^3 ?',
        options: ['A) -1', 'B) 1', 'C) 8', 'D) 125'],
        answer: 'A) -1'
    },
    {   
        question: 'If 4/(k + 2) = x/3, where k ≠ -2, what is k in terms of x?',
        options: ['A) (12 - 2x) / x', 'B) (12 + 2x) / x', 'C) x / (12 + 2x)', 'D) 12x - 2'],
        answer: 'A) (12 - 2x) / x'
    },
    {   
        question: 'If (x - 3)^2 = 36 and x < 0, what is the value of x^2?',
        options: ['Free response'],
        answer: '9'
    },
    {   
        question: 'The formula J = p * (((1 + i)^n - 1) / i) gives the future value J of an annuity based on the monthly payment p, the interest rate i, and the number of months n. Which of the following gives p in terms of J, i, and n?',
        options: ['A) Ji / ((1 + i)^n - 1)', 'B) ((1 + i)^n - 1) / Ji', 'C) (J - i) / ((1 + i)^n - 1)', 'D) Ji + 1 - (1 + i)^n'],
        answer: 'A) Ji / ((1 + i)^n - 1)'
    },
    {   
        question: 'If m/2n = 2, what is the value of n/2m?',
        options: ['A) 1/8', 'B) 1/4', 'C) 1/2', 'D) 1'],
        answer: 'A) 1/8'
    },
    {   
        question: 'If x^2 + 5x - 24 = 0 and k is a solution of the equation and k < 0, what is the value of |k|?',
        options: ['Free response'],
        answer: '8'
    },
    {   
        question: 'If y > 0 and (y / 2)^3 = y / 32, what is the value of y?',
        options: ['Free response'],
        answer: '1/2'
    },
    {   
        question: 'If -2 * sqrt(x+4) / 3 = 6 and x > 0, what is the value of x?',
        options: ['Free response'],
        answer: '77'
    },
    {   
        question: 'If 20 - sqrt(x) = 2/3*sqrt(x) + 10 and x > 0, for what value of x is the equation above true?',
        options: ['Free response'],
        answer: '36'
    },
    {   
        question: 'If x + y = sqrt(x^2 + y^2 + 16), what is the value of x * y?',
        options: ['Free response'],
        answer: '8'
    },
    {
      question: 'What is the solution set to the equation (2x - 1) / (x + 2) = (x-2)/4?',
      options: ['A) {-10, 0}', 'B) {-10, -4}', 'C) {0, 8}', 'D) {-4, 8}'],
      answer: 'C) {0, 8}'
  },
  {
      question: 'If x > 0 and (x/6)^2 - 2(x/6) - 15 = 0, what is the value of x?',
      options: ['Free response'],
      answer: '30'
  },
  {
      question: 'What is the solution to the equation (x^2 - 4x + 3) / (x - 1) = 4 ?',
      options: ['Free response'],
      answer: '7'
  },
  {
      question: 'If x^2(x^4-9) = 8x^4 what is the real value of x?',
      options: ['Free response'],
      answer: '3'
  },
  {
      question: 'In the equation y + 2kx = kx^2 + 5, k is a constant. If y = 23 when x = 3, what is the value of k?',
      options: ['A) -6', 'B) 3', 'C) 6', 'D) 9'],
      answer: 'C) 6'
  },
  {
      question: 'If x / 6 = (x + 12)/42, what is the value of 6/x?',
      options: ['A) 1/3', 'B) 2', 'C) 3', 'D) 6'],
      answer: 'C) 3'
  },
  {
      question: 'd = a((c + 1)/24) Doctors use Cowling\'s rule, shown above, to determine the right dosage d, in milligrams, of medication for a child based on the adult dosage a, in milligrams, and the child\'s age c, in years. Ben is a patient who is in need of a certain medication. If a doctor uses Cowling\'s rule to prescribe Ben a dosage that is half the adult dosage, what is Ben\'s age, in years?',
      options: ['A) 7', 'B) 9', 'C) 11', 'D) 13'],
      answer: 'C) 11'
  },
  {
      question: 'In the figure above, two objects are connected by a string which is threaded through a pulley. Using its weight, object 2 moves object 1 along a flat surface. The acceleration a of the two objects can be determined by the following formula a= (m2*g - u * m1 * g) / (m1 +m2) where m1 and m2 are the masses of object 1 and object 2, respectively, in kilograms, g is the acceleration due to Earth\'s gravity measured in m/sec^2 , and u is a constant known as the coefficient of friction. Which of the following expresses the coefficient of friction, f, in terms of the other variables in the equation a = m2g - um1g / (m1 + m2)?',
      options: ['A) u = a(m1 + m2) / (m1 * m2 * g^2)', 'B) u = a(m1 + m2) / (m2g - m1g)', 'C) u = (m2g - a(m1 + m2)) / m1g', 'D) u = (a(m1 + m2) - m2g) / m1g'],
      answer: 'C) u = (m2g - a(m1 + m2)) / m1g'
  },
  {
      question: 'In the figure above, two objects are connected by a string which is threaded through a pulley. Using its weight, object 2 moves object 1 along a flat surface. The acceleration a of the two objects can be determined by the following formula a= (m2*g - u * m1 * g) / (m1 +m2) where m1 and m2 are the masses of object 1 and object 2, respectively, in kilograms, g is the acceleration due to Earth\'s gravity measured in m/sec^2 , and u is a constant known as the coefficient of friction. If the masses of both object 1 and object 2 were doubled, how would the acceleration of the two objects be affected?',
      options: ['A) The acceleration would stay the same.', 'B) The acceleration would be halved.', 'C) The acceleration would be doubled.', 'D) The acceleration would be quadrupled (multiplied by a factor of 4).'],
      answer: 'A) The acceleration would stay the same.'
  },
  {
      question: 'If 3(x - 2y) - 3z = 0, which of the following expresses x in terms of y and z?',
      options: ['A) x = (2y + 3z) / 3', 'B) x = 2y + z', 'C) x = y + 2z', 'D) x = 6y + 3z'],
      answer: 'B) x = 2y + z'
  },
  {
      question: 'If x is the solution to the equation (x + 1)(x - 2) = 7x - 18, what is the value of 7x - 18?',
      options: ['Free response'],
      answer: '10'
  },
  {
      question: 'Which of the following represents all the possible values of x that satisfy the equation 2 * sqrt(x) = x - 3?',
      options: ['A) 1 and 9', 'B) 1 and 4', 'C) 4', 'D) 9'],
      answer: 'D) 9'
  },
  {
    question: 'Based on the equation 4 / (x^2 - 6x + 9) =  9, which of the following could be the value of x - 3?',
    options: ['A) 2/3', 'B) 3 / 2', 'C) 7 / 3', 'D) 9 / 2'],
    answer: 'A) 2/3'
},
{
    question: 'In the equation sqrt(x- 10)  = sqrt(x) - sqrt(4), what is the value of sqrt(x- 10)?',
    options: ['A) sqrt(6)', 'B) 2*sqrt(2)', 'C) 3*sqrt(2)', 'D) sqrt(14)'],
    answer: 'B) 2*sqrt(2)'
},
{
    question: 'If the equation xy^2 + x - y^2 - 1 = 0 is true for all real values of y, what must the value of x be?',
    options: ['Free response'],
    answer: '1'
},
{
    question: 'Which of the following expresses the annual rate of depreciation, r, in terms of V, P, and I in the equation V = P(1 - r)^I?',
    options: ['A) r = 1 - t^(V/P)', 'B) r = 1 + t^(V/P)', 'C) r = t^(V/P)-1 - 1', 'D) r = 1 - t^(V)/P'],
    answer: 'A) r = 1 - t^(V/P)'
},
{
    question: 'If a car depreciates to a value equal to half its original price after 5 years, then which of the following is closest to the car\'s annual rate of depreciation in the equation V = P(1 - r)^I?',
    options: ['A) 0.13', 'B) 0.15', 'C) 0.16', 'D) 0.2'],
    answer: 'A) 0.13'
} 
]

  
  


  var MoreEquationSolvingStrategiesValues = [
    {
        question: '30(x^3 + 1/6*x^2 + 2/3*x) = ax^3 + bx^2 + cx In the equation above, a, b, and c are constants. If the equation is true for all values of x, what is the value of a + b + c?',
        options: ['Free response'],
        answer: '55'
    },
    {
        question: '2/3ax + 3 = 8/3*x + 9b In the equation above, a and b are constants. If the equation has infinitely many solutions, what is the value of a / b?',
        options: ['A) 3/4', 'B) 4/3', 'C) 6', 'D) 12'],
        answer: 'D) 12'
    },
    {
        question: 'In the equation ax - b = 3(2x + 1), a and b are constants. If the equation has no solution, which of the following could be the values of a and b?',
        options: ['A) a = 1 and b = -3', 'B) a = 1 and b = 3', 'C) a = 6 and b = -3', 'D) a = 6 and b = 3'],
        answer: 'D) a = 6 and b = 3'
    },
    {
        question: 'In the equation 18x^2 - 8 = 2(ax + b)(ax - b), a and b are constants. Which of the following could be the value of ab?',
        options: ['A) 6', 'B) 9', 'C) 12', 'D) 36'],
        answer: 'A) 6'
    },
    {
        question: 'How many solutions are there to the equation x - 1/2(3x + 8) = 2(2 - 1/4x)?',
        options: ['A) The equation has no solutions.', 'B) The equation has infinitely many solutions.', 'C) The equation has exactly 1 solution.', 'D) The equation has exactly 2 solutions.'],
        answer: 'A) The equation has no solutions.'
    },
    {
        question: 'In the equation 3x + a(3 - 2x) = 12 - 7x, a is a constant. If the equation has no solutions, what is the value of a?',
        options: ['A) -2', 'B) 2', 'C) 4', 'D) 5'],
        answer: 'D) 5'
    },
    {
        question: 'If (2x + 3)(ax - 5) = 12x^2 + bx - 15 for all values of x, what is the value of b?',
        options: ['A) 6', 'B) 8', 'C) 10', 'D) 12'],
        answer: 'B) 8'
    },
    {
        question: 'If (x + 3y)^2 = x^2 + 9y^2 + 42, what is the value of x^2y^2?',
        options: ['Free response'],
        answer: '49'
    },
    {
        question: 'In the equation 6x = x - 3x(2a - 1), a is a constant. If the equation has infinitely many solutions, what is the value of a?',
        options: ['A) -2/3', 'B) -1/3', 'C) 4/3', 'D) 5/3'],
        answer: 'B) -1/3'
    },
    {
        question: 'If (ab + a)/ b = a/b + 5 for all values of b, what is the value of a?',
        options: ['Free response'],
        answer: '5'
    },
    {
        question: 'If 1/x - 1/(x - 4) = 1, what is the value of x?',
        options: ['Free response'],
        answer: '2'
    },
    {
        question: 'If n < 0 and 4x^2 + mx + 9 = (2x + n)^2, what is the value of m + n?',
        options: ['A) -15', 'B) -9', 'C) -3', 'D) 12'],
        answer: 'A) -15'
    },
    {
        question: 'If 1/x + 1/y = 1/p, what is x in terms of p and y?',
        options: ['A) p - y', 'B) p*y/(p + y)', 'C) p*y/(p - y)', 'D) p*y/(y - p)'],
        answer: 'D) p*y/(y - p)'
    },
    {
        question: 'In the equation (x^3 + kx^2 - 3)(x - 2) = x^4 + 7x^3 - 18x^2 - 3x + 6, k is a constant. If the equation is true for all values of x, what is the value of k?',
        options: ['A) -9', 'B) 5', 'C) 7', 'D) 9'],
        answer: 'D) 9'
    },
    {
        question: 'In the equation 5/(x+3) - 2/(x-2) = (ax-b)/(x + 3)(x - 2), the equation is true for all x > 2, where a and b are constants. What is the value of a + b?',
        options: ['A) 7', 'B) 13', 'C) 19', 'D) 21'],
        answer: 'C) 19'
    },
    {
        question: 'If x > 1, what is the solution to the equation 4/x-1 + 2/x+1  = 35 / x^2 - 1?',
        options: ['Free response'],
        answer: '11/2'
    },
    {
        question: 'The equation (2x - b)(7x + b) = 14x^2 - cx - 16 is true for all values of x, where b and c are constants. If b > 0, what is the value of c?',
        options: ['A) -20', 'B) 20', 'C) 28', 'D) 36'],
        answer: 'B) 20'
    },
    {
        question: 'If a > 0, for what value of a is the equation 3 / (n-1) + 2n/(n+1) = 3 true?',
        options: ['Free response'],
        answer: '3'
    }
]





const satChapter11InequalitiesQuestions = [
  {
      question: 'Which of the following is a solution to the inequality -x - 4 > 4x - 14 ?',
      options: ['A) -1', 'B) 2', 'C) 5', 'D) 8'],
      answer: 'A) -1'
  },
  {
      question: 'If 3/4x - 4 > 1/2x - 10, which of the following must be true?',
      options: ['A) x < 24', 'B) x > 24', 'C) x < -24', 'D) x > -24'],
      answer: 'D) x > -24'
  },
  {
      question: 'Which of the following systems of inequalities could be the one graphed in the xy-plane above?', //Image required for question **************************
      options: ['A) y > 3, y > x', 'B) y < 3, y < x', 'C) y < 3, y > x', 'D) y > 3, y < x'],
      answer: 'C) y < 3, y > x'
  },
  {
      question: 'Jerry estimates that there are m marbles in a jar. Harry, who knows the actual number of marbles in the jar, notes that the actual number, n, is within 10 marbles (inclusive) of Jerry\'s estimate. Which of the following inequalities represents the relationship between Jerry\'s estimate and the actual number of marbles in the jar?',
      options: ['A) n + 10 <= m <= n - 10', 'B) m - 10 <= n <= m + 10', 'C) n <= m <= 10n', 'D) m/10 <= n <= 10m'],
      answer: 'B) m - 10 <= n <= m + 10'
  },
  {
      question: 'A manufacturer produces chairs for a retail store according to the formula, M = 12P + 100, where M is the number of units produced and P is the retail price of each chair. The number of units sold by the retail store is given by N = -3P + 970, where N is the number of units sold and P is the retail price of each chair. What are all the values of P for which the number of units produced is greater than or equal to the number of units sold?',
      options: ['A) P >= 58', 'B) P <= 58', 'C) P >= 55', 'D) P <= 55'],
      answer: 'A) P >= 58'
  },
  {
      question: 'If n is an integer and 3(n - 2) > -4(n - 9), what is the least possible value of n?',
      options: ['Free response'],
      answer: '7'
  },
  {
      question: 'The graph in the xy-plane above could represent which of the following systems of inequalities?', //Image required for question **************************
      options: ['A) y >= 3, y <= -3', 'B) y <= 3, y >= -3', 'C) x >= 3, x <= -3', 'D) x <= 3, x >= -3'],
      answer: 'B) y <= 3, y >= -3'
  },
  {
      question: 'To get to work, Harry must travel 8 miles by bus and 16 miles by train everyday. The bus travels at an average speed of x miles per hour and the train travels at an average speed of y miles per hour. If Harry\'s daily commute never takes more than 1 hour, which of the following inequalities represents the possible average speeds of the bus and train during the commute?',
      options: ['A) 8/x + 16/y <= 1', 'B) 16/x + 8/y <= 1', 'C) x/8 + y/16 <= 1', 'D) 8x + 16y <= 1'],
      answer: 'A) 8/x + 16/y <= 1'
  },
  {
      question: 'An ice cream distributor contracts out to two different companies to manufacture cartons of ice cream. Company A can produce 80 cartons each hour and Company B can produce 140 cartons each hour. The distributor needs to fulfill an order of over 1,100 cartons in 10 hours of contract time. It contracts out x hours to Company A and the remaining hours to Company B. Which of the following inequalities gives all possible values of x in the context of this problem?',
      options: ['A) 80/x + 140/(10-x) > 1,100', 'B) 140x + 80(10-x) > 1,100', 'C) 80x + 140(10-x) > 1,100', 'D) 80x + 140(x-10) > 1,100'],
      answer: 'C) 80x + 140(10-x) > 1,100'
  },
  {
      question: 'y > 15x + a \n y < 5x + b \n In the system of inequalities above, a and b are constants. If (1,20) is a solution to the system, which of the following could be the value of b - a ?',
      options: ['A) 6', 'B) 8', 'C) 10', 'D) 12'],
      answer: 'D) 12'
  },
  {
      question: 'y >= 3/2x + 2 \n y <= -2x - 5 \n Which of the following graphs in the $x y$-plane could represent the system of inequalities above?', //Image required for question **************************
      options: ['A) ', 'B) ', 'C) ', 'D) '], // Answer choices are images **************************
      answer: 'D) '
  },
  {
      question: 'Tina works no more than 30 hours at a nail salon each week. She can do a manicure in 20 minutes and a pedicure in 30 minutes. Each manicure earns her $25 and each pedicure eams her $40, and she must earn at least $900 to cover her expenses. If during one week, she does enough manicures m and pedicures p to cover her expenses, which of the following systems of inequalities describes her working hours and her earnings?',
      options: ['A) 3m + 2p <= 30, 25m + 40p >= 900', 'B) 2m + 3p <= 30, 25m + 40p >= 900', 'C) m/3 + p/2 <= 30, 25m + 40p >= 900', 'D) m/3 + p/2 >= 900, 25m + 40p <= 30'],
      answer: 'C) m/3 + p/2 <= 30, 25m + 40p >= 900'
  },
  {
      question: 'If k <= x <= 3k + 12, which of the following must be true? \n\n I. x - 12 <= 3k \n II. k >= -6 \n III. x - k >= 0',
      options: ['A) I only', 'B) I and II only', 'C) II and III only', 'D) I, II, and III'],
      answer: 'D) I, II, and III'
  },
  {
      question: 'If -20/3 < -2x + 4 < -9/2, what is one possible value of x - 2 ?',
      options: ['Free response'],
      answer: '9/4< x < 10/3'
  },
  {
    question: 'Joyce wants to create a rectangular garden that has an area of at least 300 square meters and a perimeter of at least 70 meters. If the length of the garden is x meters long and the width is y meters long, which of the following systems of inequalities represents Joyce\'s requirements?',
    options: ['A) xy >= 70, x + y >= 300', 'B) xy >= 150, x + y >= 70', 'C) xy >= 300, x + y >= 70', 'D) xy >= 300, x + y >= 35'],
    answer: 'D) xy >= 300, x + y >= 35'
},
{
  question: 'If a < b, which of the following must be true? \n\n I. a^2 < b^2 <= 3k \n II. 2a < 2b \n III. -b < -a',
  options: ['A) II only', 'B) I and II only', 'C) II and III only', 'D) I, II, and III'],
  answer: 'C) II and III only'
},
]


const satChapter12WordProblemsQuestions = [
  {   
      question: 'Which of the following represents the square of the sum of x and y, decreased by the product of x and y ?',
      options: ['A) x^2 + y^2 -xy', 'B) x^2y^2 - xy', 'C) (x + y)^2 i (x + y)', 'D) (x + y)^2 - xy'],
      answer: 'D) (x + y)^2 - xy'
  },
  {   
      question: 'On a 100cm ruler, lines are drawn at 10, X, and 98cm. The distance between the lines at X and 98cm is three times the distance between the lines at X and 10cm. What is the value of X ?',
      options: ['Free response'],
      answer: 'X = 32'
  },
  {   
      question: 'If 5 is added to the square root of x, the result is 9. What is the value of x + 2 ?',
      options: ['Free response'],
      answer: 'x = 18'
  },
  {   
      question: 'A grocery store sells tomatoes in boxes of 4 or 10. If Melanie buys x boxes of 4 and y boxes of 10, where x >= 1 and y >= 1, for a total of 60 tomatoes, what is one possible value of x ?',
      options: ['Free response'],
      answer: 'x = 5 or x = 10'
  },
  {   
      question: 'A rectangular monitor has a length of x inches and a width that is one-third of its length. If the perimeter of the monitor is 48 inches, what is the value of x ?',
      options: ['Free response'],
      answer: 'x = 18'
  },
  {   
      question: 'Susie buys 2 pieces of salmon, each weighing x pounds, and 1 piece of trout weighing y pounds, where x and y are integers. The salmon cost $3.50 per pound and the trout cost $5 per pound. If the total cost of the fish was $77, which of the following could be the value of y ?',
      options: ['A) 4', 'B) 5', 'C) 6', 'D) 7'],
      answer: 'D) 7'
  },
  {   
      question: 'A 20% nickel alloy was made by combining 2 grams of a 35% nickel alloy with 6 grams of an x% nickel alloy. What is the value of x ?',
      options: ['Free response'],
      answer: 'x = 15'
  },
  {   
      question: 'If 8 + 5x is twice x - 5, what is the value of x ?',
      options: ['A) -6', 'B) -3', 'C) -7/3', 'D) -2'],
      answer: 'A) -6'
  },
  {   
      question: 'If 75% of 68 is the same as 85% of n, what is the value of n ?',
      options: ['Free response'],
      answer: 'n = 60'
  },
  {   
      question: 'The Pirates won exactly 4 of their first 15 games. They then played N remaining games and won all of them. If they won exactly half of all the games they played, what is the value of N ?',
      options: ['Free response'],
      answer: 'N = 7'
  },
  {   
      question: 'Alice and Julie start with the same number of pens. After Alice gives 16 of her pens to Julie, Julie then has two times as many pens as Alice does. How many pens did Alice have at the start?',
      options: ['Free response'],
      answer: 'x = 48'
  },
  {   
      question: 'At a Hong Kong learning center, 1/4 of the students take debate, 1/6 of the students take writing, and 1/8 of the students take science. The rest take math. If 33 students take math, what is the total number of students at the learning center?',
      options: ['A) 60', 'B) 66', 'C) 72', 'D) 78'],
      answer: 'C) 72'
  },
  {   
      question: 'Ian has 20 football cards, and Jason has 44 baseball cards. They agree to trade such that Jason gives Ian 2 baseball cards for every card Ian gives to Jason. After how many such trades will Ian and Jason each have an equal number of cards?',
      options: ['A) 9', 'B) 10', 'C) 11', 'D) 12'],
      answer: 'D) 12'
  },
  {   
      question: 'If 3 is subtracted from 3 times the number x, the result is 21. What is the result when 8 is added to half of x ?',
      options: ['A) 1', 'B) 5', 'C) 8', 'D) 12'],
      answer: 'D) 12'
  },
  {   
      question: 'At a store, the price of a tie is k dollars less than three times the price of a shirt. If a shirt costs $40 and a tie costs $30, what is the value of k ?',
      options: ['Free response'],
      answer: 'k = 90'
  },
  {   
    question: 'A wooden board in the shape of a rectangle has a length that is twice its width. If the area of the board is 128 square feet, what is the length, in feet, of the board?',
    options: ['Free response'],
    answer: 'x = 16'
},
{   
    question: 'Alex, Bob, and Carl all collect seashells. Bob has half as many seashells as Carl. Alex has three times as many seashells as Bob. If Alex and Bob together have 60 seashells, how many seashells does Carl have?',
    options: ['A) 15', 'B) 20', 'C) 30', 'D) 40'],
    answer: 'C) 30'
},
{   
    question: 'Mark and Kevin own 1/4 and 1/3 of the books on a shelf, respectively. Lori owns the rest of the books. If Kevin owns 9 more books than Mark, how many books does Lori own?',
    options: ['Free response'],
    answer: 'x = 45'
},
{   
    question: 'A bakery gave out coupons to celebrate its grand opening. Each coupon was worth either $1, $3, or $5. Twice as many $1 coupons were given out as $3 coupons, and 3 times as many $3 coupons were given out as $5 coupons. The total value of all the coupons given out was $360. How many $3 coupons were given out?',
    options: ['A) 40', 'B) 45', 'C) 48', 'D) 54'],
    answer: 'D) 54'
},
{   
    question: 'A water tank is connected to two pipes, Pipe A and Pipe B. It takes 4 hours to fill the tank when only Pipe A is in use, and it takes 6 hours to fill the tank when only Pipe B is in use. If it takes m minutes to fill the tank when both Pipe A and Pipe B are in use, what is the value of m ?',
    options: ['Free response'],
    answer: 'm = 144'
},
{   
    question: 'Yoona runs at a steady rate of 1 yard per second. Jessica runs 4 times as fast. If Jessica gives Yoona a head start of 30 yards in a race, how many yards must Jessica run to catch up to Yoona?',
    options: ['Free response'],
    answer: 'x = 40'
},
{   
    question: 'Nicky owns a house that has a patio in the shape of a square. She decides to renovate the patio by increasing its length by 4 feet and decreasing its width by 5 feet. If the area of the renovated patio is 90 square feet, what was the original area of the patio in square feet?',
    options: ['Free response'],
    answer: 'x = 121'
},
{   
    question: 'Terry is hired to pave a parking lot and finishes 1/3 of the parking lot before Andy is hired to work alongside him. They each work at a constant rate, but Terry works twice as fast as Andy does. The equation 9(1/x + 1/(2x)) = 2/3 can be used to find the total number of days x it would have taken Terry to pave the entire parking lot by himself. Which of the following is the best interpretation of the number 9 in the equation?',
    options: ['A) The number of days it would have taken Terry and Andy to pave the entire parking lot if they had worked together from the start.', 'B) The number of days it will take Terry and Andy to pave the remainder of the parking lot working together.', 'C) The number of days it would take Andy to pave the remainder of the parking lot if he were working alone.', 'D) The number of days it would take Terry to pave the remainder of the parking lot if he were working alone.'],
    answer: 'B) The number of days it will take Terry and Andy to pave the remainder of the parking lot working together.'
}
]


const satChapter13MinimumAndMaximumWordProblemsQuestions = [
  {   
      question: 'Katherine has 28 classroom calculators that each require a set of 4 batteries. If her school supplies her with batteries in packs of 6, what is the least number of packs needed to provide every classroom calculator with a complete set of batteries?',
      options: ['Free response'],
      answer: 'x = 19'
  },
  {   
      question: 'Martha is working on a design project that requires 16 ounces of glue. The glue gun she is using comes preloaded with a glue stick that provides 2.5 ounces of glue. The only additional glue sticks Martha can purchase are ones that each provide 1.75 ounces of glue. Assuming that the glue sticks can only be purchased in whole numbers, what is the minimum number of glue sticks Martha must purchase for her project?',
      options: ['A) 6', 'B) 7', 'C) 8', 'D) 9'],
      answer: 'C) 8'
  },
  {   
      question: 'A gift shop held a weekend sale with the goal of selling at least $8,000 worth of greeting cards and gift boxes. Each greeting card was sold for $5, and each gift box was sold for $7. If no more than 400 gift boxes were sold during the sale due to limited inventory, what is the minimum number of greeting cards the shop could have sold to meet its goal?',
      options: ['A) 1,040', 'B) 1,160', 'C) 1,280', 'D) 1,400'],
      answer: 'A) 1,040'
  },
  {   
      question: 'To restock supplies, a nail salon purchases toolkits that each include 80 nail files and 150 nail buffers. If the nail salon needs to restock at least 1,800 nail files and at least 4,000 nail buffers, what is the minimum number of toolkits the salon can purchase?',
      options: ['Free response'],
      answer: 'x = 27'
  },
  {   
      question: 'One liter is equivalent to approximately 33.8 ounces. Mark has plastic cups that can each hold 12 ounces of liquid. At most, how many of these plastic cups could a two liter bottle of soda fill?',
      options: ['A) 5', 'B) 6', 'C) 7', 'D) 8'],
      answer: 'A) 5'
  },
  {   
      question: 'In one hour, Jason can install at least 6 windows but no more than 8 windows. Which of the following could be a possible amount of time, in hours, that Jason takes to install 100 windows in a home?',
      options: ['A) 12', 'B) 16', 'C) 17', 'D) 18'],
      answer: 'B) 16'
  },
  {   
      question: '1 fluid ounce = 29.6 milliliters \n 1 cup = 16 fluid ounces \n A chemistry teacher is planning to run a class experiment in which each student must measure out 100 milliliters of vinegar in a graduated cylinder. The class is limited to using 6 cups of vinegar. Given the information above, what is the maximum number of students who will be able to participate in this experiment?',
      options: ['Free response'],
      answer: 'x = 28'
  },
  {   
      question: 'Giovanni works as a waiter at an Italian restaurant. For every table that he serves, he earns a 15% tip on the bill. During lunch, he served 12 tables and each table had an average bill of $25. If each table during dinner will have an average bill of $45, what is the least number of tables Giovanni must serve during dinner to earn at least $180 for the day?',
      options: ['A) 3', 'B) 16', 'C) 18', 'D) 20'],
      answer: 'D) 20'
  },
  {   
      question: 'During a week-long fishing trip, Ashleigh caught nine less than three times the number of fish Naomi caught. If they caught at least 45 fish combined, what is the minimum number of fish that Naomi could have caught?',
      options: ['Free response'],
      answer: 'x = 14'
  },
  {   
      question: 'A jar is filled with black pebbles, white pebbles, and jade pebbles. The number of jade pebbles is greater than half the number of black pebbles, and the number of white pebbles is less than twice the number of black pebbles. If there are 32 jade pebbles in the jar, what is the maximum number of white pebbles that could be in the jar?',
      options: ['Free response'],
      answer: 'x = 125'
  },
  {   
      question: 'A pharmacy produces a certain medication in a daytime variety and a nighttime variety. A bottle of the daytime variety contains 2 ounces of the active ingredient and 6 ounces of flavored syrup. A bottle of the nighttime variety contains 3 ounces of the active ingredient and 5 ounces of flavored syrup. The pharmacy currently has no more than 385 ounces of the active ingredient and no more than 850 ounces of flavored syrup available, If at least 65 bottles of the daytime variety must be filled, what is the maximum number of bottles of the nighttime variety that can be filled?',
      options: ['A) 78', 'B) 85', 'C) 92', 'D) 106'],
      answer: 'B) 85'
  },
  {   
      question: 'A banquet hall has a maximum seating capacity of 168 people. For a particular event, the banquet manager must use an arrangement of short tables and long tables to ensure that there is enough seating to meet that capacity. Each short table seats 4 people and each long table seats 8 people. If no more than 32 tables can be placed inside the banquet hall, what is the maximum number of short tables that can be used?',
      options: ['A) 10', 'B) 14', 'C) 18', 'D) 22'],
      answer: 'D) 22'
  },
  {   
      question: 'As part of a marketing campaign, a restaurant is offering 4 free tacos for every burrito a customer buys. If the restaurant would normally sell the tacos for $2.60 each, what is the minimum number of burritos a customer would have to buy to receive at least $140 worth of tacos for free?',
      options: ['Free response'],
      answer: 'x = 14'
  },
  {   
      question: 'Ava is decorating two-tier and three-tier wedding cakes. It takes her 20 minutes to decorate each two-tier wedding cake and 35 minutes to decorate each three-tier wedding cake. If Ava needs to decorate at least 14 wedding cakes today, and she can spend no more than 6 hours doing so, what is the maximum number of three-tier wedding cakes she can decorate today?',
      options: ['A) 4', 'B) 5', 'C) 6', 'D) 8'],
      answer: 'B) 5'
  },
  {   
      question: 'Lianne wants to make a seasoning that consists of 75% sea salt and 25% black pepper. If sea salt costs $2 per pound and black pepper costs $8 per pound, and Lianne can spend no more than $210 on these ingredients, what is the maximum number of pounds of seasoning that she will be able to make?',
      options: ['A) 42', 'B) 50', 'C) 56', 'D) 60'],
      answer: 'D) 60'
      //{columns = [\'Day\', \'Average speed (miles per hour)\', \'Number of calories burned\'] data = [ [\'Monday\', 7.2, 616],[\'Thursday\', 6.8, 584],[\'Friday\', 7.9, 672],[\'Saturday\', 8.5, 720]]}
  },
  {
    problem: "A toy company ships its products in small, medium, and large boxes. Last month, the company shipped a total of 250 boxes, of which 70 were medium boxes. The number of large boxes shipped was more than the sum of the number of small boxes shipped and the number of medium boxes shipped. What is the greatest possible number of small boxes the company shipped last month?",
    options: ['Free response'],
    answer: 'x = 54'
},
{
    problem: 'C = (100n/(n + w))% \n The formula above can be used to determine the volume percent concentration C of an ethanol solution containing n ounces of ethanol and w ounces of water. A chemist wants to use the formula to create an ethanol solution with a volume percent concentration of no more than 16%. If the chemist will mix 10 ounces of ethanol and x cups of water to create the desired solution, what is the minimum possible value of x, assuming that x is a whole number? (1 cup = 8 ounces)',
    options: ['Free response'],
    answer: 'x = 7'
}
]

const satChapter14LinesQuestions =

[
  {
      "question": "What is the equation of the line parallel to the y-axis and 3 units to the right of the y-axis?",
      "answers": ["A) x = -3","B) x = 3","C) y = -3","D) y = 3"],
      "answer": "B) x = 3"
  },
  {
      "question": "In the figure above, the slope of the line through the two plotted points is (1/3). What is the value of n?",
      "answers": ["A) 9", "B) 4", "C) 3", "D) 7/3"],
      "answer": "C) 3"
  },
  {
      "question": "In the xy-plane, a line has an x-intercept of -2 and a y-intercept of 4. What is the slope of the line?",
      "answers": ["A) -2", "B) -(1/2)", "C) 1/2", "D) 2"],
      "answer": "A) -2"
  },
  {
      "question": "In the xy-plane, points (-3,5) and (6,8) lie on line t. Which of the following points is also on line t?",
      "answers": ["A) (0, 6)", "B) (3, 8)", "C) (9, 10)", "D) (12, 11)"],
      "answer": "A) (0, 6)"
  },
  {
      "question": "The graph of line l is shown in the xy-plane above. Which of the following is an equation of a line that is parallel to line l?",
      "answers": ["A) y = -(2/3)x + 2", "B) (2/3)x + 10", "C) (3/2)x - 4", "D) 3x - 1"],
      "answer": "C) (3/2)x - 4"
  },
  {
      "question": "In the xy-plane above, the graph of the linear function fis perpendicular to the graph of the linear function g (not shown). If the graphs of f and g intersect at the point (1, 5/2), what is the value of g(-1)?",
      "answers": ["Free response"],
      "answer": "g(-1) = 6.5"
  },
  {
      "question": "What is the slope of the line m in the figure above?",
      "answers": ["A) -2 ", "B) -(1/2)", "C) 1/4", "D) 1/2"],
      "answer": "B) -(1/2)"
  },
  {
      "question": "Line l in the xy-coordinate system above can be represented by the equation y = mx + b. Which of the following must be true?",
      "answers": ["A) mb > 0", "B) mb < 0", "C) mb = 0", "D) mb = 1"],
      "answer": "B) mb < 0"
  },
  {
      "question": "The line y = -2x - 2 is perpendicular to line l. If these the two lines have the same y-intercept, which of the following could the be the equation of line l?",
      "answers": ["A) y = -2x - 2", "B) y = 2x - 2", "C) y = -(1/2)x - 2", "D) (1/2)x - 2"],
      "answer": "D) (1/2)x - 2"
  },
  {
      "question": "The slope of line l is 1/2 and its y-intercept is 3. What is the equation of the line perpendicular to line l that goes through (1,5)?",
      "answers": ["A) y = -2x + 3", "B) y = -2x + 7", "C) -(1/2)x + 11/2", "D) (1/2)x + 9/2"],
      "answer": "B) y = -2x + 7"
  },
  {
      "question": "A line with a slope of 2/3 passes through the points (1,4) and (x, 10). What is the value of x?",
      "answers": ["A) 4", "B) 6", "C) 8", "D) 10"],
      "answer": "D) 10"
  },
  {
      "question": "On certain days of the week, Elaine runs for an hour on a treadmill. For each day that she ran in the last week, the table above shows the average speed s at which she ran, in miles per hour, and the number of calories she burned during the run. If the relationship between c and s can be modeled by a linear function, which of the following functions best models the relationship?",
      "table": {
        "columns": ['Day', 'Average speed (miles per hour)', 'Number of calories burned'],
        "data": [
          ['Monday', 7.2, 616],
          ['Thursday', 6.8, 584],
          ['Friday', 7.9, 672],
          ['Saturday', 8.5, 720],
        ]
      },
      "answers": ["A) c(s) = 30s + 400", "B) c(s) = 60s + 210", "C) c(s) = 80s + 40", "D) c(s) = 90s - 30"],
      "answer": "C) c(s) = 80s + 40"
  },
  {
      "question": "If m and b are real numbers and n > 0 and b > 0, then the line whose equation is y = mx + b cannot contain which of the following points?",
      "answers": ["A) (0, 1)", "B) (1, 1)", "C) (-1, 1)", "D) (0, -1)"],
      "answer": "D) (0, -1)"
  },
  {
      "question": "In the xy-plane, the line with equation ax - 1/3y = 8, where a is a constant, passes through the point (2,6). What is the x-coordinate of the x-intercept of the line?",
      "answers": ["Free response"],
      "answer": "x = 8/5"
  },
  {
      "question": "The equations of two perpendicular lines in the xy-plane are shown above, where a, b, c, d, and e are constants. If 0 < a/b < 1, which of the following must be true?",
      "answers": ["A) d/e < -1", "B) -1 < d/e < 0", "C) 0 < d/e < 1", "D) d/e > 1"],
      "answer": "A) d/e < -1"
  }
]



const satChapter15InterpretingLinearModelsQuestions = [
  {
    question: 'The water level h, in feet, in a large aquarium can be modeled by h = 100 - 3d, where d is the number of days that have passed since the aquarium was last refilled. Based on the model, how does the water level change each day? ',
    answers: [
      'A) Decreases by 3 feet',
      'B) Increases by 3 feet',
      'C) Decreases by 100 feet',
      'D) Increases by 100 feet'
    ],
    answer: 'A) Decreases by 3 feet'
  },
  {
    question: "The number of loaves of bread b remaining in a bakery each day can be estimated by Lhe equation b = 200 - 18, where h is the number of hours that have passed since the store's opening. What is the meaning of the value 18 in this equation?",
    answers: [
      'A) The bakery sells all its loaves of bread in 18 hours',
      'B) The bakery sells 18 loaves of bread each hour',
      'C) The bakery sells a total of 18 loaves of bread each day',
      'D) There are 18 loaves of bread left in the bakery at the end of each day'
    ],
    answer: 'B) The bakery sells 18 loaves of bread each hour'
  },
  {
    question: 'A membership website offers video tutorials on programming. The number of members, m, subscribed to the site can be estimated by the equation m = 500 + 200n, where n is the number of videos available on the site. Based on the equation, which of the follmving statements is true?',
    answers: [
      'A) For every one additional video, the site gains 500 new members',
      'B) The site initially made 200 videos available to members',
      'C) The site was able to get 500 members without any available videos',
      'D) The site gains 500 new members for every 200 additional videos available on the site'
    ],
    answer: 'C) The site was able to get 500 members without any available videos'
  },
  {
    question: 's = 10 - 2h. A recipe suggests sweetening honey tea with sugar. The equation above can be used to determine the amount of sugar s, in teaspoons, that should be added to a tea beverage with h teaspoons of honey. What is the meaning of the 2 in the equation?',
    answers: [
      'A) For every teaspoon of honey in the beverage, two more teaspoons of sugar should be added',
      'B) For every teaspoon of honey in the beverage, two fewer teaspoons of sugar should be added',
      'C) For every two teaspoons of honey in the beverage, one more teaspoon of sugar should be added',
      'D) For every two teaspoons of honey in the beverage, one fewer teaspoon of sugar should be added'
    ],
    answer: 'B) For every teaspoon of honey in the beverage, two fewer teaspoons of sugar should be added'
  },
  {
    question: "The monthly salary of a salesperson at a used car dealership is determined by the expression 1,000 + 2,000xc, where x is the salesperson's commission rate and c is the number of cars sold by the salesperson. Which of the following statements is the best interpretation of the number 2,000 in the context of this problem?",
    answers: [
      'A) The average price of a used car at the dealership',
      'B) The base monthly salary of a salesperson at the dealership',
      'C) The average monthly commission earned by each salesperson at the dealership',
      'D) The average number of cars sold by the dealership each month'
    ],
    answer:'A) The average price of a used car at the dealership'
  },
  {
    question: 'p = 2,000s + 15,000. A state government uses the equation above to estimate the average population p for a town with s schools. Which of the following best describes the meaning of the number 2,000 in the equation?',
    answers: [
      'A) The average number of students at each school in town',
      'B) The average number of schools in each town',
      "C) The estimated increase in a town's population for each additional school",
      'D) The estimated population of a town without any schools'
    ],
    answer: 'C) The estimated increase in a town\'s population for each additional school'
  },
  {
    question: 'h = 100 - 4t. The equation above can be used to model the number of hours h until a gallon of milk held at a temperature of t, in degrees Celsius, goes sour. Based on the model, which of the following is the best interpretation of the number 4 in the equation?',
    answers: [
      'A) An increase of 1 degree C will make a gallon of milk go sour 4 hours faster',
      'B) An increase of 1 degree C will make a gallon of milk go sour 1 hour faster',
      'C) An increase of 4 degrees C will make a gallon of milk go sour 1 hour faster',
      'D) An increase of 4 degrees C will make a gallon of milk go sour 4 hours faster'
    ],
    answer: 'A) An increase of 1 degree C will make a gallon of milk go sour 4 hours faster'
  },
  {
    question: 'An antique lamp was sold at an auction. The price p of the lamp, in dollars, during the auction can be modeled by the equation p = 900 - 10t, where t is the number or seconds s left in the auction. According to the model, what is the meaning of the 900 in the equation?',
    answers: [
      'A) The starting auction price of the lamp',
      'B) The final auction price of the lamp',
      'C) The increase in the price of the lamp per second',
      'D) The time it took to auction off the lamp, in seconds'
    ],
    answer: 'B) The final auction price of the lamp'
  },
  {
    question: 'y = 1.30x - 1.50. A bank teller uses the equation above to exchange U.S. dollars into euros, where y is the euro amount and x is the U.S. dollar amount. Which of the following is the best interpretation of the 1.50 in the equation?',
    answers: [
      'A) The bank charges 1.50 euros to do the currency exchange',
      'B) The bank charges 1.50 U.S. dollars to do the currency exchange',
      'C) One U.S. dollar is worth 1.50 euros',
      'D) One euro is worth 1.50 U.S. dollars'
    ],
    answer: 'A) The bank charges 1.50 euros to do the currency exchange'
  },
  {
    question: 't = (2x+9)/5. The equation above models the time t, in seconds, it takes to load a web page with x images. Based on the model, by how many seconds does each image increase the load time of a web page?',
    answers: [ 'Free response' ],
    answer: '0.4'
  },
  {
    question: 'The relationship between the daily profit y, in dollars, of a bakery and the number of cakes sold by the bakery is graphed in the xy-plane above. What does the slope of the line represent?',
    answers: [
      'A) The price of each cake',
      'B) The profit generated from each cake sold',
      'C) The daily profit generated from all the cakes that were sold',
      'D) The number of cakes that need to be sold to make a daily profit of 100 dollars'
    ],
    answer: 'B) The profit generated from each cake sold'
  },
  {
    question: 'Which of the following is the best interpretation of the y-intercept in the context of this problem? ',
    answers: [
      'A) The price of each cake',
      'B) The cost of making each cake',
      'C) The daily costs of running a bakery',
      "D) The daily cost of making the cakes that weren't able to be sold"
    ],
    answer: 'C) The daily costs of running a bakery'
  },
  {
    question: 'What does It mean that (5, 0) is a solution to the equation of the line? ',
    answers: [
      'A) The bakery needs to sell 5 cakes per day to cover its daily expenses',
      'B) Each cake must be sold for at least 5 dollars to cover the cost of making it',
      'C) It costs 5 dollars to make each cake',
      'D) Each day, the bakery gives the first 5 cakes away for free'
    ],
    answer: 'A) The bakery needs to sell 5 cakes per day to cover its daily expenses'
  },
  {
    question: 'T = 56 + 5h. To warm up his room, Patrick turns on the heater. The temperature T of his room, in degrees Fahrenheit, can be modeled by the equation above, where h is the number of hours since the heater started running. Based on the model, what is the temperature increase, In degrees Fahrenheit, for every 30 minutes the heater is turned on? ',
    answers: [ 'Free response' ],
    answer: '2.5'
  },
  {
    question: "2y - x = 14. Alice owns a pet frog but would like to add turtles to the same tank. The local veterinarian uses the the equation above to determine the total amount of water y, in gallons, that should be held in the tank for x turtles to thrive alongside Alice'sfrog. Based on the equation, which of the following must be true? I. One additional gallon of water can support two more turtles. II. One additional turtle requires two more gallons of water. III. One more turtule requires an additional half a gallon of water.",
    answers: [
      'A) II only',
      'B) III only',
      'C) I and II only',
      'D) I and III only'
    ],
    answer: 'D) I and III only'
  },
  {
    question: 'C = 1.5 + 2.5x. A local post office uses the equation above to determine the cost C, in dollars, of mailing a shipment weighing x pounds. An increase of 10 dollars in the mailing cost is equivalent to an increase of how many pounds in the weight of the shipment?',
    answers: [ 'A) 2', 'B) 2.5', 'C) 4', 'D) 5' ],
    answer: 'C) 4'
  }
]



const satChapter16FunctionsQuestions = [
  {
    question: 'The table above displays several points on the graph of the function f in the xy-plane. Which of the following could be f(x)?',
    "table": {
      "columns": ["X", "Y"],
      "data": [
        [0,20],
        [1,21],
        [2,29],
      ],
    
    },
    answers: [
      'A) f(x) = 20x',
      'B) f(x) = x + 20',
      'C) f(x) = x - 20',
      'D) f(x) = x^2 + 20'
    ],
    answer: 'D) f(x) = x^2 + 20'
  },
  {
    question: 'In the portion of the xy-plane shown above, for how many values of x does f(x) = g(x)?',
    answers: [ 'A) None', 'B) One', 'C) Two', 'D) Three' ],
    answer: 'D) Three'
  },
  {
    question: 'The graph of the function f is shown in the xy-plane above. If f(a) = f(3), which of the following could be the value of a?',
    answers: [ 'A) -4', 'B) -3', 'C) -2', 'D) 1' ],
    answer: 'B) -3'
  },
  {
    question: 'The function f is graphed in the xy-plane above. For how many values of x does f(x) = 3?',
    answers: [ 'A) Two', 'B) Three', 'C) Four', 'D) five' ],
    answer: 'C) Four'
  },
  {
    question: 'For which of the following functions is it true that f(-3) = f(3)?',
    answers: [
      'A) f(x) = 2/x',
      'B) f(x) = x^3/3',
      'C) f(x) = 3x^2 + 1',
      'D) f(x) = x + 2'
    ],
    answer: 'C) f(x) = 3x^2 + 1'
  },
  {
    question: 'The function f is defined by f(x) = 3x + 2 and the function g is defined by g(x) = f(2x) - 1. What is the value of g(10)?',
    answers: [ 'Free response' ],
    answer: '61'
  },
  {
    question: 'If f(x) = (16 + x^2)/2x for all x != 0, what is the value of f(-4)?',
    answers: [ 'A) -8', 'B) -4', 'C) 4', 'D) 8' ],
    answer: 'B) -4'
  },
  {
    question: 'Several values of the function f are given in the table above. If f(x) = ax^2 + b where a and b are constants, what is the value of f(3)?',
    table: {
      "columns": ['X', 'Y'],
      "data": [
        [0,-2],
        [1,3],
        [2,18]
      ]
    },
    answers: [ 'A) 23', 'B) 39', 'C) 43', 'D) 56' ],
    answer: 'C) 43'
  },
  {
    question: 'If f(x) = x^2, for which of the following values of c is f(c) < c?',
    answers: [ 'A) 1/2', 'B) 1', 'C) 3/2', 'D) 2' ],
    answer: 'A) 1/2'
  },
  {
    question: 'If the graph of the function f has x-intercepts at -3 and 2, and a y-intercept at 12, which of the following could define f?',
    answers: [
      'A) f(x) = (x + 3)^2(x - 2)',
'B) f(x) = (x + 3)(x - 2)^2',
      'C) f(x) = (x - 3)^2(x + 2)',
      'D) f(x) = (x - 3)(x + 2)^2'
    ],
    answer: 'B) f(x) = (x + 3)(x - 2)^2'
  },
  {
    question: 'f(x) = x^2 + 1. g(x) = x^2 -1. The functions f and g are defined above. What is the value of f(g(2))?',
    answers: [ 'A) 3', 'B) 5', 'C) 10', 'D) 17' ],
    answer: 'C) 10'
  },
  {
    question: 'In the xy-plane, which of the following translations of the graph of y = 2x^2 - 2 results in the graph of 2x^2 + 4?',
    answers: [
      'A) A translation 2 units downward',
      'B) A translation 6 units upward',
      'C) A translation 2 units to the left',
      'D) A translation 6 units to the right'
    ],
    answer: 'B) A translation 6 units upward'
  },
  {
    question: 'The graph of the function f and line segment AB are shown in the xy-plane above. For how many values of x between -3 and 3 does f(x) = c?',
    answers: [ 'Free response' ],
    answer: '3'
  },
  {
    question: 'The table above gives some values for the function f. If g(x) = 2f(x), what is the value of k if g(k) = 8?',
    answers: [ 'A) 2', 'B) 3', 'C) 4', 'D) 8' ],
    answer: 'B) 3'
  },
  {
    question: 'In the xy-plane, the graph of the functionf reaches its maximum value at the point (3, f(3)). The function g is defined by g(x) = f(x) + 7. At which of the following points in the xy-plane does the graph of g reach its maximum value?',
    answers: [
      'A) (10, f(10) + 7)',
      'B) (f(3), f(3) + 7)',
      'C) (3, f(10))',
      'D) (3, f(3) + 7)'
    ],
    answer: 'D) (3, f(3) + 7)'
  },
  {
    question: 'f(x) = sqrt(x-2). The function f is defined above for all x >= 2. Which of the following is equal to f(18) - f(11)?',
    answers: [ 'A) f(3)', 'B) f(5)', 'C) f(6)', 'D) f(7)' ],
    answer: 'A) f(3)'
  },
  {
    question: 'The function f is defined by f(x) = (x-3)^2, and the function g is defined by g(x) = x^2 + 4x + 4. The graph of g in the xy-plane is the graph of f shifted k units to the left. What is the value of k?',
    answers: [ 'Free response' ],
    answer: '5'
  },
  {
    question: 'y = (x+1)/(x-1). Which of the following points in the xy-plane is NOT on the graph of y?',
    answers: [ 'A) (-2, 1/3)', 'B) (-1, 0)', 'C) (0, -1)', 'D) (1, 2)' ],
    answer: 'D) (1, 2)'
  },
  {
    question: 'Let the function g be defined by g(x) = sqrt(3x). If g(a) = 6, what is the value of a?',
    answers: [ 'A) 3', 'B) 6', 'C) 9', 'D) 12' ],
    answer: 'D) 12'
  },
  {
    question: 'The functions f and g are defined for the six values of x shown in the table above. What is the value of f(g(-1))?',
    table: {
      "columns": ['X', 'f(x)', 'g(x)'],
      "data": [
       [-2, 3, 4],
      [-1, 5, 2 ],
      [0, -2, -3],
      [1, 3, 5],
      [2, 6, 7],
      [3, 7, 1]
      ]
    },
    answers: [ 'A) -2', 'B) 3', 'C) 5', 'D) 6' ],
    answer: 'D) 6'
  },
  {
    question: 'If g(c) = 5, what is the value of f(c)?',
    table: {
      "columns": ['X', 'f(x)', 'g(x)'],
      "data": [
       [-2, 3, 4],
      [-1, 5, 2 ],
      [0, -2, -3],
      [1, 3, 5],
      [2, 6, 7],
      [3, 7, 1]
      ]
    },
    answers: [ 'A) -2', 'B) 3', 'C) 5', 'D) 6' ],
    answer: 'B) 3'
  },
  {
    question: 'If f(x) = -3x + 5 and 1/2f(a) = 10, what is the value of a?',
    answers: [ 'A) -8', 'B) -5', 'C) 5', 'D) 8' ],
    answer: 'B) -5'
  },
  {
    question: 'Several values of the function f are given in the table above. If the function g is defined by g(x) = f(2x - 1), what is the value of g(3)?',
    table: {
      "columns": [
        "X",
        "f(x)",
        "g(x)"
      ],
      "data": [
        [-2, 3, 4],
        [-1, 5, 2],
        [0, -2, -3],
        [1, 3, 5],
        [2, 6, 7],
        [3, 7, 1]
      ]
    },
    answers: [ 'A) 2', 'B) 6', 'C) 5', 'D) 7' ],
    answer: 'A) 2'
  },
  {
    question: 'f(x) = 4x - 3. g(x) = 3x + 5. The functions f and g are defined above. Which of the following is equal to f(8)?',
    answers: [ 'A) g(1)', 'B) g(3)', 'C) g(5)', 'D) g(8)' ],
    answer: 'D) g(8)'
  },
  {
    question: 'The graph of f(x) is shown in the xy-plane above. If g(x) = (x + 3)(x - 1), for which of the following values of x is f(x) > g(x)?',
    answers: [ 'A) -3', 'B) -2', 'C) 1', 'D) 2' ],
    answer: 'B) -2'
  },
  {
    question: 'In the xy-plane, the graph of the function g is the image of the graph of the function f after a translation 1.5 units to the right. Which of the following defines g(x)?',
    answers: [
      'A) g(x) = f(3x - 2)',
      'B) g(x) = f(3x + 2)',
      'C) g(x) = f(2x - 3)',
      'D) g(x) = f(2x + 3)'
    ],
    answer: 'C) g(x) = f(2x - 3)'
  },
  {
    question: 'If f(x) is a linear function such that f(2) <= f(3), f(4) >= f(5), and f(6) = 10, which of the following must be true?',
    answers: [
      'A) f(3) < f(0) < f(4)',
      'B) f(0) = 0',
      'C) f(0) > 10',
      'D) f(0) = 10'
    ],
    answer: 'D) f(0) = 10'
  },
  {
    question: 'The graph of the function g is shown in the xy-plane above, and the function f (not shown) is defined by f(x) = x^3. If g is defined by g(x) = f(x + a) + b, where a and b are constants, what is the value of a + b?',
    answers: [ 'A) -5', 'B) -1', 'C) 1', 'D) 5' ],
    answer: 'A) -5'
  },
  {
    question: 'The graph of the function y = 9 - x^2 is shown in the xy-plane above. What is the length of the line segment AB?',
    answers: [ 'A) 3*sqrt(2)', 'B) 3*sqrt(10)', 'C) 9', 'D) 9*sqrt(10)' ],
    answer: 'B) 3*sqrt(10)'
  },
  {
    question: 'The function f is graphed in the xy-plane above. If the function g is defined by g(x) = f(x) + 4, what is the x-intercept of g(x)?',
    answers: [ 'A) -3', 'B) -1', 'C) 3', 'D) 4' ],
    answer: 'C) 3'
  },
  {
    question: 'The function f(x) = x^3 + 1 is graphed in the xy-plane above. If the function g is defined by g(x) = x + k, where k is a constant, and f(x) = g(x) has 3 solutions, which of the following could be the value of k?',
    answers: [ 'A) -1', 'B) 0', 'C) 1', 'D) 2' ],
    answer: 'C) 1'
  },
  {
    question: 'In the xy-plane, the function y = ax + 12, where a is a constant, passes through the point (-a, a). If a > 0, what is the value of a?',
    answers: [ 'Free response' ],
    answer: '3'
  }
]



const satChapter17QuadraticsQuestions = [
  {
      "question": "In the xy-plane, what is the distance between the two intercepts of the parabola y = x^2 -3x - 10?",
      "answers": ["A) 3", "B) 5", "C) 7", "D) 10"],
      "answer": "C) 7"
  },
  {
      "question": "What are the solutions to x^2 + 4x + 2 = 0?", 
      "answers": ["A) x = -2 +- sqrt(2)", "B) x = 2 +- 2sqrt(2)", "C) x = -2 += 2sqrt(2)", "D) x = -4 += 2sqrt(2)"],
      "answer": "A) x = -2 +- sqrt(2)"
  },
  {
      "question": "If a < 1 and 2a^2 -7a + 3 = 0, what is the value of a?",
      "answers": ["Free response"],
      "answer": "1/2"
  },
  {
      "question": "What is the sum of the solutions of (2x - 3)^2 = 4x + 5?",
      "answers": ["Free response"],
      "answer": "4"
  },
  {
      "question": "3x^2 + 10x = 8. If a and b are the two solutions to the equation above and a > b, what is the value of b^2?", 
      "answers": ["A) 4/9", "B) 2/3", "C) 4", "D) 16"],
      "answer": "D) 16"
  },
  {
      "question": "f(x) = m[(x - m)^2 - 1]. In the function f defined above, m is a positive constant. The graph of f in the xy-plane is a parabola. Which of the following statements about the parabola is true?", 
      "answers": ["A) Its minimum occurs at (m, -1)", "B) Its minimum occurs at (m, -m)", "C) Its maximum occurs at (m, -1)", "D) Its maximum occurs at (m, -m)"],
      "answer": "B) Its minimum occurs at (m, -m)"
  },
  {
      "question": "y = -3. y = x^2 + cx. In the system of equations above, c is a constant. For which of the following values of c does the system of equations have exactly two real solutions?", 
      "answers": ["A) -4", "B) 1", "C) 2", "D) 3"],
      "answer": "A) -4"
  },
  {
      "question": "At which of the following points does the line with equation y = 4 intersect the parabola y = (x + 2)^2 - 5 in the xy-plane?", 
      "answers": ["A) (-1, 4) and (-5, 4)", "B) (1, 4) and (-5, 4)", "C) (1, 4) and (5, 4)", "D) (-11, 4) and (7, 4)"],
      "answer": "B) (1, 4) and (-5, 4)"
  },
  {
      "question": "Which of the following equations represents the parabola shown in the xy-plane above?",
      "answers": ["A) y = (x - 3)^2 - 8", "B) y = (x + 3)^2 + 8", "C) 2(x - 3)^2 - 8", "D) y = 2(x + 3)^2 - 8"],
      "answer": "C) 2(x - 3)^2 - 8"
  },
  {
      "question": "For what value of t does the equation v = 5t - t^2 result in the maximum value of v?", 
      "answers": ["Free response"],
      "answer": "2.5"
  },
  {
      "question": "P = m^2 - 100m - 120,000. The monthly profit of a mattress company can be modeled by the equation above, where P is the profit, in dollars, and m is the number of mattresses sold. What is the minimum number of mattresses the company must sell in a given month so that it does not lose money during that month?",
      "answers": ["Free response"],
      "answer": "400"
  },
  {
      "question": "E(x) = 50x^2 - 800x + 10,000. The function above models the relationship between the total monthly expenses E, in dollars, of a restaurants and the number of tables x in its dining area, where 0 <= x <= 25. What does the number 10,000 represent in the function?", 
      "answers": ["A) The maximum number of tables that can fit in the dining area", "B) The average monthly expenses, in dollars, for each table in the dining room", "C) The total monthly expenses, in dollars, when there are zero tables in the dining area", "D) The total monthly expenses, in dollars, when the number of tables in the dining area is maximized"],
      "answer": "C) The total monthly expenses, in dollars, when there are zero tables in the dining area"
  },
  {
      "question": "f(x) = -x^2 + 6x + 20. Thefunction f is defined above. Which of the following equivalent forms of f(x) displays the maximum value of f as a constant or coefficient?", 
      "answers": ["A) f(x) = -(x - 3)^2 + 11", "B) f(x) = -(x - 3)^2 + 29", "C) f(x) = -(x + 3)^2 + 11", "D) f(x) = -(x + 3)^2 + 29"],
      "answer": "B) f(x) = -(x - 3)^2 + 29"
  },
  {
      "question": "y = -3. y = ax^2 + 4x - 4. In the system of equations above, a is a constant. For which of the following values of a does the system of equations have exactly one real solution?",
      "answers": ["A) -4", "B) -2", "C) 2", "D) 4"],
      "answer": "A) -4"
  },
  {
      "question": "f(x) = x^2 - 24x + 180. For a manufacturer of x-ray machines, the cost per unit, in thousands of dollars, can be modeled by the function f above, where x is the weekly number of units produced. How many units should the manufacturer produce each week to minimize the cost per unit?",
      "answers": ["Free response"],
      "answer": "12"
  },
  {
      "question": "f(x) = -4x^2 + 22x. The function f above gives the data transfer speed, in megabytes per second, over a network connection x minutes after a file transfer was initiated. The graph of y = f(x) in the xy-plane has x-intercepts at x = 0 and x = b. Which of the following is the best interpretation of b?",
      "answers": ["A) The initial data transfer speed over the network connection", "B) The maximum data transfer speed over the network connection", "C) The time at which the data transfer speed over the network connection was at its highest", "D) The time at which the file transfer completed"],
      "answer": "D) The time at which the file transfer completed"
  },
  {
      "question": "g(x) = -3x^2 + 18x. The function g above gives the data transfer speed, in megabytes per second, over a network connection x minutes after a file transfer was initiated. The graph of y = g(x) in the xy-plane has x-intercepts at x = 0 and x = c. Which of the following is the best interpretation of c/2?",
      "answers": ["A) The initial data transfer speed over the network connection", "B) The maximum data transfer speed over the network connection", "C) The time at which the data transfer speed over the network connection was at its highest", "D) The time at which the file transfer completed"],
      "answer": "C) The time at which the data transfer speed over the network connection was at its highest"
  },
  {
      "question": "y = a(x - 3)(x - k). In the quadratic equation above, a and k are constants. If the graph of the equation in the xy-plane is a parabola with vertex (5, -32), what is the value of a?",
      "answers": ["A) 2", "B) 5", "C) 6", "D) 8"],
      "answer": "D) 8"
  },
  {
      "question": "In the xy-plane, the line y = 2x + b intersects the parabola y = x^2 + bx + 5 at the point (3, k). If b is a constant, what is the value of k?",
      "answers": ["A) 0", "B) 1", "C) 2", "D) 3"],
      "answer": "C) 2"
  }
]

const satChapter18SyntheticDivisionQuestions = [
  {
      "question": "The expression 4x/(x - 2) is equal to which of the following?",
      "answers": ["A) -2", "B) -(8/(x-2)) + 4", "C) 8/(x-2) + 4", "D) 4 - 2x"],
      "answer": "C) 8/(x-2) + 4"
  },
  {
      "question": "If the expression (6x^2 + 5x + 2)/(2x + 1) is written in the form (1/(2x + 1) + Q, what is Q in terms of x?", 
      "answers": ["A) 3x - 1", "B) 3x + 1", "C) 6x^2 + 3x + 1", "D) 6x^2 + 5x + 1"],
      "answer": "B) 3x + 1"
  },
  {
      "question": "The expression 4x^2 + 5 can be written as A(2x - 1) + R, where A is an expression in terms of x and R is a constant. What is the value of R?",
      "answers": ["Free response"],
      "answer": "6"
  },
  {
      "question": "The function g is defined by a polynomial. The table above shows some values of x and g(x). What is the remainder when g(x) is divided by x + 3?", 
      "table":{
        "columns": [
          "X",
          "g(x)"
        ],
        "data": [
          [-3, -13],
          [-2, -10],
          [0, -4],
          [1, -1],
          [3, 5]
        ]
      },
      "answers": ["A) -2", "B) 1", "C) 2", "D) 6"],
      "answer": "C) 2"
  },
  {
      "question": "2x^3 - kxz^2 + 5xz + 2x - 2. In the polynomial above, k is a constant. If z - 1 is a factor of the polynomial above, what is the value of k?", 
      "answers": ["Free response"],
      "answer": "7"
  },
  {
      "question": "What is the remainder when x^2 + 2x + 1 is divided by x + 4?", 
      "answers": ["Free response"],
      "answer": "9"
  },
  {
      "question": "When 3x^2 - 8x - 4 is divided by 3x - 2, the result can be expressed as A - 8/(3x - 2). What is A in terms of x?", 
      "answers": ["A) x - 4", "B) x - 2", "C) x + 2", "D) x + 4"],
      "answer": "B) x - 2"
  },
  {
      "question": "The expression 2x^2 can be written as A(x + 1) + B, where B is a constant. What is A in terms of x?", 
      "answers": ["A) 2x + 6", "B) 2x + 2", "C) 2x - 2", "D) 2x - 6"],
      "answer": "D) 2x - 6"
  },
  {
      "question": "The expression x^2 + 4x - 9 can be written as (ax + b)(x - 2) + c, where a, b, and c are constants. What is the value of a + b + c?", 
      "answers": ["A) -2", "B) 3", "C) 7", "D) 10"],
      "answer": "D) 10"
  },
  {
      "question": "For a polynomial p(x), p(2) = 0. Which of the following must be true about p(x)?", 
      "answers": ["A) 2x is a factor of p(x)", "B) 2x - 2 is a factor of p(x)", "C) x - 2 is a factor of p(x)", "D) x + 2 is a factor of p(x)"],
      "answer": "C) x - 2 is a factor of p(x)"
  },
  {
      "question": "If p(x) = x^3 + x^2 - 5x + 3, then p(x) is divisible by which of the following? I. x - 2. II. x - 1. III. x + 3.",
      "answers": ["A) I and II only", "B) I and III only", "C) II and III only", "D) I, II, and III"],
      "answer": "C) II and III only"
  },
  {
      "question": "If the polynomial p(x) is divisible by x - 2, which of the following could be p(x)?", 
      "answers": ["A) p(x) = -x^2 + 5x - 14", "B) p(x) = x^2 - 6x - 2", "C) p(x) = 2x^2 + x - 8", "D) p(x) = 3x^2 - 2x - 8"],
      "answer": "D) p(x) = 3x^2 - 2x - 8"
  },
  {
    "question": "If x - 1 and x + 1 are both factors of the polynomial ax^4 + bx^3 - 3x^2 + 5x and a and b are constants, what is the value of a?",
    "answers": ["A) -3", "B) 1", "C) 3", "D) 5"],
    "answer": "C) 3"
},
{
    "question": "For a polynomial p(x), p(1/3) = 0. Which of the following must be a factor of p(x)?",
    "answers": ["A) 3x - 1", "B) 3x + 1", "C) x - 3", "D) x + 3"],
    "answer": "A) 3x - 1"
}
]


const satChapter19ComplexNumbersQuestions = 
[
  {   
      question: 'For i = sqrt(-1), which of the following is equivalent to (5 - 3i) - (-2 + 5i)?',
      options: ['A) 3 - 8i', 'B) 3 + 2i', 'C) 7 - 8i', 'D) 7 + 2i'],
      answer: 'C) 7 - 8i'
  },
  {   
      question: 'Given that i = sqrt(-1), which of the following is equivalent to i(i + 1)?', 
      options: ['A) i - 2', 'B) i - 1', 'C) i + 1', 'D) 0'],
      answer: 'B) i - 1'
  },
  {   
      question: 'i^4 + 3i^2 + 2. Which of the following is equal to the expression above? (Note: i = sqrt(-1))',
      options: ['A) i', 'B) -1', 'C) 0', 'D) 1'],
      answer: 'C) 0'
  },
  {   
      question: '2 + 3i + 4i^2 + 5i^3 + 6i^4. If the expression above is equivalent to a + bi, where a and b are constants, what is the value of a + b? (Note: i = sqrt(-1))',
      options: ['A) 2', 'B) 6', 'C) 10', 'D) 12'],
      answer: 'A) 2'
  },
  {   
      question: '(6 + 2i)(2 + 5i). If the expression above is equivalent to a + bi, where a and b are constants, what is the value of a?', 
      options: ['A) 2', 'B) 12', 'C) 12', 'D) 22'],
      answer: 'A) 2'
  },
  {   
      question: 'Which of the following is equal to 3(i + 2) - 2(5 - 4i)? (Note: i = sqrt(-1))', 
      options: ['A) 16 - 5i', 'B) -4 + 7i', 'C) -4 + 11i', 'D) 16 + 11i'],
      answer: 'C) -4 + 11i'
  },
  {   
      question: 'For i = sqrt(-1), which of the following is equivalent to 3i(i + 2) - i(i - 1)?', 
      options: ['A) -4 + 7i', 'B) -2 + 7i', 'C) -4 + 5i', 'D) -2 + 5i'],
      answer: 'B) -2 + 7i'
  },
  {   
      question: 'For i = sqrt(-1), which of the following is equal to i^93?', 
      options: ['A) -1', 'B) 1', 'C) -i', 'D) i'],
      answer: 'D) i'
  },
  {   
      question: 'Which of the following complex numbers is equivalent to (3 - i)^2? (Note: i = sqrt(-1))', 
      options: ['A) 8 - 6i', 'B) 8 + 6i', 'C) 10 - 6i', 'D) 10 + 6i'],
      answer: 'A) 8 - 6i'
  },
  {   
      question: '(-i)^2 - (-i)^4. In the complex number system, what is the value of the expression above? (Note: i = sqrt(-1))', 
      options: ['A) -2', 'B) 0', 'C) 1', 'D) 2'],
      answer: 'A) -2'
  },
  {   
      question: '(5 - 2i)(4 - 3i). Which of the following is equal to the expression above? (Note: i = sqrt(-1))',
      options: ['A) 14 - 7i', 'B) 14 - 23i', 'C) 26 + 7i', 'D) 26 - 23i'],
      answer: 'B) 14 - 23i'
  },
  {   
      question: 'Which of the following is equal to 1/i + 1/i^2? + 1/i^4? (Note: i = sqrt(-1))', 
      options: ['A) -i', 'B) i', 'C) 0', 'D) 1'],
      answer: 'A) -i'
  },
  {   
      question: 'Which of the following is equal to (1 - 3i)/(3 + i)? (Note: i = sqrt(-1))', 
      options: ['A) -i', 'B) i', 'C) -(5/4)i', 'D) (3/4) - (5/4)i'],
      answer: 'A) -i'
  },
  {   
      question: 'Which of the following complex numbers is equivalent to (2 - i)/(2 + i)? (Note: i = sqrt(-1))',
      options: ['A) 3/5 - (4/5)i', 'B) 1 - (4/5)i', 'C) 5/3 - (4/3)i', 'D) 1 - (4/3)i'],
      answer: 'A) 3/5 - (4/5)i'
  },
  {   
      question: '(4 + i)/(1 + i) + (2 - i)/(1 + i). Which of the following is equal to the expression above? (Note: i = sqrt(-1))',
      options: ['A) -2 - i', 'B) 2 + i', 'C) 4 + i', 'D) 4 - i'],
      answer: 'B) 2 + i'
  },
]

const satChapter20AbsoluteValueQuestions = [
  {
      question: 'If f(x) = -2x^2 - 3x + 1, what is the value of |f(1)|?',
      options: ['A) 3', 'B) 4', 'C) 5', 'D) 6'],
      answer: 'B) 4'
  },
  {
      question: 'If |2 - x| > 5 and x is a positive integer, what is the minimum possible value of x?',
      options: ['Free response'],
      answer: '8'
  },
  {
      question: 'Which of the following expressions is equal to -5 for some value of x?',
      options: ['A) |x - 6| + 2', 'B) |x - 2| - 6', 'C) |x + 2| + 6', 'D) |x + 6| - 2'],
      answer: 'B) |x - 2| - 6'
  },
  {
      question: '[Image Needed] Which of the following could be the equation of the function graphed in the xy-plane above?',
      options: ['A) y = -|x| - 2', 'B) y = |x| - 2', 'C) y = |x| + 2', 'D) y = |x - 2|'],
      answer: 'B) y = |x| - 2'
  },
  {
      question: 'If |x - 3| > 10, which of the following could be the value of |x|?',
      options: ['A) 2', 'B) 4', 'C) 6', 'D) 8'],
      answer: 'D) 8'
  },
  {
      question: 'How many different integer values of x satisfy |x + 6| < 3?',
      options: ['Free response'],
      answer: '5'
  },
  {
      question: '[Image Needed] The graph of the function f is shown in the xy-plane above. Which of the following could be the graph of the function y = |f(x)|?',
      options: ['A) [Image Needed]', 'B) [Image Needed]', 'C) [Image Needed]', 'D) [Image Needed]'],
      answer: 'D) [Image Needed]'
  },
  {
      question: 'If |n - 2| = 10, what is the sum of the two possible values of n?',
      options: ['A) 4', 'B) 6', 'C) 12', 'D) 20'],
      answer: 'A) 4'
  },
  {
      question: 'If |x - 10| = b, where x < 10, then which of the following is equivalent to b - x?',
      options: ['A) -10', 'B) 10', 'C) 2b - 10', 'D) 10 - 2b'],
      answer: 'C) 2b - 10'
  },
  {
      question: 'A hot dog factory must ensure that its hot dogs are between 6.25 and 6.75 inches in length. If h is the length of a hot dog from this factory, then which of the following inequalities correctly expresses the accepted values of h?',
      options: ['A) |h - 6.25| < 1/4', 'B) |h - 6.25| < 1/2', 'C) |h - 6.5| < 1/4', 'D) |h - 6.5| > 1/4'],
      answer: 'C) |h - 6.5| < 1/4'
  },
  {
      question: '|n - 2| < 5. How many integers n satisfy the inequality above?',
      options: ['A) Six', 'B) Seven', 'C) Eight', 'D) Nine'],
      answer: 'D) Nine'
  },
  {
      question: 'Rolls of tape must be made to a certain length. They must contain enough tape to cover between 400 feet and 410 feet. If l is the length of a roll of tape that meets this requirement, which of the following inequalities expresses the possible values of l?',
      options: ['A) |l - 400| < 10', 'B) |l - 405| > 5', 'C) |l + 405| < 5', 'D) |l - 405| < 5'],
      answer: 'D) |l - 405| < 5'
  },
  {
      question: 'If |4x - 4| = 8 and |5y + 10| = 15, what is the smallest possible value of xy?',
      options: ['A) -20', 'B) -15', 'C) -5', 'D) -1'],
      answer:'B) -15'
  },
  {
      question: 'If |a| < 1, then which of the following must be true? I. 1/a > 1. II. a^2 < 1. III. a > -1.',
      options: ['A) III only', 'B) I and II only', 'C) II and III only', 'D) I, II, and III only'],
      answer: 'C) II and III only'
  },
  {
      question: 'A bakery standardizes muffins to weigh between 1.75 and 2.25 ounces. If m is the weight of a muffin from this bakery, which of the following inequalities expresses the possible values of m?',
      options: ['A) |m - 1.75| < 1/4', 'B) |m - 2| < 1/4', 'C) |m - 2| < 1/2', 'D) |m - 1.75| < 1/2'],
      answer: 'B) |m - 2| < 1/4'
  }
]


 

  var SystemsOfEquationsValues = [
    {   
        question: 'What is the solution (x,y) to the system of equations 3x - 5y = -11 and x = 1 - 3y?',
        options: ['A) (-5,2)', 'B) (-2, 1)', 'C) (1,0)', 'D) (4,-1)'],
        answer: 'B) (-2, 1)'
    },
    {   
        question: 'What is the solution (x, y) to the system of equations y + 2x = 20 and 6x - 5y = 12?',
        options: ['A) (-7,6)', 'B) (-6,7)', 'C) (6,7)', 'D) (7,6)'],
        answer: 'D) (7,6'
    },
    {   
        question: 'If (x,y) is a solution to the system of equations 3x - 4y = 21 and 4x - 3y = 14, what is the value of y - x?',
        options: ['A) -18', 'B) -5', 'C) 5', 'D) 8'],
        answer: 'B) -5'
    },
    {   
        question: 'If (x,y) satisfies the system of equations 2x + 5y = 24 and x + 4y = 15, what is the value of x + y?',
        options: ['A) 7', 'B) 8', 'C) 9', 'D) 10'],
        answer: 'C) 9'
    },
    {   
        question: 'If (x, y) is a solution to the system of equations 3x + y = -2x + 8 and -3x + 2y = -10, what is the value of xy?',
        options: ['A) -16', 'B) -8', 'C) -4', 'D) 4'],
        answer: 'C) -4'
    },
    {   
        question: 'The equations of two lines in the xy-plane are y = ax + b and y = -bx, where a and b are constants. If the two lines intersect at (2,8), what is the value of a?',
        options: ['A) 2', 'B) 4', 'C) 6', 'D) 8'],
        answer: 'C) 6'
    },
    {   
        question: 'A system of two equations and their graphs in the xy-plane are shown above (y = x^2 + 1 and y = x - 1). How many solutions does the system have?',
        options: ['A) Zero', 'B) One', 'C) Two', 'D) Three'],
        answer: 'A) Zero'
    },
    {   
        question: 'What is the solution (x, y) to the system of equations -5x = y + 2 and 2(2x - 1) = 3 - 3y?',
        options: ['A) (-2,8)', 'B) (-1,3)', 'C) (1, -7)', 'D) (3, -17)'],
        answer: 'B) (-1,3)'
    },
    {   
        question: 'How many solutions (x,y) are there to the system of equations 2x - 4y = 8 and x + 2y = 4?',
        options: ['A) Zero', 'B) One', 'C) Two', 'D) More than two'],
        answer: 'B) One'
    },
    {   
        question: 'In the system of equations 2x - 5y = a and bx + 10y = -8, a and b are constants. If the system has infinitely many solutions, what is the value of a?',
        options: ['A) -4', 'B) 1/4', 'C) 4', 'D) 16'],
        answer: 'C) 4'
    },
    {   
        question: 'In the system of equations ax + 2y = 5 and 3x - 6y = 20, a is a constant. If the system has one solution, which of the following can NOT be the value of a?',
        options: ['A) -1', 'B) 3/4', 'C) 1', 'D) 3'],
        answer: 'A) -1'
    },
    {   
      question: 'What is the solution (x,y) to the system of equations 4x - 1/3y = -8 and y = 4x + 16?',
      options: ['A) (-2,8)', 'B) (-1, 12)', 'C) (1,20)', 'D) (3,28)'],
      answer: 'B) (-1, 12)'
  },
  {   
      question: 'According to the system of equations y = 0.5x + 14 and x - y = -18, what is the value of y?',
      options: ['Free response'],
      answer: '10'
  },
  {   
      question: 'In the system of equations 1/3x - 1/6y = 4 and 6x - ny = 8, n is a constant. If the system has no solution, what is the value of n?',
      options: ['A) 1/3', 'B) 1', 'C) 3', 'D) 6'],
      answer: 'C) 3'
  },
  {   
      question: 'How many solutions (x,y) are there to the system of equations 3x - 6y = 15 and -2x + 4y = -10?',
      options: ['A) Zero', 'B) One', 'C) Two', 'D) More than two'],
      answer: 'D) More than two'
  },
  {   
      question: 'In the system of equations mx - 6y = 10 and 2x - ny = 5, n is a constant. If the system has infinitely many solutions, what is the value of m/n?',
      options: ['A) 1/12', 'B) 1/3', 'C) 4/3', 'D) 3'],
      answer: 'C) 4/3'
  },
  {   
      question: 'If (x,y) is the solution to the system of equations y = sqrt(x)+3 and sqrt(4x) - y = 3, what is the value of y?',
      options: ['Free response'],
      answer: '9'
  },
  {   
      question: 'A local supermarket sells jelly in small, medium, and large jars. Sixteen small jars weigh as much as two medium jars and one large jar. Four small jars and one medium jar have the same weight as one large jar. How many small jars have the weight of one large jar?',
      options: ['A) 7', 'B) 8', 'C) 9', 'D) 10'],
      answer: 'B) 8'
  },
  {   
      question: 'On a math test with 30 questions, 5 points are rewarded for each correct answer and 2 points are deducted for each incorrect answer. If James answered all the questions and scored 59 points, solving which of the following systems of equations gives his number of correct answers, x, and his number of incorrect answers, y, on the math test?',
      options: ['A) x+y= 59, 5x-2y = 30', 'B) x+ y= 30, 5x+2y = 59', 'C) x + y = 30, 2x-5y=59', 'D) x+ y= 30, 5x-2y= 59'],
      answer: 'D) x+ y= 30, 5x-2y= 59'
  },
  {   
      question: 'A game of darts rewards points depending on which region is hit. There are two regions, A and B. James throws 3 darts, hitting region A once and region B twice, for a total of 18 points. Oleg also throws 3 darts, but hits regions A twice and region B once for a total of 21 points. How many points are rewarded for hitting region B once?',
      options: ['Free response'],
      answer: '5'
  },
  {   
      question: 'A restaurant has two types of tables, rectangular ones that can each seat 4 people and circular tables that can each seat 8 people. If 144 people are enough to fill all 30 tables at the restaurant, how many rectangular tables does the restaurant have?',
      options: ['A) 12', 'B) 16', 'C) 20', 'D) 24'],
      answer: 'D) 24'
  },
  {   
      question: '[Image] A system of two equations is graphed in the xy-plane. Which of the following is the solution (x,y) to the system?',
      options: ['A) (0, -6)', 'B) (-3, -3)', 'C) (-3/2,-3)', 'D) (-3, -5/2)'],
      answer: 'C) (-3/2,-3)'
  },
  {   
      question: 'If the ordered pairs (x1,y1) and (x2,y2) satisfy the system of equations x^2 - y^2 = 1/12 and x - 2y = 0, what are the values of y1 and y2?',
      options: ['A) -1/2 and 1/2', 'B) -1/sqrt(12) and 1/sqrt(12)', 'C) -1/4 and 1/4', 'D) -1/6 and 1/6'],
      answer: 'D) -1/6 and 1/6'
  },
  {   
      question: 'In the xy-plane, the graph of y = x^2 - 7x + 7 intersects the graph of y = 2x - 1 at the points (1, 1) and (p,q). What is the value of p?',
      options: ['Free response'],
      answer: '8'
  },
  {   
      question: 'If (x,y) is a solution to the system of equations x^2 - 2x = y - 1 and x = y - 11, what is one possible value of y?',
      options: ['Free response'],
      answer: '9 or 16'
  }
]

  var AnglesValues =  [
    {
      question: '[Image Needed] In the figure above, i = 50 and k = 140. What is the value of j?',
      options: ['A) 60', 'B) 70', 'C) 80', 'D) 90'],
      answer: 'D) 90'
    },
    {
      question: '[Image Needed] In the figure above, what is the value of y?',
      options: ['A) 30', 'B) 40', 'C) 50', 'D) 70'],
      answer: 'A) 30'
    },
    {
      question: '[Image Needed] In the figure above, lines l and III are parallel. What is the value of a+ b + c + d?',
      options: ['A) 270', 'B) 360', 'C) 720', 'D) It cannot be determined from the information given'],
      answer: 'B) 360'
    },
    {
      question: '[Image Needed] In the figure above, if r = 40, what is the value of y?',
      options: ['A) 40', 'B) 50', 'C) 80', 'D) 90'],
      answer:'B) 50'
    },
    {
      question: '[Image Needed] In the figure above, lines l and III are parallel. What is x in terms of a and b?',
      options: ['A) a+b', 'B) a-b', 'C) b-a', 'D) 180-a-b'],
      answer: 'A) a+b'
    },
    {
      question: '[Image Needed] In the figure above, what is the value of a + b?',
      options: ['A) 80', 'B) 100', 'C) 110', 'D) 120'],
      answer: 'B) 100'
    },
    {
      question: '[Image Needed] In the figure above, what is the value of x + y?',
      options: ['A) 125', 'B) 180', 'C) 235', 'D) 280'],
      answer: 'C) 235'
    },
    {
      question: '[Image Needed] In the figure above, what is the value of z?',
      options: ['A) 35', 'B) 45', 'C) 55', 'D) 80'],
      answer: 'C) 55'
    },
    {
      question: '[Image Needed] In the figure above, what is the value of x?',
      options: ['A) 60', 'B) 70', 'C) 75', 'D) 80'],
      answer: 'B) 70'
    },
    {
      question: '[Image Needed] In the figure above, what is the value of y?',
      options: ['A) 100', 'B) 130', 'C) 140', 'D) 150'],
      answer: 'D) 150'
    },
    {
      question: '[Image Needed] In the figure above, a rectangle and a quadrilateral overlap. What is the sum of the degree measures of the shaded angles?',
      options: ['A) 360', 'B) 540', 'C) 720', 'D) 900'],
      answer: 'C) 720'
    },
    {
      question: '[Image Needed] A regular hexagon is shown in the figure above. What is the value of x?',
      options: ['A) 15', 'B) 20', 'C) 25', 'D) 30'],
      answer: 'D) 30'
    },
    {
      question: 'In the figure above, lines l and III are parallel. Which of the following must be true? I. a = 3b II. a + b = b + c III. b = 45',
      options: ['A) I only', 'B) I and II only', 'C) II and III only', 'D) I, II, and III'],
      answer: 'D) I, II, and III'
    },
    {
      question: 'In the figure above, what is the value of x + y?',
      options: ['A) 10', 'B) 20', 'C) 30', 'D) 50'],
      answer: 'C) 30'
    },
    {
      question: 'In the figure above, lines l, II, and III are parallel. What is the value of a + b?',
      options: ['Free Response'],
      answer: '260'
    }
  ]


  var TriangleValues = [
    {   
        question: 'The lengths of the sides of a right triangle are x, x - 2, and x + 5. Which of the following equations could be used to find x ?',
        options: ['A) X + X - 2 = X + 5', 'B) x^2 + (x + 5)^2 = (x - 2)^2', 'C) x^2 + (x - 2)^2 = (x + 5)^2', 'D) (x - 2)^2 + (x + 5)^2 = x^2'],
        answer: 'C) x^2 + (x - 2)^2 = (x + 5)^2'
    },
    {   
        question: '[Image Needed] In ΔABC above, what is the length of BC?',
        options: ['Free response'],
        answer: '8'
    },
    {   
        question: '[Image Needed] A square of side length 6 is shown in the figure above. What is the value of x?',
        options: ['A) 3', 'B) 3√2', 'C) 6√2', 'D) 6'],
        answer: 'C) 6√2'
    },
    {   
        question: '[Image Needed] In the figure above, AB || CD. What is the length of AB?',
        options: ['Free response'],
        answer: '8'
    },
    {   
        question: 'Two angles of a triangle have the same measure. If two sides have lengths 15 and 20, what is the greatest possible value of the perimeter of the triangle?',
        options: ['Free response'],
        answer: '55'
    },
    {   
        question: '[Image Needed]What is the area of isosceles triangle MNO above?',
        options: ['Free response'],
        answer: '12'
    },
    {   
        question: '[Image Needed]In the figure above, an equilateral triangle sits on top of a square. If the square has an area of 4, what is the area of the equilateral triangle?',
        options: ['A) √3', 'B) √3/2', 'C) 3/4', 'D) 1'],
        answer: 'A) √3'
    },
    {   
        question: '[Image Needed]In the figure above, the base of a cone has a radius of 6. The cone is sliced horizontally so that the top piece is a smaller cone with a height of 1 and a base radius of 2. What is the height of the bottom piece?',
        options: ['A) 1', 'B) 2', 'C) 3', 'D) 4'],
        answer: 'B) 2'
    },
    {   
        question: '[Image Needed]In the figure above, AB is parallel to CH and DF is parallel to EG. If DE= 1, EH = 3, EC = 2, and HC = 10, what is the length of AD?',
        options: ['Free response'],
        answer: '2.5'
    },
    {   
        question: 'How many radians are in 225° ?',
        options: ['A) 3π/4', 'B) 7π/6', 'C) 5π/4', 'D) 3π/2'],
        answer: 'C) 5π/4'
    },
    {   
        question: '[Image Needed]Triangle ABC above is similar to triangle DEF. What is the perimeter of triangle DEF?',
        options: ['A) 20', 'B) 26.8', 'C) 30', 'D) 36.2'],
        answer: 'C) 30'
    },
    {   
        question: 'In isosceles triangle ABC, AB is the shortest side. If the degree measure of ∠A is a multiple of 10, what is the smallest possible measure of ∠B?',
        options: ['A) 75°', 'B) 70°', 'C) 65°', 'D) 60°'],
        answer: 'C) 65°'
    },
    {   
        question: '[Image Needed]In ΔABC above, ∠CDE= 90° and ∠A= 90°. AB= 9 and AC= 12. If DE= 6, what is the length of CE ?',
        options: ['A) 6', 'B) 8', 'C) 9', 'D) 10'],
        answer: 'D) 10'
    },
    {   
        question: '[Image Needed]Two poles represented by XW and YZ above are 15 feet apart. One is 20 feet tall and the other is 12 feet tall. A rope joins the top of one pole to the top of the other. What is the length of the rope?',
        options: ['A) 12', 'B) 17', 'C) 18', 'D) 19'],
        answer: 'B) 17'
    },
    {   
        question: 'What is the perimeter of the trapezoid above?',
        options: ['A) 100', 'B) 108', 'C) 112', 'D) 116'],
        answer: 'C) 112'
    },
    {   
        question: 'What is the value of x in the triangle above?',
        options: ['Free response'],
        answer: '15'
    },
    {   
        question: 'In the figure above, ABCD is a square of side length 3. If AW = AZ = CX = CY = 1, what is the perimeter of rectangle WXYZ?',
        options: ['A) 3√2', 'B) 4√2', 'C) 6√2', 'D) 8'],
        answer: 'C) 6√2'
    },
    {   
        question: 'Points A, B, and C form a triangle in the xy-plane shown above. What is the measure, in radians, of angle BAC?',
        options: ['A) 1π/6', 'B) 1π/4', 'C) 1π/3', 'D) 1π/2'],
        answer: 'B) 1π/4'
    },
    {   
        question: 'Two parallel lines are shown in the xy-plane above. If AB = 15 and point B has coordinates (11w, 11w), what is the value of w?',
        options: ['A) -6', 'B) -8', 'C) -9', 'D) -12'],
        answer: 'C) -9'
    },
    {   
        question: 'In the figure above, equilateral triangle ABC is inscribed in circle O. What is the measure, in radians, of angle ADB?',
        options: ['A) 2π/3', 'B) 3π/4', 'C) 4π/5', 'D) 5π/6'],
        answer: 'A) 2π/3'
    },
    {   
        question: 'What is the length of DB in the figure above?',
        options: ['A) (2√3)/3', 'B) (2√6)/3', 'C) (4√6)/3', 'D) √3'],
        answer: 'C) (4√6)/3'
    },
    {   
        question: 'In the figure above, circle O is inscribed in the square ABCD. If BO = 2, what is the area of the circle?',
        options: ['A) π/4', 'B) π/2', 'C) π', 'D) 3π/2'],
        answer: 'B) π/2'
    },
    {   
        question: 'In the figure above, the value of x is k, where k is a constant. Which of the following ratios has a value of k?',
        options: ['A) YZ/XZ', 'B) XY/XW', 'C) YZ/XY', 'D) YW/XW'],
        answer: 'A) YZ/XZ'
    },
    {   
      question: 'Equilateral triangle DEF is inscribed in equilateral triangle ABC such that DE || AC. What is the ratio of the area of triangle DEF to the area of ABC?',
      options: ['A) 1:4', 'B) 1:3', 'C) 1:2', 'D) 5:8'],
      answer: 'B) 1:3'
  },
  {   
      question: 'In the figure above, equilateral triangle AED is contained within square ABCD. What is the degree measure of angle BEC?',
      options: ['A) 60°', 'B) 100°', 'C) 120°', 'D) 150°'],
      answer: 'D) 150°'
  },
  {   
      question: 'In the xy-plane above, points A and C lie on OB and BD, respectively. If AC is parallel to the x-axis and has a length of 3, what is the length of BC?',
      options: ['Free response'],
      answer: '3.75'
  },
  {   
      question: 'In the figure above, a semicircle sits on top of a square of side 6. Point A is at the top of the semicircle. What is the length of AB?',
      options: ['A) 3√5', 'B) 7', 'C) 9', 'D) 3√10'],
      answer: 'D) 3√10'
  },
  {   
      question: 'In triangle ABC, AB = BC = 6 and angle ABC = 120°. What is the area of triangle ABC?',
      options: ['A) 2√3', 'B) 4√3', 'C) 6√3', 'D) 9√3'],
      answer: 'D) 9√3'
  },
  {   
      question: 'In the xy-plane above, angle θ is formed by the x-axis and the line segment shown. What is the measure, in radians, of angle θ?',
      options: ['A) 5π/3', 'B) 7π/4', 'C) 9π/5', 'D) 11π/6'],
      answer: 'D) 11π/6'
  },
  {   
      question: 'In the figure above, square DBCE has a side length of 3. If OE = 4, what is the length of AD?',
      options: ['Free response'],
      answer: '3.75'
  },
  {   
      question: 'Square ABCD above has a side length of 12. If BF = 4, what is the length of BE?',
      options: ['A) 3', 'B) 2√2', 'C) 3√2', 'D) 4√2'],
      answer: 'C) 3√2'
  },
  {   
      question: 'In the figure above, AB = 12, AC = 13, and DE = 3. What is the length of AE?',
      options: ['Free response'],
      answer: '7.2'
  },
  {   
      question: 'In the figure above, points B and E lie on AC and DF, respectively, such that BE is parallel to CD. What is the value of x?',
      options: ['A) √6', 'B) 2√2', 'C) 2√3', 'D) 3'],
      answer: 'B) 2√2'
  },
  {   
      question: 'In the figure above, RT = 17 and QS is perpendicular to RT. What is the length of ST to the nearest tenth of a unit?',
      options: ['A) 12.6', 'B) 12.8', 'C) 13.2', 'D) 13.4'],
      answer: 'C) 13.2'
  },
  {   
      question: 'In the figure above, DE is parallel to AC. The perimeter of triangle BDE is at least 12 but no more than 16. If the perimeter, p, of triangle ABC is an integer, what is one possible value of p?',
      options: ['Free response'],
      answer: '30-40'
  }
]


var CircleValues = [
  {
    "question": "In the figure above, the square ABCD is inscribed in a circle. If the radius of the circle is r, what is the length of arc APD in terms of r?",
    "options": ["A) πr/4", "B) πr/2", "C) rπ", "D) πr^2/4"],
    "answer": "B) πr/2"
  },
  {
    "question": "In the figure above, three congruent circles are tangent to each other and have centers that lie on the diameter of a larger circle. If the area of each of these small circles is 9π, what is the area of the large circle?",
    "options": ["A) 36π", "B) 49π", "C) 64π", "D) 81π"],
    "answer": "D) 81π"
  },
  {
    "question": "The circle above has area 36π and is divided into 8 congruent regions. What is the perimeter of one of these regions?",
    "options": ["A) 6 + 1.5π", "B) 6+2π", "C) 12+1.5π", "D) 12 + 2π"],
    "answer": "C) 12+1.5π"
  },
  {
    "question": "Which of the following is an equation of a circle in the xy-plane with center (-2, 0) and an area of 49π?",
    "options": ["A) (x - 2)² + y² = 7", "B) (x + 2)² + y² = 7", "C) (x - 2)² + y² = 49", "D) (x + 2)² + y² = 49"],
    "answer": "D) (x + 2)² + y² = 49"
  },
  {
    "question": "In the figure above, ∠ACB is inscribed in a circle. The length of minor arc AB is what fraction of the circumference of the circle?",
    "options": ["A) 1/3", "B) 1/4", "C) 1/6", "D) 1/12"],
    "answer": "C) 1/6"
  },
  {
    "question": "In the figure above, AC is a diameter of the circle and the length of AB is 1. If the radius of the circle is 1, what is the measure, in degrees, of ∠BAC?",
    "options": ["A) Free Response"],
    "answer": "60"
  },
  {
    "question": "In the figure above, equilateral triangle ABC is inscribed in circle D. If the area of circle D is 36π, what is the length of minor arc AB?",
    "options": ["A) 2π", "B) 3π", "C) 4π", "D) 6π"],
    "answer": "C) 4π"
  },
  {
    "question": "In the figure above, circle C has a radius of 6. If the area of the shaded sector is 10π, what is the measure, in radians, of angle ACB?",
    "options": ["A) 2π/5", "B) 4π/9", "C) 5π/9", "D) 5π/8"],
    "answer": "C) 5π/9"
  },
  {
    "question": "In the figure above, a circle has center C and radius 5. If the measure of central angle ACB is between π/2 and π radians, what is one possible integer value of the length of minor arc AB?",
    "options": ["A) Free Response"],
    "answer": "4-7"
  },
  {
    "question": "In the figure above, four circles, each with radius 4, are tangent to each other. What is the area of the shaded region?",
    "options": ["A) 16 - 4π", "B) 64 - 4π", "C) 64 - 8π", "D) 64 - 16π"],
    "answer": "D) 64 - 16π"
  },
  {
    "question": "The base of a right circular cylinder shown above has a radius of 4. The height is 5. What is the surface area of the cylinder?",
    "options": ["A) 40π", "B) 60π", "C) 72π", "D) 81π"],
    "answer": "C) 72π"
  },
  {
    "question": "In the figure above, circle P and circle U each have a radius of 3 and are tangent to each other. If ∠PHU is equilateral, what is the area of the shaded region?",
    "options": ["A) 10π", "B) 12π", "C) 14π", "D) 15π"],
    "answer": "D) 15π"
  },
  {
    "question": "If the area of the shaded region in the figure above is 24π and the radius of circle O is 6, what is the value of x?",
    "options": ["A) 15", "B) 30", "C) 45", "D) 60"],
    "answer": "B) 30"
  },
  {
    "question": "In the figure above, circle A is tangent to circle B at point O. If the circles each have a radius of 4 and AC is tangent to circle B at point C, what is the area of triangle ABC?",
    "options": ["A) 8", "B) 8√2", "C) 8√3", "D) 16"],
    "answer": "C) 8√3"
  },
  {
    "question": "The equation of a circle in the xy-plane is given above. Which of the following must be true?",
    "options": ["A) II only", "B) III only", "C) I and II only", "D) I, II, and III"],
    "answer": "B) III only"
  }
]

  

  var TrigValues = [
    {
      "question": "If cos 40° = a, what is sin 50° in terms of a?",
      "options": ["A) a", "B) √1 - a²", "C) 90 - a", "D) √2 - a"],
      "answer": "A) a"
    },
    {
      "question": "In a right triangle, one angle measures x such that tan x = 0.75. What is the value of cos x?",
      "options": ["Free Response"],
      "answer": "0.8"
    },
    {
      "question": "For any angle θ, which of the following is equivalent to the expression sin θ + cos(90 - θ) + cos θ + sin(90 - θ)?",
      "options": ["A) 0", "B) 2*sinθ", "C) 2*cosθ", "D) 2*(sinθ + cosθ)"],
      "answer": "D) 2*(sinθ + cosθ)"
    },
    {
      "question": "In right triangle ABC, the measure of ∠C is 90° and AB= 30. If cos A= 2/5, what is the length of AC?",
      "options": ["Free Response"],
      "answer": "25"
    },
    {
      "question": "If tan x = m/n, what is sin x in terms of m and n?",
      "options": ["A) m/√(m² + n²)", "B) n/√(m² + n²)", "C) m/(m² + n²)", "D) m/√(1 + m² + n²)"],
      "answer": "C) m/(m² + n²)"
    },
    {
      "question": "Given that AB = 5 and tan θ = 3/4 in the right triangle above, what is the value of sin θ + cos θ?",
      "options": ["Free Response"],
      "answer": "1.4"
    },
    {
      "question": "If sin x = 0.25, what is the length of BC in the triangle above?",
      "options": ["Free Response"],
      "answer": "12"
    },
    {
      "question": "In the figure above, right triangle ABC is similar to right triangle MNO, with vertices A, B, and C corresponding to vertices M, N, and O, respectively. If tan B = 2.4, what is the value of cos N?",
      "options": ["Free Response"],
      "answer": "5/13"
    },
    {
      "question": "In the equation cos32 = sin(5m - 12), the angle measures are in degrees. If 0° < m < 90°, what is the value of m?",
      "options": ["Free Response"],
      "answer": "14"
    },
    {
      "question": "Right triangle ABC is shown in the xy-plane above. What is the value of cos C?",
      "options": ["A) 8/17", "B) 8/15", "C) 13/15", "D) 15/17"],
      "answer": "D) 15/17"
    },
    {
      "question": "In the figure above, cos(90° - x) = 8/17. What is the value of cos x?",
      "options": ["A) 8/15", "B) 17/15", "C) 8/17", "D) 15/17"],
      "answer": "D) 15/17"
    },
    {
      "question": "In a right triangle, the sine of one of the two acute angles is √3/2. What is the sine of the other acute angle?",
      "options": ["A) 1/2", "B) √3/2", "C) 1/√3", "D) √2/2"],
      "answer": "A) 1/2"
    },
    {
      "question": "In right triangle ABC above, cos x = 3/4. If BC = 2√k, what is the value of k?",
      "options": ["Free Response"],
      "answer": "7"
    },
    {
      "question": "In the figure above, ABC and DBE are right triangles. If DE = 10 and the tangent of angle BAC is 1.25, what is the length of segment BE?",
      "options": ["Free Response"],
      "answer": "12.5"
    },
    {
      "question": "In the figure above, AC is a diameter of the circle. If AC= 1, which of the following gives the area of triangle ABC in terms of θ?",
      "options": ["A) 2/θ", "B) tan(θ)/2", "C) 2*sin(θ)", "D) (sin(θ)*cos(θ))/2"],
      "answer": "D) (sin(θ)*cos(θ))/2"
    },
    {
      "question": "Given that sin θ - cos θ = 0, where θ is the radian measure of an angle, which of the following could be true? I. 0 < 0 < π/2, II. π/2 <0< π, III. π < 0 < 3π/2",
      "options": ["A) I only", "B) II only", "C) I and III only", "D) I, II, and III"],
      "answer": "C) I and III only"
    }
  ]
  
  
  
  
  
  

  var ReadingDataValues = [
    {
      "question": "For four work days, Alex plotted the commute time to work and the commute time from work in the grid above. For which of the four days was the total commute time to and from work the greatest?",
     
      "options": ["A", "B", "C", "D"],
      "answer": "C"
      
    },
    {
      "question": "The graph above shows the voter turnout for each year a congressional election or a presidential election was held. In which two year period was the difference in voter turnout between the congressional election and the presidential election the smallest?",
      "graph": {
        "PointSets":[[[0,70],[2,65],[5,60],[7,62]],[[1,45],[5,48],[8,50],[9,45]]],
        "drawLines":true,
      },
      "options": ["A) 1996 to 1998", "B) 2000 to 2002", "C) 2004 to 2006", "D) 2008 to 2010"],
      "answer": "C) 2004 to 2006"
    },
    {
      "question": "According to the line graph above, ice cream sales were highest both in 2013 and in 2014 during which three month period?",
      "graph": {
        "PointSets":[[[0,1.4],[1,1.65],[2,1.75],[3,1.35],[4,1.4],[5,1.65],[6,1.8],[7,1.4]]],
        "drawLines":true,
        "xAxisLabels":{0: 'Jan-March 13', 1: 'Apr-June 13', 2: 'Jul-Sep 13', 3: 'Oct-Dec 13', 4: 'Jan-Mar 14', 5: 'Apr-Jun 14', 6: 'Jul-Sep 14', 7: 'Oct-Dec 14'}
      },
      "options": ["A) January to March", "B) April to June", "C) July to September", "D) October to December"],
      "answer": "C) July to September"
    },
    {
      "question": "The line graph above shows the monthly precipitation in Kathmandu last year. According to the graph, the total precipitation in September was what percentage of the total precipitation in June?",
      "graph": {
        "PointSets":[[[0,50],[1,125],[2,250],[3,370],[4,350],[5,150],[6,50]]],
        "drawLines":true,
        "xAxisLabels":{0:'Apr', 1:'May', 2:'Jun', 3:'Jul', 4:'Aug', 5:'Sep', 6:'Oct'}
      },
      "options": ["A) 40%", "B) 50%", "C) 60%", "D) 75%"],
      "answer": "C) 60%"
    },
    {
      "question": "Researchers created the graph above to compare their population estimates with the actual populations of different cities in 2010. For which of the cities did the researchers underestimate the population? I. San Diego II. Chicago III. Los Angeles",
      
      "options": ["A) I only", "B) I and II only", "C) II and III only", "D) I, II, and III"],
      "answer": "A) I only"
    },
    {
      "question": "Based on the graph, which of the following best describes the general trend in birth rates in South Korea and Japan from 2006 to 2014?",
      "graph": {
        "PointSets":[[[0,40],[1,38],[2,32],[3,30],[4,20]],[[0,28],[1,25],[2,20],[3,12],[4,5]]],
        "drawLines":true,
        "xAxisLabels":{0:'Apr', 1:'May', 2:'Jun', 3:'Jul', 4:'Aug', 5:'Sep', 6:'Oct'}
      },
      "options": ["A) Each year, birth rates decreased in both South Korea and Japan.", "B) Each year, birth rates increased in both South Korea and Japan.", "C) Each year, birth rates increased in South Korea but decreased in Japan.", "D) Each year, birth rates decreased in South Korea but increased in Japan."],
      "answer": "A) Each year, birth rates decreased in both South Korea and Japan."
    },
    
    {
      "question": "Starting at 9:00 A.M. each day, Musa picks up packages at various locations until his trailer truck reaches its maximum capacity. He then delivers all the packages that he picked up that day. The graph above shows the weight of his truck at different points during the day. What is the maximum weight Musa 1s truck can hold, in tons?",
      "graph": {
        "PointSets":[[[0,16],[1,22],[2,25],[3,30],[4,20],[5,15]]],
        "drawLines":true,
       
      },
      "options": ["A) 14", "B) 16", "C) 24", "D) 30"],
      "answer": "A) 14"
    },
    {
      "question": "Based on the graph above, for which of the following two consecutive years was the percent increase in U.S. annual salt production the same as the percent decrease from 2010 to 2011?",
      "graph": {
        "PointSets":[[[0,20],[1,40],[2,30],[3,15],[4,20],[5,25],[6,35]]],
        "drawLines":true,
        "xAxisLabels":{0:'2009', 1:'2010', 2:'2011', 3:'2012', 4:'2013', 5:'2014', 6:'2015'}
      },
      "options": ["A) 2009 to 2010", "B) 2012 to 2013", "C) 2013 to 2014", "D) 2014 to 2015"],
      "answer": "C) 2013 to 2014"
    },
   
    {
      "question": "The graph above shows the number of units sold in 2015 for five different video game consoles. The prices of consoles A, B, C, D, and E are $100, $150, $200, $250, and $300, respectively. Which of the five consoles generated the most total revenue?",
      "graph": {
        "PointSets":[[[0,250],[1,225],[2,100],[3,125],[4,50]]],
        "drawLines":true,
        "xAxisLabels":{0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E'}
      },
      "options": ["A) A", "B) B", "C) D", "D) E"],
      "answer": "B"
    },
    {
      "question": "The graph above shows the profit of Company X and Company Y in each quarter of last year. In which quarter was Company Xs profit twice Company Ys?",
      "graph": {
        "PointSets":[[[0,8],[1,6],[2,12],[3,20]],[[0,6],[1,4],[2,6],[3,12]]],
        "drawLines":true,
        "xAxisLabels":{0:'Apr', 1:'May', 2:'Jun', 3:'Jul', 4:'Aug', 5:'Sep', 6:'Oct'},
        "legend":["Company X", "Company Y"]
      },
      "options": ["A) 1", "B) 2", "C) 3", "D) 4"],
      "answer": "C) 3"
    },
    {
      "question": "The graph above shows the health care spending of four different states, Alabama (AL), AK (Alaska), AZ (Arizona), and AR (Arkansas) in 2013. Based on the graph, which state had the highest combined hospital care and prescription drug spending in 2013?",
      "graph": {
        "PointSets":[[[0,15],[1,7.5],[2,12.5],[3,10]],[[0,2.5],[1,7.5],[2,7.5],[3,5]]],
        "drawLines":true,
        "xAxisLabels":{0:'AL', 1:'AK', 2:'AZ', 3:'AR'},
        "legend":["Hospital Care", "Prescription Drug"]
      },
      "options": ["A) Alabama", "B) Alaska", "C) Arizona", "D) Arkansas"],
      "answer": "C) Arizona"
    },
    {
      "question": "Jeremy works at a call center. The graph above shows the average number of calls he answered per hour during his 7-hour work shift. What is the total number of calls he answered during his shift?",
      "graph": {
        "PointSets":[[[0,4],[2,4],[2,8],[3,8],[4,8],[5,8],[5,6],[5,7]]],
        "drawLines":true,
  
      },
      "options": ["Free Response"],
      "answer": "44"
    },
  
    {
      "question": "The graph above shows the gas mileage for Car X at different speeds. Based on the graph, how many gallons of gas are needed to drive Car X for 5 hours at",
      "graph": {
        "PointSets":[[[0,25],[15,15],[30,25],[40,40],[50,50],[60,55],[70,50],[80,40]]],
        "drawLines":true,
  
      },
      "options": ["Free Response"],
      "answer": "6"
    }
  ]

  var ProbabilityValues = [
    {
        "question": "A district police department records driving violations by type and vehicle in the table above. According to the record, which of the following is closest to the proportion of stop sign violations committed by truck drivers?",
        "table":{
          "columns": [
            "Vehicle",
            "Speeding",
            "Stop sign",
            "Parking",
            "Total"
          ],
          "data": [
            [
              "Truck",
              68,
              39,
              17,
              124
            ],
            [
              "Car",
              83,
              51,
              26,
              160
            ],
            [
              "Total",
              151,
              90,
              43,
              284
            ]
          ]
        },
        "answers": ["A) 0.137", "B) 0.315", "C) 0.433", "D) 0.567"],
        "answer": "C) 0.433"
    },
    {
        "question": "A car manufacturer produces cars in red, blue, black, white, and silver. The incomplete table above shows the percentage of cars it produces in each color. If a car from the manufacturer is chosen at random, what is the probability that the car's color is red or silver?",
        "table":{
          "columns": [
            "Color",
            "Red",
            "Blue",
            "Black",
            "White",
            "Silver"
          ],
          "data": [
            [
              "Color",
              20,
              33,
              10,
              14,
              3
            ]
          ]
        },
        "answers": ["A) 23%", "B) 33%", "C) 37%", "D) 43%"],
        "answer": "D) 43%"
    },
    {
        "question": "Based on the table, if a plumber in California is chosen at random, which of the following is closest to the probability that the plumber has at least four years of experience?",
        "table":{
          "columns": [
            "Occupation",
            "Experience",
            "Count",
            "Total"
          ],
          "data": [
            [
              "Painter",
              1,
              22491,
              126494
            ],
            [
              "Roofer",
              1,
              23908,
              146344
            ],
            [
              "Welder",
              1,
              27062,
              169240
            ],
            [
              "Plumber",
              1,
              28637,
              183885
            ],
            [
              "Carpenter",
              1,
              24396,
              169409
            ],
            [
              "Total",
              1,
              126494,
              828344
            ]
          ]
        },
        "answers": ["A) 0.10", "B) 0.22", "C) 0.25", "D) 0.46"],
        "answer": "D) 0.46"
    },
    {
        "question": "If a worker with at least four years of experience is chosen at random from those included in the table, which of the following is closest to the probability that the person is a plumber?",
        "table":{
          "columns": [
            "Occupation",
            "Experience",
            "Count",
            "Total"
          ],
          "data": [
            [
              "Painter",
              1,
              22491,
              126494
            ],
            [
              "Roofer",
              1,
              23908,
              146344
            ],
            [
              "Welder",
              1,
              27062,
              169240
            ],
            [
              "Plumber",
              1,
              28637,
              183885
            ],
            [
              "Carpenter",
              1,
              24396,
              169409
            ],
            [
              "Total",
              1,
              126494,
              828344
            ]
          ]
        },
        "answers": ["A) 0.10", "B) 0.22", "C) 0.25", "D) 0.46"],
        "answer": "D) 0.46"
    },
    {
        "question": "The table above shows the results of a baseball team, categorized by whether the team was considered the favorite (expected to win) in the game or the underdog (expected to lose). What fraction of the games in which the team was considered the underdog did the team win?",
        "table":{
          "columns": [
            "Status",
            "Won",
            "Lost",
            "Total"
          ],
          "data": [
            [
              "Underdog",
              10,
              35,
              45
            ],
            [
              "Favorite",
              25,
              5,
              30
            ],
            [
              "Total",
              35,
              40,
              75
            ]
          ]
        },
        "answers": ["A) 2/5", "B) 2/7", "C) 2/9", "D) 2/15"],
        "answer": "C) 2/9"
    },
    {
        "question": "A store manager summarizes the number of box spring and mattress units sold over four weeks at a bedding store in the incomplete table above. Weeks 2 and 3 accounted for what fraction of all box spring units sold?",
        "table":{
          "columns": [
            "Item",
            "Week 1",
            "Week 2",
            "Week 3",
            "Week 4",
            "Total"
          ],
          "data": [
            [
              "Box springs",
              35,
              40,
              55,
              77,
              207
            ],
            [
              "Mattresses",
              47,
              61,
              68,
              198,
              366
            ],
            [
              "Total",
              82,
              101,
              123,
              275,
              573
            ]
          ]
        },
        "answers": ["A) 2/15", "B) 4/15", "C) 2/5", "D) 4/5"],
        "answer": "C) 2/5"
    },
    {
        "question": "The table above shows the distribution of medals awarded at the 2012 London Summer Olympics. If an Olympic medalist is to be chosen at random from one of the countries in the table, which country gives the highest probability of selecting a Bronze medalist?",
        "table":{
          "columns": [
            "Country",
            "Gold",
            "Silver",
            "Bronze",
            "Total"
          ],
          "data": [
            [
              "USA",
              46,
              29,
              -29,
              104
            ],
            [
              "China",
              38,
              27,
              23,
              88
            ],
            [
              "Russia",
              24,
              26,
              32,
              82
            ],
            [
              "Great Britain",
              29,
              17,
              19,
              65
            ],
            [
              "Germany",
              11,
              19,
              14,
              44
            ],
            [
              "Total",
              148,
              118,
              117,
              383
            ]
          ]
        },
        "answers": ["A) USA", "B) Russia", "C) Great Britain", "D) Germany"],
        "answer": "B) Russia"
    },
    {
        "question": "All fish can be categorized as either cartilaginous or bony. The data in the table above were produced by biologists studying the fish species in the Philippines and New Caledonia. Assuming that each fish species has an equal chance of being caught, the probability of catching a cartilaginous fish in the Philippines is how much greater than the probability of catching one in New Caledonia?",
        "table":{
          "columns": [
            "Type",
            "Country",
            "Count"
          ],
          "data": [
            [
              "Cartilaginous",
              "Philippines",
              400
            ],
            [
              "Cartilaginous",
              "New Caledonia",
              300
            ],
            [
              "Bony",
              800
            ],
            [
              "Bony",
              1200
            ]
          ]
        },
        "answers": ["A) 2/15", "B) 1/4", "C) 3/10", "D) 1/3"],
        "answer": "A) 2/15"
    },
    {
        "question": "The incomplete table above summarizes the number of wildfires that occurred in two regions of Africa in 2014 by cause. Based on the table, what fraction of all wildfires in East Africa in 2014 were human-caused?",
        "table":{
          "columns": [
            "Lightning-caused fires",
            "Human-caused fires",
            "Total"
          ],
          "data": [
            [
              "East Africa",
              "",
              65,
              ""
            ],
            [
              "South Africa)",
              30,
              "",
              ""
            ],
            [
              "Total",
              "",
              135,
              160
            ],
            
          ]
        },
        "answers": ["A) 11/24", "B) 13/27", "C) 13/24", "D) 11/15"],
        "answer": "C) 13/24"
    },
    {
        "question": "A manufacturer uses two assembly lines to produce refrigerators. The results of each assembly line's quality control are shown in the table above, If a refrigerator from the manufacturer turns out to be defective, what is the probability that the refrigerator was produced by Assembly Line A?",
        "table":{
          "columns": [
            "Assembly Line",
            "Defective",
            "Not defective",
            "Total"
          ],
          "data": [
            [
              "A",
              300,
              5700,
              6000
            ],
            [
              "B",
              500,
              3500,
              4000
            ],
            [
              "Total",
              800,
              9200,
              11000
            ]
          ]
        },
        "answers": ["A) 5%", "B) 37.5%", "C) 60%", "D) 62.5%"],
        "answer": "B) 37.5%"
    },
    {
        "question": "The table above summarizes the distribution of living situations for residences in a neighborhood. If a duplex in the neighborhood is to be inspected at random, what is the probability that the residence is occupied by no more than 2 family members?",
        "table":{
          "columns": [
            "Family members",
            "Apartment",
            "Bungalow",
            "Single residence",
            "Total"
          ],
          "data": [
            [
              "1",
              10,
              22,
              3,
              35
            ],
            [
              "2",
              20,
              12,
              13,
              45
            ],
            [
              "3",
              8,
              8,
              12,
              28
            ],
            [
              "4 or more",
              8,
              4,
              18,
              30
            ],
            [
              "Total",
              46,
              46,
              46,
              138
            ]
          ]
        },
        "answers": ["A) 2/23", "B) 6/23", "C) 17/69", "D) 17/23"],
        "answer": "D) 17/23"
    },
    {
        "question": "The data in the table above were produced by ecologists who collected soil samples from two areas to determine whether they were contaminated with Chemical A. Based on the table, what proportion of the soil samples were contaminated with Chemical A?",
        "table":{
          "columns": [
            "Area",
            "Number of soil samples",
            "Percent of samples with Chemical A"
          ],
          "data": [
            [
              "1",
              450,
              8
            ],
            [
              "2",
              550,
              6
            ]
          ]
        },
        "answers": ["A) 0.067", "B) 0.069", "C) 0.070", "D) 0.072"],
        "answer": "B) 0.069"

    },
    {
        "question": "The table above shows the results of a test that is designed to give a positive indicator when patients are infected with a certain virus and a negative indicator when they are not infected. According to the results, what is the probability that the test gives the incorrect indicator?",
        "table":{
          "columns": [
            "Test",
            "Has virus",
            "Does not have virus",
            "Total"
          ],
          "data": [
            [
              "Negative",
              30,
              550,
              580
            ],
            [
              "Positive",
              370,
              50,
              420
            ],
            [
              "Total",
              400,
              600,
              1000
            ]
          ]
        },
        "answers": ["A) 5%", "B) 8%", "C) 10%", "D) 12%"],
        "answer": "B) 8%"
    },
    {
        "question": "The incomplete table above shows the results of a study in which doctors gave patients experiencing back pain either a drug or a sugar pill. Three times as many patients were cured from the drug than from the sugar pill. For every 2 patients cured by the sugar pill, 5 patients were not cured by the sugar pill. According to the results, if a patient is given a sugar pill, what is the probability that the person will be cured of back pain?",
        "table":{
          "columns": [
            "Cured",
            "Not cured",
            "Total"
          ],
          "data": [
            [
              "Drug",
              90,
              25
            ],
            [
              "Sugar Pill",
              "",
              ""
            ]
          ]
        },
        "answers": ["A) 1/4", "B) 2/7", "C) 3/10", "D) 2/5"],
        "answer": "B) 2/7"
    },
    {
        "question": "The principal of a school is deciding whether to spend a budget surplus on new gym equipment or computers. The incomplete table above summarizes the preferences among junior and senior class students. If a senior from the school is chosen at random, the probability that the student prefers gym equipment is 1/3. How many seniors are at the school?",
        "table":{
          "columns": [
            "Gym equipment",
            "Computers",
            "Total"
          ],
          "data": [
            [
              "Juniors",
              240,
              300,
              540
            ],
            [
              "Seniors",
              "",
              160,
              ""
            ],
            [
              "Total",
              "",
              460,
              ""
            ]
          ]
        },
        "answers": ["Free Response"],
        "answer": "240"
    }
]

  var Statistics1Values = [
    {
      "question": "The average height of 14 students in one class is 63 inches. The average height of 21 students in another class is 68. If the two classes are combined, what is the average height, in inches, of the students in the combined class?",
      "options": ["A) 64.5", "B) 65", "C) 66", "D) 66.5"],
      "answer": "C) 66"
    },
    {
      "question": "Kristie has taken five tests in science class. The average of all five of Kristie's test scores is 94. The average of her last three test scores is 92. What is the average of her first two test scores?",
      "options": ["A) 95", "B) 96", "C) 97", "D) 98"],
      "answer": "C) 97"
    },
    {
      "question": "A food company hires an independent research agency to determine its product's shelf life, the length of time it may be stored before it expires. Using a random sample of 40 units of the product, the research agency finds that the product's shelf life has a range of 3 days. Which of the following must be true about the units in the sample?",
      "options": [
        "A) All the units expired within 3 days.",
        "B) The unit with the longest shelf life took 3 days longer to expire than the unit with the shortest shelf life.",
        "C) The mean shelf life of the units is 3 more than the median.",
        "D) The median shelf life of the units is 3 more than the mean."
      ],
      "answer": "B) The unit with the longest shelf life took 3 days longer to expire than the unit with the shortest shelf life."
    },
    {
      "question": "The histogram above shows the number of books read last year by 20 editors at a publishing company. Which of the following could be the median number of books read by the 20 editors?",
      "graph": {
        "PointSets":[[[0,3],[1,5],[2,3],[3,4],[4,4],[5,4]]],
        "drawLines":true,
        "xAxisLabels":{0: '1-5', 1: '6-10', 2: '11-15', 3: '16-20', 4: '21-25', 5: '26-30'},
        "type": "histogram"
      },
      "options": ["A) 10", "B) 12", "C) 16", "D) 23"],
      "answer": "B) 12"
    },
    
    {
      "question": "The dotplot above shows the distribution of ages for 24 winners of the Miss World beauty pageant at the time they were crowned. Based on the data, which of the following is closest to the average (arithmetic mean) age of the winning Miss World pageant contestant?",
      "graph": {
        "PointSets":[[[0,6],[1,3],[2,5],[3,4],[4,2],[5,3],[6,1]]],
        "drawLines":true,
        "xAxisLabels":{0: '18', 1: '19', 2: '20', 3: '21', 4: '22', 5: '23', 6: '24'},
        "type": "histogram"
      },
      "options": ["A) 19", "B) 20", "C) 21", "D) 22"],
      "answer": "B) 20"
    },
    {
      "question": "The table above gives the distribution of low temperatures for a city over 28 days. What is the median low temperature, in degrees Fahrenheit (°F), of the city for these 28 days?",
      "table":{
        "columns": [
          "Temperature (°F)",
          "Frequency"
        ],
        "data": [
          [
            60,
            3
          ],
          [
            61,
            4
          ],
          [
            63,
            4
          ],
          [
            67,
            10
          ],
          [
            70,
            7
          ]
        ]
      },
      "options": ["Free Response"],
      "answer": "67"
    },
    {
      "question": "The table below shows the number of locks for 10 canals in France. Removing which of the following two canals from the data would result in the greatest decrease in the standard deviation of the number of locks in each canal?",
      "table":{
        "columns": [
          "Name",
          "# Locks"
        ],
        "data": [
          [
            "Aisne",
            27
          ],
          [
            "Alsace",
            25
          ],
          [
            "Rhone",
            5
          ],
          [
            "Centre",
            30
          ],
          [
            "Garonnc",
            23
          ],
          [
            "Lalinde",
            27
          ],
          [
            "Midi",
            32
          ],
          [
            "Oise",
            27
          ],
          [
            "Vosgcs",
            93
          ],
          [
            "Sambre",
            29
          ]
        ]
      },
      "options": ["A) Aisne and Lalinde", "B) Alsace and Garonne", "C) Centre and Midi", "D) Rhone and Vosges"],
      "answer": "D) Rhone and Vosges"
    },
    {
      "question": "A shoe store surveyed a random sample of 50 customers to better estimate which shoe sizes should be kept in stock. The store found that the median shoe size of the customers in the sample is 10 inches. Which of the following statements must be true?",
      "options": [
        "A) The sum of all the shoe sizes in the sample is 500 inches.",
        "B) The average of the smallest shoe size and the largest shoe size in the sample is 10 inches.",
        "C) The difference between the smallest shoe size and the largest shoe size in the sample is 10 inches.",
        "D) At least half of the customers in the sample have shoe sizes greater than or equal to 10 inches."
      ],
      "answer": "D) At least half of the customers in the sample have shoe sizes greater than or equal to 10 inches."
    },
    
    {
      "question": "The bar chart above shows the distribution of weights (to the nearest pound) for 19 kayaks made by Company A and 19 kayaks made by Company B. Which of the following correctly compares the median weight of the kayaks made by each company?",
      "graph": {
        "PointSets":[[[0,7],[1,2],[2,3],[3,6],[4,1]],[[0,1],[1,3],[2,6],[3,7],[4,2]]],
        "drawLines":true,
        "xAxisLabels":{0: '45', 1: '46' , 2: '47', 3: '48', 4: '49'},
        "legend":["Company A", "Company B"]
      },
      "options": [
        "A) The median weight of the kayaks made by Company A is smaller.",
        "B) The median weight of the kayaks made by Company B is smaller.",
        "C) The median weight of the kayaks is the same for both companies.",
        "D) The relationship cannot be determined from the information given."
      ],
      "answer": "A) The median weight of the kayaks made by Company A is smaller."
    },
    {
      "question": "The table above shows the scores for Jay's first seven math quizzes. Which of the following are true about his scores? I. The mode is greater than the median.  II. The median is greater than the mean. III. The range is greater than 20.",
      "table":{
        "columns": [
          "Quiz",
          "Score"
        ],
        "data": [
          [
            "1",
            87
          ],
          [
            "2",
            75
          ],
          [
            "3",
            90
          ],
          [
            "4",
            83
          ],
          [
            "5",
            98
          ],
          [
            "6",
            87
          ],
          [
            "7",
            91
          ]
        ]
      },
      "options": ["A) II only", "B) III only", "C) II and III", "D) I, II, and III"],
      "answer": "B) III only"
    },
    {
      "question": "The graph above shows the frequency distribution of a list of randomly generated integers between 5 and 10. Which of the following correctly gives the mean and the range of the list of integers?",
      
      "graph": {
        "PointSets":[[[5,2],[6,6],[8,10], [9,2],[10,1]]],
        "drawLines":true,
      
        "type": "histogram"
      },
      "options": ["A) Mean = 7.6, Range = 4", "B) Mean = 7.6, Range = 5", "C) Mean = 8.2, Range = 4", "D) Mean = 8.2, Range = 5"],
      "answer": "B) Mean = 7.6, Range = 5"
    },
    {
      "question": "The table above lists the number of calories in each of Mary's last 10 meals. If a 900-calorie meal that she had today is added to the values listed, which of the following statistical measures of the data will not change?",
      "table":{
        "columns": [
          "Calories in Meals"
        ],
        "data": [
          [
            500,
            500
          ],
          [
            550,
            550
          ],
          [
            520,
            550,
            550
          ],
          [
            600,
            600,
            900
          ]
        ]
      },
      "options": ["A) I. Median and II. Mode only", "B) I. Median and III. Range only", "C) II. Mode and III. Range only", "D) I. Median, II. Mode, and III. Range"],
      "answer": "D) I. Median, II. Mode, and III. Range"
    },
    {
      "question": "The bar chart above shows the number of films shown in class over the past year for 19 classes in School A and 15 classes in School B. Which of the following correctly compares the mean and median number of films shown in each class for the two schools?",
      "graph": {
        "PointSets":[[[1,2],[2,3],[3,4],[4,5],[5,5]],[[1,1],[2,2],[3,3],[4,4],[5,5]]],
        "drawLines":true,
        "type": "histogram",
        "legend":["School A", "School B"]
      },
      "options": [
        "A) The mean and median number of films shown in each class are both greater in School A.",
        "B) The mean and median number of films shown in each class are both greater in School B.",
        "C) The mean number of films shown in each class is greater in School A, but the median is the same in both schools.",
        "D) The mean number of films shown in each class is greater in School B, but the median is the same in both schools."
      ],
      "answer":'D) The mean number of films shown in each class is greater in School B, but the median is the same in both schools.'
    },
    {
      "question": "The dotplot above gives the gas mileage (in miles per gallon) of 15 different cars. If the dot representing the car with the greatest gas mileage is removed from the dotplot, what will happen to the mean, median, and standard deviation of the new data set?",
      "graph": {
        "PointSets":[[[21,2],[22,3],[23,5],[24,3],[25,1],[30,1]]],
        "drawLines":true,
        "type": "histogram"
       
        
      },
      "options": ["A) Only the mean will decrease.", "B) Only the mean and standard deviation will decrease.", "C) Only the mean and median will decrease.", "D) The mean, median, and standard deviation will decrease."],
      "answer": "B) Only the mean and standard deviation will decrease."
    },
    {
      "question": "The table above lists the amounts of snowfall, to the nearest inch, experienced by 18 different cities in the past year. The outlier measurement of 90 inches is an error. Of the mean, median, and range of the values listed, which will change the most if the 90-inch measurement is replaced by the correct measurement of 20 inches?",
      "table":{
        "columns": [
          "Snowfall (in inches)"
        ],
        "data": [
          [
            45,
            48,
            49,
            50,
            52,
            54
          ],
          [
            55,
            56,
            57,
            57,
            57,
            58,
            59
          ],
          [
            60,
            60,
            61,
            61,
            65,
            90
          ]
        ]
      },
      "options": ["A) Mean", "B) Median", "C) Range", "D) None of them will change."],
      "answer": "A) Mean"
    },
    
    // Add the rest of the data similarly...
  ]

  var Statistics2Values = [
    {
      "question": "The scatterplot above shows the relationship between age, in years, and shoe size for 24 males between 10 and 20 years old. The line of best fit is also shown. Based on the data, how many 19 year old males had a shoe size greater than the one predicted by the line of best fit?",
      "options": ["A) 1", "B) 2", "C) 3", "D) 4"],
      "answer": "B) 2"
    },
    {
      "question": "In a survey of 400 seniors, x percent said that they plan on majoring in physics. One university has used this data to estimate the number of physics majors it expects for its entering class of 3,300 students. If the university expects 66 physics majors, what is the value of x?",
      "options": ["Free Response"],
      "answer": "2"
    },
    {
      "question": "The scatterplot above shows the number of traffic lights in 15 towns and the average weekly number of traffic light violations that occur in each town. The line of best fit is also shown. Based on the line of best fit, which of the following is the predicted average weekly number of traffic light violations in a town with 75 traffic lights?",
      "options": ["A) 40", "B) 50", "C) 55", "D) 60"],
      "answer": "C) 55"
    },
    {
      "question": "A university wants to determine the dietary preferences of the students in its freshman class. Which of the following survey methods is most likely to provide the most valid results?",
      "options": ["A) Selecting a random sample of 600 students from the university", "B) Selecting a random sample of 300 students from the university's freshman class", "C) Selecting a random sample of 600 students from the university's freshman class", "D) Selecting a random sample of 600 students from one of the university's freshman dining halls"],
      "answer": "C) Selecting a random sample of 600 students from the university's freshman class"
    },
    {
      "question": "Two candidates are running for governor of a state. A recent poll reports that out of a random sample of 250 voters, 110 support Candidate A and 140 support Candidate B. An estimated 500,000 state residents are expected to vote on election day. According to the poll, Candidate B is expected to receive how many more votes than Candidate A?",
      "options": ["A) 60,000", "B) 130,000", "C) 220,000", "D) 280,000"],
      "answer": "A) 60,000"
    },
    {
      "question": "Shopping time refers to the time a customer spends in one store. The scatterplot above shows the average shopping time, in minutes, of customers at 26 different stores offering various discounts. The line of best fit is also shown. Which of the following is the best interpretation of the meaning of the y-intercept of the line of best fit?",
      "options": ["A) The predicted average shopping time, in minutes, of customers at a store offering no discount", "B) The predicted average shopping time, in minutes, of customers at a store offering a 50% discount", "C) The predicted increase in the average shopping time, in minutes, for each one percent increase in the store discount", "D) The predicted average number of customers at a store offering no discount"],
      "answer": "A) The predicted average shopping time, in minutes, of customers at a store offering no discount"
    },
    {
      "question": "The scatterplot above shows the relationship between revenue and advertising expenses for 16 companies. The line of best fit is also shown. Which of the following is the best interpretation of the meaning of the slope of the line of best fit?",
      "options": ["A) The expected increase in revenue for every one dollar increase in advertising expenses", "B) The expected increase in revenue for every one thousand dollar increase in advertising expenses", "C) The expected increase in advertising expenses for every one thousand dollar increase in revenue", "D) The expected revenue of a company that has no advertising expenses"],
      "answer": "A) The expected increase in revenue for every one dollar increase in advertising expenses"
    },
    {
      "question": "The scatterplot above plots the lengths of 15 movies against their box office sales. The line of best fit is also shown. Which of the following is the best interpretation of the meaning of the slope of the line of best fit?",
      "options": ["A) The expected decrease in box office sales per minute increase in movie length", "B) The expected increase in box office sales per minute increase in movie length", "C) The expected decrease in box office sales per 10-minute increase in movie length", "D) The expected increase in box office sales per 10-minute increase in movie length"],
      "answer": "B) The expected increase in box office sales per minute increase in movie length"
    },
    {
      "question": "In a psychological study, researchers asked participants to each complete a difficult task for a cash prize, the amount of which varied from participant to participant. The results of the study, as well as the line of best fit, are shown in the scatterplot above. Which of the following is the best interpretation of the meaning of the y-intercept of the line of best fit?",
      "options": ["A) The expected decrease in the number of mistakes made per dollar increase in the cash prize", "B) The expected increase in the number of mistakes made per dollar increase in the cash prize", "C) The expected dollar amount of the cash prize required for a person to complete the task with 0 mistakes", "D) The expected number of mistakes a person makes in completing the task when no cash prize is offered"],
      "answer": "D) The expected number of mistakes a person makes in completing the task when no cash prize is offered"
    },
    {
      "question": "The scatterplot above shows the fat content and calorie counts of 8 different cups of ice cream. Based on the line of best fit to the data shown, what is the expected increase in the number of calories for each additional gram of fat in a cup of ice cream?",
      "options": ["A) 5", "B) 8", "C) 20", "D) 40"],
      "answer": "B) 8"
    },
    {
      "question": "A record of driving violations by type and vehicle is shown below. If the data is used to estimate driving violation information about 2,000 total violations in a certain state, which of the following is the best estimate of the number of speeding violations committed by cars in the state?",
      "options": ["A) 479", "B) 585", "C) 1063", "D) 1099"],
      "answer": 'B) 585'
    },
    {
      "question": "The scatterplot above shows the amount of nitrogen fertilizer applied to 8 oat fields and their yields. The Line of best fit is also shown. Which of the following is closest to the amount of nitrogen applied, in pounds per acre, to the oat field whose yield is best predicted by the line of best fit?",
      "options": ["A) 200", "B) 350", "C) 400", "D) 450"],
      "answer": "B) 350"
    },
    {
      "question": "The scatterplot above shows the distribution of seats for the restaurants in 7 different mall food courts. The line of best fit is also shown. According to the data, what is the total number of seats at the food court represented by the data point that is farthest from the line of best fit?",
      "options": ["A) 200", "B) 240", "C) 320", "D) 560"],
      "answer": "D) 560"
    },
    {
      "question": "Researchers must conduct an experiment to see whether a new vaccine is effective in relieving certain allergies. They have selected a random sample of 100 allergy patients. Some of the patients are assigned to the new vaccine while the rest are assigned to the traditional treatment. Which of the following methods of assigning each patient's treatment is most likely to lead to a reliable conclusion about the effectiveness of the new vaccine?",
      "options": ["A) Females are assigned to the new vaccine and males to the traditional treatment", "B) Patients are assigned to the new vaccine or the traditional treatment according to their choice", "C) Patients are randomly assigned to the new vaccine or the traditional treatment", "D) Patients with severe allergies are assigned to the new vaccine and those with mild allergies to the traditional treatment"],
      "answer": "D) Patients with severe allergies are assigned to the new vaccine and those with mild allergies to the traditional treatment"
    },
    {
      "question": "A basketball manufacturer selects a random sample of its basketballs each week to ensure a consistent air pressure within them is maintained. In Week 1, the sample had a mean air pressure of 8.2 psi (pounds per square inch) and a margin of error of 0.1 psi. In Week 2, the sample had a mean air pressure of 7.7 psi and a margin of error of 0.3 psi. Based on these results, which of the following is a reasonable conclusion?",
      "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
      "answer": "C) Option 3"
    },
    {
      "question": "A student is assigned to conduct a survey to determine the mean number of servings of vegetables eaten by a certain group of people each day. The student has not yet decided which group of people will be the focus of this survey. Selecting a random sample from which of the following groups would most likely give the smallest margin of error?",
      "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
      "answer": "D) Option 4"
    },
    {
      "question": "The length of a blue-spotted salamander's tail can be used to estimate its age. A biologist selects 80 blue-spotted salamanders at random and finds that the average length of their tails has a 95% confidence interval of 5 to 6 inches. Which of the following conclusions is the most appropriate based on the confidence interval?",
      "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
      "answer": "C) Option 3"
    },
    {
      "question": "An economist conducted research to determine whether there is a relationship between the price of food and population density. He collected data from a random sample of 100 U.S. cities and found significant evidence that the price of food is lower in places with a high population density. Which of the following conclusions is best supported by these results?",
      "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
      "answer": "B) Option 2"
    }
  ]

  var VolumeValues = [
    {
      "question": "In the figure above, a cylindrical block of wood is sliced into two pieces as shown by the dashed curve. What is the volume of the top piece in cubic centimeters?",
      "options": [
        "A) 10π",
        "B) 15π",
        "C) 20π",
        "D) 40π"
      ],
      "answer": "A) 10π"
    },
    {
      "question": "James wants to cover a rectangular box with wrapping paper. The box has a square base with an area of 25 square inches. The volume of the box is 100 cubic inches. How many square inches of wrapping paper will James need to exactly cover all faces of the box, including the top and the bottom?",
      "options": [
        "A) 120",
        "B) 130",
        "C) 150",
        "D) 160"
      ],
      "answer": "B) 130"
    },
    {
      "question": "What is the volume of a cube with surface area 24a^2 ?",
      "options": [
        "A) 4*a^2",
        "B) 8*a^2",
        "C) 8*a^3",
        "D) 16*a^3"
      ],
      "answer": "C) 8*a^3"
    },
    {
      "question": "A cylindrical water tank with a base radius of 4 feet and a height of 6 feet can be filled in 3 hours. At that rate, how many hours will it take to fill a cylindrical water tank with a base radius of 6 feet and a height of 8 feet?",
      "options": [
        "A)4.5",
        "B) 6",
        "C) 7.5",
        "D) 9"
      ],
      "answer": "D) 9"
    },
    {
      "question": "A clay brick in the shape of a right rectangular prism has a length of 6 inches, a width that is 25% greater than its length, and a height that is 2 inches shorter than its length. The brick has a mass of 5.85 kilograms. What is the density, in grams per cubic inch, of the brick?",
      "options": [
        "Free Response"
      ],
      "answer": "32.5"
    },
    {
      "question": "A container in the shape of a right circular cylinder shown above is just large enough to fit exactly 3 tennis balls each with a radius of 2 inches. If the container were emptied out and filled to the top with water, what would be the volume of water, in cubic inches, held by the container?",
      "options": [
        "A) 16π",
        "B) 24π",
        "C) 32π",
        "D) 48π"
      ],
      "answer": "D) 48π"
    },
    {
      "question": "An aquarium has an 80 inch by 25 inch rectangular base and a height of 30 inches. The aquarium is filled with water to a depth of 20 inches. If a solid block with a volume of 5,000 in3 is completely submerged in the aquarium, by how many inches does the water level rise?",
      "options": [
        "Free Response"
      ],
      "answer": "2.5"
    },
    {
      "question": "A cube with a side length of 5 inches is painted black on all six faces. The entire cube is then cut into smaller cubes with sides of 1 inch. How many small cubes do not have any black paint on them?",
      "options": [
        "A) 27",
        "B) 31",
        "C) 36",
        "D) 48"
      ],
      "answer": "A) 27"
    },
    {
      "question": "Yuna finds a box with an open top. Each side is 8 inches long. If she fills this box with identical 2 in by 2 in by 2 in cubes, how many of these cubes will be touching the box?",
      "options": [
        "A) 40",
        "B) 48",
        "C) 52",
        "D) 56"
      ],
      "answer": "C) 52"
    },
    {
      "question": "A 3 x 4 x 5 solid block is made up of 1 X 1 x 1 unit cubes. The outside surface of the block is painted black. How many unit cubes have exactly one face painted black?",
      "options": [
        "A) 16",
        "B) 18",
        "C) 20",
        "D) 22"
      ],
      "answer": "D) 22"
    },
    {
      "question": "A right circular cone has a volume of 6πa^3 cubic centimeters, where a is a positive constant. If the height of the cone is 2n^2 centimeters, which of the following gives the radius, in centimeters, of the base of the cone in terms of n ?",
      "options": [
        "A) a*√3",
        "B) 3*a",
        "C) 3*a^2",
        "D) 9*a"
      ],
      "answer": "B) 3*a"
    },
    {
      "question": "A food manufacturer produces packages of frozen ice cream cones. Each ice cream cone consists of a right circular cone that is filled with ice cream until a hemisphere is formed above the cone as shown in the figure above. The right circular cone has a base radius of 9 cm and a slant height of 15 cm. What is the volume of ice cream, in cubic centimeters, the manufacturer uses for each ice cream cone?",
      "options": [
        "A) 729π",
        "B) 810π",
        "C) 891π",
        "D) 960π"
      ],
      "answer": "B) 810π"
    },
    {
      "question": "A right circular cylinder has a base radius r that is 2 inches longer than its height. Which of the following expressions gives the volume, in cubic inches, of the cylinder in terms of r?",
      "options": [
        "A) 2πr^3",
        "B) πr^3 + 2πr^2",
        "C) πr^3 - 2πr^2",
        "D) 2πr^3 + πr^2"
      ],
      "answer": "C) πr^3 - 2πr^2"
    },
    {
      "question": "A crate that is 10 inches long, 8 inches wide, and 3 inches high is shown above. The floor and the four walls are all one inch thick. How many one-inch cubical blocks can fit inside the crate?",
      "options": [
        "A) 84",
        "B) 96",
        "C) 120",
        "D) 144"
      ],
      "answer": "B) 96"
    },
    {
      "question": "The concrete staircase shown above is built from a rectangular base that is 5 meters long and 6 meters wide. The three steps have equal dimensions and each one has a rise of 0.2 meters. If the density of concrete is 130 kilograms per cubic meter, what is the mass of the concrete staircase in kilograms? (Density is mass divided by volume)",
      "options": [
        "A) 1,420",
        "B) 1,560",
        "C) 1,820",
        "D) 2,040"
      ],
      "answer": "B) 1,560"
    }
  ]












/*



GRAMMER QUESTIONS




*/


var passagesAndQuestions1 = [
  {
    "passage": "Over the course of the 1950s, as television began to pervade popular culture, game shows became a fixture in the entertainment world. Daytime game shows were played for lower stakes to target stay-at-home housewives, while 1 some contestants won prizes worth thousands of dollars. During the latter part of the decade, viewership of high-stakes games such as Twenty One and The $64,000 Question began to increase rapidly. However, that popularity proved to be short-lived. In 1959, many of the higher stakes game shows were found to be rigged. 2",
    "questions": [
        {
            "question": "Which of the following provides the most effective transition to the information that follows?",
            "choices": ["A) NOCHANGE", "B) people who worked during the day had little interest in game shows.", "C) women began to enter the workforce in greater numbers during the 1960s.", "D) shows with higher stakes aired in the evening."],
            "answer": "D) shows with higher stakes aired in the evening."
        },
        {
            "question": "At this point, the writer is considering adding the following sentence: As a result, ratings declined, and most of the shows were cancelled. Should the writer do this?",
            "choices": ["A) Yes, because it indicates a consequence of the discovery that game shows were rigged.", "B) Yes, because it introduces a counterargument that provides a new perspective.", "C) No, because it does not provide an example of a high-stakes game show.", "D) No, because it disturbs the paragraph's focus on lower-stakes game shows."],
            "answer": "A) Yes, because it indicates a consequence of the discovery that game shows were rigged."
          },
          
    ]
},
{
    "passage": "1 The air traffic control system is an organization of people and equipment designed to ensure the safety of private and commercial air travellers. Air traffic controllers are responsible for ensuring a smooth flow of arrivals and departures, and they also monitor all aircraft that enters the airport's airspace. With the assistance of radar and visual observation, these controllers observe and supervise the movements of each plane in order to maintain a safe distance between aircrafts. They also advise pilots of potentially dangerous weather changes such as 'wind shear,' 2 sudden, aircraft-affecting changes in wind velocity or direction.",
    
    "questions": [
        {
            "question": "Which choice most effectively establishes the main topic of the paragraph?",
            "choices": ["A) NO CHANGE", "B) Many air traffic controllers are free to carry out their jobs with little supervision.", "C) Air traffic controllers possess superior visual memories.", "D) Although they are often referred to as flight controllers, most air professionals prefer to be called air traffic controllers."],
            "answer": "A) NO CHANGE"
        },
        {
            "question": "The writer is considering deleting the information after 'wind shear' and ending the sentence with a period. Should that information be deleted?",
            "choices": ["A) Yes, because it does not explain how different types of aircraft are affected by wind shear.", "B) Yes, because it provides a counterpoint to the explanation in the passage.", "C) No, because it defines a term that is likely to be unfamiliar to readers.", "D) No, because it explains how changes in wind velocity and direction affect aircrafts."],
            "answer": "C) No, because it defines a term that is likely to be unfamiliar to readers."

        }
    ]
},
{
    "passage": "In 1883, Theodore Roosevelt traveled to the North Dakota badlands. It was a voyage that changed his life. Roosevelt had always loved the outdoors, but 1 the voyage convinced him that the natural world deserved protection. After his inauguration as president of the United States in 1901, he became even more dedicated to wilderness conservation. In 1903, he interrupted a national speaking tour to spend two weeks camping in Yellowstone National Park. He also visited the Grand Canyon to call for its protection. Later, 2 he traveled to Yosemite, where he and the naturalist John Muir slept out under the stars for three nights.",
    "questions": [
        {
            "question": "Which choice provides the most effective transition to the information that follows?",
            "choices": ["A) NO CHANGE", "B) he found the trip somewhat unpleasant.", "C) he decided to turn his attention to politics rather than nature.", "D) most nineteenth-century politicians preferred more elegant surroundings."],
            "answer": "A) NO CHANGE"
        },
        {
            "question": "The writer wants to include another example to support the idea that Theodore Roosevelt was committed to protecting nature. Which choice most effectively accomplishes that goal?",
            "choices": ["A) NO CHANGE", "B) two of his homes became part of the National Park service.", "C) he passed legislation creating 150 National Forests and five National Parks.", "D) his face was carved into the side of Mount Rushmore in South Dakota."],
            "answer": "C) he passed legislation creating 150 National Forests and five National Parks."
        }
    ]
},
{
    "passage": "For almost 40 years after the end of World War II, the work of Ernest Everett Just, 1 an African-American biologist known for his studies of marine creatures, lay forgotten. Then, in 1983, Kenneth R. Manning, a professor of the history of science at the Massachusetts Institute of Technology, published a prize-winning biography titled Black Apollo of Science: The Life of Ernest Everett Just. Since that time, 2 Manning has written several other important books. The United States Post Office issued a stamp commemorating him, numerous conferences were held in his honor, and scientific journals published special issues dedicated to him.",
    "questions": [
        {
            "question": "The writer is considering deleting the underlined phrase (following the number 1, adjusting the punctuation as necessary). Should that information be deleted?",
            "choices": ["A) Yes, because the paragraph does not focus on Just's research.", "B) Yes, because Kenneth Manning was not a professor of marine biology.", "C) No, because it provides contextual information about Ernest Everett Just.", "D) No, because Ernest Everett Just influenced Kenneth Manning's marine biology research."],
            "answer": "C) No, because it provides contextual information about Ernest Everett Just."
        },
        {
            "question": "The writer wants to complete the sentence with information emphasizing the positive impact of Manning's biography on Just's legacy. Which choice most effectively accomplishes that goal?",
            "choices": ["A) NO CHANGE", "B) a number of events have been organized to bring increased attention to Just.", "C) the history of science has become a popular field of study.", "D) many important discoveries have been made in marine biology."],
            "answer": "B) a number of events have been organized to bring increased attention to Just."
        }
    ]
},
{
    "passage": "1 Paper-making is an ancient art dating back to the second century China. In just a few months, I accumulated piles of books, photos and posters, not to mention stationery and greeting cards, all over my house. I had always been an avid traveler and photographer, but now brightly colored photographs covered my bedroom, my living room, and my office. 2 Then, I discovered the budding world of scrapbooking, 3 an art form that traces its roots to 'commonplace' books in fifteenth century England. Suddenly, paper took on a whole new significance for me.",
    "questions": [
        {
            "question": "Which choice most effectively establishes the main topic of the paragraph?",
            "choices": ["A) NO CHANGE", "B) I recently developed a fascination with paper in all its forms.", "C) Some people prefer to keep their homes tidy, but I am not one of them.", "D) There are many different kinds of paper at my local crafts store."],
            "answer": "B) I recently developed a fascination with paper in all its forms."
        },
        {
            "question": "At this point in the essay, the writer is considering adding the following sentence: At times, I even worried that my walls would collapse under their weight. Should this sentence be added?",
            "choices": ["A) Yes, because it provides a humorous commentary that emphasizes the main idea of the paragraph.", "B) Yes, because the writer's new hobby had potentially damaging consequences.", "C) No, because it is irrelevant to the description of the writer's house.", "D) No, because it digresses from the idea that the writer enjoyed traveling."],
            "answer": "A) Yes, because it provides a humorous commentary that emphasizes the main idea of the paragraph."
        },
        {
            "question": "The writer is considering deleting the underlined phrase (placing a period after scrapbooking). Should that information be kept or deleted?",
            "choices": ["A) Kept, because it explains why scrapbooking became important to the writer.", "B) Kept, because it establishes a connection between the writer's interests in art and history.", "C) Deleted, because it blurs the paragraph's focus on the writer's love of paper.", "D) Deleted, because the writer also refers to photographic prints."],
            "answer": "C) Deleted, because it blurs the paragraph's focus on the writer's love of paper."
        }
    ]
},
{
    "passage": "Body language is an important form of communication among the members of a wolf pack. For example, wolves may indicate dominant behavior by baring their teeth and pointing their ears forward. Subordinate behavior, on the other hand, may be indicated by closed mouths, narrowed eyes, and ears that are pulled back and held close to the head. And a wolf that stands with its ears sticking straight up or low and to the side, teeth bared, and a wrinkled snout, clearly communicates a threatening message - all of the surrounding wolves know to stay away. 1 Once they have reached maturity, most wolves leave their birth pack to search for a new territory or to join an existing pack.",
    "questions": [
        {
            "question": "The writer wants a concluding sentence that restates the main idea of the paragraph. Which choice best accomplishes this goal?",
            "choices": ["A) NO CHANGE", "B) Wolves are highly social animals, and their packs consist of large extended families.", "C) These specialized postures have evolved to help reduce aggression, helping the pack members live together more peacefully.", "D) When they are between six and eight months old, wolf pups begin to hunt and travel with other members of the pack."],
            "answer": "C) These specialized postures have evolved to help reduce aggression, helping the pack members live together more peacefully."
        }
    ]
},
{
    "passage": "Joseph Pulitzer loved politics, but 1 he had difficulty settling on a career. In 1878, the St. Louis Dispatch became available at a public auction for only $2,500, and Pulitzer seized the opportunity to purchase it. John A. Dillon, owner of the Saint Louis Post, agreed to merge his newspaper with Pulitzer's, and so the St. Louis Post and Dispatch was created. The name was soon shortened to Post-Dispatch, and the paper doubled to eight pages. Although Pulitzer worked on every aspect of his paper, he was particularly involved in attacking corruption, which was rampant in St. Louis during the late nineteenth century. He considered his paper a vehicle for the truth, and he set about finding it with great energy. His stories exposed tax evasion, gambling rings, and 2 insurance fraud. Readers bought the paper in droves, increasing its circulation by the thousands.",
    "questions": [
        {
            "question": "Which choice provides the most effective transition to the information that follows?",
            "choices": ["A) NO CHANGE", "B) other fields interested him as well.", "C) he became a leading member of the Democratic Party.", "D) journalism was his true passion."],
            "answer": "D) journalism was his true passion."
        },
        {
            "question": "The writer would like to give another example of an illegal activity exposed by Pulitzer's paper. Which choice best accomplishes that goal?",
            "choices": ["A) NO CHANGE", "B) local politics.", "C) union rallies.", "D) artistic events."],
            "answer": "A) NO CHANGE"
        }
    ]
},
{
    "passage": "The twenty-first century is the age of the city. Today, more than half the world's population can be found in cities, and megacities - those with populations of 10 million or more - are on the rise. The world's largest megacity is Tokyo-Yokohama, 1 which is also referred to as the National Capital Region of Japan. It houses a population of over 37.5 million individuals and contains the world's largest metropolitan economy. 2 Severe traffic congestion is one of the most common challenges that megacities must confront. Although colleges and universities located in small towns as well as large cities may offer many different programs, those located in urban areas are also able to offer their students internships as well as the possibility of gaining experience in a variety of fields. In addition, unemployment rates in large cities tend to be low because major companies maintain large offices that employ hundreds or even thousands of workers. These cities also offer a wide range of entertainment options and cultural institutions such as museums, theaters, and concert venues.",
    "questions": [
        {
            "question": "Which choice provides a supporting example that reinforces the main point or the sentence?",
            "choices": ["A) NO CHANGE", "B) which is legally classified as a metropolis.", "C) which joins two cities and many prefectures covering 5,200 square miles.", "D) which contains a mix of modern skyscrapers and traditional architecture."],
            "answer": "C) which joins two cities and many prefectures covering 5,200 square miles."
        },
        {
            "question": "Which choice most effectively establishes the main topic of the paragraph?",
            "choices": ["A) NO CHANGE", "B) For many people, cities offer economic, educational or social opportunities not available in smaller or more rural areas.", "C) In 1900, London became the first city to have more than five million inhabitants.", "D) In addition to Tokyo, Mexico City, Beijing, and New York City are also considered megacities."],
            "answer": "B) For many people, cities offer economic, educational or social opportunities not available in smaller or more rural areas."
        }
    ]
},
]

var passagesAndQuestionsChapter2 = [


  {
    "passage": "[1] Learning to ride a unicycle might seem like a daunting task, but with the right kind of training aids, it doesn't have to be impossible - or even scary. [2] One option is to use a spotter who walks alongside and catches the rider if he or she falls. [3] Another easy way to learn is to find a narrow hallway: riding in a confined space allows the beginning rider to improve balancing from front-to-back and side-to-side. [4] Likewise, riding between two chairs placed back-to-back teaches the rider how to find a proper starting position. [5] On the other hand, props such as ski poles should not be used because they hinder balance and create dependence. [6] If a hall cannot be found, a fence or clothesline can be used as well.",
    "questions": [
        {
            "question": "What is the best placement for sentence 6?",
            "choices": ["A) Where it is now.", "B) After sentence 1.", "C) After sentence 2.", "D) After sentence 3."],
            "answer": "D) After sentence 3."
        }
    ]
},
{
    "passage": "[1] For decades, scientists have hoped for a 'solar revolution,' a shift from relying on natural gas to heat homes and power cars to harnessing electricity from the sun. [2] The conversion of solar heat into usable energy is accomplished through the use of solar panels - also known as modules - which can be installed directly into the ground, mounted on roofs, or built directly into the walls of a building. [3] Each module is comprised of cells which convert solar radiation into direct current electricity. [4] Solar-powered buildings can even be very large. [5] It's a tantalizing promise: on sunny days, the sun gives off enormous amounts of energy - enough to power houses, office buildings, and schools. [6] In 2011, the world's largest solar-powered office building was constructed, covering over 750,000 square feet.",
    "questions": [
        {
            "question": "Sentence 4 would most effectively be",
            "choices": ["A) placed after sentence 1.", "B) placed after sentence 2.", "C) placed after sentence 5.", "D) DELETED from the paragraph."],
            "answer": "C) placed after sentence 5."

          } 
    ]
},
{
    "passage": "[1] Say the word 'sushi,' and the first thing that comes to mind is usually an image of raw fish. [2] Initially, the rice was only used to help start the fermenting process, but food shortages later made the rice too valuable to be thrown away. [3] But sushi is about rice as well as fish. [4] It's also the original fast food, dating back to 700 A.D. in Japan. [5] At that time, fish was salted, sandwiched between layers of rice, and pressed with heavy stones, a process that fermented and preserved the fish for months or even years. [6] The curing time was also shortened to three or four weeks, so the fish was closer to being raw when it was consumed.",
    "questions": [
        {
            "question": "To make the paragraph most logical, sentence 2 should be placed",
            "choices": ["A) where it is now.", "B) before sentence 4.", "C) before sentence 5.", "D) before sentence 6."],
            "answer": "D) before sentence 6."
        }
    ]
},
{
    "passage": "[1] During World War II, Admiral Grace Hopper was stationed at Harvard University, where she worked on IBM's Harvard Mark I computer, the first large-scale computer in the United States. [2] Hopper was only the third person to program this computer, and in 1943, she wrote a manual of operations that lit the path for those who followed her. [3] Then, in the 1950s, she invented the compiler, a device that translated English commands into computer code, allowing programmers to create code more easily and with fewer errors. [4] Hopper's second compiler, the Flow-Matic, was used to program UNIVAC I and II, which were the first computers available commercially. [5] Hopper also oversaw the development of the Common Business-Oriented Language (COBOL), one of the first computer programming languages.",
    "questions": [
        {
            "question": "The best placement for sentence 4 is",
            "choices": ["A) where it is now.", "B) before sentence 1.", "C) before sentence 2.", "D) before sentence 3."],
            "answer": "A) where it is now."
        }
    ]
},
{
    "passage": "[1] Worldwide awareness of Inuit Art originated with the assistance of James Houston, a noted artist, author and designer for the Steuben Glass Company. [2] In the late 1940s, Houston collected a number of small Inuit carvings, which he then sold to help support the Inuit's economic needs. [3] In 1953, Houston solicited his friend Eugene Power to help him import Inuit art into the United States. [4] Power, who owned and operated University Microfilms in Ann Arbor, Michigan, established a non-profit gallery called Eskimo Art Incorporated in Ann Arbor to import the work. [5] The same year, Power encouraged the Cranbrook Institute of Science to host the first exhibition of Inuit Art in the United States. [6] Later, Houston taught the Inuit to make unique stone-cut and sealskin stencil prints, and in 1959, the first collection of Inuit prints was released at Cape Dorset.",
    "questions": [
        {
            "question": "The most logical place to begin a new paragraph would be at",
            "choices": ["A) sentence 2.", "B) sentence 3.", "C) sentence 4.", "D) sentence 6."],
            "answer": "B) sentence 3."
        }
    ]
},
]

var passagesAndQuestionsChapter3 = [
  {
    "passage": "El Niño is a climate pattern in which water in the Pacific Ocean near the equator becomes hotter than usual, affecting the atmosphere and weather around the world. Although El Niño climate conditions are unpredictable, they typically occur every few years. The climate pattern can change the weather of the United States, particularly in California and the southern states. Although El Niño years do not always bring heavy rains, [1] the wettest winters have occurred when El Niño was strong. In addition, El Niño may bring warmer than normal winter temperatures to the eastern part of the United States. [Infographic accompanies question]",
    "questions": [
        {
            "question": "Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) strong El Niños always create abnormally wet winters.", "C) the amount of rainfall in weak El Niño years has increased over time.", "D) the amount of rainfall in weak El Niño years has grown closer to the amount of rainfall in strong El Niño years."],
            "answer": "A) NO CHANGE"
        }
    ]
},
{
    "passage": "Because demand for seafood cannot be adequately met by wild-catch fish, the aquaculture industry makes up market needs. Farmed salmon production represented less than 10% of the total salmon volume 25 years ago, whereas it now accounts for over 70% of the salmon market. Between 1979 and 2011, hatchery-raised salmon [2] grew to a volume of over 3,500 tons, while wild-catch salmon has stagnated.  [Infographic accompanies question]",
    "questions": [
        {
            "question": "Which choice offers an accurate interpretation of data presented in the chart?",
            "choices": ["A) NO CHANGE", "H) grew to a volume of over 2,500 tons,", "C) grew to a volume of 1,000 tons,", "D) grew by a volume of over 3,500 tons,"],
            "answer": "B) grew to a volume of over 2,500 tons,"
        }
    ]
},
{
    "passage": "A glacier's life is defined by movement and change. Glacier movement most often occurs over hundreds or even thousands of years, but not all glaciers move slowly. For example, surging glaciers can flow quickly, sometimes traveling as much as 10 to 100 times faster than regular glaciers. Others may retreat within only a few decades, leaving once glaciated valleys blooming with vegetation. Glaciers helped shape the Cascade mountains, but some reports now suggest that those glaciers could be gone within a matter of decades. [3] The number of stationary glaciers decreased from 1995 and 2013, and some glaciers have disappeared entirely. Scientists warn that the melting ice could impact everything from tourism to agriculture, forestry, water quality, and underwater ecosystems. [Infographic accompanies question]",
    "questions": [
        {
            "question": "Which choice offers an accurate interpretation of data presented in the chart?",
            "choices": ["A) NO CHANGE", "B) The number of retreating glaciers has decreased since 1995, but", "C) The number of stationary glaciers rose from 1967 to 2013, but", "D) There were twice as many retreating glaciers in 1995 as there were a decade earlier, and"],
            "answer": "B) The number of retreating glaciers has decreased since 1995, but"
        }
    ]
},
{
    "passage": "A few decades ago, wild giant pandas were considered a symbol of wildlife conservation. Large-scale infrastructure projects were destroying the animals' traditional habitat, found only in the Chinese provinces of Sichuan, Shaanxi, and Gansu. Now, however, conservationists' efforts seem to be paying off. According to one recent survey, the panda population began to increase during the decade beginning in 2003, [4] rising by several hundred to over 2,000 in 2013. The World Wildlife Federation's 2015-2025 giant-panda conservation strategy will set the course for panda-protection efforts over the next decade, with a focus on improving panda habitats in a manner that balances conservation and sustainable local development.",
    "questions": [
        {
            "question": "Which choice offers an accurate interpretation of data presented in the chart?",
            "choices": ["A) NO CHANGE", "B) rising by several hundred in each year, for a total of over 1,800", "C) declining slightly before rebounding to over 1,800", "D) experiencing an initial drop but eventually climbing to 2,000"],
            "answer": "C) declining slightly before rebounding to over 1,800"
        }
    ]
},
{
    "passage": "The process of getting energy from the wind into a home or business is complex and involves many components. A modern wind turbine consists of an estimated 8,000 parts and can be up to 300 feet high. Turbines must be designed, built, transported, and erected before they can start producing energy. This process can be split into three major phases: manufacturing, project development, and operation and maintenance. In a successful project, these phases overlap, and there is substantial communication among workers in all three phases. Currently, [5] wind-power jobs are evenly distributed between the financial services, construction, and transport sectors. However, as new wind farms are built, existing ones are upgraded, and manufacturers are able to take advantage of returns to scale, other sectors also are expected to experience rapid growth.",
    "questions": [
        {
            "question": "Which choice offers an accurate interpretation of data presented in the chart?",
            "choices": ["A) NO CHANGE", "B) only half as many people are employed in construction jobs as are employed in manufacturing jobs.", "C) there are twice as many jobs in the financial services sector as there are in the transport sector.", "D) the highest number of wind-power jobs are concentrated in the manufacturing and 'other jobs' sectors."],
            "answer": "D) the highest number of wind-power jobs are concentrated in the manufacturing and 'other jobs' sectors."
        }
    ]
},
]


var passagesAndQuestionsChapter4 = [

  {
    "passage": "The issue of free speech as it relates to the First Amendment of the United States Constitution has been a center of controversy [1] about free speech since the 1950s. In the [2] importantly significant decision Tinker v. Des Moines Independent Community School District (1965), the United States Supreme Court [3] formally recognized that freedom of speech and expression do not 'end at the schoolyard gate.' Unsurprisingly, though, students and school administrators do not always [4] concur with one another about what constitutes free speech.",
    "questions": [
        {
            "question": "[1] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) concerning free speech", "C) in regards to the issue of free speech", "D) DELETE the underlined portion"],
            "answer": "D) DELETE the underlined portion"
        },
        {
            "question": "[2] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) important and significant", "C) important while also being significant", "D) significant"],
            "answer": "D) significant"
        },
        {
            "question": "[3] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) recognized in a formal manner", "C) undertook formal recognition", "D) recognized - doing so formally -"],
            "answer": "A) NO CHANGE"
        },
        {
            "question": "[4] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) agree, not to mention concur", "C) agree and also concurring", "D) agree and concur"],
            "answer": "A) NO CHANGE"
        }
    ]
},
{
    "passage": "When Jordan Romero was in elementary school, he became intrigued by a painting that hung in his classroom. The painting [1] showed and depicted seven of the world's highest mountains - one for each continent - and Jordan made up his mind to climb them all. Remarkably, he [2] achieved an attainment of that goal when he reached the top of Vinson Massif at the age of fifteen years, five months, and twelve days, becoming the youngest climber ever to summit the tallest mountain on each continent. In the process, Romero also became the youngest person to scale Mt. Everest, reaching the top when he was not even 14 years old [3] and earning the title of the youngest person to climb Mt. Everest.",
    "questions": [
        {
            "question": "[1] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) showed a depiction or", "C) showed while depicting", "D) depicted"],
            "answer": "D) depicted"
        },
        {
            "question": "[2] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) achieved as well as attaining that goal", "C) attained that goal", "D) achieved and attained that goal"],
            "answer": "C) attained that goal"
        },
        {
            "question": "[3] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) and he earned the title of the youngest person to climb Mt. Everest.", "C) and earning the title of the youngest person to climb Mt. Everest.", "D) DELETE the underlined phrase (ending the sentence with a period)."],
            "answer": "D) DELETE the underlined phrase (ending the sentence with a period)."
        }
    ]
},
{
    "passage": "Above a hole in the ice, a polar bear lies waiting for a seal to emerge. Food in the frozen Arctic is [1] scarce, in short supply, so the shaggy while hunter must seize every opportunity to pursue its prey. The polar bear is one of the world's largest carnivores that eats meat, rivaled only by the Kodiak brown bear of southern Alaska. Numerous adaptations make the polar bear uniquely suited to life [3] in and around icy habitats. A thick layer of blubber beneath its fur provides [4] insulation, which keeps it warm. Its long neck and narrow skull help it glide through the water, and its front feet are large and flat. Fur even covers its feet, allowing for traction on ice.",
    "questions": [
        {
            "question": "[1] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) scarce, and there is not much of it,", "C) scarcely difficult to find,", "D) scarce"],
            "answer": "D) scarce"
        },
        {
            "question": "[2] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) carnivorous meat-eater,", "C) carnivores, which eat meat,", "D) carnivores,"],
            "answer": "D) carnivores,"
        },
        {
            "question": "[3] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) in and also living around", "C) in while being around", "D) DELETE the underlined portion (ending the sentence with a period)."],
            "answer": "A) NO CHANGE"
        },
        {
            "question": "[4] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) insulation, and this keeps it warm.", "C) insulation that keeps it warm.", "D) insulation."],
            "answer": "D) insulation."
        }
    ]
},
{
    "passage": "[1] Formerly, in a time that is now past, 3-D printers were expensive tools wielded by professional designers who used them to create prototypes of products such as mobile phones or airplane parts. Now, however, these printers are emerging into the mainstream, and many computer enthusiasts, schools, and libraries are purchasing them. Not only can they [2] design in addition to printing objects, but they can also make copies of physical objects by 'scanning' them - using a camera to turn multiple pictures into a three-dimensional model, which can repeatedly be printed [3] again and again.",
    "questions": [
        {
            "question": "[1] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) In the past,", "C) Formerly, in the past,", "D) Formerly in a past time,"],
            "answer": "B) In the past,"
        },
        {
            "question": "[2] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) design - also print -", "C) design and print", "D) design, also printing"],
            "answer": "C) design and print"
        },
        {
            "question": "[3] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) over and over again.", "C) once and again.", "D) DELETE the underlined portion (ending the sentence with a period)."],
            "answer": "D) DELETE the underlined portion (ending the sentence with a period)."
        }
    ]
},
{
    "passage": "Rainbows can be observed whenever there are water drops in the air and sunlight shining from behind the observer. They are usually [1] seen in a visible way in the western sky during the morning, and in the eastern sky during the early evening. The most spectacular displays occur when half the sky is still dark with rain clouds and the observer is at a spot with clear sky in the direction of the sun. The result is a [2] luminous rainbow that contrasts with the dark background. The rainbow effect can also be artificially created [3] unnaturally when water droplets are dispersed into the air during a sunny day. Rarely, a moonbow, a nighttime rainbow, can be seen [4] during the night. Because human color perception is poor in low light, moonbows are often perceived as white.",
    "questions": [
        {
            "question": "[1] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) observable in the western sky", "C) perceived in a visual manner in the western sky", "D) seen visibly in the western sky"],
            "answer": "B) observable in the western sky"
        },
        {
            "question": "[2] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) luminously light-filled rainbow", "C) luminous rainbow, full of light", "D) luminous and light-filled"],
            "answer": "A) NO CHANGE"
        },
        {
            "question": "[3] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) unnaturally,", "C) unnaturally and", "D) DELETE the underlined portion"],
            "answer": "D) DELETE the underlined portion"
        },
        {
            "question": "[4] Which choice is best supported by the information in the graph?",
            "choices": ["A) NO CHANGE", "B) in the nighttime.", "C) at night.", "D) DELETE the underlined portion (ending the sentence with a period)."],
            "answer": "D) DELETE the underlined portion (ending the sentence with a period)."
        }
    ]
}
]



var passagesAndQuestionsChapter5  = [
  {
    "passage": "Mt. Kilimanjaro. Like the mountain, which is swept in clouds, the name Kilimanjaro is a mystery. It might mean Mountain of Light, Mountain of Greatness, or Mountain of Caravans. Locals refer to it simply as Kipo. Not only is Mt. Kilimanjaro the highest mountain on the African continent, but at nearly 20,000 feet, it is also the tallest free-standing mountain in the world. Although Mt. Kilimanjaro was once a volcano that erupted regularly, it has II exhibited a dearth of activation for thousands of years.",
    "questions": [
        {
            "question": "In sentence 1, which word best replaces 'swept'?",
            "choices": ["A) surfaced", "B) cloaked", "C) vanished", "D) NO CHANGE"],
            "answer": "C) vanished"
        },
        {
            "question": "In sentence 5, what's the best substitute for 'exhibited a death of activation'?",
            "choices": ["A) been pretty quiet", "B) lain low", "C) remained dormant", "D) NO CHANGE"],
            "answer": "D) NO CHANGE"
        }
    ]
},
{
    "passage": "Just a few decades from now, the days of sitting in a standard forward-facing seat may be air-travel history. As the health of the travel industry has improved, airlines have shifted their focus at the flying experience. A recent wave of aircraft deliveries has spurred demand for seats, and manufacturers around the world are working overtime in order to keep up. All this business has led to a frenzy of innovation not seen in the skies since the jet-set era of the 1960s. While airlines seek impressing passengers with futuristic amenities, design teams are hard at work problemsolving for the needs of travelers in the years to come.",
    "questions": [
        {
            "question": "In setence 2, what's the best preposition to replace 'at' in the sentence?",
            "choices": ["A) on", "B) in", "C) to", "D) NO CHANGE"],
            "answer": "D) NO CHANGE"
        },
        {
            "question": "In sentence 3, what's the best word to replace 'spurred'?",
            "choices": ["A) exploded", "B) excited", "C) goaded", "D) NO CHANGE"],
            "answer": "A) exploded"
        },
        {
            "question": "In sentence 5, what's the best phrase to replace 'seek impressing'?",
            "choices": ["A) seek to impress", "B) seek in impressing", "C) seek for impressing", "D) NO CHANGE"],
            "answer": "B) seek to impress"
        }
    ]
},
{
  "passage": "Some people call the Durian 'the king of fruit.' On the other hand, others can't stand to be within a mile of it. Elevated throughout Southeast Asia, the durian resembles a cross between a porcupine and a pineapple, and it can weigh as much as seven pounds. Its most striking feature, however, is its odor. The flesh emits a pungent smell, even when the husk is intact. While durian fans regard the fruit as having a pleasantly sweet fragrance, others find the aroma overpowering and even revolting. The smell can llicit reactions ranging from deep appreciation to intense disgust: people claim that it is similar with the smell of rotten onions, turpentine, or sewage. On the other hand, the durian's taste has been compared to that of custard or caramel. Some people even claim to call it sublime.",
  "questions": [
      {
          "question": "In sentencxe 2, what's the best word to replace 'elevated' in the sentence?",
          "choices": ["A) NO CHANGE", "B) Perpetuated", "C) Activated", "D) Cultivated"],
          "answer": "D) Cultivated"
      },
      {
          "question": "In sentence 4, what's the best word to replace 'emits' in the sentence?",
          "choices": ["A) NO CHANGE", "B) offers", "C) admits", "D) stimulates"],
          "answer": "A) NO CHANGE"
      },
      {
          "question": "In sentence 6, what's the best phrase to replace 'illicit reactions ranging from'?",
          "choices": ["A) NO CHANGE", "B) illicit reactions ranging, from", "C) elicit reactions that range from", "D) elicit reactions ranging from:"],
          "answer": "C) elicit reactions that range from"
      },
      {
          "question": "In sentence 6, what's the best word to replace 'with' in the sentence?",
          "choices": ["A) NO CHANGE", "B) from", "C) to", "D) in"],
          "answer": "C) to"
      },
      {
          "question": "In sentence 8, what's the best word to replace 'claim' in the sentence?",
          "choices": ["A) NO CHANGE", "B) dare", "C) want", "D) intend"],
          "answer": "B) dare"
      }
  ]
},
{
  "passage": "According to the United States Library of Congress, the majority of American feature films from the silent era are crumbling; fewer than 20 percent remain intact. Meanwhile, half of the movies produced in the United States before 1950 have already been lost. The good news, however, is that both researchers and film buffs are working to revive and preserve the movies that still exist. In addition, new archives are being established to house these films.",
  "questions": [
      {
          "question": "In sentence 1, what's the best word to replace 'intact' in the sentence?",
          "choices": ["A) NO CHANGE", "B) inert", "C) entire", "D) integrated"],
          "answer": "A) NO CHANGE"
      },
      {
          "question": "In sentence 3, What's the best word to replace 'revive' in the sentence?",
          "choices": ["A) NO CHANGE", "B) restore", "C) regulate", "D) relieve"],
          "answer": "B) restore"
      }
  ]
},
{
  "passage": "The making of wooden sculptures has been extremely widely practiced. Many of the most important sculptures of China and Japan are carved in wood, as are the great majority of African sculptures. Wood is light, so it is suitable in masks and other sculpture intended to be carried. It is also much easier to carve than stone. However, wood sculptures are vulnerable to decay, insect damage, and fire. As a result, they hang around much less often than sculptures made out of more durable materials such as stone and bronze. Wood thus forms an important hidden element in the art history of many cultures. For example, wooden totem poles have traditionally been displayed outdoors, but researchers have little idea of how the totem pole tradition accumulated.",
  "questions": [
      {
          "question": "What's the best word to replace 'in' in the sentence 'Wood is light, so it is suitable in masks'?",
          "choices": ["A) NO CHANGE", "B) for", "C) with", "D) from"],
          "answer": "B) for"
      },
      {
        "question": "What's the best word to replace 'vulnerable' in the sentence 'However, wood sculptures are vulnerable ot decay, insect damage, and fire.'?",
        "choices": ["A) NO CHANGE", "B) inferior", "C) accessible", "D) eligible"],
        "answer": "A) NO CHANGE"
      },
      {
          "question": "What's the best word to replace 'hang around' in the sentence 'they hang around much less often than sculptures made out of more durable materials'?",
          "choices": ["A) NO CHANGE", "B) survive", "C) stay extant", "D) dry out"],
          "answer": "C) stay extant"
      },
      {
          "question": "What's the best word to replace 'accumulated' in the sentence 'researchers have little idea of how the totem pole tradition accumulated'?",
          "choices": ["A) NO CHANGE", "B) encroached", "C) developed", "D) amplified"],
          "answer": "C) developed"
      }
  ]
},
  //...continue with rest of the passages
];

var passagesAndQuestionsChapter7 = [
  //...previous passages
  {
    "passage": "Many common substances found in household items are dangerous to people's health, however experts insist that they are harmless in very small amounts. In addition, factors such as temperature or length of exposure may affect substances' potential to cause harm.",
    "questions": [
        {
            "question": "What's the best word or punctuation to use after 'health' in the first sentence?",
            "choices": ["A) NO CHANGE", "B) health; however, experts insist", "C) health, but experts insisting", "D) health, nevertheless, experts insist"],
            "answer": "B) health; however, experts insist"
        }
    ]
},
{
    "passage": "Universities have historically offered a wide variety of continuing education classes. Some of them are now offered over the Internet as well as in traditional classrooms. In fact, the number of classes offered electronically has skyrocketed over the past decade and is expected to continue to increase.",
    "questions": [
        {
            "question": "What's the best way to rewrite 'classes. Some of them' in the first sentence?",
            "choices": ["A) NO CHANGE", "B) classes, some of them that are", "C) classes. Some of which are", "D) classes, some of which are"],
            "answer": "D) classes, some of which are"
        }
    ]
},
{
  "passage": "Gwendolyn Knight painted throughout her life. She did not start seriously exhibiting her work until relatively late. Her first gallery exhibit took place when she was in her fifties, and her first retrospective exhibit occurred when she was nearly 80 years old. Entitled 'Never Too Late for Heaven,' it took place at the Tacoma Museum of Art in Tacoma, Washington, in 2003.",
  "questions": [
      {
          "question": "What's the best way to write 'life. She' in the first sentence?",
          "choices": ["A) NO CHANGE", "B) life, however, she did not start", "C) life but did not start", "D) life; but she did not start"],
          "answer": "C) life but did not start"
      }
  ]
},
{
  "passage": "African-American life during the 1920s was documented in great detail by the writers and artists of the Harlem Renaissance. Far less is known about it during the Depression in the 1930s, the market for their work disappeared almost overnight when the stock market crashed.",
  "questions": [
      {
          "question": "What's the best way to write '1930s, the market' in the second sentence?",
          "choices": ["A) NO CHANGE", "B) Depression in the 1930s the market", "C) Depression. In the 1930s, the market", "D) Depression, in the 1930s the market"],
          "answer": "C) Depression. In the 1930s, the market"
      }
  ]
},
{
"passage": "The geologic instability known as the Pacific Ring of fire has produced numerous faults. They cause approximately 10,000 earthquakes annually. Roughly 90% of all earthquakes occur along the Ring of Fire, and the ring is dotted with three-quarters of all active volcanoes on Earth.",
"questions": [
    {
        "question": "Which of the following would NOT be an acceptable alternative to 'faults. They' in the first sentence?",
        "choices": ["A) faults, they cause", "B) faults; they cause", "C) faults that cause", "D) faults, which cause"],
        "answer": "A) faults, they cause"
    }
]
},
{
"passage": "Nestled in the middle of three southern provinces, Doñana National Park is one of Europe's most significant conservation areas. It is a maze of lagoons, marshes, lakes, cliffs, woodlands, and long stretches of pristine beaches untouched by human development. The park contains miles of trails, and visitors can spend hours hiking, biking, and admiring the hundreds of bird species that cluster in the trees.",
"questions": [
    {
        "question": "What's the best way to write 'areas, it' in the first sentence?",
        "choices": ["A) NO CHANGE", "B) areas, a maze", "C) areas, this is a maze", "D) areas it is a maze"],
        "answer": "B) areas, a maze"
    }
]
},
{
"passage": "Frank Lloyd Wright (June 8, 1867 -April 9, 1959) was many things in addition to being an architect. He designed more than 1,000 buildings, and he was also an interior designer and writer. His architectural philosophy held that buildings should be designed in harmony with people and their surrounding environments. This idea, which became known as organic architecture, was best exemplified by his design for the Fallingwater home (1935): a house built into the side of a hill and balanced over a waterfall. Used as Wright's summer residence, it is considered a masterpiece of American architecture.",
"questions": [
    {
        "question": "What's the best way to write 'things in addition to being an architect' in the first sentence?",
        "choices": ["A) NO CHANGE", "B) things, in addition to being an architect", "C) things. In addition to being an architect", "D) things in addition to being an architect,"],
        "answer": "C) things. In addition to being an architect"
    },
    {
        "question": "What's the best way to write 'residence, it' in the last sentence?",
        "choices": ["A) NO CHANGE", "B) residence. It is considered", "C) residence; it is considered", "D) residence, it is considered"],
        "answer": "D) residence, it is considered"
    }
]
},
{
"passage": "When it came to food, a pirate's life could be difficult. Living at sea, far from major seaports, meant that hunger was a normal part of daily living. The absence of warm, dry storage spaces put normal pantry staples such as flour and dried beans at a high risk of mold. Climate also presented preservation problems; keeping fresh fruits and meats was next to impossible in warmer waters. Moreover, fresh water was difficult to keep during long sea voyages because it could easily be contaminated by algae and microbes.",
"questions": [
    {
        "question": "What's the best way to write 'difficult living at sea' in the first sentence?",
        "choices": ["A) NO CHANGE", "B) difficult. Living at sea", "C) difficult, living at sea,", "D) difficult, living at sea"],
        "answer": "B) difficult. Living at sea"
    },
    {
        "question": "What's the best way to write 'problems, keeping fresh fruits' in the fourth sentence?",
        "choices": ["A) NO CHANGE", "B) problems keeping fresh fruits", "C) problems, keeping fresh fruits,", "D) problems; keeping fresh fruits"],
        "answer": "D) problems; keeping fresh fruits"
    }
]
},
{
  "passage": "Norman Rockwell's paintings depicting everyday life appealed to a vast audience in the 1950s. Rockwell became one of the most popular artists in the United States. Rockwell is most famous for the cover illustrations he created for The Saturday Evening Post. He published hundreds of images over the course of four decades.",
  "questions": [
      {
          "question": "What's the best way to write 'audience in the 1950s' in the first sentence?",
          "choices": ["A) NO CHANGE", "B) audience, in the 1950s,", "C) audience in the 1950s", "D) audience. In the 1950s,"],
          "answer": "D) audience. In the 1950s,"
      },
      {
          "question": "What's the best way to write 'Post, he published' in the third sentence?",
          "choices": ["A) NO CHANGE", "B) Post; publishing", "C) Post, having published", "D) Post he published"],
          "answer": "C) Post, having published"
      }
  ]
},
{
  "passage": "Scientists have long believed that camels originated in North America and then spread throughout the world, a theory that was first proposed after a camel fossil was discovered in Canada's Yukon Territory in 1913. As researchers eventually discovered, these camels were much larger than their modern counterparts. They had long, massive limbs and long spines on the thoracic vertebra, creating a large hump.",
  "questions": [
      {
          "question": "What's the best way to write 'theory that was first proposed' in the first sentence?",
          "choices": ["A) NO CHANGE", "B) this first being proposed", "C) this theory was first proposed", "D) and the first theory proposed"],
          "answer": "A) NO CHANGE"
      },
      {
          "question": "What's the best way to write 'counterparts, they had' in the second sentence?",
          "choices": ["A) NO CHANGE", "B) counterparts. They had", "C) counterparts that they had", "D) counterparts and having"],
          "answer": "B) counterparts. They had"
      }
  ]
}



  //...continue with the rest of the passages
];

let passagesAndQuestionsChapter8 = [
  {
    "passage": "On the screen, three people walk in a garden. The image is black-and-white, and the figures move in a jerky way. After a few seconds, they disappear. Filmed in 1888, Roundhay Garden Scene seems primitive in comparison to the slick, sophisticated Hollywood films of today. Therefore, it is the oldest surviving film in existence.",
    "questions": [
        {
            "question": "What's the best way to write 'Therefore it is the oldest surviving film' in the last sentence?",
            "choices": ["A) NO CHANGE", "B) However,", "C) In fact,", "D) Accordingly,"],
            "answer": "C) In fact,"
        }
    ]
},
{
  "passage": "In 1959, Project Mercury became the first human spaceflight program led by NASA. The project was aimed at putting an American into orbit before the Soviet Union could accomplish that goal. The program allowed seven astronauts to travel into space; for instance, it was shut down only four years after it began.",
  "questions": [
      {
          "question": "What's the best way to write 'for instance, it was shut down' in the last sentence?",
          "choices": ["A) NO CHANGE", "B) besides", "C) likewise,", "D) however,"],
          "answer": "D) however,"
      }
  ]
},
{
  "passage": "Chimpanzees and bonobo monkeys resemble each other physically, but their social behaviors differ greatly. Chimpanzees have an omnivorous diet, a troop hunting culture, and complex social relationships. Bonobo monkeys, in contrast, eat mostly fruit, rarely hunt, and do not have a strict social hierarchy.",
  "questions": [
      {
          "question": "What's the best way to write 'in contrast, eat mostly fruit' in the third sentence?",
          "choices": ["A) NO CHANGE", "B) therefore,", "C) moreover,", "D) consequently,"],
          "answer": "A) NO CHANGE"
      }
  ]
},
{
  "passage": "A gamelan is a traditional musical ensemble from Indonesia, usually from the islands of Java and Bali. Gamelans typically feature a variety of instruments, including xylophones, gongs, and bamboo flutes. Some ensembles also include vocalists. Thus, gamelan music is an integral part of Indonesian culture.",
  "questions": [
      {
          "question": "What's the best way to write 'Thus, gamelan music' in the last sentence?",
          "choices": ["A) NO CHANGE", "B) Nonetheless, gamelan music", "C) For example, gamelan music", "D) Gamelan music"],
          "answer": "D) Gamelan music"
      }
  ]
},
{
  "passage": "Many people fear or dislike spiders, but these creatures are mostly beneficial because they prey on insects and other pests. The spiders commonly seen out in the open during the day are usually harmless and rarely bite people. Poisonous species, for instance, spend most of their time in woodpiles, corners, or boxes, and rarely come into contact with humans.",
  "questions": [
      {
          "question": "What's the best way to write 'for instance, spend most of their time' in the third sentence?",
          "choices": ["A) NO CHANGE", "B) however,", "C) by the same token,", "D) in effect,"],
          "answer": "B) however,"
      }
  ]
},
{
  "passage": "Although computerized fingerprint scanners have been a staple of spy movies for decades, but until recently, they were rarely found in the real world. Over the last few years, therefore, scanners have become common in many different locations, including police stations, high-security buildings, and even computer keyboards. The price of a scanner has also decreased significantly. Besides, it is now possible to purchase a USB fingerprint scanner for under $100.",
  "questions": [
      {
          "question": "What's the best way to write 'Although computerized fingerprint scanners' in the first sentence?",
          "choices": ["A) NO CHANGE", "B) Whereas computerized", "C) Because computerized", "D) Computerized"],
          "answer": "D) Computerized"
      },
      {
          "question": "What's the best way to write 'therefore, scanners have become' in the second sentence?",
          "choices": ["A) NO CHANGE", "B) in other words,", "C) however,", "D) for example,"],
          "answer": "C) however,"
      },
      {
          "question": "What's the best way to write 'Besides, it is now possible' in the third sentence?",
          "choices": ["A) NO CHANGE", "B) Next,", "C) Indeed,", "D) Likewise,"],
          "answer": "C) Indeed,"
      }
  ]
},
{
  "passage": "Executive editors play one of the most important roles at newspapers and magazines: they oversee assistant editors and generally have the final say about which stories are published. Meanwhile, if a writer covering local news proposes a piece about the candidates in a city election, the executive editor decides whether to approve the article and determines what angle the writer should take. Executive editors also plan budgets and negotiate contracts with freelance writers, sometimes called 'stringers.' Although many executive editors work for newspaper publishers, some are employed by television stations or advertising firms.",
  "questions": [
      {
          "question": "What's the best way to write 'Meanwhile, if a writer' in the second sentence?",
          "choices": ["A) NO CHANGE", "B) For instance,", "C) Similarly,", "D) Instead,"],
          "answer": "B) For instance,"
      },
      {
          "question": "What's the best way to write 'Although many executive editors work' in the last sentence?",
          "choices": ["A) NO CHANGE", "B) work extremely long hours.", "C) find their jobs challenging.", "D) collaborate with their colleagues."],
          "answer": "A) NO CHANGE"
      }
  ]
},
{
  "passage": "Straw has been used as a building material for centuries. Contrary to popular belief, it is not easily destroyed. In fact, it can be quite hardy. In the nineteenth century, settlers in the Nebraska Sand Hills used straw to build houses when wood and clay were scarce; some of the structures are still standing today. Builders are hoping that such longevity is attributable to the straw, but new homes that use this material do have some updates. However, these contemporary structures include straw that is pressed into panels and framed with timber for reinforcement. The panels are then covered in brick so that no straw remains exposed to the elements.",
  "questions": [
      {
          "question": "What's the best way to write 'In fact, it can be quite hardy' in the third sentence?",
          "choices": ["A) NO CHANGE", "B) Therefore,", "C) For example,", "D) Subsequently,"],
          "answer": "A) NO CHANGE"
      },
      {
          "question": "What's the best way to write 'However, these contemporary structures' in the seventh sentence?",
          "choices": ["A) NO CHANGE", "B) Meanwhile,", "C) For example,", "D) Moreover,"],
          "answer": "C) For example,"
      }
  ]
},
{
  "passage": "The Silk Road acquired its name from the lucrative trade in Chinese silk carried out along its 4,000 miles, beginning during the Han dynasty (206 BCE- 220 AD). The Chinese took great interest in the safety of their goods. Accordingly, they extended the Great Wall of China to ensure the protection of their trade routes. Trade on the Silk Road was a significant factor in the development of China, India, and Europe, opening long-distance political and economic interactions. Because silk was certainly the major trade item from China, numerous other types of goods, including textiles, cloth, and pottery, also traveled along the Silk Road.",
  "questions": [
      {
          "question": "What's the best way to write 'Accordingly, they extended' in the third sentence?",
          "choices": ["A) NO CHANGE", "B) Nevertheless,", "C) In other words,", "D) Likewise,"],
          "answer": "A) NO CHANGE"
      },
      {
          "question": "What's the best way to write 'Because silk was certainly' in the last sentence?",
          "choices": ["A) NO CHANGE", "B) Although silk", "C) Despite Silk", "D) Silk"],
          "answer": "B) Although silk"
      }
  ]
},
{
  "passage": "By turning the camera on herself, Cindy Sherman established her reputation as one of the most respected photographers of the late twentieth century. The majority of her photographs are pictures of herself; as such, these photographs are most definitely not self-portraits. Rather, Sherman uses herself as a vehicle for commentary on a variety of issues of the modern world: the role of the woman, the role of the artist, and many more. It is through these ambiguous and eclectic photographs that Sherman has developed a distinct signature style. In addition, she has raised important and challenging questions about the role of women in society and the nature of artistic creation.",
  "questions": [
      {
          "question": "What's the best way to write 'as such, these photographs' in the second sentence?",
          "choices": ["A) NO CHANGE", "B) in addition,", "C) in effect,", "D) however,"],
          "answer": "D) however,"
      },
      {
          "question": "What's the best way to write 'In addition, she has raised' in the last sentence?",
          "choices": ["A) NO CHANGE", "B) Therefore,", "C) However,", "D) Consequently,"],
          "answer": "A) NO CHANGE"
      }
  ]
}

]


let passagesAndQuestionsChapter9 = [
  {
    "passage": "Along with her husband Martin Luther King, Coretta Scott King played an important role in the Civil Rights Movement. She was most active after 1968, when she took on the leadership of the struggle for equality and became a key figure in the women's movement.",
    "questions": [
        {
            "question": "What's the best way to write 'husband Martin Luther King,' in the first sentence?",
            "choices": ["A) NO CHANGE", "B) husband Martin Luther King;", "C) husband, Martin Luther King,", "D) husband, Martin Luther King"],
            "answer": "C) husband, Martin Luther King,"
        }
    ]
},
{
  "passage": "Some animal trainers claim that most obedience programs consist of no more than teaching a dog tricks. A dog, that has undergone obedience training, may understand commands such as 'sit,' 'down,' and 'heel' but may still engage in destructive and aggressive behaviors such as chewing shoes or digging up flowers.",
  "questions": [
      {
          "question": "What's the best way to write 'A dog, that has undergone obedience training,' in the second sentence?",
          "choices": ["A) NO CHANGE", "B) dog that has undergone obedience training", "C) dog that, has undergone obedience training", "D) dog, that has undergone obedience training"],
          "answer": "B) dog that has undergone obedience training"
      }
  ]
},
{
  "passage": "Lisa See, author of the best-selling novel, Snow Flower and the Secret Fan, has always been intrigued by stories that have been lost, forgotten, or deliberately covered up. To research the book, See traveled to a remote area of China that she was told only one foreigner before her had ever visited. While there, See was able to investigate a secret type of writing that women had kept hidden for over a thousand years.",
  "questions": [
      {
          "question": "What's the best way to write 'best-selling novel, Snow Flower and the Secret Fan' in the first sentence?",
          "choices": ["A) NO CHANGE", "B) best-selling novel Snow Flower and the Secret Fan", "C) best-selling novel, Snow Flower and the Secret Fan", "D) best-selling novel Snow Flower and the Secret Fan"],
          "answer": "D) best-selling novel Snow Flower and the Secret Fan"
      },
      {
          "question": "What's the best way to write 'that she was told' in the second sentence?",
          "choices": ["A) NO CHANGE", "B) that, she was told", "C) that; she was told"],
          "answer": "A) NO CHANGE"
      }
  ]
},
{
  "passage": "Alfred Mosher Butts, the American architect, created Scrabble™, intended it to be a variation on the existing word game Lexiko. The two games had the same set of letter tiles and point values, which Butts had worked out by analyzing the frequency with which letters appeared in newspapers and magazines. He decided the new game should be called 'Criss-Crosswords' and added the 15 x 15 game board. Butts created a few sets himself, but the first manufacturers who inspected them, did not think that the game was likely to become very popular.",
  "questions": [
      {
          "question": "What's the best way to write 'American architect, created Scrabble™,' in the first sentence?",
          "choices": ["A) NO CHANGE", "B) architect, he created Scrabble™,", "C) architect who created Scrabble™,", "D) architect; who created Scrabble™"],
          "answer": "C) architect who created Scrabble™,"
      },
      {
          "question": "What's the best way to write 'himself, but the first manufacturers who inspected them,' in the last sentence?",
          "choices": ["A) NO CHANGE", "B) himself, but the first manufacturers, who inspected them,", "C) himself, but the first manufacturers, who inspected them", "D) himself; however, the first manufacturers who inspected them"],
          "answer": "D) himself; however, the first manufacturers who inspected them"
      }
  ]
},
{
  "passage": "In November 1895, German physicist Wilhelm Roentgen accidentally discovered an image created by rays emanating from a vacuum tube. Further investigation showed that the rays penetrated many kinds of matter. A week after his discovery, Roentgen photographed the hand of his wife, Anna, clearly revealing her wedding ring and bones. The image, which electrified the general public, aroused great scientific interest in the new form of radiation.",
  "questions": [
      {
          "question": "What's the best way to write 'physicist Wilhelm Roentgen' in the first sentence?",
          "choices": ["A) NO CHANGE", "B) physicist Wilhelm Roentgen,", "C) physicist, Wilhelm Roentgen", "D) physicist, Wilhelm Roentgen,"],
          "answer": "A) NO CHANGE"
      },
      {
          "question": "What's the best way to write 'wife, Anna, clearly revealing' in the third sentence?",
          "choices": ["A) NO CHANGE", "B) wife, Anna clearly revealed", "C) wife Anna; clearly revealing", "D) wife Anna, this clearly revealed"],
          "answer": "A) NO CHANGE"
      },
      {
          "question": "What's the best way to write 'public aroused' in the last sentence?",
          "choices": ["A) NO CHANGE", "B) public, aroused", "C) public, and aroused", "D) public; aroused"],
          "answer": "B) public, aroused"
      }
  ]
},
{
  "passage": "Grant Wood's best known painting, American Gothic, is one of the few images to reach the status of universally recognized cultural icon. It was first exhibited in 1930 at the Art Institute of Chicago, where it is still located. Photographs of the painting, which was awarded a $300 prize, appeared in newspapers country-wide and brought Wood immediate recognition. Since then, it has been borrowed and satirized endlessly for advertisements and cartoons.",
  "questions": [
      {
          "question": "What's the best way to write 'painting, American Gothic' in the first sentence?",
          "choices": ["A) NO CHANGE", "B) painting American Gothic", "C) painting American Gothic,", "D) painting, American Gothic"],
          "answer": "A) NO CHANGE"
      },
      {
          "question": "What's the best way to write 'prize, appeared' in the third sentence?",
          "choices": ["A) NO CHANGE", "B) prize, and appeared", "C) prize, appeared", "D) prize, appearing"],
          "answer": "C) prize, appeared"
      }
  ]
},
{
  "passage": "Certification for school librarians also known as school media specialists, varies by state. Some states require school media specialists to be certified teachers, while others require they have only a Master of Library Science. Some require a Master's Degree in Education with a specialization in library science. In contrast, almost all states require librarians, who work in local libraries, to obtain professional certification.",
  "questions": [
      {
          "question": "What's the best way to write 'librarians also known' in the first sentence?",
          "choices": ["A) NO CHANGE", "B) librarians. Who are also known", "C) librarians, they are also known", "D) librarians, also known"],
          "answer": "D) librarians, also known"
      },
      {
          "question": "What's the best way to write 'librarians, who work in local libraries' in the last sentence?",
          "choices": ["A) NO CHANGE", "B) librarians who work in local libraries,", "C) librarians who work in local libraries", "D) librarians and work in local libraries"],
          "answer": "C) librarians who work in local libraries"
      }
  ]
},
{
  "passage": "Although Mt. Everest is the highest mountain in the world, it is less challenging to climb than some of the other mountains in the Himalayas. High elevations and low temperatures do, however, create a difficult and dangerous trek. Mountain climbers, who want to trek to the summit of Mt. Everest are advised to ensure that they are properly equipped and physically capable of making the journey.",
  "questions": [
      {
          "question": "What's the best way to write 'do, however' in the second sentence?",
          "choices": ["A) NO CHANGE", "B) do; however,", "C) do - however -", "D) do, however"],
          "answer": "A) NO CHANGE"
      },
      {
          "question": "What's the best way to write 'Mountain climbers, who want to trek to the summit of Mt. Everest' in the third sentence?",
          "choices": ["A) NO CHANGE", "B) Mountain climbers, who want to trek to the summit of Mt. Everest", "C) Mountain climbers who want to trek to the summit of Mt. Everest", "D) Mountain climbers who want to trek, to the summit of Mt. Everest."],
          "answer": "C) Mountain climbers who want to trek to the summit of Mt. Everest"
      }
  ]
},
{
  "passage": "First recorded in 1835, the disease, polio, baffled scientific researchers for decades. It was, in fact, the most serious public health problem of the mid-20th century, and scientists were frantic for a cure. During the 1940s, President Franklin D. Roosevelt was the world's most recognized polio victim. In 1938, he founded the organization, March of Dimes, to fund the development of a cure. Before a vaccine was finally discovered by an American scientist, Jonas Salk, in 1955, more than 80% of polio patients received aid from the foundation.",
  "questions": [
      {
          "question": "What's the best way to write 'disease, polio' in the first sentence?",
          "choices": ["A) NO CHANGE", "B) disease polio", "C) disease, polio", "D) disease polio,"],
          "answer": "B) disease polio"
      },
      {
          "question": "What's the best way to write 'was, in fact' in the second sentence?",
          "choices": ["A) NO CHANGE", "B) was, in fact,", "C) was in fact;", "D) was, in fact"],
          "answer": "B) was, in fact,"
      },
      {
          "question": "What's the best way to write 'the organization, March of Dimes' in the fourth sentence?",
          "choices": ["A) NO CHANGE", "B) the organization March of Dimes,", "C) the organization March of Dimes", "D) the organization, March of Dimes,"],
          "answer": "C) the organization March of Dimes"
      },
      {
          "question": "What's the best way to write 'scientist, Jonas Salk' in the last sentence?",
          "choices": ["A) NO CHANGE", "B) scientist Jonas Salk,", "C) scientist, Jonas Salk", "D) scientist, Jonas Salk,"],
          "answer": "D) scientist, Jonas Salk,"
      }
  ]
}

]




let passagesAndQuestionsChapter11 = [
  {
      passage: "Wrangell-St. Elias National Park, the largest national park in the United States, represents everything compelling about Alaska. It is immense-larger, in fact, than Belgium. It showcases towering mountains-Mount St. Elias stands over 18 ,000 feet tall as well as glaciers. Alaska's human history is also displayed in the mining towns of McCarthy and Kennicott. Just getting there is an adventure-it's a long day's drive through miles of wilderness to reach the park's entrance.",
      questions: [
          {
              question: "Which is the correct punctuation for the sentence about Mount St. Elias (first sentence)?",
              choices: ["A) NO CHANGE", "B) over 18,000 feet tall-", "C) over 18,000 feet tall,", "D) over 18,000 feet tall;"],
              answer: "B) over 18,000 feet tall-"
          },
          {
              question: "Which is the correct punctuation for the sentence about the journey to the park (second sentence)?",
              choices: ["A) NO CHANGE", "B) adventure; it's a lengthy driving day", "C) adventure, but it's a long day's drive", "D) adventure. Its a long day's drive"],
              answer: "A) NO CHANGE"
          }
      ]
  },
  {
      passage: "A dentist's job includes tasks such as: filling cavities, examining X-rays, and applying protective sealant. Dentists, who receive medical training similar to that of doctors-can also perform oral surgery on patients and write prescriptions. They also educate patients about caring for teeth and gums by encouraging them to follow a variety of healthy habits, including flossing, brushing, and abiding by a healthy diet.",
      questions: [
          {
              question: "Which is the correct punctuation for the sentence about tasks of a dentist (first sentence)?",
              choices: ["A) NOCHANGE", "B) such as filling cavities; examining", "C) such as filling cavities, examining", "D) such as: filling cavities; examining"],
              answer: "C) such as filling cavities, examining"
          },
          {
              question: "Which is the correct punctuation for the sentence about the medical training of dentists (second setence)?",
              choices: ["A) NOCHANGE", "B) doctors, can", "C) doctors can", "D) doctors; can"],
              answer: "B) doctors, can"
          }
      ]
  },
  {
      passage: "A novel method of air conditioning- which is taking root among some of the world's most powerful corporations, uses the simple power of ice. Not only is the system more environmentally friendly but it also saves millions of dollars in utility bills. The system works by: making ice at night. when lower power usage means energy is cheaper and lower temperatures require less power to freeze water. The larger the difference between nighttime and daytime temperatures, the greater the energy savings.",
      questions: [
          {
              question: "Which is the correct punctuation for the sentence about the novel method of air conditioning (first sentence)?",
              choices: ["A) NOCHANGE", "B) conditioning. Which", "C) conditioning, which", "D) conditioning which"],
              answer: "C) conditioning, which"
          },
          {
              question: "Which is the correct punctuation for the sentence about how the system works (third sentence)?",
              choices: ["A) NO CHANGE", "B) works, by making ice at night", "C) works by making ice at night,", "D) works by- making ice at night"],
              answer: "C) works by making ice at night,"
          }
      ]
  },
  {
      passage: "The northern snakehead is a fish that lives up to its name: its head tapers to a point, making it look as if someone, perhaps a mad scientist - had grafted a snake's head and several inches of scaly body onto a fish. Its fins hang unevenly from its body, as though they were tacked on as an afterthought. Given the fish's wild appearance, it's hardly a surprise that scientists have given it a nickname - Frankenfish.",
      questions: [
          {
              question: "Which is the correct punctuation for the sentence about the northern snakehead's appearance (first sentence)?",
              choices: ["A) NO CHANGE", "B) name. It's head tapers to a point,", "C) name, its head tapers to a point;", "D) name its head tapers to a point"],
              answer: "A) NOCHANGE"
          },
          {
              question: "Which is the correct punctuation for the sentence about the nickname given to the fish?",
              choices: ["A) NO CHANGE", "B) nickname Frankenfish.", "C) nickname: Frankenfish.", "D) nickname; Frankenfish."],
              answer: "C) nickname: Frankenfish."
          }
      ]
  },
  {
      passage: "The appearance of mosaic murals, pictures made of many small pieces - has remained unchanged for thousands of years. However, the last few decades have seen the emergence of a new style. Colorful three-dimensional stone wall murals. One such mural was produced by Janna Morrison in 2005. She combined the piecework of mosaic murals with traditional soapstone slab carving to produce: lifelike tropical plants, flowers, and sea life scenes ranging in size from a few inches to life-size plants inlaid along entire walls.",
      questions: [
          {
              question: "Which is the correct punctuation for the sentence about the appearance of mosaic murals (first sentence)?",
              choices: ["A) NO CHANGE", "B) murals - pictures", "C) murals, pictures,", "D) murals. Pictures"],
              answer: "B) murals - pictures"
          },
          {
              question: "Which is the correct punctuation for the sentence about the new style of murals (second sentence)?",
              choices: ["A) NO CHANGE", "B) style, colorful, three-dimensional", "C) style: colorful, three-dimensional", "D) style; colorful three-dimensional"],
              answer: "C) style: colorful, three-dimensional"
          },
          {
              question: "Which is the correct punctuation for the sentence about the production of lifelike tropical plants, flowers, and sea life scenes (third sentence)?",
              choices: ["A) NO CHANGE", "B) to produce; lifelike, tropical plants, flowers,", "C) to produce - lifelike tropical plants, flowers,", "D) to produce lifelike tropical plants, flowers"],
              answer: "D) to produce lifelike tropical plants, flowers"
          }
      ]
  }
];



let passagesAndQuestionsChapter13 = [
  {
      "passage": "Despite it's brilliance and power, the sun grew out of tiny particles suspended in enormous clouds of dust and gas.",
      "choices": [
        "A) it's",
        "B) its",
        "C) they're",
        "D) their"
      ],
      "answer": "B) Its"
  },
  {
      "passage": "The British scientist J.D. Bernal believed that human being's would eventually be replaced by creatures whose bodies were half-human and half-machine.",
      "choices": [
        "A) being's",
        "B) beings",
        "C) beings'",
        "D) beings's"
      ],
      "answer": "B) beings"
  },
  {
      "passage": "Instrument-makers have tried to reproduce a Stradivarius violin's precise sound for hundreds of years, but all of their attempts have been unsuccessful.",
      "choices": [
        "A) its sound",
        "B) their sound",
        "C) his sound",
        "D) their attempts"
      ],
      "answer": "D) their attempts"
  },
  {
      "passage": "Bats can perceive and stalk their prey in complete darkness, using a system of ultrasonic sounds to produce echoes that identify its location.",
      "choices": [
        "A) its location",
        "B) their location",
        "C) it's location",
        "D) their"
      ],
      "answer": "D) their"
  },
  {
      "passage": "A computer program devoted to facial recognition can determine peoples' emotions by following their faces' movements and linking these readings with a database of expressions.",
      "choices": [
        "A) peoples'",
        "B) people's",
        "C) peoples",
        "D) people"
      ],
      "answer": "B) people's"
  },
  {
      "passage": "George Westinghouse was an electrical industry pioneer whose first major invention, the rotary steam engine, earned him many scientists' admiration when he was still a young man.",
      "choices": [
        "A) who's",
        "B) whose",
        "C) which",
        "D) who"
      ],
      "answer": "B) whose"
  },
  {
      "passage": "Although Los Angeles has long been famous for its traffic jams, pedestrians are now able to walk in the center with much greater ease.",
      "choices": [
        "A) it's traffic jams",
        "B) its traffic jams",
        "C) their traffic jams",
        "D) there traffic jams"
      ],
      "answer": "B) its traffic jams"
  },
  {
      "passage": "The woolly mammoth's appearance and behavior have been studied more than those of most prehistoric animals because its bones have been discovered in many different locations.",
      "choices": [
        "A) it's bones",
        "B) their bones",
        "C) its bones",
        "D) there bones"
      ],
      "answer": "C) its bones"
  },
  {
      "passage": "Individuals whose goal is to obtain an advanced degree in speech-language pathology must first receive their undergraduate degree in a related field.",
      "choices": [
        "A) who's",
        "B) whose",
        "C) which",
        "D) who"
      ],
      "answer": "B) whose"
  },
  {
      "passage": "If the idea of traveling across the United States in an 18-wheeler, flying a commercial jet, or crossing the Atlantic in a cargo vessel appeals to you, then a career in transportation might be just what you're looking for.",
      "choices": [
        "A) your",
        "B) you're",
        "C) you",
        "D) you are"
      ],
      "answer": "B) you're"
  },
  {
      "passage": "The peacock is a bird whose penchant for showing off its bright, multicolored plumage has made it a symbol of vanity and pride in many different cultures.",
      "choices": [
        "A) who's",
        "B) whose",
        "C) which",
        "D) who"
      ],
      "answer": "B) whose"
  },
  {
      "passage": "The gray wolf, which once lived throughout much of North America, is now rarely spotted because its habitat has been almost entirely destroyed.",
      "choices": [
        "A) it's habitat",
        "B) their habitat",
        "C) its habitat",
        "D) there habitat"
      ],
      "answer": "C) its "
  },
  {
      "passage": "Every spring, New Orleans receives thousands of tourists for Mardi Gras, the year's most important festival. Visitors arrive there from around the world.",
      "choices": [
        "A) years",
        "B) year",
        "C) year's",
        "D) years'"
      ],
      "answer": "C) year's"
  },
  {
      "passage": "Because the lemur shares some traits with other primates, it's frequently mistaken for an ancestor of modern monkeys and apes.",
      "choices": [
        "A) its",
        "B) it's",
        "C) they're",
        "D) their"
      ],
      "answer": "B) it's"
  },
  {
      "passage": "An exceptional garden design, one that is well-planned and executed, can raise a garden's value more than its location can.",
      "choices": [
        "A) gardens'",
        "B) garden's",
        "C) garden",
        "D) gardens"
      ],
      "answer": "C) Garden"
  }
];



let passagesAndQuestions14 = [
  {
      "passage": "New types of digital technology have allowed acoustic engineers to create sophisticated noise-filtering devices. As a result, he or she can now eliminate unwanted noise with a precision never before possible.",
      "questions": [
          {
              "question": "Which pronoun correctly refers to the acoustic engineers in the context of the sentence?",
              "choices": ["A) NO CHANGE", "B) one", "C) we", "D) they"],
              "answer": "D) they"
          }
      ],
      
  },
  {
      "passage": "Hidden between a bookstore and a cafe, San Francisco's Jack Kerouac Alley is easy to overlook. Once a place to throw garbage, they've been transformed into an inviting pedestrian-only thoroughfare, complete with decorative lampposts and poetry in English and Chinese lining the walkway.",
      "questions": [
          {
              "question": "Which is the correct form for the main clause of the sentence?",
              "choices": ["A) NO CHANGE", "B) they'd", "C) it's", "D) he's"],
              "answer": "C) it's"
              
          }
      ],
     
  },
  {
      "passage": "Deserts are found on every continent, including Antarctica. They're often the site of unusual rock formations and, in some cases, amazing archaeological finds. Many of the largest ones, including the Gobi Desert and the Patagonian Desert, are located in the shadows of immense mountain ranges that block moisture from nearby oceans or bodies of water.",
      "questions": [
          {
              "question": "Which pronoun correctly refers to the deserts in the context of the sentence?",
              "choices": ["A) NO CHANGE", "B) They're", "C) Their", "D) It's"],
              "answer": "B) They're"
          }
      ],
    
  },
  {
      "passage": "The most common movements we make while asleep are rapid eye movements. When we dream, our eyes move in accordance with our dreams. If, for example, we dream about watching a game of tennis, one's eyes will move from left to right with each volley. These movements, generated in the dream world, leak into the real world. When the eyes of a sleeping person move, that is the strongest sign that he or she is dreaming.",
      "questions": [
          {
              "question": "Which is the correct form for the sentence about the eyes' movement?",
              "choices": ["A) NO CHANGE", "B) our eyes", "C) their eyes", "D) they're eyes"],
              "answer": "B) our eyes"
          }
      ],
    
  },
  {
      "passage": "You're up to your knees in mud and weeds, getting bitten by things you can't identify. One's surroundings seem to grow more hostile by the minute. Meanwhile, you search for a creature that probably ran away hours ago and couldn't care less about communing with you. And as you open your notebook, the sky opens and drenches them. Welcome to the world of nature writing.",
      "questions": [
          {
              "question": "Which is the correct form for the sentence about the surroundings?",
              "choices": ["A) NO CHANGE", "B) Your surroundings", "C) You're surroundings", "D) Their surroundings"],
              "answer": "C) You're surroundings"
          }
      ],
  
  },
  {
      "passage": "Miles Dewey Davis III (May 26, 1926 - September 28, 1991) was an American jazz musician, trumpeter, bandleader, and composer. Known for creating a unique sound through the use of non-traditional instruments such as the French horn, Davis joined Ella Fitzgerald and Duke Ellington as the most renowned performers in the United States during the mid-twentieth century.",
      "questions": [
          {
              "question": "What is the correct way to describe Davis' status among performers in the mid-twentieth century?",
              "choices": ["A) NO CHANGE", "B) the most renowned performers,", "C) one of the most renowned performers", "D) one of the more renowned performers"],
              "answer": "C) one of the most renowned performers"
          }
      ],
      
  },
  {
      "passage": "According to author Nadine Gordimer, the process of writing fiction is unconscious, emerging from what people learn and how they live. Gordimer, who was born in South Africa in 1923, was an authority on that subject. She received the Nobel Prize in Literature in 1991, having attained international recognition for her work. At the time she won that, she had published 10 novels, dozens of short stories, essay collections, and a play.",
      "questions": [
          {
              "question": "What is the correct form for the phrase describing the process of writing fiction?",
              "choices": ["A) NO CHANGE", "B) one lives.", "C) you live.", "D) we live."],
              "answer": "A) NO CHANGE"
          }
      ],
      
  },
  {
      "passage": "Webs allow spiders to catch prey without having to expend energy chasing it around. However, spinning a web is a tiring dilemma because of the large amount of protein required, in the form of silk. In addition, silk quickly loses its stickiness and becomes inefficient at capturing prey. As a result, spiders often eat its own webs daily to regain some of the energy used in spinning. The silk proteins are thus recycled.",
      "questions": [
          {
              "question": "What is the correct form for the sentence about the process of spinning a web?",
              "choices": ["A) NO CHANGE", "B) spinning a web is a tiring process", "C) its a tiring process", "D) they're process is tiring"],
              "answer": "B) spinning a web is a tiring process"
          }
      ],

  },
  {
      "passage": "There are over 3,000 lizard species, but the Komodo dragon, a reptile with ancestors that date back more than 100 million years, wins the prize for being the largest living lizard in the world. They're name came from rumors of a large dragon-like lizard inhabiting the warm, hilly islands of Indonesia. Indeed, the yellow color of its long forked tongue reminds people of a mythical fire-spitting dragon. Despite its ancient roots, the Komodo dragon was unknown to them until 1910, when it was observed in Komodo National Park.",
      "questions": [
          {
              "question": "Which is the correct form for the sentence about the name of the Komodo dragon?",
              "choices": ["A) NO CHANGE", "B) Their", "C) Its", "D) It's"],
              "answer": "C) Its"
          }
      ],

  },
  {
    "passage": "There are around 300 octopus species, all of which can change colors, squirt poison, and exert a force greater than that of their own body weight. In fact, they're part of an elite group of marine creatures with remarkably large brains. Scientists have found that the octopus brain, while different from the human brain, has developed along similar lines and may be capable of supporting complex problem-solving and learning behavior.",
    "questions": [
        {
            "question": "Which is the correct form for the sentence about the capabilities of octopus species?",
            "choices": ["A) NO CHANGE", "B) their", "C) its", "D) it's"],
            "answer": "A) NO CHANGE"
        }
    ],
   
},
];




const passagesAndQuestions15 = [
  // Passage 1
  // Passage 1
  {
    "passage": "Each July, one of the world's largest folk art festivals bring together artists from every corner of the globe for a vast and colorful international bazaar. For several weeks, more than 200 artists from 60 countries gather to offer handmade masterworks. The festival is located in Santa Fe, a destination rich in culture and history. The work of master artists lines the walls as market-goers are given the opportunity to find one-of-a-kind treasures and meet their creators.",
    "questions": [
        {
            "question": "For sentence 1, which is the correct form for the main clause of the sentence?",
            "choices": ["A) NOCHANGE", "B) bringing", "C) brought", "D) brings"],
            "answer": "D) brings"
        },
        {
            "question": "For sentence 4, which is the correct form for the sentence about the walls?",
            "choices": ["A) NOCHANGE", "B) have lined", "C) lining", "D) line"],
            "answer": "A) NOCHANGE"
        }
    ]
},
// Passage 2
{
    "passage": "Kite-flying has a long history in Japan: according to legend, the first kites were flying nearly 1,400 years ago. Since that time, kite-flying had remained a delightful tradition. Kites are made from a bamboo framework and layers of washi paper-paper made by hand in the traditional style. Colorful narrative illustrations and legendary heroes from Japanese folklore decorates their surfaces. Every region of the country has its own distinct kite design, with more than 130 varieties in all. For this reason, there is no single design that are typical of Japanese kites.",
    "questions": [
        {
            "question": "For sentence 2, which is the correct form for the sentence about the first kites?",
            "choices": ["A) NOCHANGE", "B) flown", "C) were flown", "D) had flew"],
            "answer": "C) were flown"
        },
        {
            "question": "For sentence 3, which is the correct form for the sentence about kite-flying tradition?",
            "choices": ["A) NOCHANGE", "B) would have remained", "C) will remain", "D) has remained"],
            "answer": "D) has remained"
        },
        {
            "question": "For sentence 5, which is the correct form for the sentence about decorations on the kites?",
            "choices": ["A) NOCHANGE", "B) decorate", "C) decorating", "D) has decorated"],
            "answer": "B) decorate"
        },
        {
            "question": "For sentence 7, which is the correct form for the sentence about the design of Japanese kites?",
            "choices": ["A) NOCHANGE", "B) will be", "C) is", "D) had been"],
            "answer": "C) is"
        }
    ]
},
// Passage 3
{
  "passage": "In a village at the edge of the rainforest, the skilled and nimble fingers of an old woman bends fabric and straw into graceful baskets. The baskets are the perfect size to hold papayas, but they also held centuries of craft and tribal identity. Basket weaving is one of the most widespread crafts in history: it originated in the Middle East around 7,000 years ago and spread to every continent except Antarctica. The preservation of ancient baskets is difficult, however, because most items are made of natural materials like wood, grass, and vines, which decay rapidly. As a result, much of the history of basket making would be lost. On the other hand, weaving techniques, which are often passed along from generation to generation, has been preserved throughout the centuries and are still being expanded upon today.",
  "questions": [
      {
          "question": "Which is the correct form for the sentence 1 about the old woman bending fabric?",
          "choices": ["A) NOCHANGE", "B) will bend", "C) bend", "D) has bent"],
          "answer": "C) bend"
      },
      {
          "question": "Which is the correct form for the sentence 2 about the baskets?",
          "choices": ["A) NOCHANGE", "B) they would also hold", "C) they would have also held", "D) they are also holding"],
          "answer": "D) they are also holding"
      },
      {
          "question": "Which is the correct form for the sentence 4 about preservation of ancient baskets?",
          "choices": ["A) NOCHANGE", "B) are", "C) were", "D) being"],
          "answer": "A) NOCHANGE"
      },
      {
          "question": "Which is the correct form for the sentence 5 about the history of basket making?",
          "choices": ["A) NOCHANGE", "B) has been", "C) will have been", "D) would have been"],
          "answer": "B) has been"
      },
      {
          "question": "Which is the correct form for the sentence 6 about weaving techniques?",
          "choices": ["A) NOCHANGE", "B) have been preserved", "C) is preserved", "D) preserved"],
          "answer": "B) have been preserved"
      }
  ]
}, {
  "passage": "As the world's first supersonic passenger jet, the Concorde was regarded as a marvel of engineering. Most jets fly at maximum speeds of about 550 miles per hour, but the Concorde could have gone more than two times as fast- double the speed of sound. During its 27 years of service, the world's fastest commercial aircraft transported passengers across the Atlantic ocean in only two hours. Although the Concorde was retired in 2003, a plane that is capable of flying halfway around the world in a mere four hours might soon exist. For engineers, eliminating sonic booms have been one of the biggest challenges involved in building the new craft. Airplanes that break the sound barrier are extremely loud, so they must be flown primarily over water. Engineers claim, however, that they have found a way of reducing the amount of noise the planes makes. The solution involves thinner wings and hidden engines. Moreover, lightweight materials and innovative engine technology allow the plane to fly twice as fast as the Concorde.",
  "questions": [
    {
      "question": "Which is the correct form for the sentence 2 about the Concorde's speed?",
      "choices": ["A) NO CHANGE", "B) gone", "C) will go", "D) went"],
      "answer": "D) went"
  },
  {
      "question": "Which is the correct form for the sentence 5 about eliminating sonic booms?",
      "choices": ["A) NO CHANGE", "B) were", "C) is", "D) are"],
      "answer": "C) is"
  },
  {
      "question": "Which is the correct form for the sentence 7 about reducing the plane noise?",
      "choices": ["A) NOCHANGE", "B) have made", "C) making", "D) make"],
      "answer": "D) make"
  },
  {
      "question": "Which is the correct form for the sentence 9 about the plane's speed?",
      "choices": ["A) NOCHANGE", "B) has allowed", "C) is allowing", "D) allows"],
      "answer": "A) NOCHANGE"
  }
]},
{
"passage": "In North America, cranberries were cultivated by Native Americans long before the first European settlers arrived, but not until the mid-nineteenth century was the first berries marketed and sold. Sometime around 1800, the British scientist Sir Joseph Banks used seeds from the United States to harvest cranberries in England, but Banks did not market his crop. Then, in 1816, Henry Hall, a veteran of the Revolutionary war, planted the first recorded commercial cranberry bog in Dennis, Massachusetts. By the mid-nineteenth century, the modern cranberry industry was in full swing, and competition among growers were fierce. The business operated on a small scale at first: families and individuals harvested wild cranberries, selling them locally. As the market grows to include larger cities such as Boston and New York, farmers competed to unload their surplus cranberries quickly. What was once a local venture has become a highly profitable business.",
"questions": [
    {
        "question": "Which is the correct form for the sentence 2 about the first berries being marketed and sold?",
        "choices": ["A) NOCHANGE", "B) were", "C) was", "D) is"],
        "answer": "B) were"
    },
    {
        "question": "Which is the correct form for the sentence 4 about Banks not marketing his crop?",
        "choices": ["A) NOCHANGE", "B) does not", "C) did not", "D) has not"],
        "answer": "A) NOCHANGE"
    },
    {
        "question": "Which is the correct form for the sentence 7 about competition among growers?",
        "choices": ["A) NOCHANGE", "B) was", "C) is", "D) are"],
        "answer": "B) was"
    },
    {
        "question": "Which is the correct form for the sentence 9 about the growth of the market?",
        "choices": ["A) NOCHANGE", "B) grew", "C) grow", "D) grows"],
        "answer": "C) grow"
    },
    {
        "question": "Which is the correct form for the sentence 11 about the cranberry business?",
        "choices": ["A) NOCHANGE", "B) became", "C) is becoming", "D) becomes"],
        "answer": "B) became"
    }
]
}, 
{
  "passage": "Ever since scientists discovered that the fingerprints of each person on earth was unique, fingerprinting has played an important role in law enforcement. Modern fingerprinting has come a long way from the time when police officers lift prints from a crime scene and checked them manually. Fingerprints are now used in many ways: to prevent forged signatures, confirm job applicants' identities, and provide personalized access to everything from ATMs to computer networks. Modern fingerprinting techniques can not only check millions of criminal records in a few seconds, but they have also matched faces and other identifiable characteristics specific to each perpetrator.",
  "questions": [
    {
      "question": "Which is the correct form for sentence 1 about unique fingerprints?",
      "choices": ["A) NOCHANGE", "B) is", "C) are", "D) being"],
      "answer": "C) are"
    },
    {
      "question": "Which is the correct form for sentence 2 about lifting prints?",
      "choices": ["A) NOCHANGE", "B) have lifted", "C) would lift", "D) will lift"],
      "answer": "C) would lift"
    },
    {
      "question": "Which is the correct form for sentence 4 about matching faces?",
      "choices": ["A) NOCHANGE", "B) can also match", "C) had also matched", "D) having also matched"],
      "answer": "B) can also match"
    }
  ]
},
{
  "passage": "When I recently traveled to Colombia to see my extended family, I had the opportunity to visit a variety of interesting and unique sites. One of my favorite attractions were the National Coffee Theme Park, an amusement park located just south of the town of Montenegro. The park, which can be reached from cable cars, features a global coffee garden, a roller coaster, coffee-based food stalls, and many examples of Colombian folk architecture. It consists of two main areas: by the entrance is the buildings housing the museum and exhibitions, and in the valley beyond is an amusement park with rides and shows. The museum includes exhibits on coffee farming and harvesting, and the amusement park offers over 20 rides and attractions. The two areas are linked by a cable car, but it is also possible to walk between them via an ecological trail that pass through a plantation of coffee bushes.",
  "questions": [
    {
      "question": "Which is the correct form for sentence 2 about the National Coffee Theme Park?",
      "choices": ["A) NOCHANGE", "B) was", "C) are", "D) being"],
      "answer": "B) was"
    },
    {
      "question": "Which is the correct form for sentence 3 about the park's features?",
      "choices": ["A) NOCHANGE", "B) feature", "C) having featured", "D) had featured"],
      "answer": "A) NOCHANGE"
    },
    {
      "question": "Which is the correct form for sentence 4 about the buildings housing the museum?",
      "choices": ["A) NOCHANGE", "B) were", "C) was", "D) are"],
      "answer": "D) are"
    },
    {
      "question": "Which is the correct form for sentence 7 about the ecological trail?",
      "choices": ["A) NOCHANGE", "B) passes", "C) will pass", "D) passing"],
      "answer": "B) passes"
    }
  ]
},
{
  "passage": "The construction of prefabricated houses is based on the assembly-line model of car manufacturing developed by Henry Ford. In the 1920s, Ford's production method for the Model T transforms the automobile from a luxury item into a purchase that was affordable for the average consumer. Today, assembly-line production and bulk buying has driven down the cost and construction time for prefabricated homes. The production process has evolved significantly since the first prefabricated homes were built at the turn of the twentieth century, and houses can now be constructed in only a matter of weeks. Furthermore, a number of potential additions now allows buyers to customize their homes. Just as satellite radios and heated seats can be added to cars, Jacuzzis and crown molding can be added to prefabricated houses.",
  "questions": [
    {
      "question": "Which is the correct form for sentence 2 about Ford's production method?",
      "choices": ["A) NOCHANGE", "B) transformed", "C) has transformed", "D) will transform"],
      "answer": "B) transformed"
    },
    {
      "question": "Which is the correct form for sentence 3 about assembly-line production?",
      "choices": ["A) NOCHANGE", "B) has driven down", "C) had driven down", "D) driving down"],
      "answer": "B) has driven down"
    },
    {
      "question": "Which is the correct form for sentence 4 about the production process?",
      "choices": ["A) NOCHANGE", "B) had evolved", "C) will evolve", "D) evolved"],
      "answer": "A) NOCHANGE"
    },
    {
      "question": "Which is the correct form for sentence 5 about potential additions?",
      "choices": ["A) NOCHANGE", "B) has allowed", "C) allow", "D) allowing"],
      "answer": "C) allow"
    }
  ]

}

];

var passagesAndQuestions16 = [
  {
    "passage": "Exploration and discovery have been a part of American history since the fifteenth century, and no expedition was as influential in shaping the United States as Meriwether Lewis and William Clark. In 1803, they set out to find an all-water route to the Pacific Ocean. The purchase of the Louisiana Territory that year had opened vast lands for settlement. Under orders from President Thomas Jefferson, Lewis, Clark and their group of woodsmen, hunters, and translators not only blazed a trail into the wilderness and they spent three years making their way across the continent.",
    "questions": [
        {
            "question": "For sentence 2, which is the correct form for the phrase about Lewis and Clark's expedition?",
            "choices": ["A) NOCHANGE", "B) than Meriwether Lewis and William Clark", "C) than the expedition led by Meriwether Lewis and William Clark", "D) as the expedition led by Meriwether Lewis and William Clark"],
            "answer": "D) as the expedition led by Meriwether Lewis and William Clark"
        },
        {
            "question": "For sentence 4, which is the correct form for the phrase about their journey?",
            "choices": ["A) NOCHANGE", "B) and spending", "C) and they spent", "D) but they also spent"],
            "answer": "D) but they also spent"
        }
    ]
},
{
    "passage": "Meteoroids are the smallest members of the solar system, ranging from large chunks of rock and metal to minuscule fragments no larger than a grain of sand. Whenever a meteoroid plows into the Earth's atmosphere, it creates a meteor: a very brief flash of light in the sky. Millions of meteors occur in the Earth's atmosphere daily. Just as many meteoroids appear in the atmosphere during daylight as appear at night; however, meteors are usually observed after dark, when faint objects can more easily be identified. The light produced by a meteor may come in a variety of shades, depending on the chemical composition of the meteoroid and the speed of its movement through the atmosphere.",
    "questions": [
        {
            "question": "For sentence 1, which is the correct form for the phrase about the size of meteoroids?",
            "choices": ["A) NOCHANGE", "B) than", "C) as", "D) from"]
        },
        {
            "question": "For sentence 4, which is the correct form for the phrase about meteoroids appearing in the atmosphere?",
            "choices": ["A) NOCHANGE", "B) as appearing", "C) than appear", "D) than would appear"]
        }
    ]
},
{
    "passage": "Julia Child might have been one of the more prominent American chefs of the twentieth century, but her reliance on recipes was greater than almost any other cook of her caliber. Child was famous for the exceptional amount of detail she put into her recipes as she perfected them for publication. For example, her recipe for white sandwich bread was one of her simplest recipes, but she revised it repeatedly throughout her long career; neither her friends or her fellow cooks could persuade her to be satisfied. The recipe was first published in Mastering the Art of French Cooking, but that was just the beginning. Not only did Child re-publish a slightly different version less than a decade later and in 2000 it also appeared in one of her last books, Julia's Kitchen Wisdom.",
    "questions": [
        {
            "question": "For sentence 1, which is the correct form for the phrase about Julia Child's reliance on recipes?",
            "choices": ["A) NOCHANGE", "B) her reliance on recipes was more than", "C) she relied on recipes more than did", "D) she relied on recipes more then"]
        },
        {
            "question": "For sentence 3, which is the correct form for the phrase about the recipe's publication?",
            "choices": ["A) NOCHANGE", "B) nor", "C) and", "D) but"]
        },
        {
            "question": "For sentence 5, which is the correct form for the phrase about the recipe appearing in Julia's Kitchen Wisdom?",
            "choices": ["A) NOCHANGE", "B) and in 2000 it also appeared", "C) also appearing in 2000", "D) but it also appeared in 2000"]
        }
    ]
},
{
    "passage": "When steel magnate Andrew Carnegie purchased the land for his New York City house in 1898, he purposely bought property as far north as possible. The relatively spacious grounds were large enough for a terrace as well as a private garden - one of the few in Manhattan. Completed in 1901, the house had features more modern than any other house in New York City. It was also the first private residence in the United States to be built on a steel frame, and one of the first in New York to have a passenger elevator. Furthermore, the house contained not only a central heating system plus an early form of air conditioning. In the basement, a miniature railroad car transported coal to an immense pair of boilers.",
    "questions": [
        {
            "question": "For sentence 1, which is the correct form for the phrase about where Carnegie bought property?",
            "choices": ["A) NOCHANGE", "B) than", "C) then", "D) DELETE the underlined word"]
        },
        {
            "question": "For sentence 3, which is the correct form for the phrase about the house's features?",
            "choices": ["A) NOCHANGE", "B) than any other house in New York City", "C) as that of any other house in New York City", "D) than those of any other house in New York City"]
        },
        {
            "question": "For sentence 5, which is the correct form for the phrase about the house's heating system?",
            "choices": ["A) NOCHANGE", "B) as", "C) but also", "D) in addition to"]
        }
    ]
},
// Passage 10
{
  "passage": "During World War II, a gasoline shortage forced many drivers to install power generators that converted wood into gas, a process known as gasification. The generators were clunky, but there was no alternative: motorists could either use them and give up driving altogether. The generators were quickly forgotten once fossil fuels became readily available, but over 50 years later, gasification was rediscovered 6,000 miles away as a potential source of alternative power. All Power Labs, a California-based company, has slowly begun resurrecting this  more than century-old technology. In five years, the company has sold hundreds of generators known as 'Power Pallets.' Each pallet is approximately as large as the size of a refrigerator and can produce clean fuel for about 15% of the usual cost. For countries with few natural resources, the pallets open up a whole new world of possibilities.",
  "questions": [
      {
          "question": "For sentence 2, which is the correct form for the sentence about using the generators or giving up driving?",
          "choices": ["A) NOCHANGE", "B) or", "C) with", "D) also"]
      },
      {
          "question": "For sentence 4, which is the correct form for the sentence about resurrecting the technology?",
          "choices": ["A) NOCHANGE", "B) more than", "C) much as", "D) more"]
      },
      {
          "question": "For sentence 5, which is the correct form for the sentence about the size of the Power Pallets?",
          "choices": ["A) NOCHANGE", "B) than the size of a refrigerator", "C) than a refrigerator", "D) as a"]
      }
  ]
}
]



var passagesAndQuestions17 = [
  {
    "passage": "Spiders are predators. In the insect world, they're fearsome animals-the tiny equivalent of wolves, lions, or actinig like sharks, Spiders use a wide range of strategies to capture prey, including trapping it in sticky webs, lassoing it with sticky bolas, and to mimic other insects in order to avoid detection. Trap door spiders dig holes: covering them up with doors made of spider silk and Iyini in wait for passing prey.",
    "questions": [
        {
            "question": "For sentence 1, Which is the correct form for the phrase about spiders acting like sharks?",
            "choices": ["NOCHANGE", "or they act like sharks.", "or sharks.", "or as sharks."]
        },
        {
            "question": "For sentece 2, Which is the correct form for the phrase about spiders mimicking other insects?",
            "choices": ["NOCHANGE", "they mimic", "mimicking", "mimic"]
        },
        {
            "question": "For sentence 4, Which is the correct form for the phrase about trap door spiders covering their holes?",
            "choices": ["NOCHANGE", "covering them up with doors made of spider silk, and to lie", "cover them up with doors made of spider silk, and then they lie", "to cover them up with doors made of spider silk, and lying"]
        }
    ]
},
// Passage 2
{
    "passage": "Copy editors review documents for errors in grammar, punctuation, and how words are spelled. They suggest revisions such as changing words and to rearrange sentences and paragraphs to improve clarity or accuracy. They also may carry out research, confirm sources for writers, and will verify facts, dates, or statistics. Finally, they may arrange page layouts of articles, photographs, and advertisements.",
    "questions": [
        {
            "question": "For sentence 1, Which is the correct form for the phrase about how words are spelled?",
            "choices": ["NOCHANGE", "spelling.", "the ways words are spelled.", "how you spell words."]
        },
        {
            "question": "For sentence 2, Which is the correct form for the phrase about rearranging sentences and paragraphs?",
            "choices": ["NOCHANGE", "rearranging", "rearrange", "will rearrange"]
        },
        {
            "question": "For sentence 3, Which is the correct form for the phrase about verifying facts, dates, or statistics?",
            "choices": ["NOCHANGE", "verifying", "they verify", "verify"]
        }
    ]
},
{
  "passage": "Whether it's with a sympathetic tilt of the head or an excited sweep of the tail, dogs often seem to be saying they can sense exactly what we're feeling. Scientists have long been uncertain whether dogs can read human emotions, but evidence is growing that canines can accurately 'read' what people feel. In fact, a recent study found that dogs are able to distinguish between expressions that indicate happiness and those in which anger is indicated.",
  "questions": [
      {
          "question": "For sentence 1, Which is the correct form for the phrase about dogs sweeping their tails?",
          "choices": ["NO CHANGE", "sweeping their tails excitedly,", "their tails sweeping excitedly,", "they sweep their tails excitedly"]
      },
      {
          "question": "For sentence 3, Which is the correct form for the phrase about expressions indicating anger?",
          "choices": ["NO CHANGE", "and those in which anger is indicated for.", "and ones that indicate anger.", "with ones where anger is indicated."]
      }
  ]
},
// Passage 4
{
  "passage": "First there was the frostquake. Then there was the firenado. Thundersnow is what there is now. Thundersnow is essentially the same as a thunderstorm; the only difference is that snow falls instead of rain falling. It occurs when the layer of air closest to the ground is cold enough to create snow but being warmer than the air above it. When thundersnow occurs at night, lightning appears brighter because it is reflected against the snowflakes.",
  "questions": [
      {
          "question": "For sentence 1, Which of the following best preserves the phrase pattern already established in the paragraph?",
          "choices": ["NO CHANGE", "At the present time, thundersnow exists.", "Thundersnow is here now.", "Now there's thundersnow."]
      },
      {
          "question": "For sentence 2, Which is the correct form for the phrase about snow falling during thundersnow?",
          "choices": ["NO CHANGE", "that falls.", "it falls.", "DELETE the underlined word (placing a period after the word 'rain')."]
      },
      {
          "question": "For sentence 3, Which is the correct form for the phrase about the layer of air being warmer?",
          "choices": ["NO CHANGE", "and also warmer", "but it is warmer", "but warmer"]
      }
  ]
},
{
  "passage": "Architects design buildings. Civil engineers build bridges. D Without structural engineers, everything could twist and shake apart. Their know-how is vital to mastering green construction's novel materials and innovative practices, whether used to harness the force of the wind or D capturing the power that the waves have. Green structures excite us by emphasizing particular goals - such as eliminating carbon emissions - and accomplishing them via potentially beautiful forms. Green structural engineers formulate new architectural questions and determine new criteria for evaluating the answers.",
  "questions": [
      {
          "question": "For sentence 1, Which of the following best preserves the phrase pattern already established in the paragraph?",
          "choices": ["NO CHANGE", "Structural engineers keep everything from twisting and shaking apart.", "Twisting and shaking apart is what structural engineers keep from happening.", "Everything is kept from twisting and shaking apart by structural engineers."]
      },
      {
          "question": "For sentence 2, Which is the correct form for the phrase about capturing the power of the waves?",
          "choices": ["NO CHANGE", "capturing the waves' power.", "capture the power of the waves.", "capture the power possessed by the waves."]
      }
  ]
},
// Passage 6
{
  "passage": "First popularized in Japan, Haiku is a form of poetry that has become appreciated around the world. Haiku poets are challenged to convey a vivid message in only 17 syllables. In Japan, these poems are valued for their simplicity, openness, and being light. Haiku poems can describe anything, but they are seldom complicated or people have difficulty understanding them. Each Haiku must contain a kigo, a season word that indicates what time of the year the Haiku is set. For example, blossoms would indicate spring, snow would give the idea of winter, and summertime would be suggested by mosquitoes. The seasonal word isn't always obvious, though. Sometimes it is necessary to consider the theme of the poem to find it.",
  "questions": [
      {
          "question": "For sentence 3, Which is the correct form for the phrase about Haiku poems being light?",
          "choices": ["NO CHANGE", "sense of lightness.", "having lightness.", "they are light."]
      },
      {
          "question": "For sentence 3, Which is the correct form for the phrase about people having difficulty understanding Haiku?",
          "choices": ["NO CHANGE", "cause difficulties in understanding.", "to understand them is difficult.", "difficult to understand."]
      },
      {
          "question": "For sentence 5, Which is the correct form for the phrase about summertime being suggested by mosquitoes?",
          "choices": ["NO CHANGE", "a suggestion of summertime is given by mosquitoes.", "mosquitoes would suggest summertime.", "summertime is suggested by mosquitoes."]
      }
  ]
},
{
  "passage": "Crop circles. Alien abductions. A person travels through time. These are just some of the paranormal phenomena that people have believed in but that were later found to be hoaxes. Some of the largest hoaxes in history started out as one small lie but then continued to grow because people believed them. Great hoaxes require great numbers of gullible people willing to suspend disbelief and accept outlandish explanations in the face of the inexplicable.",
  "questions": [
      {
          "question": "For sentence 3, Which of the following best preserves the phrase pattern already established in the paragraph?",
          "choices": ["NO CHANGE", "Traveling through time.", "Time travel.", "To travel through time."]
      },
      {
          "question": "For sentence 6, Which is the correct form for the phrase about people accepting outlandish explanations?",
          "choices": ["NO CHANGE", "accepting", "they accept", "will accept"]
      }
  ]
},
// Passage 8
{
  "passage": "For centuries, there have been reports of strange bright lights in the sky just before, during, or after an earthquake. When an earthquake hit New Zealand in 1888, for example, spectators claimed to see 'luminous appearances' and feeling 'an extraordinary glow.' Over the years, however, descriptions have varied widely: the lights have been described as flaring white streaks, floating orbs, and flames that flicker. Sometimes the lights appeared for just a few seconds, but other times they hovered in the sky for minutes or even hours at a time.",
  "questions": [
      {
          "question": "For sentence 1, Which is the correct form for the phrase about when the strange bright lights appear?",
          "choices": ["NO CHANGE", "occurring after", "they occur after", "DELETE the underlined word."]
      },
      {
          "question": "For sentence 2, Which is the correct form for the phrase about spectators feeling 'an extraordinary glow'?",
          "choices": ["NO CHANGE", "feel", "would feel", "have felt"]
      },
      {
          "question": "For sentence 4, Which is the correct form for the phrase about the lights being described as flames that flicker?",
          "choices": ["NO CHANGE", "and flames flicker.", "and flames that flicker.", "and flickering flames."]
      },
      {
          "question": "For sentence 6, Which is the correct form for the phrase about the lights hovering in the sky for hours?",
          "choices": ["NO CHANGE", "even in hours", "even with hours", "even for hours"]
      }
  ]
},
{
  "passage": "Throughout World War II, the United States government rationed foods such as sugar, milk, coffee, meat, and the consumption of canned goods. Labor and transportation shortages made it hard to harvest and moving fruits and vegetables to market, so individual citizens were encouraged to grow their own fruits and vegetables in 'victory gardens.' Millions of gardens in all shapes and sizes produced abundant food to support the war effort. Gardens were planted not only in backyards and empty lots as well as in window boxes. Neighbors pooled their resources, planting different kinds of foods and forming cooperatives. While the gardens themselves are now gone, posters, seed packets, photos, and reading newspaper articles still remain to tell us the story of victory gardens.",
  "questions": [
      {
          "question": "For sentence 1, Which is the correct form for the phrase about rationing the consumption of canned goods?",
          "choices": ["NO CHANGE", "to consume canned goods.", "consuming canned goods.", "canned goods."]
      },
      {
          "question": "For sentence 2, Which is the correct form for the phrase about moving fruits and vegetables to market?",
          "choices": ["NO CHANGE", "move", "they moved", "having moved"]
      },
      {
          "question": "For sentence 3, Which is the correct form for the phrase about where gardens were planted?",
          "choices": ["NO CHANGE", "and for", "but also in", "but also to"]
      },
      {
          "question": "For sentence 5, Which is the correct form for the phrase about reading newspaper articles?",
          "choices": ["NO CHANGE", "To read", "read newspapers", "DELETE the underlined word."]
      }
  ]
},
// Passage 10
{
  "passage": "Maria Montessori (1870 - 1952) was an Italian physician and she worked as an educator. She is known for the philosophy of education that bears her name and for her writings on scientific pedagogy. Today, her educational methods are used in schools throughout the world. Montessori did not set out to be a teacher, however, only she became a scientist. At the age of sixteen, she enrolled at the Leonardo da Vinci Technical Institute, where she did well in the sciences and mathematics. She initially intended to study engineering but eventually to settle on medicine.",
  "questions": [
      {
          "question": "For sentence 1, Which is the correct form for the phrase about Montessori working as an educator?",
          "choices": ["NO CHANGE", "as an educator.", "to be an educator.", "educator."]
      },
      {
          "question": "For sentence 2, Which is the correct form for the phrase about Montessori's philosophy and writings?",
          "choices": ["NO CHANGE", "as well as from", "and also through", "and to"]
      },
      {
          "question": "For sentence 4, Which is the correct form for the phrase about Montessori becoming a scientist?",
          "choices": ["NO CHANGE", "becoming", "to become", "she would become"]
      },
      {
          "question": "For sentence 6, Which is the correct form for the phrase about Montessori deciding to study medicine?",
          "choices": ["NO CHANGE", "will settle on", "settled on", "settling"]
      }
  ]
}


]

var  passagesAndQuestions18= [
  {
    "passage": "Born in Italy in 1853, Maria Spelterini emigrated to the United States as a young woman and quickly became known for her breathtaking stunts. In 1876, the 23-year-old Spelterini became the only woman ever to cross the Niagara Gorge over a period of 18 days on a tightrope On July 12th , she made her first attempt while wearing peach baskets strapped to her feet. Balancing on a two-and-a-quarter inch wire, she crossed the Fa11s just north of the lower suspension bridge. According to spectators, she appeared to exert no more effort than she would have during a stroll in the park. On July 19th , the second crossing occurred while blindfolded; three days later, she crossed with her ankles and wrists bound. On July 26th , she crossed for the fourth and last time. Never again performing at Niagara the story of her life remains a mystery",
    "questions": [
        {
            "question": "For sentence 2, Which is the correct form for the phrase about crossing the Niagara Gorge?",
            "choices": ["NO CHANGE", "on a tightrope, accomplishing that feat over a period of 18 days.", "over a period of 18 days, she did this on a tightrope.", "over a period of 18 days and, furthermore, doing this on a tightrope."]
        },
        {
            "question": "For sentence 4, Which is the correct form for the phrase about crossing north of the lower suspension bridge?",
            "choices": ["NO CHANGE", "just north of the lower suspension bridge is where her crossing took place.", "her crossing took place just north of the lower suspension bridge.", "and crossing just north of the lower suspension bridge."]
        },
        {
            "question": "For sentence 6, Which is the correct form for the phrase about the second crossing?",
            "choices": ["NO CHANGE", "the second crossing occurred blindfolded", "Spelterini performed the second crossing while blindfolded", "the second crossing occurred in a blindfold"]
        },
        {
            "question": "For sentence 8, Which is the correct form for the phrase about not performing at Niagara again?",
            "choices": ["NO CHANGE", "She never performed at Niagara again, her life story remains a mystery.", "Never again performing at Niagara, the story of her life, therefore, is a mystery.", "She never again performed at Niagara, and the story of her life remains a mystery"]
        }
    ]
},
// Passage 2
{
    "passage": "When President James Polk officially confirmed the discovery by James Marshall of gold at Sutter's Mill in Coloma, California in 1848, hopeful prospectors immediately began planning for the trip out west. Beginning their journey in spring of 1849, these prospectors took an overland route. Known as 'forty-niners,' that was risky and mostly unknown. Some forty-niners traveled alone, but most formed companies that enabled them with other miners to share expenses and supplies during the long journey. Seagoing travelers went south to Panama by boat. After disembarking, a several-day mule ride to the Pacific coast was begun. When they finally arrived, they boarded a ship bound for San Francisco.",
    "questions": [
        {
            "question": "For sentence 1, Which is the correct form for the phrase about the discovery of gold?",
            "choices": ["NO CHANGE", "the discovering by James Marshall of gold at Sutter's Mill", "James Marshall's discovery of gold at Sutter's Mill", "the discovery at Sutter's Mill by James Marshall of gold"]
        },
        {
            "question": "For sentence 2, Which is the correct form for the phrase about the journey of the prospectors?",
            "choices": ["NO CHANGE", "these prospectors, known as 'forty-niners,' took an overland route", "an overland route was taken by these prospectors, known as 'forty-niners'", "these prospectors, known as 'forty-niners,' taking an overland route"]
        },
        {
            "question": "For sentence 3, Which is the correct form for the phrase about sharing expenses and supplies?",
            "choices": ["NO CHANGE", "them to share expenses with supplies and other miners", "the sharing of expenses with other miners and supplies", "them to share expenses and supplies with other miners"]
        },
        {
            "question": "For sentence 5, Which is the correct form for the phrase about the mule ride?",
            "choices": ["NO CHANGE", "a several-day mule ride to the Pacific coast was begun by them.", "they began a several-day mule ride to the Pacific coast.", "the beginning of a several-day mule ride to the Pacific coast."]
        }
    ]
},

{
  "passage": "For decades, plastic bags have been a favorite around the world of store owners because of their low cost: two cents per bag, in contrast to five cents for a paper bag. Used widely since the 1970s, environmentalists now estimate nearly a trillion plastic bags are produced worldwide each year. The problems that these bags cause are well known. Unable to break down in landfills, the bags harm the animals that consume them. They also contain toxic dyes that contaminate water and soil. As a result, an increasing number of cities are banning their use.",
  "questions": [
      {
          "question": "For sentence 1, Which is the correct form for the phrase about the use of plastic bags?",
          "choices": ["NOCHANGE", "around the world because of the low cost of store owners", "of store owner around the world, this is because of their low cost", "of store owners around the world because of their low cost"]
      },
      {
          "question": "For sentence 2, Which is the correct form for the phrase about the production of plastic bags?",
          "choices": ["NOCHANGE", "The bags have been used widely since the 1970s, and environmentalists now estimate that nearly a trillion plastic bags", "Having been used widely since the 1970s, environmentalists now estimate nearly a trillion plastic bags", "The bags, which have been widely used since the 1970s, but environmentalists estimate nearly a trillion plastic bags"]
      },
      {
          "question": "For sentence 4, Which is the correct form for the phrase about the harm of plastic bags to animals?",
          "choices": ["NOCHANGE", "animals are harmed when they consume the bags.", "animals are harmed by consuming them.", "harm is caused to animals that consume them."]
      }
  ]
},
// Passage 4
{
  "passage": "Bioluminescence is light produced within a living organism that is created by a chemical reaction. Most bioluminescent organisms are found in the ocean, although a few, including fireflies and certain fungi, are found on land. Dwell in, almost exclusively in saltwater habitats, some form of bioluminescence is produced by approximately 90% of deep-sea creatures, including fish, bacteria, and jellies.",
  "questions": [
      {
          "question": "For sentence 1, Which is the correct form for the phrase about bioluminescence?",
          "choices": ["NOCHANGE", "created by a chemical reaction and produced within a living organism.", "produced within a living organism, it is created by a chemical reaction.", "produced within a living organism, which is created by a chemical reaction."]
      },
      {
          "question": "For sentence 2, Which is the correct form for the phrase about the dwelling of bioluminescent organisms?",
          "choices": ["NOCHANGE", "They dwell almost exclusively within saltwater habitats", "Saltwater habitats being dwelled in almost exclusively by them,", "Bioluminescent organisms dwell almost exclusively in saltwater habitats, and"]
      }
  ]
},
{
  "passage": "Guerilla films are typically made by independent producers who lack the budget to obtain permits, rent locations, and build expensive sets. Consisting mostly of scenes shot in real time, small casts and simple props typically characterize these films. In the past, guerilla films were often poorly made; however, their quality has improved significantly in recent years. While it was once difficult for filmmakers to obtain the necessary equipment, professional quality digital cameras are now widely available to filmmakers that are inexpensive. Furthermore, digital editing technologies allow filmmakers to edit their work from virtually anywhere, eliminating the need for specialized editing studios and technicians.",
  "questions": [
      {
          "question": "For sentence 2, Which is the correct form for the phrase about the characteristic of guerilla films?",
          "choices": ["NOCHANGE", "small casts and simple props typically characterizing these films.", "these films are typically characterized by small casts and simple props.", "and small casts as well as simple props typically characterize these films."]
      },
      {
          "question": "For sentence 4, Which is the correct form for the phrase about the availability of professional quality digital cameras?",
          "choices": ["NOCHANGE", "professional quality digital cameras are now widely available to filmmakers, and these are inexpensive.", "now, professional quality digital cameras are widely available to filmmakers that are inexpensive.", "inexpensive professional quality digital cameras are now widely available to filmmakers."]
      }
  ]
}

]


var passagesAndQuestions19 = [
  {
    "passage": "The tale of Hansel and Gretel, the story of two young children whom stumble across a cottage made of gingerbread, played an important role in the history of sweets. It was published in 1812, a time when many bakers already knew how to create elaborate structures from other types of candy. Inspired by the tale, they began to form their gingerbread into houses. Soon, gingerbread construction was elevated to an art form whose popularity quickly spread through Europe and the United States.",
    "questions": [
        {
            "question": "For sentence 1, Which is the correct form for the phrase about the children stumbling across a cottage?",
            "choices": ["NOCHANGE", "which stumble", "who stumble", "and stumble"]
        },
        {
            "question": "For sentence 4, Which is the correct form for the phrase about the popularity of gingerbread construction?",
            "choices": ["NOCHANGE", "who's popularity", "its popularity", "and popularity"]
        }
    ]
},
// Passage 2
{
    "passage": "Shortly after I moved from Chicago to Lincoln, Nebraska, I attended the eighty-fifth birthday party of a woman whom was among the city's original settlers. The room, that was decorated with banners and balloons, also held family photographs—crisp new snapshots of grandchildren and great-grandchildren, wedding photos from the 1950s, and worn black-and-white portraits of ancestors whose stoic expressions and sturdy, upright figures seemed to embody the harshness of life in an unforgiving new environment. These people were immortalized in the works of Willa Cather, whom depicted them in novels such as My Antonia and O Pioneers! Cather, an author which lived in Nebraska during the late nineteenth century, chronicled the lives and hardships of the settlers, preserving their struggles for generations to come.",
    "questions": [
        {
            "question": "For sentence 1, Which is the correct form for the phrase about the woman among the city's original settlers?",
            "choices": ["NOCHANGE", "who was", "which was", "she was"]
        },
        {
            "question": "For sentence 2, Which is the correct form for the phrase about the room decorated with banners and balloons?",
            "choices": ["NOCHANGE", "room that,", "room, which", "room, it"]
        },
        {
            "question": "For sentence 3, Which is the correct form for the phrase about people immortalized in the works of Willa Cather?",
            "choices": ["NOCHANGE", "who", "which", "she"]
        },
        {
            "question": "For sentence 4, Which is the correct form for the phrase about the author who lived in Nebraska?",
            "choices": ["NOCHANGE", "author, which", "author who", "author, that"]
        }
    ]
},
{
  "passage": "More than 85% of mammals sleep for short periods throughout the day. Humans, in contrast, divide their days into two distinct periods: one where they sleep and one for wakefulness. Although this division is considered normal in the United States, it is not clear that this is humans' natural sleep pattern. Young children and elderly people are two group, that often nap, and napping is an important aspect of many cultures. While naps do not necessarily make up for inadequate or poor quality nighttime sleep, a short nap where a person simply closes his or her eyes for a few minutes can help to improve mood, alertness, and concentration. Although people who sleep in the middle of the day are often perceived as lazy, they're actually a very accomplished group. Famous nappers include Winston Churchill, John F. Kennedy, Napoleon, Albert Einstein, and Thomas Edison, all of whom are known to have valued their afternoon rest.",
  "questions": [
      {
          "question": "For sentence 2, Which is the correct form for the phrase about the periods of sleep and wakefulness?",
          "choices": ["NOCHANGE", "in which they sleep", "for which they sleep", "for sleep"]
      },
      {
          "question": "For sentence 4, Which is the correct form for the phrase about the groups that often nap?",
          "choices": ["NOCHANGE", "groups, which often nap", "groups that, often nap", "groups that often nap,"]
      },
      {
          "question": "For sentence 5, Which is the correct form for the phrase about a person closing his or her eyes for a few minutes?",
          "choices": ["NOCHANGE", "whereby", "from which", "that"]
      },
      {
          "question": "For sentence 6, Which is the correct form for the phrase about people sleeping in the middle of the day?",
          "choices": ["NOCHANGE", "whom sleep", "which sleep", "that sleep,"]
      },
      {
          "question": "For sentence 7, Which is the correct form for the phrase about famous people who value their afternoon rest?",
          "choices": ["NOCHANGE", "of them", "of which", "of these"]
      }
  ]
},
// Passage 4
{
  "passage": "Since the early 2000s, thousands of honey bees have disappeared without a trace, and no one knows just why. The phenomenon, known as Colony Collapse Disorder (CCD), has occurred many Limes, but this Lime it has become a global epidemic. David Hackenberg, a Pennsylvania beekeeper, was one of the first people whom called allention to the problem. IL was in 2006 that Hackenberg realized something was amiss. For years, he had lent his bees to formers, whom used them Lo pollinate their crops. In 2006, he delivered 400 bee colonies lo a Florida farm, but when he went to collect them, the bees were nowhere to be round. In the end, he lost aboul two-thirds of his hives. Although Hackenberg was disLraughL al rirst, he now considers himself lucky: some beekeepers whom were less fortunate losl 90% or their bees. Now, scientists are curious to figure oul .i ust what is making so many bees disappear from areas in whch they were once found in abundance to. The causes or CCD and the reasons for its increasing occurrence remain unclear, but many possibilities have been proposed: pesticides, infections, genetics, loss of habitat, radiation from electronic devices - or a combination of all these factors.",
  "questions": [
      {
          "question": "For sentence 3, Which is the correct form for the phrase about the first person who called attention to the problem?",
          "choices": ["NOCHANGE", "which call", "who will call", "Lo call"]
      },
      {
          "question": "For sentence 5, Which is the correct form for the phrase about the farmers using bees to pollinate their crops?",
          "choices": ["NOCHANGE", "which used", "who used", "these farmers used"]
      },
      {
          "question": "For sentence 8, Which is the correct form for the phrase about the less fortunate beekeepers?",
          "choices": ["NOCHANGE", "who were", "which were", "being"]
      },
      {
          "question": "For sentence 9, Which is the correct form for the phrase about bees disappearing in places they were once found?",
          "choices": ["NOCHANGE", "that", "when", "DELETE the underlined word"]
      }
  ]
},
{
  "passage": "Having played a central role in helping the United States win its independence from Great Britain, George Washington quickly became a celebrity. Not surprisingly, he acquired many admirers, one of who was Patience Wright. Wright, a sculptor, was known for her remarkably realistic portraits, that were made out of tinted wax. She had always amused herself and her children by molding faces out of putty, dough, and wax, but thanks to a neighbor who encouraged her, she turned her hobby into a full-time occupation. Wright loved her work, and those whom watched her sculpt often commented on the energy that she brought to the process. In an era where photographs did not exist, skilled portraitists were held in high regard. Despite her lack of formal training, Wright was widely recognized for her talents. By 1770, she had become successful enough to open a waxworks house in New York City. When fire ravaged the New York studio in 1771, however, Wright decided to relocate to London. By that time, she had sculpted many famous figures and had even earned the support of the Queen of England, which admired her work deeply. Still, though, she wasn't satisfied. To sculpt George Washington, a leader to whom so many new Americans owed their deep gratitude, would be the crowning achievement of Wright's career.",
  "questions": [
      {
          "question": "For sentence 2, Which is the correct form for the phrase about George Washington's admirer?",
          "choices": ["NOCHANGE", "of which", "of whom", "of these"]
      },
      {
          "question": "For sentence 3, Which is the correct form for the phrase about Wright's portraits?",
          "choices": ["NOCHANGE", "portraits, which", "portraits in which", "portraits, they"]
      },
      {
          "question": "For sentence 5, Which is the correct form for the phrase about people watching Wright sculpt?",
          "choices": ["NOCHANGE", "who watched", "which watched", "watched"]
      },
      {
          "question": "For sentence 10, Which is the correct form for the phrase about the Queen of England admiring Wright's work?",
          "choices": ["NOCHANGE", "which admired", "whom admired", "and she admired"]
      },
      {
          "question": "For sentence 12, Which is the correct form for the phrase about George Washington, the leader many new Americans owed gratitude to?",
          "choices": ["NOCHANGE", "to who", "to which", "to him"]
      }
  ]
}


]

var VocabularyInContext = [
   // Passage 1
   {
    "passage": "In Ancient Egyptian art, human figures are presented in a rigid and __ manner. In contrast, animals are often very well-observed and lifelike.",
    "choices": ["dazzling", "artificial", "impressive", "realistic"],
    "answer": "artificial"
},
// Passage 2
{
    "passage": "Female hyenas remain within their clan and inherit their mother's rank. As a result, sisters must compete with one another to obtain a __ position in the hierarchy.",
    "choices": ["relative", "dominant", "regular", "secure"],
    "answer": "dominant"
},
// Passage 3
{
    "passage": "Because music plays an essential role in facilitating social functions and is more effective than speech at improving people's moods, researchers are beginning to question whether it truly is as __ as they once believed. In fact, they believe it may have evolved to promote societal cohesion.",
    "choices": ["demanding", "prevalent", "frivolous", "important"],
    "answer": "frivolous"
},
// Passage 4
{
    "passage": "The camera obscura-a darkened room with a small hole or lens through which an image is projected-was perhaps the earliest known imaging device. First referred to in a fourth-century Chinese text known as Mozi, it was __ of the modern-day photographic camera.",
    "choices": ["a forerunner", "a relic", "an heir", "a proponent"],
    "answer": "a forerunner"
},
// Passage 5
{
    "passage": "For centuries, __ have questioned the authorship of Shakespeare's plays. In total, no fewer than fifty alternative candidates, including Francis Bacon, Queen Elizabeth I, and Christopher Marlowe, have been proposed as the true writer.",
    "choices": ["partisans", "zealots","activists", "advocates"],
    "answer": "advocates"
},
// Passage 6
{
    "passage": "All of the factors that allowed the Great Barrier Reef to __ are changing at unprecedented rates. Over the next several decades, marine biologists believe, it is likely to decline below a crucial threshold from which it is impossible to recover.",
    "choices": ["flourish", "diminish", "extend", "succumb"],
    "answer": "flourish"
},
// ... continue with other passages
 // Passage 7
 {
  "passage": "Although traditional historians and historical filmmakers differ in their choice of medium, the most respected ones share a scrupulous regard for facts and the rules of evidence that __ their acceptability.",
  "choices": ["deny", "complete", "dictate", "rely on"],
  "answer": "dictate"
},
// Passage 8
{
  "passage": "In the past, psychologists dismissed fiction as a way of understanding human emotions. In more recent times, however, they have developed a new __ for the insights that stories can provide into human behavior.",
  "choices": ["disregard", "explanation", "responsibility", "appreciation"],
  "answer": "appreciation"
},
// Passage 9
{
  "passage": "Okakura Kakuzo is credited with the revival of Nihonga, painting done with traditional Japanese techniques, at a time when Western-style painting was threatening to __ it.",
  "choices": ["supplant", "deny", "salvage", "challenge"],
  "answer": "supplant"
},
// Passage 10
{
  "passage": "Like many of the surgeons general before her, Joycelyn Elders became an outspoken advocate for a variety of controversial health issues. As a result, she quickly established a reputation for being __ .",
  "choices": ["a pragmatist", "a polemicist", "a curiosity", "an amateur"],
  "answer": "a polemicist"
},
// Passage 11
{
  "passage": "Chicago epitomized the remarkable __ of urbanization during the nineteenth century. The city expanded from several hundred residents in 1830 to nearly two million just eighty years later.",
  "choices": ["velocity", "significance", "mastery", "influence"],
  "answer": "velocity"
},
// Passage 12
{
  "passage": "Lynn Margulis's revolutionary theory of eukaryotic cell development was initially met with almost unanimous __ because it built upon ideas that had largely been discredited. In fact, her groundbreaking 1967 paper, 'On the Origin of Mitosing Cells,' was published only after being rejected by fifteen journals.",
  "choices": ["scorn", "jubilation", "consideration", "impatience"],
  "answer": "scorn"
},
// Passage 13
{
  "passage": "Proponents of the Arts and Crafts movement claimed that its simple but refined aesthetics would __ the new experience of industrial consumerism. Individuals would become more rational and society more harmonious.",
  "choices": ["contain", "elevate", "compromise", "enjoy"],
  "answer": "elevate"
},
// Passage 14
{
  "passage": "The whale is a remarkably __ navigator, migrating thousands of miles each year without a compass and always arriving in precisely the same spot.",
  "choices": ["docile", "advantageous", "adept", "precocious"],
  "answer": "adept"
},
// Passage 15
{
  "passage": "At its peak, roughly corresponding to the Middle Ages, Constantinople was one of the largest and most influential cities in the world. It __ a powerful cultural pull and dominated economic life throughout the Mediterranean basin.",
  "choices": ["defended", "exerted", "restrained", "thwarted"],
  "answer": "exerted"
}
]





var PronounsAndCompressionNouns = [
  // Passage 1
  {
    "passage": "Artificial neural networks leverage the architecture of the human brain in order to improve systems ranging from medical diagnostics to credit card fraud to translation. In some areas, such as computational speed, (A) they demonstrate superhuman performance; however, when they learn sequentially, old information is often overwritten by new information. (B) This loss. which occurs when new pathways are formed, is known as catastrophic forgetting.",
    "questions": [
        {"question": "What does 'they' refer to?", "number": "A"},
        {"question": "What does 'this loss' refer to?", "number": "B"}
    ],
    "answers": [
      {"answer": "Artificial neural networks", "number": "A"},
      {"answer": "old infomration is overwritten information", "number": "B"}
    ]
},
// Passage 2
{
    "passage": "In the past, efforts to identify cacao in ancient Mayan pottery centered on highly decorated ceramic vessels used in elite ceremonial contexts, an approach that resulted in the assumption that (A) it was only available to members of the elite. A study by Anabel Ford and Mattanjah de Vries casts doubt on (B) this claim, however, suggesting that cacao was widely accessible and used in celebrations by all members of Mayan society.",
    "questions": [
        {"question": "What does 'it' refer to?", "number": "A"},
        {"question": "What does 'this claim' refer to?", "number": "B"}
    ],
    "answers": [
      {"answer": "cacao", "number": "A"},
      {"answer": "the assumption that cacao was only available to members of the elite", "number": "B"}
    ]
},
// Passage 3
{
    "passage": "Soon after the Big Bang, there were tiny ripples: quantum fluctuations in the density of the seething ball of hot plasma. Billions of years later, (A) those seeds have grown into galaxy clusters - sprawling groups of hundreds or thousands of galaxies bound together by gravity. But there seems to be (B) a mismatch. Research suggests that as much as 40% of galaxy-cluster mass is missing when compared with the amount of clustering predicted by the ripples. (C) The findings have led theorists to propose physics beyond the standard model of cosmology to make up the difference.",
    "questions": [
        {"question": "What does 'those seeds' refer to?", "number": "A"},
        {"question": "What does 'a mismatch' refer to?", "number": "B"},
        {"question": "What does 'the findings' refer to?", "number": "C"}
    ],
    "answers": [
      {"answer": "tiny ripples", "number": "A"},,
      {"answer": "a mismatch between the amount of clustering predicted by the ripples and the amount of clustering observed", "number": "B"},,
      {"answer": "the findings that as much as 40% of galaxy-cluster mass is missing when compared with the amount of clustering predicted by the ripples", "number": "C"}
    ]
},
// Passage 4
{
    "passage": "The sky is low, the clouds are mean, A travelling flake of snow Across a barn or through a rut Debates if it will go. A narrow wind complains all day How some one treated him; Nature, like us, is sometimes caught Without her diadem.",
    "questions": [
        {"question": "What does 'it' refer to?", "number": "1"},
        {"question": "What does 'her' refer to?", "number": "2"}
    ],
    "answers": [
      {"answer": "A travelling flake of snow", "number": "1"},
      {"answer": "Nature", "number": "2"}
    ]
},
// Passage 5
{
    "passage": "Flash organizations are teams that assemble temporarily to tackle specific, complex problems. Drawn from online labor markets, (A) they combine the flexibility of crowdsourcing with the managerial complexity of traditional companies. The workforce in a flash organization is fluid, called together quickly and often on short notice. In most cases, (B) it is organized into a clear hierarchy but can adapt by adding new teams or allowing workers to shift roles as the work evolves.",
    "questions": [
        {"question": "What does 'they' refer to?", "number": "A"},
        {"question": "What does 'it' refer to?", "number": "B"}
    ],
    "answers": [
      {"answer": "Flash organizations", "number": "A"},
      {"answer": "the workforce in a flash organization", "number": "B"}
    ]
},
// Passage 6
{
    "passage": "To the education of her daughters Lady Bertram paid not the smallest attention. She had not time for (A) such cares. She was a woman who spent her days in sitting, nicely dressed, on a sofa, doing the long piece of needlework, of little use and no beauty, thinking more of her pug than her children, but very indulgent to (B) the latter when it did not put herself to inconvenience, guided in everything important by Sir Thomas, and in smaller concerns by her sister.",
    "questions": [
        {"question": "What does 'such cares' refer to?", "number": "A"},
        {"question": "What does 'the latter' refer to?", "number": "B"}
    ],
    "answers": [
      {"answer": "the education of her daughters", "number": "A"},
      {"answer": "her children", "number": "B"}
    ]
},
// Passage 10
{
  "passage": "Carolyn Bertozzi's development of bioorthogonal chemistry stemmed from her interest in complex carbohydrate molecules known as glycans. Along with proteins and nucleic acids such as DNA, these compounds are one of the key building blocks of life. However, they are not well understood: because (B) they are challenging to synthesize in the laboratory, they have traditionally been among the most difficult molecules for scientists to analyze.",
  "questions": [
      {"question": "What does 'these compounds' refer to?"},
      {"question": "What does 'they' refer to?", "number": "B"}
  ],
  "answers": [
    {"answer": "complex carbohydrate molecules known as glycans", "number": "A"},
    {"answer": "complex carbohydrate molecules known as glycans", "number": "B"}
  ]
},
// Passage 11
{
  "passage": "It would be difficult to find another man who lived so entirely for his duties. It is not enough to say that Akakiy laboured with zeal: no, he laboured with love. In his copying, he found a varied and agreeable employment. Enjoyment was written on his face: some letters were even favourites with him; and when he encountered (A) these, he smiled, winked, and worked with his lips, till it seemed as though each letter might be read in his face, as his pen traced (B) it.",
  "questions": [
      {"question": "What does 'these' refer to?", "number": "A"},
      {"question": "What does 'it' refer to?", "number": "B"}
  ],
  "answers": [
    {"answer": "some letters", "number": "A"},
    {"answer": "each letter", "number": "B"}
  ]
},
// Passage 12
{
  "passage": "An ancient New Mexican lakebed is home to the preserved footprints of life that roamed the American southwest thousands of years ago. In addition to giant sloths and mammoths, ancestors of modern humans also left (A) their mark. Research published in Science in 2021 claimed that these footprints were 'definitive evidence' of human presence in North America during the last ice age, which ended around 25,000 years ago; however, a study by geologists and paleontologists in Kansas, Oregon, and Nevada disputes (B) that conclusion. The researchers argue that it is more likely humans entered the Americas sometime between 14,000 and 16,000 years ago.",
  "questions": [
      {"question": "What does 'their mark' refer to?", "number": "A"},
      {"question": "What does 'that conclusion' refer to?", "number": "B"}
  ],
  "answers": [
    {"answer": "footprints", "number": "A"},
    {"answer": "the conclusion that the footprints were 'definitive evidence' of human presence in North America during the last ice age", "number": "B"},
  ]

},
// Passage 13
{
  "passage": "From out the west, o'erhung with fringes grey, The wind preludes with sighs its roundelay, Then blowing, singing, piping, laughing loud, (A) It scurries on before the grey storm-cloud; Across the hollow and along the hill It whips and whirls among the maples, till With boughs upbent, and green leaves blown wide, The silver shines upon (B) their underside.",
  "questions": [
      {"question": "What does 'it' refer to?", "number": "A"},
      {"question": "What does 'their' refer to?", "number": "B"}
  ],
  "answers": [
    {"answer": "the wind", "number": "A"},
    {"answer": "the maples", "number": "B"}
  ]
},
// Passage 14
{
  "passage": "Most of the planets orbiting stars like the Earth's sun fall into one of two categories: the first group is around one-and-a-half times the size of the Earth, whereas the other faction is twice as large. Astronomers theorize that while members of (A) the former have retained their atmospheres, the atmospheres of (B) the latter may have dissipated over time, leaving nothing but rocky cores behind. Researchers studying (C) this phenomenon, known as planetary escape, developed models of it in order to more fully understand how heat and radiation could affect planets' atmospheres. Then, they created 70,000 simulated planets of different sizes, varying their atmospheric compositions and types of suns, and modeled what would happen to (D) them.",
  "questions": [
      {"question": "What does 'the former' refer to?", "number": "A"},
      {"question": "What does 'the latter' refer to?", "number": "B"},
      {"question": "What does 'this phenomenon' refer to?", "number": "C"},
      {"question": "What does 'them' refer to?", "number": "D"}
  ],
  "answers": [
    {"answer": "the first group of planets", "number": "A"},
    {"answer": "the other faction [that] is twice as large", "number": "B"},
    {"answer": "the atmospheres may have dissipated over time, leaving nothing but rocky cores behind", "number": "C"},
    {"answer": "70,000 simulated planets of different sizes", "number": "D"}
  ]
}
]

var TheBigPicture= [
  // Passage 1
{
  "passage": "The following text is adapted from Henry James' 1880 novel Washington Square. Mrs. Penniman is a widow who lives with her brother.\nMrs. Penniman was a tall, thin, fair, rather faded woman, with a perfectly amiable disposition, a high standard of gentility, a taste for light literature, and a certain foolish indirectness and obliquity of character. She had a passion for little secrets and mysteries-a very innocent passion, for her secrets had hitherto always been as unpractical as addled eggs. She was not absolutely veracious; but this defect was of no great consequence, for she had never had anything to conceal.",
  "questions": [
  {"question": "Which choice best states the main idea of the text?"}
  ],
  "options": [
  {"option": "Mrs. Penniman is a puzzling and mysterious figure."},
  {"option": "Mrs. Penniman is a passionate reader of novels."},
  {"option": "Mrs. Penniman is frequently difficult to get along with."},
  {"option": "Mrs. Penniman is romantic and sentimental."}
  ],
  "answers" : [
  {"answer": "Mrs. Penniman is a romantic and sentimental."}
  ]
  },
  // Passage 2
  {
  "passage": "Among the thousands of species that have made their way around the world since European exploration began in the fifteenth century, knotweed is widely regarded as one of the most intractable. Removing it completely requires extracting the land itself; if anything is left behind, the weed can return repeatedly, regenerating from minuscule fragments after as long as twenty years. One study found that knotweed could regrow from a root fragment weighing just 0.3g-about as much as a pinch of salt.",
  "questions": [
  {"question": "Which choice best states the main idea of the text?"}
  ],
  "options": [
  {"option": "Knotweed was among the earliest plant species to be transported between continents."},
  {"option": "Knotweed can regenerate even when the land it grows on has been removed."},
  {"option": "Knotweed is exceptionally difficult to eradicate permanently."},
  {"option": "In comparison to other plants, knotweed takes much longer to reach its full size."}
  ],
  "answers" : [
  {"answer": "Knotweed is exceptionally difficult to eradicate permanently."}
  ]
  },
  // Passage 3
  {
  "passage": "The following text appeared in Josephine Heard's 1890 work, \"On receiving Tennyson's Poems from Mrs. M. H. Dunton, of Brattleboro, Vt.\"\nDear Friend, since you have chosen to associate My humble thoughts with England's poet laureate, I trust that he will bear me pleasant company, And soon we shall far more than mere acquaintance be. Since childhood's days his name I have revered, And more and more it has become to me endeared; I blush not for the truth, I but confess, I very wealthy feel since I his \"works\" possess.",
  "questions": [
  {"question": "Which choice best states the main idea of the text?"}
  ],
  "options": [
  {"option": "She is impressed by her friend's personal acquaintance with Tennyson."},
  {"option": "She views Tennyson with respect and wishes to understand his work deeply."},
  {"option": "She is embarrassed by her poor understanding of Tennyson's work."},
  {"option": "She believes that her own poetry is equal to Tennyson's."}
  ],
  "answers" : [
  {"answer": "She views Tennyson with respect and wishes to understand his work deeply."}
  ]
  },
  // Passage 4
  {
  "passage": "Navajo pawn originated in the 1870s as a bartering system that was altogether different from traditional banking. Based on relationships of mutual trust, it evolved to be a fully integrated part of Navajo life. By the middle of the twentieth century, it had become a highly sophisticated and complex practice, with more than 150 active trading posts. Today it remains a pivotal aspect of Navajo society.",
  "questions": [
  {"question": "Which choice best states the main idea of the text?"}
  ],
  "options": [
  {"option": "Pawn has played a significant role in modern Navajo culture."},
  {"option": "During the twentieth century, pawn was gradually replaced by other banking options."},
  {"option": "Pawn is more complex than traditional banking."},
  {"option": "Pawn became popular in Navajo society because it was based on personal relationships."}
  ],
  "answers" : [
  {"answer": "Pawn has played a significant role in modern Navajo culture."}
  ]
  },
  // Passage 5
  {
  "passage": "Although publishers and critics classified Octavia Butler's novels as science fiction-a genre that Butler enjoyed deeply and referred to as \"potentially the freest genre in existence\"- her works attracted a diverse readership, and Butler resisted being associated exclusively with that form. Indeed, she was also the author of a number of essays, and her book Parable of the Sower was adapted into an opera by the mother-and-daughter team Bernice Johnson Reagon and Toshi Reagon. Combining African-American spirituals, soul, rock and roll, and folk music, it debuted at The Public Theater in New York City in 2015.",
  "questions": [
  {"question": "Which choice best describes the overall structure of the text?"}
  ],
  "options": [
  {"option": "A work is presented, and its effects are considered."},
  {"option": "An interpretation of a novel is described, and an opposing view is introduced."},
  {"option": "Examples of an author's writing are given, and their significance is discussed."},
  {"option": "A claim is made, and supporting examples are provided to illustrate it."}
  ],
  "answers" : [
  {"answer": "A claim is made, and supporting examples are provided to illustrate it."}
  ]
  }

]

var LiteralComprehension = [
    // Passage 1
    {
      "passage": "\"My Day,\" the nationally syndicated newspaper column written by Eleanor Roosevelt, long outlasted her time as first lady. The sheer frequency of the column, which ultimately ran six days a week in 90 newspapers across the United States for more than 20 years, extended Roosevelt's influence immeasurably: it made her a continual presence in the lives of her readers in a manner that anticipated the social-media age.",
      "questions": [
          {"question": "What is true about \"My Day\" based on the passage?"}
      ],
      "options": [
          {"option": "It overshadowed Eleanor Roosevelt's accomplishments as first lady."},
          {"option": "It exposed a large new audience to Eleanor Roosevelt's work."},
          {"option": "It was among the most widely read newspaper columns in the United States."},
          {"option": "It was published more frequently than any other column of its time."}
      ],
      "answers" : [
          {"answer": "It exposed a large new audience to Eleanor Roosevelt's work."}
      ]
  },
  // Passage 2
  {
      "passage": "Although the Cherokee had a different relationship with the environment than American settlers did, they still altered the landscape around them in distinct ways. Throughout the Tennessee River, for example, Cherokee tribe members constructed stone weirs, rock obstructions designed to catch fish. The weirs did not halt the flow of the river and create large, stagnant pools of water the way dams constructed by settlers did, however. Rather, they depended on the water's continuous motion to sweep fish into traps-a cooperation of sorts between the built and the natural worlds.",
      "questions": [
          {"question": "How did weirs function differently from dams according to the text?"}
      ],
      "options": [
          {"option": "They had no effect on their surrounding environments."},
          {"option": "They prevented rivers from flowing."},
          {"option": "They relied on the water's existing movement."},
          {"option": "Their effects on their surrounding environments were unpredictable."}
      ],
      "answers" : [
          {"answer": "They relied on the water's existing movement."}
      ]
  },
  // Passage 3
  {
      "passage": "To interrupt people's stereotypes of one another, researchers at Stanford Business School developed an intervention called the daily diary technique, in which randomly assigned people in two countries were given each other's diary to read for a week. They found that over time, this strategy reduced cultural distance compared to when they read diaries written by their compatriots. Participants in the first country began to perceive participants from the second as more ethical, whereas participants from the second country began to view participants from the first as warmer and less rigid.",
      "questions": [
          {"question": "What effect did the intervention developed by Stanford researchers have on participants according to the text?"}
      ],
      "options": [
          {"option": "It promoted perceptions of similarity between cultures."},
          {"option": "It decreased feelings of antipathy among citizens of the same country."},
          {"option": "It caused them to behave in a more ethical manner."},
          {"option": "It improved their satisfaction with aspects of their own culture."}
      ],
      "answers" : [
          {"answer": "It promoted perceptions of similarity between cultures."} 
      ]
  },
  // Passage 4
  {
      "passage": "The following text is from Georgia Douglas Johnson's 1922 poem ''Youth.\"\nThe dew is on the grasses, dear,\nThe blush is on the rose,\nAnd swift across our dial-youth,\nA shifting shadow goes.\nThe primrose moments, lush with bliss,\nExhale and fade away,\nLife may renew the Autumn time,\nBut nevermore the May!",
      "questions": [
          {"question": "In what way is youth unlike the autumn of life according to the text?"}
      ],
      "options": [
          {"option": "It is untouched by shadows."},
          {"option": "It cannot be extended."},
          {"option": "It remains perpetually fresh."},
          {"option": "It is full of bliss."}
      ],
      "answers" : [
          {"answer": "It cannot be extended."}
      ]
  },
  // Passage 5
  {
      "passage": "Geophysicists first began to appreciate the smoldering origins of the land under the sea, known formally as ocean crust, in the early 1960s. Sonar surveys revealed that volcanoes form nearly continuous ridges that wind around the globe like seams on a baseball. Later, the same scientists strove to explain what fuels these erupting mountain ranges, called mid-ocean ridges. Basic theories suggest that because shifting tectonic plates pull the ocean floor apart along the ridges, molten rock deep within the earth's interior must rise to fill the gap. This material is produced in the second layer of the Earth's interior - the mostly solid upper mantle - and makes its way up through the crust. The collision of two plates can also result in a volcano.",
      "questions": [
          {"question": "Why do undersea volcanoes develop based on the passage?"}
      ],
      "options": [
          {"option": "Because breaks in the ocean floor allow liquid rock from the mantle to enter."},
          {"option": "Because mid-ocean ridges pull apart when the pressure beneath them increases."},
          {"option": "Because tectonic plates accumulate along the ocean floor."},
          {"option": "Because the Earth's crust collides with the mantle."}
      ],
      "answers" : [
          {"answer": "Because breaks in the ocean floor allow liquid rock from the mantle to enter."} 
      ]
  },
  // Passage 6
  {
      "passage": "The following text is adapted from Edith Wharton's novel The Custom of the Country. Mrs. Spragg has recently arrived in New York City with her daughter.\nThe room showed no traces of human use, and Mrs. Spragg herself wore as complete an air of detachment as if she had been a wax figure in a show-window. Her attire was fashionable enough to justify such a post, and her pale soft-cheeked face, with puffy eye-lids and drooping mouth, suggested a partially-melted wax figure which had run to double-chin.",
      "questions": [
          {"question": "What is true about Mrs. Spragg based on the text?"}
      ],
      "options": [
          {"option": "She feels anxious in her environment."},
          {"option": "Her clothing is not suited to her position."},
          {"option": "Her features are sharp and distinctive."},
          {"option": "She appears aloof and disconnected from her surroundings."}
      ],
      "answers" : [
          {"answer": "She appears aloof and disconnected from her surroundings."}
      ]
  },
  // Passage 7
  {
      "passage": "The Importance of Being Earnest is an 1895 play by Oscar Wilde.\nALGERNON: Did you hear what I was playing, Lane?\nLANE: I didn't think it polite to listen, sir.\nALGERNON: I'm sorry for that, for your sake. I don't play accurately- any one can play accurately-but I play with wonderful expression. As far as the piano is concerned, sentiment is my forte. I keep science for Life.",
      "questions": [
          {"question": "What is true about Algernon based on the text?"}
      ],
      "options": [
          {"option": "He is embarrassed that Lane has overheard him playing the piano."},
          {"option": "As a musician, he is more concerned with emotion than technical correctness."},
          {"option": "Science appeals to him for the same reasons that music does."},
          {"option": "He wishes that he could play the piano more accurately."}
      ],
      "answers" : [
          {"answer": "As a musician, he is more concerned with emotion than technical correctness."}
      ]
  }
]

var ReadingForFunction = [
  // Passage 1
  {
    "passage": "Far below the mid-ocean ridge volcanoes and their countless layers of crust-forming lava is the mantle, a 3,200-kilometer-thick layer of scorching hot rock that forms the earth's midsection and surrounds its metallic core. At the planet's cool surface, upthrusted mantle rocks are dark green, but if you could see them in their rightful home, they would be glowing red- or even white-hot. The top of the mantle is about 1,300 degrees Celsius, and it gets about one degree hotter with each kilometer of depth. The weight of overlying rock means the pressure also increases with depth about 1,000 atmospheres for every three kilometers.",
    "questions": [
        {"question": "Which choice best states the function of the underlined sentence within the text as a whole?"}
    ],
    "options": [
        {"option": "To convey the intense pressure that pervades the mantle"},
        {"option": "To suggest that scientific understanding of mantle rocks is limited"},
        {"option": "To describe a difference between mantle rocks and other types of rock"},
        {"option": "To emphasize a difference between mantle rocks in different locations"}
    ],
    "answers" : [
        {"answer": "To emphasize a difference between mantle rocks in different locations"}
    ]
},
// Passage 2
{
    "passage": "The Awakening is an 1890 novel by Kate Chopin. Edna Pontellier, the protagonist, is on vacation with her husband and children at Grand Isle resort in Louisiana. Edna Pontellier could not have told why, wishing to go to the beach with Robert, she should in the first place have declined, and in the second place, have followed in obedience to one of the two contradictory impulses which impelled her. A certain light was beginning to dawn dimly within her. In short, Mrs. Pontellier was beginning to realize her position in the universe as a human being, and to recognize her relations as an individual to the world within and about her.",
    "questions": [
        {"question": "Which choice best states the primary purpose of the text?"}
    ],
    "options": [
        {"option": "To highlight Edna's tendency to behave in contradictory ways"},
        {"option": "To present a situation in which Edna must make a momentous decision"},
        {"option": "To describe Edna's newfound insight into her interior and exterior existence"},
        {"option": "To convey Edna's sense of duty toward her family"}
    ],
    "answers" : [
        {"answer": "To describe Edna's newfound insight into her interior and exterior existence"}
    ]
},
// Passage 3
{
    "passage": "In order to better understand people's receptiveness to opposing viewpoints, public policy scholars Julia Minson of Harvard University and Frances Chen of the University of British Columbia reviewed dozens of studies spanning 1984 to 2021. Among their findings was the fact that people who feel strongly about an issue can be receptive to others' views without altering their own opinions. As the researchers point out, two thoughtful people might examine each other's ideas seriously and, recognizing that it is possible for reasonable people to hold either perspective, respectfully agree to disagree.",
    "questions": [
        {"question": "Which choice best states the function of the underlined sentence within the text as a whole?"}
    ],
    "options": [
        {"option": "It highlights a potential outcome of a strong disagreement."},
        {"option": "It describes a process by which people's opinions can evolve."},
        {"option": "It emphasizes the importance of considering multiple perspectives."},
        {"option": "It discusses a strategy that permits opposing parties to reconcile their differences."}
    ],
    "answers" : [
        {"answer": "It highlights a potential outcome of a strong disagreement."}
    ]
},
// Other passages would follow in a similar format...
// Passage 4
{
  "passage": "To be a female artist in the nineteenth century was challenging enough, but to be a female sculptor was nearly unthinkable. Not only were sculptors expected to have a familiarity with the human form that no woman in that age could acquire, but they had to work with heavy materials, such as blocks of marble weighing many hundreds of pounds. Nevertheless, a few intrepid American women wound their way to Italy and learned to sculpt.",
  "questions": [
      {"question": "Which choice best describes the function of the underlined sentence in the text as a whole?"}
  ],
  "options": [
      {"option": "It discusses some of the expenses involved in becoming an artist."},
      {"option": "It emphasizes the antagonism between women and the nineteenth-century artistic establishment."},
      {"option": "It explains the virtual impossibility of becoming a female sculptor in the nineteenth century."},
      {"option": "It describes some of the physical limitations placed on nineteenth-century women."}
  ],
  "answers" : [
      {"answer": "It explains the virtual impossibility of becoming a female sculptor in the nineteenth century."}
  ]
},
// Passage 5
{
  "passage": "The following text is from Charlotte Grimke's poem \"Wordsworth.\" Poet of the serene and thoughtful lay! In youth's fair dawn. when the soul. still untried. Longs for life's conflict. and seeks restlessly Food for its cravings in the stirring songs. The thrilling strains of more impassioned bards: Or, eager for fresh joys, culls with delight The flowers that bloom in fancy's fairy realm - We may not prize the mild and steadfast ray That streams from thy pure soul in tranquil song",
  "questions": [
      {"question": "Which choice best describes the function of the underlined portion in the text as a whole?"}
  ],
  "options": [
      {"option": "To criticize the human tendency toward conflict"},
      {"option": "To describe the power of music to express emotions"},
      {"option": "To highlight the consequences of uncontrolled restlessness"},
      {"option": "To convey the soul's youthful desire for excitement"}
  ],
  "answers" : [
      {"answer": "To convey the soul's youthful desire for excitement"}
  ]
},
// Passage 6
{
  "passage": "One of the most persistent and problematic biases in science involves motivated reasoning-that is, the tendency to interpret observations to fit preconceived notions. According to Professor Brian Nosek, a specialist in human biases and co-founder of the Center for Open Science at the University of Virginia, psychologists have demonstrated that \"most of our reasoning is in fact rationalization.\" In other words, people begin by making decisions about what to think or do, and their \"explanation\" later serves as a means to justify what they believed or how they intended to act in the first place.",
  "questions": [
      {"question": "Which choice best states the primary purpose of the text?"}
  ],
  "options": [
      {"option": "To describe a phenomenon detrimental to the reliability of scientific findings"},
      {"option": "To suggest that true objectivity in science cannot be attained"},
      {"option": "To emphasize the inaccuracy of many scientific conclusions"},
      {"option": "To call attention to the dangers of motivated reasoning"}
  ],
  "answers" : [
      {"answer": "To describe a phenomenon detrimental to the reliability of scientific findings"}
  ]
},
// Passage 7
{
  "passage": "In recent years, many companies have shifted from a model in which workers are placed in individual cubicles to one based on open-office plans, with the goal of fostering employee interaction and collaboration. Studies suggest, however, that such strategies may backfire, increasing job dissatisfaction and leaving workers no more likely to work together than before. Researchers at Harvard Business School theorize that employees' tendency to avoid one another in open offices may be attributable to the \"fourth wall\" -the imaginary curtain that prevents actors from being distracted by the audience and preserves the imaginary world of a play. To preserve a sense of psychological autonomy, employees in open offices establish their own fourth walls, which their colleagues quickly come to respect.",
  "questions": [
      {"question": "Which choice best describes the function of the underlined portion in the text as a whole?"}
  ],
  "options": [
      {"option": "To describe a drawback of open offices"},
      {"option": "To present an explanation for an unintended phenomenon"},
      {"option": "To emphasize the importance of collaboration in the workplace"},
      {"option": "To compare office work to theatrical work"}
  ],
  "answers" : [
      {"answer": "To present an explanation for an unintended phenomenon"}
  ]
}
]

var TextCompletion = [
  {
    "passage": "Physicists have yet to figure out what exactly happens at the singularity of a black hole: matter is crushed, but what becomes of it then? The event horizon, by hiding the singularity, isolates this gap in our knowledge. All kinds of processes unknown to science may occur at the singularity, yet they have no effect on the outside world. Astronomers plotting the orbits of planets and stars can safely ignore the uncertainties introduced by singularities and __",
    "questions": [
        {"question": "Which choice most logically completes the text?"}
    ],
    "options": [
        {"option": "apply the standard laws of physics with confidence."},
        {"option": "focus on gaining a deeper understanding of black holes."},
        {"option": "attempt to peer behind the event horizon."},
        {"option": "uncover phenomena not currently known to science."}
    ],
    "answers" : [
        {"answer": "apply the standard laws of physics with confidence."}
    ]
},
{
    "passage": "Most grocery stores spray produce with water on a regular basis in order to ensure that they maintain a wholesome, fresh-picked appearance. However, according to Martin Lindstrom, author of Brandwashed: Tricks Companies Use to Manipulate Our Minds and Persuade Us to Buy, not only does this liquid lack any practical purpose, but it actually has a deleterious effect: __",
    "questions": [
        {"question": "Which choice most logically completes the text?"}
    ],
    "options": [
        {"option": "shoppers are unlikely to purchase fruits and vegetables that appear dry and withered."},
        {"option": "moisture causes picked vegetables to spoil more quickly than they otherwise would."},
        {"option": "certain vegetables lose some of their nutrients when they are boiled."},
        {"option": "produce must be watered at predictable intervals in order to appeal to consumers."}
    ],
    "answers" : [
        {"answer": "moisture causes picked vegetables to spoil more quickly than they otherwise would."}
    ]
},
{
    "passage": "Although it is widely assumed that cognitive bias clouds our assessment of the people around us, their research and that of others, a group of researchers at the Santa Fe Institute has found that people's estimations of what their friends and family believe are often largely correct. That's because as highly social creatures, we have become very good at sizing up those around us what researchers call \"social sensing.\" It is therefore possible __",
    "questions": [
        {"question": "Which choice most logically completes the text?"}
    ],
    "options": [
        {"option": "to gather highly accurate information about trends by asking about individuals about their social circles rather than their own beliefs."},
        {"option": "to determine people's views on a variety of topics by analyzing the ways in which they interact with others."},
        {"option": "to discover what people truly believe about an issue by asking them to reflect on their personal biases."},
        {"option": "to develop an algorithm that reliably predicts people's preferences about a wide range of items."}
    ],
    "answers" : [
        {"answer": "to gather highly accurate information about trends by asking about individuals about their social circles rather than their own beliefs."}
    ]
},
{
  "passage": "One of the most startling discoveries of the early 21st century was that Inda-European languages seem not to have been spread by Anatolian farmers living in what is now Turkey, as was commonly thought, but rather by a people called the Yamnaya, horse-herding nomads who lived on the Eurasian steppes more than 5,000 years ago. A host of linguistic evidence suggesting this possibility was first compiled persuasively by archaeologist David Anthony in 2007; DNA evidence later proved he was on target, showing that",
  "questions": [
      {"question": "Which choice most logically completes the text?"}
  ],
  "options": [
      {"option": "members of tribes from the steppes arrived in Germany sometime between 2500 and 2000 BCE."},
      {"option": "the Yamnaya were a genetic blend of three separate Eurasian populations."},
      {"option": "around 5,000 years ago, the Yamnaya's genes began to appear throughout Europe and Asia."},
      {"option": "the Yamnayans were linguistically unique in comparison to other groups from the same period."}
  ],
  "answers" : [
      {"answer": "around 5,000 years ago, the Yamnaya's genes began to appear throughout Europe and Asia."}
  ]
},
{
  "passage": "When Isaac Newton published the Principia in 1687, his laws of motion solved numerous problems in physics; however, they also introduced a new conundrum, which was not fully grasped until centuries after Newton and which still poses a problem for cosmologists today. Essentially, Newton's laws work about twice as well as they are intended: they describe the everyday world that people move through, but they also account perfectly well for a world in which people walk backwards, clocks tick from evening to morning, and",
  "questions": [
      {"question": "Which choice most logically completes the text?"}
  ],
  "options": [
      {"option": "objects interact unpredictably with one another."},
      {"option": "planets that are in motion remain in motion."},
      {"option": "particles of different weights move at varying speeds."},
      {"option": "apples rise from the ground to the branches of a tree."}
  ],
  "answers" : [
      {"answer": "apples rise from the ground to the branches of a tree."}
  ]
},
{
  "passage": "Exactly how Mars was formed approximately 4.5 billion years ago is a mystery, although there are several theories. One idea is that the planet was created via a titanic collision of rocks in space, spawning an all-encompassing magma ocean. When it cooled, a crust with high levels of basalt was formed. Another possibility is that parts of the first crust on Mars had a different origin, one that would primarily show large concentrations of silica. Planetary geochemist Valerie Payre and her partners analyzed data for the planet's southern hemisphere, the planet's oldest region. They discovered nine locations rich in feldspar, a mineral associated with lava flows that are higher in silica than basalt. This finding led them to conclude that",
  "questions": [
      {"question": "Which choice most logically completes the text?"}
  ],
  "options": [
      {"option": "portions of Mars' surface were never covered by a crust."},
      {"option": "the magma ocean formed from rocks colliding in space was not all-encompassing."},
      {"option": "the southern hemisphere of Mars contained more silica than was previously believed."},
      {"option": "the first crust on Mars did not develop until long after the planet was formed."}
  ],
  "answers" : [
      { "answer": "the magma ocean formed from rocks colliding in space was not all-encompassing."}
  ]
}
]


var SupportingAndUndermining = [
   // "Gerarda" is an 1895 poem by Eloise Bibb
   {
    "passage": "\"Gerarda\" is an 1895 poem by Eloise Bibb. In the poem, Bibb emphasizes the contrast between the way in which objects are depicted in Gerarda's paintings and their true appearance.",
    "questions": [
        {"question": "Which quotation from \"Gerarda\" effectively illustrates the claim?"}
    ],
    "options": [
        {"option": "But in her spiritual world she leaves Her mind, her thoughts, her soul, her brain."},
        {"option": "Her paintings hang upon the wall, The power of genius stamps them all;"},
        {"option": "Now to-day o'er canvas bent, She strives to place these visions sent"},
        {"option": "And thus her pictures plainly show, Not nature's self but ideal glow."}
    ],
    "answers" : [
        {"answer": "And thus her pictures plainly show, Not nature's self but ideal glow."}
    ]
},
// "Frederick Douglass" is an 1895 poem by Paul Laurence Dunbar
{
    "passage": "\"Frederick Douglass\" is an 1895 poem by Paul Laurence Dunbar. In the poem, Dunbar praises Douglass for his honesty and refusal to be intimidated.",
    "questions": [
        {"question": "Which quotation from \"Frederick Douglass\" effectively illustrates the claim?"}
    ],
    "options": [
        {"option": "No miser in the good he held was he,-His kindness followed his horizon's rim"},
        {"option": "A hush is over all the teeming lists, And there is pause, a breath-space in the strife;"},
        {"option": "And he was no soft-tongued apologist; He spoke straightforward, fearlessly uncowed;"},
        {"option": "He was her champion thro' direful years, And held her weal all other ends above."}
    ],
    "answers" : [
        {"answer": "And he was no soft-tongued apologist; He spoke straightforward, fearlessly uncowed;"}
    ]
},
// "Left-digit" bias
{
    "passage": "\"Left-digit\" bias, in which people focus on the first digit of a number and ignore the last, is a well-documented phenomenon that explains why prices tend to end in \"9\". According to a recent study by researchers in California and Sweden, it also influences journalists' coverage of unemployment rates. Even when jobless levels and the amount of change in unemployment rates are similar in two regions, crossing a round number informs reporters' assessment of the story's newsworthiness-even when both figures fall within the same margin of error.",
    "questions": [
        {"question": "Which finding, if true, would most directly support the researchers' finding?"}
    ],
    "options": [
        {"option": "The Bureau of Labor Statistics publishes a report of unemployment rates by state, rounding its statistics to the nearest decimal place."},
        {"option": "The mention of high unemployment figures in a newspaper caused consumer spending to drop by almost 2.5% in one city."},
        {"option": "A city newspaper ran several stories about joblessness when the unemployment rate reached 5% but quickly stopped coverage of the issue."},
        {"option": "A newspaper published significantly fewer stories about local unemployment when the jobless rate was 3.9% than when it rose to 4.1%."}
    ],
    "answers" : [
        {"answer": "A newspaper published significantly fewer stories about local unemployment when the jobless rate was 3.9% than when it rose to 4.1%."}
    ]
},
// The idea that birds lack a sense of smell
{
    "passage": "One argument that is commonly cited to support the idea that birds lack a sense of smell is that some birds' olfactory bulbs are relatively small. As a result, many scientists concluded that these creatures gave up smell in favor of improved eyesight. This notion became so pervasive that it once was repeated to avian expert Danielle Whittaker as fact by a prominent neurobiologist.",
    "questions": [
        {"question": "Which finding, if true, would most undermine the neurobiologist's statement?"}
    ],
    "options": [
        {"option": "An analysis of avian genomes revealed the presence of proteins that bind to odors and relay a signal to the brain."},
        {"option": "The number of olfactory neurons is much smaller in birds than in most other animals."},
        {"option": "The odors that birds depend on for food and social relationships are quickly dispersed in the wind."},
        {"option": "Birds sometimes overlook strongly scented prey in favor of animals that are more visually striking."}
    ],
    "answers" : [
        {"answer": "An analysis of avian genomes revealed the presence of proteins that bind to odors and relay a signal to the brain."}  
    ]
},
// New research suggests that coffee could have a positive effect on cardiovascular health
{
  "passage": "New research suggests that coffee could have a positive effect on cardiovascular health. Although caffeine is coffee's most well-known constituent, the beverage contains more than 100 biologically active components. In a study led by Jiyoung Kim, researchers at Seoul National University concluded that non-caffeinated compounds likely play a role in the positive relationship between coffee consumption and health.",
  "questions": [
      {"question": "Which finding, if true, would most directly support the researchers' conclusion?"}
  ],
  "options": [
      {"option": "Whereas regular coffee contains from 70-140 mg of caffeine per cup, decaf contains approximately 0-7mg."},
      {"option": "Decaffeinated coffee causes cells to produce NQO1, an enzyme that has neuroprotective benefits."},
      {"option": "Extracts from caffeinated coffee have been shown to aid weight loss more than a placebo."},
      {"option": "People who drink several cups of coffee every day are less vulnerable to certain diseases."}
  ],
  "answers" : [
      {"answer": "Decaffeinated coffee causes cells to produce NQO1, an enzyme that has neuroprotective benefits."}
  ]
},
// Scientists have long known that self-pollination can inhibit plants' ability to adapt to environmental changes
{
  "passage": "Scientists have long known that self-pollination can inhibit plants' ability to adapt to environmental changes, but until recently they did not know exactly how or how quickly the changes occurred. A group of researchers at Washington State University set up a controlled greenhouse experiment in which a group of monkeyflower plants were isolated from the bumblebees that normally pollinate them. Initially, the plants produced few seeds, but as they adapted to the self-pollination process, their seed production increased dramatically. In addition, their flowers changed shape to facilitate the transfer of pollen. However, scientists expected that the plants would eventually become more vulnerable to shifts in their environment.",
  "questions": [
      {"question": "Which finding, if true, would most directly support the scientists' expectation?"}
  ],
  "options": [
      {"option": "Some flowers also received pollen from nearby flowering plants, a process that is known as geitonogamy."},
      {"option": "The plants' genetic variation decreased by 24% over nine generations, making them more susceptible to a variety of pathogens."},
      {"option": "None of the plants contained the types of genetic defects that are typically found in the wild."},
      {"option": "By eliminating the transfer of pollen grains, the plants were able to reduce the amount of pollen wasted by 60%."}
  ],
  "answers" : [
      {"answer": "The plants' genetic variation decreased by 24% over nine generations, making them more susceptible to a variety of pathogens."}
  ]
},
// It was only when Alma Thomas turned away from figurative art and toward abstraction that she rose to acclaim as an artist
{
  "passage": "It was only when Alma Thomas turned away from figurative art and toward abstraction that she rose to acclaim as an artist. When the solidity of her line gave way to broken, vibrant colors, the beauty she had long seen emerged.",
  "questions": [
      {"question": "Which choice, if true, would most effectively support the writer's claim?"}
  ],
  "options": [
      {"option": "Her painting Starry Night and the Astronauts (1972) includes a small kaleidoscope of red, orange, and yellow that suggests the spaceship Apollo 10."},
      {"option": "Thomas was fascinated by the natural world, incorporating everything from the flowers in her garden to the stars in the night sky into her paintings."},
      {"option": "Her Still Life with Vases and Flowers (1964), which contains realistic images, feels labored, whereas Lunar Surface (1970) glows with rich splashes of purple and blue."},
      {"option": "Although Thomas's own works focused on nature, she believed that art could also evoke the energy of airplanes, cars, skyscrapers, and electric signals."}
  ],
  "answers" : [
      {"answer": "Her Still Life with Vases and Flowers (1964), which contains realistic images, feels labored, whereas Lunar Surface (1970) glows with rich splashes of purple and blue."}
  ]
},
// Middlemarch is an 1871 novel by George Elliot
{
  "passage": "Middlemarch is an 1871 novel by George Elliot. In the story, a young woman named Dorothea Brooke becomes engaged to a scholar named Mr. Casaubon. In describing Dorothea's motives for marriage, Elliot emphasizes her belief that she and Mr. Causabon have a great deal in common.",
  "questions": [
      {"question": "Which quotation from Middlemarch effectively illustrates the claim?"}
  ],
  "options": [
      {"option": "Dorothea by this time had looked deep into the ungauged reservoir of Mr. Casaubon's mind, seeing reflected there in vague labyrinthine extension every quality she herself brought;"},
      {"option": "If it had really occurred to Mr. Casaubon to think of Miss Brooke as a suitable wife for him, the reasons that might induce her to accept him were already planted in her mind."},
      {"option": "His notes already made a formidable range of volumes, but the crowning task would be to condense these voluminous still-accumulating results and bring them to fit a little shelf."},
      {"option": "But in this case Mr. Casaubon's confidence was not likely to be falsified, for Dorothea heard and retained what he said with the eager interest of a fresh young nature to which every variety in experience is an epoch."}
  ],
  "answers" : [
      {"answer": "Dorothea by this time had looked deep into the ungauged reservoir of Mr. Casaubon's mind, seeing reflected there in vague labyrinthine extension every quality she herself brought;"}
  ]
}
]


var GraphsAndCharts = [
  {
    "passage": "A student studying the presence of white-nose syndrome, a disease that has decimated bat populations across North America since 2007, examined data about the number of bats in a protected area. Because bats live in the dark and their cries are inaudible to people, biologists must use acoustic detectors to record their sounds and then analyze them to identify the species present in a given location. Observing that the highest number of cries came from big brown bats (Eptesicus fuscus), the student concluded that brown bat species were not affected by the disease.",
    "questions": [
        {"question": "Which statement best describes data from the graph that would undermine the student's conclusion?"}
    ],
    "options": [
        {"option": "No bat species emitted more than 10 cries on average per night."},
        {"option": "The number of cries from little brown bats was among the lowest of any species."},
        {"option": "More cries were recorded for tri-colored bats than for hoary bats."},
        {"option": "Eastern red bats were more vocally active than big brown bats."}
    ],
    "answers" : [
        {"answer": "The number of cries from little brown bats was among the lowest of any species."}
    ]
},
{
    "passage": "El Niño is a climate pattern in which water in the Pacific Ocean near the equator becomes hotter than usual, affecting the atmosphere and weather around the world. Although El Niño climate conditions are unpredictable, they typically occur every few years and can change the weather in the United States, particularly in the southern states and in California. Climatologists have found that although El Niño years do not bring heavy rains every month, the difference in rainfall during the winter in El Niño years can be much greater than the difference during other seasons. Los Angeles, for example, receives around 15mm of rain on in May on average and during El Niño years, whereas...",
    "questions": [
        {"question": "Which choice uses data from the graph to logically complete the text?"}
    ],
    "options": [
        {"option": "5mm more rain than average falls in October when El Niño is present."},
        {"option": "Over 100 mm of rain falls in January during El Niño years."},
        {"option": "The amount of rainfall in August and September is lower than average during El Niño years."},
        {"option": "The amount of rainfall in February during El Niño years is 100 mm higher than average."}
    ],
    "answers" : [
        {"answer": "The amount of rainfall in August and September is lower than average during El Niño years."}
    ]
},
{
  "passage": "Plants use photosynthesis to create energy from visible light from the sun. In addition to visible light, however, sunlight contains ultraviolet (UV) light. Researchers at the University of Hokkaido wondered whether it would be possible to provide plants with additional visible light by employing a wavelength converting material (WCM) capable of transforming UV light into red light. They created a thin-film WCM coating and applied it to clear plastic sheets, which were placed next to Swiss chard plants. A control group used sheets without the coating. In the summer, when sun irradiation was strong, no significant difference was observed between the two groups. In winter, however, the plants with the WCM films were significantly taller and contained more biomass after 63 days as compared to the control group. The researchers concluded that this accelerated growth was caused by the increased supply of red light provided by the WCM films.",
  "questions": [
      {"question": "Which choice uses data from the graph to support the researchers' conclusion?"}
  ],
  "options": [
      {"option": "Light that is less than 400 nanometers long had a much lower level of intensity than light that is more than 450 nanometers long."},
      {"option": "Light ranging from 500 to 550 nanometers had the highest level of intensity."},
      {"option": "The intensity of light waves more than 600 nanometers long that passed through the films increased to nearly peak levels."},
      {"option": "UV absorption declined steeply in light waves that are less than 450 nanometers."}
  ],
  "answers" : [
      {"answer": "The intensity of light waves more than 600 nanometers long that passed through the films increased to nearly peak levels."}
  ]
    },
{
  "passage": "Despite the sensationalist claims about the effects of video games on children's development that regularly appear in the media, a growing body of research purports to demonstrate that game players outperform non-gamers on a range of cognitive measures, and some studies suggest that the skills acquired through gaming can be transferred to real-world situations. However, these studies employ a variety of methodologies, criteria, and types of participants. Marc Palaus and colleagues at Oberta University in Spain conducted a review of 116 studies, aiming to better understand the relationship between gaming and cognitive development. While they concluded that it is possible to establish links between video games and skills involving attention, cognitive control, and visuospatial processing, they also observed that the lack of standardization could contribute to inconsistencies in the findings of similar studies.",
  "questions": [
      {"question": "Which choice most effectively uses data from the graph to support the researchers' observation?"}
  ],
  "options": [
      {"option": "The studies run by Takeushi relied on larger sample sizes and involved younger participants than any of the other studies."},
      {"option": "Few of the studies included participants under the age of 18."},
      {"option": "Each study focused on participants in a particular age range and did not include members that were much older or younger."},
      {"option": "The participants in the studies conducted by Erickson, Vo, and Kiihn and Gallinat were all under the age of 30."}
  ],
  "answers" : [
      {"answer": "The studies run by Takeushi relied on larger sample sizes and involved younger participants than any of the other studies."},
  ]
},
{
  "passage": "Seals are among the few mammals other than humans that are capable of learning new types of vocalizations. Whereas it is well established that adult harbor seals can acquire new vocal patterns, until recently this phenomenon had never been studied in pups. In 2021, researchers at the Max Planck Institute for Psycholinguistics and a group of colleagues conducted a study in which they played a series of pre-recorded sounds for a group of harbor seal pups ranging from one to three weeks old. They found that the baby seals were able to modify their vocalization patterns: overall, the pups lowered the fundamental frequency (FO) of their calls in response to increased noise. In some cases, the response with highly pronounced, with the same animal emitting vocalizations at much lower frequencies in high noise than in low noise.",
  "questions": [
      {"question": "Which choice most effectively uses data from the table to support the researchers' finding?"}
  ],
  "options": [
      {"option": "Seal B emitted vocalizations of 330 Hz in low noise and 300 Hz in high noise."},
      {"option": "The fundamental frequency of Seal A's vocalizations in high noise was 100 Hz lower than in low noise."},
      {"option": "Whereas the fundamental frequency of Seal A's call was 125 Hz lower in high noise than in no noise, the frequency of Seal B's call dropped by less than 50 Hz."},
      {"option": "In both low and high noise, the fundamental frequency of Seal E's call was around 150 Hz lower than it was without noise."}
  ],
  "answers" : [
      {"answer": "The fundamental frequency of Seal A's vocalizations in high noise was 100 Hz lower than in low noise."},
  ]
}
]

var PairedPassages = [
  {
    "passage": "By investigating interactions between tree species, scientists have found that trees leverage similarities and differences in their microbial 'makeup' to recognize other trees of their own species, and that they preferentially share nutrients with them through their mycorrhizal network-the systems of roots and fungi that connect them. For example, Douglas Fir trees growing in the same plot have been shown to share more carbon among them than with trees of other species.",
    "passage_2": "The notion that trees send out resources to strengthen a community composed of members of their species is unlikely because groups that cooperate would need to win out over groups made up of competing individuals. According to plant ecologist Kathryn Flinn, while trees can sometimes facilitate each other's growth, a forest does not function like a single organism: it includes a vast array of species with a constantly shifting variety of interactions, both cooperative and competitive.",
    "questions": [
        {"question": "Based on the texts, what would Kathryn Flinn most likely say about the 'Douglas Fir trees' in Text 1?"}
    ],
    "options": [
        {"option": "Their mycorrhizal network is not fully understood."},
        {"option": "They function as if they were a single organism."},
        {"option": "They are also likely to compete among themselves for some resources."},
        {"option": "The amount of carbon they share will vary according to environmental conditions."}
    ],
    "answers" : [
        {"answer": "They are also likely to compete among themselves for some resources."}
    ]
},
{
    "passage": "In recent years, there has been an explosion of scientific research revealing precisely how positive feelings are beneficial. We know that they motivate people to pursue important goals and overcome obstacles, offer protective benefits against the effects of stress, improve our social connectedness, and even ward off illness. The science of happiness has spawned a small industry of motivational speakers and research enterprises. Clearly, happiness is popular.",
    "passage_2": "Happiness, it turns out, has a cost when experienced too intensely. For instance, we often are told that happiness can open up our minds to foster more creative thinking and help us tackle problems or puzzles. This is the case when we experience moderate levels of happiness. But according to Mark Alan Davis's 2008 analysis of the relationship between mood and creativity, when people experience intense and perhaps overwhelming amounts of happiness, they no longer experience the same creativity boost. What's more, psychologist Barbara Fredrickson has found that too much positive emotion-and too little negative emotion-makes people inflexible in the face of new challenges.",
    "questions": [
        {"question": "Based on the texts, what would Mark Alan Davis most likely respond to what 'we know' in Text 1?"}
    ],
    "options": [
        {"option": "By emphasizing the connection between creativity and negative emotions"},
        {"option": "By acknowledging the benefits of positivity in moderation but cautioning against it in excess"},
        {"option": "By questioning the motives of the participants in the happiness industry"},
        {"option": "By challenging the connection between positive feelings and personal fulfillment"}
    ],
    "answers" : [
        {"answer": "By acknowledging the benefits of positivity in moderation but cautioning against it in excess"}
    ]
},
{
  "passage": "Until recently, the concrete psychological effects of fiction on individuals and society were largely a matter of speculation. However, research in psychology is beginning to provide answers about how fiction can expand our moral imaginations. For example, a series of studies conducted by Keith Oatley, Maja Djikic, and Raymond Mar found that fiction measurably improves people's ability to guess others' mental states by looking at only their eyes. They interpreted this finding as evidence for the idea that fiction allows people to connect with something larger than themselves.",
  "passage_2": "An empirical approach to the question of whether fiction improves empathy was taken by David Kidd and Emanuele Castano, who conducted five experiments in which participants read fictional excerpts and then responded to images of facial expressions. The results showed that the participants had improved their theory of mind (ToM), or their ability to infer the thoughts and emotions of others. As Kidd points out, however, highly developed ToM does not always translate into more ethical behavior: the ability to manipulate someone, for instance, also requires a heightened understanding of other people's emotions.",
  "questions": [
      {"question": "Based on the texts, how would Kidd and Castano most likely respond to Oatley, Djikic, and Mar in Text 1?"}
  ],
  "options": [
      {"option": "By acknowledging the importance of connecting with others."},
      {"option": "By conceding that fiction can allow people to transcend their everyday lives."},
      {"option": "By pointing out that empathy can have negative as well as positive effects."},
      {"option": "By emphasizing that individuals with high ToM may sometimes prefer non-fiction."}
  ],
  "answers" : [
      {"answer": "By pointing out that empathy can have negative as well as positive effects."}
  ]
},
{
  "passage": "On May 21, 2019, midsize black holes were detected for the first time when the U.S.-based Laser Interferometer Gravitational-Wave Observatory (LIGO) and its European counterpart Virgo captured a tremor from a pair of black holes merging deep in space. Priyamvada Natarajan, an astrophysicist who has long worked on black-hole growth models, believes that black holes this size are born in nuclear star clusters, dense collections of stars found near galactic centers. These holes sweep through the cluster, adding gas and dust, until they settle at a single location and cease to expand.",
  "passage_2": "Imre Bartos and other researchers working on 'hierarchical merger' models, in which black holes grow by eating one another, focus on one major data point in the LIGONirgo findings. The angular momentum, or 'spin,' of a black hole ranges from 0 to 1. When two black holes of similar size combine, the resulting black hole usually has a spin of around 0.7. Significantly, the two black holes involved in the merger recorded by LIGO and Virgo had 0.69 and 0.73 respectively, suggesting that they both might have formed in previous mergers.",
  "questions": [
      {"question": "Based on the texts, what would Imre Bartos most likely say about Priyamvada Natarajan's belief in Text 1?"}
  ],
  "options": [
      {"option": "It underestimates midsize black holes' spin."},
      {"option": "It misstates the time when the merger occurred."},
      {"option": "It relies too heavily on data from LIGONIGO."},
      {"option": "It overlooks the significance a crucial statistic."}
  ],
  "answers" : [
      {"answer": "It overlooks the significance a crucial statistic."}
  ]
}
]



let ACT_Science_Locators = {
  "experiment1": {
    "description": "A student decided to perform a titration experiment to neutralize a HCl solution. 50 mL of a 3 mmole/mL HCl solution was poured into a beaker and placed under a buret (a tall, thin, graduated cylinder with a stop valve at the bottom). The buret was filled with the NaOH solution. The student slightly opened the stop valve on the buret and recorded the pH using various indicators.",
    "dataTable": [
      {"volumeNaOH_mL": 0, "pHSolution": 3},
      {"volumeNaOH_mL": 2, "pHSolution": 5},
      {"volumeNaOH_mL": 4, "pHSolution": 6},
      {"volumeNaOH_mL": 6, "pHSolution": 7}
    ],
    "questions": [
      {
        "questionText": "Based on Table 1, as the volume of NaOH increased, the pH of the solution:",
        "options": [
          "increased only.",
          "decreased only.",
          "remained constant.",
          "cannot be determined from the given information."
        ]
      }
    ],
    "answers": [
      {"answer": "increased only."}
    ]
  },
  "experiment2": {
    "description": "Next, the student poured an unknown solution, USX, into the beaker and measured the pH.",
    "dataTable": [
      {"volumeUSX_mL": 0, "pHSolution": 7},
      {"volumeUSX_mL": 2, "pHSolution": 4},
      {"volumeUSX_mL": 4, "pHSolution": 2},
      {"volumeUSX_mL": 6, "pHSolution": 2}
    ],
    "questions": [
      {
        "questionText": "The student hypothesized that as the amount of USX increased in the beaker, the pH of the solution would increase. Do the results of Experiment 2 support this hypothesis?",
        "options": [
          "Yes, as the volume of USX increased the pH of the solution increased.",
          "Yes, as the volume of USX increased the pH of the solution decreased.",
          "No, as the volume of USX increased the pH of the solution increased.",
          "No, as the volume of USX increased the pH of the solution decreased."
        ]
      },
      {
        "questionText": "Based on the passage, if 100 mL of HCl was used instead of 50 mL, how many mmole of HCl would be present in the beaker before the start of the titration?",
        "options": [
          "3 mmole",
          "50 mmole",
          "100 mmole",
          "300 mmole"
        ]
      }
    ],
    "answers": [
      {"answer": "No, as the volume of USX increased the pH of the solution decreased."},
      {"answer": "300 mmole"}
    ]
  }
}

let ACT_Science_Trends_in_Tables_and_Figures = {
  "trend_example_1": {
    "table1": [
      {"trial": 1, "mass_kg": 2, "a_ms2": 3, "T_oC": 25, "F_N": 6},
      {"trial": 2, "mass_kg": 6, "a_ms2": 3, "T_oC": 25, "F_N": 18},
      {"trial": 3, "mass_kg": 10, "a_ms2": 3, "T_oC": 25, "F_N": 30},
      {"trial": 4, "mass_kg": 14, "a_ms2": 3, "T_oC": 25, "F_N": 42},
      {"trial": 5, "mass_kg": 2, "a_ms2": 3, "T_oC": 25, "F_N": 6},
      {"trial": 6, "mass_kg": 2, "a_ms2": 6, "T_oC": 25, "F_N": 12},
      {"trial": 7, "mass_kg": 2, "a_ms2": 12, "T_oC": 25, "F_N": 24},
      {"trial": 8, "mass_kg": 2, "a_ms2": 24, "T_oC": 25, "F_N": 48},
      {"trial": 9, "mass_kg": 2, "a_ms2": 3, "T_oC": 27, "F_N": 6},
      {"trial": 10, "mass_kg": 2, "a_ms2": 3, "T_oC": 29, "F_N": 3.7},
      {"trial": 11, "mass_kg": 2, "a_ms2": 3, "T_oC": 31, "F_N": 2.4},
    ],
    "table2": [
      {"weeks": 1, "pesticideConcentration_kgm3": 22, "biomass_kg": 151},
      {"weeks": 2, "pesticideConcentration_kgm3": 49, "biomass_kg": 177},
      {"weeks": 3, "pesticideConcentration_kgm3": 51, "biomass_kg": 180},
      {"weeks": 4, "pesticideConcentration_kgm3": 28, "biomass_kg": 162},
    ],
    "questions": [
      {
        "questionText": "Based on Table 1, as mass increases, F:",
        "options": ["increases only.", "decreases only.", "remains constant.", "varies, but with no general trend."]
      },
      {
        "questionText": "Based on Table 1, as a increases, F:",
        "options": ["increases only.", "decreases only.", "remains constant.", "varies, but with no general trend."]
      },
      {
        "questionText": "Based on Table 1, as T increases, F:",
        "options": ["increases only.", "decreases only.", "remains constant.", "varies, but with no general trend."]
      },
      {
        "questionText": "Based on Table 2, as the number of weeks increase, the pesticide concentration:",
        "options": ["increases only.", "decreases only.", "remains constant.", "varies, but with no general trend."]
      },
      {
        "questionText": "Based on Table 2, as pesticide concentration increases, biomass:",
        "options": ["increases only.", "decreases only.", "remains constant.", "varies, but with no general trend."]
      }
    ],
    "answers": [
      {"answer": "increases only."},
      {"answer": "increases only."},
      {"answer": "remains constant."},
      {"answer": "varies, but with no general trend."},
      {"answer": "increases only."}
    ]

  },
  "trend_example_2": {
    "figure1_url": "URL_TO_IMAGE_OF_FIGURE_1",
    "figure2_url": "URL_TO_IMAGE_OF_FIGURE_2",
    "questions": [
      {
        "questionText": "According to Figure 1, for Trial 1, as time increases, temperature:",
        "options": ["increases only.", "decreases only.", "remains constant.", "varies, but with no general trend."]
      },
      {
        "questionText": "According to Figure 1, for Trial 2, as time increases, temperature:",
        "options": ["increases only.", "decreases only.", "remains constant.", "varies, but with no general trend."]
      },
      {
        "questionText": "According to Figure 2, as species A underwent each successive treatment, the percent that survived:",
        "options": ["increases only.", "decreases only.", "remains constant.", "varied, but with no general trend."]
      },
      {
        "questionText": "According to Figure 2, as species B underwent each successive treatment, the percent that survived:",
        "options": ["increases only.", "decreases only.", "remains constant.", "varied, but with no general trend."]
      },
      {
        "questionText": "According to Figure 2, as species C underwent each successive treatment, the percent that survived:",
        "options": ["increases only.", "decreases only.", "remains constant.", "varied, but with no general trend."]
      },
      {
        "questionText": "According to Figure 2, as species D underwent each successive treatment, the percent that survived:",
        "options": ["increases only.", "decreases only.", "remains constant.", "varied, but with no general trend."]
      }
    ],
    "answers": [
      {"answer": "decreases only."},
      {"answer": "increases only."},
      {"answer": "increases only."}, //11
      {"answer": "varied, but with no general trend."},
      {"answer": "decreases only."},
      {"answer": "varied, but with no general trend."}
    ]
  }
};

let ACT_Science_Extrapolation_and_Estimation = {
  "extrapolation_example_1": {
    "figure1_url": "URL_TO_IMAGE_OF_FIGURE_1",
    "table1": [
      {"trial": 1, "block_mass_kg": 4, "incline_deg": 30, "block_speed_ms": 1.7},
      {"trial": 2, "block_mass_kg": 6, "incline_deg": 30, "block_speed_ms": 2.2},
      {"trial": 3, "block_mass_kg": 8, "incline_deg": 30, "block_speed_ms": 2.4},
      {"trial": 4, "block_mass_kg": 6, "incline_deg": 40, "block_speed_ms": 3.7},
      {"trial": 5, "block_mass_kg": 6, "incline_deg": 45, "block_speed_ms": 4.4},
      {"trial": 6, "block_mass_kg": 6, "incline_deg": 50, "block_speed_ms": 4.8}
    ],
    "questions": [
      {
        "questionText": "According to Figure 1, at 90°C, the mass of NaNO 3 that is soluble in 100 mL of H2O is:",
        "options": ["less than 40 kg.", "between 40 kg and 50 kg.", "between 50 kg and 60 kg.", "greater than 60 kg."]
      },
      {
        "questionText": "According to Figure 1, at -10°C, the mass of NaCl that is soluble in 100 mL of H2O is:",
        "options": ["less than 0 kg.", "between 0 kg and 30 kg.", "between 30 kg and 60 kg.", "greater than 60 kg."]
      },
      {
        "questionText": "According to Figure 1, at 100°C, the mass of HCl that is soluble in 100 mL of H2O is:",
        "options": ["less than 0 kg.", "between 0 kg and 30 kg.", "between 30 kg and 60 kg.", "greater than 60 kg."]
      },
      {
        "questionText": "Suppose Trial 3 had been repeated with a block mass of 10 kg. According to Table 1, the block speed measured would most likely have been:",
        "options": ["less than 1.7 m/s.", "between 1.7 m/s and 2.2 m/s.", "between 2.2 m/s and 2.4 m/s.", "greater than 2.4 m/s."]
      },
      {
        "questionText": "Suppose Trial 4 had been repeated with an incline elevation of 35°. According to Table 1, the block speed measured would most likely have been:",
        "options": ["less than 3.7 m/s.", "between 3.7 m/s and 4.4 m/s.", "between 4.4 m/s and 4.8 m/s.", "greater than 4.8 m/s."]
      }
    ],
    "answers": [
      {"answer": "between 50kg and 60 kg"}, //16
      {"answer": "greater than 60 kg."},
      {"answer": "greater than 60 kg."},
      {"answer": "greater than 2.4 m/s."},
      {"answer": "less than 3.7 m/s."}
    ]
  }
}

let ACT_Science_Data_bridge = {
  // ...Previous data goes here...
  "data_bridge_example_1": {
    "figure1_url": "URL_TO_IMAGE_OF_FIGURE_1",
    "figure2_url": "URL_TO_IMAGE_OF_FIGURE_2",
    "questions": [
      {
        "questionText": "Based on Figures 1 and 2, when the resistance of Device 2 is 3 St, the current, I, is approximately:",
        "options": ["3mA.", "4mA.", "5mA.", "6mA."]
      },
      {
        "questionText": "Based on Figures 1 and 2, when the current of Device 1 is 1 mA, the resistance is approximately:",
        "options": ["2 St.", "3 St.", "4 St.", "5 St."]
      }
    ],
    "answers": [
      {"answer": "6mA."}, //21
      {"answer": "3 St."}
    ]
  },
  "data_bridge_example_2": {
    "table1": [
      {"rock_cluster": "I", "av_percentage": "20%"},
      {"rock_cluster": "II", "av_percentage": "40%"},
      {"rock_cluster": "III", "av_percentage": "60%"},
      {"rock_cluster": "IV", "av_percentage": "80%"}
    ],
    "table2": [
      {"av_percentage": "10%", "power_w": 593},
      {"av_percentage": "30%", "power_w": 482},
      {"av_percentage": "50%", "power_w": 361},
      {"av_percentage": "70%", "power_w": 244}
    ],
    "questions": [
      {
        "questionText": "Based on Tables 1 and 2, a power of 300W is most likely associated with which rock cluster?",
        "options": ["Rock cluster I", "Rock cluster II", "Rock cluster III", "Rock cluster IV"]
      },
      {
        "questionText": "Based on Tables 1 and 2, which rock cluster most likely has the greatest power?",
        "options": ["Rock cluster I", "Rock cluster II", "Rock cluster III", "Rock cluster IV"]
      },
      {
        "questionText": "Based on Tables 1 and 2, which of the following values is closest to the power of Rock cluster II?",
        "options": ["250 W", "350 W", "435 W", "500 W"]
      },
      {
        "questionText": "Which variable represents the bridge?",
        "options": ["Rock cluster", "Av percentage", "Power", "None of the above"]
      }
    ],
    "answers": [
      {"answer": "Rock cluster III"}, //23
      {"answer": "Rock cluster I"},
      {"answer": "435 W"},
      {"answer": "Av percentage"},
   
    ]
  }
};

var ACT_Science_Data_Full_Sentence = {
  "full_sentence_answer_choices_example": {
    "passage": "Students measured the absorbance at 450 nm, A450 , of 4 solutions having known Cu2+ concentrations using a colorimeter...",
    "experiment1": {
      "steps": [
        "The colorimeter was set to 450 nm.",
        "A 200 mL beaker was thoroughly washed with H20.",
        "The 200 mL beaker was placed on a magnetic plate and a magnetic spinner was positioned at the bottom of the beaker.",
        "A known mass of copper (II) chloride, CuCh, was placed in a 200 mL flask.",
        "The solute in the flask was diluted with H2O to form a 200 mL solution.",
        "The A450 of the solution formed was measured."
      ],
      "table1": [
        {"solution": 1, "cuc12_mg": 0, "a450": 0.000},
        {"solution": 2, "cuc12_mg": 1.5, "a450": 0.099},
        {"solution": 3, "cuc12_mg": 3.0, "a450": 0.204},
        {"solution": 4, "cuc12_mg": 4.5, "a450": 0.301}
      ]
    },
    "experiment2": "The procedure from Experiment 1 was repeated, except the absorbance of copper chloride was measured at 485 nm, A485.",
    "questions": [
      {
        "questionText": "Any undissolved solute could produce undesirable results for the absorbance measurements. What action was taken by the students to ensure more effective dissolution of the copper chloride?",
        "options": [
          "Only 1 g of CuCl2 was placed in the 200 mL beaker",
          "Only 100 mL of H2O was placed in the 200 mL beaker",
          "A magnetic spinner was placed at the bottom of the 200 mL beaker",
          "A glass rod was used to stir the solution as the solute was added"
        ],
        
      },
      {
        "questionText": "A chemist hypothesized, after reading the procedure of Experiment 1, that more milligrams of copper chloride would yield a larger absorbance of light at 450 nm. Do the data support her claim?",
        "options": [
          "Yes, because according to Table 1, as the mass of copper chloride increased the A450 increased.",
          "No, because according to Table 1, as the mass of copper chloride increased the A450 increased.",
          "Yes, because according to Table 1, as the mass of copper chloride decreased the A450 increased.",
          "No, because according to Table 1, as the mass of copper chloride decreased the A450 increased."
        ]
      },
      {
        "questionText": "Which procedure step, Step 1 or Step 4, would change from Experiment 1 to Experiment 2?",
        "options": [
          "Step 1, because the A in Experiment 2 was measured at 485 nm instead of 450 nm.",
          "Step 1, because the mass of copper chloride used was greater in Experiment 2 than in Experiment 1.",
          "Step 4, because the A in Experiment 2 was measured at 485 nm instead of 450 nm.",
          "Step 4, because the mass of copper chloride used was greater in Experiment 2 than in Experiment 1."
        ]
      }
    ],
    "answers": [
      {"answer": "A magnetic spinner was placed at the bottom of the 200 mL beaker."}, //24
      {"answer": "Yes, because according to Table 1, as the mass of copper chloride increased the A450 increased."},
      {"answer": "Step 1, because the A in Experiment 2 was measured at 485 nm instead of 450 nm."}
    ]
  }
}


var ACT_Science_Cannot_Be_Determined = {
  "cannot_be_determined_example1": {
    "study1": {
      "description": "829 people were placed into four different groups: A, B, C and D. Each group was given the same task to complete in 60 minutes.",
      "figure1": [
        {"group": "A", "completion_percentage": 20},
        {"group": "B", "completion_percentage": 40},
        {"group": "C", "completion_percentage": 60},
        {"group": "D", "completion_percentage": 80}
      ]
    },
    "study2": {
      "description": "The same 829 people were shuffled into different groups and asked to repeat the task from Study 1.",
      "table1": [
        {"group": "A", "people": 140, "completion_percentage": 89},
        {"group": "B", "people": 327, "completion_percentage": 93},
        {"group": "C", "people": 255, "completion_percentage": 91},
        {"group": "D", "people": 107, "completion_percentage": 90}
      ]
    },
    "questions": [
      {
        "questionText": "According to Study 1, if it can be determined, the greatest amount of people were assigned to which group?",
        "options": ["Group B", "Group C", "Group D", "Cannot be determined from the given information"]
      },
      {
        "questionText": "According to Study 2, if it can be determined, the greatest amount of people were assigned to which group?",
        "options": ["Cannot be determined from the given information", "Group B", "Group C", "Group D"]
      },
      {
        "questionText": "Based on Studies 1 and 2, if it can be determined, did completing the task a second time improve the completion percentages of the groups?",
        "options": [
          "Yes; The completion percentages of Study 1 are generally higher than those of Study 2.",
          "Yes; The completion percentages of Study 2 are generally higher than those of Study 1.",
          "No; The completion percentages of Study 1 are generally higher than those of Study 2.",
          "No; The data is insufficient."
        ]
      },
      {
        "questionText": "Suppose the 829 people consisted of ages 17-23. Based on the passage, if it can be determined, how would this information change the results, if at all?",
        "options": [
          "The completion percentages would be higher.",
          "The completion percentages would be lower.",
          "The results of the study would not change.",
          "Cannot be determined from the given information"
        ]
      }
    ],
    "answers": [
      {"answer": "Cannot be determined from the given information"},
      {"answer": "Group B"},
      {"answer": "Yes; The completion percentages of Study 2 are generally higher than those of Study 1."},
      {"answer": "Cannot be determined from the given information"}
    ]
  }
}

var ACT_Science_Equations = {
  "equations_as_answer_choices_example1": {
    "figure1": {
      "description": "A line chart that shows the relationship between mass (in grams) and force (in Newton).",
      "data": [
        {"mass": 2, "force": 10},
        {"mass": 4, "force": 20},
        {"mass": 6, "force": 30},
        {"mass": 8, "force": 40}
      ]
    },
    "table1": {
      "description": "A table that shows the relationship between time (in seconds) and speed (in m/s).",
      "data": [
        {"time": 0.00, "speed": 0.00},
        {"time": 1.00, "speed": 3.00},
        {"time": 2.00, "speed": 6.00},
        {"time": 4.00, "speed": 12.00},
        {"time": 8.00, "speed": 24.00}
      ]
    },
    "questions": [
      {
        "questionText": "According to Figure 1, the results of the experiment are best modeled by which equation?",
        "options": [
          "mass (g) = 0.5 x force (N)",
          "mass (g) = 5.0 x force (N)",
          "force (N) = 0.5 x mass (g)",
          "force (N) = 5.0 x mass (g)"
        ]
      },
      {
        "questionText": "Suppose an object with a mass of 14 g was tested. Based on Figure 1, the force of this object would be which of the following?",
        "options": [ "50 N", "60 N", "70 N", "80 N" ]
      },
      {
        "questionText": "According to Table 1, the results of the experiment are best modeled by which equation?",
        "options": [
          "time (s) = 2.0 x speed (m/s)",
          "time (s) = 3.0 x speed (m/s)",
          "speed (m/s) = 2.0 x time (s)",
          "speed (m/s) = 3.0 x time (s)"
        ]
      },
      {
        "questionText": "Suppose an additional time of 15 sec was added to Table 1. Based on Table 1, a time of 15 sec would equate to which speed?",
        "options": [ "30 m/s", "35 m/s", "40 m/s", "45 m/s" ]
      }
    ],
    "answers": [
      {"answer": "force (N) = 0.5 x force (N)"},
      {"answer": "70 N"},
      {"answer": "speed (m/s) = 3.0 x time (s)"},
      {"answer": "45 m/s"}
    ]
  }
}

var ACT_Science_Mixing = {
  // ...Previous data goes here...
  "mixing_example1": {
    "figure1": {
      "description": "A line chart that shows the relationship between NaCl concentration (in mmol/L) and conductivity (in S/m) for water and Acetone solutions.",
      "data_water": [
        {"NaCl_concentration": 100, "conductivity": 7},
        {"NaCl_concentration": 200, "conductivity": 9},
        {"NaCl_concentration": 300, "conductivity": 11},
        {"NaCl_concentration": 400, "conductivity": 13},
        {"NaCl_concentration": 500, "conductivity": 15}
      ],
      "data_acetone": [
        {"NaCl_concentration": 100, "conductivity": 14},
        {"NaCl_concentration": 200, "conductivity": 20},
        {"NaCl_concentration": 300, "conductivity": 25},
        {"NaCl_concentration": 400, "conductivity": 30},
        {"NaCl_concentration": 500, "conductivity": 35}
      ]
    },
    "questions": [
      {
        "questionText": "Suppose that 5 mL of a 100 mmol/L NaCl-water solution is mixed with 5 mL of a 200 mmol/L NaClwater solution. According to Figure 1, the conductivity of the resulting solution will be closest to which of the following?",
        "options": [ "7 S/m", "9 S/m", "11 S/m", "18 S/m" ]
      },
      {
        "questionText": "Suppose that 20 mL of a 100 mmol/L NaCl-acetone solution is mixed with 20 mL of a 300 mmol/L NaCl-acetone solution. According to Figure 1, the conductivity of the resulting solution will be closest to which of the following?",
        "options": [ "14 S/m", "20 S/m", "25 S/m", "40 S/m" ]
      },
      {
        "questionText": "Suppose that 50 mL of a 200 mmol/L NaCl-water solution is mixed with 50 mL of a 200 mmol/L NaCl-acetone solution. According to Figure 1, the conductivity of the resulting solution will be closest to which of the following?",
        "options": [ "9 S/m", "11 S/m", "16 S/m", "20 S/m" ]
      }
    ],
    "answers": [
      {"answer": "9 S/m"},
      {"answer": "20 S/m"},
      {"answer": "16 S/m"}
    ]
  }
}

let ACT_Science_Scatter_Plot = {
  // ...Previous data goes here...
  "scatter_plot_example1": {
    "figure1": {
      "description": "A scatter plot chart that shows the relationship between exposure time (in min) and concentration for three different trials",
      "data_trials": [
        {"exposure_time": 0, "concentration": 10},
        {"exposure_time": 5, "concentration": 20},
        //... Continue in the same way for all data points ...
        {"exposure_time": 25, "concentration": 50}
      ]
    },
    "figure2": {
      "description": "A scatter plot chart that shows the relationship between exposure time (in min) and the frequency of the specimen testing",
      "data_frequency": [
        {"exposure_time": 0, "frequency": 10},
        {"exposure_time": 5, "frequency": 20},
        //... Continue in the same way for all data points ...
        {"exposure_time": 50, "frequency": 60}
      ]
    },
    "questions": [
      {
        "questionText": "According to Figure 1, from 0 min until 25 min, how often was the sample removed from the device for analysis?",
        "options": [ "Every 0.5 min", "Every 1.0 min", "Every 5.0 min", "Every 8.0 min" ]
      },
      {
        "questionText": "According to Figure 1, if an additional 5 minutes had been added to the experiment, the concentration of all three trials would most likely have:",
        "options": [ "increased", "decreased", "remained constant", "varied, with no general trend" ]
      },
      {
        "questionText": "According to Figure 2, from 0 min until 5 min, how often was the specimen cut and placed into the device for testing?",
        "options": [ "Every 1.0 min", "Every 5.0 min", "Every 10.0 min", "The frequency of the plots is not constant" ]
      },
      {
        "questionText": "According to Figure 2, from 10 min until 50 min, how often was the specimen cut and placed into the device for testing?",
        "options": [ "Every 1.0 min", "Every 5.0 min", "Every 10.0 min", "Every 15.0 min" ]
      }
    ],
    "answers": [
      {"answer": "Every 5.0 min"},
      {"answer": "increased"},
      {"answer": "Every 1.0 min"},
      {"answer": "Every 10.0 min"}
    ]
  }
};

let ACT_Science_Inference_Question = {
  // ...Previous data goes here...
  "questions": [
    {
      "questionText": "The researchers conducting the studies used a rubber clamp to fasten the aluminum belt to the ring stand, which was electrically insulated. This insulation was most likely applied by the researchers to:",
      "options": [
        "verify the weight of the aluminum belt.",
        "verify the thickness of the aluminum belt.",
        "promote the flow of electrons between the clamp and the aluminum belt.",
        "prevent the flow of electrons between the clamp and the aluminum belt."
      ]
    },
    {
      "questionText": "A container made of polyvinyl chloride (a type of plastic) rather than of wood was used to ensure that all of the water runoff would flow from the container and into the receptacle. The scientists most likely used polyvinyl chloride because that type of plastic, unlike wood, is:",
      "options": [
        "permeable and porous, and therefore unable to absorb water.",
        "permeable and porous, and therefore able to absorb water.",
        "impermeable and nonporous, and therefore unable to absorb water.",
        "impermeable and nonporous, and therefore able to absorb water."
      ]
    },
    // Continue in the same way for all questions ...
    {
      "questionText": "Which of the following statements is the most likely reason why the roots were washed after harvest?",
      "options": [
        "Unwanted particles attached to the plant material were not included in the biomass measurements",
        "To ensure the roots had an opportunity to sprout",
        "Extracellular water could be removed during the drying process",
        "Plant material was removed prior to the drying process"
      ]
    }
  ],
  "answers": [
    {"answer": "prevent the flow of electrons between the clamp and the aluminum belt."},
    {"answer": "impermeable and nonporous, and therefore unable to absorb water."},
    {"answer": "Unwanted particles attached to the plant material were not included in the biomass measurements"},
  ]
};



let ACT_Science_Method_Table = {
  // ...Previous data goes here...
  "questions": [
    {
      "questionText": "Based on Samples 7-9, which element represents the independent variable?",
      "options": ["Sun", "Soil", "Water (mL)", "Height (cm)"]
    },
    {
      "questionText": "Based on Samples 7-9, which element represents the dependent variable?",
      "options": ["Sun", "Soil", "Water (mL)", "Height (cm)"]
    },
    {
      "questionText": "Based on Samples 7-9, which element(s) represent constants?",
      "options": ["Sun only", "Soil only", "Sun and Soil", "Sun and Height"]
    }
  ],
  "answers": [
    {"answer": "Water (mL)"},
    {"answer": "Height (cm)"},
    {"answer": "Sun and Soil"},
  ]
};

let ACT_Science_Method_Figures = {
  // ...Previous data goes here...
  "questions": [
    {
      "questionText": "Based on Samples 7-9, which element represents the independent variable?",
      "options": ["Sun", "Soil", "Water (mL)", "Height (cm)"]
    },
    {
      "questionText": "Based on Samples 7-9, which element represents the dependent variable?",
      "options": ["Sun", "Soil", "Water (mL)", "Height (cm)"]
    },
    {
      "questionText": "Based on Samples 7-9, which element(s) represent constants?",
      "options": ["Sun only", "Soil only", "Sun and Soil", "Sun and Height"]
    }
  ],
  "answers": [
    {"answer": "Sun"},
    {"answer": "Soil"},
    {"answer": "Sun and Height"},
  ]
};


let ACT_Science_Generic_Labels = {
  // ...Previous data goes here...
  "scientific_method_generic_labels": {
    "studyHeader": "A lead slab was placed at the bottom of a Faraday cage near a rotating magnet. The lead mass for Box 1 and Box 2 were 5 g and 8 g, respectively. The electric flux was measured each minute for 9 minutes (Figure 1).",
    "questions": [
      {
        "questionText": "Why was the study designed so that the 2 boxes were made of the same material? This constant parameter ensured that any variations in flux would most likely be attributable only to variations in the:",
        "options": ["box height.", "box width.", "type of metal slab used.", "mass of metal slab used."]
      },
      {
        "questionText": "According to the results of the experiment, did a decrease in the mass of the metal slab increase or decrease the flux at a given time?",
        "options": [
          "Increase, because the mass of metal slab and flux at a given time are directly related.",
          "Increase, because the mass of metal slab and flux at a given time are inversely related.",
          "Decrease, because the mass of metal slab and flux at a given time are directly related.",
          "Decrease, because the mass of metal slab and flux at a given time are inversely related."
        ]
      }
    ],
    "answers": [
      {"answer": "mass of metal slab used."},
      {"answer": "Increased, because the mass of metal slab and flux at a given time are inversely related."}
      ]
  }
};


let ACT_Science_Inverse_Trends = {
  // ...Previous data goes here...
  "study_1": {
    "header": "A student performed an experiment to measure the temperature of a beaker of water over time. The student measured 200 mL of water and placed the beaker in a freezer at -2°C. A thermometer was placed inside of the beaker and the temperature was recorded every 2 seconds (Trial 1). Then, the student measured 200 mL of water and placed the beaker on a hot plate. The hot plate was turned to 75% power. A thermometer was placed inside of the beaker and the temperature was recorded every 2 seconds (Trial 2). The student recorded the results in Figure 1.",
    "questions": [
      {
        "questionText": "Suppose that, in a new study, the student used the hot plate to heat 400 mL of water. Based on Figure 1 and other information provided, at time = 6 s, the temperature of the water inside the beaker would most likely be:",
        "options": ["less than 5°C", "between 5°C and 7.5°C", "between 7.5°C and 10°C", "greater than 10°C"]
      },
      {
        "questionText": "As acceleration increases, will the time it takes an object to reach the bottom of an inclined plane increase or decrease, and why?",
        "options": ["Decrease, because velocity will decrease.", "Increase, because velocity will decrease.", "Decrease, because velocity will increase.", "Increase, because velocity will increase."]
      },
      {
        "questionText": "The LED would best conduct electricity if the resistance of the circuit equaled which of the following values?",
        "options": ["20 r2", "30 r2", "40 r2", "50 r2"]
      }
    ],
    "answers": [
      {"answer": "less than 5°C"},
      {"answer": "Decrease, because velocity will increase."},
      {"answer": "20 r2"}
    ]
  }
};

let ACT_Science_Outside_Knowledge = {
  // ...Previous data goes here...
  "questions": [
    {
      "questionText": "When honeybees synthesize proteins, the RNA genetic code is converted into a long polypeptide chain. Which of the following molecules represent the building blocks of this polypeptide chain?",
      "options": ["ATP", "DNA", "Carbohydrates", "Amino acids"]
    },
    {
      "questionText": "The plants atop the green roof absorb and release various molecules and forms of energy. Which equation best represents the exchange of molecules between the plants and the atmosphere?",
      "options": ["light + sugar + water ---+ CO2 + 0 2", "light + water ---+ CO2 + 0 2 + sugar", "light + water + CO2 ---+sugar + 0 2", "light + water---+ CO2 + sugar + 0 2"]
    },
    {
      "questionText": "A protein channel, which facilitates diffusion, helps starch molecules pass through a semi-permeable barrier. Which component of the cell do starch molecules pass through?",
      "options": ["Lysosomes", "Mitochondria", "Cell membrane", "Endoplastic Reticulum"]
    },
    {
      "questionText": "Monosaccharides are the basic form of carbohydrates and are organic molecules. Which molecule represents a monosaccharide?",
      "options": ["NaCl", "CO2", "03", "C3H603"]
    },
    {
      "questionText": "The salt used by the experimenter creates an ionic bond when placed in solution. If a different molecule were chosen for the experiment, the experimenter would choose which molecule to create a similar type of bond?",
      "options": ["NaCl", "CO2", "03", "C3H603"]
    },
    {
      "questionText": "At the end of the experiment, the students neutralized the acidic solution in the beaker with an unknown solution. What was the pH of the unknown solution used by the students?",
      "options": ["pH 3", "pH 5", "pH 7", "pH 9"]
    },
    {
      "questionText": "When calculating the weight of the object, the students multiplied the mass of the object by the gravity of Earth, g. What value of g did the students use?",
      "options": ["1.0 m/s 2", "4.9 m/s 2", "9.8 m/s 2", "12.0 m/s 2"]
    }
  ],
  "answers": [
    {"answer": "ATP"},
    {"answer": "light + water + CO2 ---+sugar + 0 2"},
    {"answer": "Cell membrane"},
    {"answer": "C3H603"},
    {"answer": "NaCl"},
    {"answer": "pH 9"},
    {"answer": "9.8 m/s 2"}
  ] 
};

let ComplexNumbersTestMathAnswers = []


  const [ComplexNumbersTestMath, setComplexNumbersTestMath] = useState(ComplexNumbersTestMathValues[0]);
  const [ComplexNumbersTestMathAnswer, setComplexNumbersTestMathAnswer] = useState(ComplexNumbersTestMathAnswers[0]);

  useEffect(()=>{
    if(quizTitle.includes('Complex Numbers')){
      setComplexNumbersTestMath(ComplexNumbersTestMathValues[currentQuestionIndex]);
      setComplexNumbersTestMathAnswer(ComplexNumbersTestMathAnswers[currentQuestionIndex]);
    }else{
      setComplexNumbersTestMath('');
      setComplexNumbersTestMathAnswer('');
    }
  },[currentQuestionIndex])
 
  useEffect(() => {
    if (endQuiz) {
      let totalPointsTemp = 0;
      let correctPointsTemp = 0;
      for (let i = 0; i < questions.length; i += 1) {
        let point = questions[i].point || 0;
        if (typeof point === 'string' || point instanceof String) {
          point = parseInt(point);
        }

        totalPointsTemp += point;

        if (correct.includes(i)) {
          correctPointsTemp += point;
        }
      }
      setTotalPoints(totalPointsTemp);
      setCorrectPoints(correctPointsTemp);
    }
  }, [endQuiz]);

  useEffect(() => {
    setQuestionSummary({
      numberOfQuestions: questions.length,
      numberOfCorrectAnswers: correct.length,
      numberOfIncorrectAnswers: incorrect.length,
      questions,
      userInput,
      totalPoints,
      correctPoints,
    });
  }, [totalPoints, correctPoints]);

  useEffect(() => {
    if (endQuiz && onComplete !== undefined && questionSummary !== undefined) {
      onComplete(questionSummary);
    }
  }, [endQuiz, questionSummary]);

  const nextQuestion = (currentQuestionIdx) => {
    setIncorrectAnswer(false);
    setCorrectAnswer(false);
    setShowNextQuestionButton(false);
    setButtons({});

    if (currentQuestionIdx + 1 === questions.length) {
      if (userInput.length !== questions.length) {
        alert('Quiz is incomplete');
      } else if (allowNavigation) {
        const submitQuiz = true//confirm('You have finished all the questions. Submit Quiz now?');
        if (submitQuiz) {
          setEndQuiz(true);
        }
      } else {
        setEndQuiz(true);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIdx + 1);
    }
    window.scrollTo(0, 0);
  };

  const handleChange = (event) => {
    setFilteredValue(event.target.value);
  };

  const renderAnswerInResult = (question, userInputIndex) => {
    const { answers, correctAnswer, questionType } = question;
    let { answerSelectionType } = question;
    let answerBtnCorrectClassName;
    let answerBtnIncorrectClassName;

    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || 'single';

    return answers.map((answer, index) => {
      if (answerSelectionType === 'single') {
        // correctAnswer - is string
        answerBtnCorrectClassName = (`${index + 1}` === correctAnswer ? 'correct' : '');
        answerBtnIncorrectClassName = (`${userInputIndex}` !== correctAnswer && `${index + 1}` === `${userInputIndex}` ? 'incorrect' : '');
      } else {
        // correctAnswer - is array of numbers
        answerBtnCorrectClassName = (correctAnswer.includes(index + 1) ? 'correct' : '');
        answerBtnIncorrectClassName = (!correctAnswer.includes(index + 1) && userInputIndex.includes(index + 1) ? 'incorrect' : '');
      }

      return (
        <div key={index}>
          <button
            disabled
            className={`answerBtn btn ${answerBtnCorrectClassName}${answerBtnIncorrectClassName}`}
          >
            {questionType === 'text' && <span>{answer}</span>}
            {questionType === 'photo' && <img src={answer} alt="image" />}
          </button>
        </div>
      );
    });
  };

  const renderQuizResultQuestions = useCallback(() => {
    let filteredQuestions;
    let filteredUserInput;

    if (filteredValue !== 'all') {
      if (filteredValue === 'correct') {
        filteredQuestions = questions.filter((question, index) => correct.indexOf(index) !== -1);
        filteredUserInput = userInput.filter((input, index) => correct.indexOf(index) !== -1);
      } else {
        filteredQuestions = questions.filter((question, index) => incorrect.indexOf(index) !== -1);
        filteredUserInput = userInput.filter((input, index) => incorrect.indexOf(index) !== -1);
      }
    }

    return (filteredQuestions || questions).map((question, index) => {
      const userInputIndex = filteredUserInput ? filteredUserInput[index] : userInput[index];

      // Default single to avoid code breaking due to automatic version upgrade
      const answerSelectionType = question.answerSelectionType || 'single';

      return (
        <div className="result-answer-wrapper" key={index + 1}>
          <h3 dangerouslySetInnerHTML={rawMarkup(`Q${question.questionIndex}: ${question.question}`)} />
          {question.questionPic && <img src={question.questionPic} alt="image" />}
          {renderTags(answerSelectionType, question.correctAnswer.length, question.segment)}
          <div className="result-answer">
            {renderAnswerInResult(question, userInputIndex)}
          </div>
          <Explanation question={question} isResultPage />
        </div>
      );
    });
  }, [endQuiz, filteredValue]);

  const renderAnswers = (question, buttons) => {
    const {
      answers, correctAnswer, questionType, questionIndex,
    } = question;
    let { answerSelectionType } = question;
    const onClickAnswer = (index) => checkAnswer(index + 1, correctAnswer, answerSelectionType, {
      userInput,
      userAttempt,
      currentQuestionIndex,
      continueTillCorrect,
      showNextQuestionButton,
      incorrect,
      correct,
      setButtons,
      setCorrectAnswer,
      setIncorrectAnswer,
      setCorrect,
      setIncorrect,
      setShowNextQuestionButton,
      setUserInput,
      setUserAttempt,
    });

    const onSelectAnswer = (index) => selectAnswer(index + 1, correctAnswer, answerSelectionType, {
      userInput,
      currentQuestionIndex,
      setButtons,
      setShowNextQuestionButton,
      incorrect,
      correct,
      setCorrect,
      setIncorrect,
      setUserInput,
    });

    const checkSelectedAnswer = (index) => {
      if (userInput[questionIndex - 1] === undefined) {
        return false;
      }
      if (answerSelectionType === 'single') {
        return userInput[questionIndex - 1] === index;
      }
      return Array.isArray(userInput[questionIndex - 1]) && userInput[questionIndex - 1].includes(index);
    };

    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || 'single';

    return answers.map((answer, index) => (
      <Fragment key={index}>
        {(buttons[index] !== undefined)
          ? (
            <button
              type="button"
              disabled={buttons[index].disabled || false}
              className={`${buttons[index].className} answerBtn btn`}
              onClick={() => (revealAnswerOnSubmit ? onSelectAnswer(index) : onClickAnswer(index))}
            >
              {questionType === 'text' && <span>{answer}</span>}
              {questionType === 'photo' && <img src={answer} alt="image" />}
            </button>
          )
          : (
            <button
              type="button"
              onClick={() => (revealAnswerOnSubmit ? onSelectAnswer(index) : onClickAnswer(index))}
              className={`answerBtn btn ${(allowNavigation && checkSelectedAnswer(index + 1)) ? 'selected' : null}`}
            >
              {questionType === 'text' && answer}
              {questionType === 'photo' && <img src={answer} alt="image" />}
            </button>
          )}
      </Fragment>
    ));
  };

  const renderTags = (answerSelectionType, numberOfSelection, segment) => {
    const {
      singleSelectionTagText,
      multipleSelectionTagText,
      pickNumberOfSelection,
    } = appLocale;

    return (
      <div className="tag-container">
        {answerSelectionType === 'single'
          && <span className="single selection-tag">{singleSelectionTagText}</span>}
        {answerSelectionType === 'multiple'
          && <span className="multiple selection-tag">{multipleSelectionTagText}</span>}
        <span className="number-of-selection">
          {pickNumberOfSelection.replace('<numberOfSelection>', numberOfSelection)}
        </span>
        {segment && <span className="selection-tag segment">{segment}</span>}
      </div>
    );
  };

  const renderResult = () => (
    <div className="card-body">
      <h2>
        {appLocale.resultPageHeaderText
          .replace('<correctIndexLength>', correct.length)
          .replace('<questionLength>', questions.length)}
      </h2>
      <h2>
        {appLocale.resultPagePoint
          .replace('<correctPoints>', correctPoints)
          .replace('<totalPoints>', totalPoints)}
      </h2>
      <br />
      <QuizResultFilter
        filteredValue={filteredValue}
        handleChange={handleChange}
        appLocale={appLocale}
      />
      {renderQuizResultQuestions()}
    </div>
  );
  return (
    <div className="questionWrapper">
      {!endQuiz
        && (
        <div className="questionWrapperBody">
          <div className="questionModal">
            <InstantFeedback
              question={question}
              showInstantFeedback={showInstantFeedback}
              correctAnswer={correctAnswer}
              incorrectAnswer={incorrectAnswer}
              onQuestionSubmit={onQuestionSubmit}
              userAnswer={[...userInput].pop()}
            />
          </div>
          <div>
            <h4>
            {appLocale.question}
            {' '}
            {currentQuestionIndex + 1}
            :
            </h4>
          </div>
          <MathJaxContext>
          <MathJax>
          <div>
            <p></p>
            {ComplexNumbersTestMath}

          </div>
          </MathJax>
        </MathJaxContext>

        <div>
          <h4>Answer Choices</h4>
          {ComplexNumbersTestMathAnswer.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
          
          <h3 dangerouslySetInnerHTML={rawMarkup(question && question.question)} />
          {question && question.questionPic && <img src={question.questionPic} alt="image" />}
          {question && renderTags(answerSelectionTypeState, question.correctAnswer.length, question.segment)}
          {question && renderAnswers(question, buttons)}
          {(showNextQuestionButton || allowNavigation)
          && (
          <div className="questionBtnContainer">
            {(allowNavigation && currentQuestionIndex > 0) && (
              <button
                onClick={() => nextQuestion(currentQuestionIndex - 2)}
                className="prevQuestionBtn btn"
                type="button"
              >
                {appLocale.prevQuestionBtn}
              </button>
            )}
            <button onClick={() => nextQuestion(currentQuestionIndex)} className="nextQuestionBtn btn" type="button">
              {appLocale.nextQuestionBtn}
            </button>
          </div>
          )}
        </div>
        )}
      {endQuiz && showDefaultResultState && customResultPage === undefined
          && renderResult()}
      {endQuiz && !showDefaultResultState && customResultPage !== undefined
          && customResultPage(questionSummary)}
    </div>
  );
}

export default Core;
