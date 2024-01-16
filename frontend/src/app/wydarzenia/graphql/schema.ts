import { gql } from "@apollo/client";

export const GET_EVENTS= gql`
    query {
        
            events {
              name
            }
          
    }
`