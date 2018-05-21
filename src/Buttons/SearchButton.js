import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ value, onChange, onSubmit, children }) =>
<form onSubmit={onSubmit}>
  {children}<input
    type="text"
    value={value}
    onChange={onChange}
  />
  <button type='submit'>
    {children}
  </button>
</form>

SubmitButton.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.node,
  value: PropTypes.string,
  onSubmit: PropTypes.func
}

export default SubmitButton