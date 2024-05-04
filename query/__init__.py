import strawberry
import query.expression
import query.generate
from core.math import Math


@strawberry.type
class Query:
    @strawberry.field
    def expression(self, expr: Math) -> query.expression.Expression:
        return query.expression.Expression(expr=expr)

    @strawberry.field
    def generate(self) -> query.generate.Generate:
        return query.generate.Generate()
