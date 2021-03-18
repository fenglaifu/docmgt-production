import {createRouter, createWebHashHistory} from 'vue-router';
import Layout from "layouts/index.vue";

export const routes = [
    {
      path: "/",
      redirect: "/home",
      component: Layout,
      meta: { title: "导航", icon: "el-icon-s-home" },
      children: [
        {
          path: "home",
          component: () => import("views/home.vue"),
          name: "Home",
          meta: { title: "首页", icon: "el-icon-s-home" },
          children: [
            {
              path: ":id",
              component: () => import("views/detail.vue"),
              name: "Detail",
              hidden: true,
              meta: {
                title: "详情",
                icon: "el-icon-s-home",
                activeMenu: "/home",
              },
            },
          ],
        },
        {
          path: "/worknotice",
          component: () => import("views/worknotice/worknotice.vue"),
          meta: {
            title: "工作通知",
            icon: "el-icon-notebook-1",
          },
          redirect: '/worknotice/worknoticelist',
          children: [
            {
              path: "worknoticelist",
              component: () => import("views/worknotice/Worknoticelist.vue"),
              name: "worknoticelist",
              hidden: true,
              meta: {
                title: "工作通知列表",
                icon: "el-icon-notebook-1",
                activeMenu: "/worknotice",
              },
            },
            {
              path: "worknoticeAdd",
              component: () => import("views/worknotice/WorknoticeAdd.vue"),
              name: "worknoticeAdd",
              hidden: true,
              meta: {
                title: "新增工作通知",
                icon: "el-icon-notebook-1",
                activeMenu: "/worknotice",
              },
            },
            {
              path: "worknoticedetail/:id(\\d+)",
              component: () => import("views/worknotice/worknoticedetail.vue"),
              name: "worknoticedetail",
              hidden: true,
              meta: {
                title: "工作通知详情",
                icon: "el-icon-notebook-1",
                activeMenu: "/worknotice",
              },
            },
          ],
        },
        {
          path: "/doc",
          component: () => import("views/doc/Doc.vue"),
          meta: {
            title: "文档",
            icon: "el-icon-files",
          },
          redirect: '/doc/doclist',
          children: [
            {
              path: "doclist",
              component: () => import("views/doc/Doclist.vue"),
              name: "doclist",
              hidden: true,
              meta: {
                title: "文档列表",
                icon: "el-icon-folder-opened",
                activeMenu: "/doc",
              },
            },
            {
              path: "docUpload",
              component: () => import("views/doc/DocUpload.vue"),
              name: "docUpload",
              hidden: true,
              meta: {
                title: "文档上传",
                icon: "el-icon-folder-opened",
                activeMenu: "/doc",
              },
            },
            {
              path: "docdetail/:id",
              component: () => import("views/doc/Docdetail.vue"),
              name: "docdetail",
              hidden: true,
              meta: {
                title: "文档详情",
                icon: "el-icon-folder-opened",
                activeMenu: "/doc",
              },
            },
            {
              path: "docdetailPdf/:id",
              component: () => import("views/doc/DocdetailPdf.vue"),
              name: "docdetailPdf",
              hidden: true,
              meta: {
                title: "文档详情",
                icon: "el-icon-folder-opened",
                activeMenu: "/doc",
              },
            },
            {
              path: "docdetailXlsx/:id",
              component: () => import("views/doc/DocdetailXlsx.vue"),
              name: "docdetailXlsx",
              hidden: true,
              meta: {
                title: "文档详情",
                icon: "el-icon-folder-opened",
                activeMenu: "/doc",
              },
            },
            {
              path: "docdetailDocx/:id",
              component: () => import("views/doc/DocdetailDocx.vue"),
              name: "docdetailDocx",
              hidden: true,
              meta: {
                title: "文档详情",
                icon: "el-icon-folder-opened",
                activeMenu: "/doc",
              },
            },
            {
              path: "docdetailPpt/:id",
              component: () => import("views/doc/DocdetailPpt.vue"),
              name: "docdetailPpt",
              hidden: true,
              meta: {
                title: "文档详情",
                icon: "el-icon-folder-opened",
                activeMenu: "/doc",
              },
            },
            {
              path: "docdetailText/:id",
              component: () => import("views/doc/DocdetailText.vue"),
              name: "docdetailText",
              hidden: true,
              meta: {
                title: "文档详情",
                icon: "el-icon-folder-opened",
                activeMenu: "/doc",
              },
            }
          ],
        }
      ],
    }
  ];
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });
  
  export default router;