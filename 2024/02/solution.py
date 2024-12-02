import os


def get_lines(filename: str):
    this_file = os.path.abspath(__file__)
    this_dir = os.path.dirname(this_file)
    filepath = os.path.join(this_dir, filename)
    lines = []
    with open(filepath, "r") as file:
        for line in file:
            lines.append(line.strip().split())
    return lines


def is_safe(nums: list[int]):

    should_decrease = (nums[-1] - nums[0]) < 0
    diffs = []
    for i in range(1, len(nums)):
        first = nums[i - 1]
        second = nums[i]

        if should_decrease and (second - first) > 0:
            return False, i

        if not should_decrease and (second - first) < 0:
            return False, i

        if abs(second - first) < 1 or abs(second - first) > 3:
            return False, i

        diffs.append(second - first)
        should_decrease = (second - first) < 0

    return True, i


def part_1(file: str = "input-1.txt"):
    lines = get_lines(file)

    # Naive approach ??
    total_safe = 0
    for line in lines:
        res = is_safe([int(num) for num in line])
        is_line_safe = res[0]
        if is_line_safe:
            total_safe += 1

    print("---- Part 1 ----")
    print(f"Total safe: {total_safe}")
    return total_safe


def part_2(file: str = "input-1.txt"):
    lines = get_lines(file)

    def _is_safe_inner(nums: list[int]):
        res = is_safe(nums)
        is_line_safe = res[0]
        idx = res[1]
        if not is_line_safe:
            if nums[-1] == nums[idx]:
                return False
            new_nums = nums[0:idx] + nums[idx + 1 :]
            print(new_nums)
            return _is_safe_inner(new_nums)
        return True

    # Naive approach ??
    total_safe = 0
    for line in lines:
        nums = [int(num) for num in line]

        if _is_safe_inner(nums):
            total_safe += 1

    print("---- Part 2 ----")
    print(f"Total safe: {total_safe}")
    return total_safe


if __name__ == "__main__":
    part_1()
    part_2()
