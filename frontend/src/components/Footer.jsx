import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      style={{
        background: '#06102F',
        borderTop: '1px solid rgba(242, 193, 67, 0.15)',
        padding: '40px 20px',
        marginTop: 'auto'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <div>
          <h3
            style={{
              color: '#F2C143',
              marginBottom: '10px'
            }}
          >
            ShaiSoo
          </h3>

          <p
            style={{
              color: '#C7CBD9',
              fontSize: '0.9rem'
            }}
          >
            Premium E-Commerce Platform.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '20px'
          }}
        >
          <Link
            to="/about"
            style={{
              color: '#C7CBD9',
              fontSize: '0.9rem'
            }}
          >
            About Us
          </Link>

          <Link
            to="/return"
            style={{
              color: '#C7CBD9',
              fontSize: '0.9rem'
            }}
          >
            Return Policy
          </Link>

          <Link
            to="/disclaimer"
            style={{
              color: '#C7CBD9',
              fontSize: '0.9rem'
            }}
          >
            Disclaimer
          </Link>
        </div>

        <div
          style={{
            color: '#C7CBD9',
            fontSize: '0.9rem'
          }}
        >
          &copy; {new Date().getFullYear()} ShaiSoo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;