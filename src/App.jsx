import React, { useState, useEffect } from 'react';
import DataForm from './DataForm';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addUser, setAddUser] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [updatedUserdata, setUpdatedUserData] = useState('');

  const getUserFromApi = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:8000/api/users');
    const results = await res.json();
    setData(results);
    setLoading(false);
  };

  useEffect(() => {
    getUserFromApi();
  }, []);

  const handleDelete = async (userid) => {
    const res = await fetch(`http://localhost:8000/api/users/${userid}`, {
      method: 'DELETE',
    })
    if (res.status === 400) {
      const message = await res.json()
      alert(message.message)
    } else if (res.status === 200) {
      getUserFromApi()
    } else {
      alert('An error occurred')
    }
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const { age, email, name } = e.target.elements

    const res = await fetch('http://localhost:8000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        name: name.value,
        age: age.value,
      }),
    });
    if (res.status === 400) {
      const result = await res.json();
      setErrorMessage(result?.message)
    }
    else if (res.status === 200) {
      setErrorMessage('')
      getUserFromApi()
      setAddUser(false)
      email.value = ''
      name.value = ''
      age.value = ''
    } else {
      setErrorMessage('An error occurred')
    }

  }
  const handleUptdatedSubmit = async (e, userId) => {
    e.preventDefault()
    const { age, email, name } = e.target.elements
    console.log(email.value);


    const res = await fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        name: name.value,
        age: age.value,
      }),
    });
    if (res.status === 400) {
      const result = await res.json();
      setErrorMessage(result.message)
    }
    else if (res.status === 200) {
      setErrorMessage('')
      getUserFromApi()
      setUpdatedUser(false)
      email.value = ''
      name.value = ''
      age.value = ''
    } else {
      setErrorMessage('An error occurred')
    }

  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className='h-[30rem] w-[40rem] relative bg-white rounded-md'>
        {loading ? (
          <div className="h-full w-full mx-auto flex items-center justify-center">
            <h1 className='text-center font-bold text-4xl'>Loading...</h1>
          </div>
        ) : (
          <>
            {data.length > 0 ? (
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
                            <button className="font-medium text-gray-600 border py-1 px-2 rounded-sm hover:text-blue-800" onClick={() => { setUpdatedUser(true), setUpdatedUserData(user) }}>Edit</button>
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
            ) : (
              <div className='flex justify-center items-center h-full w-full flex-col'>
                <h3 className='text-3xl font-bold text-center pb-5'>No User.</h3>
                <button onClick={() => setAddUser(true)} className='py-4 px-6 rounded-md border hover:bg-green-600 transition-all duration-500 ease-in-out hover:text-white'>Add User</button>
              </div>
            )}
          </>
        )}
        <DataForm handleSubmit={handleOnSubmit} addUser={addUser} setAddUser={setAddUser} errorMessage={errorMessage} />
        <DataForm handleSubmit={handleUptdatedSubmit} addUser={updatedUser} setAddUser={setUpdatedUser} errorMessage={errorMessage} user={updatedUserdata} isUpdatedNeed={true} />
      </div>
    </div>
  );
}
