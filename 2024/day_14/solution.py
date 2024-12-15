from collections import defaultdict
import os
import time
import re
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


def get_robots(file) -> dict[str, list[int]]:
    lines = get_lines(file)
    num_robots = len(lines)

    robots = defaultdict(list)

    for robot_id, line in enumerate(lines):
        nums = [int(num) for num in re.findall("\\d+|-\\d+", line)]
        robots[robot_id] = nums
    return robots, num_robots


def draw_frame(robots, max_rows, max_cols):
    drawing = []

    for _ in range(0, max_rows):
        row = []
        for _ in range(0, max_cols):
            row.append(".")
        drawing.append(row)

    for key, robot in robots.items():
        x, y, dx, dy = robot
        if drawing[y][x] == ".":
            drawing[y][x] = "1"
        else:
            drawing[y][x] = str(int(drawing[y][x]) + 1)

    new_drawing = []
    for row in drawing:
        new_row = "".join(row)
        new_drawing.append(new_row)
    return "\n".join(new_drawing)


def compute_quadrants(max_row, max_col):
    row_mid = max_row // 2
    col_mid = max_col // 2

    if max_row % 2 == 1:
        top_rows = list(range(row_mid))
        bottom_rows = list(range(row_mid + 1, max_row))
    else:
        top_rows = list(range(row_mid))
        bottom_rows = list(range(row_mid, max_row))

    if max_col % 2 == 1:
        left_cols = list(range(col_mid))
        right_cols = list(range(col_mid + 1, max_col))
    else:
        left_cols = list(range(col_mid))
        right_cols = list(range(col_mid, max_col))

    q1 = {"rows": top_rows, "cols": left_cols}
    q2 = {"rows": top_rows, "cols": right_cols}
    q3 = {"rows": bottom_rows, "cols": left_cols}
    q4 = {"rows": bottom_rows, "cols": right_cols}

    return [q1, q2, q3, q4]


def count_robots(robots, quadrants):
    robots_counts = defaultdict(int)

    for idx, quadrant in enumerate(quadrants):
        for robot_id, robot in robots.items():
            x, y, _, _ = robot
            if x in quadrant["cols"] and y in quadrant["rows"]:
                robots_counts[idx] += 1

    return robots_counts


def majority_robots_exist_in_quadrant(robots, quadrants, num_robots, threshold=0.5):
    """
    Try to check if majority of robots exist in one of the quadrants
    """
    robots_counts = count_robots(robots, quadrants)
    for key, robot_count in robots_counts.items():
        if robot_count >= threshold * num_robots:
            return True
    return False


def part_1(part=1, file: str = "input.txt", max_cols=101, max_rows=103, seconds=100):
    start_time = time.time()

    robots, num_robots = get_robots(file=file)
    quadrants = compute_quadrants(max_rows, max_cols)

    print("\n----- Init positions -----\n")
    print(draw_frame(robots, max_cols=max_cols, max_rows=max_rows), "\n")

    for idx in range(0, seconds):
        for robot_id, robot in robots.items():
            x, y, dx, dy = robot

            # compute new x position
            if x + dx < 0:
                x = x + dx + max_cols
            elif x + dx >= max_cols:
                x = x + dx - max_cols
            elif 0 <= x + dx < max_cols:
                x = x + dx

            # compute new y position
            if y + dy < 0:
                y = y + dy + max_rows
            elif y + dy >= max_rows:
                y = y + dy - max_rows
            elif 0 <= y + dy < max_rows:
                y = y + dy

            robots[robot_id] = [x, y, dx, dy]

        if majority_robots_exist_in_quadrant(robots, quadrants, num_robots):
            print(f"\n----- AFTER {idx+1} seconds -----\n")
            print(draw_frame(robots, max_cols=max_cols, max_rows=max_rows), "\n")

    robots_counts = count_robots(robots, quadrants)

    count = 1
    for key, robot_count in robots_counts.items():
        count *= robot_count

    end_time = time.time()
    elapsed = end_time - start_time
    print(f"---- Part {part} ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


def part_2(file: str = "input.txt"):
    count = part_1(
        part=2, file=file, seconds=10000
    )  # should not be 5k s- 10k (according to submission)
    return count


if __name__ == "__main__":
    part_1()
    part_2()
