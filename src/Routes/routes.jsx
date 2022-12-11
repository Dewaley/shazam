import HomePage from "../pages/Homepage";
import SearchPage from "../pages/SearchPage";
import SongDetails from "../pages/SongDetails";
import ArtistDetails from "../pages/ArtistDetails";
import NotFound from "../pages/NotFound";

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
  {
    path: "/artist-details/:id",
    component: <ArtistDetails />,
  },
  {
    path: "*",
    component: <NotFound />,
  },
];

export default routes;
