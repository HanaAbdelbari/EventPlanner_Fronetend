import React from 'react';
import { Calendar, Clock, MapPin, User, Trash2, Users } from 'lucide-react';
import Button from '../common/Button';

const EventCard = ({ event, onDelete, onViewAttendees, onUpdateStatus }) => {
    const isOrganizer = event.role === 'organizer';

    const statusColors = {
        going: 'bg-green-100 text-green-800 border-green-300',
        maybe: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        not_going: 'bg-red-100 text-red-800 border-red-300',
        pending: 'bg-gray-100 text-gray-800 border-gray-300'
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border-l-4 border-blue-500 animate-slideIn">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        isOrganizer ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
            {isOrganizer ? 'Organizer' : 'Attendee'}
          </span>
                </div>
                {isOrganizer && (
                    <button
                        onClick={() => onDelete(event.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-all duration-300 transform hover:scale-110"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Description */}
            {event.description && (
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
            )}

            {/* Event Details */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm">{event.location}</span>
                </div>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                {!isOrganizer && (
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[event.status]}`}>
              {event.status.replace('_', ' ').toUpperCase()}
            </span>
                    </div>
                )}

                <div className="flex items-center space-x-2">
                    {isOrganizer && (
                        <Button
                            onClick={() => onViewAttendees(event.id)}
                            variant="outline"
                            icon={Users}
                            className="text-sm"
                        >
                            View Attendees
                        </Button>
                    )}
                    {!isOrganizer && event.status === 'pending' && (
                        <>
                            <button
                                onClick={() => onUpdateStatus(event.id, 'going')}
                                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 text-sm"
                            >
                                Going
                            </button>
                            <button
                                onClick={() => onUpdateStatus(event.id, 'maybe')}
                                className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300 text-sm"
                            >
                                Maybe
                            </button>
                            <button
                                onClick={() => onUpdateStatus(event.id, 'not_going')}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 text-sm"
                            >
                                Not Going
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventCard;