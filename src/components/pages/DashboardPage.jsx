import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Users as UsersIcon } from 'lucide-react';
import Navbar from '../common/Navbar';
import Button from '../common/Button';
import Modal from '../common/Modal';
import EventCard from '../events/EventCard';
import CreateEventForm from '../events/CreateEventForm';
import SearchBar from '../events/SearchBar';
import {
    getAllMyEvents,
    createEvent,
    deleteEvent,
    updateAttendanceStatus,
    getEventAttendees,
    searchEvents
} from '../services/eventService';

const DashboardPage = ({ userName, onLogout, onGoHome }) => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAttendeesModal, setShowAttendeesModal] = useState(false);
    const [selectedEventAttendees, setSelectedEventAttendees] = useState([]);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        loadEvents();
    }, []);

    useEffect(() => {
        filterEventsByTab();
    }, [activeTab, events]);

    const loadEvents = async () => {
        setLoading(true);
        try {
            const data = await getAllMyEvents();
            setEvents(data || []);
            setFilteredEvents(data || []);
        } catch (error) {
            console.error('Error loading events:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterEventsByTab = () => {
        if (activeTab === 'all') {
            setFilteredEvents(events);
        } else if (activeTab === 'organized') {
            setFilteredEvents(events.filter(e => e.role === 'organizer'));
        } else if (activeTab === 'invited') {
            setFilteredEvents(events.filter(e => e.role === 'attendee'));
        }
    };

    const handleCreateEvent = async (eventData) => {
        try {
            await createEvent(eventData);
            setShowCreateModal(false);
            loadEvents();
        } catch (error) {
            throw error;
        }
    };

    const handleDeleteEvent = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteEvent(eventId);
                loadEvents();
            } catch (error) {
                alert('Error deleting event: ' + error.message);
            }
        }
    };

    const handleUpdateStatus = async (eventId, status) => {
        try {
            await updateAttendanceStatus(eventId, status);
            loadEvents();
        } catch (error) {
            alert('Error updating status: ' + error.message);
        }
    };

    const handleViewAttendees = async (eventId) => {
        try {
            const attendees = await getEventAttendees(eventId);
            setSelectedEventAttendees(attendees || []);
            setShowAttendeesModal(true);
        } catch (error) {
            alert('Error loading attendees: ' + error.message);
        }
    };

    const handleSearch = async ({ keyword, date, role }) => {
        try {
            if (!keyword && !date && !role) {
                setFilteredEvents(events);
                return;
            }
            const results = await searchEvents(keyword, date, role);
            setFilteredEvents(results || []);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <Navbar userName={userName} onLogout={onLogout} onGoHome={onGoHome} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 animate-slideDown">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Events</h1>
                        <p className="text-gray-600">Manage and organize all your events</p>
                    </div>
                    <Button onClick={() => setShowCreateModal(true)} icon={Plus}>
                        Create Event
                    </Button>
                </div>

                {/* Search Bar */}
                <SearchBar onSearch={handleSearch} />

                {/* Tabs */}
                <div className="flex space-x-2 mb-6 bg-white rounded-xl p-2 shadow-md animate-fadeIn">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                            activeTab === 'all'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <Calendar className="w-5 h-5" />
                            <span>All Events</span>
                            <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                {events.length}
              </span>
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('organized')}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                            activeTab === 'organized'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <UsersIcon className="w-5 h-5" />
                            <span>Organized</span>
                            <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                {events.filter(e => e.role === 'organizer').length}
              </span>
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('invited')}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                            activeTab === 'invited'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <Calendar className="w-5 h-5" />
                            <span>Invited</span>
                            <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                {events.filter(e => e.role === 'attendee').length}
              </span>
                        </div>
                    </button>
                </div>

                {/* Events Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-md animate-fadeIn">
                        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
                        <p className="text-gray-500 mb-6">
                            {activeTab === 'all' ? 'Create your first event to get started!' :
                                activeTab === 'organized' ? "You haven't organized any events yet" :
                                    "You haven't been invited to any events yet"}
                        </p>
                        {activeTab !== 'invited' && (
                            <Button onClick={() => setShowCreateModal(true)} icon={Plus}>
                                Create Event
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event, index) => (
                            <div key={event.id} style={{ animationDelay: `${index * 50}ms` }}>
                                <EventCard
                                    event={event}
                                    onDelete={handleDeleteEvent}
                                    onViewAttendees={handleViewAttendees}
                                    onUpdateStatus={handleUpdateStatus}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Create Event Modal */}
            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Create New Event"
            >
                <CreateEventForm
                    onSubmit={handleCreateEvent}
                    onCancel={() => setShowCreateModal(false)}
                />
            </Modal>

            {/* Attendees Modal */}
            <Modal
                isOpen={showAttendeesModal}
                onClose={() => setShowAttendeesModal(false)}
                title="Event Attendees"
            >
                <div className="space-y-3">
                    {selectedEventAttendees.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No attendees yet</p>
                    ) : (
                        selectedEventAttendees.map((attendee) => (
                            <div
                                key={attendee.id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                                        {attendee.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{attendee.name}</p>
                                        <p className="text-sm text-gray-500">{attendee.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                  <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                          attendee.role === 'organizer'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                      }`}
                  >
                    {attendee.role}
                  </span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            attendee.status === 'going'
                                                ? 'bg-green-100 text-green-800'
                                                : attendee.status === 'maybe'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : attendee.status === 'not_going'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                    {attendee.status.replace('_', ' ')}
                  </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default DashboardPage;