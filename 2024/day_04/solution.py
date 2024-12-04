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


def part_1(file: str = "input.txt"):
    lines = get_lines(file)
    search = "XMAS"
    flat_lines = []

    # Hoizontal lines
    for line in lines:
        flat_lines.append(line)

    # vertical lines
    for i in range(len(lines)):
        vertical_line = ""
        for line in lines:
            vertical_line += line[i]
        flat_lines.append(vertical_line)

    # diagonal lines: top right to left bottom
    rows = len(lines)
    cols = len(lines[0])
    for i in range(-rows + 1, cols):
        diagonal = ""
        for j in range(max(0, -i), min(rows, cols - i)):
            diagonal += lines[j][i + j]
        if len(diagonal) >= len(search):
            flat_lines.append(diagonal)

    # anti-diagonal
    for i in range(rows + cols - 1):
        diagonal = ""
        for j in range(max(0, i - cols + 1), min(rows, i + 1)):
            diagonal += lines[j][i - j]
        if len(diagonal) >= len(search):
            flat_lines.append(diagonal)

    # search through lines:
    count = 0
    for line in flat_lines:
        reversed_line = line[::-1]
        for i in range(len(line)):
            if line[i : i + len(search)] == search:
                count += 1

            if reversed_line[i : i + len(search)] == search:
                count += 1
    print("---- Part 1 ----")
    print(f"count: {count}")
    return count


def part_2(file: str = "input.txt"):
    lines = get_lines(file)
    patterns = [
        ["M", "S", "M", "S"],
        ["S", "S", "M", "M"],
        ["M", "M", "S", "S"],
        ["S", "M", "S", "M"],
    ]
    count = 0
    for i in range(1, len(lines) - 1):
        for j in range(1, len(lines[0]) - 1):
            middle = lines[i][j]

            if middle == "A":
                top_left = lines[i - 1][j - 1]
                top_right = lines[i + 1][j - 1]
                bottom_left = lines[i - 1][j + 1]
                bottom_right = lines[i + 1][j + 1]

                for pattern in patterns:
                    if [top_left, top_right, bottom_left, bottom_right] == pattern:
                        count += 1
                        break

    print("---- Part 2 ----")
    print(f"count: {count}")
    return count


if __name__ == "__main__":
    part_1()
    part_2()
