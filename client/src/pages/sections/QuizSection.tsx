import React from "react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/mixpanel";

interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multi';
  options: { value: string; label: string }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'usage_location',
    question: 'Where will you primarily use your MLM2PRO?',
    type: 'single',
    options: [
      { value: 'indoor_sim', label: 'Indoor Simulator' },
      { value: 'outdoor_range', label: 'Outdoor Range' },
      { value: 'home_garage', label: 'Home Garage' },
      { value: 'golf_course', label: 'Golf Course' },
    ]
  },
  {
    id: 'main_goal',
    question: "What's your main goal with MLM2PRO?",
    type: 'single',
    options: [
      { value: 'increase_distance', label: 'Increase Distance' },
      { value: 'improve_accuracy', label: 'Improve Accuracy' },
      { value: 'dial_clubs', label: 'Dial in My Clubs' },
      { value: 'understand_swing', label: 'Understand My Swing' },
      { value: 'have_fun', label: 'Just Have Fun!' },
    ]
  },
  {
    id: 'excited_game_mode',
    question: 'Which game mode are you most excited for?',
    type: 'single',
    options: [
      { value: 'practice', label: 'Practice' },
      { value: 'rapsodo_range', label: 'Rapsodo Range' },
      { value: 'rapsodo_courses', label: 'Rapsodo Courses' },
      { value: 'target_range', label: 'Target Range' },
      { value: 'r_speed', label: 'R-Speed' },
      { value: 'closest_to_the_pin', label: 'Closest to the Pin' },
      { value: '3rd_party', label: '3rd Party Software' },
    ]
  },
  {
    id: 'practice_frequency',
    question: 'How often do you plan to play?',
    type: 'single',
    options: [
      { value: 'daily', label: 'Daily' },
      { value: 'few_times_week', label: 'A Few Times a Week' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'when_i_can', label: 'When I Can' },
    ]
  },
  {
    id: 'simulator_software',
    question: 'What simulator software do you plan on using?',
    type: 'multi',
    options: [
      { value: 'mlm2pro_app', label: 'MLM2PRO App' },
      { value: 'e6_connect', label: 'E6 Connect' },
      { value: 'gspro', label: 'GSPro' },
      { value: 'awesome_golf', label: 'Awesome Golf' },
      { value: 'other', label: 'Other' },
      { value: 'not_sure', label: 'Not Sure' },
    ]
  }
];
const STORAGE_KEY = 'mlm2pro_quiz_completed';

export const QuizSection = (): JSX.Element => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string | string[]>>({});
  const [isCompleted, setIsCompleted] = React.useState(false);

  React.useEffect(() => {
    const completed = localStorage.getItem(STORAGE_KEY);
    if (completed === 'true') {
      setIsCompleted(true);
    }
  }, []);

  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleOptionClick = (value: string) => {
    const questionId = currentQuestion.id;
    
    if (currentQuestion.type === 'single') {
      setAnswers({ ...answers, [questionId]: value });
    } else {
      const current = (answers[questionId] as string[]) || [];
      if (current.includes(value)) {
        setAnswers({
          ...answers,
          [questionId]: current.filter(v => v !== value)
        });
      } else {
        setAnswers({
          ...answers,
          [questionId]: [...current, value]
        });
      }
    }
  };

  const isOptionSelected = (value: string): boolean => {
    const questionId = currentQuestion.id;
    if (currentQuestion.type === 'single') {
      return answers[questionId] === value;
    } else {
      const current = (answers[questionId] as string[]) || [];
      return current.includes(value);
    }
  };

  const canProceed = (): boolean => {
    const questionId = currentQuestion.id;
    const answer = answers[questionId];
    
    if (currentQuestion.type === 'single') {
      return !!answer;
    } else {
      return Array.isArray(answer) && answer.length > 0;
    }
  };

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeQuiz();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeQuiz = () => {
    trackEvent('mlm2pro_onboarding_quiz_completed', answers);
    
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsCompleted(true);
  };

  if (isCompleted) {
    return <></>;
  }

  return (
    <section className="w-full bg-genericblack py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading-72-9xl-hero font-[number:var(--heading-72-9xl-hero-font-weight)] [font-style:var(--heading-72-9xl-hero-font-style)] text-genericwhite text-[length:var(--heading-72-9xl-hero-font-size)] tracking-[var(--heading-72-9xl-hero-letter-spacing)] leading-[var(--heading-72-9xl-hero-line-height)] mb-4">
            LET'S GET TO KNOW YOU
          </h2>
          <p className="font-paragraph-18-lg-medium font-[number:var(--paragraph-18-lg-medium-font-weight)] text-genericwhite text-[length:var(--paragraph-18-lg-medium-font-size)] tracking-[var(--paragraph-18-lg-medium-letter-spacing)] leading-[var(--paragraph-18-lg-medium-line-height)] opacity-80">
            Help us personalize your MLM2PRO experience
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-paragraph-14-sm-semibold font-[number:var(--paragraph-14-sm-semibold-font-weight)] text-genericwhite text-[length:var(--paragraph-14-sm-semibold-font-size)] uppercase">
              Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="font-paragraph-14-sm-medium text-genericwhite opacity-60">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary600-main transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-12">
          <h3 className="font-heading-48-6xl-hero font-[number:var(--heading-48-6xl-hero-font-weight)] [font-style:var(--heading-48-6xl-hero-font-style)] text-genericwhite text-[length:var(--heading-48-6xl-hero-font-size)] tracking-[var(--heading-48-6xl-hero-letter-spacing)] leading-[var(--heading-48-6xl-hero-line-height)] mb-8 text-center md:text-left">
            {currentQuestion.question}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => {
              const selected = isOptionSelected(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className={`
                    relative p-6 rounded-xl border-2 transition-all duration-200 text-left
                    ${selected 
                      ? 'bg-primary600-main border-primary600-main' 
                      : 'bg-white border-white hover:border-primary600-main'
                    }
                  `}
                  data-testid={`quiz-option-${option.value}`}
                >
                  <span className={`
                    font-paragraph-20-xl-medium font-[number:var(--paragraph-20-xl-medium-font-weight)] text-[length:var(--paragraph-20-xl-medium-font-size)] tracking-[var(--paragraph-20-xl-medium-letter-spacing)] leading-[var(--paragraph-20-xl-medium-line-height)]
                    ${selected ? 'text-white' : 'text-genericblack'}
                  `}>
                    {option.label}
                  </span>
                  {currentQuestion.type === 'multi' && (
                    <div className={`
                      absolute top-4 right-4 w-6 h-6 rounded border-2 flex items-center justify-center
                      ${selected ? 'bg-white border-white' : 'bg-transparent border-gray-400'}
                    `}>
                      {selected && (
                        <svg className="w-4 h-4 text-primary600-main" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={handleBack}
            disabled={currentStep === 0}
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-genericblack disabled:opacity-30 disabled:cursor-not-allowed px-8 py-6 text-lg"
          >
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-primary600-main hover:bg-primary600-main/90 text-white disabled:opacity-30 disabled:cursor-not-allowed px-8 py-6 text-lg"
          >
            {currentStep === QUIZ_QUESTIONS.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </section>
  );
};
