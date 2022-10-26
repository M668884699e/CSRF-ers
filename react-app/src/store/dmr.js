/*****Todo: reformat for aws images and sounds

    Basic aws post template

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if(previewImage) formData.append('previewImage', previewImage);

    const response = await csrfFetch('/api/albums', {
        method: 'POST',
        headers:{
            'Content-Type' : 'multipart/form-data'
        },
        body: formData
    });
  
  

 */


import sessionReducer from "./session";
/* --------- ACTIONS -------- */
const GET_DMRS = 'dmr/GET_DMRS';
const GET_DMR = 'dmr/GET_DMR';
const GET_DMR_USERS = 'dmr/GET_DMR_USERS'
const GET_DMR_MESSAGES = 'dmr/GET_DMR_MESSAGES'
const SET_DMR = 'dmr/SET_DMR';
const REMOVE_DMR = 'dmr/REMOVE_DMR';


const getDmrs = dmrs => {
    return {
        type: GET_DMRS,
        dmrs
    }
}

const getDmr = dmr => {
    return {
        type: GET_DMR,
        dmr
    }
}

const getDmrUsers = dmr => {
    return {
        type: GET_DMR_USERS,
        dmr
    }
}

const getDmrMessages = dmr => {
    return {
        type: GET_DMR_MESSAGES,
        dmr
    }
}

const setDmr = dmr => {
    return {
        type: SET_DMR,
        dmr
    }
}

const removeDmr = id => {
    return {
        type: REMOVE_DMR,
        id
    }
}

/* --------- THUNKS -------- */
export const getAllDmrs = () => async(dispatch) => {
    const response = await fetch('/api/dmr/', {
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        if(data.errors) {
            return;
        }
        dispatch(getDmrs(data.DirectMessageRooms))
    }

}

export const getDmrById = (id) => async(dispatch) => {
    const response = await fetch(`/api/dmr/${id}/`, {
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        if(data.errors) {
            return;
        }
        dispatch(getDmr(data))
    }
}

export const getAllDmrUsers = (dmr) => async(dispatch) => {
    const { id } = dmr;

    const response = await fetch(`/api/dmr/${id}/users/`, {
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        if(data.errors) {
            return;
        }
        dispatch(getDmrUsers(data.id.dmr_users))
    }
}

export const getAllDmrMessages = (dmr) => async(dispatch) => {
    const { id } = dmr;

    const response = await fetch(`/api/dmr/${id}/messages/`, {
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        if(data.errors) {
            return;
        }
        dispatch(getDmrMessages(data.id.dmr_messages))
    }
}

export const setNewDmr = (dmr) => async(dispatch) => {
    const response = await fetch(`/api/dmr/`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(dmr)
    });

    if (response.ok) {
        const data = await response.json();
        if(data.errors) {
            return;
        }
        dispatch(setDmr(data))
        return response
    }
}

export const deleteDmr = (id) => async(dispatch) => {
    const response = await fetch(`/api/dmr/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        await response.json()
        dispatch(removeDmr(id));
        return response;
    }
}

/* --------- REDUCERS -------- */

let initialState = {}

export default function dmrReducer (state = initialState, action){
    let newState = { ...state }
    switch (action.type) {   
        case GET_DMRS:
            newState = {}
            action.dmrs.forEach(dmr => {
                newState[dmr.id] = dmr;
            })           
            return newState;
        case GET_DMR:
            return { ...state,
                [action.dmr.id] : action.dmr
            }
        case GET_DMR_USERS:
            return { ...state,
                [action.dmr.id] : action.dmr
            }
        case GET_DMR_MESSAGES:
            return { ...state,
                [action.dmr.id] : action.dmr
            }
        case REMOVE_DMR:
            newState = { ...state };
            delete newState[action.id]
            return newState;
        default:
            return state;
    }
}