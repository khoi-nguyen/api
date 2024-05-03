import fastapi
from fastapi.middleware.cors import CORSMiddleware
import strawberry
import strawberry.fastapi
import query


schema = strawberry.Schema(query=query.Query)
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
