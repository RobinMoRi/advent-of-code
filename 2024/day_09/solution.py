from collections import defaultdict, deque
import os
import time
import pprint


def get_lines(filename: str):
    this_file = os.path.abspath(__file__)
    this_dir = os.path.dirname(this_file)
    filepath = os.path.join(this_dir, filename)
    lines = []
    with open(filepath, "r") as file:
        for line in file:
            lines.append(line.strip())
    return lines


def checksum(disk, part_2: bool = False):
    count = 0
    for key, val in disk.items():
        sum_of_indices = sum(val)
        if part_2:
            start, end = val
            sum_of_indices = sum(list(range(start, end + 1)))
        count += int(key) * sum_of_indices
    return count


def part_1(file: str = "input.txt"):
    start_time = time.time()
    lines = get_lines(file)

    line = lines[0]

    # Save each block with its start and end position
    disk = defaultdict(list)
    start = 0
    block_id = 0
    empty_idxs = []
    is_empty = False
    for block_length in line:
        end = start + int(block_length)
        if not is_empty:
            indices = [i for i in range(start, end)]
            disk[block_id].extend(indices)
            block_id += 1
        else:
            empty_idxs.extend([i for i in range(start, end)])
        is_empty = not is_empty
        start = end

    # Get last block id and start working with that
    curr_block_id = int(list(disk.keys())[-1])
    idx = len(disk[curr_block_id]) - 1

    for empty_idx in empty_idxs:
        # Stop when the empty index is larger than than the idx we want to replace
        if empty_idx > disk[curr_block_id][idx]:
            break
        disk[curr_block_id][idx] = empty_idx
        idx -= 1

        # switch to one block id down
        if idx < 0:
            curr_block_id -= 1
            idx = len(disk[curr_block_id]) - 1

    count = checksum(disk)
    end_time = time.time()
    elapsed = end_time - start_time
    print("---- Part 1 ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


def part_2(file: str = "input.txt"):
    start_time = time.time()
    lines = get_lines(file)

    line = lines[0]

    # Save each block with its start and end position
    disk = {}
    start = 0
    block_id = 0
    empty_blocks = []
    is_empty = False

    for block_length in line:
        end = start + int(block_length)
        if not is_empty:
            disk[block_id] = [start, end - 1]
            block_id += 1
        elif int(block_length) > 0:
            empty_blocks.append([start, end - 1])
        is_empty = not is_empty
        start = end

    # there's probably a better way to do this...
    for key, block in reversed(disk.items()):
        start, end = block
        block_length = end - start + 1

        for idx, empty_block in enumerate(empty_blocks):
            start_empty, end_empty = empty_block
            empty_block_length = end_empty - start_empty + 1

            # Stop looking: cannot add block to right of itself
            if start < start_empty and end < end_empty:
                break

            # If block of file fits in space of empty block, then update its start and end position
            if empty_block_length >= block_length:
                disk[key] = [start_empty, start_empty + block_length - 1]

                # Empty block now gets smaller
                empty_blocks[idx] = [start_empty + block_length, end_empty]
                break

    count = checksum(disk, True)
    end = time.time()
    elapsed = end - start_time
    print("---- Part 2 ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"count: {count}")
    return count


if __name__ == "__main__":
    part_1()
    part_2()
