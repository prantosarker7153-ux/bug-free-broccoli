import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, onToggleFavorite, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      onClick={() => onClick(movie)}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'relative',
        aspectRatio: '2/3',
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#0f1420',
        boxShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      {/* SHIMMER LOADING */}
      {!loaded && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(110deg, #0f1420 30%, #1a2035 50%, #0f1420 70%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
      )}

      {/* POSTER */}
      <img
        src={movie.thumbnail}
        alt={movie.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s',
        }}
      />

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(8,8,12,0.95) 0%, rgba(8,8,12,0.5) 30%, transparent 55%)',
      }} />

      {/* Upcoming badge */}
      {movie.isUpcoming && (
        <div style={{
          position: 'absolute', top: 8, left: 0, zIndex: 10,
          background: 'linear-gradient(90deg, #7C3AED, #A78BFA)',
          padding: '3px 9px 3px 7px',
          borderRadius: '0 8px 8px 0',
        }}>
          <span style={{ fontSize: '7.5px', fontWeight: 800, color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase' }}>SOON</span>
        </div>
      )}

      {/* Fav button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(movie.id); }}
        style={{
          position: 'absolute', top: 8, right: 8, zIndex: 10,
          width: 26, height: 26, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isFavorite ? 'rgba(239,68,68,0.9)' : 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(10px)',
          border: isFavorite ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.1)',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <Heart size={11} style={{ color: '#fff', fill: isFavorite ? '#fff' : 'none' }} />
      </button>

      {/* BOTTOM INFO */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '8px 9px 10px', zIndex: 10,
      }}>
        <h3 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '12.5px', fontWeight: 700,
          color: '#fff', lineHeight: '1.2', marginBottom: '4px',
          overflow: 'hidden',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          letterSpacing: '-0.01em',
        }}>
          {movie.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#DCB43C', fontSize: '9px' }}>★</span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 700, color: '#DCB43C' }}>{movie.rating}</span>
          <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 2px' }}>·</span>
          <span style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: '9px', color: 'rgba(255,255,255,0.4)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '65%',
          }}>
            {movie.category === 'Korean Drama' ? 'K-Drama' : movie.category}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </motion.div>
  );
};

export default MovieCard;
