// src/components/MessagePage/LeftBar/CreateDMRModal/CreateDMRModal.js

// import css
import './CreateDMRModal.css';

// import context
import { useDMR } from '../../../../context/DMRContext';
import { Modal } from '../../../../context/Modal';
import { useMessage } from '../../../../context/MessageContext';

// import react
import { useState, useEffect } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { useHistory, useParams } from 'react-router-dom';

// import store
import * as sessionActions from '../../../../store/session';
import * as dmrActions from '../../../../store/dmr';

const CreateDMRModal = ({ setCreateDMROpenModal }) => {
    const { dmrName, setDMRName } = useMessage();
    const { currentDMR, setCurrentDMR } = useDMR();
    const { currentDMRId, setCurrentDMRId } = useDMR();
    const { createdDMRId, setCreatedDMRId } = useDMR();
    const [inputLength, setInputLength] = useState(0);
    const [formReady, setFormReady] = useState(true);
    const [validationErrors, setValidationErrors] = useState([]);
    const [onLoad, setOnLoad] = useState(false);

    let { dmrId } = useParams();
    dmrId = Number(dmrId)

    const chatId = dmrId;

    const currentChat = useSelector(dmrActions.getChatById(chatId))
    const currentUserId = useSelector(sessionActions.getCurrentUserId);
    const dmrState = useSelector(dmrActions.getAllDMRs);

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        if (!formReady) {
            setFormReady(true);
        }

        if (currentDMRId) {
            history.push(`/chat/dmrs/${currentDMRId}`)
        }
    }, [
        dmrName,
        inputLength,
        currentUserId,
        formReady,
        dmrState,
        validationErrors,
        setCurrentDMRId
    ])

    const onCreateDMR = async (e) => {
        e.preventDefault();

        const dmrInfo = {
            ...currentDMR,
            dmr_name: dmrName,
        }

        setValidationErrors([])

        // return
    }

    return onLoad ? (
        <section id='cdm-container'>
            <form id='cdm-form' onSubmit={onCreateDMR}>
                <div className='epm-error-container'>
                    {validationErrors &&
                        validationErrors.map((error, ind) => <div key={ind}>{error}</div>)}
                </div>

                {/* form header */}
                <h1>Start a conversation with:</h1>
                <p>Conversations are direct messages with other Slack users. These messages cannot be seen by people
                    outside of the conversation. If you would like to add a new person to an existing conversation, a
                    new conversation must be created.
                </p>

                {/* exit icon */}
                <figure
                    id='cdm-form-exit-container'
                    onClick={(_) => setCreateDMROpenModal(false)}
                >
                    <i className='fa-solid fa-x ccm-form-exit'></i>
                </figure>
            </form>
            {/* Edit Profile Modal */}
        </section>
    ) : (
        setOnLoad(true)
    );
};


export default CreateDMRModal;
