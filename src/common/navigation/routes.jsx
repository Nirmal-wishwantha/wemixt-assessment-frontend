
import PeopleIcon from '@mui/icons-material/People';
import Members from '../../pages/Members';
import MemberForm from '../../pages/MemberForm';
import Document from '../../pages/Document';
import AssignmentIcon from '@mui/icons-material/Assignment';


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

    {
        text: "Document",
        icon: <AssignmentIcon/>,
        path: '/Document',
        element:<Document/>
    },


]

export default routes;