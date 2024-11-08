import React, { useState } from 'react'
import { Send, Paperclip, Trash2 } from 'lucide-react'

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, text: "¡Hola! ¿En qué puedo ayudarte?", isBot: true },
    { id: 2, text: "Hola, tengo una pregunta.", isBot: false },
  ])
  const [input, setInput] = useState("")

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: input, isBot: false }])
      setInput("")
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Verificar el tipo de archivo
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.oasis.opendocument.text', // OpenDocument Text
        'application/rtf', // Rich Text Format
        'text/plain', // .txt
        'application/xml', // XML
        'text/xml', // XML alternativo
        'image/jpeg',
        'image/png',
        'image/gif'
      ]
      
      // Verificar el tamaño (5MB = 5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024

      if (!allowedTypes.includes(file.type)) {
        setMessages([...messages, {
          id: messages.length + 1,
          text: "Error: Solo se permiten archivos PDF, documentos Word, OpenDocument, RTF, TXT, XML e imágenes.",
          isBot: false
        }])
        return
      }

      if (file.size > maxSize) {
        setMessages([...messages, {
          id: messages.length + 1,
          text: "Error: El archivo no debe superar los 5MB.",
          isBot: false
        }])
        return
      }

      try {
        const formData = new FormData()
        formData.append('file', file)

        // Aquí iría la llamada al backend para subir el archivo
        // const response = await fetch('URL_DEL_BACKEND/upload', {
        //   method: 'POST',
        //   body: formData
        // })
        
        // if (!response.ok) throw new Error('Error al subir el archivo')

        setMessages([...messages, { 
          id: messages.length + 1, 
          text: `CV-Adjunto: ${file.name} (Subido exitosamente)`, 
          isBot: false 
        }])
      } catch (error) {
        setMessages([...messages, {
          id: messages.length + 1,
          text: `Error al subir el archivo: ${file.name}`,
          isBot: false
        }])
        console.error('Error uploading file:', error)
      }
    }
  }

  const handleClearChat = () => {
    setMessages([])
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold"></h1>
        <button 
          onClick={handleClearChat}
          className="hover:bg-blue-700 p-2 rounded-full transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                message.isBot
                  ? 'bg-white text-gray-800'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <form onSubmit={handleSend} className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center">
          <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-l-lg">
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Paperclip className="w-5 h-5 text-gray-500" />
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-r-lg py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}