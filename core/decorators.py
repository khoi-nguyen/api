import strawberry
import sympy
import functools
from core.math import Math


def field(func):
    for key, value in func.__annotations__.items():
        if value in [sympy.Symbol, sympy.Basic] and key != "return":
            func.__annotations__[key] = Math

    if func.__annotations__["return"] == sympy.Basic:

        @functools.wraps(func)
        def modified(self, **kwargs):
            return type(self)(expr=func(self, **kwargs))

        modified.__annotations__["return"] = "Expression"

        return strawberry.field(modified)
    return strawberry.field(func)
