# Chord Diagram
# Question: When students switch majors, where do they go?
# Put this script and chord.csv in the same folder, then in RStudio choose
# Session > Set Working Directory > To Source File Location.
# Also needs: circlize. Run install.packages("circlize") once.

library(tidyverse)
library(circlize)

# ---- Gallery look: dark background, soft gray text ----
font <- "IBM Plex Sans"   # use "sans" if IBM Plex Sans is not installed
ink  <- "#8B97A7"

area_col <- c("Undecided" = "#8B97A7", "Business" = "#F0B95A", "Sciences" = "#7FD18C",
              "Engineering" = "#75AADB", "Humanities" = "#B79CFF", "Social Sciences" = "#46D6D1")

df <- read_csv("chord.csv", show_col_types = FALSE)

# circlize draws with base R graphics instead of ggplot2, so this script opens
# the image file itself, draws the chart, and closes the file with dev.off()
png("chord.png", width = 9, height = 6, units = "in", res = 200, bg = "#161B23")
par(family = font, mar = c(2, 1, 1, 1), col = ink, fg = ink)
circos.clear()
circos.par(start.degree = 90, gap.degree = 4, track.margin = c(0.01, 0.01),
           points.overflow.warning = FALSE)

# directional = 1 reads each row as from_area -> to_area; the shorter end of
# each ribbon and its arrow head point to where the students went.
# order = names(area_col) places the groups clockwise from the top.
chordDiagram(df, grid.col = area_col, order = names(area_col), transparency = 0.25,
             directional = 1, direction.type = c("diffHeight", "arrows"),
             link.arr.type = "big.arrow", diffHeight = mm_h(3),
             annotationTrack = "grid", preAllocateTracks = list(track.height = mm_h(9)))

# Write each group's name around the outside
circos.track(track.index = 1, bg.border = NA, panel.fun = function(x, y) {
  circos.text(CELL_META$xcenter, CELL_META$ylim[1], CELL_META$sector.index,
              facing = "bending.inside", niceFacing = TRUE, adj = c(0.5, 0),
              col = "#E8EDF4", cex = 1.15)
})
mtext("Ribbon width shows students. Sample values, not real data.",
      side = 1, line = 0.6, adj = 0, cex = 0.95, col = ink)
circos.clear()
dev.off()
