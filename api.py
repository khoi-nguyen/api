import fastapi
import strawberry
import strawberry.fastapi
import query.expression


@strawberry.type
class Query:
    @strawberry.field
    def expression(self, expr: query.expression.Math) -> query.expression.Expression:
        return query.expression.Expression(expr=expr)


schema = strawberry.Schema(query=Query)
graphql_app = strawberry.fastapi.GraphQLRouter(schema)
app = fastapi.FastAPI()
app.include_router(graphql_app, prefix="/graphql")
