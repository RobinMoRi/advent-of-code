import os
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


def part_1(file: str = "input.txt"):
    lines = get_lines(file)
    expr = "mul\\((\\d+,\\d+)\\)"
    multiplied = []
    for line in lines:
        matches = [item.split(",") for item in re.findall(expr, line)]
        multiplied += [int(match[0]) * int(match[1]) for match in matches]

    print("---- Part 1 ----")
    print(f"Added multiplied: {sum(multiplied)}")
    return sum(multiplied)


def part_2(file: str = "input.txt"):
    lines = get_lines(file)
    expr = "mul\\((\\d+,\\d+)\\)|(do\\(\\))|(don\\'t\\(\\))"
    matches = []
    for line in lines:
        matches += [
            x for x in list(sum([item for item in re.findall(expr, line)], ())) if x
        ]

    do = True
    total = 0
    for match in matches:
        if match == "do()":
            do = True
        if match == "don't()":
            do = False
        if do and (match != "do()" and match != "don't()"):
            pair = match.split(",")
            total += int(pair[0]) * int(pair[1])
    print("---- Part 2 ----")
    print(f"Added multiplied: {total}")
    return total


if __name__ == "__main__":
    part_1()
    part_2()
