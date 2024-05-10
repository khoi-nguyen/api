import strawberry
import sympy
import functools
import typing
from core.math import Math

subs = {
    sympy.Symbol: Math,
    sympy.Basic: Math,
    typing.Optional[sympy.Basic]: typing.Optional[Math],
}


def field(func):
    for key, value in func.__annotations__.items():
        if value in subs and key != "return":
            func.__annotations__[key] = subs[value]

    if func.__annotations__["return"] == sympy.Basic:

        @functools.wraps(func)
        def modified(self, **kwargs):
            result = func(self, **kwargs)
            if type(self).__name__ == "Expression":
                return type(self)(expr=result)
            return result

        modified.__annotations__["return"] = "Expression"

        return strawberry.field(modified)
    if func.__annotations__["return"] == typing.List[sympy.Basic]:

        @functools.wraps(func)
        def modified(self, **kwargs):
            result = func(self, **kwargs)
            if type(self).__name__ == "Expression":
                return map(lambda e: type(self)(expr=e), result)
            return result

        modified.__annotations__["return"] = typing.List["Expression"]

        return strawberry.field(modified)
    return strawberry.field(func)


def custom_type(cls):
    for attr in dir(cls):
        value = getattr(cls, attr)
        if callable(value) and not attr.startswith("_"):
            setattr(cls, attr, field(value))

    for key, value in cls.__annotations__.items():
        if value in [sympy.Symbol, sympy.Basic]:
            cls.__annotations__[key] = Math

    return strawberry.type(cls)
