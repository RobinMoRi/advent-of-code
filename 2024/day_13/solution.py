from collections import defaultdict
import os
import time
import re
import numpy as np


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
        line = line.replace("Button A: ", "")
        line = line.replace("Button B: ", "")
        line = line.replace("Prize: ", "")
        if line.strip():
            nums = [int(num) for num in re.findall("\\d+", line)]
            eqs.append(tuple(nums))

        if not line.strip() or idx == max_lines - 1:
            all_equations[eq_id] = eqs
            eq_id += 1
            eqs = []

    return all_equations


def part_1(file: str = "input.txt"):
    start_time = time.time()
    lines = get_lines(file)

    equations = parse_data(lines)

    count = 0
    for key, eq in equations.items():
        eq1, eq2, ans = eq

        coefficient_matrix = np.array(
            [[eq1[0], eq2[0]], [eq1[1], eq2[1]]]
        )  # Saved coefficients in wrong way...
        results_vector = np.array(ans)

        raw_solution = np.linalg.solve(coefficient_matrix, results_vector)

        # Round to int to check if solution is valid or not
        int_solution = [int(round(num)) for num in raw_solution]

        # Verify integer solution
        lhs1 = eq1[0] * int_solution[0] + eq2[0] * int_solution[1]
        lhs2 = eq1[1] * int_solution[0] + eq2[1] * int_solution[1]

        if lhs1 == ans[0] and lhs2 == ans[1]:
            cost = int_solution[0] * 3 + int_solution[1] * 1
            print(int_solution, cost)
            count += cost

    end_time = time.time()
    elapsed = end_time - start_time
    print("---- Part 1 ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


def solve_linear_system(a1, b1, c1, a2, b2, c2):
    determinant = a1 * b2 - a2 * b1

    if determinant == 0:
        return "The system has no unique solution (determinant is zero)."

    x = (c1 * b2 - c2 * b1) / determinant
    y = (a1 * c2 - a2 * c1) / determinant

    return x, y


def part_2(file: str = "input.txt"):
    start_time = time.time()
    lines = get_lines(file)

    equations = parse_data(lines)

    count = 0
    for key, eq in equations.items():
        eq1, eq2, ans = eq
        solution = solve_linear_system(
            eq1[0],
            eq2[0],
            ans[0] + 10000000000000,
            eq1[1],
            eq2[1],
            ans[1] + 10000000000000,
        )
        print(solution)
        # Round to int to check if solution is valid or not
        int_solution = [int(round(num)) for num in solution]

        # Verify integer solution
        lhs1 = eq1[0] * int_solution[0] + eq2[0] * int_solution[1]
        lhs2 = eq1[1] * int_solution[0] + eq2[1] * int_solution[1]

        if lhs1 == ans[0] + 10000000000000 and lhs2 == ans[1] + 10000000000000:
            cost = int_solution[0] * 3 + int_solution[1] * 1
            print(int_solution, cost)
            count += cost

    end = time.time()
    elapsed = end - start_time
    print("\n---- Part 2 ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


if __name__ == "__main__":
    part_1()
    part_2()
