import GraphiQL from "graphiql";
import "graphiql/graphiql.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";

function graphQLFetcher<A, B>(graphQLParams: A): Promise<B> {
  return fetch(window.location.origin + "/graphql", {
    body: JSON.stringify(graphQLParams),
    headers: { "Content-Type": "application/json" },
    method: "post"
  }).then(response => response.json());
}

ReactDOM.render(<GraphiQL fetcher={graphQLFetcher} />, document.getElementById(
  "root"
) as HTMLElement);
