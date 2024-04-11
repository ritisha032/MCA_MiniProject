import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAuth } from '../../../context/auth';

const MessMenuPage = () => {
    const [menuData, setMenuData] = useState([]);
    const [mealData, setMealData] = useState([]);
    const [loadingMenu, setLoadingMenu] = useState(false);
    const [loadingMeal, setLoadingMeal] = useState(false);

    const sortIdx = {'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5, 'Sunday': 6};
    const mp = {'breakfast': 0, 'lunch': 1, 'dinner': 2};

    const [auth] = useAuth(); // Using useAuth hook to retrieve auth data

    const fetchMenuData = async () => {
        try {
            setLoadingMenu(true);
            const response = await axios.get(`${process.env.REACT_APP_API}/api/user/getmenu`, {
                headers: { Authorization: auth.token } // Include token in headers
            });

            console.log("menu response= ", response.data);

            // Sort according to day name
            let data = response.data;
            data.sort((a, b) => sortIdx[a.day] - sortIdx[b.day]);
            setMenuData(data);
            setLoadingMenu(false);

        } catch (error) {
            console.error('Error fetching menu data : ', error);
        }
    };

    const fetchMealData = async () => {
        try {
            setLoadingMeal(true);
            const response = await axios.get(`${process.env.REACT_APP_API}/api/user/getmeal`, {
                headers: { Authorization: auth.token } // Include token in headers
            });
            console.log("meal response= ", response.data);

            // Sort according to meal name
            let data = response.data;
            data.sort((a, b) => mp[a.mealName] - mp[b.mealName]);
            setMealData(data);
            setLoadingMeal(false);
            localStorage.setItem('menuData', JSON.stringify(data)); //changess
        } catch (error) {
            console.error('Error fetching meal data:', error);
        }
    };

    useEffect(() => {

        //changess
        const savedMenuData = localStorage.getItem('menuData');
        const savedMealData = localStorage.getItem('mealData');

        if (savedMenuData && savedMealData) {
            setMenuData(JSON.parse(savedMenuData));
            setMealData(JSON.parse(savedMealData));
        } else {
            fetchMenuData();
            fetchMealData();
        }
    }, []);

    return (
        <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
            {loadingMeal || loadingMenu ? <div>Loading...</div> :
                <div>
                    <h4>Hi, Welcome back 👋</h4>
                    <div>
                        {mealData.map((item, index) => (
                            <div key={index}>
                                {/* Render meal data */}
                            </div>
                        ))}
                    </div>
                    <div>
                        <h4>Mess Menu</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    {/* Add more table headers as needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {menuData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.day}</td>
                                        {/* Add more table cells as needed */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    );
};

export default MessMenuPage;
