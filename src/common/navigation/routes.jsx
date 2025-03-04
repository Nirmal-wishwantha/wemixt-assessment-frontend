
import PeopleIcon from '@mui/icons-material/People';
import Members from '../../pages/Members';
import MemberForm from '../../pages/MemberForm';


const routes = [

    {
        text: "Members",
        icon: <PeopleIcon/>,
        path: '/Members',
        element:<Members/>
    },

    {
        text: "Members Form",
        icon: <PeopleIcon/>,
        path: '/MembersForm',
        element:<MemberForm/>
    },


]

export default routes;