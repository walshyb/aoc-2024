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

for line in grid:
    print(line)


# antinode locations
# node symbol -> set of tuples (coordinates)
antinodes = defaultdict(set)

# Distances betweeen nodes
# node symbol -> set of tuples (coordinates, representing distance)
node_distances = defaultdict(set)

# calculate distances betweeen nodes
# Loop through each node
# Then compare distances between each set of 2 nodes
# Save distances
for nodeName, coordinates_arr in nodes.items():
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
                antinodes[nodeName].add((node1_row - row_diff, node1_col - col_diff))

            if (
                inbounds(node2_row + row_diff, node2_col + col_diff)
                and (node2_row + row_diff, node2_col + col_diff) not in coordinates_arr
            ):
                grid[node2_row + row_diff][node2_col + col_diff] = "#"
                antinodes[nodeName].add((node2_row + row_diff, node2_col + col_diff))


print(antinodes)

"""
# Calculate location of antinodes
# Loop through all node locations
#   For each location,
#       For each distance for current node
#           Add up node location, plus every combination of distances
#           i.e. (row+distance,col+distance), (row-distance,col-distance)
#           Ignore any calculations that are out of bounds
#           Add calculations to antinodes dict set
for nodeName, coordinates_arr in nodes.items():
    for i, coordinates_tuple in enumerate(coordinates_arr):
        for distance_tuple in node_distances[nodeName]:
            (node_row, node_col) = coordinates_tuple
            (row_diff, col_diff) = distance_tuple

            if inbounds(node_row - row_diff, node_col - col_diff):
                grid[node_row - row_diff][node_col - col_diff] = "#"
                antinodes[nodeName].add((node_row - row_diff, node_col - col_diff))

            if inbounds(row_diff - node_row, col_diff - node_col):
                grid[row_diff - node_row][col_diff - node_col] = "#"
                antinodes[nodeName].add((row_diff - node_row, col_diff - node_col))
"""

for line in grid:
    print(line)

# loop through grid
# if

# print("Part 1:" + str(result))
