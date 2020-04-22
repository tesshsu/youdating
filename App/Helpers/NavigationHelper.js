/* eslint-disable no-prototype-builtins */
import { NavigationActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

let NAVIGATOR;

function setTopLevelNavigator(navigatorRef) {
  NAVIGATOR = navigatorRef;
}

function navigate(routeName, params) {
  NAVIGATOR.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function back() {
  NAVIGATOR.dispatch(
    NavigationActions.back()
  );
}

function toggleDrawer() {
  NAVIGATOR.dispatch(
    DrawerActions.toggleDrawer()
  );
}

function openDrawer() {
  NAVIGATOR.dispatch(
    DrawerActions.openDrawer()
  );
}

function closeDrawer() {
  NAVIGATOR.dispatch(
    DrawerActions.closeDrawer()
  );
}

function getActiveRouteState(route) {
  if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
    return route;
  }

  const childActiveRoute = route.routes[route.index];

  return getActiveRouteState(childActiveRoute);
}

function isOnRoute(routeState, routeName) {
  const route = getActiveRouteState(routeState);
  return (route && route.routeName.startsWith(routeName));
}

export default {
  navigate,
  back,
  toggleDrawer,
  openDrawer,
  closeDrawer,
  setTopLevelNavigator,
  getActiveRouteState,
  isOnRoute
};
