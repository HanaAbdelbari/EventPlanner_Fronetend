import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');
    const [date, setDate] = useState('');
    const [role, setRole] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = () => {
        onSearch({ keyword, date, role });
    };

    const handleClear = () => {
        setKeyword('');
        setDate('');
        setRole('');
        onSearch({ keyword: '', date: '', role: '' });
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 animate-slideDown">
            {/* Search Bar */}
            <div className="flex items-center space-x-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search events by title, description, or location..."
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-300"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                >
                    <Filter className="w-5 h-5 text-gray-600" />
                </button>
                <button
                    onClick={handleSearch}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                    Search
                </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4 animate-slideIn">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        >
                            <option value="">All Events</option>
                            <option value="organizer">Organized by Me</option>
                            <option value="attendee">Invited to</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <button
                            onClick={handleClear}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;