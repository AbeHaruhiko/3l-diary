import Hello from './components/Hello'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import Edit from './components/edit/Edit'
import Post from './components/post/Post'
import PostList from './components/post-list/PostList'
import TemplateList from './components/settings/templates/templateList'
import TemplateEdit from './components/settings/templates/edit/TemplateEdit'
import { URL_PATH_POSTS } from './App'

export const routes = [
    { path: '/hello', component: Hello },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/posts/:post_id', name: 'post', component: Post, needsAuth: true },
    { path: '/posts', component: PostList, needsAuth: true },
    { path: '/posts/search', component: PostList, needsAuth: true },
    { path: '/edit/:post_id', name: 'edit', component: Edit, needsAuth: true },
    { path: '/edit', component: Edit, needsAuth: true },
    { path: '/settings/templates', component: TemplateList, needsAuth: true },
    { path: '/settings/templates/edit', component: TemplateEdit, needsAuth: true },
    { path: '/settings/templates/edit/:template_id', name: 'template_edit', component: TemplateEdit, needsAuth: true },
]

export function configRouter (router, store) {
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