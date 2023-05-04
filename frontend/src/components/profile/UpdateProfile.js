import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { Avatar } from "@material-ui/core";
import { errorAlert, getImgSrc } from "../../utils";
import axios from "../../store/axios";
import { useDispatch } from "react-redux";
import { update } from "../../store/slices/userSlice";
import { LoginString } from "../../store/localStorage";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  profileIcon: {},
}));

function UpdateProfile({ id, profile }) {
  const classes = useStyles();
  const [profileimg, setprofileimg] = useState("");
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setprofileimg(profile);
  }, [profile]);

  const handleChangeFile = (e) => {
    const selected = e.target.files[0];
    if (selected?.size > 2000000) {
      errorAlert("image is too large");
    } else if (selected) {
      setloading(true);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selected);
      fileReader.onloadend = () => {
        axios
          .post("/upload", { dataUrl: fileReader.result })
          .then((res) => {
            const path = res.data.url;
            console.log(path);
            axios
              .post(`/update/profile/${id}`, { profileUrl: path })
              .then((response) => {
                setloading(false);
                if (response.data.error) {
                  errorAlert("Profile update failed");
                  return 0;
                }
                setprofileimg(path);
                dispatch(
                  update({
                    photoUrl: path,
                  })
                );
                localStorage.setItem(LoginString.PhotoURL, path);
              });
          })
          .catch((err) => {
            console.log(err);
            setloading(false);
            errorAlert("Profile update failed");
          });
      };
    } else {
      console.log("no file selected");
      errorAlert("no file selected");
    }
  };

  return (
    <div>
      <input
        accept="image/*"
        onChange={handleChangeFile}
        className={classes.input}
        disabled={loading}
        id="icon-button-file"
        type="file"
      />
      <label className="profileContainer" htmlFor="icon-button-file">
        <Avatar
          src={getImgSrc(profileimg)}
          className="large__avatar"
          aria-label="upload picture"
          component="span"
        >
          {loading ? <CircularProgress /> : <PhotoCamera />}
        </Avatar>

        <div className="profileIcon">Change Profile</div>
      </label>
    </div>
  );
}

export default UpdateProfile;
