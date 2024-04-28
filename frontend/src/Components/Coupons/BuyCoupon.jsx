import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import AlreadyBought from './AlreadyBought';
import { useAuth } from '../../context/auth';
import { Alert, Button, Card, Col, Container, Row, Table } from 'react-bootstrap';

const BuyCoupon = () => {
    const [menuData, setMenuData] = useState([]);
    const [mealCost, setMealCost] = useState([]);
    const [auth] = useAuth();
    const [coupon, setCoupon] = useState();
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState('success');
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([
        [false, false, false, false, false, false, false], // Breakfast
        [false, false, false, false, false, false, false], // Lunch
        [false, false, false, false, false, false, false], // Dinner
    ]);

    const handleToastOpen = (message, severity) => {
        setToastMessage(message);
        setToastSeverity(severity);
        setToastOpen(true);
    };

    const handleToastClose = () => {
        setToastOpen(false);
    };

    const getDayDifference = (dateString1, dateString2) => {
        const date1 = new Date(dateString1);
        const date2 = new Date(dateString2);
        return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
    };

   const fetchMenuData = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/user/getmenu`);
        const sortedData = response.data.sort((a, b) => new Date(a.day) - new Date(b.day));
        setMenuData(sortedData);
    } catch (error) {
        console.error('Error fetching menu data:', error);
    } finally {
        setLoading(false);
    }
};

    const fetchCouponData = async () => {
        try {
            const couponRes = await axios.post(`${process.env.REACT_APP_API}/api/user/getcoupon`, { email: auth.user.email });
            setCoupon(couponRes.data);
        } catch (error) {
            console.error('Error fetching coupon data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMealCost = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/user/getmeal`);
            const mealData = response.data;
            const breakfastCost = mealData.find(meal => meal.mealName === 'Breakfast')?.cost || 0;
            const lunchCost = mealData.find(meal => meal.mealName === 'Lunch')?.cost || 0;
            const dinnerCost = mealData.find(meal => meal.mealName === 'Dinner')?.cost || 0;
            setMealCost({
                breakfast: breakfastCost,
                lunch: lunchCost,
                dinner: dinnerCost,
            });
        } catch (error) {
            console.error('Error fetching meal data:', error);
        }
    };

    useEffect(() => {
        fetchMenuData();
        fetchCouponData();
        fetchMealCost();
    }, []);

    const totalCost = useMemo(() => {
        let total = 0;
        selectedItems[0].forEach((isSelected, index) => {
            if (isSelected) total += mealCost.breakfast;
        });
        selectedItems[1].forEach((isSelected, index) => {
            if (isSelected) total += mealCost.lunch;
        });
        selectedItems[2].forEach((isSelected, index) => {
            if (isSelected) total += mealCost.dinner;
        });
        return total;
    }, [selectedItems, mealCost]);

    const handleCellClick = (mealIndex, dayIndex) => {
        setSelectedItems(prevItems => {
            const newItems = [...prevItems];
            newItems[mealIndex][dayIndex] = !newItems[mealIndex][dayIndex];
            return newItems;
        });
    };

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePaymentStatus = async (data) => {
        try {
            const resp = await axios.post(`${process.env.REACT_APP_API}/api/user/paymentStatus`, data);
            if (resp.data) {
                handleToastOpen('Coupon Bought', 'success');
            } else {
                handleToastOpen('Transaction Failed', 'error');
            }
        } catch (error) {
            console.error('Error updating payment status:', error);
            handleToastOpen('Transaction Failed', 'error');
        }
    };

    const initPayment = async (res) => {
        const loaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!loaded) {
            handleToastOpen('Failed to load payment gateway', 'error');
            return;
        }

        const options = {
            key: process.env.REACT_APP_RAZORPAY_ID_KEY,
            amount: res.data.amount.toString(),
            currency: res.data.currency,
            order_id: res.data.id,
            handler: async (response) => {
                await handlePaymentStatus(response);
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handleBuy = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/user/initiatePayment`, {
                amount: totalCost,
                selected: selectedItems,
            });

            if (res.data) {
                initPayment(res);
            } else {
                handleToastOpen('Transaction Failed', 'error');
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            handleToastOpen('Transaction Failed', 'error');
        }
    };

    return (
        loading ? (
            <div style={{
                position: 'fixed',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
            }}>
                <div>Loading...</div>
            </div>
        ) : (
            <>
                {/* Bootstrap Alert for Toast */}
                {toastOpen && (
                    <Alert
                        variant={toastSeverity}
                        onClose={handleToastClose}
                        dismissible
                        className="mb-3"
                    >
                        {toastMessage}
                    </Alert>
                )}

                {/* Conditional rendering */}
                {!coupon || coupon.taken === false || (coupon.taken && getDayDifference(new Date().toISOString(), coupon.updatedAt) >= 5) ? (
                    <Container className="my-4">
                        {/* Card Component */}
                        <Card className="mb-4">
                            <Card.Body>
                                <Table striped hover className="table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            <th>{`Breakfast (Rs. ${mealCost.breakfast})`}</th>
                                            <th>{`Lunch (Rs. ${mealCost.lunch})`}</th>
                                            <th>{`Dinner (Rs. ${mealCost.dinner})`}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {menuData.map((meal) => (
                                            <tr key={meal._id}>
                                                {/* <td>{new Date(meal.day).toLocaleDateString()}</td> */}
                                                <td>{meal.day}</td>
                                                <td
                                                    onClick={() => handleCellClick(0, menuData.indexOf(meal))}
                                                    style={{
                                                        cursor: 'pointer',
                                                        backgroundColor: selectedItems[0][menuData.indexOf(meal)] ? 'lightgreen' : '',
                                                    }}
                                                >
                                                    {meal.breakfast}
                                                </td>
                                                <td
                                                    onClick={() => handleCellClick(1, menuData.indexOf(meal))}
                                                    style={{
                                                        cursor: 'pointer',
                                                        backgroundColor: selectedItems[1][menuData.indexOf(meal)] ? 'lightgreen' : '',
                                                    }}
                                                >
                                                    {meal.lunch}
                                                </td>
                                                <td
                                                    onClick={() => handleCellClick(2, menuData.indexOf(meal))}
                                                    style={{
                                                        cursor: 'pointer',
                                                        backgroundColor: selectedItems[2][menuData.indexOf(meal)] ? 'lightgreen' : '',
                                                    }}
                                                >
                                                    {meal.dinner}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>

                        {/* Total Amount */}
                        <Card className="mb-4">
                            <Card.Body>
                                <h5>Total Amount: Rs. {totalCost}</h5>
                            </Card.Body>
                        </Card>

                        {/* Buy Button */}
                        <div className="d-flex justify-content-center">
                            <Button variant="success" onClick={handleBuy}>
                                Buy
                            </Button>
                        </div>
                    </Container>
                ) : (
                    <AlreadyBought />
                )}
            </>
        )
    );
};

export default BuyCoupon;
