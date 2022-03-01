import { createContext, useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import client from '@/apollo-client';

export const GlobalContext = createContext({});

export default function GlobalProvider({ children }) {
  const [years, setYears] = useState([]);

  useEffect(async () => {
    if (!!years.length) return;
    const query = gql`
        query ano {
            game_aggregated(groupBy: "year") {
                group
            }
        }
    `;

    const { game_aggregated } = (await client.query({ query })).data;

    const response = game_aggregated.map(item => new Date(item.group.year).getFullYear());

    setYears(response);
  }, [years]);

  return (
    <>
      <GlobalContext.Provider value={{ years, setYears }}>
        {children}
      </GlobalContext.Provider>
    </>
  );
}