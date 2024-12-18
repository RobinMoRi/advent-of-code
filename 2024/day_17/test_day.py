from day_17.solution import part_1, part_2


def test_part_1():
    assert part_1(file="test.txt") == "4,6,3,5,6,3,5,2,1,0"


def test_part_1_2():
    assert part_1(file="test2.txt") == "5,7,3,0"


def test_part_2():
    assert part_2(file="test2.txt") == 117440
