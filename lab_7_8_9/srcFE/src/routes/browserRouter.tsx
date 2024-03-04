import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import ErrorPage from "../components/errorPage";
import Layout from "../components/layout";
import Redirect from "../components/layout/Redirect";
import NotFoundPage from "../components/notfoundPage";
import { webRoutes } from "./web";
import loadable from "@loadable/component";
import ProgressBar from "../components/loader/progressBar";
import RequireAuth from "./requireAuth";
import Login from "../components/auth/Login";

const errorElement = <ErrorPage />;
const fallbackElement = <ProgressBar />;

// const Dashboard = loadable(() => import("../components/dashboard"), {
//   fallback: fallbackElement,
// });
const Users = loadable(() => import("../components/users"), {
  fallback: fallbackElement,
});
const Students = loadable(() => import("../components/students"), {
  fallback: fallbackElement,
});

const Room = loadable(() => import("../components/room"), {
  fallback: fallbackElement,
});
const Thing = loadable(() => import("../components/thing"), {
  fallback: fallbackElement,
});
const ChangePass = loadable(() => import("../components/auth/ChangePass"), {
  fallback: fallbackElement,
});
const StudentChangeGroup = loadable(
  () => import("../components/StudentChangeGroup/StudentChangeGroup"),
  {
    fallback: fallbackElement,
  }
);
const StudentChangeRoom = loadable(
  () => import("../components/StudentChangeRoom/StudentChangeRoom"),
  {
    fallback: fallbackElement,
  }
);
const ThingChangeRoom = loadable(
  () => import("../components/ThingChangeRoom/ThingChangeRoom"),
  {
    fallback: fallbackElement,
  }
);
const ThingChangeStudent = loadable(
  () => import("../components/ThingChangeStudent/ThingChangeStudent"),
  {
    fallback: fallbackElement,
  }
);
// const ChangePass = loadable(() => import("../components/auth/ChangePass"), {
//   fallback: fallbackElement,
// });
export const browserRouter = createBrowserRouter([
  {
    path: webRoutes.home,
    element: <Redirect />,
    errorElement: errorElement,
  },

  // auth routes
  {
    element: <AuthLayout />,
    errorElement: errorElement,
    children: [
      {
        path: webRoutes.login,
        element: <Login />,
      },
    ],
  },

  // protected routes
  {
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    errorElement: errorElement,
    children: [
      // {
      //   path: webRoutes.dashboard,
      //   element: <Dashboard />,
      // },
      {
        path: webRoutes.students,
        element: <Students />,
      },
      {
        path: webRoutes.room,
        element: <Room />,
      },
      {
        path: webRoutes.thing,
        element: <Thing />,
      },
      {
        path: webRoutes.changePass,
        element: <ChangePass />,
      },
      {
        path: webRoutes.studentChangeGroup,
        element: <StudentChangeGroup />,
      },
      {
        path: webRoutes.studentChangeRoom,
        element: <StudentChangeRoom />,
      },
      {
        path: webRoutes.thingChangeRoom,
        element: <ThingChangeRoom />,
      },

      {
        path: webRoutes.thingChangeStudent,
        element: <ThingChangeStudent />,
      },

    ],
  },

  // 404
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: errorElement,
  },
]);
