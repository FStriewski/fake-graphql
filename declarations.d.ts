declare module "graphiql" {
  export default class Graphiql extends React.Component<{
    fetcher: <A>(a: A) => void;
  }> {}
}
