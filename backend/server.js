const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const ActivityRoutes = require("./routes/ActivityRoutes");
const AcademicYear = require("./routes/CurrentYearRoutes");
const StudentRoutes = require("./routes/StudentRoutes");
const PayrowRoutes = require("./routes/PayrowRoutes");
const AttendanceRoutes = require("./routes/AttendanceRoutes");
const ChatRoutes = require("./routes/ChatRoutes");
const CoursesRoutes = require("./routes/CoursesRoutes");
const ClassesRoutes = require("./routes/ClassesRoutes");
const CampusRoutes = require("./routes/CampusRoutes");
const CorrespondanceRoutes = require("./routes/CorrespondanceRoutes");
const YearGroupRoutes = require("./routes/YeargroupRoutes");
const CalendarRoutes = require("./routes/CalendarRoutes");
const DormitoriesRoutes = require("./routes/DormitoriesRoutes");
const PrefectsRoutes = require("./routes/PrefectsRoutes");
const FilesRoutes = require("./routes/FilesRoutes");
const NextofKinRoutes = require("./routes/NextofKinRoutes");
const NotificationRoutes = require("./routes/NotificationRoutes");
const TaskRoutes = require("./routes/TaskRoutes");
const Transactions = require("./routes/TransactionsRoutes");
const TeacherRoutes = require("./routes/TeacherRoutes");
const SchoolRoutes = require("./routes/SchoolRoutes");
const PaymentPlanRoutes = require("./routes/PaymentPlanRoutes");
const SharedRoutes = require("./routes/SharedRoutes");
const SSNITRoutes = require("./routes/SSNITRoutes");
const StaffPay = require("./routes/StaffPayRoutes");
const ScholarshipRoutes = require("./routes/ScholarshipRoutes");
const SectionRoutes = require("./routes/SectionRoutes");
const DepartmentsRoutes = require("./routes/DepartmentRoutes");
const DivisionRoutes = require("./routes/DivisionRoutes");
const DeductionsRoutes = require("./routes/DeductionsRoutes");
const UploadsRoutes = require("./routes/Uploads");
const CanteenRoutes = require("./routes/CanteenRouter");
const BankingRoutes = require("./routes/BankingRoutes");
const FeesRoutes = require("./routes/FeesRoutes");
const StoreItems = require("./routes/StoreItemsRoutes");
const StoreSales = require("./routes/StoreSalesRoutes");
const UsersRoutes = require("./routes/UsersRoutes");
const SBARoutes = require("./routes/SBARoutes");
const NonPaymentRoutes = require("./routes/NonBillPaymentRoutes");

const path = require("path");
//const __dirname = path.resolve(path.dirname(""));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/consumerPhotos"));
app.use(express.static("./public"));

//routes
app.get("/", (req, res) => {
  res.send("welcome to D-system api");
});

app.use("/api/students", StudentRoutes);
app.use("/api/activitylog", ActivityRoutes);
app.use("/api/attendance", AttendanceRoutes);
app.use("/api/academicyear", AcademicYear);
app.use("/api/chats", ChatRoutes);
app.use("/api/classes", ClassesRoutes);
app.use("/api/courses", CoursesRoutes);
app.use("/api/campuses", CampusRoutes);
app.use("/api/calendar", CalendarRoutes);
app.use("/api/correspondance", CorrespondanceRoutes);
app.use("/api/yeargroup", YearGroupRoutes);
app.use("/api/dormitories", DormitoriesRoutes);
app.use("/api/notes", FilesRoutes);
app.use("/api/nextofkin", NextofKinRoutes);
app.use("/api/notification", NotificationRoutes);
app.use("/api/tasks", TaskRoutes);
app.use("/api/transactions", Transactions);
app.use("/api/teachers", TeacherRoutes);
app.use("/api", SharedRoutes);
app.use("/api/scholarships", ScholarshipRoutes);
app.use("/api/staffpay", StaffPay);
app.use("/api/ssnit", SSNITRoutes);
app.use("/api/sections", SectionRoutes);
app.use("/api/school", SchoolRoutes);
app.use("/api/prefects", PrefectsRoutes);
app.use("/api/paymentplan", PaymentPlanRoutes);
app.use("/api/payrow", PayrowRoutes);
app.use("/api/upload", UploadsRoutes);
app.use("/api/departments", DepartmentsRoutes);
app.use("/api/divisions", DivisionRoutes);
app.use("/api/canteen", CanteenRoutes);
app.use("/api/banking", BankingRoutes);
app.use("/api/fees", FeesRoutes);
app.use("/api/store/items", StoreItems);
app.use("/api/store/sales", StoreSales);
app.use("/api/users", UsersRoutes);
app.use("/api/sba", SBARoutes);
app.use("/api/deductions", DeductionsRoutes);
app.use("/api/nonbillpayment", NonPaymentRoutes);

app.listen(PORT, () => {
  return console.log(`listening on port ${PORT}`);
});
