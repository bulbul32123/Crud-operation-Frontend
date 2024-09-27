import React from 'react'

export default function ShowUsersData({ data, handleDelete, setAddUser }) {
    return (
        <>
            <div className='h-full w-full pt-10'>
                <h3 className='text-3xl font-bold text-center pb-5'>User Data</h3>
                <div className="w-full h-80 relative overflow-x-hidden p-4">
                    <table className="min-w-full relative shadow-md rounded-xl border">
                        <thead className='sticky -top-5 bg-white'>
                            <tr className="text-gray-700">
                                <th className="py-3 px-4 text-left border">Name</th>
                                <th className="py-3 px-4 text-left border">Email</th>
                                <th className="py-3 px-4 text-left border">Age</th>
                                <th className="py-3 px-4 text-left border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user) => (
                                <tr key={user._id}>
                                    <td className="py-3 px-4 border">{user.name}</td>
                                    <td className="py-3 px-4 border">{user.email}</td>
                                    <td className="py-3 px-4 border">{user.age}</td>
                                    <td className="py-3 px-4 border">
                                        <button className="font-medium text-gray-600 border py-1 px-2 rounded-sm hover:text-blue-800">Edit</button>
                                        <button onClick={() => handleDelete(user._id)} className="font-medium text-red-600 border py-1 px-2 rounded-sm hover:text-blue-800">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-full flex justify-end items-end pr-5">
                    <button onClick={() => setAddUser(true)} className='py-3 px-6 rounded-md border hover:bg-green-600 transition-all duration-500 ease-in-out hover:text-white'>Add User</button>
                </div>
            </div>
        </>
    )
}
