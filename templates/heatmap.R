# Heat Map
# Question: Which programs changed the most across the years?
# Put this script and heatmap.csv in the same folder, then in RStudio choose
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

df <- read_csv("heatmap.csv", show_col_types = FALSE) |>
  group_by(program) |>
  arrange(year, .by_group = TRUE) |>
  mutate(index = round(students / first(students) * 100)) |>   # first year = 100
  ungroup() |>
  mutate(program = fct_reorder(program, index, .fun = last))      # biggest growth at the top

p <- ggplot(df, aes(x = factor(year), y = program, fill = index)) +
  geom_tile(color = "#161B23", linewidth = 1.2) +
  geom_text(aes(label = index), color = "#E8EDF4", family = font, size = 3.9) +
  # red below the first year's level, blue above it, dark gray where nothing changed.
  # values = puts the gray exactly at 100, so both sides reach full color.
  scale_fill_gradientn(colours = c("#F2716F", "#2E3845", "#75AADB"),
                       values = scales::rescale(c(50, 100, 260)), limits = c(50, 260),
                       breaks = c(50, 100, 150, 200, 250), name = "Index\n(2019 = 100)") +
  labs(x = NULL, y = NULL,
       caption = "Each cell compares that year with the program's 2019 level. Sample values.") +
  theme_gallery() +
  theme(panel.grid = element_blank(), legend.position = "right",
        legend.title = element_text(color = ink, size = 12),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("heatmap.png", p, width = 9, height = 6, dpi = 200)
p
