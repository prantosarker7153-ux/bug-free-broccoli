import React from 'react';
import { Home, Search, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomNavProps {
  activeTab: string;
  isVisible: boolean;
  onTabChange: (tab: 'home' | 'search' | 'favorites') => void;
}

const tabs = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'favorites', icon: Heart, label: 'My List' },
] as const;

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, isVisible, onTabChange }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <div style={{
          position: 'fixed', bottom: 20, left: 0, right: 0,
          zIndex: 50, display: 'flex', justifyContent: 'center',
          padding: '0 24px', pointerEvents: 'none',
        }}>
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 350, mass: 0.7 }}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '8px',
              borderRadius: '24px',
              background: 'rgba(14,14,18,0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05) inset',
            }}
          >
            {tabs.map(({ id, icon: Icon, label }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => onTabChange(id)}
                  style={{
                    position: 'relative',
                    display: 'flex', alignItems: 'center',
                    gap: isActive ? '8px' : '0px',
                    padding: isActive ? '10px 20px' : '10px 14px',
                    borderRadius: '16px',
                    border: 'none', cursor: 'pointer',
                    background: isActive ? 'rgba(220,180,60,0.12)' : 'transparent',
                    transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                    overflow: 'hidden',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-bg"
                      style={{
                        position: 'absolute', inset: 0,
                        borderRadius: '16px',
                        background: 'rgba(220,180,60,0.12)',
                        border: '1px solid rgba(220,180,60,0.25)',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    style={{
                      color: isActive ? '#DCB43C' : 'rgba(255,255,255,0.35)',
                      position: 'relative', zIndex: 1,
                      transition: 'color 0.25s',
                      fill: isActive && id === 'favorites' ? '#DCB43C' : 'none',
                    }}
                  />
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: '12px', fontWeight: 700,
                          color: '#DCB43C',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          position: 'relative', zIndex: 1,
                        }}
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BottomNav;
