import React from 'react';

const Table = ({ data, taken, title, loading}) => {
  const dayIdx = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mp = {'breakfast' : 0, 'lunch' : 1, 'dinner' : 2}

  return (
    <div style={{ padding: '1rem' }}>
    <h3>{title}</h3>
    <div style={{ padding: '1rem', paddingBottom: '0.5rem', marginBottom: '0.5rem', boxShadow: '0 0 1px rgba(0,0,0,0.5)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ backgroundColor: 'lightgray', boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                    <th style={{ padding: '0.5rem', border: '1px solid rgba(0,0,0,0.1)' }}>Day</th>
                    <th style={{ padding: '0.5rem', border: '1px solid rgba(0,0,0,0.1)' }}>Breakfast</th>
                    <th style={{ padding: '0.5rem', border: '1px solid rgba(0,0,0,0.1)' }}>Lunch</th>
                    <th style={{ padding: '0.5rem', border: '1px solid rgba(0,0,0,0.1)' }}>Dinner</th>
                </tr>
            </thead>
            <tbody>
                {loading ? (
                    <tr>
                        <td colSpan="4">Loading...</td>
                    </tr>
                ) : (
                    data.map((rowData, index) => (
                        <tr key={index}>
                            <td style={{ padding: '0.5rem', border: '1px solid rgba(0,0,0,0.1)' }}>{rowData.day ? rowData.day : dayIdx[index]}</td>
                            <td style={{ padding: '0.5rem', border: '1px solid rgba(0,0,0,0.1)', backgroundColor: taken?.[mp['breakfast']][index] ? '#ceface' : 'transparent' }}>{rowData.breakfast}</td>
                            <td style={{ padding: '0.5rem', border: '1px solid rgba(0,0,0,0.1)', backgroundColor: taken?.[mp['lunch']][index] ? '#ceface' : 'transparent' }}>{rowData.lunch}</td>
                            <td style={{ padding: '0.5rem', border: '1px solid rgba(0,0,0,0.1)', backgroundColor: taken?.[mp['dinner']][index] ? '#ceface' : 'transparent' }}>{rowData.dinner}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
</div>
  );
}

export default Table;