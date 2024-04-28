/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAuth } from '../../context/auth';
import Table from './Table';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import jsPDF from 'jspdf';
import qrcode from 'qrcode';


const MyCoupon = () => {
   
    const [menuData, setMenuData] = useState([]);
    const [auth] = useAuth();
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

    // const downloadPDF = () => {
    //     const doc = new jsPDF();
    //     doc.setFontSize(12);
    //     doc.text('My Coupon', 10, 10);

    //     let yPosition = 20; // Starting vertical position for the table data

    //     // Add headings
    //     doc.setFontSize(10);
    //     doc.text('Day', 10, yPosition);
    //     doc.text('Breakfast', 40, yPosition);
    //     doc.text('Lunch', 80, yPosition);
    //     doc.text('Dinner', 120, yPosition);

    //     yPosition += 10;

    //     // Add data from menuData
    //     menuData.forEach((meal, index) => {
    //         const breakfastSelected = coupon[0][index] ? 'Yes' : 'No';
    //         const lunchSelected = coupon[1][index] ? 'Yes' : 'No';
    //         const dinnerSelected = coupon[2][index] ? 'Yes' : 'No';

    //         doc.text(new Date(meal.day).toLocaleDateString(), 10, yPosition);
    //         doc.text(breakfastSelected, 40, yPosition);
    //         doc.text(lunchSelected, 80, yPosition);
    //         doc.text(dinnerSelected, 120, yPosition);

    //         yPosition += 10;
    //     });

    //     // Save the PDF
    //     doc.save('my_coupon.pdf');
    // };



// const downloadPDF = () => {
//     // Create a new jsPDF instance
//     const doc = new jsPDF();

//     // Set the title "MESS COUPON" at the top
//     doc.setFontSize(20);
//     doc.text('MESS COUPON', 10, 20);

//     // Set the font size for the buyer's information
//     doc.setFontSize(12);

//     // Add the buyer's information: name, mess ID, and email
//     doc.text(`Name: ${auth.user.name}`, 10, 30);
//     doc.text(`Mess ID: ${auth.user.messId}`, 10, 40);
//     doc.text(`Email: ${auth.user.email}`, 10, 50);

//     // Define the starting y-position for the table data
//     let yPosition = 60;

//     // Add table headers
//     doc.setFontSize(12);
//     doc.text('Day', 10, yPosition);
//     doc.text('Breakfast', 60, yPosition);
//     doc.text('Lunch', 100, yPosition);
//     doc.text('Dinner', 140, yPosition);

//     // Increment the y-position for the table data
//     yPosition += 10;

//     // Iterate over the menu data and selected items to add the data to the PDF
//     menuData.forEach((meal, index) => {
//         const dayName = meal.day; // Get the day name

//         // Get the item names for breakfast, lunch, and dinner
//         const breakfastItem = meal.breakfast || 'N/A';
//         const lunchItem = meal.lunch || 'N/A';
//         const dinnerItem = meal.dinner || 'N/A';

//         // Determine if each meal is selected
//         const breakfastSelected = coupon[0][index];
//         const lunchSelected = coupon[1][index];
//         const dinnerSelected = coupon[2][index];

//         // Add the day name to the PDF
//         doc.text(dayName, 10, yPosition);

//         // Highlight breakfast if selected
//         if (breakfastSelected) {
//             doc.setFillColor(173, 216, 230); // Light blue color
//             doc.rect(60, yPosition - 5, 30, 10, 'F');
//         }
//         doc.text(breakfastItem, 60, yPosition);

//         // Highlight lunch if selected
//         if (lunchSelected) {
//             doc.setFillColor(173, 216, 230); // Light blue color
//             doc.rect(100, yPosition - 5, 30, 10, 'F');
//         }
//         doc.text(lunchItem, 100, yPosition);

//         // Highlight dinner if selected
//         if (dinnerSelected) {
//             doc.setFillColor(173, 216, 230); // Light blue color
//             doc.rect(140, yPosition - 5, 30, 10, 'F');
//         }
//         doc.text(dinnerItem, 140, yPosition);

//         // Increment the y-position for the next row
//         yPosition += 10;
//     });

//     // Generate the QR code for the current page URL and place it in the PDF
//     const currentUrl = window.location.href; // Get the current page URL
//     const qrCodeX = 160; // X-coordinate for QR code
//     const qrCodeY = 20; // Y-coordinate for QR code
//     doc.qrCode(currentUrl, qrCodeX, qrCodeY, { width: 40, height: 40 });

//     // Save the PDF file with the specified name
//     doc.save('my_coupon.pdf');
// };

// const downloadPDF = () => {
//     // Create a new jsPDF instance
//     const doc = new jsPDF();

//     // Set the title "MESS COUPON" at the top
//     doc.setFontSize(20);
//     doc.text('MESS COUPON', 10, 20);

//     // Set the font size for the buyer's information
//     doc.setFontSize(12);

//     // Add the buyer's information: name, mess ID, and email
//     doc.text(`Name: ${auth.user.name}`, 10, 30);
//     doc.text(`Mess ID: ${auth.user.messId}`, 10, 40);
//     doc.text(`Email: ${auth.user.email}`, 10, 50);

//     // Define the starting y-position for the table data
//     let yPosition = 60;

//     // Add table headers
//     doc.setFontSize(12);
//     doc.text('Day', 10, yPosition);
//     doc.text('Breakfast', 60, yPosition);
//     doc.text('Lunch', 100, yPosition);
//     doc.text('Dinner', 140, yPosition);

//     // Increment the y-position for the table data
//     yPosition += 10;

//     // Iterate over the menu data and selected items to add the data to the PDF
//     menuData.forEach((meal, index) => {
//         const dayName = meal.day;

//         // Get the item names for breakfast, lunch, and dinner
//         const breakfastItem = meal.breakfast || 'N/A';
//         const lunchItem = meal.lunch || 'N/A';
//         const dinnerItem = meal.dinner || 'N/A';

//         // Determine if each meal is selected
//         const breakfastSelected = coupon[0][index];
//         const lunchSelected = coupon[1][index];
//         const dinnerSelected = coupon[2][index];

//         // Add the day name to the PDF
//         doc.text(dayName, 10, yPosition);

//         // Add breakfast item and highlight if selected
//         if (breakfastSelected) {
//             doc.setFillColor(173, 216, 230); // Light blue color
//             doc.rect(60, yPosition - 5, 30, 10, 'F');
//         }
//         doc.text(breakfastItem, 60, yPosition);

//         // Add lunch item and highlight if selected
//         if (lunchSelected) {
//             doc.setFillColor(173, 216, 230); // Light blue color
//             doc.rect(100, yPosition - 5, 30, 10, 'F');
//         }
//         doc.text(lunchItem, 100, yPosition);

//         // Add dinner item and highlight if selected
//         if (dinnerSelected) {
//             doc.setFillColor(173, 216, 230); // Light blue color
//             doc.rect(140, yPosition - 5, 30, 10, 'F');
//         }
//         doc.text(dinnerItem, 140, yPosition);

//         // Increment the y-position for the next row
//         yPosition += 10;
//     });

//     // Generate the QR code for the current page URL and add it as an image to the PDF
//     const currentUrl = window.location.href; // Get the current page URL

//     qrcode.toDataURL(currentUrl).then((qrDataUrl) => {
//         // Add the QR code image to the PDF
//         doc.addImage(qrDataUrl, 'PNG', 160, 20, 40, 40);

//         // Save the PDF
//         doc.save('my_coupon.pdf');
//     });
// };

// const downloadPDF = () => {
//     // Create a new jsPDF instance
//     const doc = new jsPDF();

//     // Set the title "MESS COUPON" at the top
//     doc.setFontSize(20);
//     doc.text('MESS COUPON', 10, 20);

//     // Set the font size for the buyer's information
//     doc.setFontSize(12);

//     // Add the buyer's information: name, mess ID, and email
//     doc.text(`Name: ${auth.user.name}`, 10, 30);
//     doc.text(`Mess ID: ${auth.user.messId}`, 10, 40);
//     doc.text(`Email: ${auth.user.email}`, 10, 50);

//     // Define the starting y-position for the table data
//     let yPosition = 60;

//     // Check if the current path is '/dashboard/student'
//     if (window.location.pathname === '/dashboard/student') {
//         // Add room number and hostel name if the path matches
//         doc.text(`Room No: ${auth.user.roomNo}`, 10, 60);
//         doc.text(`Hostel Name: ${auth.user.hostelName}`, 10, 70);
//         // Adjust starting y-position accordingly
//         yPosition = 80;
//     }

//     // Add table headers
//     doc.setFontSize(12);
//     doc.text('Day', 10, yPosition);
//     doc.text('Breakfast', 60, yPosition);
//     doc.text('Lunch', 100, yPosition);
//     doc.text('Dinner', 140, yPosition);

//     // Increment the y-position for the table data
//     yPosition += 10;

//     // Iterate over the menu data and selected items to add the data to the PDF
//     menuData.forEach((meal, index) => {
//         const dayName = meal.day;

//         // Get the item names for breakfast, lunch, and dinner
//         const breakfastItem = meal.breakfast || 'N/A';
//         const lunchItem = meal.lunch || 'N/A';
//         const dinnerItem = meal.dinner || 'N/A';

//         // Determine if each meal is selected
//         const breakfastSelected = coupon[0][index];
//         const lunchSelected = coupon[1][index];
//         const dinnerSelected = coupon[2][index];

//         // Add the day name to the PDF
//         doc.text(dayName, 10, yPosition);

//         // Add breakfast item and highlight if selected
//         if (breakfastSelected) {
//             doc.setFillColor(173, 216, 230); // Light blue color
//             doc.rect(60, yPosition - 5, 30, 10, 'F');
//         }
//         doc.text(breakfastItem, 60, yPosition);

//         // Add lunch item and highlight if selected
//         if (lunchSelected) {
//             doc.setFillColor(173, 216, 230); // Light blue color
//             doc.rect(100, yPosition - 5, 30, 10, 'F');
//         }
//         doc.text(lunchItem, 100, yPosition);

//         // Add dinner item and highlight if selected
//         if (dinnerSelected) {
//             doc.setFillColor(173, 216, 230); // Light blue color
//             doc.rect(140, yPosition - 5, 30, 10, 'F');
//         }
//         doc.text(dinnerItem, 140, yPosition);

//         // Increment the y-position for the next row
//         yPosition += 10;
//     });

//     // Generate the QR code for the current page URL and add it as an image to the PDF
//     const currentUrl = window.location.href;

//     qrcode.toDataURL(currentUrl).then((qrDataUrl) => {
//         // Add the QR code image to the PDF
//         doc.addImage(qrDataUrl, 'PNG', 160, 20, 40, 40);

//         // Save the PDF
//         doc.save('my_coupon.pdf');
//     });
// };


const downloadPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Retrieve auth data from local storage
    const user = localStorage.getItem("auth");
    const parsedData = JSON.parse(user);

    // Fetch hostel name from parsedData
    const hostelName = parsedData.messName;

    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // Format the date
    const formattedTime = currentDate.toLocaleTimeString(); // Format the time

    // Set the title "MESS COUPON" at the top
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('MESS COUPON', 10, 20);

    // Set the font size and style for the buyer's information
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

   // Add the buyer's information: name, mess ID, and email
doc.setFont('helvetica', 'bold');
doc.text(`Name: ${parsedData.user.name}`, 10, 30);
doc.text(`Mess ID: ${parsedData.user.messId}`, 10, 40);
doc.text(`Email: ${parsedData.user.email}`, 10, 50);

// Check if the current route ends with '/dashboard/student/mycoupons'
const currentUrl = window.location.href;
if (currentUrl.endsWith('/dashboard/student/mycoupons')) {
    // Add room number and hostel name only if the route ends with the specified path
    doc.text(`Room No: ${parsedData.user.roomNo}`, 10, 60);
    doc.text(`Hostel Name: ${hostelName}`, 10, 70);
}


    // Add the date and time when the coupon was bought
    doc.text(`Date: ${formattedDate}`, 10, 80);
    doc.text(`Time: ${formattedTime}`, 10, 90);

    // Define the starting y-position for the table data
    let yPosition = 100;

    // Add table headers
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Day', 10, yPosition);
    doc.text('Breakfast', 60, yPosition);
    doc.text('Lunch', 100, yPosition);
    doc.text('Dinner', 140, yPosition);

    // Add borders for the table header row
    doc.setDrawColor(0, 0, 0); // Black color for borders
    doc.setLineWidth(0.5); // Line width for borders
    doc.line(10, yPosition + 2, 170, yPosition + 2);

    // Increment the y-position for the table data
    yPosition += 10;

    // Iterate over the menu data and selected items to add the data to the PDF
    menuData.forEach((meal, index) => {
        const dayName = meal.day;

        // Get the item names for breakfast, lunch, and dinner
        const breakfastItem = meal.breakfast || 'N/A';
        const lunchItem = meal.lunch || 'N/A';
        const dinnerItem = meal.dinner || 'N/A';

        // Determine if each meal is selected
        const breakfastSelected = coupon[0][index];
        const lunchSelected = coupon[1][index];
        const dinnerSelected = coupon[2][index];

        // Add the day name to the PDF
        doc.setFont('helvetica', 'normal');
        doc.text(dayName, 10, yPosition);

        // Add breakfast item and highlight if selected
        if (breakfastSelected) {
            doc.setFillColor(173, 216, 230); // Light green color
            doc.rect(60, yPosition - 5, 30, 10, 'F');
        }
        doc.text(breakfastItem, 60, yPosition);

        // Add lunch item and highlight if selected
        if (lunchSelected) {
            doc.setFillColor(173, 216, 230); // Light green color
            doc.rect(100, yPosition - 5, 30, 10, 'F');
        }
        doc.text(lunchItem, 100, yPosition);

        // Add dinner item and highlight if selected
        if (dinnerSelected) {
            doc.setFillColor(173, 216, 230); // Light green color
            doc.rect(140, yPosition - 5, 30, 10, 'F');
        }
        doc.text(dinnerItem, 140, yPosition);

        // Increment the y-position for the next row
        yPosition += 10;
    });

    // Generate the QR code for the current page URL and add it as an image to the PDF
    qrcode.toDataURL(currentUrl).then((qrDataUrl) => {
        // Add the QR code image to the PDF
        doc.addImage(qrDataUrl, 'PNG', 160, 20, 40, 40);

        // Save the PDF
        doc.save('my_coupon.pdf');
    });
};

// Call the downloadPDF function when needed
// downloadPDF();




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
                            {/* Download PDF button */}
                            <Button onClick={downloadPDF} className="mt-3" variant="primary">
                                Download PDF
                            </Button>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default MyCoupon;
