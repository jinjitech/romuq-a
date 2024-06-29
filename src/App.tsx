import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { AlertCircle, CheckCircle } from 'lucide-react';

const quizData = [
  {
    question: "調整給付について、企業側で行う手続きはありますか？",
    options: [
      "はい、企業側で申請書を提出する必要があります",
      "いいえ、手続きは不要です",
      "企業の規模によって異なります",
      "従業員数に応じて手続きが必要です"
    ],
    correctAnswer: 1
  },
  {
    question: "調整給付を受け取るために申請は必要ですか？",
    options: [
      "いいえ、自動的に支給されます",
      "はい、オンラインで申請する必要があります",
      "市区町村から送付される確認書に記入して返信する必要があります",
      "勤務先の会社を通じて申請します"
    ],
    correctAnswer: 2
  },
  {
    question: "入社1年未満でも育児休業を取得できますか？",
    options: [
      "いいえ、1年以上勤務しないと取得できません",
      "はい、無条件で取得できます",
      "原則可能ですが、労使協定により制限される場合があります",
      "管理職のみ取得可能です"
    ],
    correctAnswer: 2
  },
  {
    question: "入社1年未満で育児休業を取得する際、特別に必要な書類はありますか？",
    options: [
      "特別な書類は必要ありません",
      "会社の推薦状が必要です",
      "前職の離職票の添付が必要な場合があります",
      "医師の診断書が必要です"
    ],
    correctAnswer: 2
  },
  {
    question: "協会けんぽの任意継続で家族を扶養に入れる際、マイナンバー記載で必要書類が省ける場合がありますが、確実な方法は何ですか？",
    options: [
      "マイナンバーの記載のみで十分です",
      "必要書類を添付する方が確実です",
      "電話で協会けんぽに確認することが最も確実です",
      "市町村役場で証明書を取得することが必要です"
    ],
    correctAnswer: 1
  }
];
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const handleAnswerClick = (selectedOption: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(selectedOption);
    setIsAnswered(true);
    
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">労務クイズ</CardTitle>
      </CardHeader>
      <CardContent>
        {showScore ? (
          <div className="text-center">
            <h2 className="text-xl mb-4">クイズ終了！</h2>
            <p className="text-lg mb-4">
              正解数: {score} / {quizData.length}
            </p>
            <Button onClick={resetQuiz}>もう一度挑戦する</Button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">
              問題 {currentQuestion + 1} / {quizData.length}
            </h2>
            <p className="mb-4">{quizData[currentQuestion].question}</p>
            <div className="space-y-2">
              {quizData[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className={`w-full justify-start ${
                    isAnswered
                    ? index === quizData[currentQuestion].correctAnswer
                      ? 'bg-green-500 hover:bg-green-600'
                      : selectedAnswer === index
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-black text-white'
                    : 'bg-black text-white hover:bg-gray-700'
                    }`}
                  disabled={isAnswered}
                >
                  {isAnswered && (
                    <>
                      {index === quizData[currentQuestion].correctAnswer ? (
                        <CheckCircle className="mr-2" />
                      ) : selectedAnswer === index ? (
                        <AlertCircle className="mr-2" />
                      ) : null}
                    </>
                  )}
                  {option}
                </Button>
              ))}
            </div>
            {isAnswered && (
              <div className="mt-4 text-center">
                <Button onClick={handleNextQuestion}>
                  {currentQuestion < quizData.length - 1 ? '次の問題へ' : '結果を見る'}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizApp;