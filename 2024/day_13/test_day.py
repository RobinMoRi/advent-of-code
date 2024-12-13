from day_13.solution import part_1, part_2


def test_part_1():
    assert part_1(file="test.txt") == 480


def test_part_2():
    assert part_2(file="test.txt") == 875318608908
