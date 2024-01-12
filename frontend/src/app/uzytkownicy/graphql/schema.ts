import { gql } from "@apollo/client";

export const GET_USERS= gql`
    query {
        users {
            firstname,
            lastname,
            spotsVisited,
            localization,
            followers,
            following
        }
    }
`