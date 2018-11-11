import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as userInactive } from '@fortawesome/free-regular-svg-icons';
import { faUser as userActive } from '@fortawesome/free-solid-svg-icons';

export default class LeftPane extends React.Component {

  getShortButtonLabel = () => {
    let duration = this.props.shortDuration;
    let seconds = (duration % 600) / 10;
    let minutes = (duration - seconds * 10) / 600;
    return (minutes > 0) ?
      (seconds > 0) ?
        `${minutes}' ${seconds}"` :
        `${minutes}'` :
      `${seconds}"`;
  }

  preventFocus = (e) => {
    e.preventDefault();
  }

  render(){
    let users = [];
    let shorts = [];

    let currentUser = this.props.currentUser;
    let isLeft = this.props.isLeft;
    let hideCurrent = this.props.hideCurrent;

    for(let i = 1; i <= 4; i++){
      let id = `user-left-${i}`;
      if(i>currentUser){
        users.push(<FontAwesomeIcon key={id} id={id} icon={userActive} className="user-icon user-icon--active" />);
      } else if(i<currentUser){
        users.push(<FontAwesomeIcon key={id} id={id} icon={userInactive} className="user-icon user-icon--inactive" />);
      } else {
        if(isLeft && (!hideCurrent)){
          users.push(<FontAwesomeIcon key={id} id={id} icon={userActive} className="user-icon user-icon--current" />);
        } else {
          users.push(<FontAwesomeIcon key={id} id={id} icon={userInactive} className="user-icon user-icon--inactive" />);
        }

      }

    }
    let shortLabel = this.getShortButtonLabel();
    for(let i = 0; i < this.props.shortsAvailable; i++){
      let id = `short-button-left-${i}`;
      shorts.push(<button key={id} id={id} className="short-button" onClick={this.props.handleUseShort} onFocus={this.preventFocus} tabIndex="-1">{shortLabel}</button>);
    }

    return (
      <div>
        <div>
          {users.map((user) => {
            return user;
          })}
        </div>
        <div>
          {shorts.map((shortButton) => {
            return shortButton;
          })}
        </div>
      </div>
    );
  }
}
