import React from "react";

const Dashboard = React.lazy(() =>
  import("../../AccountantComponents/dashboard/Index")
);

//profile
const EditProfile = React.lazy(() =>
  import("../../TeachersComponents/dashboard/EditProfile")
);
const Profile = React.lazy(() =>
  import("../../TeachersComponents/dashboard/Profile")
);
const MyPayrow = React.lazy(() =>
  import("../../TeachersComponents/dashboard/Payrow")
);

//messages
const Attendance = React.lazy(() =>
  import("../../TeachersComponents/attendance/Attendance")
);

//attendance
const Messages = React.lazy(() =>
  import("../../TeachersComponents/message/Messages")
);
const MessageAdmin = React.lazy(() =>
  import("../../TeachersComponents/message/MessageAdmin")
);
const Chat = React.lazy(() => import("../../AdminComponents/messages/Chat"));

//settings
const Settings = React.lazy(() =>
  import("../../TeachersComponents/settings/SettingsPage")
);

//notification
const Notifications = React.lazy(() =>
  import("../../TeachersComponents/notifications/Notification")
);

//canteen
const MyCanteen = React.lazy(() =>
  import("../../StudentComponents/finances/Canteen")
);
const CanteenFees = React.lazy(() =>
  import("../../AdminComponents/canteen/PaymentPlan")
);

//finance
//finance
const PayeDeductions = React.lazy(() =>
  import("../../AdminComponents/finance/payeeDeductions/Deductions")
);
const PaySlip = React.lazy(() =>
  import("../../AdminComponents/finance/staffPayrow/PaySlip")
);

const BankAdvice = React.lazy(() =>
  import("../../AdminComponents/finance/bankAdvice/Advice")
);
const NonBillPayment = React.lazy(() =>
  import("../../AdminComponents/finance/nonBillPayment/NonBillPayment")
);
const Banking = React.lazy(() =>
  import("../../AdminComponents/finance/banking/Banking")
);
const AddBank = React.lazy(() =>
  import("../../AdminComponents/finance/banking/AddBank")
);
const EditBank = React.lazy(() =>
  import("../../AdminComponents/finance/banking/EditBank")
);
const BankTransactions = React.lazy(() =>
  import("../../AdminComponents/finance/banking/TrankingTransaction")
);

const Fees = React.lazy(() =>
  import("../../AdminComponents/finance/setfees/SetFees")
);
const SetFees = React.lazy(() =>
  import("../../AdminComponents/finance/setfees/SetNewFees")
);
const PrepareBill = React.lazy(() =>
  import("../../AdminComponents/finance/PrepareBill")
);
const RecordExpenditure = React.lazy(() =>
  import("../../AdminComponents/finance/expenditure/RecordExpenditure")
);
const IncomeExpenditure = React.lazy(() =>
  import("../../AdminComponents/finance/expenditure/RecordIncome")
);
const BillPayment = React.lazy(() =>
  import("../../AdminComponents/finance/billPayment/BillPayment")
);
const ViewPayment = React.lazy(() =>
  import("../../AdminComponents/finance/expenditure/ViewPayment")
);
const AllPayrow = React.lazy(() =>
  import("../../AdminComponents/finance/staffPayrow/AllPayrow")
);
const PayrowPay = React.lazy(() =>
  import("../../AdminComponents/finance/staffPayrow/PayrowPayment")
);
const Payrow = React.lazy(() =>
  import("../../AdminComponents/finance/payrow/Payrow")
);

const SalaryDeductions = React.lazy(() =>
  import("../../AdminComponents/finance/salaryDeductions/Deductions")
);

const PaymentReceipt = React.lazy(() =>
  import("../../AdminComponents/finance/billPayment/PaymentReceipt")
);

const DebtorsList = React.lazy(() =>
  import("../../AdminComponents/finance/debtors/DebtorsList")
);

const FinanceBillReminder = React.lazy(() =>
  import("../../AdminComponents/finance/billReminder/DebtorsList")
);

const PayeeCalculator = React.lazy(() =>
  import("../../AdminComponents/finance/payeCalculator/Calculator")
);
const SSNITContribution = React.lazy(() =>
  import("../../AdminComponents/finance/ssnitContributions/Contributions")
);

const TrusteeContribution = React.lazy(() =>
  import("../../AdminComponents/finance/trusteeContributions/Contributions")
);

//canteen
const Canteen = React.lazy(() =>
  import("../../AdminComponents/canteen/CanteenPayment")
);
const AddPayent = React.lazy(() =>
  import("../../AdminComponents/canteen/AddCanteenPayment")
);
const CanteenMembers = React.lazy(() =>
  import("../../AdminComponents/canteen/Members")
);
const EditPayment = React.lazy(() =>
  import("../../AdminComponents/canteen/AddCanteenPayment")
);
const RegisterCanteen = React.lazy(() =>
  import("../../AdminComponents/canteen/RegisterMember")
);
const EditMember = React.lazy(() =>
  import("../../AdminComponents/canteen/EditMember")
);
const PaymentPlan = React.lazy(() =>
  import("../../AdminComponents/canteen/PaymentPlan")
);

// const PayeeCalculator = React.lazy(() =>
//   import("../../AdminComponents/finance/payeCalculator/Calculator")
// );
// const SSNITContribution = React.lazy(() =>
//   import("../../AdminComponents/finance/ssnitContributions/Contributions")
// );

