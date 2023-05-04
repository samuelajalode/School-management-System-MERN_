import React from "react";

const Dashboard = React.lazy(() =>
  import("../../AdminComponents/dashboard/Index")
);
const Settings = React.lazy(() =>
  import("../../AdminComponents/settings/SettingsPage")
);
const Profile = React.lazy(() =>
  import("../../AdminComponents/Profile/Profile")
);

const Notifications = React.lazy(() =>
  import("../../AdminComponents/notifications/NotificationsPage")
);

//message
const Messages = React.lazy(() =>
  import("../../AdminComponents/messages/inbox/Messaging")
);
const Chat = React.lazy(() => import("../../AdminComponents/messages/Chat"));
const GuadianMessages = React.lazy(() =>
  import("../../AdminComponents/messages/GuadianMessage")
);
const StaffMessages = React.lazy(() =>
  import("../../AdminComponents/messages/StaffMessage")
);
const StudentMessage = React.lazy(() =>
  import("../../AdminComponents/messages/StudentMessage")
);
const BillReminder = React.lazy(() =>
  import("../../AdminComponents/messages/BillReminder")
);
const BulkMessages = React.lazy(() =>
  import("../../AdminComponents/messages/BulkMessage")
);

//academics
const Calender = React.lazy(() =>
  import("../../AdminComponents/academics/calender/Calender")
);
const AddCalenderEvent = React.lazy(() =>
  import("../../AdminComponents/academics/calender/AddEventCalender")
);
const EditCalenderEvent = React.lazy(() =>
  import("../../AdminComponents/academics/calender/EditCalenderEvent")
);
const Classes = React.lazy(() =>
  import("../../AdminComponents/academics/classes/Classes")
);
const ClassesPast = React.lazy(() =>
  import("../../AdminComponents/academics/classes/PastClasses")
);
const AddClass = React.lazy(() =>
  import("../../AdminComponents/academics/classes/AddClass")
);
const EditClass = React.lazy(() =>
  import("../../AdminComponents/academics/classes/EditClass")
);
const ClassGroup = React.lazy(() =>
  import("../../AdminComponents/academics/classGroups/Classgroup")
);
const Courses = React.lazy(() =>
  import("../../AdminComponents/academics/courses/Courses")
);
const AddCourse = React.lazy(() =>
  import("../../AdminComponents/academics/courses/AddCourses")
);
const EditCourse = React.lazy(() =>
  import("../../AdminComponents/academics/courses/EditCourse")
);
const Notes = React.lazy(() =>
  import("../../AdminComponents/academics/notes/Notes")
);
const AddNote = React.lazy(() =>
  import("../../AdminComponents/academics/notes/AddNote")
);
const EditNote = React.lazy(() =>
  import("../../AdminComponents/academics/notes/EditNote")
);
const ViewCalendar = React.lazy(() =>
  import("../../AdminComponents/academics/calender/ViewCalendar")
);

const YearGroups = React.lazy(() =>
  import("../../AdminComponents/academics/yearGroups/YearGroups")
);

const Divisions = React.lazy(() =>
  import("../../AdminComponents/academics/divisions/Divisions")
);

const Departments = React.lazy(() =>
  import("../../AdminComponents/academics/departments/Departments")
);

const Correspondence = React.lazy(() =>
  import("../../AdminComponents/academics/correspondances/Correspondances")
);
const AddCorrespondence = React.lazy(() =>
  import("../../AdminComponents/academics/correspondances/AddCorrespondance")
);
const EditCorrespondence = React.lazy(() =>
  import("../../AdminComponents/academics/correspondances/EditCorrespondance")
);

const ViewCorrespondence = React.lazy(() =>
  import("../../AdminComponents/academics/correspondances/ViewCorrespondance")
);

const ProgressReports = React.lazy(() =>
  import("../../AdminComponents/academics/progressReports/ProgressReports")
);

const ProgressReportCard = React.lazy(() =>
  import("../../AdminComponents/academics/progressReports/ReportCard")
);

const CombinedReports = React.lazy(() =>
  import("../../AdminComponents/academics/combinedReports/CombinedReports")
);
const SBA = React.lazy(() => import("../../AdminComponents/academics/sba/SBA"));

