import { gql } from '@apollo/client'
import client from '@/apollo-client'

export async function getServerSideProps({ res, params }) {
  const query = gql`
      query ano {
          game_aggregated(groupBy: "year") {
              group
          }
      }
  `

  const { game_aggregated } = (await client.query({ query })).data

  const years = game_aggregated.map(item => new Date(item.group.year).getFullYear())

  const lastYear = Math.max(...years)

  res.statusCode = 302
  res.setHeader('Location', `/games/${lastYear}`) // Replace <link> with your url link
  return { props: {} }
}

export default function GamesPage() {
  return (
    <></>
  )
}