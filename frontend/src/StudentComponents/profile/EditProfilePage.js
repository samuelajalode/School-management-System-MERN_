import React, { useState, useEffect } from "react";
import PersonalInfo from "../../AdminComponents/shared/Personalnfo";
import Contact from "../../AdminComponents/shared/Contact";
import Guadian from "../../AdminComponents/shared/Guadian";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import axios from "../../store/axios";
import { useForm } from "react-hook-form";
import moment from "moment";
import GuadianCard from "../../AdminComponents/shared/GuadianCard";
import { errorAlert, successAlert } from "../../utils";

function EditProfilePage() {
  const { register, handleSubmit, errors } = useForm();
  const user = useSelector(selectUser);
  const [name, setname] = useState("");
  const [studentDetails, setstudentDetails] = useState({});
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
  const [loading, setloading] = useState(false);

  const [mobilenumber, setmobilenumber] = useState("");
  const [residence, setresidence] = useState("");
  const [telephone, settelephone] = useState("");
  const [postalAddress, setpostalAddress] = useState("");

  const [guadian, setguadian] = useState([]);

  const handleEdit = () => {
    axios
      .put(`/students/update/${user?.userID}`, {
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
        allege,
        mobilenumber,
        telephone,
        postalAddress,
        physicalAddress: residence,
        guadian,
      })
      .then((response) => {
        setloading(false);
        if (response.data.error) {
          errorAlert(response.data.error);
          return 0;
        }
        successAlert("successfully added");
        setstudentDetails(response.data.student);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
        errorAlert("something went wrong");
      });
  };

  const handleDeleteGuadian = (id) => {
    setguadian(guadian.filter((e) => e.id !== id));
  };

  console.log(user);
  useEffect(() => {
    axios.get(`/students/student/${user?.userID}`).then((res) => {
      let data = res.data.student;
      console.log(data);
      setstudentDetails(data);
      setname(data?.name);
      setlastname(data?.surname);
      setgender(data?.gender);
      setdateofBirth(
        data?.dateofBirth ? moment(data?.dateofBirth).format("YYYY-MM-DD") : ""
      );
      setemail(data?.email);
      setnationality(data?.nationality);
      setplaceofBirth(data?.placeofBirth);
      setreligion(data?.religion);
      sethealth(data?.health);
      setallege(data?.allege);
      setdisease(data?.disease);
      setmobilenumber(data?.mobilenumber);
      setresidence(data?.physicalAddress);
      settelephone(data?.telephone);
      setpostalAddress(data?.postalAddress);
      setguadian(data?.guadian);
    });
  }, [user]);

  const handleReset = (e) => {
    e.preventDefault();
    setname(studentDetails?.name);
    setlastname(studentDetails?.surname);
    setgender(studentDetails?.gender);
    setdateofBirth(studentDetails?.dateofBirth);
    setemail(studentDetails?.email);
    setnationality(studentDetails?.nationality);
    setplaceofBirth(studentDetails?.placeofBirth);
    setreligion(studentDetails?.religion);
    sethealth(studentDetails?.health);
    setallege(studentDetails?.allege);
    setdisease(studentDetails?.disease);
    setmobilenumber(studentDetails?.mobilenumber);
    setresidence(studentDetails?.physicalAddress);
    settelephone(studentDetails?.telephone);
    setpostalAddress(studentDetails?.postalAddress);
    setguadian(studentDetails?.guadian);
  };

  return (
    <div>
      <h3>Edit My Profile</h3>
      <form action="" className="content__container mt-3">
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
        <Contact
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
            guadian.map((e) => (
              <div className="col-xs-12 col-sm-6">
                <GuadianCard
                  guadian={e}
                  key={e.id}
                  handleDeleteGuadian={handleDeleteGuadian}
                />
              </div>
            ))}
        </div>
        <div className="row ">
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit(handleEdit)}
            className=" col blue__btn btn mr-5"
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
          <button onClick={handleReset} className=" col btn  orange__btn mr-5">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfilePage;
