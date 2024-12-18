from day_18.solution import part_1, part_2


def test_part_1():
    assert part_1(file="test.txt", start=(0, 0), end=(6, 6), bytes_fallen=12) == 22


def test_part_2():
    assert part_2(file="test.txt", start=(0, 0), end=(6, 6), bytes_fallen=12) == "6,1"
