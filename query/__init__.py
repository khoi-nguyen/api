import strawberry
import query.expression
import query.generate
from core.decorators import custom_type

Expression = custom_type(query.expression.Expression)


@strawberry.type
class Query:
    @strawberry.field
    def expression(self, expr: query.expression.Math) -> "Expression":
        return Expression(expr=expr)

    @strawberry.field
    def generate(self) -> query.generate.Generate:
        return query.generate.Generate()
