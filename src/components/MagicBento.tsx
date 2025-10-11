import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

interface MagicBentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  glowColor?: string;
  className?: string;
  style?: CSSProperties;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const ensureKeyframes = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('magic-bento-keyframes')) return;

  const style = document.createElement('style');
  style.id = 'magic-bento-keyframes';
  style.textContent = `
    @keyframes magic-bento-twinkle {
      0%, 100% {
        opacity: 0.2;
        transform: scale(0.85);
      }
      50% {
        opacity: 0.9;
        transform: scale(1.1);
      }
    }

    @keyframes magic-bento-ripple {
      0% {
        transform: translate(-50%, -50%) scale(0.25);
        opacity: 0.5;
      }
      100% {
        transform: translate(-50%, -50%) scale(1.15);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
};

const MagicBento = ({
  textAutoHide = false,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  spotlightRadius = 260,
  particleCount = 18,
  glowColor = '118, 197, 255',
  className = '',
  style,
}: MagicBentoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    ensureKeyframes();
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: Math.max(0, particleCount) }, (_, index) => {
      const size = Math.random() * 6 + 2;
      return {
        id: index,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size,
        opacity: 0.4 + Math.random() * 0.5,
        duration: 8 + Math.random() * 6,
        delay: Math.random() * 4,
      };
    });
  }, [particleCount]);

  useEffect(() => {
    if (
      !enableSpotlight &&
      !enableTilt &&
      !enableMagnetism &&
      !clickEffect
    ) {
      return;
    }

    let frame = 0;

    const guard = (event: PointerEvent) => {
      if (!containerRef.current) return null;
      const rect = containerRef.current.getBoundingClientRect();
      const { clientX, clientY } = event;
      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      return { rect, inside, clientX, clientY };
    };

    const handlePointerMove = (event: PointerEvent) => {
      const data = guard(event);
      if (!data) return;

      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const { rect, inside, clientX, clientY } = data;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const percentX = rect.width ? (x / rect.width) * 2 - 1 : 0;
        const percentY = rect.height ? (y / rect.height) * 2 - 1 : 0;

        containerRef.current?.style.setProperty('--mx', `${x}px`);
        containerRef.current?.style.setProperty('--my', `${y}px`);

        if (enableTilt && layerRef.current) {
          if (inside) {
            const rotateX = (-percentY * 8).toFixed(2);
            const rotateY = (percentX * 8).toFixed(2);
            layerRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          } else {
            layerRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
          }
        }

        if (enableMagnetism && starsRef.current) {
          if (inside) {
            const translateX = (percentX * 14).toFixed(2);
            const translateY = (percentY * 14).toFixed(2);
            starsRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
          } else {
            starsRef.current.style.transform = 'translate3d(0, 0, 0)';
          }
        }
      });
    };

    const handlePointerLeave = () => {
      cancelAnimationFrame(frame);
      containerRef.current?.style.setProperty('--mx', '50%');
      containerRef.current?.style.setProperty('--my', '50%');

      if (layerRef.current) {
        layerRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
      }
      if (starsRef.current) {
        starsRef.current.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!clickEffect) return;
      const data = guard(event);
      if (!data?.inside || !containerRef.current) return;

      const { rect, clientX, clientY } = data;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const id = Date.now() + Math.random();

      setRipples((prev) => [...prev, { id, x, y }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 600);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(frame);
    };
  }, [enableSpotlight, enableTilt, enableMagnetism, clickEffect]);

  const spotlightStyle: CSSProperties | undefined = enableSpotlight
    ? {
        background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(${glowColor}, 0.25) 0%, rgba(${glowColor}, 0.16) ${
          spotlightRadius * 0.45
        }px, rgba(${glowColor}, 0) ${spotlightRadius}px)`,
      }
    : undefined;

  const mixBlendMode = textAutoHide ? 'screen' : 'normal';

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden [--mx:50%] [--my:50%] ${className}`.trim()}
      style={{ mixBlendMode, ...style }}
    >
      <div
        ref={layerRef}
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)' }}
      >
        {enableSpotlight && (
          <div
            className="absolute inset-0 opacity-80 transition-opacity duration-300 ease-out"
            style={spotlightStyle}
          />
        )}

        {enableBorderGlow && (
          <div
            className="absolute inset-[8%] rounded-[48px]"
            style={{
              border: `1px solid rgba(${glowColor}, 0.25)`,
              boxShadow: `0 0 80px rgba(${glowColor}, 0.25)`,
              filter: 'blur(0.2px)',
            }}
          />
        )}

        {enableStars && (
          <div ref={starsRef} className="absolute inset-0 transition-transform duration-500 ease-out">
            {particles.map((particle) => (
              <span
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  top: `${particle.top}%`,
                  left: `${particle.left}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: particle.opacity,
                  background: `rgba(${glowColor}, 0.85)`,
                  boxShadow: `0 0 ${particle.size * 2}px rgba(${glowColor}, 0.6)`,
                  animation: `magic-bento-twinkle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        {clickEffect &&
          ripples.map((ripple) => (
            <div
              key={ripple.id}
              className="pointer-events-none absolute aspect-square w-48 rounded-full border"
              style={{
                left: ripple.x,
                top: ripple.y,
                borderColor: `rgba(${glowColor}, 0.4)`,
                boxShadow: `0 0 25px rgba(${glowColor}, 0.25)`,
                animation: 'magic-bento-ripple 620ms ease-out forwards',
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default MagicBento;
