import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import UserRow from './UserRow';

const AllUser = () => {
    const { data: user, isLoading, refetch } = useQuery('user', () =>
    fetch('https://damp-castle-29212.herokuapp.com/user', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
    })
        .then(res => res.json())
)

if(isLoading){
    return <Loading></Loading>
}

    return (
        <div>
           <h2 className='text-2xl text-center'>All user</h2>
           <div class="overflow-x-auto">
  <table class="table w-full">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
        {
            user.map(users=> <UserRow key={users._id} users={users} refetch={refetch}></UserRow>)
        }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllUser;