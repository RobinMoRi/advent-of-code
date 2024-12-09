import os
import time
from collections import defaultdict


def get_lines(filename: str):
    this_file = os.path.abspath(__file__)
    this_dir = os.path.dirname(this_file)
    filepath = os.path.join(this_dir, filename)
    lines = []
    with open(filepath, "r") as file:
        for line in file:
            lines.append(line.strip())
    return lines


def get_antinodes(
    coord1: tuple[int, int], coord2: tuple[int, int]
) -> list[tuple[int, int]]:
    antinodes = set()
    y1, x1 = coord1
    y2, x2 = coord2
    dx = x2 - x1
    dy = y2 - y1

    max_x = max(x1, x2)
    min_x = min(x1, x2)
    max_y = max(y1, y2)
    min_y = min(y1, y2)

    if dy == 0:
        antinodes.add((min_x - abs(dx), y1))
        antinodes.add((max_x + abs(dx), y2))

    elif dx == 0:
        antinodes.add((x1, min_y - abs(dy)))
        antinodes.add((x2, max_y + abs(dy)))
    else:
        if dx * dy < 0:
            antinodes.add((max_x + abs(dx), min_y - abs(dy)))
            antinodes.add((min_x - abs(dx), max_y + abs(dy)))
        else:
            antinodes.add((min_x - abs(dx), min_y - abs(dy)))
            antinodes.add((max_x + abs(dx), max_y + abs(dy)))
    return antinodes


def get_antinodes_part2(
    coord1: tuple[int, int],
    coord2: tuple[int, int],
    max_col: int,
    max_row: int,
) -> list[tuple[int, int]]:
    antinodes = set()
    y1, x1 = coord1
    y2, x2 = coord2
    dx = x2 - x1
    dy = y2 - y1

    # Forward
    y, x = coord1  # just take one coord to step from
    while 0 <= x < max_col and 0 <= y < max_row:
        antinodes.add((x, y))
        if dy == 0:
            x, y = x + abs(dx), y
        elif dx == 0:
            x, y = x, y + abs(dy)
        else:
            if dx * dy < 0:
                x, y = x + abs(dx), y - abs(dy)
            else:
                x, y = x + abs(dx), y + abs(dy)
    # backward
    y, x = coord1  # just take one coord to step from
    while 0 <= x < max_col and 0 <= y < max_row:
        antinodes.add((x, y))
        if dy == 0:
            x, y = x - abs(dx), y
        elif dx == 0:
            x, y = x, y - abs(dy)
        else:
            if dx * dy < 0:
                x, y = x - abs(dx), y + abs(dy)
            else:
                x, y = x - abs(dx), y - abs(dy)
    return antinodes


def draw_antinodes(lines: list[str], antinodes: list[tuple[int, int]]):
    new_lines = [list(line) for line in lines]
    for x, y in antinodes:
        if lines[y][x] == ".":
            new_lines[y][x] = "#"
        else:
            print(f"Overlapping with {lines[y][x]} on {y},{x}")

    print("\nANTINODES:\n")
    for line in new_lines:
        print(f"{''.join(line)}\n")


def part_1(file: str = "input.txt"):
    start = time.time()
    lines = get_lines(file)
    max_col, max_row = len(lines[0]), len(lines)

    antennas = defaultdict(list[tuple[int, int]])

    for row, line in enumerate(lines):
        for col, char in enumerate(line):
            if char != ".":
                antennas[char].append((row, col))

    antinodes = set()
    for key, val in antennas.items():
        for i, antenna1 in enumerate(val):
            for j in range(i + 1, len(val)):
                antinodes_pair = get_antinodes(antenna1, val[j])
                for x, y in antinodes_pair:
                    if 0 <= x < max_col and 0 <= y < max_row:
                        antinodes.add((x, y))

    draw_antinodes(lines, antinodes)
    count = len(antinodes)
    end = time.time()
    elapsed = end - start
    print("---- Part 1 ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


def part_2(file: str = "input.txt"):
    start = time.time()
    lines = get_lines(file)
    max_col, max_row = len(lines[0]), len(lines)

    antennas = defaultdict(list[tuple[int, int]])

    for row, line in enumerate(lines):
        for col, char in enumerate(line):
            if char != ".":
                antennas[char].append((row, col))

    antinodes = set()
    for key, val in antennas.items():
        for i, antenna1 in enumerate(val):
            for j in range(i + 1, len(val)):
                antinodes_pair = get_antinodes_part2(antenna1, val[j], max_col, max_row)
                for x, y in antinodes_pair:
                    if 0 <= x < max_col and 0 <= y < max_row:
                        antinodes.add((x, y))

    draw_antinodes(lines, antinodes)
    count = len(antinodes)
    end = time.time()
    elapsed = end - start
    print("---- Part 2 ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


if __name__ == "__main__":
    part_1()
    part_2()
