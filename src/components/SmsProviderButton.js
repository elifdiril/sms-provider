import React from 'react';

function SmsProviderButton({isUpdate = false}) {
    return (
        <div>
            <button>{isUpdate ? "Update Sms Provider" : "Add New Sms Provider"}</button>
        </div>
    );
}

export default SmsProviderButton;