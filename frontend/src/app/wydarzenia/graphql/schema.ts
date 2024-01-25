import { gql } from "@apollo/client";

export const GET_EVENTS= gql`
query{
  events{
    id,
    name,
    localization,
    date
    attendees{
      firstname,
      lastname
    }
  }
}
`