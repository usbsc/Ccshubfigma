import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Rankings } from "./components/Rankings";
import { TeamDetail } from "./components/TeamDetail";
import { Schedule } from "./components/Schedule";
import { Scores } from "./components/Scores";
import { Players } from "./components/Players";
import { GameDetail } from "./components/GameDetail";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "rankings", Component: Rankings },
      { path: "schedule", Component: Schedule },
      { path: "scores", Component: Scores },
      { path: "players", Component: Players },
      { path: "team/:teamId", Component: TeamDetail },
      { path: "game/:gameId", Component: GameDetail },
      { path: "*", Component: NotFound },
    ],
  },
], {
  basename: "/ccshub/"
});
