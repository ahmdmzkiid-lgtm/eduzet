import React, { useCallback, useEffect, useRef } from 'react';

/**
 * NoCopy – wrapper component that prevents copying, selecting, and
 * right-clicking on its children.  Used to protect soal content.
 *
 * Features:
 *  - CSS user-select: none
 *  - Blocks right-click context menu
 *  - Blocks Ctrl+C / Ctrl+A / Ctrl+X keyboard shortcuts
 *  - Blocks drag-start on text/images
 *  - Blocks print-screen (best effort)
 */
const NoCopy = ({ children, className = '', style = {} }) => {
  const ref = useRef(null);

  const prevent = useCallback((e) => {
    e.preventDefault();
    return false;
  }, []);

  const handleKeyDown = useCallback((e) => {
    // Block Ctrl+C, Ctrl+A, Ctrl+X, Ctrl+P, Ctrl+S
    if (e.ctrlKey && ['c', 'a', 'x', 'p', 's'].includes(e.key.toLowerCase())) {
      e.preventDefault();
      return false;
    }
    // Block PrintScreen
    if (e.key === 'PrintScreen') {
      e.preventDefault();
      return false;
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Attach listeners with passive: false so preventDefault works
    el.addEventListener('contextmenu', prevent, { passive: false });
    el.addEventListener('dragstart', prevent, { passive: false });
    el.addEventListener('selectstart', prevent, { passive: false });
    el.addEventListener('copy', prevent, { passive: false });
    el.addEventListener('cut', prevent, { passive: false });
    el.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      el.removeEventListener('contextmenu', prevent);
      el.removeEventListener('dragstart', prevent);
      el.removeEventListener('selectstart', prevent);
      el.removeEventListener('copy', prevent);
      el.removeEventListener('cut', prevent);
      el.removeEventListener('keydown', handleKeyDown);
    };
  }, [prevent, handleKeyDown]);

  return (
    <div
      ref={ref}
      className={`no-copy-zone ${className}`}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default NoCopy;
