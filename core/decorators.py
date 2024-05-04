import strawberry
import sympy as sp
import functools


def field(func):
    if func.__annotations__["return"] == sp.Basic:

        @functools.wraps(func)
        def modified(self, **kwargs):
            return type(self)(expr=func(self, **kwargs))

        modified.__annotations__["return"] = "Expression"
        return strawberry.field(modified)
    return strawberry.field(func)
