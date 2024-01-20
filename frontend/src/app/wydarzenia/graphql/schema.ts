import { gql } from "@apollo/client";

export const GET_EVENTS= gql`
query{
  events{
    id,
    name
    attendees{
      firstname,
      lastname,
      localization
    }
    
  }
}
`