//students
const AllStudents = React.lazy(() =>
  import("../../AdminComponents/students/allStudents/AllStudents")
);
const Upgrade = React.lazy(() =>
  import("../../AdminComponents/students/upGrade/Upgrade")
);

const Campuses = React.lazy(() =>
  import("../../AdminComponents/students/campuses/Campuses")
);
const Dormitories = React.lazy(() =>
  import("../../AdminComponents/students/dormitories/Dormitories")
);
const NewStudent = React.lazy(() =>
  import("../../AdminComponents/students/newStudent/NewStudent")
);
const Prefects = React.lazy(() =>
  import("../../AdminComponents/students/prefects/Prefects")
);
const Section = React.lazy(() =>
  import("../../AdminComponents/students/section/Section")
);
const Scholarships = React.lazy(() =>
  import("../../AdminComponents/students/schoolarship/Scholarships")
);
const StudentDetails = React.lazy(() =>
  import("../../AdminComponents/students/studentDetails/StudentDetails")
);
const EditStudent = React.lazy(() =>
  import("../../AdminComponents/students/newStudent/EditStudent")
);

//staff
const AddStaff = React.lazy(() =>
  import("../../AdminComponents/staff/addStaff/AddStaffPage")
);
const Staff = React.lazy(() => import("../../AdminComponents/staff/AllStaff"));
const StaffDetails = React.lazy(() =>
  import("../../AdminComponents/staff/StaffDetails")
);
const EditStaff = React.lazy(() =>
  import("../../AdminComponents/staff/addStaff/EditStaff")
);

//finance
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

//attendance
const StudentsAttendanceHistory = React.lazy(() =>
  import(
    "../../AdminComponents/attendance/StudentAttendance/StudentsAttendanceHistory"
  )
);
const StudentAttendanceRegister = React.lazy(() =>
  import(
    "../../AdminComponents/attendance/StudentAttendance/StudentsAttendanceRegister"
  )
);
const StaffAttendanceHistory = React.lazy(() =>
  import(
    "../../AdminComponents/attendance/StaffAttendance/StaffAttendanceHistory"
  )
);
const StaffAttendanceRegister = React.lazy(() =>
  import(
    "../../AdminComponents/attendance/StaffAttendance/StaffAttendanceRegister"
  )
);
const EditStudentAttendance = React.lazy(() =>
  import("../../AdminComponents/attendance/StudentAttendance/EditAttendance")
);
const EditStaffAttendance = React.lazy(() =>
  import("../../AdminComponents/attendance/StaffAttendance/EditStaffAttendance")
);

const PaySlip = React.lazy(() =>
  import("../../AdminComponents/finance/staffPayrow/PaySlip")
);

const BankAdvice = React.lazy(() =>
  import("../../AdminComponents/finance/bankAdvice/Advice")
);

const PayeDeductions = React.lazy(() =>
  import("../../AdminComponents/finance/payeeDeductions/Deductions")
);

const PastStudents = React.lazy(() =>
  import("../../AdminComponents/students/pastStudents/PastStudents")
);

const WithdrawStudents = React.lazy(() =>
  import("../../AdminComponents/students/withdrawnStudents/WithdrawnStudents")
);

//store
const Store = React.lazy(() =>
  import("../../AdminComponents/store/store/Store")
);

//sale
const Sales = React.lazy(() =>
  import("../../AdminComponents/store/sales/Sales")
);

const SalesReceipt = React.lazy(() =>
  import("../../AdminComponents/store/sales/Receipt")
);

const Inventory = React.lazy(() =>
  import("../../AdminComponents/store/inventory/Inventory")
);

const Reports = React.lazy(() =>
  import("../../AdminComponents/store/reports/Reports")
);

const NonBillReports = React.lazy(() =>
  import("../../AdminComponents/Profile/financialReports/NonBillPayment")
);

const ReportReceipt = React.lazy(() =>
  import("../../AdminComponents/store/reports/PaymentsReceipt")
);

//reports
const BillPaymentReports = React.lazy(() =>
  import("../../AdminComponents/Profile/financialReports/BillPaymentReports")
);
const NonBillPaymentReports = React.lazy(() =>
  import("../../AdminComponents/Profile/financialReports/NonBillPayment")
);

