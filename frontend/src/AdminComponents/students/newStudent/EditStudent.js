import React, { useState, useEffect } from "react";
import PersonalInfo from "../../shared/Personalnfo";
import Academics from "./AcademicsDetails";
import ContactDetails from "../../shared/Contact";
import ProfilePicture from "../../shared/ProfilePicture";
import Guadian from "../../shared/Guadian";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import GuadianCard from "../../shared/GuadianCard";
import moment from "moment";

function EditStudent() {
  const { id } = useParams();

  // const [studentDetails, setstudentDetails] = useState({});

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
  const [health, sethealth] = useState("");
  const [allege, setallege] = useState("");
  const [disease, setdisease] = useState("");

  const [profileUrl, setprofileUrl] = useState("");
  const [profileimg, setprofileimg] = useState("");
  const [loading, setloading] = useState(false);

  //form verification
  const { register, handleSubmit, errors } = useForm();

  //academics
  const [autoID, setautoID] = useState(true);
  const [userID, setuserID] = useState("");
  const [classID, setclass] = useState("");
  const [section, setsection] = useState("");
  const [status, setstatus] = useState(null);
  const [dormitory, setdormitory] = useState("");
  const [schoolarship, setschoolarship] = useState("");
  const [feesCategory, setfeesCategory] = useState("");
  const [lastSchool, setlastSchool] = useState("");
  const [division, setdivision] = useState("");
  const [campus, setcampus] = useState("");
  const [reasonforTransfer, setreasonforTransfer] = useState("");
  //contact details
  const [mobilenumber, setmobilenumber] = useState("");
  const [residence, setresidence] = useState("");
  const [telephone, settelephone] = useState("");
  const [postalAddress, setpostalAddress] = useState("");
  //guidan
  const [guadian, setguadian] = useState([]);

  useEffect(() => {
    axios.get(`/students/student/${id}`).then((res) => {
      let data = res.data.student;
      setname(data?.name);
      setlastname(data?.surname);
      setsecondName(data?.middleName);
      setgender(data?.gender);
      setdateofBirth(
        data?.dateofBirth ? moment(data?.dateofBirth).format("YYYY-MM-D") : " "
      );
      setemail(data?.email);
      setnationality(data?.nationality);
      setplaceofBirth(data?.placeofBirth);
      setreligion(data?.religion);
      sethealth(data?.health);
      setdivision(data?.division);
      setallege(data?.allege);
      setcampus(data?.campusID);
      setdisease(data?.disease);
      setclass(data?.classID);
      setsection(data?.section);
      setstatus(data?.status);
      setschoolarship(data?.scholarship);
      setdormitory(data?.dormitoryID);
      setschoolarship(data?.schoolarship);
      setfeesCategory(data?.fees);
      setlastSchool(data?.lastSchool?.school?.school?.school);
      setreasonforTransfer(data?.lastSchool?.school?.school?.reason);
      setmobilenumber(data?.mobilenumber);
      setresidence(data?.physicalAddress);
      settelephone(data?.telephone);
      setpostalAddress(data?.postalAddress);
      setguadian(data?.guadian);
      setprofileimg(data?.profileUrl);
    });
  }, [id]);

  const handleReset = (e) => {
    e.preventDefault();
    setautoID(true);
    setstatus("");
    setclass("");
    setsection("");
    setdormitory("");
    setschoolarship("");
    setfeesCategory("");
    setuserID("");
    setdisease("");
    setguadian([]);
    setreasonforTransfer("");
    settelephone("");
    setdivision("");
    setpostalAddress("");
    setresidence("");
    setmobilenumber("");
    setlastSchool("");
    setallege("");
    sethealth();
    setname("");
    setcampus("");
    setsecondName("");
    setlastname("");
    setgender("");
    setdateofBirth("");
    setemail("");
    setnationality("");
    setplaceofBirth("");
    setreligion("");
  };
  const handleCreateSubmit = async () => {
    setloading(true);
    const fileData = new FormData();

    var path = "";
    console.log(path, "path");
    if (profileUrl) {
      fileData.append("photo", profileUrl);
      path = await axios.post("/upload", { dataUrl: profileimg });
      // path = await axios.post("/upload", { fileData });
    }
    console.log(path, "path");
    await axios
      .put(`/students/update/${id}`, {
        profileUrl: path?.data?.url || profileimg,
        name,
        middleName: secondName,
        surname: lastname,
        gender,
        dateofBirth,
        email,
        nationality,
        religion,
        placeofBirth,
        health,
        disease,
        division,
        allege,
        classID,
        campusID: campus,
        section,
        dormitoryID: dormitory,
        status,
        scholarship: schoolarship,
        fees: feesCategory,
        lastSchool: {
          school: lastSchool,
          reason: reasonforTransfer,
        },
        mobilenumber,
        telephone,
        postalAddress,
        physicalAddress: residence,
        guadian,
      })
      .then(async (response) => {
        setloading(false);
        console.log(response);
        if (response.data.error) {
          return errorAlert(response.data.error);
        }
        successAlert("successfully updated");
        await axios.post("/activitylog/create", {
          activity: `student  ${name} ${lastname} was edited`,
          user: "admin",
        });
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        errorAlert("something went wrong");
      });
  };

  const handleChangeFile = (e) => {
    const selected = e.target.files[0];
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

  const handleDeleteGuadian = (ID) => {
    setguadian(guadian.filter((e) => e.id !== ID));
  };

  return (
    <div>
      <h2>Edit Students</h2>
      <div>
        <form action="" className="content__container">
          <ProfilePicture
            profileimg={profileimg}
            profileUrl={profileUrl}
            setprofileUrl={handleChangeFile}
          />
          <PersonalInfo
            register={register}
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
          <Academics
            register={register}
            errors={errors}
            isEdit={true}
            autoID={autoID}
            setautoID={setautoID}
            userID={userID}
            setuserID={setuserID}
            classID={classID}
            setclass={setclass}
            division={division}
            setdivision={setdivision}
            section={section}
            setsection={setsection}
            status={status}
            setstatus={setstatus}
            dormitory={dormitory}
            campus={campus}
            setcampus={setcampus}
            setdormitory={setdormitory}
            schoolarship={schoolarship}
            setschoolarship={setschoolarship}
            feesCategory={feesCategory}
            setfeesCategory={setfeesCategory}
            lastSchool={lastSchool}
            setlastSchool={setlastSchool}
            reasonforTransfer={reasonforTransfer}
            setreasonforTransfer={setreasonforTransfer}
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
          <Guadian guadian={guadian} setguadian={setguadian} />
          <div className="row">
            {guadian &&
              guadian.map((e, i) => (
                <div className="col-xs-12 col-sm-6">
                  <GuadianCard
                    guadian={e}
                    key={i}
                    handleDeleteGuadian={handleDeleteGuadian}
                  />
                </div>
              ))}
          </div>
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
                "Save Changes"
              )}
            </button>
            <button onClick={handleReset} className=" col btn blue__btn mr-5">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
