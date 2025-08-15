'use client';

import { useState } from 'react';

interface Question {
    label: string;
    question: string;
}

interface RouletteProps {
    questions: Question[];
}

const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#1abc9c', '#e67e22'];

const Roulette: React.FC<RouletteProps> = ({ questions }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [rotation, setRotation] = useState(0);

    const segmentCount = questions.length;
    const segmentAngle = 360 / segmentCount;

    const handleSpinClick = () => {
        if (isSpinning) return;
        setWinner(null);
        setIsSpinning(true);
        const randomSegment = Math.floor(Math.random() * segmentCount);
        const prize = questions[randomSegment];
        const fullSpins = 5 * 360;
        const targetAngle = randomSegment * segmentAngle;
        const randomOffset = Math.random() * segmentAngle * 0.8 - (segmentAngle * 0.4);
        const finalRotation = fullSpins + targetAngle + randomOffset;
        setRotation(prevRotation => prevRotation - (prevRotation % 360) + finalRotation);
        setTimeout(() => {
            setIsSpinning(false);
            setWinner(prize.question);
        }, 8000);
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-8">
            <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                <div
                    className="absolute -top-1 z-30 w-0 h-0 border-l-[16px] border-l-transparent border-t-[24px] border-t-red-600 border-r-[16px] border-r-transparent [filter:drop-shadow(0_1px_1.5px_rgba(0,0,0,0.6))]"
                >
                </div>
                <div
                    className="roulette-wheel absolute w-full h-full rounded-full border-8 border-white/50 shadow-lg overflow-hidden z-10"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        background: `conic-gradient(from 0deg, ${questions.map((q, i) => `${colors[i % colors.length]} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`).join(', ')})`
                    }}
                >
                    {questions.map((q, i) => (
                        <div
                            key={i}
                            className="absolute w-1/2 h-1/2 flex justify-center items-start origin-bottom-right"
                            style={{
                                transform: `rotate(${i * segmentAngle + segmentAngle / 2}deg) skewY(-${90 - segmentAngle}deg)`,
                                paddingTop: '35px'
                            }}
                        >
                            <div
                                className="text-white text-base font-bold text-center"
                                style={{
                                    transform: `skewY(${90 - segmentAngle}deg)`,
                                    width: '120px',
                                    WebkitTextStroke: '1px black',
                                    paintOrder: 'stroke fill',
                                }}
                            >
                                {q.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={handleSpinClick}
                disabled={isSpinning}
                className="px-10 py-4 bg-white/80 backdrop-blur-sm text-gray-800 text-2xl font-black rounded-lg shadow-lg hover:bg-white transition duration-300 disabled:bg-gray-400/50 disabled:cursor-not-allowed tracking-wider border border-white/20"
            >
                GIRAR
            </button>
            <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg w-full max-w-md text-center min-h-[80px] flex items-center justify-center border border-white/20">
                {winner ? (
                    <p className="text-lg text-gray-800 font-semibold">{winner}</p>
                ) : (
                    <p className="text-gray-500">{isSpinning ? 'Girando...' : 'Esperando el giro...'}</p>
                )}
            </div>
        </div>
    );
};

export default Roulette;