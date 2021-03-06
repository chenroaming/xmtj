import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/views/layout/layout' // 登录后的页面视图容器

// 右侧菜单路由
export const menuRouter = [
  {
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index')
  },
  {
    path: '/litigant',
    name: 'litigant',
    component: Layout,
    redirect: '/litigant/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import ('@/views/litigant')
      },
      {
        path: '/litigant/selectUnit',
        name: 'selectUnit',
        component: () => import('@/views/litigant/selectUnit')
      },
      {
        path: '/litigant/selectCourt',
        name: 'selectCourt',
        component: () => import('@/views/litigant/selectCourt')
      },
      {
        path: '/litigant/selectMediator',
        name: 'selectMediator',
        component: () => import('@/views/litigant/selectMediator')
      }
    ]
  },
  {
    path: '/litigantCase',
    name: 'litigantCase',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import ('@/views/litigant/litigantCase'),
        children: [
          {
            path: '/litigantCase/step',
            name: 'step',
            component: () => import ('@/views/litigant/caseStep/step')
          },
          {
            path: '/litigantCase/step1',
            name: 'step1',
            component: () => import ('@/views/litigant/caseStep/step1')
          },
          {
            path: '/litigantCase/step2',
            name: 'step2',
            component: () => import ('@/views/litigant/caseStep/step2')
          },
          {
            path: '/litigantCase/step3',
            name: 'step3',
            component: () => import ('@/views/litigant/caseStep/step3')
          },
          {
            path: '/litigantCase/step4',
            name: 'step4',
            component: () => import ('@/views/litigant/caseStep/step4')
          },
          {
            path: '/litigantCase/step5',
            name: 'step5',
            component: () => import ('@/views/litigant/caseStep/step5')
          }
        ]
      },
      {
        path: '/litigantCase/step1',
        name: 'step1',
        component: () => import ('@/views/litigant/caseStep/step1')
      }
    ]
  },
  {
    path: '/otherHome',
    name: 'otherHome',
    component: Layout,
    redirect: '/otherHome/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import ('@/views/otherHome/index'),
        children: [
          {
            path: '/otherHome/index',
            name: 'index',
            component: () => import ('@/views/otherHome/item/index')
          },
          {
            path: '/otherHome/news',
            name: 'news',
            component: () => import ('@/views/otherHome/item/news')
          },
          {
            path: '/otherHome/team',
            name: 'team',
            component: () => import ('@/views/otherHome/item/team')
          },
          {
            path: '/otherHome/account',
            name: 'account',
            component: () => import ('@/views/otherHome/item/account')
          }
        ]
      }
    ]
  },
  {
    path: '/myCase',
    name: 'myCase',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import ('@/views/litigant/myCase')
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        name: 'homeIndex',
        component: () => import ('@/views/caseList/index')
      }
    ]
  },
  {
    path: '/otherHome',
    name: 'otherHome',
    component: Layout,
    redirect: '/otherHome/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import ('@/views/otherHome/index'),
        children: [
          {
            path: '/otherHome/index',
            name: 'index',
            component: () => import ('@/views/otherHome/item/index')
          },
          {
            path: '/otherHome/news',
            name: 'news',
            component: () => import ('@/views/otherHome/item/news')
          },
          {
            path: '/otherHome/team',
            name: 'team',
            component: () => import ('@/views/otherHome/item/team')
          },
          {
            path: '/otherHome/account',
            name: 'account',
            component: () => import ('@/views/otherHome/item/account')
          }
        ]
      }
    ]
  },
  {
    path: '/myCase',
    name: 'myCase',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import ('@/views/litigant/myCase')
      }
    ]
  },
  {
    path: '/case',
    name: 'case',
    component: Layout,
    redirect: '/case/index',
    children: [
      {
        path: 'index',
        name: 'caseIndex',
        component: () => import ('@/views/case/index')
      }
    ]
  },
  {
    path: '/rtc',
    name: 'rtc',
    component: Layout,
    redirect: '/rtc/index',
    children: [
      {
        path: 'index',
        name: 'rtcIndex',
        component: () => import ('@/views/mediationOrg/index')
      }
    ]
  },
  {
    path: '/visualization',
    name: 'visualization',
    component: Layout,
    redirect: '/visualization/index',
    children: [
      {
        path: 'index',
        name: 'VisualizationIndex',
        component: () => import ('@/views/bigdata/index')
      }
    ]
  },
  {
    path: '/videoCom',
    name: 'videoCom',
    component: () => import ('@/views/bigdata/videoCom')
  },
  {
    path: '*',
    redirect: '/login'
  }
]

// 公用路由页面（不需要登录权限的路由页面，如：首页和登录页、注册页等一些不需要登陆权限的路由）
// 【注意注意注意】：
// 【重要】想要不需要登陆直接跳转记得在 src\permission.js 添加路由白名单，否则会被路由守卫拦截无法跳转。已登陆获取权限的用户不受影响，可以直接跳转。
// 【设置菜单注意事项】
//  菜单必须先包裹一层父路由作为目录，其组件指向登录后的页面视图容器Layout
//  hidden (默认为true，不在菜单显示) 设置为 false 可以在菜单显示（记得设置菜单的meta可选参数）；设置为 true 或不设置不会在菜单显示；设置为 ['角色名1','角色名2'] 包含的角色不会在菜单显示
//  alone (默认为true，当目录下只有一个菜单时显示目录) 设置为 false 当目录下只有一个菜单时不显示目录，直接显示该菜单
//  meta{参数} (可追加自定义参数，也可选内置参数：【title:"" //菜单名称 】；【icon:"" //图标名称（采用element的icon）】；【 role:['角色名1','角色名2'] //可访问的角色名称，不写默认都可访问】)
export const commontRouterMap = [
  {
    path: '/',
    name: 'default',
    redirect: '/login'
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import ('@/views/login/ssLogin/register')
  },
  {
    path: '/forget',
    name: 'forget',
    component: () =>
      import ('@/views/login/ssLogin/forget')
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import ('@/views/home/suit')
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout
  },
  {
    path: '/mobile',
    name: 'mobile',
    component: () =>
      import ('@/views/mobile/mobile')
  },
  {
    path: '/loginHome',
    name: 'loginHome',
    component: () => import ('@/views/home/suit')
  },
  {
    path: '/disputeResocurce',
    name: 'disputeResocurce',
    component: () => import ('@/views/home/disputeResocurce')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import ('@/views/home/help')
  },
  {
    path: '/example',
    name: 'example',
    component: () =>
      import ('@/views/home/example')
  },
  {
    path: '/lawRules',
    name: 'lawRules',
    redirect: '/lawRules/index',
    component: () => import ('@/views/home/lawRules/index'),
    children: [
      {
        path: 'index',
        name: 'lawRulesList',
        component: () => import ('@/views/home/lawRules/lawRules')
      },
      {
        path: 'detail',
        name: 'newsDetail',
        component: () => import ('@/views/home/lawRules/detail')
      }
    ]
  },
  {
    path: '/caseInquiry',
    name: 'caseInquiry',
    redirect: '/caseInquiry/index',
    component: () => import ('@/views/home/caseInquiry/index'),
    children: [
      {
        path: 'index',
        name: 'caseInquiryList',
        component: () => import ('@/views/home/caseInquiry/lawRules')
      },
      {
        path: 'detail',
        name: 'caseInquiryDetail',
        component: () => import ('@/views/home/caseInquiry/detail')
      }
    ]
  }
]

// 实例化vue的时候只挂载commontRouterMap
const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: [...commontRouterMap, ...menuRouter] // 初始化先注入公共页面路由
  })
const router = createRouter()

// 重置路由
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