// const TrusteeContribution = React.lazy(() =>
//   import("../../AdminComponents/finance/trusteeContributions/Contributions")
// );

const routes = [
  {
    path: "/",
    name: "Dashboard",
    exact: true,
    component: Dashboard,
  },
  {
    path: "/canteen",
    name: "Canteen",
    exact: true,
    component: MyCanteen,
  },
  {
    path: "/finance/canteen/pricing",
    name: "Canteen Pricing",
    component: CanteenFees,
  },
  {
    path: "/messages",
    name: "Messages",
    exact: true,
    component: Messages,
  },
  {
    path: "/messages/chat",
    exact: true,
    name: "Messages",
    component: Chat,
  },
  {
    path: "/messages/chat/:id",
    name: "Messages",
    component: Chat,
  },
  {
    path: "/messages/admin",
    name: "Messages",
    component: MessageAdmin,
  },
  {
    path: "/message/:id",
    name: "Messages",
    component: Messages,
  },

  {
    path: "/profile",
    exact: true,
    name: "Course Details",
    component: Profile,
  },
  {
    path: "/profile/edit",
    name: "Course Details",
    component: EditProfile,
  },
  {
    path: "/payrow",
    name: "Payrow",
    component: MyPayrow,
  },
  {
    path: "/attendance",
    name: "Attendance",
    component: Attendance,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Notifications,
  },
  {
    path: "/finance/fees",
    name: "Fees",
    exact: true,
    component: Fees,
  },
  {
    path: "/finance/nonbill",
    name: "Non Bill Payment",
    exact: true,
    component: NonBillPayment,
  },
  {
    path: "/finance/fees/set",
    name: "Set Fees",
    component: SetFees,
  },
  {
    path: "/finance/students",
    name: "Students Fees",
    exact: true,
    component: PrepareBill,
  },
  {
    path: "/finance/salarydeductions",
    name: "Salary Deductions",
    component: SalaryDeductions,
  },
  {
    path: "/finance/billreminder",
    name: "Bill Reminder",
    component: FinanceBillReminder,
  },
  {
    path: "/finance/payrow",
    name: "Payrow Details",
    exact: true,
    component: Payrow,
  },
  {
    path: "/finance/debtors",
    name: "Debtors List",
    exact: true,
    component: DebtorsList,
  },
  {
    path: "/finance/staff/payrow",
    name: "Staff Payrow",
    exact: true,
    component: AllPayrow,
  },
  {
    path: "/finance/ssnit",
    name: "Staff SSNIT Contribution",
    component: SSNITContribution,
  },
  {
    path: "/finance/trustee",
    name: "Staff Trustee Contribution",
    component: TrusteeContribution,
  },
  {
    path: "/finance/staff/payrow/payslip/:id",
    name: "PaySlip",
    component: PaySlip,
  },
  {
    path: "/finance/staff/payrow/pay",
    name: "Staff Payrow",
    exact: true,
    component: PayrowPay,
  },
  {
    path: "/finance/students/fees",
    name: "Bill Payment",
    component: BillPayment,
  },
  {
    path: "/finance/banking",
    name: "Banking Details",
    exact: true,
    component: Banking,
  },
  {
    path: "/finance/payrow/calculator",
    name: "Paye Calculator",
    exact: true,
    component: PayeeCalculator,
  },
  {
    path: "/finance/staff/paydeductions",
    name: "Paye Deductions",
    exact: true,
    component: PayeDeductions,
  },
  {
    path: "/finance/bankadvice",
    name: "Bank Advice",
    exact: true,
    component: BankAdvice,
  },
  {
    path: "/finance/banking/add",
    name: "Banking Details Add",
    component: AddBank,
  },
  {
    path: "/finance/banking/edit/:id",
    name: "Banking Details Edit",
    component: EditBank,
  },
  {
    path: "/finance/banking/transaction/:id",
    name: "Banking Transaction",
    component: BankTransactions,
  },
  {
    path: "/finance/transactions/expenditure",
    name: "Record Payment",
    component: RecordExpenditure,
  },
  {
    path: "/finance/transactions/income",
    name: "Record Income",
    component: IncomeExpenditure,
  },
  {
    path: "/finance/transactions",
    name: "View Payment",
    exact: true,
    component: ViewPayment,
  },
  {
    path: "/canteen/payments",
    exact: true,
    name: "canteen",
    component: Canteen,
  },
  {
    path: "/canteen/members",
    exact: true,
    name: "canteen",
    component: CanteenMembers,
  },
  {
    path: "/canteen/members/register",
    name: "canteen",
    component: RegisterCanteen,
  },
  {
    path: "/canteen/members/edit/:id",
    name: "canteen",
    component: EditMember,
  },
  {
    path: "/canteen/payments/add",
    name: "canteen",
    exact: true,
    component: AddPayent,
  },
  {
    path: "/canteen/payments/plan",
    name: "canteen",
    component: PaymentPlan,
  },
  {
    path: "/canteen/payments/edit/:id",
    name: "canteen",
    component: EditPayment,
  },
  {
    path: "/finance/transactions/receipt/:id",
    name: " Payment Receipt",
    exact: true,
    component: PaymentReceipt,
  },
];

export default routes;
