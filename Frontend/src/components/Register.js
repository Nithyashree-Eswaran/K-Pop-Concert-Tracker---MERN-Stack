import React from 'react';
import './Register.css';

function Register() {
  const videos = [
    {
      group: 'BTS',
      title: 'BTS - MIKROKOSMOS (BTSFesta)',
      link: 'Iq6RdCTLBd8'
    },
    {
      group: 'BLACKPINK',
      title: 'BLACKPINK - DDU-DU DDU-DU (SBS Gayodaejun)',
      link: 'cxNIewNXpcg'
    },
    {
      group: 'TWICE',
      title: 'TWICE - CHEER UP (2024 TWICE FANMEETING)',
      link: '8tgs9Oq-7a4'
    },
    {
      group: 'EXO',
      title: 'EXO - LOVE SHOT (KBS)',
      link: 'ijGtxGHm5WI'
    },
    {
      group: 'Stray Kids',
      title: 'Stray Kids - CHK CHK BOOM (BillBoard Music Awards)',
      link: 'vBcmBn-5W0U'
    },
    {
      group: 'SEVENTEEN',
      title: 'SEVENTEEN - ROCK WITH YOU (inkigayo)',
      link: 'MDfqNPLXvbI'
    },
    {
      group: 'BOYNEXTDOOR',
      title: 'BOYNEXTDOOR - DANGEROUS (KBS World)',
      link: 'ZA7Dp7-ethI'
    },
    {
      group: 'ATEEZ',
      title: 'ATEEZ - WONDERLAND (M Countdown)',
      link: '-vphfDnAQDk'
    },
    {
      group: 'TXT',
      title: 'TXT - BLUE HOUR (KBS World)',
      link: 'GYa1RcgVgY4'
    },
    {
      group: 'NCT 127',
      title: 'NCT 127 - Kick It (KCON LA 2024)',
      link: 'Wv2rpgs1kHo'
    },
    {
      group: 'RED VELVET',
      title: 'RED VELVET - PEEK-A-BOO (MNet)',
      link: 'l0tV9L9wjJc'
    },
    {
      group: 'IU',
      title: 'IU - LOVE WINS ALL (2024 IU Hereh World Tour Seoul)',
      link: 'ax1csKKQnns'
    }
  ];

  return (
    <div className="concerts-container">
      <h1 className="concerts-title">💜Top K-Pop Concert Videos🖤</h1>
      <p className="concerts-description"><i>Relive the excitement with the most popular concert videos from your favorite K-Pop groups!</i></p>
      <div className="videos-grid">
        {videos.map((video, index) => (
          <div key={index} className="video-card">
            <h2>{video.group}</h2>
            <p>{video.title}</p>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${video.link}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Register;
