# Equalized Cartogram
# Question: Which counties have the most library cards per 100 residents, when every county gets the same space?
# Put this script and eqcartogram.csv in the same folder, then in RStudio choose
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

df <- read_csv("eqcartogram.csv", show_col_types = FALSE) |>
  # light text on dark squares, dark text on light squares
  mutate(text_color = if_else(cards_per_100 < 64, "#E8EDF4", "#161B23"))

# The grid columns and rows in the CSV place every square, so no map file is needed
p <- ggplot(df, aes(x = col, y = row, fill = cards_per_100)) +
  geom_tile(width = 0.92, height = 0.92) +
  geom_text(aes(label = label, color = text_color), family = font, fontface = "bold", size = 3) +
  scale_color_identity() +
  scale_y_reverse() +
  scale_fill_gradient(low = "#22344D", high = "#9CCBF5", name = "Library cards per 100 residents") +
  guides(fill = guide_colorbar(title.position = "top", barwidth = unit(6, "cm"))) +
  coord_equal() +
  labs(x = NULL, y = NULL, caption = "One square per county, placed near its real location. Sample values.") +
  theme_gallery() +
  theme(legend.title = element_text(color = ink, size = 12)) +
  theme(panel.grid = element_blank(), axis.text = element_blank(),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("eqcartogram.png", p, width = 9, height = 6, dpi = 200)
p
