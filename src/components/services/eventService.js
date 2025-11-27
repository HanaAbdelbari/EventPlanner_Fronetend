import apiCall from './api';

export const createEvent = async (eventData) => {
    return await apiCall('/events', 'POST', eventData);
};

export const getMyEvents = async () => {
    return await apiCall('/events/my', 'GET');
};

export const getInvitedEvents = async () => {
    return await apiCall('/events/invited', 'GET');
};

export const getAllMyEvents = async () => {
    return await apiCall('/events/all', 'GET');
};

export const deleteEvent = async (eventId) => {
    return await apiCall(`/events/${eventId}`, 'DELETE');
};

export const inviteToEvent = async (eventId, emails) => {
    // Backend expects single email in body, so we need to call it multiple times
    const promises = emails.map(email =>
        apiCall('/events/invite', 'POST', { event_id: eventId, email: email.trim() })
    );
    return await Promise.all(promises);
};

export const updateAttendanceStatus = async (eventId, status) => {
    return await apiCall('/events/response', 'PUT', { event_id: eventId, status });
};

export const getEventAttendees = async (eventId) => {
    return await apiCall(`/events/${eventId}/attendees`, 'GET');
};

export const searchEvents = async (keyword, date, role) => {
    let queryParams = [];
    if (keyword) queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
    if (date) queryParams.push(`date=${date}`);
    if (role) queryParams.push(`role=${role}`);

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    return await apiCall(`/events/search${queryString}`, 'GET');
};