import { gql } from "@apollo/client";

export const GET_EVENTS_TO_USERS= gql`
query {
    users {
        id,
            events {
                id,
                name,
                date,
                localization
            }
          
    }
}
`