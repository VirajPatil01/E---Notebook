import React,{useEffect} from 'react';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Home = (props) => {


  const navigate = useNavigate();




  useEffect(() => {

    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [])

  return (



    <div>


      <AddNote showAlert={props.showAlert} />
    </div>
  )
}

export default Home
