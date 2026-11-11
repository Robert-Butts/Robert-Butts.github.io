# Marimekko Chart
# Question: How do each college's size and degree mix compare at once?
# Put this script and marimekko.csv in the same folder, then in RStudio choose
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

pal <- c("Undergraduate" = "#75AADB", "Graduate" = "#7FD18C", "Non-degree" = "#F0B95A")

df <- read_csv("marimekko.csv", show_col_types = FALSE) |>
  mutate(level = fct_inorder(level), college = fct_inorder(college))

# Column widths: each college's share of all students
cols <- df |>
  group_by(college) |>
  summarise(total = sum(students)) |>
  mutate(xmax = cumsum(total) / sum(total), xmin = lag(xmax, default = 0))

# Layer heights: each level's share within its own college
boxes <- df |>
  left_join(cols, by = "college") |>
  group_by(college) |>
  mutate(ymax = cumsum(students) / sum(students), ymin = lag(ymax, default = 0)) |>
  ungroup()

p <- ggplot(boxes) +
  geom_rect(aes(xmin = xmin, xmax = xmax, ymin = ymin, ymax = ymax, fill = level),
            color = "#161B23", linewidth = 1.2) +
  scale_x_continuous(breaks = (cols$xmin + cols$xmax) / 2, labels = cols$college,
                     expand = c(0, 0)) +
  scale_y_continuous(labels = scales::percent, expand = c(0, 0)) +
  scale_fill_manual(values = pal) +
  labs(x = NULL, y = "Share of the college's students",
       caption = "Column width = the college's share of all students.") +
  theme_gallery() +
  theme(panel.grid = element_blank(), plot.caption = element_text(color = ink, hjust = 0))

ggsave("marimekko.png", p, width = 9, height = 6, dpi = 200)
p
