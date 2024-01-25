import { gql } from "@apollo/client";

export const GET_USERS= gql`
    query {
        users {
            id,
            firstname,
            lastname,
            spotsVisited,
            localization,
            followersCount,
            followingsCount,
            eventsCount
        }
    }
`

