import React from 'react';

export default function AlreadyBought() {
  return (
    <>
      <div style={{ maxWidth: 480, margin: 'auto', display: 'flex', minHeight: '100vh', textAlign: 'center', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>You've already bought coupon!</h3>
        <p style={{ color: 'gray', marginBottom: '2rem' }}>
          You have already bought a coupon for this week. Visit the purchase page later to buy a coupon for next week. You can visit the My Coupon section to see your coupons.
        </p>
        <div style={{ maxWidth: 300, maxHeight: 260, margin: 'auto', marginBottom: '3rem' }}>
          <img src="/assets/illustrations/illustration_payment.png" alt="Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        <a href="/dashboard/student/mycoupons" style={{ textDecoration: 'none', color: 'white' }}>
          <button style={{ padding: '0.75rem 1.5rem', backgroundColor: 'blue', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
            Go to My Coupon
          </button>
        </a>
      </div>
    </>
  );
}
