import React, { useState, useEffect } from "react";
import PersonalInfo from "../../shared/Personalnfo";
import EmplymentDetails from "./EmploymentDetails";
import ContactDetails from "../../shared/Contact";
import ProfilePicture from "../../shared/ProfilePicture";
import NextofKin from "../../shared/NextofKin";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "../../../store/axios";
import moment from "moment";
import { errorAlert, successAlert } from "../../../utils";
import { useSelector, useDispatch } from "react-redux";
import { selectStaff, setStaff } from "../../../store/slices/schoolSlice";
import imageCompression from "browser-image-compression";

function EditStaff() {
  const { id } = useParams();
  const [details, setdetails] = useState({});
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

  const [profileUrl, setprofileUrl] = useState("");
  const [profileimg, setprofileimg] = useState("");

  const dispatch = useDispatch();
  const staff = useSelector(selectStaff);

  const options = {
    maxSizeMB: 1,
  };

  //form verification
  const { register, handleSubmit, errors } = useForm();

  //EmplymentDetails
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [campus, setCampus] = useState("");
  const [employmentDate, setemploymentDate] = useState(null);
  const [accountNumber, setaccountNumber] = useState("");
  const [bank, setbank] = useState("");
  const [qualification, setqualification] = useState("");
  const [years, setyears] = useState("");
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

  useEffect(() => {
    axios.get(`/teachers/${id}`).then((res) => {
      let data = res.data.teacher;
      setdetails(data);
      setname(data?.name);
      setlastname(data?.surname);
      setgender(data?.gender);
      setsecondName(data?.middleName);
      setdateofBirth(
        data?.dateofBirth ? moment(data?.dateOfBirth).format("YYYY-MM-D") : ""
      );
      setprofileimg(data?.profileUrl);
      setemail(data?.email);
      setnationality(data?.nationality);
      setplaceofBirth(data?.placeOfBirth);
      setreligion(data?.religion);
      settitle(data?.title);
      sethealth(data?.health);
      setallege(data?.allege);
      setdisease(data?.disease);
      setssnit(data?.ssnit);
      settaxNumber(data?.taxNumber);
      setsalary(data?.salary);
      setallowance(data?.allowance);
      setRole(data?.position);
      setDepartment(data?.department);
      setCampus(data?.campus);
      setemploymentDate(data?.employmentDate);
      setqualification(data?.qualification);
      setyears(data?.years);
      setbank(data?.bank);
      setaccountNumber(data?.accountNumber);
      setmobilenumber(data?.mobilenumber);
      setresidence(data?.physicalAddress);
      settelephone(data?.telephone);
      setpostalAddress(data?.postalAddress);
      setnexttelephone(data?.nextofKin?.mobile);
      setnextemail(data.nextofKin?.email);
      setnextlastname(data.nextofKin?.lastname);
      setnextname(data.nextofKin?.name);
      setaddress(data.nextofKin?.address);
      setoccupation(data.nextofKin?.occupation);
      setrelationship(data.nextofKin?.relationship);
    });
  }, [id]);

  const handleReset = (data) => {
    setname(data?.name);
    setlastname(data?.surname);
    setgender(data?.gender);
    setsecondName(data?.middleName);
    setdateofBirth(data?.dateofBirth);
    setemail(data?.email);
    setnationality(data?.nationality);
    setplaceofBirth(data?.placeofBirth);
    setreligion(data?.religion);
    settitle(data?.title);
    setRole(data?.position);
    setDepartment(data?.department);
    setCampus(data?.campus);
    setemploymentDate(data?.employmentDate);
    setqualification(data?.qualification);
    setyears(data?.years);
    setaccountNumber(data?.accountNumber);
    setbank(data?.bank);
    setmobilenumber(data?.telephone);
    setresidence(data?.physicalAddress);
    settelephone(data?.mobile);
    setpostalAddress(data?.postalAddress);
    setnexttelephone(data?.nextofKin?.mobile);
    setnextemail(data.nextofKin?.email);
    setnextlastname(data.nextofKin?.name);
    setnextname(data.nextofKin?.name);
    setaddress(data.nextofKin?.address);
    setoccupation(data.nextofKin?.occupation);
    setrelationship(data.nextofKin?.relationship);
  };

  console.log(telephone);

  const handleCreateSubmit = async () => {
    setloading(true);
    const fileData = new FormData();
    let path = profileimg;
    if (profileUrl) {
      fileData.append("photo", profileUrl);
      const fileResponse = await axios.post("/upload", { dataUrl: profileimg });
      path = fileResponse.data.url;
    }
    axios
      .put(`/teachers/update/${id}`, {
        profileUrl: path,
        name,
        middleName: secondName,
        surname: lastname,
        gender,
        dateOfBirth: dateofBirth,
        title,
        email,
        nationality,
        religion,
        placeOfBirth: placeofBirth,
        health,
        disease,
        campusID: campus,
        department,
        allege,
        allowance,
        salary,
        ssnit,
        taxNumber,
        bank,
        accountNumber,
        years,
        employmentDate,
        position: role,
        mobilenumber,
        telephone,
        qualifications: qualification,
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
      .then(async (res) => {
        setloading(false);
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        setdetails(res.data.teacher);
        successAlert("changes successfully saved");
        dispatch(
          setStaff(staff.map((i) => (i?.userID === id ? res.data.doc : i)))
        );
        await axios.post("/activitylog/create", {
          activity: `staff member  ${name} ${lastname} was edited`,
          user: "admin",
        });
      })
      .catch((err) => {
        console.log(err);
        errorAlert("Something went wrong");
        setloading(false);
      });
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
      <h2>Edit Staff Member</h2>
      <div>
        <form action="" className="content__container">
          <ProfilePicture
            profileUrl={profileUrl}
            profileimg={profileimg}
            setprofileUrl={handleChangeFile}
          />
          <PersonalInfo
            register={register}
            title={title}
            setTitle={settitle}
            isTeacher={true}
            errors={errors}
            setHealthCon={sethealth}
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
            disease={disease}
            setDisease={setdisease}
            setallerge={setallege}
            allerge={allege}
          />
          <br className="my-4" />
          <EmplymentDetails
            register={register}
            errors={errors}
            role={role}
            bank={bank}
            setbank={setbank}
            accountNumber={accountNumber}
            setaccountNumber={setaccountNumber}
            ssnit={ssnit}
            setssnit={setssnit}
            salary={salary}
            setsalary={setsalary}
            allowance={allowance}
            setallowance={setallowance}
            taxNumber={taxNumber}
            settaxNumber={settaxNumber}
            setRole={setRole}
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
          />
          <br className="my-4" />
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
          <br className="my-4" />
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
          <br className="my-4" />

          <div className="row ">
            <button
              type="submit"
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
            <button
              onClick={(e) => {
                e.preventDefault();
                handleReset(details);
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

export default EditStaff;
