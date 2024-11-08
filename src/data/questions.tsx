export const questions = {
    "preguntas": [
      {
        "id": 1,
        "pregunta": "¿Qué es React y cuáles son sus características principales?",
        "respuestas": [
          {
            "id": 1,
            "texto": "Una librería para crear interfaces de usuario, basada en componentes y con un flujo de datos unidireccional."
          },
          {
            "id": 2,
            "texto": "Un framework completo para el desarrollo de aplicaciones web, que incluye herramientas de backend."
          },
          {
            "id": 3,
            "texto": "Una librería de CSS para maquetar páginas web."
          },
          {
            "id": 4,
            "texto": "Una tecnología para bases de datos en tiempo real."
          }
        ]
      },
      {
        "id": 2,
        "pregunta": "¿Cuál es la diferencia entre `componentDidMount` y `useEffect` en React?",
        "respuestas": [
          {
            "id": 1,
            "texto": "`componentDidMount` es un método de ciclo de vida de clases, mientras que `useEffect` es un hook de función."
          },
          {
            "id": 2,
            "texto": "`componentDidMount` solo se ejecuta en el primer render, mientras que `useEffect` se ejecuta en cada render."
          },
          {
            "id": 3,
            "texto": "`useEffect` no se puede utilizar con componentes de clase, mientras que `componentDidMount` se puede usar solo en componentes funcionales."
          },
          {
            "id": 4,
            "texto": "No hay diferencia, son exactamente lo mismo."
          }
        ]
      },
      {
        "id": 3,
        "pregunta": "¿Qué es el Virtual DOM y por qué React lo utiliza?",
        "respuestas": [
          {
            "id": 1,
            "texto": "Es una representación en memoria de la interfaz de usuario. React lo utiliza para mejorar el rendimiento al actualizar solo las partes del DOM que han cambiado."
          },
          {
            "id": 2,
            "texto": "Es una forma de manipular el DOM de manera directa y más eficiente."
          },
          {
            "id": 3,
            "texto": "Es una librería de animaciones para crear transiciones en la interfaz."
          },
          {
            "id": 4,
            "texto": "Es una versión optimizada de Redux para manejar el estado global de la aplicación."
          }
        ]
      },
      {
        "id": 4,
        "pregunta": "¿Qué es un 'hook' en React y cuáles son los más comunes?",
        "respuestas": [
          {
            "id": 1,
            "texto": "Son funciones especiales que permiten a los componentes funcionales gestionar el estado y otros aspectos del ciclo de vida sin usar clases."
          },
          {
            "id": 2,
            "texto": "Son componentes especiales que permiten la integración de React con otras tecnologías como Angular o Vue."
          },
          {
            "id": 3,
            "texto": "Son funciones para optimizar el rendimiento de la UI mediante el uso de Web Workers."
          },
          {
            "id": 4,
            "texto": "Son herramientas para realizar peticiones HTTP en aplicaciones React."
          }
        ]
      },
      {
        "id": 5,
        "pregunta": "¿Cómo manejas el estado en React cuando tienes una aplicación grande?",
        "respuestas": [
          {
            "id": 1,
            "texto": "Utilizando `useState` para estados locales y herramientas como Redux o Context API para manejar el estado global."
          },
          {
            "id": 2,
            "texto": "Usando solo `useState` en cada componente, sin necesidad de otras herramientas."
          },
          {
            "id": 3,
            "texto": "Centralizando todo el estado en el componente raíz para evitar dependencias."
          },
          {
            "id": 4,
            "texto": "No es necesario manejar el estado de manera global, ya que React gestiona automáticamente el estado de toda la aplicación."
          }
        ]
      }
    ]
  }