const ItemizedBillPaymentReports = React.lazy(() =>
  import("../../AdminComponents/Profile/financialReports/ItemizedPayment")
);

const ExpenditureReports = React.lazy(() =>
  import("../../AdminComponents/Profile/financialReports/ExpenditureReports")
);

const SupplementaryIncomeReports = React.lazy(() =>
  import("../../AdminComponents/Profile/financialReports/SupplementaryIncome")
);

const IncomeStatement = React.lazy(() =>
  import("../../AdminComponents/Profile/financialReports/IncomeStatement")
);

const ExpectedRevenueReports = React.lazy(() =>
  import("../../AdminComponents/Profile/financialReports/ExpectedRevenueReport")
);

const StudentPaymentReports = React.lazy(() =>
  import("../../AdminComponents/Profile/financialReports/StudentPaymentHistory")
);

const ClassLedgerReports = React.lazy(() =>
  import("../../AdminComponents/Profile/financialReports/ClassLedger")
);

const CancelPaymentReports = React.lazy(() =>
  import("../../AdminComponents/Profile/financialReports/CanceledPayment")
);

const TellerReports = React.lazy(() =>
  import("../../AdminComponents/Profile/financialReports/TellerReports")
);

const AcademicTransripts = React.lazy(() =>
  import("../../AdminComponents/Profile/academicsReports/AcademicTranscripts")
);

const AdmissionReport = React.lazy(() =>
  import("../../AdminComponents/Profile/academicsReports/AdmissionReport")
);

const ClassGroupTerminalReport = React.lazy(() =>
  import(
    "../../AdminComponents/Profile/academicsReports/ClassGroupTerminalReports"
  )
);

const ClassTerminalReport = React.lazy(() =>
  import("../../AdminComponents/Profile/academicsReports/ClassTerminalReports")
);

const EndofYearReport = React.lazy(() =>
  import("../../AdminComponents/Profile/academicsReports/EndofYearReport")
);

const EnrollmentStatics = React.lazy(() =>
  import("../../AdminComponents/Profile/academicsReports/EnrollmentStatics")
);

const YearGroupTerminalReport = React.lazy(() =>
  import(
    "../../AdminComponents/Profile/academicsReports/YearGroupTerminalReport"
  )
);

const NonDebtorsReports = React.lazy(() =>
  import("../../AdminComponents/Profile/financialReports/NonDebtorsReport")
);

