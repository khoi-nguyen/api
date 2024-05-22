from pydantic import BaseModel
from typing import List, Literal


# Components without children


class MarkdownProps(BaseModel):
    value: str


class Markdown(BaseModel):
    component: Literal["Markdown"]
    props: MarkdownProps


class Formula(BaseModel):
    component: Literal["Formula"]
    props: MarkdownProps


Leaf = Markdown | Formula


# Components with children


class EnvironmentProps(BaseModel):
    title: str


class Environment(BaseModel):
    component: Literal["Environment"]
    props: EnvironmentProps
    children: List[Leaf]


Component = Leaf | Environment

# Roots


class PageProps(BaseModel):
    title: str


class Page(BaseModel):
    component: Literal["Page"]
    props: PageProps
    children: List[Environment | Markdown | Formula]
