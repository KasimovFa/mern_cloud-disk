import React, { useRef, useState } from 'react';
import './navbar.scss';
import logo from '../../assets/img/navbar-logo.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { userLogout } from '../../store/reducers/UserSlice';
import avatardef from '../../assets/img/avatar.jpg';
import { API_URL } from '../../config';
import { deleteAvatar, uploadAvatar } from '../../api/UserApi';

const Navbar = () => {
    const navigate = useNavigate();
    const {isAuth, currentUsers} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const ulRef = useRef<HTMLUListElement | null>(null);
    const [visibleUl, setVisibleUl] = useState(false);
    const avatar = currentUsers?.avatar ?  `${API_URL + currentUsers.avatar}` : avatardef

    const changeVisible = () => {
        if (ulRef.current) {
            if (!visibleUl) {
            ulRef.current.style.display = 'block';
            setVisibleUl(true)
          } else {
            setVisibleUl(false) 
            ulRef.current.style.display = 'none';
        }
       }
    }

    function changeHandler(e:any) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }


    return (
        <div className='navbar'>
            <div className='navbar_wrapper'>
                <div className='navbar_wrapper_logo'>
                    <img src={logo} alt = "#" />
                    <h1 className='navbar_wrapper_logo-title'>
                      MERN CLOUD
                    </h1>
                </div>
                <div className='navbar_wrapper_auth'>
                    {
                        isAuth ?
                          <>
                          <div className='navbar_wrapper-avatar-auth'>
                            <p className='navbar_wrapper_auth-exit' onClick={() => dispatch(userLogout()) }>Выход</p>
                            <div className='navbar_wrapper_avatar' onClick={() => changeVisible()}>
                                <img src={avatar} alt='#' />
                            </div>
                            <ul ref={ulRef} className='navbar_list'>
                               <li className='navbar_list-text' onClick={() => dispatch(deleteAvatar())}>Удалить аватар</li>
                               <label htmlFor='navbar_download-input' className='navbar_list-text'>Загрузить аватар</label>
                               <input 
                                  style={{display:"none"}}
                                  accept="image/*" 
                                  id='navbar_download-input'
                                  onChange={e => changeHandler(e)} 
                                  type="file" 
                                  multiple = {true}
                                />
                            </ul>
                          </div>
                          </>
                          :
                          <>
                           <p className='navbar_wrapper_auth-text' onClick={() => navigate('/login')}> Вход</p>
                           <p className='navbar_wrapper_auth-text'onClick={() => navigate('/registration')}>Регистрация</p>
                          </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;