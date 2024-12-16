from collections import defaultdict
import os
import time
import math
from queue import PriorityQueue
from pprint import pprint
import sys


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


def get_all_paths(end, end_dirs, dist, previous):
    all_paths = []
    for end_dir in end_dirs:
        path = []
        current_state = (end, end_dir)
        while current_state is not None:
            path.append(current_state)
            current_state = previous[current_state]
        path.reverse()
        all_paths.append(path)
    return all_paths


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

    end_candidates = [
        (dist[(end, d)], d) for d in directions if math.isfinite(dist[(end, d)])
    ]
    total_cost, best_dir = min(end_candidates, key=lambda x: x[0])

    shortest_path = []
    current_state = (end, best_dir)
    while current_state is not None:
        shortest_path.append(current_state)
        current_state = previous[current_state]

    shortest_path.reverse()

    return shortest_path, total_cost, best_dir


def draw_path(file, path, marker=None):
    GREEN = "\033[32m"
    RESET = "\033[0m"
    lines = get_lines(filename=file)
    new_lines = [list(line) for line in lines]

    directions = {"right": ">", "left": "<", "up": "^", "down": "v"}

    for node in path:
        post, direction = node
        row, col = post
        new_lines[row][col] = f"{GREEN}{marker or directions[direction]}{RESET}"

    return "\n".join(["".join(line) for line in new_lines])


def animate_frames(file, path):
    frames = []
    for p in path:
        frame = draw_path(file, [p])
        frames.append(frame)

    for frame in frames:
        sys.stdout.write("\033[H\033[J")
        sys.stdout.write(frame + "\n")
        sys.stdout.flush()
        time.sleep(0.2)


def part_1(part=1, file: str = "input.txt"):
    start_time = time.time()
    graph, start, end = read_graph(file=file)
    path, cost, _ = dijkstra(graph, start, end)

    animate_frames(file, path)

    end_time = time.time()
    elapsed = end_time - start_time
    print(f"---- Part {part} ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {cost}")
    return path, cost


def part_2(file: str = "input.txt"):
    start_time = time.time()
    graph, start, end = read_graph(file=file)
    path, cost, best_dir = dijkstra(graph, start, end)
    path2, cost2, _ = dijkstra(graph, end, start, start_direction=best_dir)

    print("COST 1", cost)
    print(draw_path(file, path, "O"), "\n\n")
    print("COST 2", cost2)
    print(draw_path(file, path2, "O"))

    visited = set()
    for pos, direction in path:
        visited.add(pos)
    for pos, direction in path2:
        visited.add(pos)

    count = len(visited)
    end_time = time.time()
    elapsed = end_time - start_time
    print("---- Part 2 ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


if __name__ == "__main__":
    part_1()
    # part_2()
