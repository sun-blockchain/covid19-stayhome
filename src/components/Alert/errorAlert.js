import { Alert } from 'antd';
import React from 'react';

function ErrorAlert(props) {
  return (
    <div>
      <Alert message={props.msg} type='error' showIcon closable />
    </div>
  );
}
export default ErrorAlert;
