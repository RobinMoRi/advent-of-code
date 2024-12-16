from collections import defaultdict
import os
import time
import re
import sys
from pprint import pprint
import math
from queue import PriorityQueue


def get_lines(filename: str):
    this_file = os.path.abspath(__file__)
    this_dir = os.path.dirname(this_file)
    filepath = os.path.join(this_dir, filename)
    lines = []
    with open(filepath, "r") as file:
        for line in file:
            lines.append(line.strip())
    return lines


def read_graph(file):
    """
    Read graph into a graph
    """
    lines = get_lines(filename=file)
    max_rows = len(lines)
    max_cols = len(lines[0])
    print(max_rows, max_cols)

    graph = defaultdict(list)
    deltas = {"up": (-1, 0), "right": (0, 1), "down": (1, 0), "left": (0, -1)}

    start = None
    end = None

    for i, row in enumerate(lines):
        for j, val in enumerate(row):
            if val == "S":
                start = (i, j)
            if val == "E":
                end = (i, j)
            curr_node = (i, j)
            if val == "#":  # Ignore walls
                continue
            graph[curr_node] = []
            for delta in deltas.values():
                dy, dx = delta
                if 0 <= i + dy < max_rows and 0 <= j + dx < max_cols:
                    new_val = lines[i + dy][j + dx]
                    new_node = (i + dy, j + dx)
                    if new_val != "#":  # ignore walls
                        graph[curr_node].append(new_node)

    return graph, start, end


def get_position(node, neighbour):
    """
    Retrieves the position from one node to another (up, down, left, right)
    """
    x1, y1 = node
    x2, y2 = neighbour
    if x2 > x1:
        return "down"
    if x1 > x2:
        return "up"
    if y2 > y1:
        return "right"
    return "left"


def compute_weight(node, neighbour, curr_dir):
    """
    Compute weight between two nodes based on rotation needed to go from one node to another
    returns the cost to go from one node to another as well as the new facing direction
    """

    costs = {
        "up": {"left": 1001, "right": 1001, "down": 2001, "up": 1},
        "down": {"left": 1001, "right": 1001, "down": 1, "up": 2001},
        "left": {"left": 1, "right": 2001, "down": 1001, "up": 1001},
        "right": {"left": 2001, "right": 1, "down": 1001, "up": 1001},
    }

    position = get_position(node, neighbour)
    cost = costs[curr_dir][position]
    return cost, position  # return the cost and the new current pointing direction


def dijkstra(graph: dict, start, end, start_direction="right"):
    """
    Stealing some dijkstra from my 2022 shortest path solution :)
    """
    directions = ["up", "down", "left", "right"]
    queue = PriorityQueue()
    dist = defaultdict(int)
    previous = {}
    visited = set()
    for node in graph.keys():
        for direction in directions:
            previous[(node, direction)] = None
            dist[(node, direction)] = math.inf

    dist[(start, start_direction)] = 0

    queue.put((0, start, start_direction))

    while not queue.empty():
        prio, current, curr_dir = queue.get()

        if (current, curr_dir) in visited:
            continue

        visited.add((current, curr_dir))

        for neighbour in graph[current]:
            weight, new_dir = compute_weight(current, neighbour, curr_dir)
            candidate = dist[(current, curr_dir)] + weight

            if candidate < dist[(neighbour, new_dir)]:
                dist[(neighbour, new_dir)] = candidate
                previous[(neighbour, new_dir)] = (current, curr_dir)
                queue.put((candidate, neighbour, new_dir))

    end_candidates = [(dist[(end, d)], d) for d in directions]
    total_cost, best_dir = min(end_candidates, key=lambda x: x[0])

    if total_cost == math.inf:
        return [], math.inf

    shortest_path = []
    current_state = (end, best_dir)
    while current_state is not None:
        node, d = current_state
        shortest_path.append(node)
        current_state = previous[current_state]

    shortest_path.reverse()

    return shortest_path, total_cost


def draw_path(file, path):
    lines = get_lines(filename=file)
    new_lines = [list(line) for line in lines]

    for node in path:
        row, col = node
        new_lines[row][col] = "S"

    return "\n".join(["".join(line) for line in new_lines])


def part_1(part=1, file: str = "input.txt"):
    start_time = time.time()
    graph, start, end = read_graph(file=file)
    print(start, end)
    path, cost = dijkstra(graph, start, end)
    print(path)

    print(draw_path(file=file, path=path))

    end_time = time.time()
    elapsed = end_time - start_time
    print(f"---- Part {part} ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {cost}")
    return cost


def part_2(file: str = "input.txt"):
    start_time = time.time()

    return 875318608908


if __name__ == "__main__":
    part_1()
    # part_2()
