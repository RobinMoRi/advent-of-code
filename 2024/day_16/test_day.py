from day_16.solution import part_1, part_2


def test_part_1():
    _, cost = part_1(file="test.txt")
    assert cost == 7036


def test_part_1_2():
    _, cost = part_1(file="test2.txt")
    assert cost == 11048


def test_part_2():
    assert part_2(file="test.txt") == 45


def test_part_2_2():
    assert part_2(file="test2.txt") == 64
