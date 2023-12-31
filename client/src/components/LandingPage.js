import React from "react";

const LandingPage = (props) => {
  const welcomeMessage = () => {
    if (props.user) {
      return (
        <div>
          <h1>Hello, {props.user.firstName}! </h1>
          <h2>
            <strong>Join a new Lingo Squad today!</strong>
          </h2>
          <div className="centered" style={{ height: 400 }}>
            <img src="https://freepngimg.com/save/97452-chatting-png-download-free/512x512" />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Welcome to Lingo Squads!</h1>
          <div className="centered" style={{ height: 400 }}>
            <img src="https://freepngimg.com/save/97452-chatting-png-download-free/512x512" />
          </div>
        </div>
      );
    }
  };
  return <>{welcomeMessage()}</>;
};

export default LandingPage;
