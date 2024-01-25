import { gql } from "@apollo/client";
export const GET_SORTED_AND_PAGINATED_EVENTS = gql`
query GetSortedAndPaginatedEvents($sortOption: String, $startIndex: Int, $itemsPerPage: Int) {
  events(sortOption: $sortOption, startIndex: $startIndex, itemsPerPage: $itemsPerPage) {
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
`;
