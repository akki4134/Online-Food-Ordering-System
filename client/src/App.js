import { useEffect, useState } from 'react'

function App() {

  const [data, setData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      fetch('http://localhost:4000/auth/users')
        .then(response => response.json())
        .then(res => setData(res))
    }
    fetchData()

  }, [])
  return (
    <div>
      {console.log(data)}
      
    </div>
  )
}

export default App

