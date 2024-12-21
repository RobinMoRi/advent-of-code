from day_20.solution import part_1, part_2


def test_part_1():
    assert part_1(file="test.txt", min_saving_time=64) == 84, 1


def test_part_2():
    assert part_2(file="test.txt") == 0
