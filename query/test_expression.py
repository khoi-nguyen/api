import api
import pytest


@pytest.mark.parametrize(
    "expr,expected",
    [
        ("3 \\times 10^2", True),
        ("0.9 \\times 10^3", False),
        ("10.3 \\times 10^{-2}", False),
        ("1 \\times 10^{-2}", True),
        ("1", False),
        ("10^0", False),
        ("1 \\times 10^0", True),
        ("10", False),
        ("10^1", False),
        ("1 \\times 10^1", True),
        ("10^4", False),
    ],
)
def test_scientific_notation(expr, expected):
    query = """
      query TestScientificNotation($expr: MathExpression!) {
        expression(expr: $expr) {
          isScientificNotation
        }
      }
    """
    result = api.schema.execute_sync(query, {"expr": expr})
    assert result.data is not None
    assert result.data["expression"] == {"isScientificNotation": expected}


@pytest.mark.parametrize(
    "expr,expected",
    [
        ("(x + 2)(x - 3)", True),
        ("(x + 2)^2", True),
        ("2x + 4", False),
        ("(2x + 4)(x + 1)", False),
        ("2(x + 2)(x + 1)", False),
        ("x^2 + 1", True),
        ("z^2 + 1", False),
        ("2x + 1", True),
    ],
)
def test_is_factored(expr, expected):
    query = """
      query TestIsFactored($expr: MathExpression!) {
        expression(expr: $expr) {
          isFactored
        }
      }
    """
    result = api.schema.execute_sync(query, {"expr": expr})
    assert result.data is not None
    assert result.data["expression"] == {"isFactored": expected}


@pytest.mark.parametrize(
    "expr,expected",
    [
        ("x^2  - 5x + 6", False),
        ("x^2 - 1", False),
        ("z", True),
        ("x^2 + i", True),
        ("i", True),
    ],
)
def test_is_complex(expr, expected):
    query = """
      query TestIsComplex($expr: MathExpression!) {
        expression(expr: $expr) {
          isComplex
        }
      }
    """
    result = api.schema.execute_sync(query, {"expr": expr})
    assert result.data is not None
    assert result.data["expression"] == {"isComplex": expected}
