import { useState } from 'react'
import accionaLogo from '../assets/acciona-mini-logo.svg'
import { questions } from '../data/questions'
import { useSearchParams } from 'react-router-dom'

const Questions = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({})
  const [searchParams] = useSearchParams()
  const dni = searchParams.get('dni') || ''
  
  const handleAnswerSelect = (questionId: number, answerId: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }))
  }

  const handleSubmit = async () => {
    // Verificar que todas las preguntas estén respondidas
    const totalQuestions = questions.preguntas.length
    const answeredQuestions = Object.keys(selectedAnswers).length

    if (!dni) {
      alert('No se encontró el DNI del candidato')
      return
    }

    if (answeredQuestions < totalQuestions) {
      alert('Por favor responda todas las preguntas antes de enviar')
      return
    }

    try {
      const response = await fetch('/api/submit-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dni,
          answers: selectedAnswers
        })
      })

      if (response.ok) {
        alert('Respuestas enviadas correctamente')
      } else {
        throw new Error('Error al enviar las respuestas')
      }
    } catch (error) {
      alert('Ocurrió un error al enviar las respuestas')
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex flex-col">
      <header className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src={accionaLogo} alt="Acciona Logo" className="h-8 hover:opacity-90 transition-opacity" />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-8 border border-purple-100">
          <h1 className="text-3xl font-bold text-purple-800 mb-8 text-center">Cuestionario Técnico</h1>
          
          <div className="mb-8 p-4 bg-purple-50 rounded-lg">
            <p className="text-gray-700 font-bold flex items-center">
              <span className="mr-2">📋</span>
              DNI del candidato: <span className="ml-2 text-purple-700">{dni}</span>
            </p>
          </div>

          {questions.preguntas.map((question: { id: number; pregunta: string; respuestas: { id: number; texto: string; }[] }) => (
            <div key={question.id} className="mb-10 bg-white p-6 rounded-lg border border-purple-100 hover:border-purple-200 transition-colors">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-start">
                <span className="text-purple-600 mr-3">{question.id}.</span>
                {question.pregunta}
              </h2>
              <div className="space-y-4 ml-8">
                {question.respuestas.map((respuesta: { id: number; texto: string }) => (
                  <label 
                    key={respuesta.id} 
                    className={`flex items-start space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-200
                      ${selectedAnswers[question.id] === respuesta.id 
                        ? 'bg-purple-100 border-purple-200' 
                        : 'hover:bg-purple-50 border-transparent'} 
                      border-2`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={respuesta.id}
                      checked={selectedAnswers[question.id] === respuesta.id}
                      onChange={() => handleAnswerSelect(question.id, respuesta.id)}
                      className="mt-1 text-purple-600 focus:ring-purple-500 h-4 w-4"
                    />
                    <span className="text-gray-700 leading-relaxed">{respuesta.texto}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-10 flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              Enviar respuestas
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Questions