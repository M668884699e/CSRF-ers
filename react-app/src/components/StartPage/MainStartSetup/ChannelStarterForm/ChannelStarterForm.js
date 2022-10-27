// src/components/StartPage/MainStartSetup/ChannelStarterForm/ChannelStarterForm.js

// import css
import './ChannelStarterForm.css';

// import component
import MembersStarterForm from '../MembersStarterForm';

// import context
import { useStarter } from '../../../../context/StarterContext';

//? Channel Starter Form component
const ChannelStarterForm = () => {
  
  const { channelNameInputted, setChannelNameInputted } = useStarter();
  const { inputLength, setInputLength } = useStarter();
  const { starterForm, setStarterForm } = useStarter(); 

  // checking input length of channel
  const checkInputLength = e => {
    // check if input have value
    setInputLength(e.target.value.length);
  }

  // function to handle when submitting channel form
  const submitChannel = e => {
    // prevent page from refreshing
    e.preventDefault();

    // go to members starter form
    setStarterForm(<MembersStarterForm/>)
  }

  // function to update channel
  const updateChannelName = e => {
    setChannelNameInputted(e.target.value);
  }

  return (
    <form onSubmit={submitChannel} className="sp-main-section-form">
      <p id="spmsf-p-step">
        Step 1 of 3
      </p>
      <h2 id="spmsf-h2">
        What's the name of your channel?
      </h2>
      <p id="spmsf-p-description">
        This will be the name of your Slack channel — choose something that your team will recognize.
      </p>
      <input
        id="spmsf-input"
        placeholder="Ex: Acme Marketing or Acme Co"
        onInput={checkInputLength}
        value={channelNameInputted}
        onChange={updateChannelName}
      />
      {/* on click of button, take to add people component */}
      <button
        id="spmsf-submit-button"
        type="submit"
        className={`spmsf-submit-button-${inputLength > 0}`}
      >
        Next
      </button>
    </form>
  );
};

// export component
export default ChannelStarterForm;
