import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";
import { selectSidebarShow, set } from "../store/slices/appSlice";
import logo from "../assets/icons/logo.png";

const TheSidebar = ({ navs }) => {
  const dispatch = useDispatch();
  const show = useSelector(selectSidebarShow);

  return (
    <CSidebar
      className="sidebar__main"
      show={show}
      onShowChange={(val) => dispatch(set(val))}
    >
      <CSidebarBrand className="d-md-down-none nav__brand" to="/">
        <img
          className="c-sidebar-brand-full"
          src={logo}
          alt="logo-negative"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navs}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
