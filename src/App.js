import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import './App.css'

import { setUsers } from './store';

const App = () => {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const [inputText, setInputText] = useState('')

  const filteredUsers = useSelector((state) => {
    const input = inputText.toUpperCase()

    if (!input) {
      return []
    }

    const filtered = state.users.filter((user) => {
      const username = user.name.toUpperCase()

      if (input === username) {
        return null
      }
      
      return username.substr(0, inputText.length).includes(input)
    })

    return filtered
  })

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      
      dispatch(setUsers(response.data))
    }

    if (users.length <= 0) {
      fetchUsers()
    }
  }, [users])
  
  return (
    <div className="App">
      <div className='container'>
        <div className='wrapper'>
          <input 
            type="text" 
            onChange={(event) => setInputText(event.target.value)} 
            value={inputText} 
            placeholder="Name"
          />
          <div className='content'>
            {filteredUsers.map((item, i) => (
              <button key={i} onClick={() => setInputText(item.name)}>
                <span className="bold">
                  { item.name.substr(0, inputText.length) }
                </span>
                { item.name.substr(inputText.length) }
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
