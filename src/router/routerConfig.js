// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置
import Menu from '../redux/menu';
import Login from '../redux/login';
import Index from '../redux/index';
import Upadta from '../redux/update';
import Manage from '../redux/manage';
// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

const routerConfig = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Menu,
    children: [{
      path: '/index',
      component: Index
    },
    {
      path: '/update',
      component: Upadta
    },
    {
      path: '/manage',
      component: Manage
    }]
  }];

export default routerConfig;