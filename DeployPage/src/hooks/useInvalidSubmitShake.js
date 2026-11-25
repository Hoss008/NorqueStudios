import { useState, useRef, useEffect } from 'react';

/**
 * UI-only hook that triggers a brief shake animation when the user submits
 * a form while validation errors are present, without altering form logic.
 */
export function useInvalidSubmitShake({ errors, isSubmitting, isSubmitted }) {
  const [isShaking, setIsShaking] = useState(false);
  const checkTimerRef = useRef(null);
  const resetTimerRef = useRef(null);
  const stateRef = useRef({ errors, isSubmitting, isSubmitted });
  stateRef.current = { errors, isSubmitting, isSubmitted };

  useEffect(() => () => {
    if (checkTimerRef.current) clearTimeout(checkTimerRef.current);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
  }, []);

  const notifySubmitAttempt = () => {
    if (checkTimerRef.current) clearTimeout(checkTimerRef.current);
    checkTimerRef.current = setTimeout(() => {
      const { errors: curErrors, isSubmitting: sub, isSubmitted: done } = stateRef.current;
      if (!done && !sub && curErrors && Object.keys(curErrors).length > 0) {
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        setIsShaking(false);
        requestAnimationFrame(() => {
          setIsShaking(true);
          resetTimerRef.current = setTimeout(() => setIsShaking(false), 450);
        });
      }
    }, 40);
  };

  return { isShaking, notifySubmitAttempt };
}
