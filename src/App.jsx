import { useState, useEffect } from 'react'


const App = () => {

  const localSeconds = localStorage.getItem('seconds')
  const localMinutes = localStorage.getItem('minutes')
  
  const [minutes, setMinutes] = useState(localMinutes || 10)
  const [seconds, setSeconds] = useState(localSeconds || 0)

  useEffect(()=>{
    const interval = setInterval(()=>{
      if (seconds == 0){
        const newMinutes = minutes - 1

        if (newMinutes < 0){
          setMinutes(10)
          setSeconds(0)
          localStorage.setItem('seconds', 0)
          localStorage.setItem('minutes', 10)
          return
        }

        setMinutes(minutes - 1)
        setSeconds(59)
        localStorage.setItem('minutes', minutes - 1)
        localStorage.setItem('seconds', 59)
        return
      }
      setSeconds(seconds - 1)
      localStorage.setItem('seconds', seconds - 1)
    }, 1000)

    return () => clearInterval(interval)

  }, [minutes, seconds])
  
  return(<>
  {minutes.toString().padStart(2, '0')}:
  {seconds.toString().padStart(2, '0')}
  </>)
};

export default App;