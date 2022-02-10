import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  // PeopleOutlineIcon,

} from "@material-ui/icons";
// import GroupsIcon from '@mui/icons-material/Groups';
// import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              报表中心
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              销售
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                原料管理
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                菜单管理
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              交易中心
            </li>
            {/* <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">合作中心</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              小程序
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              外卖配送
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">账户中心</h3>
          <ul className="sidebarList">
          <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              供应链
            </li>
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              员工
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              会员
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              加盟
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
