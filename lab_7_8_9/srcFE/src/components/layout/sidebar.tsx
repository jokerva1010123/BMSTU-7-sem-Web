import { webRoutes } from "../../routes/web";
import { BiHomeAlt2 } from "react-icons/bi";
import Icon, {
  UserOutlined,
  ApartmentOutlined,
  ThunderboltFilled,
  ProjectFilled,
  AccountBookTwoTone,
  GroupOutlined,
  AndroidOutlined,
  ForkOutlined,
} from "@ant-design/icons";

export const sidebar = [
  {
    path: webRoutes.students,
    key: webRoutes.students,
    name: "Students",
    icon: <UserOutlined />,
  },
  {
    path: webRoutes.room,
    key: webRoutes.room,
    name: "Room",
    icon: <ApartmentOutlined />,
  },
  {
    path: webRoutes.thing,
    key: webRoutes.thing,
    name: "Thing",
    icon: <ThunderboltFilled />,
  },
  {
    path: webRoutes.changePass,
    key: webRoutes.changePass,
    name: "Change Password",
    icon: <ProjectFilled />,
  },
  {
    path: webRoutes.studentChangeGroup,
    key: webRoutes.studentChangeGroup,
    name: "Change Student's Group",
    icon: <AccountBookTwoTone />,
  },
  {
    path: webRoutes.studentChangeRoom,
    key: webRoutes.studentChangeRoom,
    name: "Change Student's Room",
    icon: <GroupOutlined />,
  },
  {
    path: webRoutes.thingChangeRoom,
    key: webRoutes.thingChangeRoom,
    name: "Change Thing's Room",
    icon: <AndroidOutlined />,
  },
  {
    path: webRoutes.thingChangeStudent,
    key: webRoutes.thingChangeStudent,
    name: "Change Thing's Owner",
    icon: <ForkOutlined />,
  },
];
export const sidebar1 = [
  {
    path: webRoutes.students,
    key: webRoutes.students,
    name: "Students",
    icon: <UserOutlined />,
  },
  {
    path: webRoutes.room,
    key: webRoutes.room,
    name: "Room",
    icon: <ApartmentOutlined />,
  },
  {
    path: webRoutes.thing,
    key: webRoutes.thing,
    name: "Thing",
    icon: <ThunderboltFilled />,
  },
  {
    path: webRoutes.changePass,
    key: webRoutes.changePass,
    name: "Change Password",
    icon: <ProjectFilled />,
  },
];
