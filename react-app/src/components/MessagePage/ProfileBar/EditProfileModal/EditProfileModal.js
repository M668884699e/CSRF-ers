// src/components/MessagePage/ProfileBar/EditProfileModal/EditProfileModal.js

// import css
import './EditProfileModal.css';

// import react
import { useState, useEffect } from "react";

// import react-redux
import { useDispatch, useSelector } from "react-redux";

// import store
import * as sessionActions from '../../../../store/session';

//? Edit Profile Modal component
const EditProfileModal = ({ setShowEditProfileModal }) => {

  // load data
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  /**
   * Controlled Inputs
   */
  const [editFirstName, setEditFirstName] = useState(currentUserInfo.first_name);
  const [editLastName, setEditLastName] = useState(currentUserInfo.last_name);
  const [editUserName, setEditUserName] = useState(currentUserInfo.display_name);
  const [editEmail, setEditEmail] = useState(currentUserInfo.email);
  const [editProfileImage, setEditProfileImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [currentPicture, setCurrentPicture] = useState(currentUserInfo.profile_image);

  // invoke dispatch
  const dispatch = useDispatch();

  // per currentPicture
  useEffect(() => {
    setImageLoading(false);
    // reset image sample after setting image loading to false
    document.querySelector(".epmfupc-image-input").value = ""
  }, [currentPicture])

  // per edit profileImage
  useEffect(() => {
    console.log("editProfileImage", editProfileImage);
  }, [editProfileImage]);

  // function to handle profile editing
  const onEditProfile = async e => {
    // prevent page from refreshing
    e.preventDefault();

    // form userinfo to give to edit user
    const userInfo = {
      first_name: editFirstName,
      last_name: editLastName,
      username: editUserName,
      email: editEmail,
      profile_image: currentPicture
    };

    // call on thunk to edit user
    dispatch(sessionActions.thunkEditUser(userInfo))
      .catch(async res => { 
        //! TODO: Catch Errors properly
        // parse res to data json
        // const data = await res.json();

        // if(data.errors) setValidationErrors()

        console.log("error", res);
      })
  }

  // function to update first name
  const updateEditFirstName = e => {
    setEditFirstName(e.target.value);
  }
  
  // function to update last name
  const updateEditLastName = e => {
    setEditLastName(e.target.value);
  }

  // function to update username
  const updateEditUsername = e => {
    setEditUserName(e.target.value);
  }  

  // function to update email
  const updateEditEmail = e => {
    setEditEmail(e.target.value);
  }

  // function to update file
  const updateImage = e => {
    const file = e.target.files[0];
    if (file) {
      setEditProfileImage(file);
      fetchSampleImage(file);
    }
  }

  // function to fetch sample image
  const fetchSampleImage = async file => {
    // const data = await dispatch
    setImageLoading(true);

    if (file) {
      const formData = new FormData();

      formData.append("image_sample", file);
      
      const res = await fetch('/api/users/image/sample', {
        method: "POST",
        body: formData
      });
  
      if (res.ok) {
        const sampleImage = await res.json();
        setCurrentPicture(sampleImage.image_sample);
      } 
    }
  }

  return (
    <section id="epm-container">
      <h2>
        Edit your profile
      </h2>
      {/* Edit Profile Modal */}
      <form onSubmit={onEditProfile} id="epm-form">
        <section id="epm-form-user-info">
          {/* Edit First Name */}
          <label htmlFor="first_name">
            First Name
          </label>
          <input 
            name="first_name"
            placeholder="First Name"
            value={editFirstName}
            onChange={updateEditFirstName}
          />

          {/* Edit Last Name */}
          <label htmlFor="last_name">
            Last Name
          </label>
          <input 
            name="last_name"
            placeholder="Last Name"
            value={editLastName}
            onChange={updateEditLastName}
          />

          {/* Edit Username */}
          <label htmlFor="display_name">
            Display Name
          </label>
          <input
            id="epmfui-dn"
            name="display_name"
            placeholder="Username"
            value={editUserName}
            onChange={updateEditUsername}
          />
          <p>
            This could be your first name, or a nickname — however you’d like people to refer to you in Slackers.
          </p>

          {/* Edit Email */}
          <label htmlFor="email">
            Email
          </label>
          <input
            name="email"
            placeholder="Email"
            value={editEmail}
            onChange={updateEditEmail}
          />
        </section>
        <section id="epm-form-user-pic-container">
          {/* display pic container header */}
          <h3>
            Profile photo
          </h3>
          
          {/* display profile picture */}
          <figure id="epmfupc-figure">
            {
              (imageLoading)
              ?
                <img
                  id="epmfupc-figure-img"
                  src="https://cdn.dribbble.com/users/68238/screenshots/5503763/slack.gif"
                  alt="Loading"
                />
              :
              <img
                id="epmfupc-figure-img"
                src={currentPicture}
                alt={currentUserInfo.display_name}
              />
            }
          </figure>

          {/* Edit Profile Picture */}
          <figure
            onClick={e => {
              document.querySelector(".epmfupc-image-input").click()
            }}
            className="epmfupc-image-input-figure"
            >
            <input
              type="file"
              accept="image/*"
              className="epmfupc-image-input"
              onChange={updateImage}
            />
            Upload Photo
          </figure>

          <figure
            className="epmfupc-remove-image"
          >
            <p
              onClick={_ => setCurrentPicture("https://ca.slack-edge.com/T0266FRGM-U015ZPLDZKQ-gf3696467c28-512")}
            >
              Reset Photo
            </p>
          </figure>
        </section>
        
        <section id="epm-form-buttons-container">
          {/* Cancel Button */}
          <button
            onClick={_ => setShowEditProfileModal(false)}
          >
            Cancel
          </button>

          {/* Submit Button */}
          <button
            type="submit"
          >
            Edit Current User
          </button>
        </section>
      </form>
    </section>
  );
}

// export component
export default EditProfileModal;
