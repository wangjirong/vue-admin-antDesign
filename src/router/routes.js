export const routes = [{
        path: '/',
        name: 'Home',
        component: () => import('../views/Home'),
        redirect: '/blog',
        meta: {
            title: "首页",
            requireAuth: true
        },
        children: [{
                path: '/blog',
                component: () => import('../components/Blog/index'),
                redirect: '/blog/blogList',
                meta: {
                    title: "博客管理",
                    requireAuth: true
                },
                children: [{
                        path: '/blog/addBlog',
                        component: () => import('../components/Blog/AddBlog'),
                        meta: {
                            title: "增加博客",
                            requireAuth: true
                        },
                    },
                    {
                        path: '/blog/blogList',
                        component: () => import('../components/Blog/BlogList'),
                        meta: {
                            title: "博客列表",
                            requireAuth: true
                        },
                    }, {
                        path: '/blog/stickBlog',
                        component: () => import('../components/Blog/StickBlog'),
                        meta: {
                            title: "置顶管理",
                            requireAuth: true
                        },
                    }
                ]
            },
            {
                path: '/diary',
                component: () => import('../components/Diary/index'),
                redirect: '/diary/diaryList',
                meta: {
                    title: "日志管理",
                    requireAuth: true
                },
                children: [{
                        path: '/diary/addDiary',
                        component: () => import('../components/Diary/AddDiary'),
                        meta: {
                            title: "增加日志",
                            requireAuth: true
                        },
                    },
                    {
                        path: '/diary/diaryList',
                        component: () => import('../components/Diary/DiaryList'),
                        meta: {
                            title: "日志列表",
                            requireAuth: true
                        },
                    }
                ]
            },
            {
                path: '/wallpaper',
                component: () => import('../components/Wallpaper/index'),
                redirect: '/wallpaper/wallpaperList',
                meta: {
                    title: "壁纸管理",
                    requireAuth: true
                },
                children: [{
                        path: '/wallpaper/wallpaperList',
                        component: () => import('../components/Wallpaper/WallpaperList'),
                        meta: {
                            title: "壁纸列表",
                            requireAuth: true
                        },
                    },
                    {
                        path: '/wallpaper/uploadWallpaper',
                        component: () => import('../components/Wallpaper/UploadWallpaper'),
                        meta: {
                            title: "上传壁纸",
                            requireAuth: true
                        },
                    }
                ]
            },
            {
                path: '/music',
                component: () => import('../components/Music/index'),
                redirect: '/music/musicList',
                meta: {
                    title: "音乐管理",
                    requireAuth: true
                },
                children: [{
                        path: '/music/musicList',
                        component: () => import('../components/Music/MusicList'),
                        meta: {
                            title: "音乐管理",
                            requireAuth: true
                        },
                    },
                    {
                        path: '/music/uploadMusic',
                        component: () => import('../components/Music/UploadMusic'),
                        meta: {
                            title: "上传音乐",
                            requireAuth: true
                        },
                    }
                ]
            },
            {
                path: '/tags',
                component: () => import('../components/Tag/index'),
                redirect: '/tags/tagsList',
                meta: {
                    title: "标签管理",
                    requireAuth: true
                },
                children: [{
                    path: '/tags/tagsList',
                    component: () => import('../components/Tag/TagList'),
                    meta: {
                        title: "标签列表、增加标签",
                        requireAuth: true
                    },
                }]
            },
            {
                path: '/links',
                component: () => import('../components/Link/index'),
                redirect: '/links/linksList',
                meta: {
                    title: "友链管理",
                    requireAuth: true
                },
                children: [{
                    path: '/links/linksList',
                    component: () => import('../components/Link/LinksList.vue'),
                    meta: {
                        title: "友链列表、增加链接",
                        requireAuth: true
                    },
                }]
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: "登录"
        },
        component: () => import('../views/Login')
    },
    {
        path: '/register',
        name: 'Register',
        meta: {
            title: "注册"
        },
        component: () => import('../views/Register')
    },
]