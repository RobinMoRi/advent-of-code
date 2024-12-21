from collections import defaultdict, deque
import os
import time
import math
from pprint import pprint
import sys
import re


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
    deltas = [(-1, 0), (0, 1), (1, 0), (0, -1)]

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
            for delta in deltas:
                dy, dx = delta
                if 0 <= i + dy < max_rows and 0 <= j + dx < max_cols:
                    new_val = lines[i + dy][j + dx]
                    new_node = (i + dy, j + dx)
                    if new_val != "#":  # ignore walls
                        graph[curr_node].append(new_node)

    return graph, start, end


def find_cheats(graph, path: list[tuple[int, int]], min_save_time=100):
    """
    A bit of a brute force
    """
    number_of_cheats = 0
    deltas = [(1, 0), (0, 1), (-1, 0), (0, -1)]
    already_passed = (
        set()
    )  # checks that the new node is in front and not a one that has already been passed
    for node in path:

        row, col = node
        already_passed.add(node)
        for delta in deltas:
            dy, dx = delta  # one step should be wall
            dy2, dx2 = dy * 2, dx * 2  # two step should be on path

            is_wall = (row + dy, col + dx) not in graph
            is_on_path = (row + dy2, col + dx2) in path
            if is_wall and is_on_path and (row + dy2, col + dx2) not in already_passed:
                # construct new path, difference between new path and old path is amount of ps saved
                idx_curr = path.index((row, col))
                idx = path.index((row + dy2, col + dx2))
                new_path = path[: idx_curr + 1] + path[idx:]

                # print(len(new_path), len(path))
                if len(path) - len(new_path) >= min_save_time:
                    # print(min_save_time)
                    number_of_cheats += 1
    return number_of_cheats


# def find_cheats_2(
#     graph, path: list[tuple[int, int]], max_rows, max_cols, min_save_time=100
# ):
#     """
#     A bit of a brute force
#     """
#     number_of_cheats = 0
#     deltas = [(1, 0), (0, 1), (-1, 0), (0, -1)]
#     already_passed = (
#         set()
#     )  # checks that the new node is in front and not a one that has already been passed
#     for node in path:

#         row, col = node
#         already_passed.add(node)
#         for delta in deltas:
#             steps = 1
#             dy, dx = delta
#             new_node = row + dy, col + dx

#             # find cheat node
#             while (
#                 new_node not in graph
#                 and 0 <= new_node[0] < max_rows
#                 and 0 <= new_node[1] < max_cols
#             ):
#                 row2, col2 = new_node
#                 dy, dx = delta[0] * steps, delta[1] * steps
#                 new_node = row2 + dy, col2 + dx
#                 steps += 1

#             row2, col2 = new_node
#             is_on_path = (row2, col2) in path
#             if is_on_path and (row2, col2) not in already_passed:
#                 # construct new path, difference between new path and old path is amount of ps saved
#                 idx_curr = path.index((row, col))
#                 idx = path.index((row2, col2))
#                 new_path = path[: idx_curr + 1] + path[idx:]

#                 # print(len(new_path), len(path))
#                 if len(path) - len(new_path) >= min_save_time:
#                     # print(min_save_time)
#                     number_of_cheats += 1
#     return number_of_cheats


def bfs(graph, start, end):
    queue = deque()

    dist = {}
    previous = {}
    for node in graph.keys():
        dist[node] = math.inf
        previous[node] = None

    dist[start] = 0
    queue.append(start)

    while queue:
        curr = queue.popleft()

        for neighbour in graph[curr]:
            if math.isinf(dist[neighbour]):
                previous[neighbour] = curr
                dist[neighbour] = dist[curr] + 1
                queue.append(neighbour)

    node = end
    shortest_path = []
    while node:
        shortest_path.append(node)
        node = previous[node]

    shortest_path.reverse()

    if start not in shortest_path:
        # No solution
        return shortest_path, False

    return shortest_path, True


def draw_path(file, path, marker="O"):
    GREEN = "\033[32m"
    RESET = "\033[0m"
    lines = get_lines(filename=file)
    new_lines = [list(line) for line in lines]

    for node in path:
        row, col = node
        new_lines[row][col] = f"{GREEN}{marker}{RESET}"

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


def part_1(part=1, file: str = "input.txt", min_saving_time=100):
    start_time = time.time()

    graph, start, end = read_graph(file=file)
    path, solution_exist = bfs(graph, start, end)

    no_cheats = find_cheats(graph, path, min_saving_time)

    # animate_frames(file, path)
    count = len(path) - 1

    end_time = time.time()
    elapsed = end_time - start_time
    print(f"---- Part {part} ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"Total time: {count}")
    print(f"Number of cheats saving {min_saving_time} ps: {no_cheats}")
    return count, no_cheats


def part_2(part=2, file: str = "input.txt", min_saving_time=100):
    start_time = time.time()

    graph, start, end = read_graph(file=file)
    path, solution_exist = bfs(graph, start, end)

    lines = get_lines(file)

    # animate_frames(file, path)
    count = len(path) - 1

    cheats = 0

    end_time = time.time()
    elapsed = end_time - start_time
    print(f"---- Part {part} ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"Total time: {count}")
    print(f"Number of cheats saving {min_saving_time} ps: {cheats}")
    return count, cheats


if __name__ == "__main__":
    part_1()
    part_2()
