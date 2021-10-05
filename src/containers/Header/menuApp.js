export const adminMenu = [
    { //Quản lý người dùng 
        name: 'menu.admin.manage-user',
            menus: [
                {
                    name: 'menu.admin.crud',
                    link:'/system/user-manage',
                },
                {
                    name: 'menu.admin.crud-redux',
                    link:'/system/user-redux',
                },
                {
                    name: 'menu.admin.manage-doctor',
                    link:'/system/user-doctor',
                    // subMenus: [
                    //     { name: 'demo 1', link: '#' },
                    //     { name: 'demo 2', link: '#' },  
                    // ]
                },
                {
                    name: 'menu.admin.manage-admin',
                    link:'/system/user-admin',
                }
            ] 
    },
    { //Quản lý phòng khám 
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic',
                link:'/system/manage-clinic',
            }
        ] 
    },
    { //Quản lý Chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty',
                link:'/system/manage-specialty',
            }
        ] 
    },
    { //Quản lý cẩm nang 
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook',
                link:'/system/manage-handbook',
            }
        ] 
    },
];