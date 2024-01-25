import { gql } from "@apollo/client";

export const GET_EVENTS= gql`
query {
  events {
    id
    name
    localization
    date
    general_information
    competitions
    localization_details
    attendees {
      id
      firstname
      lastname
    }
    comments {
      id
      content
      createDate
      user {
        id
        firstname
        lastname
      }
    }
  }
}
`