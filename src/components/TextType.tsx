import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  className?: string;
  children?: ReactNode;
}

const TextType = ({
  text,
  typingSpeed = 65,
  deletingSpeed,
  pauseDuration = 1200,
  showCursor = true,
  cursorCharacter = '|',
  className = '',
  children,
}: TextTypeProps) => {
  const phrases = useMemo(() => text.filter(Boolean), [text]);
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const isMountedRef = useRef(true);

  const effectiveDeletingSpeed = deletingSpeed ?? Math.max(typingSpeed / 2, 25);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!phrases.length) return;

    const currentPhrase = phrases[phraseIndex % phrases.length];

    if (!currentPhrase) {
      setPhraseIndex((index) => (index + 1) % phrases.length);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentPhrase) {
      timer = setTimeout(() => {
        if (isMountedRef.current) {
          setIsDeleting(true);
        }
      }, pauseDuration);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setPhraseIndex((index) => (index + 1) % phrases.length);
    } else {
      const nextLength = displayText.length + (isDeleting ? -1 : 1);
      const nextText = currentPhrase.slice(0, nextLength);

      timer = setTimeout(() => {
        if (isMountedRef.current) {
          setDisplayText(nextText);
        }
      }, isDeleting ? effectiveDeletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [
    displayText,
    effectiveDeletingSpeed,
    isDeleting,
    pauseDuration,
    phraseIndex,
    phrases,
    typingSpeed,
  ]);

  useEffect(() => {
    if (!phrases.length) {
      setDisplayText('');
    } else if (phraseIndex >= phrases.length) {
      setPhraseIndex(0);
    }
  }, [phrases, phraseIndex]);

  if (!phrases.length) {
    return <>{children}</>;
  }

  return (
    <div className={`flex flex-col gap-6 ${className}`.trim()}>
      <div className="min-h-[1.5rem] text-xs uppercase tracking-[0.45em] text-[#76c5ff]/80 md:text-sm">
        <span>{displayText}</span>
        {showCursor && (
          <span className="ml-2 text-[#76c5ff] opacity-80">
            {cursorCharacter}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default TextType;
