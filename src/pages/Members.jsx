import React, { useEffect, useState } from 'react';
import MemberCard from '../common/component/MemberCard';
import instance from '../services/AxiosOder';
import { Toast } from '../common/funtion';
import { Box } from '@mui/material';

export default function Members() {
  const [allUser, setAllUser] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('wemixt-id');
    if (id) {
      setUserId(id);
      memberGet(id); 
    }
  }, []);

  const memberGet = async (id) => {
    try {
      const response = await instance.get(`/members/${id}`);
      setAllUser(response.data);
      // console.log(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const deleteUser = (id) => {
    instance.delete(`/members/${id}`)
      .then((res) => {
        memberGet(userId);
        Toast.fire({
          icon: "success",
          title: "Delete successfully"
        });
      })
      .catch((err) => {
        console.error('Error deleting user:', err);
        Toast.fire({
          icon: "error",
          title: err.response?.data?.message || "Delete failed"
        });
      });
  };

  return (
    <Box sx={{ display: "flex", flexWrap: 'wrap' }}>
      {allUser.map((user, index) => (
        <Box key={index} sx={{ margin: 1 }}>
          <MemberCard user={user} onDelete={() => deleteUser(user.id)} />
        </Box>
      ))}
    </Box>
  );
}
