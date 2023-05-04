import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavDropdown",
    name: "Teacher Dashboard",
    route: "/admin",
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
      {
        _tag: "CSidebarNavItem",
        name: "Payrow",
        to: "/payrow",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Academics",
    route: "/academics",
    icon: (
      <CIcon
        name="cil-paperclip"
        customClasses="c-sidebar-nav-icon sidebarIcon"
      />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Class",
        to: "/academics/classes",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Courses",
        to: "/academics/courses",
      },

      {
        _tag: "CSidebarNavItem",
        name: "School Calendar",
        to: "/academics/calendar",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Attendences",
    to: "/attendance",
    icon: (
      <CIcon name="cil-notes" customClasses="c-sidebar-nav-icon sidebarIcon" />
    ),
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Message",
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
        to: "/messages/admin",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Message Student",
        to: "/messages/student",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Canteen",
    to: "/canteen",
    icon: (
      <CIcon name="cil-notes" customClasses="c-sidebar-nav-icon sidebarIcon" />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "Notifications",
    to: "/notifications",
    icon: (
      <CIcon name="cil-bell" customClasses="c-sidebar-nav-icon sidebarIcon" />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "Account Settings",
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
