# Network Diagram
# Question: Which faculty members write papers together?
# Put this script and network.csv in the same folder, then in RStudio choose
# Session > Set Working Directory > To Source File Location.
# Also needs: tidygraph, ggraph. Run install.packages(c("tidygraph", "ggraph")) once.

library(tidyverse)
library(tidygraph)
library(ggraph)

# ---- Gallery look: dark background, soft gray text ----
font <- "IBM Plex Sans"   # use "sans" if IBM Plex Sans is not installed
ink  <- "#8B97A7"

theme_gallery <- function() {
  theme_minimal(base_size = 16, base_family = font) +
    theme(
      plot.background  = element_rect(fill = "#161B23", color = NA),
      panel.grid       = element_line(color = "#222A34"),
      panel.grid.minor = element_blank(),
      text             = element_text(color = ink),
      axis.text        = element_text(color = ink),
      legend.position  = "top",
      legend.title     = element_blank(),
      plot.margin      = margin(24, 28, 18, 18)
    )
}

pal <- c("#75AADB", "#7FD18C", "#B79CFF", "#F0B95A", "#46D6D1", "#F38ABE")

edges <- read_csv("network.csv", show_col_types = FALSE)

# Turn the edge list into a graph. Each node gets its total papers, and
# group_louvain() finds clusters of people who mostly write with each other.
g <- as_tbl_graph(edges, directed = FALSE) |>
  activate(nodes) |>
  mutate(total_papers = centrality_degree(weights = papers),
         cluster = factor(group_louvain(weights = papers)))

set.seed(7)   # the layout starts from random positions; this keeps it the same each run
p <- ggraph(g, layout = "fr") +
  geom_edge_link(aes(edge_width = papers), color = "#3A4656") +
  geom_node_point(aes(size = total_papers, color = cluster)) +
  geom_node_text(aes(label = name), repel = TRUE, color = "#E8EDF4",
                 family = font, size = 4.4, point.padding = unit(0.4, "lines")) +
  scale_edge_width(range = c(0.5, 3.5), guide = "none") +
  scale_size_area(max_size = 11, guide = "none") +
  scale_color_manual(values = pal, guide = "none") +
  labs(caption = "Line width shows shared papers. Dot size shows each person's total. Sample values, not real data.") +
  theme_gallery() +
  theme(panel.grid = element_blank(), axis.text = element_blank(), axis.title = element_blank(),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("network.png", p, width = 9, height = 6, dpi = 200)
p
