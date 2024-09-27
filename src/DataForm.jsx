import React from 'react'
import { IoMdClose } from 'react-icons/io'

export default function DataForm({ handleSubmit, addUser, setAddUser, errorMessage, user, isUpdatedNeed }) {
    return (
        <>
            <div className={`w-full h-full absolute ${addUser ? 'scale-100' : 'scale-0'} transition-all duration-300 ease-in-out top-0 bg-white rounded-md`}>
                <span onClick={() => setAddUser(false)} className='absolute top-2 cursor-pointer right-2 p-3 rounded-full hover:bg-slate-200 transition-all duration-300'><IoMdClose size={20} /></span>
                <div className="bg-grey-lighter mt-5 flex flex-col">
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <form onSubmit={(e) => { user ? handleSubmit(e, user?._id) : handleSubmit(e) }} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 className="mb-8 text-3xl text-center">{isUpdatedNeed ? 'Updated User' : 'Add User'}</h1>
                            {errorMessage && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                    <span className="block sm:inline">{errorMessage}</span>
                                </div>
                            )}
                            <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="name" placeholder="Enter Your Name" />
                            {user?.email ? <input type="email" className="block border border-grey-light w-full p-3 rounded mb-4" value={user?.email || ''} name="email" placeholder="Enter Your Email" disabled /> :
                                <input type="email" className="block border border-grey-light w-full p-3 rounded mb-4" name="email" placeholder="Enter Your Email" />
                            }
                            <input type="number" className="block border border-grey-light w-full p-3 rounded mb-4" name="age" min={1} placeholder="Enter Your age..." />
                            <button type="submit" className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1">{isUpdatedNeed ? 'Updated User' : 'Add User'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
