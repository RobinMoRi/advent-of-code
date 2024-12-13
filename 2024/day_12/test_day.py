from day_12.solution import part_1, part_2


def test_part_1():
    assert part_1("test.txt") == 140


def test_part_1_2():
    assert part_1("test2.txt") == 1930


def test_part_2():
    assert part_2("test.txt") == 80


def test_part_2_2():
    assert part_2("test5.txt") == 436


def test_part_2_3():
    assert part_2("test4.txt") == 236


def test_part_2_4():
    assert part_2("test3.txt") == 368


def test_part_2_5():
    assert part_2("test2.txt") == 1206
