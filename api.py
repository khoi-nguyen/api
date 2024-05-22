import typing
import fastapi
from fastapi.middleware.cors import CORSMiddleware
import pydantic
import strawberry
import strawberry.fastapi
import query
import json
from app import documents


schema = strawberry.Schema(query=query.Query)
graphql_app = strawberry.fastapi.GraphQLRouter(schema)
app = fastapi.FastAPI(separate_input_output_schemas=False)
origins = [
    "https://nguyen.me.uk",
    "https://ngy.ecam.be",
    "http://localhost:3000",
    "http://localhost:3001",
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


def get_path(url: str) -> str:
    path = f"data/documents/{url}"
    if path.endswith("/"):
        path += "index"
    path += ".json"
    return path


@app.get("/documents/{url}", operation_id="read_document")
async def read_document(url: str) -> documents.Page:
    path = get_path(url)
    with open(path, "r") as file:
        return json.load(file)


@app.post(
    "/documents/{url}",
    status_code=fastapi.status.HTTP_201_CREATED,
    operation_id="write_document",
)
async def write_document(url: str, document: documents.Page):
    path = get_path(url)
    with open(path, "w") as file:
        json.dump(document.model_dump(mode="json"), file, indent=2)
    return {
        "url": url,
        "document": document,
    }
