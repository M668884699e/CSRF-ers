// src/components/StartPage/MainStartSetup/ChannelStarterForm/ChannelStarterForm.js

// import css
import './ChannelStarterForm.css';

// import component
import MembersStarterForm from '../MembersStarterForm';

// import react
import { useState } from 'react';

// import context
import { useStarter } from '../../../../context/StarterContext';
import { useChannel } from '../../../../context/ChannelContext';

//? Channel Starter Form component
const ChannelStarterForm = () => {
  const [ privateChannel, setPrivateChannel ] = useState(false);
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

    if (inputLength > 0) {
      // go to members starter form
      setStarterForm(<MembersStarterForm privateChannel={privateChannel} />)
    }
  }

  // function to update channel
  const updateChannelName = e => {
    setChannelNameInputted(e.target.value);
  }

  return (
    <form onSubmit={submitChannel} className="sp-main-section-form">
      <p id="spmsf-p-step">
        Step 1 of 2
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
      {/* slider for toggling whether to put as private or not */}
      <section
        id="private-switch-container"
      >
        <aside>
          <h2 className="private-switch-container-p">
            Make private
          </h2>
          <p>
            When a channel is set to private, it can only be viewed or joined by invitation
          </p>
        </aside>
        <input
          type="checkbox"
          id="private-switch"
          onClick={e => {
            setPrivateChannel(e.target.checked)
          }}
        />
      </section>

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
