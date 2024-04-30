import strawberry
import sympy
import sympy.parsing.latex
import typing

Math = strawberry.scalar(
    typing.NewType("MathExpression", sympy.Basic),
    serialize=sympy.latex,
    parse_value=sympy.parsing.latex.parse_latex,
)

x = typing.cast(Math, sympy.Symbol("x"))


def as_math(x):
    return typing.cast(Math, x)


@strawberry.type
class Expression:
    expr: Math

    @strawberry.field
    def derivative(self, var: Math = x, n: int = 1) -> "Expression":
        return Expression(expr=as_math(sympy.diff(self.expr, var, n)))

    @strawberry.field
    def factorised(self) -> "Expression":
        return Expression(expr=as_math(sympy.factor(self.expr)))

    @strawberry.field
    def integral(self, var: Math = x) -> "Expression":
        return Expression(expr=as_math(sympy.integrate(self.expr, var)))

    @strawberry.field
    def is_equal(self, expr: Math) -> bool:
        return sympy.simplify(sympy.simplify(self.expr) - sympy.simplify(expr)) == 0

    @strawberry.field
    def is_factorised(self) -> bool:
        for term in self.expr.args:
            if sympy.factor(term).func == sympy.Mul:
                return False
        return True
