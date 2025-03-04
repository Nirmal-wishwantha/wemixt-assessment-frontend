import { Typography, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MemberCard from '../common/component/MemberCard'
import reactLOGO from '../assets/react.svg'
import instance from '../services/AxiosOder';

export default function Members() {



    const [allUser, setAllUser] = useState([]);

    useEffect(() => {
        memberGet();
    }, [])


    const memberGet = () => {
        instance.get('/members/all')
            .then((res) => {
                console.log(res);
                setAllUser(res.data);

            })
            .catch((err) => {
                console.log(err);

            })
    }

    return (
        <Box>

            {allUser.map((user,index)=>(
                <Box key={index}>
                    <MemberCard user={user} />
                </Box>
            ))
                
            }

        </Box>

    )
}
