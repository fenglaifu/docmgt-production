import { RouteConfig } from 'vue-router'
export function RouteData(){
const routes:RouteConfig[] = [
        {
          path: '/',
          redirect: '/home',
        },
        {
          path: '/home',
          component: () => import('../views/Home.vue'),
          name: 'Home',
          meta: { title: '首页', icon: 'el-icon-s-home' },
          children: [],
        },
        {
          path: '/worknotice',
          name: 'worknotice',
          component: () => import('../views/worknotice/worknotice.vue'),
          meta: {
            title: '工作通知',
            icon: 'el-icon-notebook-1',
          },
          redirect: '/worknotice/worknoticelist',
          children: [
            {
              path: 'worknoticelist',
              component: () => import('../views/worknotice/Worknoticelist.vue'),
              name: 'worknoticelist',
              hidden: true,
              meta: {
                title: '工作通知列表',
                icon: 'el-icon-notebook-1',
                activeMenu: '/worknotice',
              },
            },
            {
              path: 'worknoticeAdd',
              component: () => import('../views/worknotice/WorknoticeAdd.vue'),
              name: 'worknoticeAdd',
              hidden: true,
              meta: {
                title: '新增工作通知',
                icon: 'el-icon-notebook-1',
                activeMenu: '/worknotice',
              },
            },
            {
              path: 'worknoticedetail/:id(\\d+)',
              component: () => import('../views/worknotice/worknoticedetail.vue'),
              name: 'worknoticedetail',
              hidden: true,
              props:true,
              meta: {
                title: '工作通知详情',
                icon: 'el-icon-notebook-1',
                activeMenu: '/worknotice',
              },
            },
          ],
        },
        {
          path: '/doc',
          component: () => import('../views/doc/Doc.vue'),
          meta: {
            title: '文档',
            icon: 'el-icon-files',
          },
          redirect: '/doc/doclist',
          children: [
            {
              path: 'doclist',
              component: () => import('../views/doc/Doclist.vue'),
              name: 'Doclist',
              hidden: true,
              meta: {
                title: '文档列表',
                icon: 'el-icon-folder-opened',
                activeMenu: '/doc',
              },
            },
            {
              path: 'docupload',
              component: () => import('../views/doc/Docupload.vue'),
              name: 'Docupload',
              hidden: true,
              meta: {
                title: '文档上传',
                icon: 'el-icon-folder-opened',
                activeMenu: '/doc',
              },
            },
            {
              path: 'docdetail/:id',
              component: () => import('../views/doc/Docdetail.vue'),
              name: 'docdetail',
              hidden: true,
              props:true,
              meta: {
                title: '文档详情',
                icon: 'el-icon-folder-opened',
                activeMenu: '/doc',
              },
            },
            {
              path: 'docdetailPdf/:id',
              component: () => import('../views/doc/DocdetailPdf.vue'),
              name: 'docdetailPdf',
              hidden: true,
              props:true,
              meta: {
                title: '文档详情',
                icon: 'el-icon-folder-opened',
                activeMenu: '/doc',
              },
            },
            {
              path: 'docdetailXlsx/:id',
              component: () => import('../views/doc/DocdetailXlsx.vue'),
              name: 'docdetailXlsx',
              hidden: true,
              props:true,
              meta: {
                title: '文档详情',
                icon: 'el-icon-folder-opened',
                activeMenu: '/doc',
              },
            },
            {
              path: 'docdetailDocx/:id',
              component: () => import('../views/doc/DocdetailDocx.vue'),
              name: 'docdetailDocx',
              hidden: true,
              props:true,
              meta: {
                title: '文档详情',
                icon: 'el-icon-folder-opened',
                activeMenu: '/doc',
              },
            },
            {
              path: 'docdetailPpt/:id',
              component: () => import('../views/doc/DocdetailPpt.vue'),
              name: 'docdetailPpt',
              hidden: true,
              props:true,
              meta: {
                title: '文档详情',
                icon: 'el-icon-folder-opened',
                activeMenu: '/doc',
              },
            },
            {
              path: 'docdetailText/:id',
              component: () => import('../views/doc/DocdetailText.vue'),
              name: 'docdetailText',
              hidden: true,
              props:true,
              meta: {
                title: '文档详情',
                icon: 'el-icon-folder-opened',
                activeMenu: '/doc',
              },
            },
          ],
    },
  ];

    return {routes};
  }