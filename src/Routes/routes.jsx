import HomePage from "../pages/Homepage";
import SearchPage from "../pages/SearchPage";

const routes = [
  {
    path: "/",
    component: <HomePage />,
  },
  {
    path: "/search",
    component: <SearchPage />,
  },
];

export default routes;
