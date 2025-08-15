'use client';

import { useState } from 'react';
import Roulette from '@/components/Roulette';
import { Trash2, Settings, X } from 'lucide-react';

// La estructura de datos no cambia
interface Question {
    label: string;
    question: string;
}

const preguntasCampa: Question[] = [
    { label: 'Vergüenza', question: '¿Qué fue lo más vergonzoso que te pasó en el campamento?' },
    { label: 'Nominación', question: '¿A quién nominarías para dormir afuera una noche y por qué?' },
    { label: 'Competitivo', question: '¿Quién crees que es el más competitivo del grupo?' },
    { label: 'Momento Fav', question: '¿Cuál fue tu momento favorito del campamento hasta ahora?' },
    { label: 'Regla', question: 'Si pudieras cambiar una regla del campamento, ¿cuál sería?' },
    { label: 'Talento Oculto', question: '¿Cuál es el talento oculto de un compañero de tu equipo?' },
    { label: 'Líder x 1 Día', question: '¿Qué harías si por un día fueras el líder del campamento?' },
    { label: 'Anécdota', question: '¿Cuál es la anécdota más graciosa que tengas de tu equipo?' },
    { label: 'TikTok', question: 'Si tuvieras que hacer un TikTok con un compañero, ¿quién sería y qué harían?' },
    { label: 'Canción', question: '¿Qué canción describe mejor la energía de tu equipo?' },
];

const desafiosCampa: Question[] = [
    { label: 'Confesiones', question: 'CONFESIONES EN VIVO' },
    { label: 'Streamer', question: 'STREAMER VS STREAMER' },
    { label: 'Momento TOP', question: 'MOMENTO EMOCIONAL' },
    { label: 'Clip Viral', question: 'CLIP VIRAL' },
    { label: 'Unboxing', question: 'UNBOXING SORPRESA' },
    { label: 'Fama', question: 'MINUTO DE FAMA' },
    { label: 'Storytime', question: 'STORYTIME' },
    { label: 'El Chat Decide', question: 'EL CHAT DECIDE' },
    { label: 'Reacción', question: 'REACCIÓN EN VIVO' },
    { label: 'Random', question: 'PREGUNTAS RANDOM' },
];

export default function Home() {
    const [questions, setQuestions] = useState<Question[]>(preguntasCampa);
    const [newQuestion, setNewQuestion] = useState('');
    const [isPanelVisible, setIsPanelVisible] = useState(false);

    const handleAddQuestion = () => {
        const questionText = newQuestion.trim();
        if (questionText !== '') {
            const label = questionText.split(' ').slice(0, 3).join(' ');
            setQuestions([...questions, { label: label + '...', question: questionText }]);
            setNewQuestion('');
        }
    };

    const handleDeleteQuestion = (indexToDelete: number) => {
        setQuestions(questions.filter((_, index) => index !== indexToDelete));
    };

    return (
        // --- CAMBIOS DE ESTILO PRINCIPALES ---
        <main className="relative flex flex-col min-h-screen items-center justify-center p-4 md:p-10 text-white overflow-hidden animated-bg">

            {/* Botón de ajustes con estilo actualizado */}
            <button
                onClick={() => setIsPanelVisible(!isPanelVisible)}
                className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full shadow-lg border border-white/20 hover:bg-white transition-all z-20"
                aria-label="Personalizar preguntas"
            >
                {isPanelVisible ? <X size={24} /> : <Settings size={24} />}
            </button>

            <div className="w-full flex items-center justify-center">
                {/* Contenedor de la ruleta más grande */}
                <div className="w-full max-w-2xl flex justify-center">
                    {questions.length > 0 ? (
                        <Roulette questions={questions} />
                    ) : (
                        // Placeholder con estilo actualizado
                        <div className="w-[450px] h-[450px] rounded-full bg-black/20 border-2 border-dashed border-white/50 flex items-center justify-center text-center p-4">
                            <p className="text-white/80">Añade preguntas en el panel de ajustes para empezar</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Panel deslizable con estilo actualizado */}
            <div
                className={`absolute top-0 right-0 h-full w-full max-w-md bg-white/90 backdrop-blur-md text-gray-800 shadow-2xl p-6 transform transition-transform duration-300 ease-in-out z-10
                  ${isPanelVisible ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <h2 className="text-2xl font-bold mb-4 mt-10">Ajustes de la Ruleta</h2>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Ruletas Predeterminadas</h3>
                    <div className="flex gap-2">
                        <button onClick={() => setQuestions(preguntasCampa)} className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors">Preguntas</button>
                        <button onClick={() => setQuestions(desafiosCampa)} className="flex-1 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors">Desafíos</button>
                    </div>
                </div>

                <hr className="my-4"/>

                <h3 className="text-lg font-semibold mb-2">Añadir Pregunta Nueva</h3>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Escribe algo nuevo..."
                        className="flex-grow p-2 rounded bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddQuestion()}
                    />
                    <button onClick={handleAddQuestion} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Añadir</button>
                </div>

                <div className="h-[calc(100%-230px)] overflow-y-auto pr-2">
                    {questions.map((q, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 border p-2 rounded mb-2">
                            <p className="flex-grow text-sm text-gray-700">{q.question}</p>
                            <button onClick={() => handleDeleteQuestion(index)} className="p-1 text-red-500 hover:text-red-400"><Trash2 size={18} /></button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}