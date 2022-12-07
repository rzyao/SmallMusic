import path from 'path-browserify';
const getChildrenRoutes = (routes: any[]) => {
  const result: any[] = [];
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children);
    }
  });
  return result;
};
export const filterRouters = (routes: any[]) => {
  const childrenRoutes = getChildrenRoutes(routes);
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path;
    });
  });
};
export function generateMenus(routes: any[], basePath = '') {
  const result: any[] = [];
  // 遍历路由表
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return;
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children));
      return;
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path);
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item) => item.path === routePath);
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: [],
      };

      // icon 与 title 必须全部存在
      //   if (route.meta.icon && route.meta.title) {
      if (route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route);
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path));
    }
  });
  return result;
}
// 移除路由中存在props.hidden的页面
function remvoeHidden(routers: any[], hiddenRouterNames: string[]) {
  return routers
    .filter((router) => {
      if (hiddenRouterNames.indexOf(router.name) == -1) {
        return router;
      }
    })
    .map((item) => {
      item = Object.assign({}, item);
      if (item.children.length > 0) {
        console.log('item.children');
        console.log(item.children);
        item.children = remvoeHidden(item.children, hiddenRouterNames);
      }
      return item;
    });
}
import { hiddenRouterNames } from '@/router';
export function getMenus(routers: any) {
  const filterRoutes = filterRouters(routers);
  const menus = generateMenus(filterRoutes);
  const result = remvoeHidden(menus, hiddenRouterNames);
  console.log(result);
  return result;
}
function isNull(data: any) {
  if (!data) return true;
  if (JSON.stringify(data) === '{}') return true;
  if (JSON.stringify(data) === '[]') return true;
  return false;
}
