import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavDropdown",
    name: "Student Dashboard",
    route: "/",
    icon: (
      <CIcon
        name="cil-speedometer"
        customClasses="c-sidebar-nav-icon sidebarIcon"
      />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Dashboard",
        to: "/",
      },
      {
        _tag: "CSidebarNavItem",
        name: "My Profile",
        to: "/profile",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Edit Profile",
        to: "/profile/edit",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Academics",
    route: "/students",
    icon: (
      <CIcon
        name="cil-people"
        customClasses="c-sidebar-nav-icon  sidebarIcon"
      />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Class",
        to: "/academics/class",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Courses",
        to: "/academics/courses",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Report Card",
        to: "/academics/report",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Calendar",
        to: "/academics/calendar",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Finances",
    route: "/finances",
    icon: (
      <CIcon
        name="cil-people"
        customClasses="c-sidebar-nav-icon  sidebarIcon"
      />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Fees",
        to: "/finance/fees",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Canteen",
        to: "/finance/canteen",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Attendance",
    to: "/attendance",
    icon: (
      <CIcon
        name="cil-paperclip"
        customClasses="c-sidebar-nav-icon sidebarIcon"
      />
    ),
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Messages",
    route: "/messages",
    icon: (
      <CIcon
        name="cil-chat-bubble"
        customClasses="c-sidebar-nav-icon sidebarIcon"
      />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Inbox",
        to: "/messages",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Chat",
        to: "/messages/chat",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Message School Admin",
        to: "/message/admin",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Message  Teacher",
        to: "/message/teacher",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Notice",
    to: "/notifications",
    icon: (
      <CIcon name="cil-bell" customClasses="c-sidebar-nav-icon sidebarIcon" />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "Settings",
    to: "/settings",
    icon: (
      <CIcon
        name="cil-settings"
        customClasses="c-sidebar-nav-icon sidebarIcon"
      />
    ),
  },
];

export default _nav;
