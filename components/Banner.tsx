import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, Star } from 'lucide-react';
import { Movie } from '../types';

interface BannerProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  onPlay: (movie: Movie) => void;
  currentIndex?: number;
  totalBanners?: number;
  onDotClick?: (index: number) => void;
}

const Banner: React.FC<BannerProps> = ({
  movie, onClick, onPlay,
  currentIndex = 0, totalBanners = 1, onDotClick
}) => {
  const displayImage = movie.bannerThumbnail || movie.thumbnail;
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) onDotClick?.((currentIndex + 1) % totalBanners);
      else onDotClick?.((currentIndex - 1 + totalBanners) % totalBanners);
    }
    touchStartX.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '2/3',
        maxHeight: '82vh',
        overflow: 'hidden',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* POSTER */}
          <img
            src={displayImage}
            alt={movie.title}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              pointerEvents: 'none',
            }}
          />

          {/* Cinematic vignette layers */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(8,8,12,0.55) 0%, transparent 30%, transparent 40%, rgba(8,8,12,0.97) 85%, #08080c 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(8,8,12,0.4) 0%, transparent 50%)',
          }} />

          {/* Premium side glow accent */}
          <div style={{
            position: 'absolute', left: 0, top: '30%', bottom: '20%',
            width: '3px',
            background: 'linear-gradient(to bottom, transparent, rgba(220,180,60,0.8), transparent)',
            borderRadius: '2px',
          }} />

          {/* CONTENT */}
          <div
            onClick={() => onClick(movie)}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '0 20px 52px',
              zIndex: 20,
            }}
          >
            {/* Category chip */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              style={{ marginBottom: '10px' }}
            >
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '9px', fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(220,180,60,1)',
                display: 'inline-flex', alignItems: 'center', gap: '5px',
              }}>
                <span style={{
                  width: '16px', height: '2px',
                  background: 'rgba(220,180,60,1)',
                  display: 'inline-block',
                  borderRadius: '2px',
                }} />
                {movie.category || 'Featured'}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(28px, 9.5vw, 48px)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: '0.97',
                marginBottom: '10px',
                letterSpacing: '-0.03em',
                textShadow: '0 4px 30px rgba(0,0,0,0.8)',
              }}
            >
              {movie.title}
            </motion.h1>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '14px',
              }}
            >
              {movie.rating && (
                <span style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  background: 'rgba(220,180,60,0.15)',
                  border: '1px solid rgba(220,180,60,0.3)',
                  padding: '3px 8px', borderRadius: '20px',
                }}>
                  <Star size={10} fill="#DCB43C" color="#DCB43C" />
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 700, color: '#DCB43C' }}>{movie.rating}</span>
                </span>
              )}
              {(movie as any).year && (
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{(movie as any).year}</span>
              )}
              {(movie as any).duration && (
                <>
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>·</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{(movie as any).duration}</span>
                </>
              )}
              {(movie.videoQuality || (movie as any).quality) && (
                <span style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: '8px', fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '2px 6px', borderRadius: '4px',
                  textTransform: 'uppercase',
                }}>
                  {movie.videoQuality || (movie as any).quality}
                </span>
              )}
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', gap: '10px' }}
            >
              <button
                onClick={(e) => { e.stopPropagation(); onPlay(movie); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: '#DCB43C',
                  color: '#000',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '12px', fontWeight: 900,
                  letterSpacing: '0.08em',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 24px rgba(220,180,60,0.4)',
                  textTransform: 'uppercase',
                  flex: 1,
                  justifyContent: 'center',
                  maxWidth: '160px',
                }}
              >
                <Play size={14} fill="#000" color="#000" />
                PLAY
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); onClick(movie); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  color: 'rgba(255,255,255,0.9)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px', fontWeight: 600,
                  padding: '12px 18px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  cursor: 'pointer',
                }}
              >
                <Info size={13} />
                Details
              </button>
            </motion.div>
          </div>

          {/* DOTS */}
          {totalBanners > 1 && (
            <div style={{
              position: 'absolute', bottom: 30, right: 20,
              display: 'flex', gap: '5px', zIndex: 30,
            }}>
              {[...Array(totalBanners)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); onDotClick?.(idx); }}
                  style={{
                    width: idx === currentIndex ? '22px' : '5px',
                    height: '4px',
                    borderRadius: '3px',
                    background: idx === currentIndex ? '#DCB43C' : 'rgba(255,255,255,0.2)',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Banner;
