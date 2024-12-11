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


# Initial solution (brute force)
def blink(stones: list[int]):
    new_stones = []
    for stone in stones:
        if stone == 0:
            new_stones.append(1)
        elif len(str(stone)) % 2 == 0:
            mid = len(str(stone)) // 2
            new_stones.append(int(str(stone)[:mid]))
            new_stones.append(int(str(stone)[mid:]))
        else:
            new_stones.append(stone * 2024)
    return new_stones


# Optimization for part 2 - later also used in part 1
def blink_recursive(stone, blinks=1, memo=None):
    if memo is None:
        memo = {}

    if blinks == 1:
        if stone == 0:
            return 1
        elif len(str(stone)) % 2 == 0:
            return 2
        else:
            return 1

    key = f"{blinks}-{stone}"

    if key in memo:
        return memo[key]

    if stone == 0:
        memo[key] = blink_recursive(1, blinks - 1, memo)
    elif len(str(stone)) % 2 == 0:
        mid = len(str(stone)) // 2
        num1 = int(str(stone)[:mid])
        num2 = int(str(stone)[mid:])
        memo[key] = blink_recursive(num1, blinks - 1, memo) + blink_recursive(
            num2, blinks - 1, memo
        )
    else:
        memo[key] = blink_recursive(stone * 2024, blinks - 1, memo)

    return memo[key]


def part_1(file: str = "input.txt"):
    start_time = time.time()
    lines = get_lines(file)

    stones = [int(stone) for stone in lines[0].split(" ")]

    count = 0
    for stone in stones:
        count += blink_recursive(stone, 25)

    end_time = time.time()
    elapsed = end_time - start_time
    print("---- Part 1 ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


def part_2(file: str = "input.txt"):
    start_time = time.time()
    lines = get_lines(file)
    stones = [int(stone) for stone in lines[0].split(" ")]

    count = 0
    for stone in stones:
        count += blink_recursive(stone, 75)

    end = time.time()
    elapsed = end - start_time
    print("---- Part 2 ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


if __name__ == "__main__":
    part_1()
    part_2()
