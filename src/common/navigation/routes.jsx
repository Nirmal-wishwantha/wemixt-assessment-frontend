
import Members from '../../pages/Members';
import MemberForm from '../../pages/MemberForm';
import Document from '../../pages/Document';
import EditProfile from '../../pages/EditProfile';

import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';




const routes = [

    {
        text: "Members",
        icon: <PeopleIcon/>,
        path: '/Members',
        element:<Members/>
    },

    {
        text: "Members Form",
        icon: <AssignmentIcon/>,
        path: '/MembersForm',
        element:<MemberForm/>
    },

    {
        text: "Document",
        icon: <AssignmentIcon/>,
        path: '/Document',
        element:<Document/>
    },

    {
        text: "Profile Setting",
        icon: <SettingsIcon/>,
        path: '/ProfileSetting',
        element:<EditProfile/>
    },

   




]

export default routes;