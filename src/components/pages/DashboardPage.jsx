import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Users as UsersIcon, Sparkles } from 'lucide-react';
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-cyan-50 relative overflow-hidden">
            {/* Floating Bubbles */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-br from-blue-300/30 to-cyan-400/20 animate-float-bubble cursor-pointer hover:scale-150 hover:bg-blue-400/40 transition-all duration-1000"
                        style={{
                            width: `${10 + Math.random() * 30}px`,
                            height: `${10 + Math.random() * 30}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 6}s`,
                            animationDuration: `${10 + Math.random() * 10}s`
                        }}
                        onClick={(e) => {
                            e.currentTarget.style.transform = 'scale(2)';
                            e.currentTarget.style.opacity = '0';
                            setTimeout(() => {
                                e.currentTarget.style.display = 'none';
                            }, 500);
                        }}
                    />
                ))}
            </div>

            {/* Wave Background */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-200/30 to-transparent wave-pattern"></div>
            <div className="absolute bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-sky-200/20 to-transparent wave-pattern animation-delay-2000"></div>

            <Navbar userName={userName} onLogout={onLogout} onGoHome={onGoHome} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                {/* Enhanced Header */}
                <div className="flex items-center justify-between mb-8 animate-slideDown group">
                    <div className="transform hover:scale-105 transition-transform duration-500">
                        <h1 className="text-3xl font-bold text-blue-900 mb-2 group-hover:text-cyan-700 transition-colors duration-300">My Events</h1>
                        <p className="text-blue-700/80 group-hover:text-blue-900 transition-colors duration-300">Manage and organize all your events</p>
                    </div>
                    <Button
                        onClick={() => setShowCreateModal(true)}
                        icon={Plus}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 hover:from-blue-600 hover:to-cyan-600 transition-all duration-500 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-0.5 group relative overflow-hidden"
                    >
                        <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">Create Event</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <Sparkles className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                </div>

                {/* Search Bar */}
                <SearchBar onSearch={handleSearch} />

                {/* Enhanced Tabs */}
                <div className="flex space-x-2 mb-6 bg-white/70 backdrop-blur-xl rounded-2xl p-2 shadow-lg hover:shadow-xl transition-all duration-500 animate-fadeIn border border-blue-200/50">
                    {[
                        { key: 'all', label: 'All Events', icon: Calendar, count: events.length },
                        { key: 'organized', label: 'Organized', icon: UsersIcon, count: events.filter(e => e.role === 'organizer').length },
                        { key: 'invited', label: 'Invited', icon: Calendar, count: events.filter(e => e.role === 'attendee').length }
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-500 group ${
                                activeTab === tab.key
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105'
                                    : 'text-blue-700 hover:bg-white/80 hover:shadow-md transform hover:scale-105'
                            }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <tab.icon className={`w-5 h-5 transform group-hover:scale-110 transition-transform duration-300 ${
                                    activeTab === tab.key ? 'animate-pulse' : ''
                                }`} />
                                <span className="group-hover:translate-x-0.5 transition-transform duration-300">{tab.label}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all duration-300 ${
                                    activeTab === tab.key
                                        ? 'bg-white/20 text-white'
                                        : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                                }`}>
                                    {tab.count}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Enhanced Events Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20 bg-white/50 backdrop-blur-sm rounded-2xl border border-blue-200/50">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <div className="text-center py-20 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 animate-fadeIn hover:shadow-xl transition-all duration-500">
                        <Calendar className="w-16 h-16 text-blue-400 mx-auto mb-4 transform hover:scale-110 transition-transform duration-500" />
                        <h3 className="text-xl font-semibold text-blue-900 mb-2">No events found</h3>
                        <p className="text-blue-700/80 mb-6">
                            {activeTab === 'all' ? 'Create your first event to get started!' :
                                activeTab === 'organized' ? "You haven't organized any events yet" :
                                    "You haven't been invited to any events yet"}
                        </p>
                        {activeTab !== 'invited' && (
                            <Button
                                onClick={() => setShowCreateModal(true)}
                                icon={Plus}
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 hover:from-blue-600 hover:to-cyan-600 transition-all duration-500 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105"
                            >
                                Create Event
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event, index) => (
                            <div
                                key={event.id}
                                style={{ animationDelay: `${index * 50}ms` }}
                                className="transform hover:scale-105 transition-transform duration-500"
                            >
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

            {/* Enhanced Create Event Modal */}
            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Create New Event"
                className="bg-white/80 backdrop-blur-xl border border-blue-200/50"
            >
                <CreateEventForm
                    onSubmit={handleCreateEvent}
                    onCancel={() => setShowCreateModal(false)}
                />
            </Modal>

            {/* Enhanced Attendees Modal */}
            <Modal
                isOpen={showAttendeesModal}
                onClose={() => setShowAttendeesModal(false)}
                title="Event Attendees"
                className="bg-white/80 backdrop-blur-xl border border-blue-200/50"
            >
                <div className="space-y-3">
                    {selectedEventAttendees.length === 0 ? (
                        <div className="text-center py-8">
                            <UsersIcon className="w-12 h-12 text-blue-400 mx-auto mb-4 opacity-60" />
                            <p className="text-blue-700/80">No attendees yet</p>
                        </div>
                    ) : (
                        selectedEventAttendees.map((attendee) => (
                            <div
                                key={attendee.id}
                                className="flex items-center justify-between p-4 bg-blue-50/50 rounded-xl hover:bg-blue-100/70 transition-all duration-500 transform hover:scale-105 border border-blue-200/30"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                        {attendee.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-medium text-blue-900">{attendee.name}</p>
                                        <p className="text-sm text-blue-700/80">{attendee.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                                            attendee.role === 'organizer'
                                                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                                : 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'
                                        }`}
                                    >
                                        {attendee.role}
                                    </span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                                            attendee.status === 'going'
                                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                : attendee.status === 'maybe'
                                                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                    : attendee.status === 'not_going'
                                                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
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

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes float-bubble {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
                        opacity: 0.3;
                    }
                    33% { 
                        transform: translateY(-20px) translateX(10px) scale(1.1) rotate(120deg);
                        opacity: 0.5;
                    }
                    66% { 
                        transform: translateY(10px) translateX(-15px) scale(0.9) rotate(240deg);
                        opacity: 0.2;
                    }
                }
                .wave-pattern {
                    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25'/%3E%3C/svg%3E");
                    mask-size: 1200px 100px;
                }
                .animate-float-bubble {
                    animation: float-bubble 12s ease-in-out infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
};

export default DashboardPage;