import Members from '../../pages/Members';
import PeopleIcon from '@mui/icons-material/People';


const routes = [

    {
        text: "Members",
        icon: <PeopleIcon/>,
        path: '/members',
        element:<Members/>
    },
]

export default routes;