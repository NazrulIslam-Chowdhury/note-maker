import React from 'react'
import { SideBar } from '../components';
import { Outlet } from 'react-router-dom';
import { useTitle } from '../utils';

const Main = () => {
    useTitle('Home')
    return (
        <div className='flex gap-4'>
            <SideBar />
            <div className=''>
                <Outlet />
            </div>
        </div>
    )
}

export default Main;