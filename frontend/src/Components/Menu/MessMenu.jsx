import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const MessMenu = () => {
    const [mealData, setMealData] = useState([]);
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        const fetchMealData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/user/getmeal`);
                setMealData(response.data);
            } catch (error) {
                console.error('Error fetching meal data:', error);
            }
        };

        const fetchMenuData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/user/getmenu`);
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
        <Container fluid className="mt-4">
            <Row className="justify-content-center">
                <Col md={10}>
                    {/* Meal Menu Table */}
                    <h2>Meal Menu</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Meal Name</th>
                                <th>Time</th>
                                <th>Cost (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mealData.map((meal, index) => (
                                <tr key={index}>
                                    <td>{meal.mealName}</td>
                                    <td>{meal.time}</td>
                                    <td>₹{meal.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Day-wise Menu Table */}
                    <h2>Day-wise Menu</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Breakfast</th>
                                <th>Lunch</th>
                                <th>Dinner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menuData
                                // Sort the menu data based on custom day order
                                .sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day))
                                .map((dayMenu, index) => (
                                    <tr key={index}>
                                        <td>{dayMenu.day}</td>
                                        <td>{dayMenu.breakfast}</td>
                                        <td>{dayMenu.lunch}</td>
                                        <td>{dayMenu.dinner}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default MessMenu;
