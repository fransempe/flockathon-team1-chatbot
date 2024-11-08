import React, { useState } from 'react'
import { Send, Trash2, Upload, Copy, ExternalLink } from 'lucide-react'
import accionaLogo from '../assets/acciona-mini-logo.svg'

type Candidate = {
  name: string;
  jobMatches: string[];
  hasCV: boolean;
}

type CandidateDatabase = {
  [key: string]: Candidate;
}

export default function HRAssistant() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [dniInput, setDniInput] = useState("")
  const [matchPercentage, setMatchPercentage] = useState<number | null>(null)
  const [messages, setMessages] = useState<Array<{id: number, text: string, isBot: boolean}>>([
    { id: 1, text: "Bienvenido al Asistente de RRHH. Por favor ingrese el DNI del candidato.", isBot: true }
  ])
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [resultLink, setResultLink] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Mock data - esto debería venir de una API
  const mockCandidates: CandidateDatabase = {
    "12345678": {
      name: "Juan Pérez",
      jobMatches: ["Desarrollador Frontend", "Desarrollador Full Stack", "UI/UX Designer"],
      hasCV: true
    },
    "87654321": {
      name: "María González", 
      jobMatches: ["Project Manager", "Scrum Master", "Product Owner"],
      hasCV: false
    },
    "98765432": {
      name: "Carlos Rodríguez",
      jobMatches: ["DevOps Engineer", "Cloud Architect", "System Administrator"],
      hasCV: true
    }
  }

  const handleDniSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const dni = dniInput.trim()
    if (dni) {
      if (mockCandidates[dni]) {
        setSelectedCandidate(dni)
        setMatchPercentage(null)
        setResultLink(null)
        setMessages([
          ...messages,
          { id: messages.length + 1, text: `DNI ingresado: ${dni}`, isBot: false },
          { id: messages.length + 2, text: `Candidato encontrado: ${mockCandidates[dni].name}`, isBot: true },
          { id: messages.length + 3, text: mockCandidates[dni].hasCV ? 
            "El candidato tiene un CV en nuestra base de datos." : 
            "El candidato no tiene un CV cargado. Por favor, suba el CV para continuar.", 
            isBot: true }
        ])
      } else {
        setMessages([
          ...messages,
          { id: messages.length + 1, text: `DNI ingresado: ${dni}`, isBot: false },
          { id: messages.length + 2, text: "Candidato no encontrado", isBot: true }
        ])
      }
      setDniInput("")
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCvFile(file)
      setMessages([
        ...messages,
        { id: messages.length + 1, text: `CV cargado: ${file.name}`, isBot: false },
        { id: messages.length + 2, text: "CV recibido correctamente. Puede continuar con la selección de búsqueda.", isBot: true }
      ])
    }
  }

  const handleJobSelect = (job: string) => {
    if (selectedCandidate && !mockCandidates[selectedCandidate].hasCV && !cvFile) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: "Por favor, suba el CV antes de continuar", isBot: true }
      ])
      return
    }
    
    // Simular un porcentaje de match aleatorio entre 60 y 95
    const randomMatch = Math.floor(Math.random() * (95 - 60 + 1)) + 60
    setMatchPercentage(randomMatch)
    // Generar un link único para los resultados
    const uniqueLink = `https://results.acciona.com/${selectedCandidate}-${job.replace(/\s+/g, '-')}-${randomMatch}`
    setResultLink(uniqueLink)
    setMessages([
      ...messages,
      { id: messages.length + 1, text: `Búsqueda seleccionada: ${job}`, isBot: false },
      { id: messages.length + 2, text: "Procesando postulación...", isBot: true },
      { id: messages.length + 3, text: `Match del CV con la búsqueda: ${randomMatch}%`, isBot: true }
    ])
  }

  const handleClearChat = () => {
    setMessages([{ id: 1, text: "Bienvenido al Asistente de RRHH. Por favor ingrese el DNI del candidato.", isBot: true }])
    setSelectedCandidate(null)
    setDniInput("")
    setMatchPercentage(null)
    setCvFile(null)
    setResultLink(null)
    setCopied(false)
  }

  const handleCopyLink = () => {
    if (resultLink) {
      navigator.clipboard.writeText(resultLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getMatchColor = (percentage: number) => {
    if (percentage <= 33) return 'bg-red-500'
    if (percentage <= 66) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-900 to-red-500">
      <header className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={accionaLogo} alt="Acciona Logo" className="h-8" />
          <h1 className="text-2xl font-light font-sans ">Tu aliado estratégico en tecnología</h1>
        </div>
        <button 
          onClick={handleClearChat}
          className="hover:bg-purple-700 p-2 rounded-full transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                message.isBot
                  ? 'bg-gradient-to-r from-purple-700 to-purple-800 text-white'
                  : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
              } font-sans`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {selectedCandidate && mockCandidates[selectedCandidate] && (
          <div className="flex flex-col items-center gap-2 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow">
            {!mockCandidates[selectedCandidate].hasCV && !cvFile && (
              <div className="w-full mb-4">
                <label className="flex flex-col items-center p-4 bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer hover:bg-purple-100">
                  <Upload className="w-8 h-8 text-purple-500 mb-2" />
                  <span className="text-sm text-purple-600 font-sans">Subir CV (PDF, DOC, DOCX)</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            )}
            
            <h3 className="text-lg font-semibold mb-2 font-sans text-purple-900">Búsquedas disponibles:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {mockCandidates[selectedCandidate].jobMatches.map((job: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleJobSelect(job)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors font-sans"
                >
                  {job}
                </button>
              ))}
            </div>
            {matchPercentage !== null && (
              <div className="w-full mt-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`${getMatchColor(matchPercentage)} h-4 rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${matchPercentage}%` }}
                  ></div>
                </div>
                <p className="text-center mt-2 font-semibold text-purple-600 font-sans">{matchPercentage}% de match</p>
                {resultLink && (
                  <div className="mt-4 flex flex-col items-center gap-2">
                    <p className="text-sm text-purple-600">Ver resultados detallados:</p>
                    <div className="flex items-center gap-2">
                      <a 
                        href={resultLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ver resultados
                      </a>
                      <button
                        onClick={handleCopyLink}
                        className="text-purple-600 hover:text-purple-800 flex items-center gap-1"
                        title="Copiar enlace"
                      >
                        <Copy className="w-4 h-4" />
                        {copied ? "¡Copiado!" : "Copiar enlace"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleDniSubmit} className="bg-white/90 backdrop-blur-sm border-t border-purple-200 p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={dniInput}
            onChange={(e) => setDniInput(e.target.value)}
            placeholder="Ingrese DNI del candidato..."
            className="flex-1 border border-purple-300 py-2 px-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-600 font-sans"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white rounded-r-lg py-2 px-4 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}