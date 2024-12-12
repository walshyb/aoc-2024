import os
from collections import defaultdict


def part1():
    # Read input
    file = open(os.getcwd() + "/day10/input.txt", "r")
    lines: list[str] = file.readlines()
    file.close()

    sets = [
        (-1, 0),
        (0, -1),
        (0, 1),
        (1, 0),
    ]

    # track grid just for debugging
    grid = []

    def inbounds(coords):
        (r, c) = coords
        return r >= 0 and r < len(grid) and c >= 0 and c < len(grid[0])

    # dfs dfs dfs
    # ((current row, current col), elevation, (trailhead start row, trailhead start col))
    nodes = []

    # Create grid, noting nodes we find along the way
    for line in lines:
        i = len(grid)
        row = []

        for j, char in enumerate(list(line)):
            if char == "\n":
                continue
            if char == ".":
                row.append(char)
                continue

            num = int(char)
            row.append(num)

            if num == 0:
                nodes.append(((i, j), 0, (i, j)))

        grid.append(row)

    seen = defaultdict(set)

    while len(nodes) != 0:
        ((row, col), elevation, trailhead) = nodes.pop()
        (trailhead_row, trailhead_col) = trailhead

        if elevation == 9:
            # top elevation's row+col, trailhead coords
            seen[str(trailhead)].add((row, col))

        # Check neighbors
        for r_dif, c_dif in sets:
            candidate = (row + r_dif, col + c_dif)

            if not inbounds(candidate):
                continue

            candidate_elevation = grid[candidate[0]][candidate[1]]

            if candidate_elevation == ".":
                continue

            if candidate_elevation - elevation == 1:
                nodes.append((candidate, candidate_elevation, trailhead))

    trailheads = 0
    for key, tops in seen.items():
        trailheads += len(tops)

    print("Part 1: " + str(trailheads))


part1()


def part2():
    # Read input
    file = open(os.getcwd() + "/day10/input.txt", "r")
    lines: list[str] = file.readlines()
    file.close()

    sets = [
        (-1, 0),
        (0, -1),
        (0, 1),
        (1, 0),
    ]

    # track grid just for debugging
    grid = []

    def inbounds(coords):
        (r, c) = coords
        return r >= 0 and r < len(grid) and c >= 0 and c < len(grid[0])

    # dfs dfs dfs
    # ((current row, current col), elevation, (trailhead start row, trailhead start col))
    nodes = []

    # Create grid, noting nodes we find along the way
    for line in lines:
        i = len(grid)
        row = []

        for j, char in enumerate(list(line)):
            if char == "\n":
                continue
            if char == ".":
                row.append(char)
                continue

            num = int(char)
            row.append(num)

            if num == 0:
                nodes.append(((i, j), 0, (i, j)))

        grid.append(row)

    trailheads = 0
    while len(nodes) != 0:
        ((row, col), elevation, trailhead) = nodes.pop()

        if elevation == 9:
            trailheads += 1

        # Check neighbors
        for r_dif, c_dif in sets:
            candidate = (row + r_dif, col + c_dif)

            if not inbounds(candidate):
                continue

            candidate_elevation = grid[candidate[0]][candidate[1]]

            if candidate_elevation == ".":
                continue

            if candidate_elevation - elevation == 1:
                nodes.append((candidate, candidate_elevation, trailhead))

    print("Part 2: " + str(trailheads))


part2()
