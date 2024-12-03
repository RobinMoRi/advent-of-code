def get_lines():
    lines = []
    with open("01/input-1.txt", "r") as file:
        for line in file:
            lines.append(line.strip().split())
    return lines


def part_1():
    # Sort in left and right respectively
    left = []
    right = []
    for line in get_lines():
        left.append(int(line[0]))
        right.append(int(line[1]))

    left.sort()
    right.sort()

    # Distance is the sum of the abs of min number of each list
    sum = 0
    for i in range(len(left)):
        left_number = left[i]
        right_number = right[i]
        sum += abs(left_number - right_number)
    print(sum)


def part_2():
    # Sort in left and right respectively
    left = []
    right = []
    for line in get_lines():
        left.append(int(line[0]))
        right.append(int(line[1]))

    # count frequency for each number in right list
    right_freq = {}
    for item in right:
        if item not in right_freq:
            right_freq[item] = 1
        else:
            right_freq[item] += 1

    # for each item in left we'll count the occurrences in list 3
    sum = 0
    for item in left:
        if item in right_freq:
            sum += item * right_freq[item]

    print(sum)


if __name__ == "__main__":
    part_1()
    part_2()
