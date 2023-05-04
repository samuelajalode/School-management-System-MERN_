import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavDropdown",
    name: "Accountant Dashboard",
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
      {
        _tag: "CSidebarNavItem",
        name: "Canteen",
        to: "/canteen",
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
    name: "Finance",
    route: "/finance",
    icon: (
      <CIcon name="cil-notes" customClasses="c-sidebar-nav-icon sidebarIcon" />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Set Fees",
        to: "/finance/fees",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Set Payrow",
        to: "/finance/payrow",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Students Fees",
        to: "/finance/students",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Payrow",
        to: "/finance/payrow/payment",
      },
      {
        _tag: "CSidebarNavItem",
        name: " Fees Payment",
        to: "/finance/students/fees",
      },
      {
        _tag: "CSidebarNavItem",
        name: " Debtors List",
        to: "/finance/debtors",
      },

      {
        _tag: "CSidebarNavItem",
        name: "Non Billable Payments",
        to: "/finance/nonbill",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Bill Reminder",
        to: "/finance/billreminder",
      },

      {
        _tag: "CSidebarNavItem",
        name: "Transactions",
        to: "/finance/transactions",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Banking",
        to: "/finance/banking",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Salary Deductions",
        to: "/finance/salarydeductions",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Staff Payrow",
        to: "/finance/staff/payrow",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Paye Deductions",
        to: "/finance/staff/paydeductions",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Trustee Contribution",
        to: "/finance/trustee",
      },
      {
        _tag: "CSidebarNavItem",
        name: "SSNIT Contributions",
        to: "/finance/ssnit",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Paye Calculator",
        to: "/finance/payrow/calculator",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Bank Advice",
        to: "/finance/bankadvice",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Canteen",
    route: "/canteen/payments",
    icon: (
      <CIcon name="cil-notes" customClasses="c-sidebar-nav-icon  sidebarIcon" />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "All Payments",
        to: "/canteen/payments",
      },
      {
        _tag: "CSidebarNavItem",
        name: "All Members",
        to: "/canteen/members",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add New Member",
        to: "/canteen/members/register",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Make Payment",
        to: "/canteen/payments/add",
      },
      {
        _tag: "CSidebarNavItem",
        name: " Payment Plans",
        to: "/canteen/payments/plan",
      },
    ],
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
    ],
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
