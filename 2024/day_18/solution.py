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


def draw_graph(walls, start=(0, 0), end=(70, 70)):
    max_rows = end[1]
    max_cols = end[0]
    graph = ""
    for y in range(0, max_rows + 1):
        row = ""
        for x in range(0, max_cols + 1):
            node = (x, y)
            if node not in walls:
                val = "."
            else:
                val = "#"
            row += val
        graph += row + "\n"

    return graph


def read_graph(file, start=(0, 0), end=(70, 70), bytes_fallen=1024):
    """
    Read graph into a graph
    """
    lines = get_lines(filename=file)

    all_walls = [
        tuple(map(int, re.findall("(\\d+),(\\d+)", line)[0])) for line in lines
    ]

    walls = all_walls[:bytes_fallen]

    max_rows = end[1]
    max_cols = end[0]

    graph = defaultdict(list)
    deltas = [(-1, 0), (0, 1), (1, 0), (0, -1)]

    for y in range(0, max_rows + 1):
        for x in range(0, max_cols + 1):
            node = (x, y)
            if node not in walls:
                for delta in deltas:
                    dy, dx = delta
                    neighbour = (x + dx, y + dy)
                    if (
                        0 <= y + dy <= max_rows
                        and 0 <= x + dx <= max_cols
                        and neighbour not in walls
                    ):
                        graph[node].append(neighbour)

    return graph, walls, all_walls


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


def draw_path(walls, start, end, path):
    empty_graph = draw_graph(walls, start, end)
    GREEN = "\033[32m"
    RESET = "\033[0m"

    graph_arr = []
    for row in empty_graph.split("\n"):
        new_row = []
        for col in row:
            new_row.append(col)
        graph_arr.append(new_row)

    for node in path:
        x, y = node
        graph_arr[y][x] = f"{GREEN}O{RESET}"

    return "\n".join(["".join(line) for line in graph_arr])


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


def part_1(
    part=1, file: str = "input.txt", start=(0, 0), end=(70, 70), bytes_fallen=3450
):
    start_time = time.time()
    graph, walls, _ = read_graph(
        file=file, start=start, end=end, bytes_fallen=bytes_fallen
    )

    shortest_path, _ = bfs(graph, start, end)

    print(draw_path(walls, start, end, shortest_path))

    steps = len(shortest_path) - 1  # minus one because first node is not a step

    end_time = time.time()
    elapsed = end_time - start_time
    print(f"---- Part {part} ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {steps}")
    return steps


def binary_search(file, start, end, bytes_fallen: 1024, max_bytes):
    """
    Use binary search to find the least amount of bytes fallen until the path is blocked
    """
    low = bytes_fallen
    high = max_bytes

    while True:
        # if we have a solution in mid, then the solution must be between mid and high
        mid = low + (high - low) // 2

        if mid == high or mid == low:
            # We've found our byte
            break

        graph, walls, all_walls = read_graph(
            file=file, start=start, end=end, bytes_fallen=mid
        )
        shortest_path, solution_exist = bfs(graph, start, end)
        if solution_exist:
            low = mid
        else:
            high = mid

    return mid


def part_2(
    part=2, file: str = "input.txt", start=(0, 0), end=(70, 70), bytes_fallen=1024
):
    start_time = time.time()
    graph, walls, all_walls = read_graph(
        file=file, start=start, end=end, bytes_fallen=bytes_fallen
    )

    min_byte_for_blockage = binary_search(
        file=file,
        start=start,
        end=end,
        bytes_fallen=bytes_fallen,
        max_bytes=len(all_walls) - 1,
    )

    blocking_byte = ",".join(re.findall("\\d+", str(all_walls[min_byte_for_blockage])))

    end_time = time.time()
    elapsed = end_time - start_time
    print(f"---- Part {part} ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"blocking byte: {blocking_byte}")
    return blocking_byte


if __name__ == "__main__":
    part_1()
    part_2()
