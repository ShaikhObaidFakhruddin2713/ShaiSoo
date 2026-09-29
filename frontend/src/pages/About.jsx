import React from 'react';

const About = () => {
  const containerStyle = {
    maxWidth: '900px',
    margin: '2 auto',
    padding: '40px',
    background: '#0A123F',
    borderRadius: '16px',
    border: '1px solid rgba(242, 193, 67, 0.12)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
    textAlign: 'center'
  };

  const socialBtnStyle = {
    display: 'inline-block',
    margin: '10px',
    padding: '10px 20px',
    background: '#06102F',
    color: '#FCE475',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(242, 193, 67, 0.2)'
  };

  return (
    <div style={containerStyle}>

      <img
        src="/Shaikh.jpg"
        alt="@theshivanshvasu"
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '4px solid #F2C143',
          marginBottom: '20px',
          boxShadow: '0 4px 20px rgba(242, 193, 67, 0.35)'
        }}
      />

      <h2
        style={{
          fontSize: '2.5rem',
          marginBottom: '10px',
          color: '#FCE475'
        }}
      >
        About Me
      </h2>

      <h3
        style={{
          fontSize: '1.5rem',
          color: '#F2C143',
          marginBottom: '15px'
        }}
      >
        Shaikh Obaid (Founder of ShaiSoo) 
        <p></p>
      </h3>

      <p
        style={{
          color: '#C7CBD9',
          fontSize: '1.2rem',
          lineHeight: '1.8',
          maxWidth: '600px',
          margin: '0 auto 30px auto'
        }}
      >
        Full Stack Developer & Tech Enthusiast
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '20px'
        }}
      >

        <a
          href=""
          target="_blank"
          rel="noreferrer"
          style={socialBtnStyle}
        >
          🌐 Website
        </a>

        <a
          href=""
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: 'rgba(239, 68, 68, 0.1)',
            borderColor: '#EF4444',
            color: '#FF6B6B'
          }}
        >
          📺 YouTube
        </a>

        <a
          href=""
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: 'rgba(236, 72, 153, 0.1)',
            borderColor: '#EC4899',
            color: '#F472B6'
          }}
        >
          📸 Instagram
        </a>

        <a
          href=""
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: 'rgba(59, 130, 246, 0.1)',
            borderColor: '#3B82F6',
            color: '#60A5FA'
          }}
        >
          💼 LinkedIn
        </a>

        <a
          href=""
          target="_blank"
          rel="noreferrer"
          style={socialBtnStyle}
        >
          ✖️ X (Twitter)
        </a>

       

      </div>

    </div>
  );
};

export default About;