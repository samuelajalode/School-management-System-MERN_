import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Admin Dashboard",
    to: "/",
    icon: (
      <CIcon
        name="cil-speedometer"
        customClasses="c-sidebar-nav-icon sidebarIcon"
      />
    ),
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Students",
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
        name: "All Students",
        to: "/students",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Registration New",
        to: "/students/new",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Past Students",
        to: "/students/paststudents",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Withdrawn Students",
        to: "/students/withdrawstudents",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Campuses",
        to: "/students/campus",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Dormitories",
        to: "/students/dormitories",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Section",
        to: "/students/section",
      },
      {
        _tag: "CSidebarNavItem",
        name: "UpGrading",
        to: "/students/upgrade",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Prefects",
        to: "/students/prefects",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Scholarships",
        to: "/students/scholarships",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Staff",
    route: "/staff",
    icon: (
      <CIcon
        name="cil-people"
        customClasses="c-sidebar-nav-icon  sidebarIcon"
      />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Departments",
        to: "/academics/departments",
      },
      {
        _tag: "CSidebarNavItem",
        name: "All Staff",
        to: "/staff",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add Staff",
        to: "/staff/new",
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
        name: "Classes",
        to: "/academics/classes",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Courses",
        to: "/academics/courses",
      },

      {
        _tag: "CSidebarNavItem",
        name: "Class Groups",
        to: "/academics/classgroups",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Year Groups",
        to: "/academics/yeargroups",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Divisions",
        to: "/academics/divisions",
      },
      {
        _tag: "CSidebarNavItem",
        name: "School Calender",
        to: "/academics/calender",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Notes",
        to: "/academics/notes",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Past Classes",
        to: "/academics/classes/past",
      },
      {
        _tag: "CSidebarNavItem",
        name: "SBA",
        to: "/academics/sba",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Progress Reports",
        to: "/academics/progressreports",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Combined Reports",
        to: "/academics/combinedreports",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Correspondances",
        to: "/academics/correspondance",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Attendance",
    route: "/attendance",
    icon: (
      <CIcon name="cil-notes" customClasses="c-sidebar-nav-icon sidebarIcon" />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Students Attendance History",
        to: "/attendance/students",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Staff Attendance History",
        to: "/attendance/staff",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Register Students Attendance",
        to: "/attendance/students/register",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Register Staff Attendance",
        to: "/attendance/staff/register",
      },
    ],
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
    name: "Store and Inventory",
    route: "/store",
    icon: (
      <CIcon name="cil-notes" customClasses="c-sidebar-nav-icon  sidebarIcon" />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Inventory",
        to: "/store/inventory",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Sales",
        to: "/store/sales",
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
        name: "Message Students",
        to: "/messages/students",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Message Staff",
        to: "/messages/staff",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Message Guadian",
        to: "/messages/guadian",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Bulk/Group Message",
        to: "/messages/group",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Bill Reminder",
        to: "/messages/billreminder",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Reports",
    to: "/reports",
    icon: (
      <CIcon
        name="cil-settings"
        customClasses="c-sidebar-nav-icon sidebarIcon"
      />
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
