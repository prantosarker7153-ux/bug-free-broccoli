import React from 'react';
import { motion } from 'framer-motion';
import { Movie } from '../types';

interface TrendingRowProps {
  movies: Movie[];
  onClick: (movie: Movie) => void;
}

const TrendingRow: React.FC<TrendingRowProps> = ({ movies, onClick }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div style={{ marginBottom: '4px' }}>
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '16px',
          paddingLeft: '2px',
          paddingRight: '16px',
          paddingBottom: '10px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        className="no-scrollbar"
      >
        {movies.slice(0, 10).map((movie, index) => (
          <motion.div
            key={movie.id}
            onClick={() => onClick(movie)}
            whileTap={{ scale: 0.93 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            style={{
              position: 'relative',
              flexShrink: 0,
              width: '108px',
              height: '158px',
              cursor: 'pointer',
            }}
          >
            {/* Big rank number */}
            <div style={{
              position: 'absolute',
              left: '-8px',
              bottom: '-10px',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '96px',
              fontWeight: 900,
              lineHeight: 1,
              zIndex: 5,
              userSelect: 'none',
              pointerEvents: 'none',
              color: 'transparent',
              WebkitTextStroke: index === 0 ? '2.5px rgba(220,180,60,0.6)' : '2px rgba(255,255,255,0.1)',
              letterSpacing: '-0.04em',
            }}>
              {index + 1}
            </div>

            {/* Card */}
            <div style={{
              position: 'absolute',
              right: 0, top: 0,
              width: '84px', height: '124px',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#0f1420',
              zIndex: 10,
              boxShadow: index === 0
                ? '0 4px 20px rgba(220,180,60,0.25), 0 0 0 1px rgba(220,180,60,0.2)'
                : '0 4px 16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
            }}>
              <img
                src={movie.thumbnail}
                alt={movie.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
              }} />
              {/* #1 crown accent */}
              {index === 0 && (
                <div style={{
                  position: 'absolute', top: 6, right: 6,
                  background: 'rgba(220,180,60,0.9)',
                  borderRadius: '6px',
                  padding: '2px 5px',
                }}>
                  <span style={{ fontSize: '7px', fontWeight: 900, color: '#000', letterSpacing: '0.08em' }}>#1</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingRow;
