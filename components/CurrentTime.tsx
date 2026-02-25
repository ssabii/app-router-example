'use client';

import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('ko-KR', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export default function CurrentTime() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return <time className="text-xl tabular-nums">{formatter.format(time)}</time>;
}
