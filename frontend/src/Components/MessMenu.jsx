import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessMenu = () => {
  const [mealData, setMealData] = useState([]);
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/user/getmeal');
        setMealData(response.data);
      } catch (error) {
        console.error('Error fetching meal data:', error);
      }
    };

    const fetchMenuData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/user/getmenu');
        setMenuData(response.data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMealData();
    fetchMenuData();
  }, []);

  // Custom order for days of the week
  const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="mess-menu" style={{ backgroundColor: 'black', color: 'white', overflowY: 'scroll', maxHeight: '100vh' }}>
      <h2>Meal Menu</h2>
      <div className="meal-cards">
        {mealData.map((meal, index) => (
          <div key={index} className="meal-card">
            <h3>{meal.mealName}</h3>
            <p>{meal.time}</p>
            <p>Cost: ${meal.cost}</p>
          </div>
        ))}
      </div>
      <h2>Day-wise Menu</h2>
      <div className="day-wise-menu">
        {menuData
          // Sort the menu data based on custom day order
          .sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day))
          .map((dayMenu, index) => (
            <div key={index} className="day-menu">
              <h3>{dayMenu.day}</h3>
              <p>
                Breakfast: {dayMenu.breakfast}, Lunch: {dayMenu.lunch}, Dinner: {dayMenu.dinner}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MessMenu;