const ManageUsers = React.lazy(() =>
  import("../../AdminComponents/users/ManageUsers")
);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    exact: true,
    component: Dashboard,
  },
  {
    path: "/reports",
    name: "Admin Profile",
    exact: true,
    component: Profile,
  },
  {
    path: "/reports/academic",
    name: "Academic Transcripts",
    component: AcademicTransripts,
  },
  {
    path: "/reports/admission",
    name: "Academic Admission Report",
    component: AdmissionReport,
  },
  {
    path: "/reports/classgroupterminal",
    name: "Class Group Terminal Report",
    component: ClassGroupTerminalReport,
  },
  {
    path: "/reports/classterminal",
    name: "Class Terminal Report",
    component: ClassTerminalReport,
  },
  {
    path: "/reports/endofyear",
    name: "End of Year Report",
    component: EndofYearReport,
  },
  {
    path: "/reports/enrollmentstatics",
    name: "Enrollment Statics",
    component: EnrollmentStatics,
  },
  {
    path: "/reports/enrollmentstatics",
    name: "Enrollment Statics",
    component: EnrollmentStatics,
  },
  {
    path: "/reports/yeargroupterminal",
    name: "Year Group Terminal Report",
    component: YearGroupTerminalReport,
  },
  {
    path: "/reports/billpayment",
    name: "Bill Payment Report",
    component: BillPaymentReports,
  },
  {
    path: "/reports/nonbillpayment",
    name: "Non Bill Payment Report",
    component: NonBillPaymentReports,
  },
  {
    path: "/reports/itemizedbillpayment",
    name: "Itemized Bill Payment Summary",
    component: ItemizedBillPaymentReports,
  },
  {
    path: "/reports/expenditure",
    name: "Expenditure Report",
    component: ExpenditureReports,
  },
  {
    path: "/reports/supplementaryincome",
    name: "Supplementary Income Report",
    component: SupplementaryIncomeReports,
  },
  {
    path: "/reports/incomestatement",
    name: "Income Statement",
    component: IncomeStatement,
  },
  {
    path: "/reports/expectedrevenue",
    name: "Expected Revenue Report",
    component: ExpectedRevenueReports,
  },
  {
    path: "/reports/studentpaymentshistory",
    name: "Student Payments History",
    component: StudentPaymentReports,
  },
  {
    path: "/reports/classledger",
    name: "Class Ledger Report",
    component: ClassLedgerReports,
  },
  {
    path: "/reports/canceledpayments",
    name: "Canceled Payments",
    component: CancelPaymentReports,
  },
  {
    path: "/reports/teller",
    name: "Teller Reports",
    component: TellerReports,
  },
  {
    path: "/reports/nondebtors",
    name: " Debtors Reports",
    component: NonDebtorsReports,
  },
  {
    path: "/profile",
    name: "Manage User",
    exact: true,
    component: ManageUsers,
  },

  {
    path: "/store/sales",
    name: "Sales",
    exact: true,
    component: Sales,
  },
  {
    path: "/store/sales/receipt/:id",
    name: "Sales Receipt",
    component: SalesReceipt,
  },
  {
    path: "/store",
    name: "Store",
    exact: true,
    component: Store,
  },
  {
    path: "/store/inventory",
    name: "Store Inventory",
    exact: true,
    component: Inventory,
  },
  {
    path: "/store/reports",
    name: "Store Reports",
    exact: true,
    component: Reports,
  },
  {
    path: "/reports/finance/nonbill",
    name: "Non Bill Payment Reports",
    exact: true,
    component: NonBillReports,
  },
  {
    path: "/store/reports/receipt/:id",
    name: "Sales Report",
    component: ReportReceipt,
  },
  {
    path: "/attendance/students",
    name: "Attendance Students",
    exact: true,
    component: StudentsAttendanceHistory,
  },
  {
    path: "/attendance/staff",
    name: "Attendance Staff",
    exact: true,
    component: StaffAttendanceHistory,
  },
  {
    path: "/attendance/students/register",
    name: "Attendance Students Register",
    component: StudentAttendanceRegister,
  },
  {
    path: "/attendance/students/edit/:classID/:id",
    name: "Attendance Students Register",
    component: EditStudentAttendance,
  },
  {
    path: "/attendance/staff/register",
    name: "Attendance Staff Register",
    component: StaffAttendanceRegister,
  },
  {
    path: "/attendance/staff/edit/:id",
    name: "Attendance Staff Register",
    component: EditStaffAttendance,
  },
  {
    path: "/academics/calender",
    name: "Calendar",
    exact: true,
    component: Calender,
  },
  {
    path: "/academics/calender/view",
    name: "View Calendar",
    exact: true,
    component: ViewCalendar,
  },
  {
    path: "/academics/calender",
    name: "Calendar",
    exact: true,
    component: Calender,
  },
  {
    path: "/academics/calender/add",
    name: "Add Calendar",
    exact: true,
    component: AddCalenderEvent,
  },
  {
    path: "/academics/calender/edit/:id",
    name: "Edit Calendar",
    component: EditCalenderEvent,
  },
  {
    path: "/academics/classes",
    name: "Classes",
    exact: true,
    component: Classes,
  },
  {
    path: "/academics/classgroups",
    name: "Class Group",
    component: ClassGroup,
  },
  {
    path: "/academics/classes/add",
    name: "Classes",
    component: AddClass,
  },
  {
    path: "/academics/classes/past",
    name: "Past Classes",
    component: ClassesPast,
  },
  {
    path: "/academics/classes/edit/:id",
    name: "Classes",
    component: EditClass,
  },
  {
    path: "/academics/courses",
    name: "Courses",
    exact: true,
    component: Courses,
  },
  {
    path: "/academics/courses/add",
    name: "Add Courses",
    component: AddCourse,
  },
  {
    path: "/academics/courses/edit/:id",
    name: "Edit Courses",
    component: EditCourse,
  },
  {
    path: "/academics/notes",
    name: "Notes",
    exact: true,
    component: Notes,
  },
  {
    path: "/academics/notes/add",
    name: "Add Note",
    exact: true,
    component: AddNote,
  },
  {
    path: "/academics/notes/edit/:id",
    name: "Edit Note",
    component: EditNote,
  },
  {
    path: "/academics/divisions",
    name: "Divisions",
    component: Divisions,
  },
  {
    path: "/academics/departments",
    name: "Departments",
    component: Departments,
  },
  {
    path: "/academics/yeargroups",
    name: "Year Groups",
    component: YearGroups,
  },
  {
    path: "/academics/correspondance",
    name: "Correspondences",
    exact: true,
    component: Correspondence,
  },
  {
    path: "/academics/correspondance/add",
    name: "Add Correspondence",
    component: AddCorrespondence,
  },
  {
    path: "/academics/correspondance/edit/:id",
    name: "Edit Correspondence",
    component: EditCorrespondence,
  },
  {
    path: "/academics/correspondance/view/:id",
    name: "View Correspondence",
    component: ViewCorrespondence,
  },
  {
    path: "/academics/sba",
    name: "SBA",
    component: SBA,
  },
  {
    path: "/academics/combinedreports",
    name: "Combined Reports",
    component: CombinedReports,
  },
  {
    path: "/academics/progressreports",
    name: "Progress Reports",
    exact: true,
    component: ProgressReports,
  },
  {
    path: "/academics/progressreports/report/:id/:year/:term",
    name: "Progress Report Card",
    component: ProgressReportCard,
  },
  {
    path: "/students",
    name: "Students",
    exact: true,
    component: AllStudents,
  },
  {
    path: "/students/paststudents",
    name: "Past Students",
    exact: true,
    component: PastStudents,
  },
  {
    path: "/students/withdrawstudents",
    name: "Past Students",
    exact: true,
    component: WithdrawStudents,
  },
  {
    path: "/students/campus",
    name: "Campuses",
    component: Campuses,
  },
  {
    path: "/students/dormitories",
    name: "Dormitories",
    component: Dormitories,
  },
  {
    path: "/students/new",
    name: "New Student",
    component: NewStudent,
  },
  {
    path: "/students/edit/:id",
    name: "Edit Student",
    component: EditStudent,
  },
  {
    path: "/students/prefects",
    name: "Prefects",
    component: Prefects,
  },
  {
    path: "/students/section",
    name: "Section",
    component: Section,
  },
  {
    path: "/students/upgrade",
    name: "Upgrade",
    component: Upgrade,
  },
  {
    path: "/students/scholarships",
    name: "Scholarships",
    component: Scholarships,
  },
  {
    path: "/students/:id",
    name: "Student Details ",
    component: StudentDetails,
  },
  {
    path: "/staff",
    name: "All Staff ",
    exact: true,
    component: Staff,
  },
  {
    path: "/staff/new",
    name: "New Staff ",
    component: AddStaff,
  },
  {
    path: "/staff/edit/:id",
    name: " Staff Edit",
    component: EditStaff,
  },
  {
    path: "/staff/:id",
    name: "Staff Details ",
    component: StaffDetails,
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
    path: "/finance/transactions/receipt/:id",
    name: " Payment Receipt",
    exact: true,
    component: PaymentReceipt,
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
    path: "/messages",
    exact: true,
    name: "Messages",
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
    exact: true,
    name: "Messages",
    component: Chat,
  },
  {
    path: "/message/:id",
    name: "Message",
    component: Messages,
  },
  {
    path: "/messages/students",
    exact: true,
    name: "Student Messages",
    component: StudentMessage,
  },
  {
    path: "/messages/staff",
    name: "Staff Messages",
    exact: true,
    component: StaffMessages,
  },
  {
    path: "/messages/guadian",
    name: "Guadian Messages",
    exact: true,
    component: GuadianMessages,
  },
  {
    path: "/messages/billreminder",
    name: "Bill Reminder",
    exact: true,
    component: BillReminder,
  },
  {
    path: "/messages/group",
    name: "Group Message",
    exact: true,
    component: BulkMessages,
  },

  {
    path: "/notifications",
    name: "Notifications",
    component: Notifications,
  },
  {
    path: "/settings",
    name: "Acoount Settings",
    component: Settings,
  },
];

export default routes;
