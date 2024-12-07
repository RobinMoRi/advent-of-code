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


def can_produce_target(numbers: list[int], target: int, part_two: bool = False):
    if len(numbers) == 0:
        return False

    if len(numbers) == 1:
        return numbers[0] == target

    first = numbers[0]
    second = numbers[1]

    if can_produce_target([first + second, *numbers[2:]], target, part_two):
        return True

    if can_produce_target([first * second, *numbers[2:]], target, part_two):
        return True

    if part_two:
        if can_produce_target(
            [int(f"{first}{second}"), *numbers[2:]], target, part_two
        ):
            return True

    return False


def part_1(file: str = "input.txt"):
    start = time.time()
    lines = get_lines(file)

    count = 0
    for line in lines:
        line_split = line.split(": ")
        if can_produce_target(
            [int(num) for num in line_split[1].split(" ")], int(line_split[0])
        ):
            count += int(line_split[0])

    end = time.time()
    elapsed = end - start
    print("---- Part 1 ----")
    print("Elapsed time seconds: %5.2fs" % elapsed)
    print(f"count: {count}")
    return count


def part_2(file: str = "input.txt"):
    start = time.time()
    lines = get_lines(file)

    count = 0
    for line in lines:
        line_split = line.split(": ")
        if can_produce_target(
            [int(num) for num in line_split[1].split(" ")], int(line_split[0]), True
        ):
            count += int(line_split[0])

    end = time.time()
    elapsed = end - start
    print("\n---- Part 2 ----")
    print("Elapsed time seconds: %5.2fs" % elapsed)
    print(f"count: {count}")
    return count


if __name__ == "__main__":
    part_1()
    part_2()
