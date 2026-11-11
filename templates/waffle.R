# Waffle Chart
# Question: Out of every 100 applicants, where did they end up?
# Put this script and waffle.csv in the same folder, then in RStudio choose
# Session > Set Working Directory > To Source File Location.

library(tidyverse)

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

pal <- c("#75AADB", "#7FD18C", "#F0B95A", "#3A4554")

df <- read_csv("waffle.csv", show_col_types = FALSE) |>
  mutate(outcome = fct_inorder(outcome))

# One square per percent, filled left to right, then top to bottom
squares <- df |>
  uncount(percent) |>
  mutate(cell = row_number() - 1, col = cell %% 10, row = cell %/% 10)

p <- ggplot(squares, aes(x = col, y = row, fill = outcome)) +
  geom_tile(width = 0.86, height = 0.86) +
  scale_y_reverse() +
  scale_fill_manual(values = pal) +
  coord_equal() +
  labs(x = NULL, y = NULL, caption = "Each square = 1 percent of applicants") +
  theme_gallery() +
  theme(axis.text = element_blank(), panel.grid = element_blank(),
        legend.position = "right", plot.caption = element_text(color = ink, hjust = 0))

ggsave("waffle.png", p, width = 9, height = 6, dpi = 200)
p
