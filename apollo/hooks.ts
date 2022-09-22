import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";

export function usePolledQuery(query: DocumentNode) {
    return useQuery(query, {
      pollInterval: 500,
      fetchPolicy: "cache-and-network",
    });
}
