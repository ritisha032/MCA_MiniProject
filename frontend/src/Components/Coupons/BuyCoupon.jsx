/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react';
import axios from "axios";
import AlreadyBought from "./AlreadyBought";
import { useAuth } from '../../context/auth';

const BuyCoupon = () => {
 
    const [menuData, setMenuData] = useState([]);
    const [auth, setAuth] = useAuth();
    const [coupon, setCoupon] = useState();
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState('success');
    const [loadingMenu , setloadingMenu] = useState(false);
    const [loadingCoupon, setLoadingCoupon] = useState(false);

    const [bought, setBought] = useState(false);

    const handleToastOpen = (message, severity) => {
        setToastMessage(message);
        setToastSeverity(severity);
        setToastOpen(true);
      };
    
    const handleToastClose = () => {
        setToastOpen(false);
    };

    const [mealCost, setMealCost] = useState({
        breakfast: 0,
        lunch: 0,
        dinner: 0
    });
    const [total , setTotal] = useState(0);

  
    var date = new Date();
    var currentDateTime = date.toISOString(); 

    const getDayDifference = (dateString1, dateString2) => {
        const date1 = new Date(dateString1);
        const date2 = new Date(dateString2);

        const timeDifference = Math.abs(date2.getTime() - date1.getTime());

        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
        return daysDifference;
    }

    const mp = {'breakfast' : 0, 'lunch' : 1, 'dinner' : 2}
    const sortIdx = {'Monday' : 0, 'Tuesday' : 1, 'Wednesday' : 2, 'Thursday' : 3, 'Friday' : 4, 'Saturday' : 5, 'Sunday' : 6};
    const loggedInUser = JSON.parse(localStorage.getItem("auth"));
   // const config = getAxiosConfig({ loggedInUser });

    const fetchMenuData = async () => {      
        try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/user/getmenu`);
        
        //sort according to day name : 
        let data = response.data;
        data.sort((a,b)=>{return sortIdx[a.day] - sortIdx[b.day]})
        setMenuData(data);
        setloadingMenu(false);
        
        } catch (error) {
        console.error('Error fetching menu data:', error);
        }
    };

    const fetchCoupon = async()=>{
        try{
            const couponRes = await axios.post(`${process.env.REACT_APP_API}/api/user/getcoupon`,auth.user.email);
            setCoupon(couponRes.data);
            setLoadingCoupon(false);
        }catch(error){
            console.error('Error fetching data:', error);
        }
    }

    const check = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/user/getmeal`);
        //    console.log(response); // Log the entire response object
            const mealData = response.data;
            if (mealData && mealData.length > 0) {
                const breakfastCost = mealData.find(meal => meal.mealName === 'Breakfast')?.cost || 0;
                const lunchCost = mealData.find(meal => meal.mealName === 'Lunch')?.cost || 0;
                const dinnerCost = mealData.find(meal => meal.mealName === 'Dinner')?.cost || 0;
                setMealCost({
                    breakfast: breakfastCost,
                    lunch: lunchCost,
                    dinner: dinnerCost
                });
            } else {
                console.error("Response data is empty or not in the expected format.");
            }
        } catch (error) {
            console.error('Error fetching meal data:', error);
        }
    };
    

    useEffect(()=>{
        setLoadingCoupon(true);
        fetchCoupon();
    },[])

    useEffect(() => {
        setloadingMenu(true);
        fetchMenuData();
    }, []);

    useEffect(()=>{
        check();
    },[])

    const [selectedItems, setSelectedItems] = useState([
        [false, false, false, false, false, false, false], // Breakfast
        [false, false, false, false, false, false, false], // Lunch
        [false, false, false, false, false, false, false]  // Dinner
    ]);

    const handleCheckboxChange = (mealIndex, dayIndex)=>{
        const newSelected = [...selectedItems];
        newSelected[mealIndex][dayIndex] = !newSelected[mealIndex][dayIndex];
        setSelectedItems(newSelected);

        handleCost();
    }

    const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      };
    
    const paymentStatus = async(data)=>{
        const resp = await axios.post(`${process.env.REACT_APP_API}/api/user/paymentStatus`, data);
        console.log("response of payment status= ",resp);
        if(resp.data){
            handleToastOpen('Coupon Bought', 'success');
            setBought(true);
        }
        else{
            handleToastOpen('Transaction Failed', 'error');
        }
    }    
    const initPayment = async (res)=>{
        console.log("currently in initPayment block", res);
        const win = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
         );
    
        // Step 1: Check Razorpay Key
        console.log("Razorpay Key:", process.env.REACT_APP_RAZORPAY_ID_KEY);
    
        const options = {
            key: process.env.REACT_APP_RAZORPAY_ID_KEY,
            amount: res.data.amount.toString(),
            currency: res.data.currency,
            order_id: res.data.id,
            handler: async (res) => {
                await paymentStatus(res);
            }
        };
    
        console.log("options=", options);
    
        try {
            // Step 3: Verify Razorpay Initialization
            console.log("Razorpay Object:", window.Razorpay);
    
            // Step 4: Error Handling
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error initializing Razorpay:", error);
        }
    }
    

    const handleBuy = async()=>{
        // const response = await axios.post("/api/user/buyCoupon", {email : loggedInUser.email, selected : selectedItems}, config)
        // navigate('/pay', { state: { total } });
        try{
            
            const res = await axios.post(`${process.env.REACT_APP_API}/api/user/initiatePayment`, {amount : total, selected : selectedItems});
            console.log("res= ",res);
            initPayment(res);
        }catch(error){
            handleToastOpen('Transaction Failed', 'error');
        }
    }

    const handleCost = () => {
        
        let totalCost = 0;

        // Calculate total cost based on selected checkboxes
        selectedItems[mp['breakfast']].forEach((isSelected, index) => {
            if (isSelected) {
                totalCost +=mealCost.breakfast; 
            }
        });

        selectedItems[mp['lunch']].forEach((isSelected, index) => {
            if (isSelected) {
                totalCost += mealCost.lunch;
            }
        });

        selectedItems[mp['dinner']].forEach((isSelected, index) => {
            if (isSelected) {
                totalCost += mealCost.dinner; 
            }
        });
        setTotal(totalCost);
    };

    return(

        loadingMenu || loadingCoupon ? (
            // Show loading indicator while data is being fetched
            <div style={{ position: "fixed", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }}>
                <div>Loading...</div>
            </div>
        ) : (
            <>
                {!bought && (!coupon || ((coupon.taken===true && getDayDifference(currentDateTime, coupon.updatedAt) >=5) || coupon.taken===false)) ? (
                    <div style={{ marginTop: "5vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        {/* Toast Component */}
                        {toastOpen && (
                            <div style={{ backgroundColor: toastSeverity === "error" ? "red" : "green", color: "white", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
                                {toastMessage}
                            </div>
                        )}
                        {/* Table Component */}
                        <div style={{ backgroundColor: "white", borderRadius: "5px", padding: "15px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
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
                                    {menuData.map((rowData, index) => (
                                        <tr key={index}>
                                            <td>{rowData.day}</td>
                                            <td
                                                style={{ cursor: 'pointer', backgroundColor: selectedItems[0]?.[index] && "#ceface" }}
                                                onClick={() => handleCheckboxChange(0, index)}
                                            >
                                                {rowData.breakfast}
                                            </td>
                                            <td
                                                style={{ cursor: 'pointer', backgroundColor: selectedItems[1]?.[index] && "#ceface" }}
                                                onClick={() => handleCheckboxChange(1, index)}
                                            >
                                                {rowData.lunch}
                                            </td>
                                            <td
                                                style={{ cursor: 'pointer', backgroundColor: selectedItems[2]?.[index] && "#ceface" }}
                                                onClick={() => handleCheckboxChange(2, index)}
                                            >
                                                {rowData.dinner}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Total cost and Buy Button */}
                        <div style={{ marginTop: "20px", textAlign: "right" }}>
                            <div style={{ marginBottom: "10px" }}>
                                <h6>{`Total cost: ₹${total}.00`}</h6>
                            </div>
                            <button style={{ padding: "10px", backgroundColor: total === 0 ? "gray" : "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={handleBuy} disabled={total === 0}>
                                Buy
                            </button>
                        </div>
                    </div>
                ) : (
                    <AlreadyBought/>
                )}
            </>
        )
        
    )
};

export default BuyCoupon;