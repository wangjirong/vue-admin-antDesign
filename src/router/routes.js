export const routes = [{
        path: '/',
        name: 'Home',
        component: () => import('../views/Home'),
        redirect: '/blog',
        children: [
            {
            path: '/blog',
            component: () => import('../components/Blog/index'),
            redirect: '/blog/blogList',
            children: [{
                    path: '/blog/addBlog',
                    component: () => import('../components/Blog/AddBlog'),
                },
                {
                    path: '/blog/blogList',
                    component: () => import('../components/Blog/BlogList'),
                }
            ]
        },
         {
            path: '/diary',
            component: () => import('../components/Diary/index'),
            redirect: '/diary/diaryList',
            children: [{
                    path: '/diary/addDiary',
                    component: () => import('../components/Diary/AddDiary'),
                },
                {
                    path: '/diary/diaryList',
                    component: () => import('../components/Diary/DiaryList'),
                }
            ]
        },
        {
            path:'/wallpaper',
            component:()=>import('../components/Wallpaper/index'),
            redirect: '/wallpaper/wallpaperList',
            children: [{
                path:'/wallpaper/wallpaperList',
                component:()=>import('../components/Wallpaper/WallpaperList')
            },
        {
            path:'/wallpaper/uploadWallpaper',
            component:()=>import('../components/Wallpaper/UploadWallpaper')
        }]
        },
        {
            path:'/music',
            component:()=>import('../components/Music/index'),
            redirect: '/music/musicList',
            children: [{
                path:'/music/musicList',
                component:()=>import('../components/Music/MusicList')
            },
        {
            path:'/music/uploadMusic',
            component:()=>import('../components/Music/UploadMusic')
        }]
        },
        {
            path:'/tags',
            component:()=>import('../components/Tag/index'),
            redirect: '/tags/tagsList',
            children: [{
                path:'/tags/tagsList',
                component:()=>import('../components/Tag/TagList')
            }]
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