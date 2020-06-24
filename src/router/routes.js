export const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home'),
        redirect: '/blog',
        children: [
            {
                path: '/blog',
                component: () => import('../components/Blog/index'),
                redirect: '/blog/blogList',
                children: [
                    {
                        path: '/blog/addBlog',
                        component: () => import('../components/Blog/AddBlog'),
                    },
                    {
                        path: '/blog/blogList',
                        component: () => import('../components/Blog/BlogList'),
                    }
                ]
            }, {
                path: '/diary',
                component: () => import('../components/Diary/index'),
                redirect: '/diary/diaryList',
                children: [
                    {
                        path: '/diary/addDiary',
                        component: () => import('../components/Diary/AddDiary'),
                    },
                    {
                        path: '/diary/diaryList',
                        component: () => import('../components/Diary/DiaryList'),
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register')
    },
]
