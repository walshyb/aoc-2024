import os
from collections import defaultdict

# Read input
file = open(os.getcwd() + "/day8/input.txt", "r")
lines: list[str] = file.readlines()
file.close()

grid = []


def inbounds(row, col):
    return row >= 0 and row < len(grid) and col >= 0 and col < len(grid[0])


# Part 1
# node symbol -> coordinatees it appears
nodes = defaultdict(set)

# Create grid, noting nodes we find along the way
for line in lines:
    i = len(grid)

    row = []
    for j, char in enumerate(list(line.strip())):
        row.append(char)

        if char == ".":
            continue

        nodes[char].add((i, j))

    grid.append(row)


# antinode locations
# node symbol -> set of tuples (coordinates)
antinodes = defaultdict(set)

# Distances betweeen nodes
# node symbol -> set of tuples (coordinates, representing distance)
node_distances = defaultdict(set)

# calculate distances betweeen nodes
# Loop through each node
# Then compare distances between each set of 2 nodes
#   Substract row and col diffs from node 1
#   Add diffs to node 2
#   save as antinode If coordinatees unique, in bounds,
#   and not already a node of the same name
for node_name, coordinates_arr in nodes.items():
    for i, node1 in enumerate(coordinates_arr):
        for j, node2 in enumerate(coordinates_arr):
            if i == j:
                continue

            (node1_row, node1_col) = node1
            (node2_row, node2_col) = node2

            row_diff = node2_row - node1_row
            col_diff = node2_col - node1_col

            if (
                inbounds(node1_row - row_diff, node1_col - col_diff)
                and (node1_row - row_diff, node1_col - col_diff) not in coordinates_arr
            ):
                grid[node1_row - row_diff][node1_col - col_diff] = "#"
                antinodes[node_name].add((node1_row - row_diff, node1_col - col_diff))

            if (
                inbounds(node2_row + row_diff, node2_col + col_diff)
                and (node2_row + row_diff, node2_col + col_diff) not in coordinates_arr
            ):
                grid[node2_row + row_diff][node2_col + col_diff] = "#"
                antinodes[node_name].add((node2_row + row_diff, node2_col + col_diff))


# for line in grid:
#    print("".join(line))

final_set = set()
for node_name, antinodes_set in antinodes.items():
    final_set = final_set.union(antinodes_set)

unique_antinodes = len(final_set)


print("Part 1: " + str(unique_antinodes))
