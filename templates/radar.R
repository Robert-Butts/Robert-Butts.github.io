# Radar Chart
# Question: How does each program score across five review criteria?
# Put this script and radar.csv in the same folder, then in RStudio choose
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

df <- read_csv("radar.csv", show_col_types = FALSE)

# Place each criterion on a spoke, starting at the top and going clockwise
spokes <- tibble(criterion = unique(df$criterion)) |>
  mutate(angle = 2 * pi * (row_number() - 1) / n())

points <- df |>
  left_join(spokes, by = "criterion") |>
  mutate(x = score * sin(angle), y = score * cos(angle))

rings <- expand_grid(level = c(2.5, 5, 7.5, 10), spokes) |>
  mutate(x = level * sin(angle), y = level * cos(angle))

p <- ggplot() +
  geom_polygon(data = rings, aes(x, y, group = level), fill = NA, color = "#2E3845") +
  geom_segment(data = spokes, aes(x = 0, y = 0, xend = 10 * sin(angle), yend = 10 * cos(angle)),
               color = "#2E3845") +
  geom_polygon(data = points, aes(x, y, group = program, fill = program, color = program),
               alpha = 0.22, linewidth = 1.1) +
  geom_point(data = points, aes(x, y, color = program), size = 2.6) +
  geom_text(data = spokes, aes(x = 11.6 * sin(angle), y = 11.6 * cos(angle), label = criterion),
            color = ink, family = font, size = 5) +
  scale_fill_manual(values = c("Biology" = "#B79CFF", "History" = "#75AADB")) +
  scale_color_manual(values = c("Biology" = "#B79CFF", "History" = "#75AADB")) +
  coord_equal(clip = "off") +
  theme_gallery() +
  theme(panel.grid = element_blank(), axis.text = element_blank(), axis.title = element_blank())

ggsave("radar.png", p, width = 9, height = 6, dpi = 200)
p
