// src/components/MessagePage/ProfileBar/EditProfileModal/EditProfileModal.js

// import css
import './EditProfileModal.css';

// import react
import { useState, useEffect } from "react";

// import react-redux
import { useDispatch, useSelector } from "react-redux";

// import react-router-dom
import { useHistory } from 'react-router-dom';

// import store
import * as sessionActions from '../../../../store/session';
import * as userActions from '../../../../store/users';

//? Edit Profile Modal component
const EditProfileModal = ({ setShowEditProfileModal }) => {

  // load data
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  /**
   * Controlled Inputs
   */
  const [editFirstName, setEditFirstName] = useState(currentUserInfo ? currentUserInfo.first_name : currentUserInfo);
  const [editLastName, setEditLastName] = useState(currentUserInfo ? currentUserInfo.last_name : currentUserInfo);
  const [editUserName, setEditUserName] = useState(currentUserInfo ? currentUserInfo.display_name : currentUserInfo);
  const [editEmail, setEditEmail] = useState(currentUserInfo ? currentUserInfo.email : currentUserInfo);
  const [editProfileImage, setEditProfileImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [currentPicture, setCurrentPicture] = useState(currentUserInfo ? currentUserInfo.profile_image : currentUserInfo);
  const [validationErrors, setValidationErrors] = useState([]);
  const [formReady, setFormReady] = useState(true);

  // invoke dispatch
  const dispatch = useDispatch();

  // invoke history
  const history = useHistory();

  // per validation errors
  useEffect(() => {
    // nothing for now, just to update validation errors
    if (!formReady) {
      setFormReady(true);
    }
  }, [editProfileImage, editFirstName, editLastName, editUserName, editEmail, validationErrors, formReady]);

  // per currentPicture
  useEffect(() => {
    setImageLoading(false);
    // reset image sample after setting image loading to false
    document.querySelector(".epmfupc-image-input").value = ""
  }, [currentPicture])

  // per edit profileImage
  useEffect(() => {
    //! leave this here so profile pic doesnt look glitchy when reloading
  }, [editProfileImage]);

  // function to handle profile editing
  const onEditProfile = e => {
    // prevent page from refreshing
    e.preventDefault();

    const errors = [];

    //* set errors
    // check and reset first name
    if (editFirstName.length > 40 || editFirstName.length === 0) {
      errors.push("First name cannot be less than 0 character or more than 40 characters");
      console.log("currentUserInfo.first_name", currentUserInfo.first_name);
      setEditFirstName(currentUserInfo.first_name);
    }
    
    // check and reset last name
    if (editLastName.length > 40 || editLastName.length === 0) {
      errors.push("Last name cannot be less than 0 character or more than 40 characters");
      setEditLastName(currentUserInfo.last_name);  
    }
    
    // check and reset display name
    if (editUserName.length > 40 || editUserName.trim().length === 0) {
      errors.push("Username cannot be less than 0 character or more than 40 characters");
      setEditUserName(currentUserInfo.display_name);
    }
    
    // check and reset email
    if (editEmail.length > 255 || editEmail.length === 0) {
      setEditEmail(currentUserInfo.email);
      errors.push("Email cannot be less than 0 character or more than 255 characters")
    }
    
    // form userinfo to give to edit user
    const userInfo = {
      first_name: editFirstName,
      last_name: editLastName,
      username: editUserName,
      email: editEmail,
      profile_image: currentPicture
    };

    // reset validation errors
    setValidationErrors([]);
      
    // call on thunk to edit user
    return dispatch(sessionActions.thunkEditUser(userInfo))
      .then(async res => {
        console.log("inside then", res);
        
        if (res) {
          errors.push(res.errors);
          throw new Error();
        } else {
          // exit out of modal
          return setShowEditProfileModal(false);
        }
      }).catch(() => {
        setFormReady(false);
        setValidationErrors(errors);
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

  // function to handle delete user
  const handleDeleteUser = () => {

    var confirmDelete = prompt("Are you sure you want to delete your account? Type 'delete' to confirm")

    // if 'delete' is the input, proceed to delete account
    if (confirmDelete.toLowerCase().trim() === "delete") {
      // alert to user, successful deletion
      alert(`${editUserName}, your account have been deleted`);

      // call on thunk to delete current user
      return dispatch(userActions.thunkDeleteUser())
        .then(() => {
          // call on thunk to log out user
          return dispatch(sessionActions.logout())
            .then(() => {
              // then go back to home page
              return history.push('/');
            });
        });
      
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
          <div className="epm-error-container">
            {
              validationErrors &&
              validationErrors.map((error, ind) => (
              <div key={ind}>{error}</div>
              ))
            }
          </div>
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
                alt={currentUserInfo ? currentUserInfo.display_name : currentUserInfo}
              />
            }
          </figure>

          {/* Edit Profile Picture */}
          <figure
            className="epmfupc-delete-user"
            onClick={handleDeleteUser}
          >
            Delete User
          </figure>
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
            onClick={_ => {
              setShowEditProfileModal(false);
              console.log("click");
            }}
          >
            Cancel
          </button>

          {/* Submit Button */}
          {
            formReady &&
            <button
              type="submit"
              onClick={onEditProfile}
            >
              Edit Current User
            </button>
          }
        </section>
      </form>
    </section>
  );
}

// export component
export default EditProfileModal;
