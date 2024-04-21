import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMenu = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/user/getmenu`);
        const sortedMenuData = response.data.sort((a, b) => {
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          return days.indexOf(a.day) - days.indexOf(b.day);
        });
        setMenuData(sortedMenuData);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, []);

  const handleUpdateMenu = async () => {
    try {
      await axios.post('http://localhost:5001/api/admin/setmenu', menuData);
      alert('Menu updated successfully!');
    } catch (error) {
      console.error('Error updating menu:', error);
      alert('Failed to update menu. Please try again.');
    }
  };

  const handleInputChange = (event, index, mealType) => {
    const { name, value } = event.target;
    const updatedMenuData = [...menuData];
    updatedMenuData[index][mealType] = value;
    setMenuData(updatedMenuData);
  };

  return (
    <div>
      <h2>Update Menu</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
          </tr>
        </thead>
        <tbody>
          {menuData.map((menu, index) => (
            <tr key={index}>
              <td>{menu.day}</td>
              <td>
                <input
                  type="text"
                  name="breakfast"
                  value={menu.breakfast}
                  onChange={(event) => handleInputChange(event, index, 'breakfast')}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="lunch"
                  value={menu.lunch}
                  onChange={(event) => handleInputChange(event, index, 'lunch')}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="dinner"
                  value={menu.dinner}
                  onChange={(event) => handleInputChange(event, index, 'dinner')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleUpdateMenu}>Update</button>
    </div>
  );
};

export default UpdateMenu;
