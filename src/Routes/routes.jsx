import HomePage from "../pages/Homepage";
import SearchPage from "../pages/SearchPage";
import SongDetails from "../pages/SongDetails";

const routes = [
  {
    path: "/",
    component: <HomePage />,
  },
  {
    path: "/search",
    component: <SearchPage />,
  },
  {
    path: "/song-details/:id",
    component: <SongDetails />,
  },
];

export default routes;
