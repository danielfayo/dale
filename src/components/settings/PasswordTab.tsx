import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type PasswordTabProps = {
    
};

const PasswordTab:React.FC<PasswordTabProps> = () => {
    
    return (
        <>
        <div className="mt-8">
            <label>Old Password</label>
            <Input placeholder="Type your old password here" />
          </div>
          <div className="mt-8">
            <label>New Password</label>
            <Input placeholder="Type your new password here" />
          </div>
          <Button>Save</Button>
        </>
    )
}
export default PasswordTab;