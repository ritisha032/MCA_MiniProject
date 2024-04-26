import React, { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import AlreadyBought from "./AlreadyBought";
import { useAuth } from '../../context/auth';

const BuyCoupon = () => {
    const [menuData, setMenuData] = useState([]);
    const [auth] = useAuth();
    const [coupon, setCoupon] = useState();
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState('success');
    const [loading, setLoading] = useState(true);

    const [selectedItems, setSelectedItems] = useState([
        [false, false, false, false, false, false, false], // Breakfast
        [false, false, false, false, false, false, false], // Lunch
        [false, false, false, false, false, false, false]  // Dinner
    ]);
    
    const handleToastOpen = (message, severity) => {
        setToastMessage(message);
        setToastSeverity(severity);
        setToastOpen(true);
    };

    const handleToastClose = () => {
        setToastOpen(false);
    };

    const currentDateTime = new Date().toISOString();

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
                dinner: dinnerCost
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

    const handleCheckboxChange = (mealIndex, dayIndex) => {
        setSelectedItems(prevItems => {
            const newItems = [...prevItems];
            newItems[mealIndex][dayIndex] = !newItems[mealIndex][dayIndex];
            return newItems;
        });
    };

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
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
        const loaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

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
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handleBuy = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/user/initiatePayment`, {
                amount: totalCost,
                selected: selectedItems
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
            <div style={{ position: "fixed", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }}>
                <div>Loading...</div>
            </div>
        ) : (
            <>
                {/* Toast Component */}
                {toastOpen && (
                    <div style={{
                        backgroundColor: toastSeverity === "error" ? "red" : "green",
                        color: "white",
                        padding: "10px",
                        borderRadius: "5px",
                        marginBottom: "10px"
                    }}>
                        {toastMessage}
                    </div>
                )}
                
                {/* Conditional rendering */}
                {!coupon || coupon.taken === false || (coupon.taken && getDayDifference(currentDateTime, coupon.updatedAt) >= 5) ? (
                    <div style={{ marginTop: "5vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        {/* Table Component */}
                        <div style={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            padding: "15px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                        }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "lightgray", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                                        <th>Day</th>
                                        <th>{`Breakfast (Rs. ${mealCost.breakfast})`}</th>
                                        <th>{`Lunch (Rs. ${mealCost.lunch})`}</th>
                                        <th>{`Dinner (Rs. ${mealCost.dinner})`}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {menuData.map((menu, index) => (
                                        <tr key={index}>
                                            <td style={{ textAlign: "center", padding: "5px 10px", borderBottom: "1px solid lightgray" }}>
                                                {new Date(menu.day).toLocaleDateString()}
                                            </td>
                                            <td style={{ textAlign: "center", padding: "5px 10px", borderBottom: "1px solid lightgray" }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems[0][index]}
                                                    onChange={() => handleCheckboxChange(0, index)}
                                                />
                                            </td>
                                            <td style={{ textAlign: "center", padding: "5px 10px", borderBottom: "1px solid lightgray" }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems[1][index]}
                                                    onChange={() => handleCheckboxChange(1, index)}
                                                />
                                            </td>
                                            <td style={{ textAlign: "center", padding: "5px 10px", borderBottom: "1px solid lightgray" }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems[2][index]}
                                                    onChange={() => handleCheckboxChange(2, index)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Total cost and buy button */}
                        <div style={{ marginTop: "20px", textAlign: "center" }}>
                            <p>{`Total: Rs. ${totalCost}`}</p>
                            <button
                                style={{ padding: "10px 20px", backgroundColor: "green", color: "white", borderRadius: "5px", cursor: "pointer" }}
                                onClick={handleBuy}
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                ) : (
                    <AlreadyBought />
                )}
            </>
        )
    );
};

export default BuyCoupon;
