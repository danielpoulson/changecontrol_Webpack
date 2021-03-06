import React from 'react';
/* component styles */
import { image } from './error-panel.css';


const ErrorPanel = ({errors}) => {

  const errorlist = errors.map( (e, i) => <li key={i}><span className="fa fa-exclamation-triangle"></span> - {e}</li>);

  return (
    <div className="alert alert-danger">
      <ul className={`${image}`}>
        {errorlist}
      </ul>
    </div>
  );
};

ErrorPanel.propTypes = {
  errors: React.PropTypes.array
};

export default ErrorPanel;
