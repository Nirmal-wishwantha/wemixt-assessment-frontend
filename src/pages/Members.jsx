import React, { useEffect, useState } from 'react';
import MemberCard from '../common/component/MemberCard';
import instance from '../services/AxiosOder';
import { Toast } from '../common/funtion';
import { Typography, Box } from '@mui/material';

export default function Members() {
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    memberGet();
  }, [])

  const memberGet = async () => {
    try {
      const response = await instance.get('/members/all');
      // console.log(response.data);
      
      setAllUser(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  }

  const deleteUser = (id) => {
    console.log('Deleting user with ID:', id);
    instance.delete(`/members/${id}`)
      .then((res) => {

        window.location.reload();
        console.log('Delete successful:', res);
        Toast.fire({
          icon: "success",
          title: "Delete successfully"
        });
        
      })
      .catch((err) => {
        console.error('Error deleting user:', err);
        if (err.response) {
          Toast.fire({
            icon: "error",
            title: `Delete failed: ${err.response.data.message}`
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Delete failed"
          });
        }
      });
  };

  return (
    <Box sx={{ display: "flex" ,flexWrap:'wrap'}}>
      {allUser.map((user, index) => (
        <Box key={index} sx={{ margin: 2 }}>
          <MemberCard user={user} onDelete={() => deleteUser(user.id)} />
        </Box>
      ))}
    </Box>
  )
}
