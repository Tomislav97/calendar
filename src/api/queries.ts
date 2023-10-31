import {useQuery} from "@apollo/client";
import {GET_LAUNCHES} from "./graphql";

export const GetLunches = () => {
    return useQuery<{ exampleQuery: any }>(GET_LAUNCHES)
}