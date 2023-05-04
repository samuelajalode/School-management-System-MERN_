import React, { useState, useEffect } from "react";
import PersonalInfo from "../../AdminComponents/shared/Personalnfo";
import ContactDetails from "../../AdminComponents/shared/Contact";
import NextofKin from "../../AdminComponents/shared/NextofKin";
import { useForm } from "react-hook-form";
import moment from "moment";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";
import { selectUser } from "../../store/slices/userSlice";
import { useSelector } from "react-redux";

function EditProfile() {
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
  const user = useSelector(selectUser);

  //form verification
  const { register, handleSubmit, errors } = useForm();

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
    axios.get(`/teachers/${user?.userID}`).then((res) => {
      let data = res.data.teacher;
      setdetails(data);
      setname(data?.name);
      setlastname(data?.surname);
      setgender(data?.gender);
      setsecondName(data?.middleName);
      setdateofBirth(
        data?.dateofBirth ? moment(data?.dateofBirth).format("YYYY-MM-DD") : ""
      );
      setemail(data?.email);
      setnationality(data?.nationality);
      setplaceofBirth(data?.placeofBirth);
      setreligion(data?.religion);
      settitle(data?.title);
      sethealth(data?.health);
      setallege(data?.allege);
      setdisease(data?.disease);
      setmobilenumber(data?.telephone);
      setresidence(data?.physicalAddress);
      settelephone(data?.mobile);
      setpostalAddress(data?.postalAddress);
      setnexttelephone(data?.nextofKin?.mobile);
      setnextemail(data?.nextofKin?.email);
      setnextlastname(data?.nextofKin?.lastname);
      setnextname(data?.nextofKin?.name);
      setaddress(data?.nextofKin?.address);
      setoccupation(data?.nextofKin?.occupation);
      setrelationship(data?.nextofKin?.relationship);
    });
  }, [user]);

  const handleReset = (e) => {
    e.preventDefault();
    setname(details?.name);
    setlastname(details?.surname);
    setgender(details?.gender);
    setsecondName(details?.middleName);
    setdateofBirth(details?.dateofBirth);
    setemail(details?.email);
    setnationality(details?.nationality);
    setplaceofBirth(details?.placeofBirth);
    setreligion(details?.religion);
    settitle(details?.title);
    setmobilenumber(details?.telephone);
    setresidence(details?.physicalAddress);
    settelephone(details?.mobile);
    setpostalAddress(details?.postalAddress);
    setnexttelephone(details?.nextofKin?.mobile);
    setnextemail(details.nextofKin?.email);
    setnextlastname(details.nextofKin?.name);
    setnextname(details.nextofKin?.name);
    setaddress(details.nextofKin?.address);
    setoccupation(details.nextofKin?.occupation);
    setrelationship(details.nextofKin?.relationship);
  };

  const handleCreateSubmit = () => {
    setloading(true);
    axios
      .put(`/teachers/update/${user?.userID}`, {
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
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("Successfully Edited");
      })
      .catch((err) => {
        console.log(err);
        errorAlert("Something went wrong");
        setloading(false);
      });
  };

  return (
    <div>
      <h2>Edit Staff Member</h2>
      <form action="" className="content__container">
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
          <button onClick={handleReset} className=" col btn blue__btn">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
