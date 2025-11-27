import React, { useState } from 'react';
import { Calendar, Clock, MapPin, FileText, Users } from 'lucide-react';
import InputField from '../auth/InputField';
import Button from '../common/Button';

const CreateEventForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        invitees: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    // Convert 12-hour time to 24-hour format
    const convertTo24Hour = (time12h) => {
        // Time input in HTML5 already returns 24-hour format (HH:mm)
        // So we just need to ensure it's in the right format
        return time12h;
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.date || !formData.time || !formData.location) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const inviteesArray = formData.invitees
                ? formData.invitees.split(',').map(email => email.trim()).filter(email => email)
                : [];

            // Ensure time is in 24-hour format (HH:MM)
            const time24 = convertTo24Hour(formData.time);

            await onSubmit({
                title: formData.title,
                description: formData.description,
                date: formData.date,
                time: time24,
                location: formData.location,
                invitees: inviteesArray
            });

        } catch (err) {
            console.error('Create event error:', err);
            setError(err.message || 'Failed to create event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-5">
            <InputField
                label="Event Title *"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                icon={Calendar}
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                </label>
                <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter event description"
                        rows="3"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-300"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="Date *"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    icon={Calendar}
                />

                <InputField
                    label="Time *"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    icon={Clock}
                />
            </div>

            <InputField
                label="Location *"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter event location"
                icon={MapPin}
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invite Attendees (Optional)
                </label>
                <div className="relative">
                    <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        name="invitees"
                        value={formData.invitees}
                        onChange={handleChange}
                        placeholder="Enter emails separated by commas"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-300"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">Example: user1@email.com, user2@email.com</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-slideIn">
                    {error}
                </div>
            )}

            <div className="flex items-center space-x-3 pt-4">
                <Button onClick={handleSubmit} disabled={loading} className="flex-1">
                    {loading ? 'Creating...' : 'Create Event'}
                </Button>
                <Button onClick={onCancel} variant="secondary" className="flex-1">
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default CreateEventForm;