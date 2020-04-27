import React from 'react';
function MyResult(props) {
  return (
    <div className='card-body'>
      <h1>Save lives, stay home!</h1>
      <img src={props.src} className='avatar' alt='avatar' />
      <h3>
        {props.name} {props.emoji}
      </h3>
      <p>{props.address}</p>
      <p>Description: {props.description}</p>
      <h3>Point: {props.point}</h3>
    </div>
  );
}
export default MyResult;
