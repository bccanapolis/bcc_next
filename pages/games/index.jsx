import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '@/context/Global';

export default function GamesPage() {
  const router = useRouter();
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    if (globalContext.years instanceof Array && globalContext.years.length) {
      const lastYear = Math.max(...globalContext.years);
      router.push(`/games/${lastYear}`);
    }
  }, [globalContext.years]);

  return (
    <>
    </>
  );
}