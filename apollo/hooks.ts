import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";

export function usePolledQuery(query: DocumentNode, variables={}) {
    return useQuery(query, {
      pollInterval: 500,
      fetchPolicy: "cache-and-network",
      variables: variables
    });
}
