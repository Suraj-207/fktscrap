import React from 'react';
import ReactDOM from 'react-dom';

import './LoadingSpinner.css';

const ModalOverlay = props => {
  const content = (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('loader-hook'));
};

const LoadingSpinner = props => {

  return (
    <React.Fragment>
        <ModalOverlay {...props} />
    </React.Fragment>
  )
};

export default LoadingSpinner;

