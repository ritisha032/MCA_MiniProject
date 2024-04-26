import React from 'react';
import { useParams } from 'react-router-dom';
import MessMenu from '../../../Menu/MessMenu';
import GoBack from './GoBack';

// Import the hostels data
import { hostels } from './App';  // Adjust the import path as necessary

const Hostel = () => {
    // Get the hostelName from URL parameters
    const { hostelName } = useParams();

    // Find the hostel that matches the hostelName
    const hostel = hostels.find(h => h.name.toLowerCase().replace(/\s/g, '') === hostelName);

    // If the hostel is not found, you can handle it appropriately
    if (!hostel) {
        return <div>Hostel not found</div>;
    }

    return (
        <div>
            <GoBack />
            {/* Render MessMenu component with the selected hostel */}
            <MessMenu hostel={hostel} />
        </div>
    );
};

export default Hostel;
