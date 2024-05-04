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


def as_math(x):
    return typing.cast(Math, x)
