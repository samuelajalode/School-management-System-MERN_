import React, { useState } from "react";
import PersonalInfo from "../../shared/Personalnfo";
import EmplymentDetails from "./EmploymentDetails";
import ContactDetails from "../../shared/Contact";
import ProfilePicture from "../../shared/ProfilePicture";
import NextofKin from "../../shared/NextofKin";
import { useForm } from "react-hook-form";
import { errorAlert, successAlert } from "../../../utils";
import axios from "../../../store/axios";
import { useSelector, useDispatch } from "react-redux";
import { selectStaff, setStaff } from "../../../store/slices/schoolSlice";
import imageCompression from "browser-image-compression";

function NewStaff() {
  //personal
  const [name, setname] = useState("");
  const [lastname, setlastname] = useState("");
  const [secondName, setsecondName] = useState("");
  const [gender, setgender] = useState("");
  const [dateofBirth, setdateofBirth] = useState("");
  const [email, setemail] = useState("");
  const [nationality, setnationality] = useState("");
  const [placeofBirth, setplaceofBirth] = useState("");
  const [religion, setreligion] = useState("");
  const [title, settitle] = useState("");
  const [health, sethealth] = useState("");
  const [allege, setallege] = useState("");
  const [disease, setdisease] = useState("");
  const [loading, setloading] = useState("");
  const dispatch = useDispatch();
  const staff = useSelector(selectStaff);

  const [profileUrl, setprofileUrl] = useState("");
  const [profileimg, setprofileimg] = useState("");

  //form verification
  const { register, handleSubmit, errors } = useForm();

  //EmplymentDetails
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [campus, setCampus] = useState("");
  const [employmentDate, setemploymentDate] = useState("");
  const [qualification, setqualification] = useState("");
  const [years, setyears] = useState("");

  const [accountNumber, setaccountNumber] = useState("");
  const [bank, setbank] = useState("");
  const [ssnit, setssnit] = useState(false);
  const [taxNumber, settaxNumber] = useState("");
  const [salary, setsalary] = useState("");
  const [allowance, setallowance] = useState("");

  //contact details
  const [mobilenumber, setmobilenumber] = useState("");
  const [residence, setresidence] = useState("");
  const [telephone, settelephone] = useState("");
  const [postalAddress, setpostalAddress] = useState("");

  //guidan
  const [nexttelephone, setnexttelephone] = useState("");
  const [nextname, setnextname] = useState("");
  const [nextlastname, setnextlastname] = useState("");
  const [nextemail, setnextemail] = useState("");
  const [relationship, setrelationship] = useState("");
  const [occupation, setoccupation] = useState("");
  const [address, setaddress] = useState("");

  const handleReset = () => {
    setname("");
    setRole("");
    setsecondName("");
    setDepartment("");
    setlastname("");
    setCampus("");
    setgender("");
    setemploymentDate("");
    setdateofBirth("");
    setqualification("");
    setemail("");
    setyears("");
    setaccountNumber("");
    setnationality("");
    setbank("");
    setplaceofBirth("");
    sethealth("");
    setreligion("");
    setallege("");
    settitle("");
    setdisease("");
    setprofileUrl("");
    setloading("");
    setprofileimg("");
    setssnit(false);
    settaxNumber("");
    setallowance("");
    setsalary("");
    setmobilenumber("");
    setresidence("");
    settelephone("");
    setpostalAddress("");
    setnexttelephone("");
    setnextname("");
    setnextlastname("");
    setnextemail("");
    setrelationship("");
    setoccupation("");
    setaddress("");
  };

  const handleCoursesCheckbox = (e) => {
    console.log(e, "ckecked");
  };

  const handleCreateSubmit = async () => {
    const fileData = new FormData();
    let path = "";
    if (profileUrl) {
      fileData.append("photo", profileUrl);
      const fileResponse = await axios.post("/upload", { dataUrl: profileimg });
      // axios.post("/upload", fileData, {}).then((res) => {
      path = fileResponse.data.url;
    }
    axios
      .post("/teachers/create", {
        profileUrl: path,
        name,
        middleName: secondName,
        surname: lastname,
        gender,
        title,
        dateofBirth,
        email,
        nationality,
        religion,
        placeofBirth,
        bank,
        accountNumber,
        qualifications: qualification,
        campusID: campus,
        employmentDate,
        health,
        disease,
        allege,
        allowance,
        department,
        years,
        salary,
        ssnit,
        taxNumber,
        position: role,
        mobilenumber,
        telephone,
        postalAddress,
        physicalAddress: residence,
        nextofKin: {
          name: nextname,
          relationship: relationship,
          occupation: occupation,
          email: nextemail,
          mobile: nexttelephone,
          address: address,
          lastname: nextlastname,
        },
      })
      .then(async (response) => {
        setloading(false);
        if (response.data.error) {
          errorAlert(response.data.error);
          return 0;
        }
        dispatch(setStaff([response.data.teacher, ...staff]));
        await axios.post("/activitylog/create", {
          activity: `staff member ${name} ${lastname} was created`,
          user: "admin",
        });
        handleReset();
        successAlert("successfully added");
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        errorAlert("something went wrong");
      });
  };

  const options = {
    maxSizeMB: 1,
  };

  const handleChangeFile = async (e) => {
    const selected = await imageCompression(e.target.files[0], options);
    if (selected?.size > 2000000) {
      errorAlert("image is too large");
    } else if (selected) {
      setprofileUrl(selected);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selected);
      fileReader.onloadend = () => {
        setprofileimg(fileReader.result);
      };
    } else {
      console.log("no file selected");
    }
  };

  return (
    <div>
      <h2>Add New Staff Member</h2>
      <div>
        <form action="" className="content__container">
          <ProfilePicture
            profileimg={profileimg}
            profileUrl={profileUrl}
            setprofileUrl={handleChangeFile}
          />
          <PersonalInfo
            register={register}
            title={title}
            setTitle={settitle}
            isTeacher={true}
            errors={errors}
            name={name}
            setname={setname}
            secondName={secondName}
            setsecondName={setsecondName}
            lastname={lastname}
            setlastname={setlastname}
            gender={gender}
            setgender={setgender}
            dateofBirth={dateofBirth}
            setdateofBirth={setdateofBirth}
            email={email}
            setemail={setemail}
            nationality={nationality}
            setnationality={setnationality}
            placeofBirth={placeofBirth}
            setplaceofBirth={setplaceofBirth}
            religion={religion}
            setreligion={setreligion}
            healthCon={health}
            setHealthCon={sethealth}
            disease={disease}
            setDisease={setdisease}
            allerge={allege}
            setallerge={setallege}
          />
          <br className="my-5" />
          <EmplymentDetails
            register={register}
            errors={errors}
            role={role}
            bank={bank}
            setbank={setbank}
            accountNumber={accountNumber}
            setaccountNumber={setaccountNumber}
            setRole={setRole}
            ssnit={ssnit}
            setssnit={setssnit}
            salary={salary}
            setsalary={setsalary}
            allowance={allowance}
            setallowance={setallowance}
            taxNumber={taxNumber}
            settaxNumber={settaxNumber}
            department={department}
            setDepartment={setDepartment}
            campus={campus}
            setCampus={setCampus}
            employmentDate={employmentDate}
            setemploymentDate={setemploymentDate}
            qualification={qualification}
            setqualification={setqualification}
            years={years}
            setyears={setyears}
            handleCoursesCheckbox={handleCoursesCheckbox}
          />
          <br className="my-5" />
          <ContactDetails
            register={register}
            errors={errors}
            mobilenumber={mobilenumber}
            setmobilenumber={setmobilenumber}
            residence={residence}
            setresidence={setresidence}
            settelephone={settelephone}
            telephone={telephone}
            setpostalAddress={setpostalAddress}
            postalAddress={postalAddress}
          />
          <br className="my-5" />
          <NextofKin
            lastname={nextlastname}
            setlastname={setnextlastname}
            name={nextname}
            setname={setnextname}
            errors={errors}
            register={register}
            telephone={nexttelephone}
            settelephone={setnexttelephone}
            email={nextemail}
            setemail={setnextemail}
            setaddress={setaddress}
            address={address}
            occupation={occupation}
            setoccupation={setoccupation}
            relationship={relationship}
            setrelationship={setrelationship}
          />

          <br className="my-5" />
          <div className="row ">
            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit(handleCreateSubmit)}
              className=" col btn orange__btn mr-5"
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Loading...</span>
                </>
              ) : (
                "Create"
              )}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
              className=" col btn blue__btn"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewStaff;
