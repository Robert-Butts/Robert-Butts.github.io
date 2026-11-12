# Small Multiples
# Question: How did each college's enrollment change over time?
# Put this script and smallmult.csv in the same folder, then in RStudio choose
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

df <- read_csv("smallmult.csv", show_col_types = FALSE)

# A copy without the college column draws every college in gray behind each panel,
# so each highlighted line can be compared with the rest
background <- rename(df, other = college)

p <- ggplot(df, aes(x = year, y = students)) +
  geom_line(data = background, aes(group = other), color = "#2E3845", linewidth = 0.8) +
  geom_line(color = "#F0B95A", linewidth = 1.5) +
  facet_wrap(~ college, nrow = 2) +          # every panel shares one scale
  scale_x_continuous(breaks = c(2015, 2020, 2025)) +
  scale_y_continuous(labels = scales::comma, limits = c(0, NA)) +
  labs(x = NULL, y = "Students enrolled",
       caption = "Every panel uses the same scale. Gray lines show the other colleges. Sample values.") +
  theme_gallery() +
  theme(strip.text = element_text(color = "#E8EDF4", size = 13, hjust = 0),
        panel.spacing = unit(1.2, "lines"), plot.caption = element_text(color = ink, hjust = 0))

ggsave("smallmult.png", p, width = 9, height = 6, dpi = 200)
p
