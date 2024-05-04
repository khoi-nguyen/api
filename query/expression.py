import strawberry
import sympy
from core.math import Math
from core.decorators import field

x = sympy.Symbol("x")


@strawberry.type
class Expression:
    expr: Math

    @field
    def derivative(self, var: sympy.Symbol = x, n: int = 1) -> sympy.Basic:
        return sympy.diff(self.expr, var, n)

    @field
    def expanded(self) -> sympy.Basic:
        return sympy.expand(self.expr)

    @field
    def evalf(self, accuracy: int = 15) -> sympy.Basic:
        return sympy.N(self.expr, accuracy)

    @field
    def factorised(self) -> sympy.Basic:
        return sympy.factor(self.expr, gaussian=self.is_complex())

    @field
    def integral(self, var: sympy.Symbol = x) -> sympy.Basic:
        return sympy.integrate(self.expr, var)

    @field
    def is_complex(self) -> bool:
        symbols = self.expr.atoms(sympy.Symbol, sympy.I)
        if sympy.Symbol("z") in symbols or sympy.I in symbols:
            return True
        return False

    @field
    def is_equal(self, expr: sympy.Basic) -> bool:
        return sympy.simplify(sympy.simplify(self.expr) - sympy.simplify(expr)) == 0

    @field
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

    @field
    def is_factorised(self) -> bool:
        expr = self.expr
        if expr.func != sympy.Mul:
            expr = sympy.Mul(1, expr, evaluate=False)
        for term in expr.args:
            if sympy.factor(term, gaussian=self.is_complex()).func == sympy.Mul:
                return False
        return True
