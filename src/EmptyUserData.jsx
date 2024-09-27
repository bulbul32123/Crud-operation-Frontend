import React from 'react'

export default function EmptyUserData({ setAddUser }) {
    return (
        <>
            <div className='flex justify-center items-center h-full w-full flex-col'>
                <h3 className='text-3xl font-bold text-center pb-5'>No User.</h3>
                <button onClick={() => setAddUser(true)} className='py-4 px-6 rounded-md border hover:bg-green-600 transition-all duration-500 ease-in-out hover:text-white'>Add User</button>
            </div>
        </>
    )
}
