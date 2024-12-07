import os
import time


def get_lines(filename: str):
    this_file = os.path.abspath(__file__)
    this_dir = os.path.dirname(this_file)
    filepath = os.path.join(this_dir, filename)
    lines = []
    with open(filepath, "r") as file:
        for line in file:
            lines.append(line.strip())
    return lines


def is_obstacle_at_idx(row, col, lines):
    max_col = len(lines[0])
    max_row = len(lines)
    if row >= max_row or col >= max_col or row < 0 or col < 0:
        # Just move the guard if out of boundaries
        return False
    return lines[row][col] == "#"


def part_1(file: str = "input.txt"):
    lines = get_lines(file)

    guard_pos = []
    for row in range(len(lines)):
        for col in range(len(lines[0])):
            if lines[row][col] == "^":
                guard_pos = [row, col]
                break
        if len(guard_pos) > 0:
            break

    visited = []
    max_col = len(lines[0])
    max_row = len(lines)
    curr_direction = "up"
    row = guard_pos[0]
    col = guard_pos[1]

    directions = {
        "up": {"X": 0, "Y": -1, "turn": "right"},
        "right": {"X": 1, "Y": 0, "turn": "down"},
        "down": {"X": 0, "Y": 1, "turn": "left"},
        "left": {"X": -1, "Y": 0, "turn": "up"},
    }
    while row < max_row and col < max_col and row >= 0 and col >= 0:
        new_col = directions[curr_direction]["X"] + col
        new_row = directions[curr_direction]["Y"] + row

        if is_obstacle_at_idx(new_row, new_col, lines):
            curr_direction = directions[curr_direction]["turn"]
        else:
            row = new_row
            col = new_col

        if [row, col] not in visited:
            visited.append([row, col])

    count = len(visited) - 1  # off by one...

    print("\n\n---- Part 1 ----")
    print(f"count: {count}")
    return count


def part_2(file: str = "input.txt"):
    start = time.time()
    lines = get_lines(file)

    guard_pos = []
    for row in range(len(lines)):
        for col in range(len(lines[0])):
            if lines[row][col] == "^":
                guard_pos = [row, col]
                break
        if len(guard_pos) > 0:
            break

    directions = {
        "up": {"X": 0, "Y": -1, "turn": "right"},
        "right": {"X": 1, "Y": 0, "turn": "down"},
        "down": {"X": 0, "Y": 1, "turn": "left"},
        "left": {"X": -1, "Y": 0, "turn": "up"},
    }

    max_row, max_col = len(lines), len(lines[0])
    obstructions = []
    for i in range(len(lines)):
        for j in range(len(lines[0])):
            if lines[i][j] == ".":
                obstructions.append((i, j))

    number_infinite_loops = 0
    for obstruction in obstructions:
        visited = set()
        curr_direction = "up"
        row, col = guard_pos

        is_infinite = False

        while 0 <= row < max_row and 0 <= col < max_col:
            new_col = directions[curr_direction]["X"] + col
            new_row = directions[curr_direction]["Y"] + row

            if is_obstacle_at_idx(new_row, new_col, lines) or obstruction == (
                new_row,
                new_col,
            ):
                curr_direction = directions[curr_direction]["turn"]
            else:
                row = new_row
                col = new_col

            position = (row, col, curr_direction)
            if position in visited:
                is_infinite = True
                break

            visited.add(position)

        if is_infinite:
            number_infinite_loops += 1
    elapsed = time.time() - start
    print("\n---- Part 2.1 ----")
    print(f"count: {number_infinite_loops}")
    print("elapsed time: %5.2fs" % elapsed)
    return number_infinite_loops


if __name__ == "__main__":
    part_1()
    part_2()
