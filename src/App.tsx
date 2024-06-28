import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import './App.css';

// 更新されたコンポーネントの型定義
type CardProps = React.PropsWithChildren<{className?: string}>;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Card: React.FC<CardProps> = ({children, className}) => <div className={`card ${className || ''}`}>{children}</div>;
const Button: React.FC<ButtonProps> = (props) => <button {...props} />;
const CardContent: React.FC<CardProps> = ({children, className}) => <div className={`card-content ${className || ''}`}>{children}</div>;
const CardHeader: React.FC<CardProps> = ({children, className}) => <div className={`card-header ${className || ''}`}>{children}</div>;
const CardTitle: React.FC<CardProps> = ({children, className}) => <h2 className={`card-title ${className || ''}`}>{children}</h2>;


// ここにクイズアプリのコードを貼り付けます
const QuizApp: React.FC = () => {
  // クイズの質問データ
  const quizData = [
    {
      question: "Reactは何のためのライブラリですか？",
      options: [
        "サーバーサイドレンダリング",
        "データベース管理",
        "ユーザーインターフェース構築",
        "画像処理"
      ],
      correctAnswer: 2
    },
    // 他の質問を追加...
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

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
        <CardTitle className="text-2xl font-bold text-center">クイズアプリ</CardTitle>
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
                        : 'bg-gray-200 hover:bg-gray-300'
                      : ''
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

function App() {
  return (
    <div className="App">
      <QuizApp />
    </div>
  );
}

export default App;
