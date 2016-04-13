import Hello from './components/Hello'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import Edit from './components/edit/Edit'
import Post from './components/post/Post'
import PostList from './components/post-list/PostList'
import TemplateEdit from './components/settings/templates/edit/TemplateEdit'
import { URL_PATH_POSTS } from './App'

export function configRouter (router, store) {

  // routes を定義します
  router.map({
    '/hello': {
      component: Hello
    },
    '/login': {
        component: Login
    },
    '/signup': {
        component: Signup
    },
    '/posts/:post_id': {
        name: 'post',
        component: Post,
        needsAuth: true
    },
    '/posts': {
        component: PostList,
        needsAuth: true
    },
    '/posts/search': {
        component: PostList,
        needsAuth: true
    },
    '/edit/:post_id': {
        name: 'edit',
        component: Edit,
        needsAuth: true
    },
    '/edit': {
        component: Edit,
        needsAuth: true
    },
    '/settings/templates/edit': {
        component: TemplateEdit,
        needsAuth: true
    },
    '/settings/templates/edit/:template_id': {
        name: 'template_edit',
        component: TemplateEdit,
        needsAuth: true
    }
  })

  // router.redirect({
  //     '/': '/posts'
  // })

  // 認証
  router.beforeEach(function (transition: vuerouter.Transition<any, any, any, any, any>) {

    console.log(transition)
    // 認証済みで行き先がloginだったらpostsへ。
    if (store.state.authData.token && transition.to.path === '/login') {
      transition.redirect(URL_PATH_POSTS)
      return true
    }
    
    
    if (transition.to["needsAuth"]) {
        // 認証処理
        console.log('auth： ' + store.state.authData.token)
        if (store.state.authData.token) {
          transition.next()
        } else {
          transition.redirect('/login')
        }
        return true
    }
    // qiita これがないとnext()やredirect()で遷移しない（URLだけ書き換わる）
    return true
  })

}