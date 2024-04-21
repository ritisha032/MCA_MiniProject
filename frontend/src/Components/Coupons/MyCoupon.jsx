/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAuth } from '../../context/auth';
import Table from './Table';


const MyCoupon = () => {

    const [menuData, setMenuData] = useState([]);
    const[auth,setAuth]=useAuth();
    const [coupon, setCoupon] = useState([
        [false, false, false, false, false, false, false], // Breakfast
        [false, false, false, false, false, false, false], // Lunch
        [false, false, false, false, false, false, false]  // Dinner
    ]);
    const [loadingMenu , setloadingMenu] = useState(false);

    const sortIdx = {'Monday' : 0, 'Tuesday' : 1, 'Wednesday' : 2, 'Thursday' : 3, 'Friday' : 4, 'Saturday' : 5, 'Sunday' : 6};
    const loggedInUser = JSON.parse(localStorage.getItem("auth"));
    

    const fetchCoupon = async()=>{
        try{
            const couponRes = await axios.post(`${process.env.REACT_APP_API}/api/user/getcoupon`, {email:auth.user.email});
            console.log("couponRes= ",couponRes);
            if(couponRes != null) setCoupon(couponRes.data.week);
        }catch(error){
            console.error('Error fetching data:', error);
        }
    }

    useEffect(()=>{
        fetchCoupon();
    },[])


    const fetchMenuData = async () => {      
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/user/getmenu`);
            console.log("response= ",response);

            //sort according to day name : 
            let data = response.data;
            data.sort((a, b) => {return sortIdx[a.day] - sortIdx[b.day]});
            setMenuData(data);
            setloadingMenu(false);

        } catch (error) {
            console.error('Error fetching menu data : ', error);
        }
    };

    useEffect(()=>{
        setloadingMenu(true);
        fetchMenuData();
    },[]);

    return (   
        <>
        {loadingMenu ? <div>Loading...</div> : 
        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '5rem' }}>
            <Table data={menuData} taken={coupon} title='My Coupon' />
        </div>
        }
        </>
    );
};

export default MyCoupon;
