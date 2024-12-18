import os
import time
import math
from pprint import pprint
import re


def get_lines(filename: str):
    this_file = os.path.abspath(__file__)
    this_dir = os.path.dirname(this_file)
    filepath = os.path.join(this_dir, filename)
    file = open(filepath, "r")
    lines = file.read()
    file.close()
    return lines


def read_data(file):
    lines = get_lines(filename=file)

    registers_match = re.findall("Register\\s([ABC]):\\s(\\d*)", lines)
    program = re.findall("Program:\\s([\\d+,]+)", lines)[0].split(",")

    registers = {}
    for register in registers_match:
        register, val = register
        registers[register] = int(val)

    return registers, [int(instr) for instr in program]


def get_combo_operand(registers, op):
    if 0 <= op <= 3:
        return op
    if op == 4:
        return registers["A"]
    if op == 5:
        return registers["B"]
    if op == 6:
        return registers["C"]

    raise Exception(f"Operand {op} is reserved")


def execute(registers, instructions, instruction_pointer=0, out=None):
    if out is None:
        out = []

    if instruction_pointer >= len(instructions):
        return registers, out, instruction_pointer

    op = instructions[instruction_pointer]

    if instruction_pointer + 1 >= len(instructions):
        operand = 0
    else:
        operand = instructions[instruction_pointer + 1]

    if op in [1, 3]:
        operand_value = operand
    else:
        operand_value = get_combo_operand(registers, operand)

    if op == 0:  # adv
        registers["A"] = int(registers["A"] / (2**operand_value))
    elif op == 1:  # bxl
        registers["B"] = registers["B"] ^ operand_value  # Bitwise XOR
    elif op == 2:  # bst
        registers["B"] = operand_value % 8
    elif op == 3:  # jnz
        if registers["A"] != 0:
            # jump to instruction pointer of literal operand
            return execute(registers, instructions, operand_value, out)
    elif op == 4:  # bxc
        registers["B"] = registers["B"] ^ registers["C"]  # Bitwise XOR
    elif op == 5:  # out
        out.append(str(operand_value % 8))
    elif op == 6:  # bdv
        registers["B"] = int(registers["A"] / (2**operand_value))
    else:  # cdv
        registers["C"] = int(registers["A"] / (2**operand_value))

    instruction_pointer += 2

    return execute(registers, instructions, instruction_pointer, out)


def part_1(part=1, file: str = "input.txt"):
    start_time = time.time()

    registers, program = read_data(file=file)

    registers, collected_output, instruction_pointer = execute(registers, program)
    result = ",".join(map(str, collected_output))

    end_time = time.time()
    elapsed = end_time - start_time
    print(f"---- Part {part} ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"result: {result}")
    return result


def part_2(file: str = "input.txt"):
    start_time = time.time()

    registers, program = read_data(file=file)

    final_result = ",".join(map(str, program))
    print("final", final_result)

    # Trying to brute force :(
    for i in range(200_000, 1000_000_000):
        registers["A"] = i
        registers, collected_output, instruction_pointer = execute(registers, program)
        result = ",".join(map(str, collected_output))
        if result == final_result:
            print(f"Breaking on {i} with result: {result}")
            break

    A = i
    end_time = time.time()
    elapsed = end_time - start_time
    print("---- Part 2 ----")
    print("Elapsed time seconds: %5.2fms" % (elapsed * 1000))
    print(f"result: {A}")
    return A


if __name__ == "__main__":
    # part_1()
    part_2()
