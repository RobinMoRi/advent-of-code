import os


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

    visited = [guard_pos]
    max_col = len(lines[0])
    max_row = len(lines)
    curr_direction = "up"
    row = guard_pos[0]
    col = guard_pos[1]
    while row < max_row and col < max_col and row >= 0 and col >= 0:
        if curr_direction == "up":
            if is_obstacle_at_idx(row - 1, col, lines):
                curr_direction = "right"
            else:
                row -= 1

        if curr_direction == "right":
            if is_obstacle_at_idx(row, col + 1, lines):
                curr_direction = "bottom"
            else:
                col += 1

        if curr_direction == "bottom":
            if is_obstacle_at_idx(row + 1, col, lines):
                curr_direction = "left"
            else:
                row += 1

        if curr_direction == "left":
            if is_obstacle_at_idx(row, col - 1, lines):
                curr_direction = "up"
            else:
                col -= 1

        if [row, col] not in visited:
            visited.append([row, col])

    count = len(visited) - 1  # off by one...

    print("---- Part 1 ----")
    print(f"count: {count}")
    return count


def part_2(file: str = "input.txt"):
    # lines = get_lines(file)

    count = 0

    print("\n---- Part 2 ----")
    print(f"count: {count}")
    return count


if __name__ == "__main__":
    part_1()
    part_2()
