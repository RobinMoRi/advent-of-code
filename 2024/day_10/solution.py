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


def part_1(file: str = "input.txt"):
    start_time = time.time()
    lines = get_lines(file)
    max_row = len(lines)
    max_col = len(lines[0])

    trailheads = []
    for row, line in enumerate(lines):
        for col, ch in enumerate(list(line)):
            if ch == "0":
                trailheads.append((row, col))

    count = 0

    # TODO: clean up code
    # Finds trailends several times- need to figure out why...
    for trailhead in trailheads:
        queue = [trailhead]
        trailends = set()
        while len(queue) > 0:
            row, col = queue.pop()
            val = int(lines[row][col])
            if val == 9:
                trailends.add((row, col))
                continue

            up = row - 1
            left = col - 1
            right = col + 1
            down = row + 1
            if 0 <= up < max_row and int(lines[up][col]) == val + 1:
                queue.append((up, col))

            if 0 <= left < max_col and int(lines[row][left]) == val + 1:
                queue.append((row, left))

            if 0 <= right < max_col and int(lines[row][right]) == val + 1:
                queue.append((row, right))

            if 0 <= down < max_row and int(lines[down][col]) == val + 1:
                queue.append((down, col))

        count += len(trailends)

    end_time = time.time()
    elapsed = end_time - start_time
    print("---- Part 1 ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


def part_2(file: str = "input.txt"):
    start_time = time.time()
    lines = get_lines(file)
    max_row = len(lines)
    max_col = len(lines[0])

    queue = []
    for row, line in enumerate(lines):
        for col, ch in enumerate(list(line)):
            if ch == "0":
                queue.append((row, col))

    count = 0

    # TODO: clean up code
    # Finds trailends several times- need to figure out why...
    count = 0
    while len(queue) > 0:
        row, col = queue.pop()
        val = int(lines[row][col])
        if val == 9:
            count += 1
            continue

        up = row - 1
        left = col - 1
        right = col + 1
        down = row + 1
        if 0 <= up < max_row and int(lines[up][col]) == val + 1:
            queue.append((up, col))

        if 0 <= left < max_col and int(lines[row][left]) == val + 1:
            queue.append((row, left))

        if 0 <= right < max_col and int(lines[row][right]) == val + 1:
            queue.append((row, right))

        if 0 <= down < max_row and int(lines[down][col]) == val + 1:
            queue.append((down, col))

    end = time.time()
    elapsed = end - start_time
    print("---- Part 2 ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


if __name__ == "__main__":
    part_1()
    part_2()
