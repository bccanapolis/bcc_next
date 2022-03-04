import { createContext, useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import client from '@/apollo-client';
import slugify from 'slugify';

export const GlobalContext = createContext({});

export default function GlobalProvider({ children }) {
  const [years, setYears] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    if (!!years.length) return;
    const query = gql`
        {
            game_aggregated(groupBy: "year") {
                group
            }
            project(sort: "title") {
                slug
            }
        }
    `;

    const { game_aggregated, project } = (await client.query({ query })).data;

    setYears(game_aggregated.map(item => new Date(item.group.year).getFullYear()));
    setProjects(project.map(item => item.slug));
  }, [years, projects]);

  return (
    <>
      <GlobalContext.Provider value={{ years, projects }}>
        {children}
      </GlobalContext.Provider>
    </>
  );
}