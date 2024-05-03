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
def test_standard_form(expr, expected):
    query = """
      query TestStandardForm($expr: MathExpression!) {
        expression(expr: $expr) {
          isStandardForm
        }
      }
    """
    result = api.schema.execute_sync(query, {"expr": expr})
    assert result.data is not None
    assert result.data["expression"] == {"isStandardForm": expected}


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
def test_is_factorised(expr, expected):
    query = """
      query TestIsFactorised($expr: MathExpression!) {
        expression(expr: $expr) {
          isFactorised
        }
      }
    """
    result = api.schema.execute_sync(query, {"expr": expr})
    assert result.data is not None
    assert result.data["expression"] == {"isFactorised": expected}
