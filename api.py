import fastapi
from fastapi.middleware.cors import CORSMiddleware
import strawberry
import strawberry.fastapi
import query.expression
import query.generate


@strawberry.type
class Query:
    @strawberry.field
    def expression(self, expr: query.expression.Math) -> query.expression.Expression:
        return query.expression.Expression(expr=expr)

    @strawberry.field
    def generate(self) -> query.generate.Generate:
        return query.generate.Generate()


schema = strawberry.Schema(query=Query)
graphql_app = strawberry.fastapi.GraphQLRouter(schema)
app = fastapi.FastAPI()
origins = [
    "https://nguyen.me.uk",
    "https://ngy.ecam.be",
    "http://localhost:3000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(graphql_app, prefix="/graphql")
