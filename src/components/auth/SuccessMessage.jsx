import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm animate-slideIn flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            {message}
        </div>
    );
};

export default SuccessMessage;