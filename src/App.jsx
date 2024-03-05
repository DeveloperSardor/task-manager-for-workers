import { useEffect } from 'react';
import IndexRouter from './routes/index'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';


function App() {
  const navigate = useNavigate();

  const workerData = JSON.parse(localStorage.getItem('workerData'));

 useEffect(()=>{
  if(!workerData){
    navigate('/login')
  }
 }, [workerData])

  return (
    <div className="App">
      <IndexRouter/>
      <Toaster/>
    </div>
  )
}
export default App
