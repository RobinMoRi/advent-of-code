def get_lines(path: str):
    lines = []
    with open(path, "r") as file:
        for line in file:
            lines.append(line.strip().split())
    return lines


def part_1(path: str = "02/input-1.txt"):
    lines = get_lines(path)

    # Naive approach
    total_unsafe = 0
    for line in lines:
        should_decrease = (int(line[1]) - int(line[0])) < 0
        for i in range(1, len(line)):
            first = int(line[i - 1])
            second = int(line[i])

            if should_decrease and (second - first) > 0:
                total_unsafe += 1
                print(second, first, abs(second - first))
                break

            if abs(second - first) < 1 or abs(second - first) > 3:
                total_unsafe += 1
                print(second, first, abs(second - first))
                break

    total_safe = len(lines) - total_unsafe
    print(f"Total safe: {total_safe}")
    print(f"Total unsafe: {total_unsafe}")
    return total_safe


def part_2():
    pass


if __name__ == "__main__":
    part_1()
    part_2()
