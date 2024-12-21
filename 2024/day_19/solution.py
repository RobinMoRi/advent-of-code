from collections import defaultdict
import math
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


def read_data(file):
    lines = get_lines(file)
    towel_patterns = []
    designs = []
    is_design = False
    for line in lines:
        if not line:
            is_design = True
            continue
        if is_design:
            designs.append(line)
        else:
            towel_patterns.append(line)

    # towel_patterns = sorted(towel_patterns[0].split(", "), key=lambda x: len(x))
    towel_patterns = towel_patterns[0].split(", ")
    # towel_patterns.reverse()

    return towel_patterns, designs


def is_valid(patterns, design, memo=None):
    if memo is None:
        memo = {}

    if design in memo:
        return memo[design]

    if not design:
        memo[design] = True
        return memo[design]

    for pattern in patterns:
        if design.startswith(pattern):
            remainder = design[len(pattern) :]
            if is_valid(patterns, remainder):
                memo[design] = True
                return True

    memo[design] = False
    return False


def part_1(part=1, file: str = "input.txt"):
    start_time = time.time()
    towel_patterns, designs = read_data(file=file)

    count = 0
    for design in designs:
        if is_valid(towel_patterns, design):
            print("is valid", design, "\n")
            count += 1

    end_time = time.time()
    elapsed = end_time - start_time
    print(f"---- Part {part} ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


def dfs(patterns, design, start, memo):
    if start == len(design):
        return 1

    if start in memo:
        return memo[start]

    total_ways = 0
    for pattern in patterns:
        if design.startswith(pattern, start):
            total_ways += dfs(patterns, design, start + len(pattern), memo)

    memo[start] = total_ways
    return total_ways


def part_2(part=2, file: str = "input.txt"):
    start_time = time.time()
    towel_patterns, designs = read_data(file=file)

    count = 0
    for design in designs:
        ways = dfs(towel_patterns, design, 0, {})
        count += ways

    end_time = time.time()
    elapsed = end_time - start_time
    print(f"---- Part {part} ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"Count: {count}")
    return count


if __name__ == "__main__":
    part_1()
    part_2()
