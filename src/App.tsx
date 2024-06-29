import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { AlertCircle, CheckCircle } from 'lucide-react';

const quizData = [
  {
    question: "定額減税の調整給付について、企業側で行う手続きはありますか？",
    options: [
      "はい、企業側で申請書を提出する必要があります",
      "いいえ、手続きは不要です",
      "企業の規模によって異なります",
      "従業員数に応じて手続きが必要です"
    ],
    correctAnswer: 1
  },
  {
    question: "市区町村からある従業員についての「給与の調査について」の書類が届いた場合の対応は？",
    options: [
      "書類を無視する",
      "従業員に知らせて対応する",
      "会社で処理する",
      "市区町村に連絡する"
    ],
    correctAnswer: 1
  },
  {
    question: "定額減税の調整給付を受け取るために申請は必要ですか？",
    options: [
      "いいえ、自動的に支給されます",
      "はい、市町村窓口で申請する必要があります",
      "市区町村から送付される確認書に記入して返信する必要があります",
      "勤務先の会社を通じて申請します"
    ],
    correctAnswer: 2
  },
  {
    question: "協会けんぽから「健康保険委員」に登録する書類が届いた場合、登録は必須ですか？",
    options: [
      "はい、必須です",
      "いいえ、任意です",
      "会社によって異なります",
      "特定の条件を満たす場合は必須です"
    ],
    correctAnswer: 1
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
    question: "「日給月給制」とは何ですか？",
    options: [
      "月給制の一種で、遅刻や欠勤した場合にその分の給与が減額される制度",
      "月給制の一種で、遅刻や欠勤しても給与が減額されない制度",
      "日給制の一種で、毎日支給される制度",
      "月給制の一種で、毎月固定額が支給される制度"
    ],
    correctAnswer: 0
  },
  {
    question: "障害者雇用率が引き上げられましたが、何人以上の会社で障害者を雇用しなければならないのでしょうか？",
    options: [
      "30人以上",
      "40人以上",
      "50人以上",
      "60人以上"
    ],
    correctAnswer: 1
  },
  {
    question: "36協定（サブロク協定）とは何ですか？",
    options: [
      "労働者に法定労働時間を超えて働かせる場合や、休日に労働させる場合に必要な労使間の取り決め",
      "労働者の健康診断に関する協定",
      "労働者の退職金に関する協定",
      "労働者の給与計算に関する協定"
    ],
    correctAnswer: 0
  },
  {
    question: "住民税はどの住所で課税されますか？",
    options: [
      "現在の住所",
      "現年の1月1日現在の住所地",
      "引っ越し先の住所",
      "勤務先の住所"
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
        <CardTitle className="text-2xl font-bold text-center">Jinjiクイズ</CardTitle>
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
                  className={`w-full justify-start py-4 px-6 text-lg ${
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