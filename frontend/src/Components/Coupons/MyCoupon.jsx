/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAuth } from '../../context/auth';
import Table from './Table';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MyCoupon = () => {

    const [menuData, setMenuData] = useState([]);
    const [auth, setAuth] = useAuth();
    const [coupon, setCoupon] = useState([
        [false, false, false, false, false, false, false], // Breakfast
        [false, false, false, false, false, false, false], // Lunch
        [false, false, false, false, false, false, false]  // Dinner
    ]);
    const [loadingMenu, setLoadingMenu] = useState(false);

    const sortIdx = {
        'Monday': 0, 
        'Tuesday': 1, 
        'Wednesday': 2, 
        'Thursday': 3, 
        'Friday': 4, 
        'Saturday': 5, 
        'Sunday': 6
    };
    
    // Fetch coupon data
    const fetchCoupon = async () => {
        try {
            const couponRes = await axios.post(`${process.env.REACT_APP_API}/api/user/getcoupon`, { email: auth.user.email });
            console.log("couponRes= ", couponRes);
            if (couponRes !== null) setCoupon(couponRes.data.week);
        } catch (error) {
            console.error('Error fetching coupon data:', error);
        }
    };

    useEffect(() => {
        fetchCoupon();
    }, []);

    // Fetch menu data
    const fetchMenuData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/user/getmenu`);
            console.log("response= ", response);

            // Sort menu data according to day name
            let data = response.data;
            data.sort((a, b) => sortIdx[a.day] - sortIdx[b.day]);
            setMenuData(data);
            setLoadingMenu(false);
        } catch (error) {
            console.error('Error fetching menu data:', error);
        }
    };

    useEffect(() => {
        setLoadingMenu(true);
        fetchMenuData();
    }, []);

    return (
        <>
            {loadingMenu ? (
                // Loading Spinner
                <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Spinner animation="border" variant="primary" />
                </Container>
            ) : (
                // Display table
                <Container style={{ marginTop: '2rem' }}>
                    <Row className="justify-content-center">
                        <Col md={10}>
                            <Table data={menuData} taken={coupon} title='My Coupon' />
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default MyCoupon;
