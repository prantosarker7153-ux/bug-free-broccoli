import React, { useState, useEffect } from 'react';
import { BellRing, MessageSquarePlus } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface NoticeBarProps {
  channelLink?: string;
  noticeChannelLink?: string;
}

const NoticeBar: React.FC<NoticeBarProps> = ({ noticeChannelLink }) => {
  const [noticeText, setNoticeText] = useState('🎬 New Content Added Daily! Enjoy High-Speed Streaming. ⚠️ আপনার পছন্দের মুভি বা সিরিজ খুঁজে পাচ্ছেন না? রিকোয়েস্ট করুন!');
  const [noticeEnabled, setNoticeEnabled] = useState(true);
  const [reqLink, setReqLink] = useState('https://t.me/cineflixrequestcontent');

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'config'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.noticeText) setNoticeText(data.noticeText);
        if (data.noticeEnabled !== undefined) setNoticeEnabled(data.noticeEnabled);
        if (data.noticeChannelLink) setReqLink(data.noticeChannelLink);
        else if (data.channelLink) setReqLink(data.channelLink);
      }
    }, () => {});
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (noticeChannelLink) setReqLink(noticeChannelLink);
  }, [noticeChannelLink]);

  if (!noticeEnabled) return null;

  return (
    <div style={{
      width: '100%', marginBottom: '24px',
      borderRadius: '16px', overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(220,180,60,0.08) 0%, rgba(14,14,20,0.95) 100%)',
      border: '1px solid rgba(220,180,60,0.18)',
      display: 'flex', alignItems: 'stretch',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    }}>
      {/* Left accent */}
      <div style={{
        width: '3px', flexShrink: 0,
        background: 'linear-gradient(to bottom, #DCB43C, #F59E0B)',
        borderRadius: '16px 0 0 16px',
      }} />

      <div style={{
        display: 'flex', alignItems: 'center',
        gap: '10px', flex: 1,
        padding: '11px 12px 11px 14px',
        minWidth: 0,
      }}>
        {/* Bell */}
        <div style={{
          width: 32, height: 32, flexShrink: 0,
          borderRadius: '10px',
          background: 'rgba(220,180,60,0.12)',
          border: '1px solid rgba(220,180,60,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <BellRing size={14} style={{ color: '#DCB43C' }} />
        </div>

        {/* Scrolling text */}
        <div style={{
          flex: 1, overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        }}>
          <div style={{ animation: 'noticeScroll 28s linear infinite', whiteSpace: 'nowrap' }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px', fontWeight: 500,
              color: 'rgba(255,255,255,0.7)',
            }}>
              {noticeText}&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;{noticeText}&nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>

        {/* REQ button */}
        <button
          onClick={() => window.open(reqLink, '_blank')}
          style={{
            flexShrink: 0,
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '7px 12px',
            borderRadius: '10px',
            background: 'rgba(220,180,60,0.12)',
            border: '1px solid rgba(220,180,60,0.3)',
            color: '#DCB43C',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '10px', fontWeight: 800,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <MessageSquarePlus size={11} />
          REQ
        </button>
      </div>

      <style>{`
        @keyframes noticeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default NoticeBar;
