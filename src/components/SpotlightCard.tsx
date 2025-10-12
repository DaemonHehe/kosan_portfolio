import { ReactNode, useRef, useState } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  spotlightColor?: string;
}

const SpotlightCard = ({
  children,
  className = '',
  contentClassName = '',
  spotlightColor = 'rgba(118, 197, 255, 0.35)',
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const showHighlight = isFocused || isHovering;

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      className={`relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-sky-400/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-[#76c5ff]/40 sm:p-8 ${
        showHighlight ? 'bg-slate-50 dark:bg-white/10' : ''
      } ${className}`.trim()}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: showHighlight ? 0.65 : 0,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className={`relative z-10 ${contentClassName}`.trim()}>{children}</div>
    </div>
  );
};

export default SpotlightCard;
