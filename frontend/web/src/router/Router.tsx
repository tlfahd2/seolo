import styled from 'styled-components';
import CompanyInformation from '@/pages/Information.tsx';
import { createBrowserRouter } from 'react-router-dom';
import Footer from '@/components/footer/Footer.tsx';
import Navigation from '@/components/navigation/Navigation.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import MainPage from '@/pages/MainPage.tsx';
import CurrentLOTO from '@/pages/CurrentLOTO.tsx';
import Equipment from '@/pages/Machine.tsx';
import Employee from '@/pages/Employee.tsx';
import PrivateRoute from '@/components/routesetting/PrivateRoute.tsx';
import CheckListPage from '@/pages/CheckListPage.tsx';
import Report from '@/pages/Report.tsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const With = (element: JSX.Element) => (
  <Container>
    <Navigation />
    <Content>{element}</Content>
    <Footer />
  </Container>
);

const mainRoutes = [
  {
    path: '/',
    element: <PrivateRoute>{With(<MainPage />)}</PrivateRoute>,
  },
];

const loginRoute = { path: '/login', element: <LoginPage /> };
const informationRoute = [
  {
    path: '/information',
    element: <PrivateRoute>{With(<CompanyInformation />)}</PrivateRoute>,
  },
  {
    path: '/locks',
    element: <PrivateRoute>{With(<CurrentLOTO />)}</PrivateRoute>,
  },
  {
    path: '/equipment',
    element: <PrivateRoute>{With(<Equipment />)}</PrivateRoute>,
  },
  {
    path: '/employee',
    element: <PrivateRoute>{With(<Employee />)}</PrivateRoute>,
  },
  {
    path: '/checklist',
    element: <PrivateRoute>{With(<CheckListPage />)}</PrivateRoute>,
  },
  {
    path: '/report',
    element: <PrivateRoute>{With(<Report />)}</PrivateRoute>,
  },
];

const routes = [...informationRoute, ...mainRoutes, loginRoute];

const Router = createBrowserRouter(routes);

export default Router;
