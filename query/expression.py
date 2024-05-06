import dataclasses
import sympy
import typing

x = sympy.Symbol("x")


@dataclasses.dataclass
class Expression:
    expr: sympy.Basic

    def diff(self, var: sympy.Symbol = x, n: int = 1) -> sympy.Basic:
        return sympy.diff(self.expr, var, n)

    def expand(self) -> sympy.Basic:
        return sympy.expand(self.expr)

    def evalf(self, accuracy: int = 15) -> sympy.Basic:
        return sympy.N(self.expr, accuracy)

    def factor(self) -> sympy.Basic:
        return sympy.factor(self.expr, gaussian=self.is_complex())

    def integrate(self, var: sympy.Symbol = x) -> sympy.Basic:
        return sympy.integrate(self.expr, var)

    def is_complex(self) -> bool:
        symbols = self.expr.atoms(sympy.Symbol, sympy.I)
        if sympy.Symbol("z") in symbols or sympy.I in symbols:
            return True
        return False

    def is_equal(self, expr: sympy.Basic) -> bool:
        return sympy.simplify(sympy.simplify(self.expr) - sympy.simplify(expr)) == 0

    def is_scientific_notation(self) -> bool:
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

    def is_factored(self) -> bool:
        expr = self.expr
        if expr.func != sympy.Mul:
            expr = sympy.Mul(1, expr, evaluate=False)
        for term in expr.args:
            if sympy.factor(term, gaussian=self.is_complex()).func == sympy.Mul:
                return False
        return True

    def solve(self, var: sympy.Symbol = x) -> typing.List[sympy.Basic]:
        return sympy.solve(self.expr, var)
