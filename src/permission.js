import Vue from 'vue'
import router from './router/'
import store from './store/'
// import { Message, MessageBox } from "element-ui";

const loginHome = ['/loginHome', '/loginHome/index', '/exampleSearch', '/disputeResocurce', '/help', '/example', '/lawRules/index', '/lawRules/detail', '/caseInquiry/index', '/caseInquiry/detail']
const whiteList = ['/login', '/loginAdmin', '/register', '/forget', '/resetPwd', '/system', '/mobile', '/loginHome', ...loginHome] // 不重定向白名单
// main.js 路由守卫
router.beforeEach(async(to, from, next) => {
  // let href = location.href
  // console.log(from)
  // if (href.indexOf('sstj') != -1 && to.path != '/system') {
  //   next('/system')
  //   return
  // }
  // console.log("路由拦截", to.path);
  console.log('用户角色', store.getters.getUserRole)
  const roleType = store.getters.getUserRole || 0
  console.log(to.path)
  // 判断是否有角色身份（代表已登录）
  if (roleType > 0) {
    // console.log("已登录，有角色身份");
    if (roleType === 3) { // 为当事人的时候跳转到当事人页面
      if (to.path === '/login') {
        // console.log("有角色身份 , 将要去登录页,强制转到后台首页");
        next({
          path: '/litigant'
        })
      } else {
        // console.log("有角色身份 , 不是去登录页,");
        await store.dispatch('GetUserInfo')
        next()
      }
    } else {
      if (to.path === '/login') {
        // console.log("有角色身份 , 将要去登录页,强制转到后台首页");
        next({
          path: '/home'
        })
      } else {
        // console.log("有角色身份 , 不是去登录页,");
        await store.dispatch('GetUserInfo')
        next()
      }
    }
  } else {
    // console.log("无角色身份");
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      // console.log("在免登录白名单，直接进入");
      next()
    } else {
      // console.log("不在免登录白名单，跳转登录页");
      // 不在免登录白名单，跳转登录页
      next('/login')
    }
  }
})

// 按钮权限相关的自定义指令
Vue.directive('permission', {
  bind: (el, binding) => {
    // 获取权限按钮绑定的按钮名称
    const btnName = binding.value
    // 获取当前路由需要权限的按钮组
    const btnGroup = store.getters.getBtnPermissions
    // 判断当前角色是否具有该按钮权限
    let permission = false
    let nowBtnInfo = {}
    btnGroup.forEach((item) => {
      if (item.perms === btnName) {
        permission = true
        nowBtnInfo = item
      }
    })
    console.log('nowBtnInfo', nowBtnInfo)
    // 必须等dom更新完毕才去获取父节点不然parentNode获取不到
    Vue.nextTick(() => {
      // 有权限返回按钮名称，无权限删除子元素，相当于v-if
      if (permission) {
        if (nowBtnInfo.insert) {
          el.lastChild.innerText = nowBtnInfo.title // 注入按钮、区块名称
          var icon = document.createElement('i') // 创建一个i标签,用来存放图标
          icon.className = nowBtnInfo.icon // 设置标签class属性
          //  insertBefore()函数用法：
          // 新元素：你想插入的元素(newElement)
          // 目标元素：你想把这个元素插入到哪个元素(targetElement)
          // 父元素：目标元素的父元素(parentELement)
          el.insertBefore(icon, el.lastChild) // 注入图标标签
        }
        return true
      } else {
        el.parentNode.removeChild(el)
        return false
      }
    })
  }
})
