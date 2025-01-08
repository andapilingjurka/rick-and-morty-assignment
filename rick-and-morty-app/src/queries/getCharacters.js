import { gql } from '@apollo/client';

const GET_CHARACTERS = gql`
query GetCharacters($page: Int, $status: String, $species: String) {
  characters(page: $page, filter: { status: $status, species: $species }) {
    info {
      next
    }
    results {
      id
      name
      status
      species
      gender
      origin {
        name
      }
      image
    }
  }
}
`;

export default GET_CHARACTERS;
