import React, { useState, useEffect } from 'react' //Permite criar um estado (hooks)
import './styles.css' //Puxando o css
import { Card, CardProps} from '../../components/Card' //Puxando a propriedade Card

export function Home() {

  const [studentName, setStudentName] = useState('')
  //Primeiro o estado onde vai ser armazenado, e depois a função onde ele vai atualizar o estado.
  const [students, setStudents] = useState<CardProps[]>([])
  const [user, setUser] = useState<User>({} as User)
  const url = 'https://api.github.com/users/abraao0liveira'

  type ProfileResponse ={
    name: string
    avatar_url: string
  }

  type User ={
    name: string
    avatar: string
  }

  function handleAddStudent(){
    const newStudent ={
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
    setStudents(prevState => [...prevState, newStudent])
    // Mantendo o estado anterior e add o novo
  }
 
  useEffect(() => { //Se precisar tratar de coisa assincronas no useEffect, crie e chame uma function dentro dele
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.login,
        avatar: data.avatar_url
      })
    })
    .catch(error => console.error(error))
  }, []) //Toda vez que o que estiver [] mudar, o useEffect vai ser chamado

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>

        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="avatar_url" />
        </div>
        </header>

      <input 
        type="text" 
        placeholder="Digite o nome..."
        onChange={e => setStudentName(e.target.value)} //Pegando o conteudo do input, e colocando na function setStudentName
      />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map(student => <Card key={student.time} name={student.name} time={student.time} />) //Altualizando a lista com nome e tempo de entrada
      }

    </div>
  )
}
