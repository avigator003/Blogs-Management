// assets
import { ChromeOutlined, QuestionOutlined,FileExclamationOutlined ,EditOutlined,UnorderedListOutlined} from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined,
    FileExclamationOutlined,
    EditOutlined,
    UnorderedListOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
    id: 'support',
    title: 'Blog Management',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Blogs Editor',
            type: 'item',
            url: '/sample-page',
            icon: icons.EditOutlined
        },
        {
            id: 'blogs-list',
            title: 'Blogs List',
            type: 'item',
            url: 'https://codedthemes.gitbook.io/mantis-react/',
            icon: icons.UnorderedListOutlined,
            external: true,
            target: true
        },
        {
            id: 'documentation',
            title: 'Drafts',
            type: 'item',
            url: 'https://codedthemes.gitbook.io/mantis-react/',
            icon: icons.FileExclamationOutlined,
            external: true,
            target: true
        }
    ]
};

export default support;
