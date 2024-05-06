import random
import strawberry
import sympy
import typing
import query.expression

x = sympy.symbols("x")


@strawberry.type
class Generate:
    @strawberry.field
    def factorization(
        self,
        a: typing.List[int] = [1],
        x1: typing.List[int] = [1, 2, 3],
        x2: typing.List[int] = [1, 2, 3],
    ) -> query.expression.Expression:
        a = random.choice(a)
        x1 = random.choice(x1)
        x2 = random.choice(x2)
        return query.expression.Expression(expr=(a * x - x1) * (x - x2))
