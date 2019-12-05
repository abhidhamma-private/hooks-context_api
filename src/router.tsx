import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import People from './Routes/people/People';
import Diary from './Routes/diary/Diary';
import Alarm from './Routes/alarm/Alarm';
import Board from './Routes/board/Board';
import Etc from './Routes/etc/Etc';
import Me from './Routes/me/Me';
import Menu from './Components/menu/Menu';

export default (isLoggedIn: any) => {
  return (
    <BrowserRouter>
      {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
    </BrowserRouter>
  );
};

function LoggedInRoutes(): any {
  return (
    <>
      <Menu />
      <Switch>
        <Route path={'/'} exact={true} component={People} />
        <Route path={'/people'} component={People} />
        <Route path={'/diary'} component={Diary} />
        <Route path={'/alarm'} component={Alarm} />
        <Route path={'/board'} component={Board} />
        <Route path={'/me'} component={Me} />
        <Route path={'/etc'} component={Etc} />
        <Redirect from={'*'} to={'/'} />
      </Switch>
    </>
  );
}

function LoggedOutRoutes(): any {
  return (
    <>
      <Switch>
        <Route path={'/'} exact={true} component={Me} />
        <Route path={'/people'} component={People} />
        <Route path={'/diary'} component={Diary} />
        <Route path={'/alarm'} component={Alarm} />
        <Route path={'/me'} component={Me} />
        <Redirect from={'*'} to={'/people'} />
      </Switch>
    </>
  );
}
