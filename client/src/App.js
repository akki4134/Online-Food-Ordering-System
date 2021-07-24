import { useState, useEffect, useMemo } from 'react'

function App() {

  const [data, setData] = useState([])
  const socket = useMemo(() =>
    new WebSocket('ws://localhost:4000')
    , [])

  // socket.addEventListener('open', function (event) {
  //   socket.send('Hello Server!');
  // });

  // // Listen for messages
  // socket.addEventListener('message', function (event) {
  //   console.log('Message from server ', event.data);
  // });

  useEffect(() => {

    const Fetch = () => {
      socket.addEventListener('message', function (event) {
        var value = JSON.parse(event.data);
        setData(value)
      })
    }
    

    Fetch()

  }, [socket])




  const getusershandler = () => {

    // Listen for messages
    socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
    })

  }


  return (
    <div>
      Test
      <button onClick={getusershandler}>get Users</button>
      {console.log(data)}
    </div>
  )
}

export default App

