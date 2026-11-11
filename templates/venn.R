# Venn Diagram
# Question: How many students are in honors, athletics, or both?
# Put this script and venn.csv in the same folder, then in RStudio choose
# Session > Set Working Directory > To Source File Location.

library(tidyverse)

# ---- Gallery look: dark background, soft gray text ----
font <- "IBM Plex Sans"   # use "sans" if IBM Plex Sans is not installed
ink  <- "#8B97A7"

theme_gallery <- function() {
  theme_minimal(base_size = 16, base_family = font) +
    theme(
      plot.background  = element_rect(fill = "#161B23", color = NA),
      panel.grid.major = element_line(color = "#222A34"),
      panel.grid.minor = element_blank(),
      text             = element_text(color = ink),
      axis.text        = element_text(color = ink),
      legend.position  = "top",
      legend.title     = element_blank(),
      plot.margin      = margin(24, 28, 18, 18)
    )
}

df <- read_csv("venn.csv", show_col_types = FALSE)

# Two equal circles, each drawn as a shape with 200 corners
circle <- function(x0, label) {
  t <- seq(0, 2 * pi, length.out = 200)
  tibble(x = x0 + cos(t), y = sin(t), group = label)
}
circles <- bind_rows(circle(-0.55, "Honors"), circle(0.55, "Athletics"))

# Where each count is written
spots <- tibble(region = c("Honors only", "Both", "Athletics only"),
                x = c(-1.0, 0, 1.0)) |>
  left_join(df, by = "region")

pal <- c("Honors" = "#B79CFF", "Athletics" = "#46D6D1")

p <- ggplot() +
  geom_polygon(data = circles, aes(x, y, group = group, fill = group, color = group),
               alpha = 0.28, linewidth = 1.2) +
  geom_text(data = spots, aes(x = x, y = 0, label = scales::comma(students)),
            color = "#E8EDF4", family = font, fontface = "bold", size = 9) +
  annotate("text", x = c(-0.95, 0.95), y = 1.22, label = c("Honors", "Athletics"),
           color = c("#B79CFF", "#46D6D1"), family = font, size = 6.5) +
  scale_fill_manual(values = pal) +
  scale_color_manual(values = pal) +
  coord_equal(clip = "off") +
  labs(caption = "The circles are the same size. Read the numbers, not the areas.") +
  theme_gallery() +
  theme(axis.text = element_blank(), axis.title = element_blank(), panel.grid = element_blank(),
        legend.position = "none", plot.caption = element_text(color = ink, hjust = 0))

ggsave("venn.png", p, width = 9, height = 6, dpi = 200)
p
