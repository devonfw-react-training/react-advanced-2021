import {
  BrowserRouter,
  NavLink,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { BookDetails } from "./book/components/BookDetails/BookDetails";
import { BookOverview } from "./book/components/BookOverview/BookOverview";
import { BookProvider } from "./book/services/BookService";

export const NavBar = () => (
  <nav>
    <ul className='nav nav-pills'>
      <li className='nav-item'>
        <NavLink to='/books' activeClassName='active' className='nav-link'>
          Book Overview
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to='/book' exact activeClassName='active' className='nav-link'>
          New Book
        </NavLink>
      </li>
    </ul>
  </nav>
);

export const Routes = () => (
  <>
    <NavBar />
    <Switch>
      <Route path='/book/:id?' component={BookDetails} />
      <Route path='/books' component={BookOverview} />
      <Redirect to='books' />
    </Switch>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <BookProvider>
          <Routes />
        </BookProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
