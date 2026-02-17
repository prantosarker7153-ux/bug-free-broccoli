import React from 'react';
import { motion } from 'framer-motion';
import { Movie } from '../types';

interface StoryCircleProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  index: number;
  storyBadge?: string;
}

const getBadgeStyle = (badge: string): React.CSSProperties => {
  const b = badge.toUpperCase();
  if (b === 'HOT') return { background: 'linear-gradient(135deg, #EF4444, #F97316)', color: '#fff' };
  if (b === 'NEW') return { background: 'linear-gradient(135deg, #10B981, #34D399)', color: '#fff' };
  if (b === 'TOP') return { background: 'linear-gradient(135deg, #DCB43C, #F59E0B)', color: '#000' };
  if (b === 'LIVE') return { background: 'linear-gradient(135deg, #EF4444, #DC2626)', color: '#fff' };
  return { background: 'linear-gradient(135deg, #DCB43C, #F59E0B)', color: '#000' };
};

const StoryCircle: React.FC<StoryCircleProps> = ({ movie, onClick, index, storyBadge }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.07, type: 'spring', damping: 18 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px', cursor: 'pointer' }}
      onClick={() => onClick(movie)}
    >
      {/* Ring */}
      <div style={{
        position: 'relative',
        width: '58px', height: '58px',
        borderRadius: '50%',
        padding: '2.5px',
        background: 'conic-gradient(from 0deg, #DCB43C, #F59E0B, #EF4444, #8B5CF6, #DCB43C)',
        boxShadow: '0 3px 12px rgba(220,180,60,0.3)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}>
        <div style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          background: '#08080c',
          padding: '2.5px',
          overflow: 'hidden',
        }}>
          <img
            src={movie.thumbnail}
            alt={movie.title}
            style={{
              width: '100%', height: '100%',
              borderRadius: '50%',
              objectFit: 'cover', objectPosition: 'center top',
            }}
          />
        </div>

        {/* Badge */}
        {storyBadge && storyBadge.trim() !== '' && (
          <div style={{
            position: 'absolute', bottom: '-2px', left: '50%', transform: 'translateX(-50%)',
            ...getBadgeStyle(storyBadge),
            fontSize: '7px', fontWeight: 900,
            padding: '2px 6px', borderRadius: '20px',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            boxShadow: '0 1px 6px rgba(0,0,0,0.4)',
          }}>
            {storyBadge === 'LIVE' ? '● LIVE' : storyBadge.toUpperCase()}
          </div>
        )}
      </div>

      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '9.5px', fontWeight: 600,
        color: 'rgba(255,255,255,0.55)',
        maxWidth: '56px', textAlign: 'center',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {movie.title.split(' ')[0]}
      </span>
    </motion.div>
  );
};

export default StoryCircle;
