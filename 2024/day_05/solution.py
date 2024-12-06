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
    rules = []
    updates = []

    # split rules and updates into different lists
    toggle = False
    for line in lines:
        if not line:
            toggle = True
        if toggle and line:
            updates.append(line)
        elif not toggle and line:
            rules.append(line)

    # See if each pair of numbers in updates exist in the set of rules - probably inefficient
    good_updates = []
    for update in updates:
        items = update.split(",")
        all_pair_exist = True
        for i in range(len(items) - 1):
            pair = items[i] + "|" + items[i + 1]
            pair_exist_in_rules = False
            for rule in rules:
                if pair == rule:
                    pair_exist_in_rules = True
                    break
            all_pair_exist = all_pair_exist and pair_exist_in_rules
        if all_pair_exist:
            good_updates.append(items)

    count = 0
    for update in good_updates:

        count += int(update[int(len(update) / 2)])

    print("---- Part 1 ----")
    print(f"count: {count}")
    return count


def is_bad_update(update: str, rules: list[str]):
    items = update.split(",")
    for i in range(len(items) - 1):
        pair = items[i] + "|" + items[i + 1]
        pair_exist_in_rules = False
        for rule in rules:
            if pair == rule:
                pair_exist_in_rules = True
                break
        if not pair_exist_in_rules:
            return True, i
    return False, None


def correct_update(update: str, rules: list[str]):
    is_bad, idx = is_bad_update(update, rules)
    if not is_bad or idx is None:
        return update

    # switch place on the indices that are bad
    update = update.split(",")
    temp = update[idx]
    update[idx] = update[idx + 1]
    update[idx + 1] = temp
    update = ",".join(update)
    return correct_update(update, rules)


def part_2(file: str = "input.txt"):
    lines = get_lines(file)
    rules = []
    updates = []

    # split rules and updates into different lists
    toggle = False
    for line in lines:
        if not line:
            toggle = True
        if toggle and line:
            updates.append(line)
        elif not toggle and line:
            rules.append(line)

    # See if each pair of numbers in updates exist in the set of rules - probably inefficient
    bad_updates = []
    for update in updates:
        is_bad, idx = is_bad_update(update, rules)
        if is_bad and update not in bad_updates:
            bad_updates.append(update)

    corrected = []
    for update in bad_updates:
        corrected_update = correct_update(update, rules)
        corrected.append(corrected_update.split(","))

    count = 0
    for update in corrected:
        count += int(update[int(len(update) / 2)])

    print("\n---- Part 2 ----")
    print(f"count: {count}")
    return count


if __name__ == "__main__":
    part_1()
    part_2()
