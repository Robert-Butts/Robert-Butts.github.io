# Histogram
# Question: What is the spread of student ages in a program?
# Put this script and histogram.csv in the same folder, then in RStudio choose
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

df <- read_csv("histogram.csv", show_col_types = FALSE)

p <- ggplot(df, aes(x = age)) +
  # binwidth is a choice: try 1 or 5 and watch the shape change
  geom_histogram(binwidth = 2, boundary = 16, fill = "#7FD18C", color = "#161B23", linewidth = 0.6) +
  scale_x_continuous(breaks = seq(16, 64, 4)) +
  scale_y_continuous(expand = expansion(mult = c(0, 0.06))) +
  labs(x = "Age", y = "Students", caption = "Each bar covers two years of age. Sample values, not real data.") +
  theme_gallery() +
  theme(panel.grid.major.x = element_blank(), plot.caption = element_text(color = ink, hjust = 0))

ggsave("histogram.png", p, width = 9, height = 6, dpi = 200)
p
