# Pictogram
# Question: How many advising appointments happened each week?
# Put this script and pictogram.csv in the same folder, then in RStudio choose
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

per_icon <- 10

df <- read_csv("pictogram.csv", show_col_types = FALSE) |>
  mutate(row = row_number())

# uncount() repeats each row once per icon and numbers the copies
icons <- df |>
  mutate(n = appointments / per_icon) |>
  uncount(n, .id = "col")

p <- ggplot(icons, aes(x = col)) +
  # body: a thick line with round ends
  geom_segment(aes(xend = col, y = -row - 0.22, yend = -row + 0.02),
               color = "#75AADB", linewidth = 7, lineend = "round") +
  # head: a dot above the body
  geom_point(aes(y = -row + 0.24), color = "#75AADB", size = 5) +
  scale_y_continuous(breaks = -df$row, labels = df$week) +
  scale_x_continuous(limits = c(0.5, max(icons$col) + 0.5)) +
  labs(x = NULL, y = NULL, caption = paste("One figure =", per_icon, "appointments")) +
  theme_gallery() +
  theme(panel.grid = element_blank(), axis.text.x = element_blank(),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("pictogram.png", p, width = 9, height = 6, dpi = 200)
p
