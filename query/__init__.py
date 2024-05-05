import strawberry
import query.expression
import query.generate
from core.decorators import custom_type
from core.math import Math

Expression = custom_type(query.expression.Expression)


@strawberry.type
class Query:
    @strawberry.field
    def expression(self, expr: Math) -> "Expression":
        return Expression(expr=expr)

    @strawberry.field
    def generate(self) -> query.generate.Generate:
        return query.generate.Generate()
