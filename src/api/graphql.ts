import {gql} from "@apollo/client";

export const GET_LAUNCHES = gql`
query ExampleQuery {
  company {
    ceo
  }
  roadster {
    apoapsis_au
  }
}`;