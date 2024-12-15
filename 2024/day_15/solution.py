from collections import defaultdict
import os
import time
import re
import sys


def get_lines(filename: str):
    this_file = os.path.abspath(__file__)
    this_dir = os.path.dirname(this_file)
    filepath = os.path.join(this_dir, filename)
    f = open(filepath, "r")
    lines = f.read().strip()
    f.close()
    return lines


def parse_data(file: str):
    lines = get_lines(filename=file)
    instructions = "".join(re.findall("\\^|v|\\<|\\>", lines)).strip()
    board = [
        list(line)
        for line in "".join(re.findall("#|\\.|O|@|\\n", lines)).strip().split()
    ]

    start_pos = get_robot_pos(board)

    return board, instructions, start_pos


def transform_board(board):
    """
    Transform board for part 2
    """
    new_board = []
    for row in board:
        new_row = []
        for col in row:
            if col == "." or col == "#":
                new_row.append(col)
                new_row.append(col)
            elif col == "O":
                new_row.append("[")
                new_row.append("]")
            else:
                new_row.append("@")
                new_row.append(".")
        new_board.append(new_row)
    return new_board


def get_robot_pos(board):
    for i, row in enumerate(board):
        for j, col in enumerate(row):
            if col == "@":
                return i, j


def sum_box_coord(board):
    count = 0
    for i, row in enumerate(board):
        for j, col in enumerate(row):
            if col == "O":
                count = count + 100 * i + j
    return count


def draw_frame(board, frame_id: int, instruction: str):
    print(f"\n-------- Drawing frame {frame_id}, moving {instruction} --------\n")
    for line in board:
        print("".join(line))


def save_frame(board):
    frame = ""
    for line in board:
        frame += "".join(line) + "\n"
    return frame


def animate_frames(frames):
    for frame in frames:
        sys.stdout.write("\x1b[2J\x1b[H")
        sys.stdout.write(frame)
        sys.stdout.flush()
        time.sleep(0.1)


def get_sort_order(instruction, move):
    sort_order = defaultdict(int)
    for item in ["@", ".", "O"]:
        order = 2

        if item == "@":  # Always in the middle
            order = 1

        # Sort empty space first if moving down or right
        if item == "." and (instruction == "v" or instruction == ">"):
            order -= 2

        if item == "O" and (instruction == "^" or instruction == "<"):
            order -= 2

        sort_order[item] = order
    return sort_order


def part_1(part=1, file: str = "input.txt"):
    start_time = time.time()
    board, instructions, start_pos = parse_data(file=file)

    move = {"^": (0, -1), "v": (0, 1), "<": (-1, 0), ">": (1, 0)}

    curr_pos = start_pos

    frames = []

    for idx, instruction in enumerate(instructions):
        # Retrieve row, col and val for robot
        row, col = curr_pos
        curr_val = board[row][col]
        should_update = []

        # collect nodes to update
        while curr_val != "#":

            should_update.append((curr_pos, curr_val))
            if curr_val == ".":
                break
            dx, dy = move[instruction]

            row, col = curr_pos
            row, col = row + dy, col + dx
            curr_pos = row, col
            curr_val = board[row][col]

        # build dictionary to decide the sort order
        sort_order = get_sort_order(instruction, move)
        should_update.sort(key=lambda x: sort_order[x[1]])

        if not should_update:
            continue

        pos, _ = should_update[0]
        if instruction == "^" or instruction == "v":
            max_row = max([pos[0] for pos, _ in should_update])
            min_row = min([pos[0] for pos, _ in should_update])
            _, col = pos

            val_idx = 0
            for i in range(min_row, max_row + 1):
                _, val = should_update[val_idx]
                board[i][col] = val
                val_idx += 1

        else:
            max_col = max([pos[1] for pos, _ in should_update])
            min_col = min([pos[1] for pos, _ in should_update])
            row, _ = pos

            val_idx = 0
            for i in range(min_col, max_col + 1):
                _, val = should_update[val_idx]
                board[row][i] = val
                val_idx += 1

        curr_pos = get_robot_pos(board)
        frame = save_frame(board)
        frames.append(frame)

    draw_frame(board, idx, instruction)
    # animate_frames(frames)
    count = sum_box_coord(board)

    end_time = time.time()
    elapsed = end_time - start_time
    print(f"---- Part {part} ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


def part_2(file: str = "input.txt"):
    start_time = time.time()
    board, instructions, start_pos = parse_data(file=file)
    board = transform_board(board)
    draw_frame(board, 0, ">")

    move = {"^": (0, -1), "v": (0, 1), "<": (-1, 0), ">": (1, 0)}

    curr_pos = start_pos

    frames = []

    return 0


if __name__ == "__main__":
    # part_1()
    part_2()
