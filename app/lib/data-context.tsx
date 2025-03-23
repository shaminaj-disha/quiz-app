import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

export interface Question {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  id: string;
  questionId: string;
  userId: string;
  text: string;
  createdAt: string;
  history: {
    text: string;
    timestamp: string;
  }[];
}

interface DataContextType {
  questions: Question[];
  answers: Answer[];
  addQuestion: (text: string) => void;
  updateQuestion: (id: string, text: string) => void;
  deleteQuestion: (id: string) => void;
  addAnswer: (questionId: string, userId: string, text: string) => void;
  updateAnswer: (id: string, text: string) => void;
  getQuestionAnswers: (questionId: string) => Answer[];
  getUserAnswers: (userId: string) => Answer[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial mock data
const INITIAL_QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "What is React?",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "q2",
    text: "What are the key features of TypeScript?",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const INITIAL_ANSWERS: Answer[] = [
  {
    id: "a1",
    questionId: "q1",
    userId: "2",
    text: "React is a JavaScript library for building user interfaces.",
    createdAt: new Date().toISOString(),
    history: [
      {
        text: "React is a JavaScript library for building user interfaces.",
        timestamp: new Date().toISOString(),
      },
    ],
  },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    // Load data from localStorage or use initial data
    const storedQuestions = localStorage.getItem("quizAppQuestions");
    const storedAnswers = localStorage.getItem("quizAppAnswers");
    const storedNoQuestionState = localStorage.getItem("noQuestions");

    setQuestions(
      storedQuestions
        ? JSON.parse(storedQuestions)
        : storedNoQuestionState
        ? []
        : INITIAL_QUESTIONS
    );
    setAnswers(
      storedAnswers
        ? JSON.parse(storedAnswers)
        : storedNoQuestionState
        ? []
        : INITIAL_ANSWERS
    );
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    const storedNoQuestionState = localStorage.getItem("noQuestions");
    if (questions.length > 0) {
      localStorage.setItem("quizAppQuestions", JSON.stringify(questions));
      localStorage.setItem("noQuestions", JSON.stringify(false));
    } else if (storedNoQuestionState === "true") {
      localStorage.removeItem("quizAppQuestions");
    }
    if (answers.length > 0) {
      localStorage.setItem("quizAppAnswers", JSON.stringify(answers));
    } else if (storedNoQuestionState === "true") {
      localStorage.removeItem("quizAppAnswers");
    }
  }, [questions, answers]);

  const addQuestion = (text: string) => {
    const newQuestion: Question = {
      id: `q${Date.now()}`,
      text,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, text: string) => {
    setQuestions(
      questions.map((ques) =>
        ques.id === id
          ? { ...ques, text, updatedAt: new Date().toISOString() }
          : ques
      )
    );
  };

  const deleteQuestion = (id: string) => {
    const filteredQuestions = questions?.filter((ques) => ques.id !== id);
    const filteredAnswers = answers.filter((ans) => ans.questionId !== id);
    setQuestions(filteredQuestions);
    // Also delete associated answers
    setAnswers(filteredAnswers);
    if (filteredQuestions?.length === 0) {
      localStorage.setItem("noQuestions", JSON.stringify(true));
    }
  };

  const addAnswer = (questionId: string, userId: string, text: string) => {
    // Check if user already answered this question
    const existingAnswer = answers.find(
      (ans) => ans.questionId === questionId && ans.userId === userId
    );

    if (existingAnswer) {
      // Update existing answer
      updateAnswer(existingAnswer.id, text);
    } else {
      // Create new answer
      const newAnswer: Answer = {
        id: `a${Date.now()}`,
        questionId,
        userId,
        text,
        createdAt: new Date().toISOString(),
        history: [
          {
            text,
            timestamp: new Date().toISOString(),
          },
        ],
      };
      setAnswers([...answers, newAnswer]);
    }
  };

  const updateAnswer = (id: string, text: string) => {
    setAnswers(
      answers.map((ans) => {
        if (ans.id === id) {
          return {
            ...ans,
            text,
            history: [
              ...ans.history,
              {
                text,
                timestamp: new Date().toISOString(),
              },
            ],
          };
        }
        return ans;
      })
    );
  };

  const getQuestionAnswers = (questionId: string) => {
    return answers.filter((ans) => ans.questionId === questionId);
  };

  const getUserAnswers = (userId: string) => {
    return answers.filter((ans) => ans.userId === userId);
  };

  return (
    <DataContext.Provider
      value={{
        questions,
        answers,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        addAnswer,
        updateAnswer,
        getQuestionAnswers,
        getUserAnswers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
