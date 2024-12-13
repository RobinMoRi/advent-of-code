from collections import defaultdict
import os
import time
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


def parse_data(lines: list[str]):
    max_lines = len(lines)
    all_equations = defaultdict(list)
    eq_id = 0
    eqs = []
    for idx, line in enumerate(lines):
        if line.strip():
            nums = [int(num) for num in re.findall("\\d+", line)]
            eqs.append(tuple(nums))

        if not line.strip() or idx == max_lines - 1:
            all_equations[eq_id] = eqs
            eq_id += 1
            eqs = []

    return all_equations


def solve_linear_equations(a1, b1, c1, a2, b2, c2):
    determinant = a1 * b2 - a2 * b1
    x = (c1 * b2 - c2 * b1) / determinant
    y = (a1 * c2 - a2 * c1) / determinant
    return x, y


def part_1(part=1, file: str = "input.txt", ans_offset=0):
    start_time = time.time()
    lines = get_lines(file)

    equations = parse_data(lines)

    count = 0
    for key, eq in equations.items():
        eq1, eq2, ans = eq
        x1, y1 = eq1
        x2, y2 = eq2
        ans = [a + ans_offset for a in ans]
        ans1, ans2 = ans
        solution = solve_linear_equations(x1, x2, ans1, y1, y2, ans2)

        # Round to int to check if solution is valid or not
        int_solution = [int(round(num)) for num in solution]

        a, b = int_solution

        # Verify integer solution
        lhs1 = x1 * a + x2 * b
        lhs2 = y1 * a + y2 * b

        if lhs1 == ans1 and lhs2 == ans2:
            cost = a * 3 + b * 1
            count += cost

    end_time = time.time()
    elapsed = end_time - start_time
    print(f"---- Part {part} ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


def part_2(file: str = "input.txt"):
    count = part_1(part=2, file=file, ans_offset=10000000000000)
    return count


if __name__ == "__main__":
    part_1()
    part_2()
