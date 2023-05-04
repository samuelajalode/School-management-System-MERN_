import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Avatar from "@material-ui/core/Avatar";
import { getImgSrc } from "../../utils";

function Profile({ profileimg, setprofileUrl, profileUrl }) {
  return (
    <div>
      <h3>Profile Photo</h3>
      <input
        accept="image/*"
        className=""
        id="icon-button-file"
        type="file"
        onChange={setprofileUrl}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>

      <Avatar
        style={{ width: "100px", height: "100px" }}
        src={profileUrl ? profileimg : getImgSrc(profileimg)}
        alt="Username"
      />
    </div>
  );
}

export default Profile;
