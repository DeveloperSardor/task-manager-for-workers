import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home/Home';
import Chats from '../pages/Chats/Chats';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
const index = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={< HomePage />} />
                <Route path='/login' element={< Login />} />
                <Route path='/register' element={< Register />} />
                <Route path='/chat/:id' element={< Chats />} />
            </Routes>
        </>
    );
};

export default index;