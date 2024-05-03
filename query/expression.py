import strawberry
import sympy
import sympy.parsing.latex
import typing


def parse_latex(expr: str):
    parsed = sympy.parsing.latex.parse_latex(expr)
    subs = {
        sympy.Symbol("e"): sympy.E,
        sympy.Symbol("i"): sympy.I,
        sympy.Symbol("pi"): sympy.pi,
    }
    return parsed.subs(subs) if parsed else None


Math = strawberry.scalar(
    typing.NewType("MathExpression", sympy.Basic),
    serialize=sympy.latex,
    parse_value=parse_latex,
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
    def expanded(self) -> "Expression":
        return Expression(expr=as_math(sympy.expand(self.expr)))

    @strawberry.field
    def evalf(self, accuracy: int = 15) -> "Expression":
        return Expression(expr=sympy.N(self.expr, accuracy))

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
    def is_standard_form(self) -> bool:
        if self.expr.func != sympy.Mul or len(self.expr.args) != 2:
            return False
        mantissa, base = self.expr.args[0], self.expr.args[1]
        if sympy.N(mantissa) < 1 or sympy.N(mantissa) >= 10:
            return False
        if base.func != sympy.Pow or base.args[0] != 10:
            return False
        if sympy.N(base.args[1]) % 1 != 0:
            return False
        return True

    @strawberry.field
    def is_factorised(self) -> bool:
        for term in self.expr.args:
            if sympy.factor(term).func == sympy.Mul:
                return False
        return True
