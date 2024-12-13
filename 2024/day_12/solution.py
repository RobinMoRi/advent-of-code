from collections import defaultdict
from itertools import product
import os
import time
from pprint import pprint


def get_lines(filename: str):
    this_file = os.path.abspath(__file__)
    this_dir = os.path.dirname(this_file)
    filepath = os.path.join(this_dir, filename)
    lines = []
    with open(filepath, "r") as file:
        for line in file:
            lines.append(line.strip())
    return lines


def build_graphs(lines: list[str]) -> list[dict]:
    max_row = len(lines)
    max_col = len(lines[0])
    move = {
        "up": -1,
        "down": 1,
        "left": -1,
        "right": 1,
    }

    graphs = []
    visited = set()
    # Build graphs for each coherent garden plot
    for row, line in enumerate(lines):
        for col, ch in enumerate(list(line)):
            if (ch, row, col) in visited:
                continue
            graph = {}
            queue = [(ch, row, col)]
            while len(queue) > 0:
                node = queue.pop()
                if node in visited:
                    continue
                if node not in graph:
                    graph[node] = []

                val, r, c = node
                children_coord = [
                    (r + move["up"], c),
                    (r + move["down"], c),
                    (r, c + move["left"]),
                    (r, c + move["right"]),
                ]
                children = []
                for coord in children_coord:
                    y, x = coord
                    if 0 <= y < max_row and 0 <= x < max_col and lines[y][x] == val:
                        children.append((val, y, x))
                        queue.append((val, y, x))
                graph[node].extend(children)
                visited.add(node)
            graphs.append(graph)

    return graphs


def part_1(file: str = "input.txt"):
    start_time = time.time()
    lines = get_lines(file)

    graphs = build_graphs(lines)
    counts = []

    # Area: each node count as area = 1
    # Perimeter: each node can have max 4 adjacent nodes (children). The contribution to perimeter is 4 - # adjacent nodes
    for graph in graphs:
        area = len(graph)
        perimeter = 0

        for node in graph:
            perimeter += 4 - len(graph[node])
        counts.append(area * perimeter)
    count = sum(counts)

    end_time = time.time()
    elapsed = end_time - start_time
    print("---- Part 1 ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


def part_2(file: str = "input.txt"):
    start_time = time.time()
    lines = get_lines(file)

    graphs = build_graphs(lines)
    counts = []
    for graph in graphs:
        area = len(graph)
        corners = 0

        for node in graph:
            val, row, col = node

            # VERY ugly solution - I don't care anymore...
            # Count corners - convex
            top = (val, row - 1, col)
            left = (val, row, col - 1)
            bottom = (val, row + 1, col)
            right = (val, row, col + 1)

            # top left
            if top not in graph and left not in graph:
                corners += 1
            # top right
            if top not in graph and right not in graph:
                corners += 1

            # bottom left
            if bottom not in graph and left not in graph:
                corners += 1

            if bottom not in graph and right not in graph:
                corners += 1

            topleft = (val, row - 1, col - 1)
            topright = (val, row - 1, col + 1)
            bottomright = (val, row + 1, col + 1)
            bottomleft = (val, row + 1, col - 1)
            if topleft not in graph and top in graph and left in graph:
                corners += 1

            if topright not in graph and top in graph and right in graph:
                corners += 1
            if bottomright not in graph and bottom in graph and right in graph:
                corners += 1

            if bottomleft not in graph and bottom in graph and left in graph:
                corners += 1

        counts.append(area * corners)

        # perimeter = count_corners(boundary)
        print(f"area: {area}, corners: {corners}, price: {area*corners}")

    count = sum(counts)
    end = time.time()
    elapsed = end - start_time
    print("\n---- Part 2 ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


if __name__ == "__main__":
    part_1()
    part_2()
